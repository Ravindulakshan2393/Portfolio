/* ==========================================================================
   Sadeepa Lakshan Portfolio - Interactive ES6+ Logic
   CV-Updated Version
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Effect in Hero
    const typingTextElement = document.getElementById('typing-text');
    const roles = [
        "BSc (Hons) IT & Management Undergrad @ UoM",
        "Software Engineering Intern Candidate",
        "Full-Stack Web Developer (React, Node, Supabase)",
        "IoT & Embedded Device Developer (Arduino Mega & ESP8266)",
        "Database Architecture Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newRoleDelay = 2000;

    function typeRoles() {
        if (!typingTextElement) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = newRoleDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500;
        }

        setTimeout(typeRoles, typingDelay);
    }

    typeRoles();

    // 2. Counter Animation for Hero Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    function animateCounters() {
        if (hasAnimatedStats) return;

        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) return;
            const duration = 2000;
            const step = Math.ceil(target / (duration / 30));

            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, 30);
        });

        hasAnimatedStats = true;
    }

    // Trigger counters on scroll into hero
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
            }
        }, { threshold: 0.5 });
        observer.observe(heroSection);
    }

    // 3. Header Shrink & Active Navigation Observer
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (!id) return;
                let matchedLink = null;
                navLinks.forEach(link => {
                    const href = link.getAttribute('href') || '';
                    if (href === `#${id}` || href.endsWith(`#${id}`)) {
                        matchedLink = link;
                    }
                });
                if (matchedLink) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    matchedLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        // Create backdrop overlay
        const menuBackdrop = document.createElement('div');
        menuBackdrop.id = 'menu-backdrop';
        menuBackdrop.style.cssText = `
            position: fixed; inset: 0; z-index: 998;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(4px);
            opacity: 0; pointer-events: none;
            transition: opacity 0.3s ease;
            top: 80px;
        `;
        document.body.appendChild(menuBackdrop);

        function openMenu() {
            navMenu.classList.add('active');
            menuBackdrop.style.opacity = '1';
            menuBackdrop.style.pointerEvents = 'auto';
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) { icon.classList.replace('fa-bars', 'fa-xmark'); }
        }

        function closeMenu() {
            navMenu.classList.remove('active');
            menuBackdrop.style.opacity = '0';
            menuBackdrop.style.pointerEvents = 'none';
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) { icon.classList.replace('fa-xmark', 'fa-bars'); }
        }

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.contains('active') ? closeMenu() : openMenu();
        });

        menuBackdrop.addEventListener('click', closeMenu);

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 5. Theme Toggle (Dark / Light) with persistence and GitHub card theme sync
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function updateGithubCards(isLight) {
        const ghImgs = document.querySelectorAll('.github-img');
        ghImgs.forEach(img => {
            const currentSrc = img.getAttribute('src');
            if (currentSrc) {
                if (isLight) {
                    img.src = currentSrc.replace('theme=tokyonight', 'theme=github_light');
                } else {
                    img.src = currentSrc.replace('theme=github_light', 'theme=tokyonight');
                }
            }
        });
        const trophyImg = document.querySelector('.github-img-full');
        if (trophyImg) {
            const currentSrc = trophyImg.getAttribute('src');
            if (currentSrc) {
                if (isLight) {
                    trophyImg.src = currentSrc.replace('theme=tokyonight', 'theme=flat');
                } else {
                    trophyImg.src = currentSrc.replace('theme=flat', 'theme=tokyonight');
                }
            }
        }
    }

    function applyTheme(theme) {
        const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
        if (theme === 'light') {
            body.classList.add('light-theme');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            updateGithubCards(true);
        } else {
            body.classList.remove('light-theme');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            updateGithubCards(false);
        }
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
            // ignore localStorage errors
        }
    }

    // Load saved theme if any
    try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            applyTheme('light');
        }
    } catch (e) {}

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = body.classList.contains('light-theme');
            applyTheme(isLight ? 'dark' : 'light');
        });
    }

    // 6. Skill Category Filtering
    const skillFilterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 7. Project Category Filtering
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-project-category');

            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-project-cat') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 9. Contact Form Handling & Toast Notification
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    function showToast(msg) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                contactForm.reset();
                showToast("Thank you! Your message has been sent to Sadeepa.");
            }, 1200);
        });
    }

    // 10. Content Protection & Certificate Security
    // 1. Disable Right-Click Context Menu Everywhere (Capture Phase)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showToast("Right-click is disabled to protect content & certificates.");
        return false;
    }, { capture: true });

    // 2. Disable Middle-Click / Auxiliary Context Actions (Capture Phase)
    document.addEventListener('auxclick', (e) => {
        if (e.button === 1 || e.button === 2) {
            e.preventDefault();
        }
    }, { capture: true });

    // 3. Disable Image Dragging
    document.addEventListener('dragstart', (e) => {
        if (e.target && (e.target.nodeName === 'IMG' || e.target.closest('img'))) {
            e.preventDefault();
            return false;
        }
    }, { capture: true });

    // 4. Intercept Any Direct Link to Raw Media Files (.jpg, .jpeg, .png, .webp, .svg)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            const href = link.getAttribute('href') || '';
            if (/\.(jpg|jpeg|png|webp|svg)($|\?)/i.test(href)) {
                e.preventDefault();
                showToast("Direct access to raw credentials is restricted.");
                return false;
            }
        }
    }, { capture: true });

    // 5. Block Print, Save, and Developer Inspection Shortcuts
    document.addEventListener('keydown', (e) => {
        // Intercept Ctrl+S / Cmd+S (Save)
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            showToast("Saving page content is disabled.");
        }
        // Intercept Ctrl+P / Cmd+P (Print)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            showToast("Printing page content is disabled.");
        }
        // Intercept Ctrl+Shift+I / Cmd+Option+I (Inspect), Ctrl+Shift+J, Ctrl+U (View Source), F12
        if (
            ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
            ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) ||
            e.key === 'F12'
        ) {
            e.preventDefault();
            showToast("Developer shortcuts are disabled to protect credentials.");
        }
    }, { capture: true });
});
