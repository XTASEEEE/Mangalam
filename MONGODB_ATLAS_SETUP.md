# 🗄️ MongoDB Atlas Setup for Vercel Deployment

## Why MongoDB Atlas?

Vercel serverless functions can't connect to local MongoDB. You need a **cloud database**.

**MongoDB Atlas** is:
- ✅ Free tier available (512MB)
- ✅ Cloud-hosted MongoDB
- ✅ Works perfectly with Vercel
- ✅ Easy to set up (5 minutes)

---

## 📝 Step-by-Step: Create MongoDB Atlas Account

### Step 1: Sign Up for MongoDB Atlas

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with:
   - Email address, OR
   - Google account
3. Complete registration

---

### Step 2: Create a Free Cluster

1. After login, click **"Build a Database"**
2. Choose **FREE** tier (M0 Sandbox)
   - 512MB storage
   - Shared RAM
   - Perfect for your needs
3. **Cloud Provider**: Choose **AWS**
4. **Region**: Choose closest to your users (e.g., `Mumbai` or `Singapore`)
5. **Cluster Name**: `MangalamCatering` (or any name)
6. Click **"Create"**

⏱️ Wait 1-3 minutes for cluster creation

---

### Step 3: Create Database User

1. You'll see a security quickstart
2. **Authentication Method**: Username and Password
3. **Username**: `mangalam_admin` (or your choice)
4. **Password**: Click **"Autogenerate Secure Password"**
   - **COPY THIS PASSWORD** - you'll need it!
5. Click **"Create User"**

---

### Step 4: Set Up Network Access

1. **Where would you like to connect from?**: Choose **"Cloud Environment"**
2. Click **"Add IP Address"**
3. **Access List Entry**: `0.0.0.0/0` (allows access from anywhere)
   - This is safe for Vercel serverless functions
4. Click **"Add Entry"**
5. Click **"Finish and Close"**

---

### Step 5: Get Connection String

1. Click **"Connect"** button on your cluster
2. Choose **"Drivers"**
3. **Driver**: Python
4. **Version**: 3.6 or later
5. **Copy the connection string**:
   ```
   mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Replace `<password>`** with the password you copied earlier
7. **Add database name** at the end:
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/mangalam_caterers?retryWrites=true&w=majority
   ```

---

## ✅ Example Connection String

```
mongodb+srv://mangalam_admin:MySecurePassword123@cluster0.xxxxx.mongodb.net/mangalam_caterers?retryWrites=true&w=majority
```

**Parts:**
- `mangalam_admin` - Your username
- `MySecurePassword123` - Your password
- `cluster0.xxxxx.mongodb.net` - Your cluster URL
- `mangalam_caterers` - Your database name

---

## 🔧 Add to Vercel Environment Variables

### Option 1: Via Vercel Dashboard

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add these variables:

```
Name: MONGO_URL
Value: mongodb+srv://username:password@cluster.mongodb.net/mangalam_caterers?retryWrites=true&w=majority

Name: MONGODB_URI
Value: [same as above]

Name: DB_NAME
Value: mangalam_caterers

Name: GMAIL_USER
Value: srd.hospitality.india@gmail.com

Name: GMAIL_APP_PASSWORD
Value: [your Gmail app password]

Name: NOTIFICATION_EMAIL
Value: srd.hospitality.india@gmail.com
```

4. Select: **Production**, **Preview**, **Development**
5. Click **Save**

---

### Option 2: Via Vercel CLI

```bash
cd /app/backend

# Add MongoDB URL
vercel env add MONGO_URL production
# Paste: mongodb+srv://...

vercel env add MONGODB_URI production
# Paste: [same as above]

vercel env add DB_NAME production
# Enter: mangalam_caterers

vercel env add GMAIL_USER production
# Enter: srd.hospitality.india@gmail.com

vercel env add GMAIL_APP_PASSWORD production
# Paste: [your app password]

vercel env add NOTIFICATION_EMAIL production
# Enter: srd.hospitality.india@gmail.com
```

---

## 🔄 Migrate Existing Data (Optional)

If you have data in local MongoDB:

### Export from Local MongoDB
```bash
mongoexport --db=test_database --collection=inquiries --out=inquiries.json
```

### Import to MongoDB Atlas
```bash
mongoimport --uri="mongodb+srv://username:password@cluster.mongodb.net/mangalam_caterers" \
  --collection=inquiries \
  --file=inquiries.json \
  --jsonArray
```

---

## 🧪 Test Connection

### Test Locally First:
```python
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def test_connection():
    client = AsyncIOMotorClient("mongodb+srv://...")
    db = client['mangalam_caterers']
    
    # Test insert
    result = await db.test.insert_one({"test": "data"})
    print(f"Inserted: {result.inserted_id}")
    
    # Test find
    doc = await db.test.find_one({"test": "data"})
    print(f"Found: {doc}")

asyncio.run(test_connection())
```

---

## 💰 Pricing

**FREE Tier (M0):**
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Perfect for your needs
- ✅ No credit card required

**Upgrade Later if Needed:**
- M2: $9/month (2GB)
- M5: $25/month (5GB)

For a catering business website, **FREE tier is sufficient**.

---

## 🔒 Security Best Practices

1. **Never commit connection strings to Git**
2. **Use environment variables only**
3. **Rotate passwords periodically**
4. **Use specific IP whitelist** (if not using serverless)
5. **Enable database-level authentication**

---

## 📊 Monitor Your Database

1. Go to MongoDB Atlas dashboard
2. Click on your cluster
3. View:
   - **Collections** - See your data
   - **Metrics** - Database performance
   - **Logs** - Connection attempts
   - **Alerts** - Set up notifications

---

## ✅ Checklist

- [ ] MongoDB Atlas account created
- [ ] Free cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Password replaced in connection string
- [ ] Database name added to connection string
- [ ] Environment variables added to Vercel
- [ ] Test connection successful

---

## 🆘 Troubleshooting

### "Authentication failed"
- Check username and password in connection string
- Ensure password is URL-encoded (no special characters)

### "Connection timeout"
- Check network access settings
- Ensure 0.0.0.0/0 is whitelisted

### "Database not found"
- Database is created automatically on first insert
- Verify database name in connection string

---

**Once MongoDB Atlas is set up, your backend is ready for Vercel!** 🚀
