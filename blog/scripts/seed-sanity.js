import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper to upload image to Sanity
async function uploadImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath)
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(imagePath),
  })
  return asset
}

// Create categories
async function createCategories() {
  console.log('Creating categories...')
  
  const categories = [
    {
      _type: 'category',
      title: 'AI & Machine Learning',
      slug: { _type: 'slug', current: 'ai-machine-learning' },
      description: 'Insights on artificial intelligence and machine learning technologies',
      color: '#9333EA',
    },
    {
      _type: 'category',
      title: 'Web Development',
      slug: { _type: 'slug', current: 'web-development' },
      description: 'Modern web development practices and frameworks',
      color: '#14B8A6',
    },
    {
      _type: 'category',
      title: 'Cloud & DevOps',
      slug: { _type: 'slug', current: 'cloud-devops' },
      description: 'Cloud infrastructure and DevOps best practices',
      color: '#3B82F6',
    },
    {
      _type: 'category',
      title: 'Data Science',
      slug: { _type: 'slug', current: 'data-science' },
      description: 'Data analytics and science methodologies',
      color: '#EC4899',
    },
    {
      _type: 'category',
      title: 'Product Engineering',
      slug: { _type: 'slug', current: 'product-engineering' },
      description: 'Building great products through engineering excellence',
      color: '#FF6701',
    },
    {
      _type: 'category',
      title: 'UI/UX Design',
      slug: { _type: 'slug', current: 'ui-ux-design' },
      description: 'User interface and experience design principles',
      color: '#10B981',
    },
  ]

  const createdCategories = []
  for (const category of categories) {
    const created = await client.create(category)
    console.log(`✓ Created category: ${category.title}`)
    createdCategories.push(created)
  }
  
  return createdCategories
}

// Create authors
async function createAuthors() {
  console.log('Creating authors...')
  
  const authors = [
    {
      _type: 'author',
      name: 'Sarah Chen',
      slug: { _type: 'slug', current: 'sarah-chen' },
      jobTitle: 'Senior AI Engineer',
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Sarah is a leading expert in AI-native engineering with over 10 years of experience building scalable machine learning systems. She has contributed to open-source ML frameworks and speaks regularly at tech conferences.',
            },
          ],
        },
      ],
    },
    {
      _type: 'author',
      name: 'Marcus Rodriguez',
      slug: { _type: 'slug', current: 'marcus-rodriguez' },
      jobTitle: 'Full-Stack Developer',
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Marcus specializes in modern web development with expertise in React, Next.js, and serverless architectures. He helps teams build high-performance web applications that scale.',
            },
          ],
        },
      ],
    },
    {
      _type: 'author',
      name: 'Priya Sharma',
      slug: { _type: 'slug', current: 'priya-sharma' },
      jobTitle: 'UX Design Lead',
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Priya is passionate about creating user-centered designs that solve real problems. With a background in psychology and design, she brings a unique perspective to product development.',
            },
          ],
        },
      ],
    },
    {
      _type: 'author',
      name: 'Alex Morrison',
      slug: { _type: 'slug', current: 'alex-morrison' },
      jobTitle: 'DevOps Architect',
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Alex has been working with cloud infrastructure and DevOps practices for over 8 years. He specializes in building resilient, automated deployment pipelines and infrastructure as code.',
            },
          ],
        },
      ],
    },
  ]

  const createdAuthors = []
  for (const author of authors) {
    const created = await client.create(author)
    console.log(`✓ Created author: ${author.name}`)
    createdAuthors.push(created)
  }
  
  return createdAuthors
}

// Create blog posts
async function createPosts(categories, authors) {
  console.log('Creating blog posts...')
  
  const publicDir = path.join(__dirname, '../public')
  
  const posts = [
    {
      _type: 'post',
      title: 'The Future of AI-Native Engineering',
      slug: { _type: 'slug', current: 'future-ai-native-engineering' },
      excerpt: 'Explore how AI-native approaches are transforming software engineering and what it means for the future of development.',
      publishedAt: new Date('2025-01-10').toISOString(),
      featured: true,
      categories: [{ _type: 'reference', _ref: categories[0]._id }],
      author: { _type: 'reference', _ref: authors[0]._id },
      mainImagePath: path.join(publicDir, 'blog-ai-ml.png'),
      body: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Introduction to AI-Native Engineering' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The landscape of software engineering is undergoing a fundamental transformation. AI-native engineering represents a paradigm shift where artificial intelligence is not just a feature but the foundation of how we build, test, and deploy software.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Key Principles' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'AI-native engineering embraces several core principles: intelligent automation, adaptive systems, and data-driven decision making. These principles guide how we architect and implement modern software solutions.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h3',
          children: [{ _type: 'span', text: 'Intelligent Automation' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Modern development workflows leverage AI for code generation, testing, and deployment. This goes beyond simple automation to intelligent systems that learn and adapt.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Practical Applications' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Organizations are already seeing massive productivity gains by adopting AI-native practices. From automated code reviews to intelligent monitoring systems, the benefits are tangible and measurable.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'Building Scalable Web Applications in 2025',
      slug: { _type: 'slug', current: 'building-scalable-web-apps-2025' },
      excerpt: 'Learn proven techniques to build fast, scalable, and SEO-friendly websites using modern frontend tools.',
      publishedAt: new Date('2025-01-08').toISOString(),
      featured: true,
      categories: [{ _type: 'reference', _ref: categories[1]._id }],
      author: { _type: 'reference', _ref: authors[1]._id },
      mainImagePath: path.join(publicDir, 'blog-web-dev.png'),
      body: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'The Modern Web Stack' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Building scalable web applications in 2025 requires careful consideration of your tech stack. The ecosystem has matured significantly, offering powerful tools for every layer of your application.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Performance Optimization' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Performance is critical for user experience and SEO. Implementing techniques like code splitting, lazy loading, and efficient caching strategies can dramatically improve your application performance.',
            },
          ],
        },
        {
          _type: 'code',
          language: 'javascript',
          code: `// Example: Dynamic imports for code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}`,
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Scalability Patterns' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Designing for scale from day one saves countless hours of refactoring later. Consider patterns like microservices, serverless functions, and edge computing for optimal scalability.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'Cloud Infrastructure Best Practices',
      slug: { _type: 'slug', current: 'cloud-infrastructure-best-practices' },
      excerpt: 'Master the essentials of cloud architecture with proven strategies for security, cost optimization, and reliability.',
      publishedAt: new Date('2025-01-05').toISOString(),
      featured: false,
      categories: [{ _type: 'reference', _ref: categories[2]._id }],
      author: { _type: 'reference', _ref: authors[3]._id },
      mainImagePath: path.join(publicDir, 'blog-cloud-devops.png'),
      body: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Foundation of Cloud Architecture' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Cloud infrastructure has become the backbone of modern applications. Understanding best practices is essential for building reliable, secure, and cost-effective systems.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Security First' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Security should never be an afterthought. Implement zero-trust architectures, encrypt data at rest and in transit, and regularly audit your infrastructure for vulnerabilities.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Cost Optimization' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Cloud costs can spiral quickly without proper management. Use auto-scaling, reserved instances, and spot instances strategically to optimize your cloud spend.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'Data-Driven Product Development',
      slug: { _type: 'slug', current: 'data-driven-product-development' },
      excerpt: 'Harness the power of data analytics to build products users love and make informed business decisions.',
      publishedAt: new Date('2025-01-03').toISOString(),
      featured: false,
      categories: [{ _type: 'reference', _ref: categories[3]._id }],
      author: { _type: 'reference', _ref: authors[0]._id },
      mainImagePath: path.join(publicDir, 'blog-data-science.png'),
      body: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'The Role of Data in Product Development' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'In today\'s competitive landscape, data-driven decision making is not optional—it\'s essential. Products built on solid data insights are more likely to succeed in the market.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Collecting Meaningful Metrics' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Not all metrics are created equal. Focus on actionable metrics that directly correlate with user value and business outcomes. Avoid vanity metrics that don\'t drive decisions.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'A/B Testing and Experimentation' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Build a culture of experimentation. A/B testing allows you to validate hypotheses and make data-backed decisions about features and user experience.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'Modern Product Engineering Workflows',
      slug: { _type: 'slug', current: 'modern-product-engineering-workflows' },
      excerpt: 'Streamline your product development process with modern workflows, tools, and methodologies.',
      publishedAt: new Date('2024-12-30').toISOString(),
      featured: false,
      categories: [{ _type: 'reference', _ref: categories[4]._id }],
      author: { _type: 'reference', _ref: authors[1]._id },
      mainImagePath: path.join(publicDir, 'blog-product-eng.png'),
      body: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Evolution of Product Engineering' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Product engineering has evolved from traditional waterfall methods to agile, iterative processes that emphasize collaboration and rapid feedback.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'CI/CD Best Practices' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Continuous Integration and Continuous Deployment are foundational to modern product engineering. Automate testing, deployment, and monitoring to ship faster with confidence.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Collaboration Tools' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The right tools can make or break your workflow. Invest in tools that facilitate communication, code review, and project management across your team.',
            },
          ],
        },
      ],
    },
    {
      _type: 'post',
      title: 'User-Centered Design Principles',
      slug: { _type: 'slug', current: 'user-centered-design-principles' },
      excerpt: 'Create intuitive, accessible, and delightful user experiences by putting users first in your design process.',
      publishedAt: new Date('2024-12-28').toISOString(),
      featured: false,
      categories: [{ _type: 'reference', _ref: categories[5]._id }],
      author: { _type: 'reference', _ref: authors[2]._id },
      mainImagePath: path.join(publicDir, 'blog-uiux.png'),
      body: [
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Understanding Your Users' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Great design starts with deep understanding of your users. Conduct user research, create personas, and map user journeys to inform your design decisions.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Accessibility Matters' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Accessible design isn\'t just about compliance—it\'s about creating inclusive experiences. Follow WCAG guidelines and test with real users who have disabilities.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Design Systems and Consistency' }],
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Build a comprehensive design system to ensure consistency across your product. This improves usability and speeds up the design and development process.',
            },
          ],
        },
      ],
    },
  ]

  const createdPosts = []
  for (const post of posts) {
    // Upload main image if path exists
    let mainImageRef = null
    if (post.mainImagePath && fs.existsSync(post.mainImagePath)) {
      try {
        const imageAsset = await uploadImage(post.mainImagePath)
        mainImageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
          alt: post.title,
        }
        console.log(`  ✓ Uploaded image for: ${post.title}`)
      } catch (error) {
        console.log(`  ✗ Failed to upload image for: ${post.title}`)
      }
    }

    const { mainImagePath, ...postData } = post
    const postWithImage = mainImageRef
      ? { ...postData, mainImage: mainImageRef }
      : postData

    const created = await client.create(postWithImage)
    console.log(`✓ Created post: ${post.title}`)
    createdPosts.push(created)
  }

  return createdPosts
}

// Main execution
async function seed() {
  try {
    console.log('\n🌱 Starting Sanity seeding process...\n')

    const categories = await createCategories()
    console.log()

    const authors = await createAuthors()
    console.log()

    const posts = await createPosts(categories, authors)
    console.log()

    console.log('✅ Seeding complete!')
    console.log(`\nCreated:`)
    console.log(`  - ${categories.length} categories`)
    console.log(`  - ${authors.length} authors`)
    console.log(`  - ${posts.length} blog posts`)
    console.log(`\n🎉 Your blog is now populated with dummy content!`)
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seed()
