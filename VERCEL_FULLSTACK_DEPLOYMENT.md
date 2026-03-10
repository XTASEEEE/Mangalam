# 🚀 Deploy Full Stack to Vercel - Complete Guide

## 📋 Overview

This guide will help you deploy **BOTH** frontend and backend to Vercel.

**Final Architecture:**
```
┌─────────────────────────────────┐
│   Vercel                        │
│   ┌─────────────┐              │
│   │  Frontend   │              │
│   │  (React)    │              │
│   └──────┬──────┘              │
│          │                      │
│          ↓                      │
│   ┌─────────────┐              │
│   │  Backend    │              │
│   │  (FastAPI)  │              │
│   └──────┬──────┘              │
└─────────┼────────────────────┘
          │
          ↓
┌─────────────────┐
│ MongoDB Atlas   │
│ (Cloud DB)      │
└─────────────────┘
```

---

## ✅ Prerequisites

### 1. MongoDB Atlas Account
- [ ] Created (see `/app/MONGODB_ATLAS_SETUP.md`)
- [ ] Connection string ready
- [ ] Database name: `mangalam_caterers`

### 2. Gmail App Password
- [ ] Generated (see `/app/GMAIL_SETUP_GUIDE.md`)
- [ ] 16-character password ready

### 3. Vercel Account
- [ ] Signed up at vercel.com
- [ ] CLI installed (optional)

### 4. Git Repository
- [ ] Code pushed to GitHub/GitLab
- [ ] Or ready for CLI deployment

---

## 🎯 Deployment Options

### **Option 1: Separate Projects (Recommended)**
- Frontend: One Vercel project
- Backend: Another Vercel project
- Easier to manage
- Clear separation

### **Option 2: Monorepo**
- Both in one Vercel project
- More complex configuration
- Single deployment

**This guide covers Option 1** (recommended)

---

## 📦 Part 1: Deploy Backend to Vercel

### Step 1: Prepare Backend Repository

If using separate repos:
```bash
# Create backend-only repo
cd /app
mkdir mangalam-backend
cp -r backend/* mangalam-backend/
cd mangalam-backend

git init
git add .
git commit -m "Initial backend setup"
git remote add origin https://github.com/yourusername/mangalam-backend.git
git push -u origin main
```

---

### Step 2: Deploy Backend via Vercel Dashboard

1. **Go to:** https://vercel.com/new
2. **Import Git Repository**
3. **Select:** `mangalam-backend` repository
4. **Configure Project:**
   - **Framework Preset**: Other
   - **Root Directory**: `.` (leave as is)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

5. **Environment Variables** (CRITICAL):
   Click "Add" and enter these:

   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/mangalam_caterers?retryWrites=true&w=majority
   
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mangalam_caterers?retryWrites=true&w=majority
   
   DB_NAME=mangalam_caterers
   
   GMAIL_USER=srd.hospitality.india@gmail.com
   
   GMAIL_APP_PASSWORD=your-16-char-app-password
   
   NOTIFICATION_EMAIL=srd.hospitality.india@gmail.com
   
   CORS_ORIGINS=*
   ```

6. **Click "Deploy"**
7. **Wait 2-3 minutes**
8. **Note your backend URL:** `https://mangalam-backend.vercel.app`

---

### Step 3: Deploy Backend via CLI

```bash
cd /app/backend

# Login to Vercel
vercel login

# Deploy
vercel

# Answer prompts:
# Set up and deploy? Y
# Which scope? [Your account]
# Link to existing project? N
# Project name? mangalam-backend
# Directory? ./
# Override settings? N

# Add environment variables
vercel env add MONGO_URL production
# Paste: mongodb+srv://...

vercel env add MONGODB_URI production
# Paste: [same as above]

vercel env add DB_NAME production
# Enter: mangalam_caterers

vercel env add GMAIL_USER production
# Enter: srd.hospitality.india@gmail.com

vercel env add GMAIL_APP_PASSWORD production
# Paste: [app password]

vercel env add NOTIFICATION_EMAIL production
# Enter: srd.hospitality.india@gmail.com

vercel env add CORS_ORIGINS production
# Enter: *

# Deploy to production
vercel --prod
```

---

### Step 4: Test Backend

```bash
# Get your backend URL
BACKEND_URL="https://mangalam-backend.vercel.app"

# Test health check
curl $BACKEND_URL/api

# Test contact form
curl -X POST "$BACKEND_URL/api/contact/inquiry" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9999999999",
    "eventType": "wedding",
    "guestCount": "100",
    "eventDate": "2024-06-15",
    "message": "This is a test inquiry"
  }'

# Should return:
# {"success": true, "message": "...", "inquiryId": "..."}
```

---

## 📦 Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend Environment

Update `/app/frontend/.env.production`:
```env
REACT_APP_BACKEND_URL=https://mangalam-backend.vercel.app
```

**IMPORTANT:** Replace with YOUR actual backend URL from Step 4 above.

---

### Step 2: Update CORS in Backend

After getting frontend URL, update backend CORS:

In Vercel dashboard → mangalam-backend → Settings → Environment Variables:
```
CORS_ORIGINS=https://your-frontend.vercel.app,https://*.vercel.app
```

Redeploy backend:
```bash
vercel --prod
```

---

### Step 3: Deploy Frontend via Dashboard

1. **Go to:** https://vercel.com/new
2. **Import:** `mangalam-caterers` repository (or frontend repo)
3. **Configure:**
   - **Framework**: Create React App
   - **Root Directory**: `frontend` (if monorepo)
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`

4. **Environment Variables:**
   ```
   REACT_APP_BACKEND_URL=https://mangalam-backend.vercel.app
   ```

5. **Deploy**

---

### Step 4: Deploy Frontend via CLI

```bash
cd /app/frontend

# Update .env.production with backend URL
echo "REACT_APP_BACKEND_URL=https://mangalam-backend.vercel.app" > .env.production

# Deploy
vercel --prod

# Add env variable
vercel env add REACT_APP_BACKEND_URL production
# Enter: https://mangalam-backend.vercel.app

# Redeploy with env
vercel --prod --force
```

---

## ✅ Verification Checklist

### Backend Verification:
- [ ] `/api` endpoint returns JSON
- [ ] `/api/contact/inquiry` POST works
- [ ] Email sent when form submitted
- [ ] Data saved to MongoDB Atlas
- [ ] No CORS errors in browser console

### Frontend Verification:
- [ ] All pages load correctly
- [ ] Contact form submits successfully
- [ ] Success message appears
- [ ] Browser console shows no errors
- [ ] API calls go to correct backend URL

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Errors

**Error:** `Access to fetch blocked by CORS policy`

**Solution:**
1. Update backend env variable:
   ```
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```
2. Redeploy backend
3. Clear browser cache

---

### Issue 2: MongoDB Connection Timeout

**Error:** `MongoServerSelectionError: connection timeout`

**Solutions:**
1. Check MongoDB Atlas network access (0.0.0.0/0)
2. Verify connection string is correct
3. Ensure database user has correct permissions
4. Check MongoDB Atlas cluster is running

---

### Issue 3: Email Not Sending

**Error:** `Authentication failed` or no email received

**Solutions:**
1. Verify Gmail App Password is correct
2. Check it's added to Vercel env variables
3. Ensure 2FA is enabled on Gmail
4. Check backend logs in Vercel dashboard

---

### Issue 4: Cold Start Delays

**Symptom:** First request takes 5-10 seconds

**This is normal for serverless!**
- First request "wakes up" the function
- Subsequent requests are fast
- Upgrade to Vercel Pro for better performance

---

### Issue 5: Environment Variables Not Working

**Solutions:**
1. Redeploy after adding env variables
2. Use `vercel --prod --force`
3. Check variable names match exactly
4. Verify "Production" scope is selected

---

## 📊 Monitoring & Logs

### View Backend Logs:
1. Go to Vercel Dashboard
2. Select your backend project
3. Click on a deployment
4. Click **"Functions"** tab
5. View real-time logs

### View Frontend Logs:
1. Browser developer console (F12)
2. Network tab for API calls
3. Vercel dashboard for build logs

---

## 💰 Cost Breakdown

### Vercel:
- **Hobby (Free):**
  - Unlimited frontend deployments
  - 100GB bandwidth/month
  - Serverless functions included
  - Perfect for your needs

### MongoDB Atlas:
- **M0 (Free):**
  - 512MB storage
  - Shared RAM
  - Sufficient for hundreds of inquiries

### Gmail:
- **Free** (using your existing account)

**Total Cost: $0/month** ✅

---

## 🚀 Post-Deployment Tasks

### 1. Custom Domain (Optional)
1. Go to Vercel project → Settings → Domains
2. Add your domain: `mangalamcaterers.com`
3. Update DNS records
4. Update CORS_ORIGINS with new domain

### 2. Set Up Analytics
1. Enable Vercel Analytics (free)
2. Monitor visitor traffic
3. Track form submissions

### 3. Set Up Alerts
1. MongoDB Atlas → Alerts
2. Get notified of issues
3. Monitor database usage

---

## 🔄 Update Workflow

### Update Frontend:
```bash
cd /app/frontend
# Make changes
git add .
git commit -m "Update frontend"
git push
# Vercel auto-deploys
```

### Update Backend:
```bash
cd /app/backend
# Make changes
git add .
git commit -m "Update backend"
git push
# Vercel auto-deploys
```

Or manual deploy:
```bash
vercel --prod
```

---

## 📱 Mobile Testing

Test on mobile devices:
1. Visit your Vercel URLs on phone
2. Test contact form submission
3. Check responsive design
4. Verify WhatsApp integration

---

## 🎓 Best Practices

1. **Separate Deployments:** Frontend and backend separate
2. **Environment Variables:** Never commit secrets
3. **Database Backups:** Export MongoDB data regularly
4. **Monitor Logs:** Check Vercel logs weekly
5. **Test Before Deploy:** Always test locally first

---

## ✅ Final Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Vercel
- [ ] Backend tested and working
- [ ] Frontend env updated with backend URL
- [ ] Frontend deployed to Vercel
- [ ] Contact form tested end-to-end
- [ ] Email notifications working
- [ ] Customer confirmation emails working
- [ ] No console errors
- [ ] Mobile responsive

---

## 🎉 Success!

**You now have:**
- ✅ Frontend on Vercel
- ✅ Backend on Vercel
- ✅ MongoDB Atlas database
- ✅ Contact form fully functional
- ✅ Email notifications working
- ✅ Globally distributed
- ✅ Auto-scaling
- ✅ Free hosting!

**Your URLs:**
- Frontend: `https://your-site.vercel.app`
- Backend: `https://your-backend.vercel.app`

---

## 🆘 Need Help?

1. Check Vercel deployment logs
2. Review MongoDB Atlas connection
3. Verify environment variables
4. Test with curl commands
5. Check browser console

**Common Commands:**
```bash
# View logs
vercel logs [deployment-url]

# Force redeploy
vercel --prod --force

# List environment variables
vercel env ls

# Test backend
curl https://your-backend.vercel.app/api
```

---

**Congratulations! Your full-stack application is now live on Vercel!** 🚀
