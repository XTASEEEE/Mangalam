# 🚀 Vercel Deployment Guide - Mangalam Caterers Website

## Overview
This guide will help you deploy the **frontend** to Vercel while keeping the **backend** on Emergent.

**Architecture:**
- 🎨 Frontend (React) → Vercel
- ⚙️ Backend (FastAPI) → Emergent (already running)
- 🗄️ Database (MongoDB) → Emergent

---

## Prerequisites

1. **Vercel Account**: Sign up at https://vercel.com
2. **Git Repository** (Optional but recommended): Push code to GitHub/GitLab/Bitbucket
3. **Backend Running**: Ensure Emergent backend is live at https://feast-mangalam.preview.emergentagent.com

---

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Prepare Your Repository

If using Git, commit and push your code:
```bash
cd /app
git add frontend/
git commit -m "Prepare frontend for Vercel deployment"
git push origin main
```

### Step 2: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..." → Project**
3. Import your Git repository (or select "Import Third-Party Git Repository")
4. **Important Settings:**
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App (should auto-detect)
   - **Build Command**: `yarn build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)

### Step 3: Configure Environment Variables

In the Vercel project settings:
1. Go to **Settings → Environment Variables**
2. Add this variable:
   ```
   Name: REACT_APP_BACKEND_URL
   Value: https://feast-mangalam.preview.emergentagent.com
   Environment: Production, Preview, Development (select all)
   ```
3. Click **Save**

### Step 4: Deploy

1. Click **Deploy**
2. Wait 1-2 minutes for build to complete
3. Visit your new Vercel URL (e.g., `mangalam-caterers.vercel.app`)

---

## Method 2: Deploy via Vercel CLI (Faster)

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
# or
yarn global add vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Navigate to Frontend Directory

```bash
cd /app/frontend
```

### Step 4: Deploy to Vercel

**For first deployment:**
```bash
vercel
```

You'll be asked several questions:
- **Set up and deploy?** → Y
- **Which scope?** → Select your account
- **Link to existing project?** → N
- **Project name?** → mangalam-caterers (or your choice)
- **Directory?** → ./ (current directory)
- **Override settings?** → N

**For production deployment:**
```bash
vercel --prod
```

### Step 5: Set Environment Variables (CLI method)

```bash
vercel env add REACT_APP_BACKEND_URL production
# When prompted, enter: https://feast-mangalam.preview.emergentagent.com

# Also add for preview and development
vercel env add REACT_APP_BACKEND_URL preview
vercel env add REACT_APP_BACKEND_URL development
```

### Step 6: Redeploy After Adding Env Variables

```bash
vercel --prod
```

---

## Method 3: One-Command Deploy (Quick Test)

From the frontend directory:
```bash
cd /app/frontend
vercel --prod --confirm
```

This will deploy immediately without prompts.

---

## Post-Deployment Checklist

### ✅ Verify Deployment

1. **Homepage loads**: Visit your Vercel URL
2. **Navigation works**: Click through all pages
3. **Direct URLs work**: 
   - Try `your-site.vercel.app/about`
   - Try `your-site.vercel.app/contact`
   - All should load without 404
4. **Contact form visible**: Should be functional (submissions go to backend)
5. **Images load**: Check gallery page
6. **WhatsApp link works**: Test the WhatsApp button

### 🔍 Test Backend Connection

1. Open browser console (F12)
2. Navigate to Contact page
3. Fill out and submit the form
4. Check console for API calls
5. Should see requests to `https://feast-mangalam.preview.emergentagent.com/api/...`

### 🐛 Troubleshooting

**Issue: 404 on page refresh**
- ✅ Check `vercel.json` exists in frontend directory
- ✅ Redeploy: `vercel --prod --force`

**Issue: API calls failing**
- ✅ Check REACT_APP_BACKEND_URL in Vercel dashboard
- ✅ Verify backend is running: Visit https://feast-mangalam.preview.emergentagent.com/api/
- ✅ Check browser console for CORS errors

**Issue: Environment variables not working**
- ✅ Variable must start with `REACT_APP_`
- ✅ Redeploy after adding env variables
- ✅ Clear browser cache

**Issue: Build fails**
- ✅ Check build logs in Vercel dashboard
- ✅ Test local build: `yarn build` in frontend directory
- ✅ Check for linting errors

---

## Updating Your Deployment

### Option A: Auto-Deploy (Recommended)

1. Connect GitHub repo to Vercel
2. Every push to main branch auto-deploys
3. Pull requests get preview deployments

### Option B: Manual Deploy via CLI

```bash
cd /app/frontend
vercel --prod
```

### Option C: Via Vercel Dashboard

1. Go to your project in Vercel
2. Click "Deployments" tab
3. Click "Redeploy" on any deployment

---

## Custom Domain Setup (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `www.mangalamcaterers.com`
3. Update DNS records (Vercel provides instructions)
4. SSL certificate is automatic

---

## Cost Considerations

**Vercel Pricing:**
- ✅ Hobby Plan: **FREE**
  - Unlimited deployments
  - Automatic HTTPS
  - 100GB bandwidth/month
  - Perfect for this project

- Pro Plan: $20/month (only if you need more)

---

## Important Notes

### ⚠️ Backend Stays on Emergent

The FastAPI backend will continue running on Emergent:
- **URL**: https://feast-mangalam.preview.emergentagent.com
- **Why**: Vercel is optimized for frontend/serverless, not full Python apps
- **Cost**: Whatever your Emergent plan is

### 🔒 Security Considerations

1. **CORS**: Already configured to accept all origins (`*`)
   - For production, consider limiting to your Vercel domain:
   ```python
   # In backend server.py, update CORS origins:
   allow_origins=["https://your-site.vercel.app"]
   ```

2. **Environment Variables**: Never commit `.env` files
   - ✅ Already in .gitignore
   - ✅ Use Vercel dashboard for secrets

### 📊 Monitoring

- **Vercel Analytics**: Enable in dashboard for free visitor insights
- **Backend Logs**: Check Emergent dashboard for API errors
- **Error Tracking**: Consider adding Sentry (optional)

---

## Quick Reference Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (first time)
cd /app/frontend
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-name]
```

---

## Expected Results

After deployment, you should have:
- ✅ Frontend at: `https://[your-project].vercel.app`
- ✅ Backend at: `https://feast-mangalam.preview.emergentagent.com`
- ✅ All pages accessible with clean URLs
- ✅ Contact form functional
- ✅ WhatsApp integration working
- ✅ Gallery and packages loading correctly

---

## Need Help?

**Common Issues:**
1. 404 errors → Check vercel.json and rewrites
2. API not connecting → Verify REACT_APP_BACKEND_URL
3. Build fails → Run `yarn build` locally to test

**Resources:**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Project Dashboard: https://vercel.com/dashboard

---

## Next Steps After Deployment

1. ✅ Test all pages and functionality
2. ✅ Set up custom domain (optional)
3. ✅ Enable Vercel Analytics
4. ✅ Share site with client
5. ✅ Consider backend development (contact form submission)

---

**Ready to deploy?** Start with Method 1 (Dashboard) if you're new to Vercel, or Method 2 (CLI) for faster deployments.
