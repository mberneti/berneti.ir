# Docker Deployment Guide

This guide covers how to build, run, and deploy the React Router v7 application using Docker.

## Overview

The project includes optimized Docker configuration synced with `package.json` for:
- Local development
- Production deployment
- CI/CD pipelines (GitHub Actions)
- Third-party hosting services

## Files

- **[Dockerfile](Dockerfile)** - Multi-stage build optimized for React Router v7
- **[.dockerignore](.dockerignore)** - Excludes unnecessary files from Docker build
- **[docker-compose.yml](docker-compose.yml)** - Production deployment with Traefik
- **[ecosystem.config.cjs](ecosystem.config.cjs)** - PM2 configuration for process management
- **[.github/workflows/docker-build.yml](.github/workflows/docker-build.yml)** - Build and push to GitHub Container Registry
- **[.github/workflows/docker-build-deploy.yml](.github/workflows/docker-build-deploy.yml)** - Build, push, and deploy workflow

## Quick Start

### Local Development

```bash
# Build and run with docker-compose
docker-compose up --build

# Or build manually
docker build -t berneti-blog .
docker run -p 3030:3030 berneti-blog
```

### Production Deployment

```bash
# Using docker-compose (recommended)
docker-compose up -d

# Or manually
docker build -t berneti-blog:latest .
docker run -d \
  --name berneti-blog \
  -p 3030:3030 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  berneti-blog:latest
```

## Dockerfile Structure

The Dockerfile uses multi-stage builds for optimization:

1. **base** - Base Node.js 22 Alpine image
2. **deps** - Install all dependencies
3. **builder** - Build the React Router application
4. **runner** - Minimal production runtime image

### Key Features

- ✅ Synced with React Router v7 (not Next.js)
- ✅ Multi-stage builds for minimal image size
- ✅ Layer caching optimization
- ✅ Non-root user for security
- ✅ Health checks included
- ✅ PM2 process management
- ✅ Support for multiple package managers (npm, yarn, pnpm)

## GitHub Actions CI/CD

### Setup Instructions

1. **Enable GitHub Container Registry**
   - Go to your repository Settings → Packages
   - Enable "Inherit access from repository"

2. **Configure Secrets (for deployment workflow)**

   For SSH deployment, add these secrets in GitHub Settings → Secrets:
   ```
   DEPLOY_HOST       - Your server hostname/IP
   DEPLOY_USER       - SSH username
   DEPLOY_SSH_KEY    - Private SSH key for authentication
   DEPLOY_PORT       - SSH port (default: 22)
   ```

3. **Push to trigger build**
   ```bash
   git add .
   git commit -m "Update Docker configuration"
   git push origin main
   ```

### Available Workflows

#### 1. Build and Push (`docker-build.yml`)
- Triggers on: Push to main/master/develop, PRs
- Builds multi-platform images (amd64, arm64)
- Pushes to GitHub Container Registry
- Uses layer caching for faster builds

#### 2. Build, Push & Deploy (`docker-build-deploy.yml`)
- Triggers on: Push to main/master
- Builds and pushes image
- Deploys to remote server via SSH
- Includes alternatives for DigitalOcean, AWS ECS

## Environment Variables

The application uses these environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node environment |
| `PORT` | `3030` | Application port |

## Deployment to Third-Party Services

### GitHub Container Registry

Images are automatically pushed to `ghcr.io/YOUR_USERNAME/berneti-blog`

Pull and run:
```bash
docker pull ghcr.io/YOUR_USERNAME/berneti-blog:latest
docker run -p 3030:3030 ghcr.io/YOUR_USERNAME/berneti-blog:latest
```

### DigitalOcean App Platform

1. Connect your GitHub repository
2. Choose "Docker Hub" deployment method
3. Point to `ghcr.io/YOUR_USERNAME/berneti-blog:latest`
4. Set environment variables
5. Deploy

### AWS ECS / Fargate

1. Push image to ECR or use GHCR
2. Create task definition with the image
3. Create ECS service
4. Configure load balancer (ALB)

### Railway / Render / Fly.io

These platforms auto-detect Dockerfile:

```bash
# Railway
railway up

# Render
# Connect repo in dashboard, auto-detects Dockerfile

# Fly.io
fly launch
fly deploy
```

### Docker Hub

To push to Docker Hub instead of GHCR:

```bash
docker build -t YOUR_USERNAME/berneti-blog:latest .
docker push YOUR_USERNAME/berneti-blog:latest
```

Update GitHub Actions workflows to use Docker Hub credentials.

## Optimization Features

### Build Optimization
- ✅ Layer caching for dependencies
- ✅ Multi-stage builds reduce final image size
- ✅ Only production dependencies in final image
- ✅ .dockerignore reduces build context

### Runtime Optimization
- ✅ PM2 process management
- ✅ Health checks for container orchestration
- ✅ Non-root user for security
- ✅ Alpine Linux for minimal footprint
- ✅ Log volume mounting for persistence

### CI/CD Optimization
- ✅ GitHub Actions cache for faster builds
- ✅ Conditional deployment (only on main branch)
- ✅ Multi-platform builds
- ✅ Automated image tagging

## Troubleshooting

### Build fails during npm install

Check that lock files are committed:
```bash
git add package-lock.json yarn.lock
git commit -m "Add lock files"
```

### Container exits immediately

Check logs:
```bash
docker logs berneti-blog
```

Ensure the build output exists:
```bash
npm run build
ls -la build/server/index.js
```

### Port already in use

Change the port mapping:
```bash
docker run -p 3031:3030 berneti-blog
```

### PM2 logs not appearing

Mount the logs directory:
```bash
docker run -v ./logs:/app/logs berneti-blog
```

## Advanced Configuration

### Without PM2 (Simpler setup)

Modify Dockerfile to remove PM2:

```dockerfile
# Instead of PM2
CMD ["node", "./build/server/index.js"]
```

### Enable Cluster Mode

Uncomment in `ecosystem.config.cjs`:
```javascript
instances: "max",
exec_mode: "cluster",
```

### Custom Registry

Uncomment in Dockerfile:
```dockerfile
RUN npm config set registry https://mirror-npm.runflare.com/
```

## Performance Monitoring

Access PM2 monitoring:
```bash
docker exec -it berneti-blog pm2 monit
```

View PM2 logs:
```bash
docker exec -it berneti-blog pm2 logs
```

## Resources

- [React Router Docs](https://reactrouter.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

## Support

For issues related to:
- Docker configuration: Check this guide
- React Router: See [React Router documentation](https://reactrouter.com/docs)
- GitHub Actions: Check [workflow logs](.github/workflows/)
