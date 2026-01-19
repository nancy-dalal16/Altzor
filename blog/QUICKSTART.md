# 🚀 Quick Start Guide - Altzor Blog

Welcome! Your Next.js blog with Sanity CMS is ready. Follow these steps to get started.

## ✅ What's Already Done

- ✅ Next.js 15 project initialized
- ✅ Tailwind CSS configured with Altzor brand colors
- ✅ Shadcn UI components installed
- ✅ Sanity CMS schemas created
- ✅ Header & Footer components matching your site
- ✅ Blog listing and detail pages
- ✅ Category filtering
- ✅ Related posts feature
- ✅ SEO optimization

## 🔧 What You Need to Do

### Step 1: Create a Sanity Account & Project

1. Go to https://www.sanity.io/ and sign up (free account)
2. Create a new project
   - Name it "Altzor Blog"
   - Choose a region closest to you
3. Note your:
   - **Project ID** (looks like: abc123def)
   - **Dataset** name (usually "production")

### Step 2: Create API Token

1. Go to https://www.sanity.io/manage
2. Select your "Altzor Blog" project
3. Go to **API** → **Tokens**
4. Click **Add API Token**
   - Name: "Blog Website"
   - Permissions: **Editor**
5. Copy the token immediately (you won't see it again!)

### Step 3: Configure Environment Variables

1. In the `blog` folder, create a file named `.env.local`
2. Copy the contents from `env.example` and fill in your values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here
```

### Step 4: Run the Blog

Open terminal in the `blog` folder and run:

```bash
npm run dev
```

Visit:
- **Blog:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

### Step 5: Create Your First Content

1. Open http://localhost:3000/studio
2. You'll see the Sanity Studio interface

**Create an Author (Required):**
1. Click "Author" → "Create new"
2. Fill in:
   - Name: Your name
   - Slug: Click "Generate"
   - Job Title: e.g., "Senior Engineer"
   - Image: Upload a profile photo (optional)
   - Bio: Write a short bio
3. Click **Publish**

**Create a Category:**
1. Click "Category" → "Create new"
2. Fill in:
   - Title: e.g., "AI & Machine Learning"
   - Slug: Click "Generate"
   - Description: Brief description
   - Badge Color: #FF6701 (or any color)
3. Click **Publish**

**Create a Blog Post:**
1. Click "Blog Post" → "Create new"
2. Fill in:
   - Title: Your post title
   - Slug: Click "Generate"
   - Excerpt: Short summary (max 200 characters)
   - Featured Image: Upload an image
   - Categories: Select the category you created
   - Author: Select the author you created
   - Body: Write your content using the rich text editor
   - Featured: Toggle ON if you want it featured
3. Click **Publish**

### Step 6: View Your Blog

1. Go to http://localhost:3000
2. You should see your blog post!
3. Click on it to see the full post

## 🎨 Customization

### Change Colors

Edit `app/globals.css` and modify:

```css
:root {
  --primary: 21 100% 51%; /* Orange */
  --secondary: 238 63% 20%; /* Navy */
}
```

### Add More Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

## 📝 Content Tips

### Writing Good Excerpts
- Keep under 200 characters
- Summarize the main point
- Make it engaging

### SEO Best Practices
1. Fill in the SEO section for each post
2. Use descriptive meta titles (50-60 chars)
3. Write compelling meta descriptions (150-160 chars)
4. Add relevant keywords

### Image Guidelines
- Featured images: 1200x630px recommended
- In-post images: 800px wide ideal
- Always add alt text for accessibility

## 🚨 Troubleshooting

### "No posts yet" message
- Make sure you published (not just saved) your blog post in Sanity Studio
- Check that your `.env.local` has the correct Sanity Project ID

### Images not loading
- Verify your Sanity Project ID in `.env.local`
- Check that `next.config.mjs` has the Sanity CDN hostname

### Studio not loading
- Ensure you have a valid API token in `.env.local`
- Try restarting the development server

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
5. Deploy!

## 📚 Next Steps

- [ ] Create more authors
- [ ] Add more categories
- [ ] Write 5-10 blog posts
- [ ] Customize the header/footer links
- [ ] Add your own custom components
- [ ] Set up a deployment workflow

## 🆘 Need Help?

Check the full documentation in `README.md` or contact the development team.

---

**Happy Blogging! 🎉**
