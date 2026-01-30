# Coolify Deployment Guide

## Quick Deploy

### Step 1: Connect Repository
1. In Coolify dashboard, click "New Resource"
2. Select "Public Repository" or "Private Repository"
3. Enter your Git repository URL
4. Select the main/master branch

### Step 2: Configure Build
Coolify will auto-detect the Dockerfile. Verify these settings:

- **Build Pack**: Dockerfile
- **Port**: 80
- **Base Directory**: / (root)
- **Dockerfile Location**: ./Dockerfile

### Step 3: Deploy
Click "Deploy" - Coolify will:
1. Clone your repository
2. Build the Docker image (multi-stage build)
3. Deploy to nginx
4. Expose on your configured domain

## Build Process

The Dockerfile uses a multi-stage build:

**Stage 1 - Build:**
- Node.js 18 Alpine
- Install dependencies with `npm ci`
- Build production assets with Vite
- Output to `/app/dist`

**Stage 2 - Production:**
- Nginx Alpine (lightweight)
- Copy built assets from Stage 1
- Serve on port 80
- Includes gzip compression and caching

## Health Check

Nginx includes a `/health` endpoint that returns `200 OK` for monitoring.

You can configure Coolify health checks:
- Path: `/health`
- Port: 80
- Interval: 30s

## Environment Variables

No environment variables needed - this is a static React app.

All data is embedded in the JavaScript bundle.

## Performance Optimizations

The nginx configuration includes:

1. **Gzip Compression**: Automatic compression for text assets
2. **Cache Headers**: 1-year cache for static assets (js, css, images)
3. **SPA Routing**: Fallback to index.html for client-side routing
4. **Security Headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection

## Domain Configuration

After deployment:
1. Go to your Coolify application settings
2. Add your custom domain
3. Enable automatic SSL (Let's Encrypt)
4. Update DNS to point to your Coolify server

## Troubleshooting

**Build fails:**
- Check that package.json exists in repository root
- Verify Dockerfile path is correct
- Check Coolify build logs for npm errors

**App doesn't load:**
- Verify port 80 is exposed
- Check nginx logs in Coolify
- Verify health check endpoint `/health` returns 200

**Assets not loading:**
- Clear browser cache
- Check Network tab in DevTools
- Verify Vite build completed successfully

## Updating Deployment

Push to your Git repository:
```bash
git add .
git commit -m "Update FIFA affordability analysis"
git push origin main
```

Coolify will automatically rebuild and redeploy (if auto-deploy enabled).

Or manually trigger deployment from Coolify dashboard.

## Resource Requirements

**Minimal:**
- CPU: 0.5 cores
- RAM: 512 MB
- Storage: 100 MB

**Recommended:**
- CPU: 1 core
- RAM: 1 GB
- Storage: 500 MB

## Custom Configuration

To customize nginx settings, edit `nginx.conf` and redeploy.

Common customizations:
- Cache duration
- Gzip compression levels
- Security headers
- Rate limiting
- Access logging
