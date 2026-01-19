# Sanity Studio Troubleshooting

## Common /studio Errors and Fixes

### Error: "projectId is required"

**Cause:** Missing Sanity credentials in `.env.local`

**Fix:**
1. Make sure you have a `.env.local` file in the `blog` folder
2. Add your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_actual_token
```

3. Restart the dev server: Stop with Ctrl+C, then run `npm run dev` again

### How to Get Sanity Credentials

1. **Create Sanity Account:**
   - Go to https://www.sanity.io/
   - Click "Get started for free"
   - Sign up with Google/GitHub or email

2. **Create Project:**
   - After signing in, click "Create project"
   - Name it "Altzor Blog"
   - Choose a region (closest to you)
   - Select "Production" dataset
   - Click "Create project"

3. **Get Project ID:**
   - You'll see it in the URL: `https://www.sanity.io/manage/personal/project/YOUR_PROJECT_ID`
   - Or find it in Project Settings → General → Project ID

4. **Create API Token:**
   - In your project, go to **API** tab
   - Click **Tokens**
   - Click **Add API token**
   - Name: "Blog Website"
   - Permissions: **Editor**
   - Click **Add token**
   - **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

5. **Add to .env.local:**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def  # Your actual project ID
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=skxxxxxxxxxx  # Your actual token
   ```

6. **Restart Server:**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

### Error: "defineConfig is not a function"

**Fix:** This has been corrected in the latest `sanity.config.js`

### Error: "Module not found"

**Fix:** Install missing dependencies:
```bash
npm install
```

### Error: "Invalid configuration"

**Cause:** Schema issues

**Fix:** Check that all schema files are correct in `sanity/schemas/`

---

## Testing Your Setup

After adding credentials and restarting:

1. **Visit:** http://localhost:3000/studio
2. **You should see:** Sanity Studio login screen
3. **Sign in** with your Sanity account
4. **You should see:** The Studio interface with "Blog Post", "Author", "Category" options

## Still Having Issues?

### Check Environment Variables
```bash
# In PowerShell (in blog folder)
$env:NEXT_PUBLIC_SANITY_PROJECT_ID
# Should show your project ID, not "your_project_id_here"
```

### Check Server Logs
Look at the terminal where `npm run dev` is running for error messages

### Common Issues:
- ❌ Forgot to add `.env.local` file
- ❌ Used `.env` instead of `.env.local`
- ❌ Copied "your_project_id_here" literally instead of actual ID
- ❌ Didn't restart server after adding `.env.local`
- ❌ Missing token or wrong permissions on token

---

## Success Indicators

✅ Studio loads at `/studio`  
✅ Can sign in with Sanity account  
✅ See "Blog Post", "Author", "Category" in sidebar  
✅ Can create new content  

Once these work, you're ready to create your first blog post!
