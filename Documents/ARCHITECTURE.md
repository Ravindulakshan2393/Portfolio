# Portfolio Web Application - Architecture Documentation

> **Auto-generated** on 2026-11-08 14:26:41 UTC by `scripts/update_docs.js`
> Run `node scripts/update_docs.js` to refresh this document.

---

## 1. Overview

| Field | Value |
| :--- | :--- |
| **Page Title** | Sadeepa Lakshan | Software Engineering & Full-Stack Developer |
| **Meta Description** | Official Portfolio of Sadeepa Lakshan - BSc (Hons) IT & Management Undergrad @ University of Moratuwa. Software Engineering Intern & Full-Stack Web Developer. |
| **Total Skills** | 15 |
| **Total Projects** | 3 |
| **Total Awards** | 6 |

---

## 2. Live File Tree

```
Portfolio/
assets/
├── awards/
│   ├── deputy-head-prefect-certificate.jpg  (149.2 KB)
│   ├── nena-aruna-appreciation-letter.jpg  (174.8 KB)
│   ├── prefect-guild-ceremony.jpg  (144.5 KB)
│   └── spirit-of-service-certificate.jpg  (158.6 KB)
├── projects/
│   ├── abacus-certificate.jpg  (153.0 KB)
│   ├── abacus-hardware-setup.jpg  (172.2 KB)
│   ├── abacus-team.jpg  (211.9 KB)
│   ├── aesss-team.jpg  (204.0 KB)
│   └── contrack-banner.jpg  (178.5 KB)
├── profile.jpg  (100.2 KB)
└── symbol.png  (954.6 KB)
css/
└── styles.css  (32.7 KB)
dist/
├── _astro/
│   ├── abacus.BYZPNiGj.css  (8.1 KB)
│   ├── ae-sss.Bf5_kIlf.css  (9.4 KB)
│   ├── BaseLayout.astro_astro_type_script_index_0_lang.Wxwf_bDo.js  (8.6 KB)
│   ├── BaseLayout.DTDYj-JO.css  (27.2 KB)
│   ├── contrack.Baq977qh.css  (7.9 KB)
│   ├── deputy-head-prefect.kYGtwTGw.css  (9.6 KB)
│   ├── nena-aruna.DZhXQk3b.css  (8.6 KB)
│   └── spirit-of-service.BRtx3bjx.css  (8.3 KB)
├── assets/
│   ├── awards/
│   │   ├── deputy-head-prefect-certificate.jpg  (149.2 KB)
│   │   ├── nena-aruna-appreciation-letter.jpg  (174.8 KB)
│   │   ├── prefect-guild-ceremony.jpg  (144.5 KB)
│   │   └── spirit-of-service-certificate.jpg  (158.6 KB)
│   ├── projects/
│   │   ├── abacus-certificate.jpg  (153.0 KB)
│   │   ├── abacus-hardware-setup.jpg  (172.2 KB)
│   │   ├── abacus-team.jpg  (211.9 KB)
│   │   ├── aesss-team.jpg  (204.0 KB)
│   │   └── contrack-banner.jpg  (178.5 KB)
│   ├── profile.jpg  (100.2 KB)
│   └── symbol.png  (954.6 KB)
├── awards/
│   ├── deputy-head-prefect/
│   │   └── index.html  (20.1 KB)
│   ├── nena-aruna/
│   │   └── index.html  (20.6 KB)
│   └── spirit-of-service/
│       └── index.html  (20.0 KB)
├── projects/
│   ├── abacus/
│   │   └── index.html  (24.0 KB)
│   ├── ae-sss/
│   │   └── index.html  (29.2 KB)
│   └── contrack/
│       └── index.html  (25.7 KB)
└── index.html  (29.8 KB)
Documents/
├── AE_SSS_SMART_ECOSYSTEM_REPORT.md  (18.4 KB)
├── ARCHITECTURE.md  (7.4 KB)
├── DEPLOYMENT_GUIDE.md  (2.4 KB)
├── FEATURE_EXPANSION_GUIDE.md  (3.6 KB)
└── RESUME_DATA.md  (3.5 KB)
js/
└── main.js  (15.5 KB)
public/
└── assets/
    ├── awards/
    │   ├── deputy-head-prefect-certificate.jpg  (149.2 KB)
    │   ├── nena-aruna-appreciation-letter.jpg  (174.8 KB)
    │   ├── prefect-guild-ceremony.jpg  (144.5 KB)
    │   └── spirit-of-service-certificate.jpg  (158.6 KB)
    ├── projects/
    │   ├── abacus-certificate.jpg  (153.0 KB)
    │   ├── abacus-hardware-setup.jpg  (172.2 KB)
    │   ├── abacus-team.jpg  (211.9 KB)
    │   ├── aesss-team.jpg  (204.0 KB)
    │   └── contrack-banner.jpg  (178.5 KB)
    ├── profile.jpg  (100.2 KB)
    └── symbol.png  (954.6 KB)
scripts/
├── test_ui_ux.js  (4.6 KB)
└── update_docs.js  (15.0 KB)
src/
├── components/
│   ├── About.astro  (6.5 KB)
│   ├── Awards.astro  (6.1 KB)
│   ├── Contact.astro  (5.1 KB)
│   ├── Footer.astro  (1.0 KB)
│   ├── Hero.astro  (3.9 KB)
│   ├── Navbar.astro  (1.6 KB)
│   ├── ProjectModal.astro  (0.6 KB)
│   ├── Projects.astro  (10.6 KB)
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
│   │   ├── ae-sss.astro  (34.9 KB)
│   │   └── contrack.astro  (29.8 KB)
│   └── index.astro  (0.6 KB)
├── scripts/
│   └── main.js  (17.9 KB)
└── styles/
    └── styles.css  (39.9 KB)
astro.config.mjs  (0.2 KB)
index.html  (44.2 KB)
package-lock.json  (125.8 KB)
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
