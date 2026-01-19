# 🚀 Deployment Guide

## Quick Start for GitHub Pages

Your app is being deployed to: **https://nkgoma.github.io/DogSitting/**

However, since this is a full-stack application, you need to deploy **two parts**:

### 1. Frontend (GitHub Pages) ✅
The React frontend is automatically deployed to GitHub Pages when you push to the branch.

### 2. Backend (Needs Separate Hosting) ⚠️
The Node.js backend with MongoDB needs to be hosted on a server.

---

## Current Setup

### Frontend is Live at:
**https://nkgoma.github.io/DogSitting/**

### Backend Options:

#### Option A: Free Backend Hosting (Recommended)

**1. Railway.app** (Easiest)
- Sign up at https://railway.app
- Create new project
- Deploy from GitHub (connect your repository)
- Add MongoDB database
- Set environment variables
- Get your backend URL (e.g., `https://your-app.railway.app`)

**2. Render.com** (Free tier)
- Sign up at https://render.com
- Create "Web Service" from GitHub
- Add MongoDB (free tier available)
- Deploy backend folder
- Get your backend URL

**3. Fly.io** (Free tier)
```bash
cd backend
flyctl launch
flyctl deploy
```

#### Option B: Deploy Everything Locally (For Testing)

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend (built version)
cd frontend
npm run build
npm run preview
```

---

## Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository settings: https://github.com/NKGoma/DogSitting/settings/pages
2. Under "Source", select "GitHub Actions"
3. Save

The site will automatically deploy when you push to your branch!

### Step 2: Deploy Backend

Choose one of the options above. Let's use **Railway** as an example:

1. Go to https://railway.app and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `NKGoma/DogSitting`
4. Choose the `backend` folder
5. Add MongoDB database:
   - Click "New" → "Database" → "Add MongoDB"
6. Set environment variables in Railway:
   ```
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this
   NODE_ENV=production
   ```
   MongoDB URL will be automatically set by Railway

7. Deploy! You'll get a URL like: `https://dogsitting-production-xxxx.up.railway.app`

### Step 3: Update Frontend API URL

1. In your repository, edit `frontend/.env.production`:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Update production API URL"
   git push
   ```

3. GitHub Pages will automatically rebuild with the new backend URL!

---

## Testing Your Deployment

1. Visit: https://nkgoma.github.io/DogSitting/
2. Register a new account
3. Complete your profile with Postleitzahl
4. Add dogs if you're a dog owner
5. Search for sitters or dogs!

---

## Current Status

✅ Frontend code ready
✅ GitHub Pages workflow configured
✅ Build successful
⚠️ Backend needs deployment (currently set to localhost)
⚠️ Database needs setup

## Next Steps

1. **Enable GitHub Pages** in repository settings
2. **Deploy backend** to Railway/Render/Fly.io
3. **Update API URL** in `.env.production`
4. **Test the live site!**

---

## Development vs Production

### Development (Local)
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Database: Local MongoDB

### Production
- Frontend: `https://nkgoma.github.io/DogSitting/`
- Backend: Your hosting service URL
- Database: Hosted MongoDB (Railway/Atlas)

---

## Troubleshooting

### "Failed to fetch" errors
- Backend is not deployed or URL is wrong
- Check `frontend/.env.production` has correct backend URL
- Ensure backend is running and accessible

### Login doesn't work
- Backend needs to be running
- Check browser console for API errors
- Verify CORS is enabled on backend

### Photos not showing
- Ensure backend uploads folder exists
- Check backend URL in photo paths
- Verify backend serves static files correctly

---

## Cost Estimate

- GitHub Pages: **FREE** ✅
- Railway.app: **$5/month** (or free tier with limits)
- MongoDB Atlas: **FREE** (512MB free tier)

**Total: Free to $5/month** 🎉

---

Need help? Check the main README.md for local development setup!
