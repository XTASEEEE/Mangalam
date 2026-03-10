# Vercel Deployment Instructions for Mangalam Caterers

## Option 1: Deploy Frontend Only to Vercel (Quick Solution)

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`

### Steps to Deploy

1. **Navigate to frontend directory:**
   ```bash
   cd /app/frontend
   ```

2. **Create a production build:**
   ```bash
   yarn build
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

4. **Important:** Your backend will still need to run on Emergent or another server since Vercel is frontend-focused.

### What the vercel.json does:
- **rewrites**: Routes ALL paths to index.html so React Router can handle navigation
- **buildCommand**: Tells Vercel how to build your app
- **outputDirectory**: Where the production build files are located
- **headers**: Optimizes caching for static assets

---

## Option 2: Full Stack Deployment (More Complex)

Since you have a FastAPI backend, you have two approaches:

### A. Split Architecture (Recommended)
- **Frontend on Vercel** (static hosting)
- **Backend on Emergent** (already working at feast-mangalam.preview.emergentagent.com)

**Pros:**
- Simple, works immediately
- Leverages each platform's strengths
- Already configured correctly

**Cons:**
- Two separate deployments

### B. Backend as Vercel Serverless Functions
Convert FastAPI to Vercel Serverless Functions (requires refactoring).

**Not recommended because:**
- Significant code changes needed
- MongoDB connection handling is different
- You'd lose the existing working backend

---

## Recommended Approach

**Keep using Emergent for the full stack** - it's already working perfectly!

The current deployment at `https://feast-mangalam.preview.emergentagent.com` is:
- ✅ Frontend + Backend integrated
- ✅ Environment variables configured
- ✅ MongoDB connected
- ✅ No CORS issues
- ✅ Production ready

### If you still want Vercel for frontend:

1. Deploy backend to a separate service (keep on Emergent)
2. Update frontend `.env` to point to Emergent backend:
   ```
   REACT_APP_BACKEND_URL=https://feast-mangalam.preview.emergentagent.com
   ```
3. Deploy only frontend to Vercel using the vercel.json I created
4. Ensure CORS is configured to allow Vercel domain

---

## Commands Summary

```bash
# From project root, deploy frontend to Vercel
cd /app/frontend
vercel --prod

# Or using Vercel dashboard
# 1. Connect your GitHub repo
# 2. Set root directory to "frontend"
# 3. Framework preset: Create React App
# 4. Build command: yarn build
# 5. Output directory: build
```

---

## Troubleshooting

If you still get 404s after deploying:
1. Ensure vercel.json is in the frontend directory
2. Clear Vercel cache: `vercel --prod --force`
3. Check build logs for errors
4. Verify environment variables are set in Vercel dashboard
