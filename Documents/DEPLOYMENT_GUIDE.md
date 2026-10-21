# GitHub Pages Deployment & Hosting Guide

This guide covers deploying Sadeepa Lakshan's Portfolio website to **GitHub Pages**, setting up custom domain DNS records, and automating deployments.

---

## 1. Quick Initial Deployment (GitHub Pages)

### Step 1: Initialize Git & Push Repository
Open PowerShell or Git Bash in `d:\Projects\SoftProject\GitHub\Portfolio`:

```bash
git init
git add .
git commit -m "Initial commit - Portfolio site"
git branch -M main
git remote add origin https://github.com/Ravindulakshan2393/Portfolio.git
git push -u origin main
```

### Step 2: Enable GitHub Pages in Repo Settings
1. Navigate to your repository on GitHub: `https://github.com/Ravindulakshan2393/Portfolio`
2. Click **Settings** (top navigation tab).
3. On the left sidebar, click **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select **`GitHub Actions`**.
5. The included [deploy.yml](file:///.github/workflows/deploy.yml) workflow will automatically build and publish your Astro site on every `git push origin main`.
6. Your website will be live at:
   - **`https://Ravindulakshan2393.github.io/Portfolio/`**


---

## 2. Deploying to Root Domain (`Ravindulakshan2393.github.io`)

If you want your website URL to be `https://Ravindulakshan2393.github.io` (without `/Portfolio/`):

1. Create a repository on GitHub specifically named: **`Ravindulakshan2393.github.io`**
2. Push your files to that repository's `main` branch.
3. GitHub Pages will automatically publish it at `https://Ravindulakshan2393.github.io`.

---

## 3. Custom Domain Setup (Optional)

If you purchase a custom domain (e.g., `sadeepalakshan.dev` or `sadeepa.com`):

1. In GitHub Pages settings, enter your domain in **Custom domain**.
2. Add a `CNAME` file in the root folder containing your domain name.
3. Update your domain registrar's DNS records:
   - **A Records** pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record**: `www` -> `Ravindulakshan2393.github.io`

---

## 4. Troubleshooting Checklist

| Issue | Solution |
| :--- | :--- |
| **404 Not Found** | Check that `index.html` is in the root directory (not inside a subfolder). |
| **CSS/JS paths broken** | Ensure paths in `index.html` are relative (`css/styles.css` and `js/main.js`). |
| **Images not loading** | Verify case-sensitivity in file paths (`assets/symbol.png`). |
