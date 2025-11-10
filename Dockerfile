# Dockerfile for React Router v7 Application
# Optimized for CI/CD deployments (GitHub Actions, etc.)

# Use Node.js 22 LTS for better stability in production
FROM node:22-alpine AS base

# Install necessary dependencies for node-gyp and native modules
RUN apk add --no-cache libc6-compat

# Stage 1: Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package manager files
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* .npmrc* ./

# Install dependencies based on the preferred package manager
# Prefer npm ci for deterministic builds in CI/CD
RUN if [ -f yarn.lock ]; then \
      yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci --only=production=false; \
    elif [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm install --frozen-lockfile; \
    else \
      echo "Lockfile not found." && exit 1; \
    fi

# Stage 2: Build the React Router application
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Build the application using React Router build
RUN npm run build

# Stage 3: Production image - minimal runtime
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3030

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactrouter -u 1001

# Copy built assets from builder
COPY --from=builder --chown=reactrouter:nodejs /app/build ./build
COPY --from=builder --chown=reactrouter:nodejs /app/package.json ./package.json

# Copy only production dependencies
COPY --from=deps --chown=reactrouter:nodejs /app/node_modules ./node_modules

# Create logs directory with proper permissions
RUN mkdir -p /app/logs && chown -R reactrouter:nodejs /app/logs

# Install PM2 globally for process management
RUN npm install -g pm2@latest --unsafe-perm

# Copy PM2 config
COPY --chown=reactrouter:nodejs ecosystem.config.cjs ./

# Switch to non-root user
USER reactrouter

# Expose application port
EXPOSE 3030

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3030', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]