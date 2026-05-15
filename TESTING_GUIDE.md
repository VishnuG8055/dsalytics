# Testing Guide - Toast Notifications & Problem Descriptions

## 🧪 How to Test in Browser

### **Step 1: Start Development Server**
```bash
cd c:\Users\HP\dsalytics
npm run dev
# If npm doesn't work, use: node node_modules/vite/bin/vite.mjs
```

The app will be available at: `http://localhost:5173`

---

## 🔔 Testing Toast Notifications

### **Test 1: Dashboard - Profile Save**
1. Navigate to **Dashboard** page
2. Click on the **Settings icon** (gear icon in top right)
3. Edit your profile name or any field
4. Click **Save Profile** button
5. ✅ **Expected**: Green success toast appears: "Profile saved: {name}"
6. ✅ **Auto-dismisses** after 3.5 seconds

### **Test 2: Dashboard - Copy Sync Token**
1. Navigate to **Dashboard**
2. Scroll to the Onboarding section (if showing)
3. Click **Copy** button next to sync token field
4. ✅ **Expected**: Green success toast: "Token copied to clipboard!"

### **Test 3: Revisions - Sync Button**
1. Navigate to **Revisions** page
2. Click the **Sync** button (with Download icon)
3. ✅ **Expected**: Blue info toast: "Visit your Profile in the Dashboard to copy your Sync Token!"

### **Test 4: Friends - Search Errors**
1. Navigate to **Friends** page
2. Click **+ Add Friend** button
3. Enter a username that doesn't exist (e.g., "xyz123abc")
4. Click **Search**
5. ✅ **Expected**: Orange warning toast: "No user found with that username."

### **Test 5: Friends - Already Friend**
1. In the Add Friend modal, search for your own username
2. ✅ **Expected**: Blue info toast: "That's you!"

### **Test 6: Toast Auto-dismiss**
1. Trigger any toast notification
2. Wait 3.5 seconds
3. ✅ **Expected**: Toast disappears automatically

### **Test 7: Toast Manual Close**
1. Trigger any toast notification
2. Click the **X button** on the toast
3. ✅ **Expected**: Toast disappears immediately

### **Test 8: Multiple Toasts**
1. Quickly trigger multiple toasts (click sync button multiple times)
2. ✅ **Expected**: Toasts stack vertically at bottom-right

---

## 📋 Testing Problem Descriptions in Revision Modal

### **Test 1: Open Problem Modal**
1. Navigate to **Revisions** page
2. Click on any problem card from the list
3. ✅ **Expected**: Modal opens with problem details

### **Test 2: Problem Description Loading**
1. In the modal, watch for "Loading problem details..." message
2. ✅ **Expected**: Loader spins briefly, then description appears
3. ✅ **Description** shows first 500 characters of the problem
4. ✅ **"View Full Problem on LeetCode →"** link appears if content is longer

### **Test 3: Problem Description Content**
1. Open any problem modal
2. ✅ **Expected**: See description like:
   - "Given an array of integers nums and an integer target..."
   - "You may assume that each input has exactly one solution..."
   - "You can return the answer in any order..."

### **Test 4: View on LeetCode Link**
1. In the modal, click **"View on LeetCode"** button at bottom
2. ✅ **Expected**: New tab opens to the actual LeetCode problem

### **Test 5: Difficulty Badge**
1. Open different problem modals
2. ✅ **Expected**: See colored badges:
   - Easy → Green (#10b981)
   - Medium → Orange (#f59e0b)
   - Hard → Red (#f43f5e)

### **Test 6: Problem Number & Title**
1. Open problem modal
2. ✅ **Expected**: Shows "LeetCode #1" and problem title "Two Sum"

### **Test 7: Switch Between Problems**
1. Close current modal (click X or backdrop)
2. Click another problem
3. ✅ **Expected**: Modal updates with new problem, loads description
4. ✅ **No errors** in browser console

---

## 🎯 Expected Toast Types

### **Green Success Toast**
- Profile saved
- Token copied

### **Blue Info Toast**
- Sync help message
- "That's you!" message

### **Orange Warning Toast**
- User not found
- Already in friends list

### **Red Error Toast** (if needed)
- Network errors
- Failed operations

---

## 🛠️ Browser DevTools Testing

### **Check Console for Errors**
1. Press **F12** to open DevTools
2. Go to **Console** tab
3. ✅ **Expected**: No red error messages
4. ✅ **Info logs** show API calls working

### **Check Network Requests**
1. Open **Network** tab in DevTools
2. Click on a problem in Revisions
3. ✅ **Expected**: See `graphql` request to `leetcode.com`
4. ✅ **Response** contains problem `content` field

### **Test Network Throttling (Slow Connection)**
1. Open DevTools → **Network** tab
2. Set throttling to **"Slow 4G"**
3. Click problem to see description
4. ✅ **Expected**: Loader shows while fetching (simulating real slow connection)
5. ✅ **Description** eventually appears

---

## 📱 Testing on Different Screens

### **Desktop (1920px)**
1. All toasts visible in bottom-right
2. Modal takes appropriate width
3. Description text readable

### **Tablet (768px)**
1. Toasts still visible
2. Modal scrolls if needed
3. Layout responsive

### **Mobile (375px)**
1. Toasts appear but adjust for screen size
2. Modal takes full width with padding
3. All interactive elements accessible

---

## ⚡ Quick Test Checklist

- [ ] Toast appears when profile is saved
- [ ] Toast auto-dismisses after ~3.5 seconds
- [ ] Toast can be manually closed
- [ ] Multiple toasts stack properly
- [ ] Problem modal opens smoothly
- [ ] Problem description loads and displays
- [ ] "View on LeetCode" link works
- [ ] Difficulty badge shows correct color
- [ ] No console errors
- [ ] Network request shows problem data

---

## 🐛 Troubleshooting

**Problem**: Toasts not appearing
- **Solution**: Check if `<ToastProvider>` is in src/main.jsx
- **Check**: Browser console for errors

**Problem**: Description not loading
- **Solution**: Check browser network tab for failed graphql requests
- **Check**: LeetCode API might be rate-limited (wait a few seconds)

**Problem**: Modal stuck on loading
- **Solution**: Close modal and try again
- **Check**: Network tab to see if request completed

**Problem**: Styling looks off
- **Solution**: Clear browser cache (Ctrl+Shift+Delete)
- **Check**: CSS variables are loading correctly

---

## 📊 Test Report Template

```
Date: May 12, 2026
Browser: Chrome/Firefox/Safari
Device: Desktop/Mobile

Toast Notifications:
- [ ] Success toast works
- [ ] Error toast works
- [ ] Warning toast works
- [ ] Auto-dismiss works
- [ ] Manual close works

Problem Descriptions:
- [ ] Modal opens
- [ ] Description loads
- [ ] Content displays correctly
- [ ] LeetCode link works

Issues Found:
- 

Passed: __ / __
```

---

*Testing guide created: May 12, 2026*
