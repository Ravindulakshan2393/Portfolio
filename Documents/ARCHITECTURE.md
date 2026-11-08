# Portfolio Web Application - Architecture Documentation

> **Auto-generated** on 2026-11-08 19:07:16 UTC by `scripts/update_docs.js`  
> Run `npm run docs` to refresh this document.

---

## 1. Overview & Key Metrics

| Metric / Property | Value |
| :--- | :--- |
| **Project Title** | Sadeepa Lakshan | Software Engineering & Full-Stack Developer |
| **Meta Description** | Official Portfolio of Sadeepa Lakshan - BSc (Hons) IT & Management Undergrad @ University of Moratuwa. Software Engineering Intern & Full-Stack Web Developer. |
| **Core Architecture** | Modern Astro 5.x Component SSG + Fallback Vanilla Offline Bundle |
| **Total Skills** | 15 skills across 4 categories |
| **Total Featured Projects** | 3 showcase projects |
| **Total Awards & Leadership** | 6 honors & positions |
| **Total Dedicated Subpages** | 6 dedicated case study & award subpages |
| **Deployment Target** | GitHub Pages (`https://Ravindulakshan2393.github.io/Portfolio/`) via GitHub Actions |

---

## 2. Live File Tree

```
Portfolio/
assets/
├── awards/
│   ├── deputy-head-prefect-certificate.jpg  (149.2 KB)
│   ├── ieee-cs-r10-certificate.jpg  (153.0 KB)
│   ├── nena-aruna-appreciation-letter.jpg  (174.8 KB)
│   ├── prefect-guild-ceremony.jpg  (144.5 KB)
│   └── spirit-of-service-certificate.jpg  (158.6 KB)
├── projects/
│   ├── abacus-certificate.jpg  (153.0 KB)
│   ├── abacus-hardware-setup.jpg  (172.2 KB)
│   ├── abacus-team.jpg  (211.9 KB)
│   ├── ae-sss-certificate.jpg  (153.0 KB)
│   ├── aesss-team.jpg  (204.0 KB)
│   └── contrack-banner.jpg  (178.5 KB)
├── profile.jpg  (100.2 KB)
└── symbol.png  (954.6 KB)
css/
└── styles.css  (32.7 KB)
dist/
├── _astro/
│   ├── abacus.B1ut6qA6.css  (8.2 KB)
│   ├── ae-sss.k9qI7r_Y.css  (10.3 KB)
│   ├── BaseLayout.astro_astro_type_script_index_0_lang.jawGpcFi.js  (6.1 KB)
│   ├── BaseLayout.BFLit4ov.css  (29.4 KB)
│   ├── contrack.By9xvxXX.css  (7.9 KB)
│   ├── deputy-head-prefect.uYyajMVY.css  (9.7 KB)
│   ├── nena-aruna.Be_6G87p.css  (8.7 KB)
│   └── spirit-of-service.BBN6iYDo.css  (8.3 KB)
├── assets/
│   ├── awards/
│   │   ├── deputy-head-prefect-certificate.jpg  (149.2 KB)
│   │   ├── ieee-cs-r10-certificate.jpg  (153.0 KB)
│   │   ├── nena-aruna-appreciation-letter.jpg  (174.8 KB)
│   │   ├── prefect-guild-ceremony.jpg  (144.5 KB)
│   │   └── spirit-of-service-certificate.jpg  (158.6 KB)
│   ├── projects/
│   │   ├── abacus-certificate.jpg  (153.0 KB)
│   │   ├── abacus-hardware-setup.jpg  (172.2 KB)
│   │   ├── abacus-team.jpg  (211.9 KB)
│   │   ├── ae-sss-certificate.jpg  (153.0 KB)
│   │   ├── aesss-team.jpg  (204.0 KB)
│   │   └── contrack-banner.jpg  (178.5 KB)
│   ├── profile.jpg  (100.2 KB)
│   └── symbol.png  (954.6 KB)
├── awards/
│   ├── deputy-head-prefect/
│   │   └── index.html  (21.5 KB)
│   ├── nena-aruna/
│   │   └── index.html  (22.0 KB)
│   └── spirit-of-service/
│       └── index.html  (21.4 KB)
├── projects/
│   ├── abacus/
│   │   └── index.html  (25.2 KB)
│   ├── ae-sss/
│   │   └── index.html  (32.0 KB)
│   └── contrack/
│       └── index.html  (25.8 KB)
└── index.html  (30.3 KB)
Documents/
├── AE_SSS_SMART_ECOSYSTEM_REPORT.md  (18.4 KB)
├── ARCHITECTURE.md  (10.4 KB)
├── DEPLOYMENT_GUIDE.md  (4.3 KB)
├── FEATURE_EXPANSION_GUIDE.md  (9.0 KB)
└── RESUME_DATA.md  (4.0 KB)
js/
└── main.js  (16.2 KB)
public/
└── assets/
    ├── awards/
    │   ├── deputy-head-prefect-certificate.jpg  (149.2 KB)
    │   ├── ieee-cs-r10-certificate.jpg  (153.0 KB)
    │   ├── nena-aruna-appreciation-letter.jpg  (174.8 KB)
    │   ├── prefect-guild-ceremony.jpg  (144.5 KB)
    │   └── spirit-of-service-certificate.jpg  (158.6 KB)
    ├── projects/
    │   ├── abacus-certificate.jpg  (153.0 KB)
    │   ├── abacus-hardware-setup.jpg  (172.2 KB)
    │   ├── abacus-team.jpg  (211.9 KB)
    │   ├── ae-sss-certificate.jpg  (153.0 KB)
    │   ├── aesss-team.jpg  (204.0 KB)
    │   └── contrack-banner.jpg  (178.5 KB)
    ├── profile.jpg  (100.2 KB)
    └── symbol.png  (954.6 KB)
scripts/
├── test_ui_ux.js  (4.6 KB)
└── update_docs.js  (20.7 KB)
src/
├── components/
│   ├── About.astro  (6.2 KB)
│   ├── Awards.astro  (6.1 KB)
│   ├── Contact.astro  (5.5 KB)
│   ├── Footer.astro  (1.4 KB)
│   ├── Hero.astro  (4.2 KB)
│   ├── Navbar.astro  (1.8 KB)
│   ├── ProjectModal.astro  (0.3 KB)
│   ├── Projects.astro  (10.8 KB)
│   ├── Skills.astro  (5.2 KB)
│   └── Stats.astro  (1.9 KB)
├── layouts/
│   └── BaseLayout.astro  (1.9 KB)
├── pages/
│   ├── awards/
│   │   ├── deputy-head-prefect.astro  (29.0 KB)
│   │   ├── nena-aruna.astro  (27.8 KB)
│   │   └── spirit-of-service.astro  (26.9 KB)
│   ├── projects/
│   │   ├── abacus.astro  (29.5 KB)
│   │   ├── ae-sss.astro  (38.8 KB)
│   │   └── contrack.astro  (29.8 KB)
│   └── index.astro  (0.6 KB)
├── scripts/
│   └── main.js  (14.2 KB)
└── styles/
    └── styles.css  (41.9 KB)
astro.config.mjs  (0.2 KB)
index.html  (45.5 KB)
package-lock.json  (125.8 KB)
package.json  (0.4 KB)
README.md  (2.6 KB)
```

---

## 3. Technology Stack & Framework Architecture

- **Astro 5.x SSG**:
  - Pure static HTML generation for blazing-fast load speeds, zero runtime overhead, and optimal SEO.
  - Component-driven architecture using Astro Islands (`src/components/*.astro`).
  - Master layout wrapping in `src/layouts/BaseLayout.astro` with standard viewport, OpenGraph metadata, ambient glowing background orbs, and base URL resolution.
- **Dedicated Subpage Routing (`src/pages/`)**:
  - Independent, responsive case study and award verification pages replacing legacy modal popups.
  - Consistent padding (`125px` top offset), standardized max-width containers (`1140px`), tablet/mobile breakpoints (`992px`, `768px`), and back navigation.
- **CSS3 Design System (`src/styles/styles.css`)**:
  - Modular CSS Custom Properties (Design Tokens) defining dark/light themes, glowing ambient orbs, and glassmorphic card surfaces.
  - Full Light Theme support with automatic CSS variable overrides.
- **Client-Side ES6+ Engine (`src/scripts/main.js`)**:
  - Dynamic Role Typing Subtitle (`typeRoles`) cycling through developer specializations.
  - Interactive Filter Engines for Skills (`data-category`) and Projects (`data-project-category`).
  - Scroll Spy Navigation system dynamically highlighting the active section based on scroll offset.
  - Light/Dark theme toggler with `localStorage` state persistence.
  - Client-side validated contact form with animated floating notification toast.
- **Dual Site Architecture (Production + Offline Fallback)**:
  - **Production Site (Astro)**: Source in `src/`, built by `npm run build` into `dist/`, and deployed automatically via `.github/workflows/deploy.yml`.
  - **Standalone Offline Fallback**: Root `index.html`, `css/`, `js/`, and `assets/` maintained for direct double-click viewing in file managers without requiring a Node.js server.

---

## 4. Page Navigation & Route Map

### Home Single-Page Anchors:
- **Home** → `#hero`
- **About** → `#about`
- **Skills** → `#skills`
- **Projects** → `#projects`
- **Awards** → `#awards`
- **Stats** → `#github-stats`
- **Contact** → `#contact`

### Dedicated Subpages:
- **`/awards/deputy-head-prefect`** → Source: [`src/pages/awards/deputy-head-prefect.astro`](../src/pages/awards/deputy-head-prefect.astro)
- **`/awards/nena-aruna`** → Source: [`src/pages/awards/nena-aruna.astro`](../src/pages/awards/nena-aruna.astro)
- **`/awards/spirit-of-service`** → Source: [`src/pages/awards/spirit-of-service.astro`](../src/pages/awards/spirit-of-service.astro)
- **`/projects/abacus`** → Source: [`src/pages/projects/abacus.astro`](../src/pages/projects/abacus.astro)
- **`/projects/ae-sss`** → Source: [`src/pages/projects/ae-sss.astro`](../src/pages/projects/ae-sss.astro)
- **`/projects/contrack`** → Source: [`src/pages/projects/contrack.astro`](../src/pages/projects/contrack.astro)

---

## 5. Design Tokens (CSS Custom Properties)

| Token | Value |
| :--- | :--- |
| `--bg-dark` | `#070a12` |
| `--bg-card` | `rgba(15, 23, 42, 0.65)` |
| `--bg-card-hover` | `rgba(30, 41, 59, 0.75)` |
| `--bg-nav` | `rgba(7, 10, 18, 0.85)` |
| `--border-color` | `rgba(255, 255, 255, 0.1)` |
| `--border-glow` | `rgba(56, 189, 248, 0.4)` |
| `--primary` | `#38bdf8` |
| `--primary-glow` | `rgba(56, 189, 248, 0.25)` |
| `--secondary` | `#818cf8` |
| `--accent-purple` | `#c084fc` |
| `--accent-emerald` | `#3ecf8e` |
| `--accent-orange` | `#ff6c37` |
| `--accent-gold` | `#fbbf24` |
| `--text-main` | `#f8fafc` |
| `--text-muted` | `#94a3b8` |
| `--text-dim` | `#64748b` |
| `--font-main` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` |
| `--font-code` | `'JetBrains Mono', monospace` |
| `--radius-sm` | `8px` |
| `--radius-md` | `14px` |
| `--radius-lg` | `20px` |
| `--radius-full` | `9999px` |
| `--glass-backdrop` | `blur(16px)` |
| `--shadow-card` | `0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)` |
| `--shadow-glow` | `0 0 25px rgba(56, 189, 248, 0.3)` |
| `--transition-fast` | `0.2s cubic-bezier(0.4, 0, 0.2, 1)` |
| `--transition-normal` | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 6. Key Interactive Systems

1. **Typing Subtitle Engine**: `typeRoles()` continuously cycles through role titles with typing, pausing, and backspacing delays.
2. **Category Filter Engine**: Interactive filter buttons toggle active items in both Skills and Projects grids using data attributes.
3. **Scroll Spy & Subpage Navbar**: Automatically tracks scroll depth to update active navbar links on Home, while highlighting parent tabs (`Projects`, `Awards`) when navigating dedicated subpages.
4. **Theme Switcher**: Seamlessly toggles the `light-theme` class on `<body>` and persists preference to `localStorage`.
5. **Contact Form Toast Notification**: Validates form inputs, simulates asynchronous submission, and displays an animated toast notification.
