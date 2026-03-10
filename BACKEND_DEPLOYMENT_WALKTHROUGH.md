# 🎯 STEP-BY-STEP: Deploy Backend to Vercel (Dashboard Method)

## 📋 What You Have

Your repository structure:
```
/app/
├── frontend/          ← Already deployed successfully ✅
│   ├── src/
│   ├── vercel.json
│   └── package.json
│
└── backend/           ← We're deploying this now
    ├── api/
    │   ├── index.py   ← Serverless entry point
    │   └── requirements.txt
    ├── models/
    ├── services/
    ├── vercel.json    ← Backend config
    └── server.py
```

---

## 🚀 Part 1: Prepare Your Repository (5 minutes)

### Step 1: Verify Backend Files Exist

Run these commands to confirm everything is ready:

```bash
# Check if api/index.py exists
ls -la /app/backend/api/index.py

# Check if vercel.json exists
ls -la /app/backend/vercel.json

# Check if requirements.txt exists
ls -la /app/backend/api/requirements.txt
```

**All three should exist.** ✅

---

### Step 2: Commit and Push to GitHub

```bash
cd /app

# Add all backend files
git add backend/

# Commit
git commit -m "Add backend Vercel serverless configuration"

# Push to your repo
git push origin main
```

**⚠️ IMPORTANT:** If you haven't initialized git yet:

```bash
cd /app
git init
git add .
git commit -m "Initial commit with backend"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 🌐 Part 2: Deploy Backend via Vercel Dashboard (10 minutes)

### Step 3: Go to Vercel Dashboard

1. **Open browser:** https://vercel.com/dashboard
2. **Click:** "Add New..." button (top right)
3. **Select:** "Project"

---

### Step 4: Import Your Repository

#### Option A: If you have ONE repository (monorepo)

1. **Select your repository:** `XTASEEEE/Mangalam` (or your repo name)
2. **Click:** "Import"

#### Option B: If you created a separate backend repo

1. **Import the backend repository**
2. **Click:** "Import"

---

### Step 5: Configure Project Settings

**This is the MOST IMPORTANT step!**

You'll see a configuration screen. Set these **EXACTLY** as shown:

#### Project Settings:

```
┌─────────────────────────────────────────────────┐
│ Framework Preset: Other                         │
│                                                 │
│ Root Directory: backend          ← CRITICAL!   │
│   [Edit] → Type: backend → Save                │
│                                                 │
│ Build Command: (leave empty)                   │
│                                                 │
│ Output Directory: (leave empty)                │
│                                                 │
│ Install Command: (leave empty)                 │
└─────────────────────────────────────────────────┘
```

**Screenshot guide:**
- Look for "Root Directory" field
- Click **"Edit"** button next to it
- Type: `backend`
- Click **"Continue"** or **"Save"**

---

### Step 6: Add Environment Variables

**CRITICAL:** Click on "Environment Variables" section

Add these variables (click "Add" for each):

#### Variable 1: MONGO_URL
```
Name: MONGO_URL
Value: mongodb://localhost:27017
Environment: Production, Preview, Development (select all)
```

**⚠️ IMPORTANT:** If using MongoDB Atlas, use your Atlas connection string instead:
```
mongodb+srv://username:password@cluster.mongodb.net/mangalam_caterers
```

#### Variable 2: MONGODB_URI
```
Name: MONGODB_URI
Value: [same as MONGO_URL above]
Environment: Production, Preview, Development (select all)
```

#### Variable 3: DB_NAME
```
Name: DB_NAME
Value: mangalam_caterers
Environment: Production, Preview, Development (select all)
```

#### Variable 4: GMAIL_USER
```
Name: GMAIL_USER
Value: srd.hospitality.india@gmail.com
Environment: Production, Preview, Development (select all)
```

#### Variable 5: GMAIL_APP_PASSWORD
```
Name: GMAIL_APP_PASSWORD
Value: [your 16-character Gmail app password]
Environment: Production, Preview, Development (select all)
```

#### Variable 6: NOTIFICATION_EMAIL
```
Name: NOTIFICATION_EMAIL
Value: srd.hospitality.india@gmail.com
Environment: Production, Preview, Development (select all)
```

#### Variable 7: CORS_ORIGINS
```
Name: CORS_ORIGINS
Value: *
Environment: Production, Preview, Development (select all)
```

---

### Step 7: Deploy!

1. **Double-check:**
   - ✅ Root Directory = `backend`
   - ✅ All 7 environment variables added
   
2. **Click:** "Deploy" button (bottom of page)

3. **Wait:** 2-3 minutes for build to complete

4. **Watch the build logs** (you'll see them in real-time)

---

## ✅ Part 3: Verify Deployment (5 minutes)

### Step 8: Check if Backend is Live

After deployment succeeds, you'll see:
- ✅ Deployment URL: `https://your-backend-xxxxx.vercel.app`

**Test it immediately:**

```bash
# Replace with YOUR backend URL
BACKEND_URL="https://your-backend-xxxxx.vercel.app"

# Test health check
curl $BACKEND_URL/api

# Expected response:
# {"message": "Mangalam Caterers API", "status": "running"}
```

**In browser:**
1. Visit: `https://your-backend-xxxxx.vercel.app/api`
2. You should see JSON response

---

### Step 9: Test Contact Form Endpoint

```bash
BACKEND_URL="https://your-backend-xxxxx.vercel.app"

curl -X POST "$BACKEND_URL/api/contact/inquiry" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9999999999",
    "eventType": "wedding",
    "guestCount": "100",
    "eventDate": "2024-06-15",
    "message": "This is a test inquiry to verify backend deployment"
  }'

# Expected response:
# {"success": true, "message": "...", "inquiryId": "..."}
```

---

## 🔄 Part 4: Update Frontend to Use New Backend (5 minutes)

### Step 10: Update Frontend Environment Variable

Your frontend is currently pointing to:
```
REACT_APP_BACKEND_URL=https://feast-mangalam.preview.emergentagent.com
```

**Update to Vercel backend:**

1. **Go to:** Vercel Dashboard → Your FRONTEND project
2. **Settings → Environment Variables**
3. **Find:** `REACT_APP_BACKEND_URL`
4. **Click:** "Edit"
5. **Change to:** `https://your-backend-xxxxx.vercel.app`
6. **Click:** "Save"

---

### Step 11: Redeploy Frontend

After updating the env variable:

1. **Go to:** Deployments tab
2. **Find:** Latest deployment
3. **Click:** Three dots menu (⋮)
4. **Select:** "Redeploy"
5. **Wait:** 1-2 minutes

---

## 🧪 Part 5: End-to-End Testing (5 minutes)

### Step 12: Test the Complete Flow

1. **Visit:** Your frontend URL (e.g., `mangalam-caterers.vercel.app`)
2. **Navigate to:** Contact page
3. **Fill out the form** with test data
4. **Submit**
5. **Check:**
   - ✅ Success message appears
   - ✅ Email arrives at `srd.hospitality.india@gmail.com`
   - ✅ No errors in browser console (F12)

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "NOT_FOUND" Error During Build

**Cause:** Root Directory not set correctly

**Fix:**
1. Go to: Vercel Dashboard → Your Backend Project → Settings → General
2. Root Directory: Change to `backend`
3. Save
4. Go to: Deployments → Redeploy

---

### Issue 2: "Module not found" Error

**Cause:** Missing dependencies or wrong Python version

**Fix:**
Check `/app/backend/api/requirements.txt` exists and has:
```
fastapi==0.110.1
motor==3.3.1
pydantic[email]==2.12.5
```

Redeploy.

---

### Issue 3: "MongoServerSelectionError"

**Cause:** Can't connect to MongoDB

**Symptoms:**
- ✅ Build succeeds
- ❌ API calls fail with 500 error
- Logs show "connection timeout"

**Fix:**

**Option A:** Use MongoDB Atlas (recommended for production)
1. Follow: `/app/MONGODB_ATLAS_SETUP.md`
2. Get Atlas connection string
3. Update `MONGO_URL` in Vercel env variables
4. Redeploy

**Option B:** Keep using Emergent backend (easier)
- Don't deploy backend to Vercel
- Keep frontend on Vercel, backend on Emergent
- This is the recommended setup!

---

### Issue 4: "Authentication failed" (Email)

**Cause:** Gmail App Password not set or incorrect

**Fix:**
1. Generate Gmail App Password (see `/app/GMAIL_SETUP_GUIDE.md`)
2. Add to Vercel env variables: `GMAIL_APP_PASSWORD`
3. Redeploy

---

### Issue 5: CORS Errors in Browser

**Symptoms:**
- Frontend loads
- Form submit fails
- Console shows: "blocked by CORS policy"

**Fix:**
1. Backend env variable `CORS_ORIGINS` should be `*` or your frontend URL
2. Redeploy backend
3. Clear browser cache
4. Try again

---

## 📊 Expected Results

After successful deployment:

### Backend:
- ✅ URL: `https://your-backend.vercel.app`
- ✅ `/api` endpoint returns JSON
- ✅ `/api/contact/inquiry` accepts POST requests
- ✅ Emails send successfully

### Frontend:
- ✅ URL: `https://your-frontend.vercel.app`
- ✅ All pages load
- ✅ Contact form submits successfully
- ✅ API calls go to Vercel backend

### Full Stack:
- ✅ User fills form → Saved to MongoDB
- ✅ Email sent to you
- ✅ Confirmation sent to customer
- ✅ Success message displayed

---

## 🎓 Key Takeaways

### Why Root Directory Matters:

Your repo structure:
```
/
├── frontend/
└── backend/    ← Vercel needs to know to look here!
```

**Without Root Directory set:**
- Vercel looks in `/` (root)
- Can't find `api/index.py`
- Can't find `vercel.json`
- Returns NOT_FOUND ❌

**With Root Directory = `backend`:**
- Vercel looks in `/backend`
- Finds `api/index.py` ✅
- Finds `vercel.json` ✅
- Deployment succeeds ✅

---

## 💡 Pro Tips

1. **Always set Root Directory** for monorepos
2. **Test locally first** before deploying
3. **Check build logs** if deployment fails
4. **Use environment variables** for all secrets
5. **Test the API** with curl before testing with frontend

---

## ✅ Deployment Checklist

Before clicking Deploy:
- [ ] Root Directory set to `backend`
- [ ] All 7 environment variables added
- [ ] GitHub repo pushed with latest code
- [ ] MongoDB connection string ready (if using Atlas)
- [ ] Gmail App Password ready

After deployment:
- [ ] `/api` endpoint returns JSON
- [ ] Test inquiry endpoint with curl
- [ ] Update frontend env variable
- [ ] Redeploy frontend
- [ ] Test end-to-end form submission
- [ ] Check email arrives

---

## 🆘 Still Having Issues?

If you get stuck at any step:

1. **Check the specific error message** in build logs
2. **Verify Root Directory** is set to `backend`
3. **Confirm all env variables** are added
4. **Test with curl commands** to isolate the issue

**Share with me:**
- The exact error message from build logs
- Your Root Directory setting
- Whether you're using local MongoDB or Atlas

---

## 🎉 Success!

Once everything is working:
- ✅ Backend on Vercel
- ✅ Frontend on Vercel
- ✅ MongoDB connected
- ✅ Emails working
- ✅ Contact form functional
- ✅ $0/month hosting cost!

**You now have a production-ready, fully deployed catering website!** 🚀

---

**Ready to start? Begin with Step 1 and work your way through. Take it step by step, and you'll have it deployed in 30 minutes!**
