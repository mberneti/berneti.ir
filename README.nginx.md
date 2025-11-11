# Nginx Reverse Proxy Setup

This setup wraps your React Router application with nginx to handle domain redirects (berneti.ir → www.berneti.ir).

## Files

- `Dockerfile.nginx` - Multi-stage Docker build with nginx and your app
- `nginx.conf` - HTTP-only configuration (for testing/development)
- `nginx-ssl.conf` - HTTPS configuration (for production with SSL certificates)

## Usage

### Option 1: Basic HTTP Setup (Testing/Development)

Build and run the container:

```bash
# Build the image
docker build -f Dockerfile.nginx -t berneti-app .

# Run the container
docker run -d -p 80:80 --name berneti-app berneti-app

# View logs
docker logs -f berneti-app

# Stop and remove
docker stop berneti-app
docker rm berneti-app
```

### Option 2: HTTPS Setup (Production)

1. **Prepare SSL certificates** - Place your SSL certificate files in a directory:
   ```bash
   mkdir -p ssl
   # Copy your cert.pem and key.pem files here
   ```

2. **Update nginx config** - Replace the default config with SSL version:
   ```bash
   cp nginx-ssl.conf nginx.conf
   ```

3. **Build and run with SSL certificates mounted**:
   ```bash
   # Build the image
   docker build -f Dockerfile.nginx -t berneti-app .

   # Run with SSL certificates mounted
   docker run -d \
     -p 80:80 \
     -p 443:443 \
     -v $(pwd)/ssl:/etc/nginx/ssl:ro \
     --name berneti-app \
     berneti-app
   ```

### Option 3: Use with existing Dockerfile (No nginx)

If you want to keep using your original setup without nginx:

```bash
docker build -f Dockerfile -t berneti-app .
docker run -d -p 3030:3030 --name berneti-app berneti-app
```

## Testing

Test the redirects locally by adding entries to `/etc/hosts`:

```bash
# Add these lines to /etc/hosts
127.0.0.1 berneti.ir
127.0.0.1 www.berneti.ir
```

Then visit:
- http://berneti.ir → should redirect to http://www.berneti.ir
- http://www.berneti.ir → should show your app

## Docker Commands Reference

```bash
# Build
docker build -f Dockerfile.nginx -t berneti-app .

# Run (HTTP only)
docker run -d -p 80:80 --name berneti-app berneti-app

# Run (HTTP + HTTPS)
docker run -d -p 80:80 -p 443:443 -v $(pwd)/ssl:/etc/nginx/ssl:ro --name berneti-app berneti-app

# View logs
docker logs -f berneti-app

# Shell into container
docker exec -it berneti-app sh

# Stop
docker stop berneti-app

# Start
docker start berneti-app

# Remove
docker rm berneti-app

# Remove image
docker rmi berneti-app
```

## Troubleshooting

### Check if services are running inside container:
```bash
docker exec -it berneti-app supervisorctl status
```

### Check nginx configuration:
```bash
docker exec -it berneti-app nginx -t
```

### View nginx logs:
```bash
docker exec -it berneti-app tail -f /var/log/nginx/access.log
docker exec -it berneti-app tail -f /var/log/nginx/error.log
```

### Check app logs:
```bash
docker exec -it berneti-app pm2 logs
```

## Production Deployment

For production deployment, you'll typically:

1. Build the image on your CI/CD platform
2. Push to a container registry (Docker Hub, GitHub Container Registry, etc.)
3. Pull and run on your production server
4. Use a reverse proxy or load balancer (like Cloudflare, AWS ALB, etc.) in front
5. Manage SSL/TLS at the load balancer level or use Let's Encrypt with certbot

### Let's Encrypt SSL Certificates

If you need free SSL certificates, you can use Let's Encrypt with certbot. You would typically:
1. Install certbot on your host machine
2. Obtain certificates using certbot
3. Mount the certificate directory into the container
