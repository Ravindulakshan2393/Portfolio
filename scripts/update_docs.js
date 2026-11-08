#!/usr/bin/env node
/**
 * ============================================================================
 * Portfolio Documentation Auto-Updater (Astro Architecture)
 * ============================================================================
 * 
 * Scans the portfolio source files in src/ (Astro components, pages, styles)
 * and regenerates the documentation suite in /Documents to stay in sync.
 * 
 * Usage:
 *   node scripts/update_docs.js
 *   npm run docs
 * 
 * What it does:
 *   1. Scans src/layouts/BaseLayout.astro -> title, meta description
 *   2. Scans src/components/Navbar.astro -> navigation map
 *   3. Scans src/components/Skills.astro -> technical skills
 *   4. Scans src/components/Projects.astro -> featured projects & tags
 *   5. Scans src/components/Awards.astro -> awards & leadership recognition
 *   6. Scans src/components/Contact.astro -> contact information
 *   7. Scans src/pages/ -> dedicated project/award subpages
 *   8. Scans src/styles/styles.css -> design tokens (CSS custom properties)
 *   9. Rebuilds Documents/ARCHITECTURE.md with live file tree, routes & tokens
 *  10. Rebuilds Documents/RESUME_DATA.md with extracted portfolio data
 *  11. Prints a change summary to the console
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const DOCS_DIR = path.join(ROOT, 'Documents');

// Source files
const BASE_LAYOUT_PATH = path.join(SRC_DIR, 'layouts', 'BaseLayout.astro');
const NAVBAR_PATH = path.join(SRC_DIR, 'components', 'Navbar.astro');
const SKILLS_PATH = path.join(SRC_DIR, 'components', 'Skills.astro');
const PROJECTS_PATH = path.join(SRC_DIR, 'components', 'Projects.astro');
const AWARDS_PATH = path.join(SRC_DIR, 'components', 'Awards.astro');
const CONTACT_PATH = path.join(SRC_DIR, 'components', 'Contact.astro');
const CSS_PATH = path.join(SRC_DIR, 'styles', 'styles.css');
const PAGES_DIR = path.join(SRC_DIR, 'pages');

// Ensure Documents directory exists
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
const IGNORED_DIRS = new Set(['node_modules', '.git', '.astro', '.gemini', '.github']);

function buildFileTree(dir, prefix = '', isRoot = true) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
        .filter(e => !IGNORED_DIRS.has(e.name) && !e.name.startsWith('.'))
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
// 2. Discover Astro Subpages
// ---------------------------------------------------------------------------
function discoverSubpages(dir, baseRoute = '') {
    const routes = [];
    if (!fs.existsSync(dir)) return routes;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            routes.push(...discoverSubpages(fullPath, `${baseRoute}/${entry.name}`));
        } else if (entry.name.endsWith('.astro')) {
            const name = entry.name.replace(/\.astro$/, '');
            if (name === 'index' && !baseRoute) {
                routes.push({ route: '/', file: path.relative(ROOT, fullPath).replace(/\\/g, '/') });
            } else if (name === 'index') {
                routes.push({ route: baseRoute, file: path.relative(ROOT, fullPath).replace(/\\/g, '/') });
            } else {
                routes.push({ route: `${baseRoute}/${name}`, file: path.relative(ROOT, fullPath).replace(/\\/g, '/') });
            }
        }
    });
    return routes;
}

// ---------------------------------------------------------------------------
// 3. Extract data from Astro components
// ---------------------------------------------------------------------------
function extractPortfolioData() {
    const data = {
        title: 'Sadeepa Lakshan | Software Engineering & Full-Stack Developer',
        metaDescription: 'Official Portfolio of Sadeepa Lakshan - BSc (Hons) IT & Management Undergrad @ University of Moratuwa. Software Engineering Intern & Full-Stack Web Developer.',
        navLinks: [],
        skills: [],
        projects: [],
        awards: [],
        contactItems: [],
        subpages: []
    };

    // 3.1 BaseLayout
    const baseLayout = readFile(BASE_LAYOUT_PATH);
    if (baseLayout) {
        const titleMatch = baseLayout.match(/title\s*=\s*"([^"]+)"/);
        if (titleMatch) data.title = titleMatch[1];
        const descMatch = baseLayout.match(/description\s*=\s*"([^"]+)"/);
        if (descMatch) data.metaDescription = descMatch[1];
    }

    // 3.2 Navbar
    const navbarContent = readFile(NAVBAR_PATH);
    if (navbarContent) {
        const navLinkRe = /<a[^>]*href=\{`\$\{baseUrl\}#([\w-]+)`\}[^>]*>([\s\S]*?)<\/a>/gi;
        let m;
        while ((m = navLinkRe.exec(navbarContent)) !== null) {
            const rawLabel = m[2].replace(/<[^>]+>/g, '').trim();
            const id = m[1];
            const label = id === 'hero' ? 'Home' : rawLabel;
            if (label && !data.navLinks.some(n => n.id === id)) {
                data.navLinks.push({ id, label });
            }
        }
    }

    // 3.3 Skills
    const skillsContent = readFile(SKILLS_PATH);
    if (skillsContent) {
        const skillRe = /<div\s+class="skill-card"\s+data-category="(\w+)"[\s\S]*?<span\s+class="skill-name">(.*?)<\/span>\s*<span\s+class="skill-badge">(.*?)<\/span>/gi;
        let m;
        while ((m = skillRe.exec(skillsContent)) !== null) {
            data.skills.push({
                category: m[1],
                name: m[2].trim(),
                level: m[3].trim()
            });
        }
    }

    // 3.4 Projects (card-by-card isolation)
    const projectsContent = readFile(PROJECTS_PATH);
    if (projectsContent) {
        const projectBlocks = projectsContent.split(/<div\s+class="project-card"/);
        // Skip first block before any card
        for (let i = 1; i < projectBlocks.length; i++) {
            const block = projectBlocks[i];
            const catMatch = block.match(/data-project-cat="(\w+)"/);
            const titleMatch = block.match(/<h3\s+class="project-title">(.*?)<\/h3>/i);
            const descMatch = block.match(/<p\s+class="project-desc">\s*([\s\S]*?)\s*<\/p>/i);

            const tags = [];
            const tagBlockMatch = block.match(/<div class="project-tags">([\s\S]*?)<\/div>/i);
            if (tagBlockMatch) {
                const tagRe = /<span\s+class="tag">(.*?)<\/span>/gi;
                let t;
                while ((t = tagRe.exec(tagBlockMatch[1])) !== null) tags.push(t[1].trim());
            }

            // Case study link
            let caseStudy = '';
            const csMatch = block.match(/href=\{`\$\{baseUrl\}projects\/([^`"]+)`\}/);
            if (csMatch) {
                caseStudy = `/projects/${csMatch[1]}`;
            }

            // Github repo link
            let repo = '';
            const repoMatch = block.match(/href="(https:\/\/github\.com\/[^"]+)"/);
            if (repoMatch) {
                repo = repoMatch[1];
            }

            if (titleMatch && descMatch) {
                data.projects.push({
                    category: catMatch ? catMatch[1] : 'web',
                    title: titleMatch[1].trim(),
                    description: descMatch[1].replace(/\s+/g, ' ').trim(),
                    tags,
                    caseStudy,
                    repo
                });
            }
        }
    }

    // 3.5 Awards (card-by-card isolation)
    const awardsContent = readFile(AWARDS_PATH);
    if (awardsContent) {
        const awardBlocks = awardsContent.split(/<div\s+class="award-card/);
        for (let i = 1; i < awardBlocks.length; i++) {
            const block = awardBlocks[i];
            const badgeMatch = block.match(/<span\s+class="award-badge">(.*?)<\/span>/i);
            const titleMatch = block.match(/<h3>(.*?)<\/h3>/i);
            const descMatch = block.match(/<p>([\s\S]*?)<\/p>/i);

            let detailsLink = '';
            const linkMatch = block.match(/href=\{`\$\{baseUrl\}([^`"]+)`\}/);
            if (linkMatch) {
                detailsLink = `/${linkMatch[1]}`;
            }

            if (badgeMatch && titleMatch && descMatch) {
                data.awards.push({
                    badge: badgeMatch[1].trim(),
                    title: titleMatch[1].trim(),
                    description: descMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
                    detailsLink
                });
            }
        }
    }

    // 3.6 Contact
    const contactContent = readFile(CONTACT_PATH);
    if (contactContent) {
        const infoRe = /<(?:a|div)\s+[^>]*class="info-item"[\s\S]*?<span>(.*?)<\/span>\s*<strong>(.*?)<\/strong>/gi;
        let m;
        while ((m = infoRe.exec(contactContent)) !== null) {
            data.contactItems.push({
                label: m[1].trim(),
                value: m[2].trim()
            });
        }
    }

    // 3.7 Subpages
    data.subpages = discoverSubpages(PAGES_DIR);

    return data;
}

// ---------------------------------------------------------------------------
// 4. Extract CSS custom properties
// ---------------------------------------------------------------------------
function extractCSSTokens(css) {
    const tokens = [];
    const tokenRe = /--([\w-]+)\s*:\s*([^;]+);/g;
    let m;
    const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
    if (rootMatch) {
        while ((m = tokenRe.exec(rootMatch[1])) !== null) {
            tokens.push({ name: `--${m[1]}`, value: m[2].trim() });
        }
    }
    return tokens;
}

// ---------------------------------------------------------------------------
// 5. Generate ARCHITECTURE.md
// ---------------------------------------------------------------------------
function generateArchitecture(fileTree, cssTokens, data) {
    const tokenTable = cssTokens.map(t =>
        `| \`${t.name}\` | \`${t.value}\` |`
    ).join('\n');

    const sectionList = data.navLinks.map(l =>
        `- **${l.label}** → \`#${l.id}\``
    ).join('\n');

    const subpageList = data.subpages
        .filter(s => s.route !== '/')
        .map(s => `- **\`${s.route}\`** → Source: [\`${s.file}\`](../${s.file})`)
        .join('\n');

    return `# Portfolio Web Application - Architecture Documentation

> **Auto-generated** on ${timestamp()} by \`scripts/update_docs.js\`  
> Run \`npm run docs\` to refresh this document.

---

## 1. Overview & Key Metrics

| Metric / Property | Value |
| :--- | :--- |
| **Project Title** | ${data.title} |
| **Meta Description** | ${data.metaDescription} |
| **Core Architecture** | Modern Astro 5.x Component SSG + Fallback Vanilla Offline Bundle |
| **Total Skills** | ${data.skills.length} skills across 4 categories |
| **Total Featured Projects** | ${data.projects.length} showcase projects |
| **Total Awards & Leadership** | ${data.awards.length} honors & positions |
| **Total Dedicated Subpages** | ${data.subpages.filter(s => s.route !== '/').length} dedicated case study & award subpages |
| **Deployment Target** | GitHub Pages (\`https://Ravindulakshan2393.github.io/Portfolio/\`) via GitHub Actions |

---

## 2. Live File Tree

\`\`\`
Portfolio/
${fileTree}\`\`\`

---

## 3. Technology Stack & Framework Architecture

- **Astro 5.x SSG**:
  - Pure static HTML generation for blazing-fast load speeds, zero runtime overhead, and optimal SEO.
  - Component-driven architecture using Astro Islands (\`src/components/*.astro\`).
  - Master layout wrapping in \`src/layouts/BaseLayout.astro\` with standard viewport, OpenGraph metadata, ambient glowing background orbs, and base URL resolution.
- **Dedicated Subpage Routing (\`src/pages/\`)**:
  - Independent, responsive case study and award verification pages replacing legacy modal popups.
  - Consistent padding (\`125px\` top offset), standardized max-width containers (\`1140px\`), tablet/mobile breakpoints (\`992px\`, \`768px\`), and back navigation.
- **CSS3 Design System (\`src/styles/styles.css\`)**:
  - Modular CSS Custom Properties (Design Tokens) defining dark/light themes, glowing ambient orbs, and glassmorphic card surfaces.
  - Full Light Theme support with automatic CSS variable overrides.
- **Client-Side ES6+ Engine (\`src/scripts/main.js\`)**:
  - Dynamic Role Typing Subtitle (\`typeRoles\`) cycling through developer specializations.
  - Interactive Filter Engines for Skills (\`data-category\`) and Projects (\`data-project-category\`).
  - Scroll Spy Navigation system dynamically highlighting the active section based on scroll offset.
  - Light/Dark theme toggler with \`localStorage\` state persistence.
  - Client-side validated contact form with animated floating notification toast.
- **Dual Site Architecture (Production + Offline Fallback)**:
  - **Production Site (Astro)**: Source in \`src/\`, built by \`npm run build\` into \`dist/\`, and deployed automatically via \`.github/workflows/deploy.yml\`.
  - **Standalone Offline Fallback**: Root \`index.html\`, \`css/\`, \`js/\`, and \`assets/\` maintained for direct double-click viewing in file managers without requiring a Node.js server.

---

## 4. Page Navigation & Route Map

### Home Single-Page Anchors:
${sectionList}

### Dedicated Subpages:
${subpageList}

---

## 5. Design Tokens (CSS Custom Properties)

| Token | Value |
| :--- | :--- |
${tokenTable}

---

## 6. Key Interactive Systems

1. **Typing Subtitle Engine**: \`typeRoles()\` continuously cycles through role titles with typing, pausing, and backspacing delays.
2. **Category Filter Engine**: Interactive filter buttons toggle active items in both Skills and Projects grids using data attributes.
3. **Scroll Spy & Subpage Navbar**: Automatically tracks scroll depth to update active navbar links on Home, while highlighting parent tabs (\`Projects\`, \`Awards\`) when navigating dedicated subpages.
4. **Theme Switcher**: Seamlessly toggles the \`light-theme\` class on \`<body>\` and persists preference to \`localStorage\`.
5. **Contact Form Toast Notification**: Validates form inputs, simulates asynchronous submission, and displays an animated toast notification.
`;
}

// ---------------------------------------------------------------------------
// 6. Generate RESUME_DATA.md
// ---------------------------------------------------------------------------
function generateResumeData(data) {
    const skillsByCategory = {};
    data.skills.forEach(s => {
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

    const projectSections = data.projects.map((p, i) => {
        const tags = p.tags.length > 0 ? p.tags.join(', ') : 'N/A';
        const links = [];
        if (p.caseStudy) links.push(`Case Study: \`${p.caseStudy}\``);
        if (p.repo) links.push(`[GitHub Repository](${p.repo})`);
        const linksLine = links.length > 0 ? `\n- **Links**: ${links.join(' | ')}` : '';

        return `### ${i + 1}. ${p.title}
- **Category**: ${p.category}
- **Description**: ${p.description}
- **Tech Stack**: ${tags}${linksLine}`;
    }).join('\n\n');

    const awardSections = data.awards.map(a => {
        const link = a.detailsLink ? ` (Details: \`${a.detailsLink}\`)` : '';
        return `- **${a.badge}** — ${a.title}: ${a.description}${link}`;
    }).join('\n');

    const contactSections = data.contactItems.map(c =>
        `- **${c.label}**: \`${c.value}\``
    ).join('\n');

    return `# Sadeepa Lakshan - Master Resume Data Reference

> **Auto-generated** on ${timestamp()} by \`scripts/update_docs.js\`  
> Run \`npm run docs\` to refresh this document.

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

// Read CSS
console.log('  🎨 Scanning src/styles/styles.css ...');
const css = readFile(CSS_PATH);
const cssTokens = extractCSSTokens(css);
console.log(`     Found: ${cssTokens.length} design tokens`);

// Extract data from Astro components
console.log('  🚀 Scanning src/components & src/pages ...');
const portfolioData = extractPortfolioData();
console.log(`     Found: ${portfolioData.skills.length} skills, ${portfolioData.projects.length} projects, ${portfolioData.awards.length} awards, ${portfolioData.subpages.length} pages`);

// Build file tree
console.log('  📁 Building live file tree ...');
const fileTree = buildFileTree(ROOT);

// Generate & write documents
console.log('');
console.log('  📝 Generating documents ...');

const results = {};

results['ARCHITECTURE.md'] = writeDoc(
    'ARCHITECTURE.md',
    generateArchitecture(fileTree, cssTokens, portfolioData)
);

results['RESUME_DATA.md'] = writeDoc(
    'RESUME_DATA.md',
    generateResumeData(portfolioData)
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
console.log('  💡 Tip: Run npm run docs before committing to keep docs in sync.');
console.log('');
