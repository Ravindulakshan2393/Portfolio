const fs = require('fs');
const path = require('path');

function checkPage(file) {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ Page file not found: ${file}`);
    return;
  }
  const html = fs.readFileSync(fullPath, 'utf8');
  console.log(`\n========================================`);
  console.log(`📄 Auditing: ${file}`);
  console.log(`========================================`);

  // 1. Check title & meta
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  console.log(`🏷️  Title: ${titleMatch ? titleMatch[1] : '❌ MISSING'}`);
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  console.log(`📝 Description: ${metaDescMatch ? metaDescMatch[1].slice(0, 60) + '...' : '❌ MISSING'}`);

  // 2. Check images
  console.log(`\n🖼️  Image Assets Audit:`);
  const imgRe = /<img\s+[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi;
  let imgCount = 0;
  let m;
  while ((m = imgRe.exec(html)) !== null) {
    imgCount++;
    const src = m[1];
    const alt = m[2];
    if (src.startsWith('http')) {
      console.log(`  🌐 [External Image] "${alt}" -> ${src}`);
    } else {
      const cleanPath = src.replace(/^\/Portfolio\//, '').replace(/^\//, '');
      const assetOnDisk = path.join(__dirname, '..', 'dist', cleanPath);
      const exists = fs.existsSync(assetOnDisk);
      console.log(`  ${exists ? '✅' : '❌'} [Local Image] "${alt}"`);
      console.log(`     src: ${src}`);
      if (!exists) console.log(`     ⚠️  NOT FOUND at: ${assetOnDisk}`);
    }
  }
  if (imgCount === 0) console.log(`  (No <img> tags on this page)`);

  // 3. Check internal navigation links
  console.log(`\n🔗 Internal Navigation Audit:`);
  const linkRe = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let linkCount = 0;
  while ((m = linkRe.exec(html)) !== null) {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
      continue;
    }
    linkCount++;

    // In-page hash anchor (e.g. #hero)
    if (href.startsWith('#')) {
      const targetId = href.slice(1);
      const hasTarget = html.includes(`id="${targetId}"`) || html.includes(`id='${targetId}'`);
      console.log(`  ${hasTarget ? '✅' : '❌'} [Anchor] "${text || 'Link'}" -> ${href}`);
      continue;
    }

    // Route with possible hash (e.g. /Portfolio/#projects or /Portfolio/projects/abacus)
    const [routePart, hashPart] = href.split('#');
    const cleanRoute = routePart.replace(/^\/Portfolio\//, '').replace(/^\//, '').replace(/\/$/, '');
    const possibleRoute1 = path.join(__dirname, '..', 'dist', cleanRoute, 'index.html');
    const possibleRoute2 = path.join(__dirname, '..', 'dist', cleanRoute);
    const targetFilePath = fs.existsSync(possibleRoute1) ? possibleRoute1 : (fs.existsSync(possibleRoute2) && fs.statSync(possibleRoute2).isFile() ? possibleRoute2 : null);

    if (!targetFilePath) {
      console.log(`  ❌ "${text || 'Link'}" -> ${href}`);
      console.log(`     ⚠️  Target route missing! Looked for: ${possibleRoute1}`);
    } else {
      if (hashPart) {
        const targetHtml = fs.readFileSync(targetFilePath, 'utf8');
        const hasAnchor = targetHtml.includes(`id="${hashPart}"`) || targetHtml.includes(`id='${hashPart}'`);
        console.log(`  ${hasAnchor ? '✅' : '❌'} "${text || 'Link'}" -> ${href} (Anchor #${hashPart}: ${hasAnchor ? 'FOUND' : 'MISSING'})`);
      } else {
        console.log(`  ✅ "${text || 'Link'}" -> ${href}`);
      }
    }
  }
  if (linkCount === 0) console.log(`  (No relative internal links on this page)`);

  // 4. Check favicon
  const faviconMatch = html.match(/<link\s+[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["']/i);
  if (faviconMatch) {
    const favSrc = faviconMatch[1];
    const cleanFav = favSrc.replace(/^\/Portfolio\//, '').replace(/^\//, '');
    const favOnDisk = path.join(__dirname, '..', 'dist', cleanFav);
    console.log(`\n🔖 Favicon: ${fs.existsSync(favOnDisk) ? '✅ OK' : '❌ MISSING'} (${favSrc})`);
  }
}

console.log('🚀 Running UI/UX & Asset Audit on dist/ build outputs...');
checkPage('dist/index.html');
checkPage('dist/projects/abacus/index.html');
checkPage('dist/projects/ae-sss/index.html');
checkPage('dist/projects/contrack/index.html');
checkPage('dist/awards/spirit-of-service/index.html');
checkPage('dist/awards/nena-aruna/index.html');
checkPage('dist/awards/deputy-head-prefect/index.html');
