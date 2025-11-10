# Dockerfile
FROM node:23-alpine AS base


# Stage 1: Install dependencies only when needed
FROM base AS deps
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN npm config set registry https://mirror-npm.runflare.com/
RUN yarn config set registry https://mirror-npm.runflare.com/

RUN if [ -f yarn.lock ]; then \
      yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
      pnpm install; \
    else \
      echo "Lockfile not found." && exit 1; \
    fi

# Stage 2: Build the Next.js app
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# COPY .env.production.sample .env.production
RUN npm config set registry https://mirror-npm.runflare.com/
RUN npm run build

# Stage 3: Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# COPY --from=builder --chown=nextjs:nodejs /app ./

# Install PM2 globally for process management
RUN npm config set registry https://mirror-npm.runflare.com/
RUN npm install -g pm2 --unsafe-perm

# Copy the PM2 configuration file
COPY ecosystem.config.cjs .

USER nextjs

# Expose the port that PM2 will run on
EXPOSE 3030

ENV PORT=3030

# Start the Next.js app with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]