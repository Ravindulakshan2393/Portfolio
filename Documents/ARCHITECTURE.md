# Portfolio Web Application - Architecture Documentation

> **Auto-generated** on 2026-09-15 14:55:11 UTC by `scripts/update_docs.js`
> Run `node scripts/update_docs.js` to refresh this document.

---

## 1. Overview

| Field | Value |
| :--- | :--- |
| **Page Title** | Sadeepa Lakshan | Software Engineering & Full-Stack Developer |
| **Meta Description** | Official Portfolio of Sadeepa Lakshan - BSc (Hons) IT & Management Undergrad @ UoM (CGPA: 3.12). Software Engineering Intern & Full-Stack Web Developer. |
| **Total Skills** | 15 |
| **Total Projects** | 2 |
| **Total Awards** | 4 |

---

## 2. Live File Tree

```
Portfolio/
assets/
└── symbol.png  (954.6 KB)
css/
└── styles.css  (30.2 KB)
Documents/
├── ARCHITECTURE.md  (3.0 KB)
├── DEPLOYMENT_GUIDE.md  (2.3 KB)
├── FEATURE_EXPANSION_GUIDE.md  (3.6 KB)
└── RESUME_DATA.md  (3.4 KB)
js/
└── main.js  (12.7 KB)
scripts/
└── update_docs.js  (14.5 KB)
index.html  (36.0 KB)
package.json  (0.4 KB)
README.md  (2.6 KB)
```

---

## 3. Technology Stack & Dependencies

- **HTML5**: Semantic elements (`<header>`, `<nav>`, `<section>`, `<footer>`).
- **CSS3**: Custom Properties, Glassmorphism (`backdrop-filter`), Flexbox, CSS Grid, keyframe animations, CSS image filters.
- **ES6+ JavaScript**: Vanilla DOM, IntersectionObserver API, event delegation.
- **External CDNs**: Google Fonts (Inter, JetBrains Mono), FontAwesome 6.4.0, DevIcons v2.15.1, Vercel GitHub Summary Cards.

---

## 4. Page Sections (Navigation Map)

- **Home** → `#hero`
- **About** → `#about`
- **Skills** → `#skills`
- **Projects** → `#projects`
- **Awards** → `#awards`
- **Stats** → `#github-stats`
- **Contact** → `#contact`

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

## 6. JS Modal Project Keys

Project detail keys registered in `js/main.js → projectDetails`:
  - `contrack`
  - `abacus`

---

## 7. Key Interactive Systems

1. **Typing Subtitle Engine**: `typeRoles()` cycles through role strings with type/erase delays.
2. **Category Filters**: Skill cards (`data-category`) and Project cards (`data-project-category`) toggle visibility.
3. **Project Detail Modal**: Lightbox overlay populated from the `projectDetails` JS object.
4. **Theme Switcher**: Toggles `light-theme` class on `<body>`.
5. **Contact Form Toast**: Client-side validation with animated success notification.
