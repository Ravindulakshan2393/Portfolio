# Feature Expansion & Maintenance Guide

This guide provides step-by-step instructions for future enhancements and updates to Sadeepa Lakshan's Portfolio.

---

## 1. How to Add a New Project

To showcase a new project:

### Step A: Update `index.html`
Add a new project card inside `<div class="projects-grid">`:

```html
<div class="project-card" data-project-cat="web"> <!-- Categories: web | database | iot -->
    <div class="project-image-wrapper">
        <div class="project-graphic web-graphic">
            <div class="window-bar">
                <span class="dot-btn"></span><span class="dot-btn"></span><span class="dot-btn"></span>
                <span class="window-title">New Project Title</span>
            </div>
            <div class="graphic-content">
                <!-- Visual preview graphics or <img> -->
            </div>
        </div>
        <div class="project-overlay">
            <button class="btn btn-sm btn-primary view-project-btn" data-project="newproj">
                <i class="fa-solid fa-eye"></i> View Project Specs
            </button>
        </div>
    </div>

    <div class="project-content">
        <span class="project-type">Full-Stack Application</span>
        <h3 class="project-title">My New Project</h3>
        <p class="project-desc">Short project description explaining key impact and functionality.</p>
        <div class="project-tags">
            <span class="tag">React</span>
            <span class="tag">Node.js</span>
            <span class="tag">PostgreSQL</span>
        </div>
        <div class="project-links">
            <a href="https://github.com/Ravindulakshan2393/YourRepo" target="_blank" class="link-btn">
                <i class="fa-brands fa-github"></i> Repository
            </a>
            <button class="link-btn view-project-btn" data-project="newproj">
                Details <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    </div>
</div>
```

### Step B: Update `js/main.js`
Add the project detail key to `projectDetails` object:

```javascript
newproj: {
    title: "My New Project Title",
    type: "Full-Stack Web Application",
    description: "In-depth breakdown of the problem solved, architecture, and deployment.",
    features: [
        "Feature 1: User authentication & authorization",
        "Feature 2: Real-time database sync",
        "Feature 3: Deployed on cloud platform"
    ],
    techStack: ["React", "Node.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/Ravindulakshan2393/YourRepo"
}
```

---

## 2. How to Add a New Skill

Inside `<div class="skills-grid" id="skills-grid">` in `index.html`:

```html
<div class="skill-card" data-category="frameworks"> <!-- languages | frameworks | databases | tools -->
    <i class="devicon-nextjs-original colored skill-icon"></i>
    <span class="skill-name">Next.js</span>
    <span class="skill-badge">Intermediate</span>
</div>
```

---

## 3. How to Add a New Award or Certification

Inside `<div class="awards-grid">` in `index.html`:

```html
<div class="award-card highlight-award">
    <div class="award-icon"><i class="fa-solid fa-trophy"></i></div>
    <div class="award-info">
        <span class="award-badge">Winner / Certification</span>
        <h3>Hackathon / Award Name</h3>
        <p>Short description of the competition or certification issuing body.</p>
    </div>
</div>
```

---

## 4. How to Update Contact Information

Edit the `.info-list` items in `index.html`:
- Phone link: `<a href="tel:+94714252175">`
- Email link: `<a href="mailto:pererawslr@gmail.com">`
- LinkedIn: `https://www.linkedin.com/in/sadeepa-lakshan-587690308`
