# Dynamic OG Image Generation - Setup Guide

## 🎯 What Was Implemented

A **dynamic Open Graph image generator** that creates beautiful preview images for social media sharing (Twitter, LinkedIn, Facebook, WhatsApp, etc.) using TanStack Router's API routes and Satori.

## 📁 Files Created

1. **`src/routes/api/og.tsx`** - API route for OG image generation
2. **Updated: `src/lib/seo.ts`** - Added dynamic image URLs

## 🚀 How It Works

```
Social Platform → Requests /api/og?page=home
                → TanStack Router API handler
                → Satori renders React component to SVG
                → Returns 1200x630 image
                → Platform shows beautiful preview
```

## 🎨 OG Image Design

Each page gets a unique card with:

```
┌─────────────────────────────────────────┐
│  [Beautiful Gradient Background]       │
│  [Subtle Dot Pattern Overlay]          │
│                                         │
│              👨‍💻                        │
│         [Large Icon/Emoji]              │
│                                         │
│      ┌─────────────────┐               │
│      │   PORTFOLIO     │  [Badge]      │
│      └─────────────────┘               │
│                                         │
│      Aaron Will Djaba                  │
│         [Large Title]                   │
│                                         │
│   Full-Stack Developer building        │
│      digital experiences                │
│      [Description Text]                 │
│                                         │
│   ┌──┐  Aaron Will Djaba               │
│   │AD│  aarondjaba.com                 │
│   └──┘  [Footer Branding]              │
│                                         │
└─────────────────────────────────────────┘
```

## 📦 Installation

### Step 1: Install Satori

```bash
npm install satori
```

### Step 2: Update Your Information

Edit `src/routes/api/og.tsx` and find these sections to customize:

#### Change Your Initials
```typescript
<div style={{ /* ... */ }}>
    AD  {/* ← Change to your initials */}
</div>
```

#### Change Your Name
```typescript
<span style={{ /* ... */ }}>
    Aaron Will Djaba  {/* ← Change to your name */}
</span>
```

#### Change Your Domain
```typescript
<span style={{ /* ... */ }}>
    aarondjaba.com  {/* ← Change to your domain */}
</span>
```

### Step 3: Update Site Config

Edit `src/lib/seo.ts`:

```typescript
export const siteConfig: SiteConfig = {
    name: "Aaron Will Djaba",
    description: "Full-Stack Developer...",
    url: "https://yourdomain.com", // ⚠️ IMPORTANT: Update this!
    author: {
        name: "Aaron Will Djaba",
        email: "your.email@example.com",
        twitter: "@yourhandle",
        linkedin: "yourprofile",
        github: "yourusername",
    },
    // ...
};
```

## 🎨 Customization

### Change Page Gradients

Edit `ogConfigs` in `src/routes/api/og.tsx`:

```typescript
const ogConfigs = {
    home: {
        title: 'Aaron Will Djaba',
        description: 'Full-Stack Developer building digital experiences',
        page: 'Portfolio',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // ← Change
        icon: '👨‍💻', // ← Change
    },
    // ... more pages
};
```

### Available Gradients

```typescript
// Purple/Violet
'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

// Pink/Red
'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'

// Blue/Cyan
'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'

// Green/Cyan
'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'

// Pink/Yellow
'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'

// Cyan/Purple
'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'

// Orange/Red
'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)'

// Ocean Blue
'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)'
```

### Change Icons

```typescript
icon: '👨‍💻'  // Developer
icon: '💼'  // Work/Career
icon: '🎯'  // Skills/Expertise
icon: '⌨️'  // Terminal/Code
icon: '🚀'  // Projects/Launch
icon: '✍️'  // Blog/Writing
icon: '📧'  // Contact
icon: '🎨'  // Design
```

## 🧪 Testing

### Local Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test OG image endpoints:**
   ```
   http://localhost:3000/api/og?page=home
   http://localhost:3000/api/og?page=work-experience
   http://localhost:3000/api/og?page=expertise
   http://localhost:3000/api/og?page=terminal
   ```

3. **Verify:**
   - Image displays in browser
   - Dimensions are 1200x630
   - Text is readable
   - Colors look good
   - Branding is correct

### Production Testing

After deploying:

1. **Facebook Debugger:**
   - https://developers.facebook.com/tools/debug/
   - Enter: `https://yourdomain.com/`
   - Click "Scrape Again"
   - Verify image shows

2. **Twitter Card Validator:**
   - https://cards-dev.twitter.com/validator
   - Enter: `https://yourdomain.com/work-experience`
   - Check preview

3. **LinkedIn Post Inspector:**
   - https://www.linkedin.com/post-inspector/
   - Enter: `https://yourdomain.com/expertise`
   - Verify preview

4. **WhatsApp:**
   - Send link to yourself
   - Check preview appears

## 📊 Current Page Configurations

| Page | Endpoint | Icon | Gradient | Label |
|------|----------|------|----------|-------|
| Home | `/api/og?page=home` | 👨‍💻 | Purple→Violet | Portfolio |
| Work Experience | `/api/og?page=work-experience` | 💼 | Pink→Red | Career |
| Expertise | `/api/og?page=expertise` | 🎯 | Blue→Cyan | Skills |
| Terminal | `/api/og?page=terminal` | ⌨️ | Green→Cyan | Terminal |
| Projects | `/api/og?page=projects` | 🚀 | Pink→Yellow | Portfolio |

## 🎯 Adding New Pages

To add OG images for a new page:

### 1. Add to `ogConfigs` in `/api/og.tsx`

```typescript
const ogConfigs = {
    // ... existing pages
    
    contact: {
        title: 'Get In Touch',
        description: 'Let\'s build something amazing together',
        page: 'Contact',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        icon: '📧',
    },
};
```

### 2. Add to `pageSEO` in `seo.ts`

```typescript
export const pageSEO = {
    // ... existing pages
    
    contact: {
        title: 'Contact',
        description: 'Get in touch with me',
        keywords: ['contact', 'email', 'hire'],
        url: '/contact',
        image: '/api/og?page=contact', // ← Dynamic image
    },
};
```

### 3. Use in Route

```typescript
// src/routes/contact.tsx
import {generateMetaTags, pageSEO} from "@/lib/seo";

export const Route = createFileRoute("/contact")({
    component: ContactPage,
    head: () => generateMetaTags(pageSEO.contact),
});
```

Done! The OG image will be generated automatically.

## 🔧 Advanced Customization

### Custom Template for Blog Posts

```typescript
// In api/og.tsx, add a new template function
function BlogPostOGTemplate({ title, author, date, category }: any) {
    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            // ... custom design
        }}>
            <h1>{title}</h1>
            <p>By {author}</p>
            <p>{date}</p>
            <span>{category}</span>
        </div>
    );
}

// Use different template based on page type
const template = page.startsWith('blog/') 
    ? <BlogPostOGTemplate {...blogConfig} />
    : <OGImageTemplate {...config} />;
```

### Add Your Photo/Logo

```typescript
// In OGImageTemplate, add before the icon
<img 
    src="https://yourdomain.com/photo.jpg"
    width={150}
    height={150}
    style={{
        borderRadius: '50%',
        border: '5px solid white',
        marginBottom: '20px',
    }}
/>
```

### Change Typography

```typescript
// Title
style={{
    fontSize: '72px',      // ← Change size
    fontWeight: '900',     // ← Change weight
    fontFamily: 'Inter',   // ← Change font
}}

// Description
style={{
    fontSize: '32px',      // ← Change size
    lineHeight: '1.5',     // ← Change spacing
}}
```

## 🐛 Troubleshooting

### "Module not found: satori"
```bash
npm install satori
```

### Image not showing on social media
- Check URL is publicly accessible
- Verify image endpoint works: `/api/og?page=home`
- Clear social media cache using validators
- Wait 24-48 hours for some platforms

### Fonts not loading
- Check internet connection (fonts load from Google)
- Use local fonts instead
- Verify font URLs are correct

### Image looks wrong
- Test endpoint in browser first
- Check SVG syntax
- Verify dimensions (1200x630)
- Inspect console for errors

### Slow generation
- Add caching layer
- Pre-generate common pages
- Optimize font loading
- Consider using PNG instead of SVG

## 💡 Benefits

✅ **Zero Manual Work** - No Figma, no Photoshop
✅ **Always Current** - Updates automatically
✅ **Consistent Branding** - Same template everywhere
✅ **Scalable** - Works for unlimited pages
✅ **Version Controlled** - Images defined in code
✅ **Fast** - Cached after first generation
✅ **Professional** - Beautiful, modern design

## 🎉 Result

When you share your portfolio links:

**Twitter:**
```
┌─────────────────────────────────┐
│ [Your Beautiful OG Image]      │
│  Purple gradient, icon, title   │
├─────────────────────────────────┤
│ Aaron Will Djaba                │
│ Full-Stack Developer building...│
│ aarondjaba.com                  │
└─────────────────────────────────┘
```

**LinkedIn:**
```
┌─────────────────────────────────┐
│ [Work Experience OG Image]     │
│  Pink gradient, briefcase icon  │
├─────────────────────────────────┤
│ Work Experience | Aaron Djaba   │
│ My professional journey and...  │
│ aarondjaba.com                  │
└─────────────────────────────────┘
```

**WhatsApp:**
```
┌─────────────────────────────────┐
│ [Expertise OG Image]            │
│  Blue gradient, target icon     │
│                                 │
│ My Expertise | Aaron Djaba      │
│ Skills & technologies I work... │
│ aarondjaba.com                  │
└─────────────────────────────────┘
```

## ✅ Quick Start Checklist

- [ ] Install satori: `npm install satori`
- [ ] Update your initials in `api/og.tsx`
- [ ] Update your name in `api/og.tsx`
- [ ] Update your domain in `api/og.tsx`
- [ ] Update `siteConfig` in `seo.ts`
- [ ] Test locally: visit `/api/og?page=home`
- [ ] Deploy to production
- [ ] Test with social media validators
- [ ] Share and enjoy beautiful previews! 🎉

## 🚀 Next Steps

After setup:
1. Customize gradients for your brand
2. Choose icons that represent each page
3. Test on all social platforms
4. Monitor engagement with analytics
5. Iterate based on feedback

Your portfolio now has professional social media previews that will make your links stand out! 🌟
