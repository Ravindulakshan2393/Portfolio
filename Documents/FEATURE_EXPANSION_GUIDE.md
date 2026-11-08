# Feature Expansion & Maintenance Guide

This guide provides step-by-step instructions for future enhancements, adding projects/awards, and maintaining Sadeepa Lakshan's Portfolio website using its **Astro 5.x component architecture**.

---

## 1. Architecture Overview

The portfolio is built as a modern **Astro Static Site (SSG)**:
- **Components** (`src/components/`): Modular UI sections (`Hero.astro`, `About.astro`, `Skills.astro`, `Projects.astro`, `Awards.astro`, `Stats.astro`, `Contact.astro`, `Navbar.astro`, `Footer.astro`).
- **Master Layout** (`src/layouts/BaseLayout.astro`): Contains SEO metadata, OpenGraph tags, ambient background glows, and global scripts.
- **Dedicated Subpages** (`src/pages/projects/*`, `src/pages/awards/*`): Deep-dive case studies and certificate verification pages replacing legacy modal popups.
- **Global Styles** (`src/styles/styles.css`): Unified CSS custom properties (design tokens), glassmorphic card styles, animations, and full light/dark theme support.
- **Client Script** (`src/scripts/main.js`): Typing subtitles, category filters, scroll spy navbar, theme toggling, and contact form toasts.
- **Offline Fallback** (`index.html`, `css/`, `js/`, `assets/`): Root files maintained for standalone offline viewing without running a Node server.

---

## 2. How to Add a New Featured Project

Each featured project consists of:
1. A **Project Card** on the Home page (`src/components/Projects.astro`).
2. A **Dedicated Case Study Subpage** (`src/pages/projects/<slug>.astro`).

### Step 1: Create the Subpage (`src/pages/projects/<slug>.astro`)

Create a new `.astro` file under `src/pages/projects/` (e.g. `src/pages/projects/my-new-app.astro`):

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
const baseUrl = import.meta.env.BASE_URL.replace(/\/?$/, '/');
---

<BaseLayout
  title="My New App | Case Study | Sadeepa Lakshan"
  description="In-depth breakdown of My New App: architecture, tech stack, and key features."
  isHome={false}
>
    <div class="subpage-wrapper">
        <div class="container">
            <!-- Back to Projects Button -->
            <a href={`${baseUrl}#projects`} class="back-btn">
                <i class="fa-solid fa-arrow-left"></i> Back to Projects
            </a>

            <!-- Subpage Header -->
            <div class="subpage-header">
                <span class="subpage-tag">// CASE STUDY</span>
                <h1 class="subpage-title">My New <span class="text-gradient">App Title</span></h1>
                <p class="subpage-subtitle">Short summary of the problem solved and core technology used.</p>
            </div>

            <!-- Case Study Content Grid -->
            <div class="subpage-grid">
                <!-- Main Breakdown -->
                <div class="subpage-card main-content">
                    <h2><i class="fa-solid fa-diagram-project"></i> Project Overview</h2>
                    <p>Detailed explanation of the solution, development process, and impact.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li><strong>Feature 1:</strong> Description of the feature.</li>
                        <li><strong>Feature 2:</strong> Description of the feature.</li>
                    </ul>
                </div>

                <!-- Specs Sidebar -->
                <div class="subpage-card sidebar">
                    <h3>Technical Stack</h3>
                    <div class="tech-chips">
                        <span class="badge">React</span>
                        <span class="badge">Node.js</span>
                        <span class="badge">PostgreSQL</span>
                    </div>

                    <div class="subpage-links" style="margin-top: 1.5rem;">
                        <a href="https://github.com/Ravindulakshan2393/RepoName" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">
                            <i class="fa-brands fa-github"></i> View GitHub Repo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</BaseLayout>
```

> [!NOTE]
> All subpages automatically inherit standard top padding (`125px`), container max-width (`1140px`), responsive layout rules (`992px` tablet, `768px` mobile), and light theme tokens defined in `src/styles/styles.css`.

---

### Step 2: Add Project Card to `src/components/Projects.astro`

Open `src/components/Projects.astro` and insert a new card inside `.projects-grid`:

```astro
<!-- Project: My New App -->
<div class="project-card" data-project-cat="web"> <!-- Categories: web | iot -->
    <div class="project-image-wrapper">
        <div class="project-graphic iot-graphic">
            <div class="window-bar">
                <span class="dot-btn"></span><span class="dot-btn"></span><span class="dot-btn"></span>
                <span class="window-title">My New App Title</span>
            </div>
            <div class="graphic-content iot-content">
                <div class="sensor-chip">
                    <i class="fa-brands fa-react" style="color: var(--primary);"></i>
                    <span>React + Node.js</span>
                </div>
                <div class="sensor-values">
                    <div class="s-val"><span>Backend</span><b>Express.js API</b></div>
                    <div class="s-val"><span>Database</span><b>PostgreSQL</b></div>
                </div>
            </div>
        </div>
        <div class="project-overlay">
            <a href={`${baseUrl}projects/my-new-app`} class="btn btn-sm btn-primary">
                <i class="fa-solid fa-file-lines"></i> View Case Study
            </a>
            <a href="https://github.com/Ravindulakshan2393/RepoName" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="margin-left: 8px;">
                <i class="fa-brands fa-github"></i> Repository
            </a>
        </div>
    </div>

    <div class="project-content">
        <span class="project-type"><i class="fa-solid fa-code" style="color: var(--primary); margin-right: 4px;"></i> Full-Stack Web Platform</span>
        <h3 class="project-title">My New App Title</h3>
        <p class="project-desc">
            Short summary explaining the project goals, core architectural decisions, and tangible results.
        </p>
        <div class="project-tags">
            <span class="tag">React</span>
            <span class="tag">Node.js</span>
            <span class="tag">PostgreSQL</span>
        </div>
        <div class="project-links">
            <a href="https://github.com/Ravindulakshan2393/RepoName" target="_blank" rel="noopener noreferrer" class="link-btn">
                <i class="fa-brands fa-github"></i> Repository
            </a>
            <a href={`${baseUrl}projects/my-new-app`} class="link-btn">
                Case Study <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</div>
```

---

## 3. How to Add a New Award or Recognition

Awards are displayed in `src/components/Awards.astro`. If in-depth documentation or certificate viewing is desired, a subpage can be added in `src/pages/awards/<slug>.astro`.

### Step 1: Add Card to `src/components/Awards.astro`

```astro
<div class="award-card highlight-award">
    <div class="award-icon"><i class="fa-solid fa-trophy"></i></div>
    <div class="award-info">
        <span class="award-badge">Winner / Competition</span>
        <h3>Award or Competition Name</h3>
        <p>Awarded by <strong>Issuing Organization</strong> for outstanding accomplishment or innovation.</p>
        <div style="margin-top: 1.1rem;">
            <a href={`${baseUrl}awards/my-award`} class="btn btn-sm btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-award"></i> View Award Details <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </div>
</div>
```

---

## 4. How to Add or Update Technical Skills

Skills are managed in `src/components/Skills.astro` inside `.skills-grid`.

```astro
<div class="skill-card" data-category="frameworks"> <!-- Categories: languages | frameworks | databases | tools -->
    <i class="devicon-nextjs-original colored skill-icon"></i>
    <span class="skill-name">Next.js</span>
    <span class="skill-badge">Advanced</span> <!-- Levels: Advanced | Proficient | Intermediate | Familiar -->
</div>
```

---

## 5. How to Update CV / About Details

Open `src/components/About.astro`:
- Update the interactive YAML terminal window (`sadeepa-cv.yaml`) inside `<pre class="code-body">`.
- Update the quick bio cards and stats numbers (`Projects Completed`, `Hackathon Wins`, etc.).

---

## 6. Developer Workflow & Quality Assurance

Before committing any changes:

```bash
# 1. Run local dev server with hot reload
npm run dev

# 2. Test Astro production build
npm run build

# 3. Run automated UI/UX and link integrity regression tests
node scripts/test_ui_ux.js

# 4. Auto-update ARCHITECTURE.md and RESUME_DATA.md
npm run docs

# 5. Commit and push to main (triggers automated GitHub Pages deployment)
git add -A
git commit -m "feat: add new project case study"
git push origin main
```
