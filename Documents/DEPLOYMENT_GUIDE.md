# GitHub Pages Deployment & Hosting Guide

This guide covers deploying Sadeepa Lakshan's Portfolio website to **GitHub Pages**, configuring the automated CI/CD pipeline, setting up custom domain DNS records, and troubleshooting common issues.

---

## 1. Automated GitHub Actions CI/CD Pipeline

The portfolio uses an automated GitHub Actions workflow defined in [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) that automatically builds the Astro application and publishes the static distribution (`dist/`) on every push to `main`.

### Workflow Pipeline Steps:
1. **Trigger**: Executes on push to `main` branch or manual `workflow_dispatch`.
2. **Environment**: Ubuntu Linux with Node.js 22.
3. **Dependency Installation**: `npm install` with npm cache.
4. **Static Build**: `npm run build` compiles `src/` into the optimized static folder `dist/`.
5. **Artifact Upload**: `actions/upload-pages-artifact@v3` packages `dist/`.
6. **Deployment**: `actions/deploy-pages@v4` deploys the site to the official GitHub Pages environment.

### Live URL:
- **`https://Ravindulakshan2393.github.io/Portfolio/`**

---

## 2. Astro Base URL & Routing Configuration

The project is hosted under the subpath `/Portfolio/`. This is managed inside [`astro.config.mjs`](../astro.config.mjs):

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://Ravindulakshan2393.github.io',
  base: '/Portfolio',
});
```

### Best Practice for Internal Links & Assets in `.astro` Files:
Always use `baseUrl` dynamically to avoid broken URLs on both local preview (`localhost:4321/Portfolio/`) and production:

```astro
---
const baseUrl = import.meta.env.BASE_URL.replace(/\/?$/, '/');
---

<a href={`${baseUrl}projects/contrack`}>Case Study</a>
<img src={`${baseUrl}assets/symbol.png`} alt="Symbol" />
```

---

## 3. Pre-Deployment Verification Checklist

Before pushing commits to GitHub, run the local quality assurance suite:

```bash
# 1. Verify Astro build generates cleanly
npm run build

# 2. Run automated link, image, and route integrity tests
node scripts/test_ui_ux.js

# 3. Synchronize documentation with the latest code state
npm run docs

# 4. Commit and push
git add -A
git commit -m "chore: update documentation and verify build"
git push origin main
```

---

## 4. Deploying to Root Domain (`Ravindulakshan2393.github.io`)

If you want the portfolio to live directly at `https://Ravindulakshan2393.github.io` (without `/Portfolio/`):

1. Rename the GitHub repository to: **`Ravindulakshan2393.github.io`**
2. In `astro.config.mjs`, update `base`:
   ```javascript
   export default defineConfig({
     site: 'https://Ravindulakshan2393.github.io',
     base: '/',
   });
   ```
3. Commit and push to `main`. GitHub Pages will automatically serve the site from the domain root.

---

## 5. Custom Domain Setup (e.g., `sadeepalakshan.dev`)

If you purchase a custom domain name:

1. **GitHub Pages Settings**:
   - Go to repository **Settings** → **Pages** → **Custom domain**.
   - Enter your domain (e.g., `sadeepalakshan.dev`).
   - Check **Enforce HTTPS**.
2. **Add CNAME file**:
   - Place a `CNAME` file in `public/CNAME` containing your domain name (e.g., `sadeepalakshan.dev`).
3. **DNS Configuration** (at your domain registrar, e.g. Namecheap, Cloudflare, GoDaddy):
   - **Apex / Root A Records** pointing to GitHub Pages IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record** for `www` subdomain:
     - Host: `www` → Value: `Ravindulakshan2393.github.io`

---

## 6. Troubleshooting Checklist

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **GitHub Actions Build Failed** | Missing import, syntax error, or unclosed tag in `.astro` file | Run `npm run build` locally in terminal to see the exact error line and stack trace. |
| **404 on Subpages (`/projects/contrack`)** | Missing subpage file or incorrect base path | Ensure the file exists in `src/pages/projects/contrack.astro` and uses `${baseUrl}`. |
| **Images or Fonts Not Loading** | File name case mismatch or missing in `public/assets/` | Linux GitHub runners are case-sensitive. Verify exact file name casing in `public/assets/`. |
| **Custom CSS Not Applied** | Missing `import '../styles/styles.css'` in layout | Ensure `BaseLayout.astro` imports `styles.css`. |
