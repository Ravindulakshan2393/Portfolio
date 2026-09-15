#!/usr/bin/env node
/**
 * ============================================================================
 * Portfolio Documentation Auto-Updater
 * ============================================================================
 * 
 * Scans the portfolio source files (index.html, styles.css, main.js) and
 * regenerates the documentation suite in /documents to stay in sync.
 * 
 * Usage:
 *   node scripts/update_docs.js
 * 
 * What it does:
 *   1. Scans index.html → extracts skills, projects, awards, contact info
 *   2. Scans css/styles.css → extracts design tokens (CSS custom properties)
 *   3. Scans js/main.js → extracts project modal data keys
 *   4. Rebuilds documents/ARCHITECTURE.md with live file tree & token table
 *   5. Rebuilds documents/RESUME_DATA.md with extracted portfolio data
 *   6. Prints a change summary to the console
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');
const CSS_PATH = path.join(ROOT, 'css', 'styles.css');
const JS_PATH = path.join(ROOT, 'js', 'main.js');
const DOCS_DIR = path.join(ROOT, 'documents');

// Ensure documents directory exists
if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch {
        console.warn(`  ⚠  File not found: ${filePath}`);
        return '';
    }
}

function writeDoc(fileName, content) {
    const dest = path.join(DOCS_DIR, fileName);
    const existed = fs.existsSync(dest);
    const oldContent = existed ? fs.readFileSync(dest, 'utf-8') : '';
    fs.writeFileSync(dest, content, 'utf-8');
    if (!existed) return 'CREATED';
    return oldContent !== content ? 'UPDATED' : 'NO CHANGE';
}

function timestamp() {
    return new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

// ---------------------------------------------------------------------------
// 1. Build live file tree
// ---------------------------------------------------------------------------
function buildFileTree(dir, prefix = '', isRoot = true) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
        .filter(e => !e.name.startsWith('.') && e.name !== 'node_modules')
        .sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        });

    let tree = '';
    entries.forEach((entry, i) => {
        const isLast = i === entries.length - 1;
        const connector = isRoot ? '' : (isLast ? '└── ' : '├── ');
        const childPrefix = isRoot ? '' : (isLast ? '    ' : '│   ');

        if (entry.isDirectory()) {
            tree += `${prefix}${connector}${entry.name}/\n`;
            tree += buildFileTree(
                path.join(dir, entry.name),
                prefix + childPrefix,
                false
            );
        } else {
            const stats = fs.statSync(path.join(dir, entry.name));
            const sizeKB = (stats.size / 1024).toFixed(1);
            tree += `${prefix}${connector}${entry.name}  (${sizeKB} KB)\n`;
        }
    });
    return tree;
}

// ---------------------------------------------------------------------------
// 2. Extract data from index.html
// ---------------------------------------------------------------------------
function extractFromHTML(html) {
    const data = {
        title: '',
        metaDescription: '',
        navLinks: [],
        skills: [],
        projects: [],
        awards: [],
        contactItems: [],
        socialLinks: [],
    };

    // Title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch) data.title = titleMatch[1];

    // Meta description
    const metaMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    if (metaMatch) data.metaDescription = metaMatch[1];

    // Nav links
    const navLinkRe = /<a\s+href="#([\w-]+)"\s+class="nav-link[^"]*"[^>]*>(.*?)<\/a>/gi;
    let m;
    while ((m = navLinkRe.exec(html)) !== null) {
        data.navLinks.push({ id: m[1], label: m[2].trim() });
    }

    // Skills
    const skillRe = /<div\s+class="skill-card"\s+data-category="(\w+)"[\s\S]*?<span\s+class="skill-name">(.*?)<\/span>\s*<span\s+class="skill-badge">(.*?)<\/span>/gi;
    while ((m = skillRe.exec(html)) !== null) {
        data.skills.push({
            category: m[1],
            name: m[2].trim(),
            level: m[3].trim(),
        });
    }

    // Projects
    const projRe = /<div\s+class="project-card"\s+data-project-cat="(\w+)"[\s\S]*?<h3\s+class="project-title">(.*?)<\/h3>[\s\S]*?<p\s+class="project-desc">\s*([\s\S]*?)\s*<\/p>/gi;
    while ((m = projRe.exec(html)) !== null) {
        const tags = [];
        const tagRe = /<span\s+class="tag">(.*?)<\/span>/gi;
        const cardBlock = html.slice(m.index, m.index + 2000);
        let t;
        while ((t = tagRe.exec(cardBlock)) !== null) tags.push(t[1].trim());
        data.projects.push({
            category: m[1],
            title: m[2].trim(),
            description: m[3].replace(/\s+/g, ' ').trim(),
            tags,
        });
    }

    // Awards
    const awardRe = /<div\s+class="award-card[\s\S]*?<span\s+class="award-badge">(.*?)<\/span>\s*<h3>(.*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi;
    while ((m = awardRe.exec(html)) !== null) {
        data.awards.push({
            badge: m[1].trim(),
            title: m[2].trim(),
            description: m[3].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
        });
    }

    // Contact info items
    const infoRe = /<(?:a|div)\s+[^>]*class="info-item"[\s\S]*?<span>(.*?)<\/span>\s*<strong>(.*?)<\/strong>/gi;
    while ((m = infoRe.exec(html)) !== null) {
        data.contactItems.push({
            label: m[1].trim(),
            value: m[2].trim(),
        });
    }

    return data;
}

// ---------------------------------------------------------------------------
// 3. Extract CSS custom properties
// ---------------------------------------------------------------------------
function extractCSSTokens(css) {
    const tokens = [];
    const tokenRe = /--([\w-]+)\s*:\s*([^;]+);/g;
    let m;
    // Only grab from the first :root block
    const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
    if (rootMatch) {
        while ((m = tokenRe.exec(rootMatch[1])) !== null) {
            tokens.push({ name: `--${m[1]}`, value: m[2].trim() });
        }
    }
    return tokens;
}

// ---------------------------------------------------------------------------
// 4. Extract project keys from main.js
// ---------------------------------------------------------------------------
function extractJSProjectKeys(js) {
    const keys = [];
    const keyRe = /^\s*(\w+)\s*:\s*\{/gm;
    // Find the projectDetails object block
    const detailsStart = js.indexOf('projectDetails');
    if (detailsStart === -1) return keys;
    const block = js.slice(detailsStart, detailsStart + 5000);
    let m;
    while ((m = keyRe.exec(block)) !== null) {
        const k = m[1];
        if (['title', 'type', 'description', 'features', 'techStack', 'githubUrl'].includes(k)) continue;
        keys.push(k);
    }
    return keys;
}

// ---------------------------------------------------------------------------
// 5. Generate ARCHITECTURE.md
// ---------------------------------------------------------------------------
function generateArchitecture(fileTree, cssTokens, htmlData, jsProjectKeys) {
    const tokenTable = cssTokens.map(t =>
        `| \`${t.name}\` | \`${t.value}\` |`
    ).join('\n');

    const sectionList = htmlData.navLinks.map(l =>
        `- **${l.label}** → \`#${l.id}\``
    ).join('\n');

    const jsKeyList = jsProjectKeys.length > 0
        ? jsProjectKeys.map(k => `  - \`${k}\``).join('\n')
        : '  - *(none detected)*';

    return `# Portfolio Web Application - Architecture Documentation

> **Auto-generated** on ${timestamp()} by \`scripts/update_docs.js\`
> Run \`node scripts/update_docs.js\` to refresh this document.

---

## 1. Overview

| Field | Value |
| :--- | :--- |
| **Page Title** | ${htmlData.title} |
| **Meta Description** | ${htmlData.metaDescription} |
| **Total Skills** | ${htmlData.skills.length} |
| **Total Projects** | ${htmlData.projects.length} |
| **Total Awards** | ${htmlData.awards.length} |

---

## 2. Live File Tree

\`\`\`
Portfolio/
${fileTree}\`\`\`

---

## 3. Technology Stack & Dependencies

- **HTML5**: Semantic elements (\`<header>\`, \`<nav>\`, \`<section>\`, \`<footer>\`).
- **CSS3**: Custom Properties, Glassmorphism (\`backdrop-filter\`), Flexbox, CSS Grid, keyframe animations, CSS image filters.
- **ES6+ JavaScript**: Vanilla DOM, IntersectionObserver API, event delegation.
- **External CDNs**: Google Fonts (Inter, JetBrains Mono), FontAwesome 6.4.0, DevIcons v2.15.1, Vercel GitHub Summary Cards.

---

## 4. Page Sections (Navigation Map)

${sectionList}

---

## 5. Design Tokens (CSS Custom Properties)

| Token | Value |
| :--- | :--- |
${tokenTable}

---

## 6. JS Modal Project Keys

Project detail keys registered in \`js/main.js → projectDetails\`:
${jsKeyList}

---

## 7. Key Interactive Systems

1. **Typing Subtitle Engine**: \`typeRoles()\` cycles through role strings with type/erase delays.
2. **Category Filters**: Skill cards (\`data-category\`) and Project cards (\`data-project-category\`) toggle visibility.
3. **Project Detail Modal**: Lightbox overlay populated from the \`projectDetails\` JS object.
4. **Theme Switcher**: Toggles \`light-theme\` class on \`<body>\`.
5. **Contact Form Toast**: Client-side validation with animated success notification.
`;
}

// ---------------------------------------------------------------------------
// 6. Generate RESUME_DATA.md
// ---------------------------------------------------------------------------
function generateResumeData(htmlData) {
    const skillsByCategory = {};
    htmlData.skills.forEach(s => {
        if (!skillsByCategory[s.category]) skillsByCategory[s.category] = [];
        skillsByCategory[s.category].push(s);
    });

    const skillSections = Object.entries(skillsByCategory).map(([cat, skills]) => {
        const label = {
            languages: 'Programming Languages',
            frameworks: 'Web Development Frameworks',
            databases: 'Databases & Cloud',
            tools: 'Tools & Hardware',
        }[cat] || cat;
        const list = skills.map(s => `  - **${s.name}** — ${s.level}`).join('\n');
        return `### ${label}\n${list}`;
    }).join('\n\n');

    const projectSections = htmlData.projects.map((p, i) => {
        const tags = p.tags.length > 0 ? p.tags.join(', ') : 'N/A';
        return `### ${i + 1}. ${p.title}
- **Category**: ${p.category}
- **Description**: ${p.description}
- **Tech Stack**: ${tags}`;
    }).join('\n\n');

    const awardSections = htmlData.awards.map(a =>
        `- **${a.badge}** — ${a.title}: ${a.description}`
    ).join('\n');

    const contactSections = htmlData.contactItems.map(c =>
        `- **${c.label}**: \`${c.value}\``
    ).join('\n');

    return `# Sadeepa Lakshan - Master Resume Data Reference

> **Auto-generated** on ${timestamp()} by \`scripts/update_docs.js\`
> Run \`node scripts/update_docs.js\` to refresh this document.

---

## Contact Information

${contactSections}

---

## Technical Skills

${skillSections}

---

## Featured Projects

${projectSections}

---

## Awards & Leadership

${awardSections}
`;
}

// ===========================================================================
// MAIN
// ===========================================================================
console.log('');
console.log('┌──────────────────────────────────────────────────┐');
console.log('│   📄 Portfolio Documentation Auto-Updater        │');
console.log('└──────────────────────────────────────────────────┘');
console.log('');

// Read source files
const html = readFile(INDEX_PATH);
const css = readFile(CSS_PATH);
const js = readFile(JS_PATH);

if (!html) {
    console.error('  ❌ index.html not found. Aborting.');
    process.exit(1);
}

// Extract data
console.log('  🔍 Scanning index.html ...');
const htmlData = extractFromHTML(html);
console.log(`     Found: ${htmlData.skills.length} skills, ${htmlData.projects.length} projects, ${htmlData.awards.length} awards`);

console.log('  🎨 Scanning css/styles.css ...');
const cssTokens = extractCSSTokens(css);
console.log(`     Found: ${cssTokens.length} design tokens`);

console.log('  ⚡ Scanning js/main.js ...');
const jsProjectKeys = extractJSProjectKeys(js);
console.log(`     Found: ${jsProjectKeys.length} project modal keys`);

console.log('  📁 Building file tree ...');
const fileTree = buildFileTree(ROOT);

// Generate & write documents
console.log('');
console.log('  📝 Generating documents ...');

const results = {};

results['ARCHITECTURE.md'] = writeDoc(
    'ARCHITECTURE.md',
    generateArchitecture(fileTree, cssTokens, htmlData, jsProjectKeys)
);

results['RESUME_DATA.md'] = writeDoc(
    'RESUME_DATA.md',
    generateResumeData(htmlData)
);

// Print results
console.log('');
console.log('  ┌─────────────────────────────────────────┐');
console.log('  │  Results                                 │');
console.log('  ├─────────────────────────────────────────┤');
Object.entries(results).forEach(([file, status]) => {
    const icon = status === 'CREATED' ? '🆕' : status === 'UPDATED' ? '✅' : '⏸️';
    console.log(`  │  ${icon}  ${file.padEnd(30)} ${status.padEnd(10)}│`);
});
console.log('  └─────────────────────────────────────────┘');
console.log('');
console.log(`  📌 Docs updated at: ${timestamp()}`);
console.log('  💡 Tip: Run this before every git commit to keep docs in sync.');
console.log('');
