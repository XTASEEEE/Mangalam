# 📧 Gmail SMTP Setup Guide for Mangalam Caterers

## ⚠️ IMPORTANT: You Need to Complete This Setup

Your contact form is now integrated, but **you need to generate a Gmail App Password** to receive email notifications.

---

## 🔐 What is a Gmail App Password?

A Gmail App Password is a special 16-character password that allows apps (like your website) to send emails through your Gmail account securely. It's **NOT** your regular Gmail password.

**Why do you need this?**
- Google doesn't allow regular passwords for security reasons
- App Passwords are more secure and can be revoked anytime
- Required for SMTP email sending

---

## 📝 Step-by-Step: Generate Gmail App Password

### Step 1: Enable 2-Factor Authentication (2FA)

**If you already have 2FA enabled, skip to Step 2.**

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", click on **2-Step Verification**
4. Click **Get Started** and follow the prompts
5. Verify your phone number
6. Complete the 2FA setup

---

### Step 2: Generate App Password

1. **Go to App Passwords page:**
   - Visit: https://myaccount.google.com/apppasswords
   - OR:
     - Go to https://myaccount.google.com/
     - Click **Security** → Scroll down to "2-Step Verification"
     - At the bottom, click **App passwords**

2. **You may be asked to sign in again** - enter your Gmail password

3. **Create App Password:**
   - App name: Enter `Mangalam Caterers Website` or `Website Contact Form`
   - Click **Create**

4. **Copy the 16-character password:**
   - Google will show you a **16-character password** like: `abcd efgh ijkl mnop`
   - **IMPORTANT:** Copy this password immediately - you can't see it again!
   - Remove spaces when copying (or keep them, both work)

---

## 🔧 Step 3: Add to Backend Configuration

1. **Open the backend .env file:**
   ```bash
   # File location: /app/backend/.env
   ```

2. **Replace `your-gmail-app-password-here` with your actual App Password:**
   ```env
   GMAIL_USER="srd.hospitality.india@gmail.com"
   GMAIL_APP_PASSWORD="abcdefghijklmnop"  # ← Paste your 16-char password here
   NOTIFICATION_EMAIL="srd.hospitality.india@gmail.com"
   ```

3. **Save the file**

---

## 🔄 Step 4: Restart Backend Server

**IMPORTANT:** After adding the Gmail App Password, you MUST restart the backend:

```bash
sudo supervisorctl restart backend
```

**Verify it's running:**
```bash
sudo supervisorctl status backend
# Should show: backend   RUNNING
```

---

## ✅ Step 5: Test the Contact Form

1. Visit your website contact page
2. Fill out and submit the form
3. **You should receive TWO emails:**
   - ✉️ **Notification email** at: srd.hospitality.india@gmail.com
   - ✉️ **Customer confirmation** at: customer's email address

---

## 🐛 Troubleshooting

### Issue 1: Not receiving emails

**Check backend logs:**
```bash
tail -n 100 /var/log/supervisor/backend.err.log
```

**Look for errors like:**
- `Authentication failed` → App password is incorrect
- `SMTP connection failed` → Check internet connection
- `Username and Password not accepted` → 2FA might not be enabled

**Solutions:**
1. Double-check you copied the App Password correctly (no spaces or typos)
2. Verify 2FA is enabled on your Gmail account
3. Make sure you're using the App Password, not your regular Gmail password
4. Try generating a new App Password

---

### Issue 2: Emails going to spam

**Solution:**
- Check your spam/junk folder
- Mark the email as "Not Spam"
- Future emails should arrive in inbox

---

### Issue 3: Form submits but no email

**Check:**
1. Backend is running: `sudo supervisorctl status backend`
2. Environment variables are set correctly in `/app/backend/.env`
3. Backend logs for error messages

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep your App Password secret
- Store it only in the `.env` file (never commit to Git)
- Revoke and regenerate if compromised
- Use different App Passwords for different services

### ❌ DON'T:
- Share your App Password publicly
- Commit `.env` file to Git repositories
- Use your regular Gmail password
- Share screenshots with the password visible

---

## 🔄 How to Revoke/Change App Password

If you need to revoke or change the password:

1. Go to: https://myaccount.google.com/apppasswords
2. Find "Mangalam Caterers Website" in the list
3. Click **Remove** or **Revoke**
4. Generate a new one and update `.env`
5. Restart backend: `sudo supervisorctl restart backend`

---

## 📊 Where to View Customer Inquiries

### Option 1: Email Inbox
- All inquiries arrive at: **srd.hospitality.india@gmail.com**
- Nicely formatted with customer details
- Immediate notifications

### Option 2: Database (for developers)
```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/test_database

# View all inquiries
db.inquiries.find().sort({createdAt: -1}).pretty()

# Count inquiries
db.inquiries.countDocuments()
```

### Option 3: API (for admin panel - future)
```bash
# Get all inquiries
curl https://your-backend-url/api/contact/inquiries

# Get specific inquiry
curl https://your-backend-url/api/contact/inquiries/{inquiry-id}
```

---

## 🎯 What Happens When Customer Submits Form?

1. **Customer fills form** on your website
2. **Form data saved** to MongoDB database
3. **Email sent to YOU** (srd.hospitality.india@gmail.com) with inquiry details
4. **Confirmation email sent to CUSTOMER** thanking them
5. **Success message** shown to customer on website

---

## 📈 Next Steps (Optional)

### Build Admin Dashboard
I can build an admin panel where you can:
- View all inquiries in a nice interface
- Mark inquiries as "contacted" or "closed"
- Search and filter inquiries
- Export inquiries to Excel

**Would you like me to build this?**

---

## 🆘 Need Help?

If you're stuck:
1. Share the error message from backend logs
2. Confirm you've enabled 2FA
3. Verify the App Password is copied correctly
4. Check if backend is running

---

## ✅ Quick Checklist

- [ ] 2-Factor Authentication enabled on Gmail
- [ ] App Password generated
- [ ] App Password added to `/app/backend/.env`
- [ ] Backend restarted
- [ ] Test form submission
- [ ] Check email inbox
- [ ] Customer received confirmation email

---

**Once you complete these steps, your contact form will be fully functional!** 🎉

**Email:** srd.hospitality.india@gmail.com will receive all customer inquiries instantly.
