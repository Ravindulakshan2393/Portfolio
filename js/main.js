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
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => sectionObserver.observe(section));

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 5. Theme Toggle (Dark / Light)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const icon = themeToggleBtn.querySelector('i');

            if (body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
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

    // 8. CV Real Projects Data & Modal Handlers
    const projectDetails = {
        contrack: {
            title: "ConTrack: Container Transport Logistics Management System",
            type: "Full-Stack Logistics Web Application",
            description: "A comprehensive transport logistics management application engineered to streamline container transport, supplier interactions, and entity tracking.",
            features: [
                "Developed the supplier-side user interface using React with modern responsive styling.",
                "Engineered backend RESTful services using Node.js and Express.js.",
                "Designed and configured relational database tables and schemas in Supabase / PostgreSQL.",
                "Utilized Git and GitHub for collaborative team development and version control."
            ],
            techStack: ["React", "Node.js", "Express.js", "Supabase", "PostgreSQL", "Git & GitHub"],
            githubUrl: "https://github.com/Ravindulakshan2393"
        },
        abacus: {
            title: "Abacus Genius 1.0: Arduino-Based Educational Device",
            type: "Hardware Prototyping & Embedded Systems",
            description: "An interactive, standalone educational hardware device designed for mathematics and interactive learning.",
            features: [
                "Developed core interactive device logic on Arduino Mega microcontroller.",
                "Integrated keypad, LCD display, ambient sensors, audio speaker, and LED feedback components.",
                "Implemented custom user interaction flows with power-saving sleep/wake functionality.",
                "Integrated ESP8266 microchip for wireless network communication and data exchange."
            ],
            techStack: ["Arduino Mega", "ESP8266", "Embedded C / C++", "Keypad & LCD", "Sensors"],
            githubUrl: "https://github.com/Ravindulakshan2393"
        }
    };

    const projectModal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');

    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projKey = btn.getAttribute('data-project');
            const data = projectDetails[projKey];

            if (data && modalBody) {
                modalBody.innerHTML = `
                    <span class="project-type">${data.type}</span>
                    <h2 class="modal-project-title">${data.title}</h2>
                    <p class="modal-project-desc">${data.description}</p>
                    
                    <h4 style="margin: 1.2rem 0 0.6rem; font-size: 1rem;">CV Highlights & Achievements:</h4>
                    <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.9rem;">
                        ${data.features.map(f => `<li style="margin-bottom: 0.4rem;">${f}</li>`).join('')}
                    </ul>

                    <h4 style="margin: 1.5rem 0 0.6rem; font-size: 1rem;">Technologies Used:</h4>
                    <div class="project-tags" style="margin-bottom: 2rem;">
                        ${data.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>

                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View GitHub Repo
                        </a>
                        <button class="btn btn-secondary btn-sm" id="modal-close-inner">Close</button>
                    </div>
                `;

                projectModal.classList.add('active');

                // Bind inner close button
                const innerCloseBtn = document.getElementById('modal-close-inner');
                if (innerCloseBtn) {
                    innerCloseBtn.addEventListener('click', () => projectModal.classList.remove('active'));
                }
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
            }
        });
    }

    // 9. Contact Form Handling & Toast Notification
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    function showToast(msg) {
        if (!toast) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
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
});
