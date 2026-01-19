# 🎉 GitHub Pages Demo Version

Your dog sitting marketplace now works **100% on GitHub Pages** with **no backend required**!

## ✨ What Changed

This is now a **client-side only demo** that:
- ✅ Stores all data in your browser's localStorage
- ✅ Works completely offline after first load
- ✅ Requires NO backend server or database
- ✅ Can be deployed to GitHub Pages with one click!

## 🚀 Your Live App

**https://nkgoma.github.io/DogSitting/**

## 📱 Try It Now!

### Demo Accounts (Pre-loaded)

Login with any of these demo accounts to see the app in action:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| anna@example.com | demo123 | Beides | Has 1 dog (Bella), experienced sitter |
| max@example.com | demo123 | Hundesitter | Professional sitter, 5-star rating |
| sarah@example.com | demo123 | Hundebesitzer | Has 2 dogs (Rocky & Luna) |
| tom@example.com | demo123 | Hundesitter | Only small dogs, home office |

### Or Create Your Own Account!

1. Click "Jetzt registrieren"
2. Fill in your details (use any Postleitzahl like 10115, 10178, etc.)
3. Start using the app!

All your data is saved in your browser - no servers needed!

## 🎯 Features That Work

✅ **User Registration & Login**
✅ **Profile Management** - Edit profile, add availability, experience
✅ **Dog Profiles** - Add multiple dogs with photos
✅ **Smart Search** - Find sitters by:
  - Postleitzahl (postal code)
  - Distance (10km to 200km radius)
  - Available days
  - Experience level
  - Dog size compatibility

✅ **Match Finding** - Like Tinder but for dog sitting!
✅ **Reviews & Ratings** - Rate sitters after sitting
✅ **Photo Uploads** - For profiles and dogs (stored as data URLs)
✅ **Distance Calculation** - Approximate distance between postal codes

## 🔧 How It Works

Instead of a Node.js backend + MongoDB:
- **Data Storage**: Browser localStorage (persistent)
- **Authentication**: Mock JWT tokens
- **Distance Calc**: Simple postal code zone math
- **Photos**: Stored as base64 data URLs

## 📊 Data Persistence

Your data is saved in your browser and will persist:
- ✅ After closing the browser
- ✅ After page refresh
- ✅ Across sessions

⚠️ Data is **per-browser** - different browsers won't share data.

## 🎨 Perfect For

- ✅ **Demos & Presentations** - Show off the concept
- ✅ **Portfolio Projects** - Fully functional without infrastructure
- ✅ **Prototyping** - Test UX before building real backend
- ✅ **Learning** - Understand React without backend complexity

## 🔄 Switch to Real Backend (Optional)

Want to add a real backend later? Easy!

1. The original backend code is still in `/backend`
2. Deploy it to Railway/Render/Fly.io
3. Update `frontend/src/utils/api.js` to use the real API
4. Done!

## 🚀 Deployment Status

✅ **Frontend**: Automatically deploys to GitHub Pages on push
✅ **Build**: Successful
✅ **Demo Data**: Pre-loaded with 4 users and 3 dogs
✅ **Ready**: 100% functional right now!

## 📝 Quick Start for Development

```bash
# Start development server
cd frontend
npm install
npm run dev

# Visit http://localhost:5173
```

## 🎓 Architecture

```
┌─────────────────────────────────────┐
│      GitHub Pages (Static)          │
│  https://nkgoma.github.io/DogSitting│
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       React Frontend                │
│  - Components                       │
│  - Mock API (mockApi.js)            │
│  - Demo Data (demoData.js)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    Browser localStorage             │
│  - Users                            │
│  - Dogs                             │
│  - Reviews                          │
└─────────────────────────────────────┘
```

## 💡 Tips

1. **Try the search!** Login as Anna and search for sitters near 10115
2. **Check profiles** - See other users' ratings and dogs
3. **Add your own data** - Register and create your own profile
4. **Test matching** - Filter by availability, experience, dog size

## 🐛 Limitations

- Data is not shared between users (it's all local)
- Photos don't actually upload (simulated)
- Distance calculation is approximate
- No real authentication (anyone can access localStorage)

**For a production app**, use the real backend in `/backend` with MongoDB!

## 🎉 That's It!

Your app is live at: **https://nkgoma.github.io/DogSitting/**

No servers. No databases. No deployment headaches. Just pure JavaScript magic! ✨
