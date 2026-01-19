# Altzor Blog - Next.js with Sanity CMS

A modern blog built with Next.js 15, Sanity CMS, Tailwind CSS, and Shadcn UI, designed to match the Altzor brand aesthetic.

## 🚀 Features

- ✅ **Next.js 15** with App Router
- ✅ **Sanity CMS** for content management
- ✅ **Tailwind CSS** with custom Altzor theme
- ✅ **Shadcn UI** components
- ✅ **ISR (Incremental Static Regeneration)** for performance
- ✅ **SEO optimized** with metadata and Open Graph
- ✅ **Responsive design** matching Altzor's HTML site
- ✅ **Category filtering**
- ✅ **Related posts**
- ✅ **Rich text** support with Portable Text
- ✅ **Author profiles** with social links

## 📁 Project Structure

```
blog/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with Header/Footer
│   ├── page.js            # Blog listing page
│   ├── [slug]/            # Blog post detail pages
│   │   └── page.js
│   └── category/[slug]/   # Category pages
│       └── page.js
├── components/
│   ├── Header.jsx         # Navigation matching Altzor
│   ├── Footer.jsx         # Footer with CTA
│   ├── BlogCard.jsx       # Blog post card component
│   └── ui/                # Shadcn components
├── sanity/
│   ├── schemas/           # Content schemas
│   │   ├── post.js
│   │   ├── author.js
│   │   └── category.js
│   ├── schema.js          # Schema index
│   └── lib/
│       └── client.js      # Sanity client
├── lib/
│   ├── sanity.js          # Data fetching functions
│   └── queries.js         # GROQ queries
└── public/assets/         # Static assets
```

## 🛠 Setup Instructions

### 1. Install Dependencies

Dependencies are already installed, but if needed:

```bash
npm install
```

### 2. Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and create a free account
2. Create a new project
3. Note your **Project ID** and **Dataset** name (usually "production")

### 3. Configure Environment Variables

Create a `.env.local` file in the blog directory:

```bash
# Copy the example file
cp env.example .env.local
```

Edit `.env.local` with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here
```

**To get your API token:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Editor" permissions
5. Copy the token to your `.env.local`

### 4. Initialize Sanity Studio

Sanity Studio is already configured but needs your project credentials. Update `sanity.config.js` if needed.

### 5. Run the Development Server

```bash
npm run dev
```

Visit:
- **Blog:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio (Coming in next setup)

### 6. Create Sample Content

1. Go to the Sanity Studio (http://localhost:3000/studio)
2. Create at least one **Author**
3. Create at least one **Category**
4. Create your first **Blog Post**

## 📝 Content Management

### Creating a Blog Post

1. Open Sanity Studio at `/studio`
2. Click "Blog Post" → "Create new"
3. Fill in the required fields:
   - **Title:** Post title
   - **Slug:** Auto-generated from title
   - **Excerpt:** Short description (max 200 chars)
   - **Featured Image:** Upload an image
   - **Categories:** Select one or more categories
   - **Author:** Select the author
   - **Body:** Write your content using rich text editor
   - **Featured:** Toggle if you want it on homepage
   - **SEO:** Add meta title, description, keywords

4. Click "Publish"

### Creating Authors

1. Click "Author" → "Create new"
2. Add name, job title, bio, and profile image
3. Optionally add social links (LinkedIn, Twitter, GitHub)
4. Publish

### Creating Categories

1. Click "Category" → "Create new"
2. Add title, slug, and description
3. Optionally add a color for the category badge (hex format: #FF6701)
4. Publish

## 🎨 Design System

The blog uses Altzor's brand colors and design tokens:

- **Primary:** #FF6701 (Orange)
- **Secondary:** #171749 (Dark Navy)
- **Background:** #FFFFFF (White)
- **Muted:** #F8F8FA (Light Grey)
- **Font:** Inter (Google Fonts)

### Custom Utility Classes

- `.btn-primary` - Orange button
- `.btn-primary-inverse` - White button with orange border
- `.gray-card` - Light grey card matching Altzor's design
- `.white-card` - White card with shadow

## 🔗 Integration with Main Site

To integrate the blog with the main Altzor site:

### Option 1: Subdirectory (Recommended)

1. Build the blog: `npm run build`
2. Deploy the blog separately
3. Use a reverse proxy to serve `/blog` from the Next.js app

### Option 2: Separate Subdomain

Deploy the blog to `blog.altzor.com` and link from the main site.

### Option 3: Direct Link

Add a link in the main site's navigation to the blog's deployed URL.

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

## 🔧 Customization

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

### Modifying Colors

Edit `app/globals.css` and update the CSS custom properties:

```css
:root {
  --primary: 21 100% 51%; /* HSL values */
  /* ... */
}
```

### Adding New Schemas

1. Create  a new schema file in `sanity/schemas/`
2. Import and add to `sanity/schema.js`

## 🐛 Troubleshooting

### "GROQ syntax error"

Check your queries in `lib/queries.js` for syntax issues.

### "Image not loading"

Ensure Sanity Project ID is correct in `.env.local`.

### "Component not found"

Run `npx shadcn@latest add [component]` to install missing Shadcn components.

### Build Errors

Clear the Next.js cache:

```bash
rm -rf .next
npm run build
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)

## 🤝 Support

For issues with the blog setup, contact the Altzor development team.

---

**© 2025 Altzor. All rights reserved.**
