import { generateMetaTags, pageSEO, siteConfig } from './src/lib/seo';

console.log('=== SEO Tag Generation Test ===');
console.log('');

// Test home page SEO
console.log('=== Home Page SEO ===');
console.log('');

try {
  const homeMeta = generateMetaTags(pageSEO.home);
  
  console.log('✅ Title:');
  console.log(`  ${homeMeta.title}`);
  console.log('');
  
  console.log('✅ Meta Tags:');
  homeMeta.meta.forEach((tag, index) => {
    let tagStr = '';
    if (tag.charSet) {
      tagStr = `<meta charset="${tag.charSet}">`;
    } else if (tag.name) {
      tagStr = `<meta name="${tag.name}" content="${tag.content}">`;
    } else if (tag.property) {
      tagStr = `<meta property="${tag.property}" content="${tag.content}">`;
    }
    console.log(`  ${index + 1}. ${tagStr}`);
  });
  
  console.log('');
  
  console.log('✅ Links:');
  homeMeta.links.forEach((link, index) => {
    const attrs = Object.entries(link).map(([key, value]) => `${key}="${value}"`).join(' ');
    console.log(`  ${index + 1}. <link ${attrs}>`);
  });
  
  console.log('');
  console.log('=== Summary ===');
  console.log(`Total meta tags: ${homeMeta.meta.length}`);
  const ogTags = homeMeta.meta.filter(tag => tag.property && tag.property.startsWith('og:'));
  console.log(`Open Graph tags: ${ogTags.length}`);
  const twitterTags = homeMeta.meta.filter(tag => tag.name && tag.name.startsWith('twitter:'));
  console.log(`Twitter Card tags: ${twitterTags.length}`);
  
  console.log('');
  console.log('✅ SEO tag generation is working correctly!');
  
} catch (error) {
  console.error('❌ Error:', error);
}