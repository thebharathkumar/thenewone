// ===================================
// Portfolio Website JavaScript
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // ===================================
    // Smooth Scrolling for Navigation
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Active Navigation Highlighting
    // ===================================
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navHeight = document.querySelector('.navbar').offsetHeight;

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===================================
    // Resume Modal
    // ===================================
    const modal = document.getElementById('resumeModal');
    const resumeBtn = document.getElementById('resumeBtn');
    const closeBtn = document.querySelector('.close');

    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Create mailto link
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:bharath.kr702@gmail.com?subject=${subject}&body=${body}`;

            // Open default email client
            window.location.href = mailtoLink;

            // Show confirmation message
            alert('Thank you for your message! Your default email client will open. If it doesn\'t, please email me directly at bharath.kr702@gmail.com');

            // Reset form
            contactForm.reset();
        });
    }

    // ===================================
    // Scroll Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .education-card, .cert-card, .skill-category');

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ===================================
    // Dynamic Copyright Year
    // ===================================
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        const currentYear = new Date().getFullYear();
        footerBottom.innerHTML = `&copy; ${currentYear} Bharath Kumar Rajesh. All rights reserved.`;
    }

    // ===================================
    // Navbar Background on Scroll
    // ===================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.12)';
        }
    });

    // ===================================
    // Stats Counter Animation
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = stat.textContent;

                    // Only animate if it's a number
                    if (!isNaN(parseFloat(target))) {
                        animateCounter(stat, target);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounter(element, target) {
        const isFloat = target.includes('.');
        const numericTarget = parseFloat(target);
        const duration = 2000;
        const step = numericTarget / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                if (isFloat) {
                    element.textContent = current.toFixed(2);
                } else {
                    element.textContent = Math.floor(current);
                }
            }
        }, 16);
    }

    // ===================================
    // Project Cards - Click to Expand
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't expand if clicking on a link
            if (e.target.tagName === 'A') {
                return;
            }

            // Toggle expanded class
            this.classList.toggle('expanded');
        });
    });

    // ===================================
    // Typing Effect for Hero Tagline (Optional)
    // ===================================
    const heroTagline = document.querySelector('.hero-tagline');

    if (heroTagline) {
        const text = heroTagline.textContent;
        heroTagline.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // ===================================
    // Easter Egg: Console Message
    // ===================================
    console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #2E5BFF;');
    console.log('%cInterested in working together? Let\'s connect!', 'font-size: 14px; color: #4a4a4a;');
    console.log('%cEmail: bharath.kr702@gmail.com', 'font-size: 14px; color: #4a4a4a;');
    console.log('%cLinkedIn: linkedin.com/in/thebharathkumar', 'font-size: 14px; color: #4a4a4a;');

    // ===================================
    // Performance Optimization
    // ===================================
    // Lazy load images if needed
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===================================
    // Back to Top Button (Optional Enhancement)
    // ===================================
    function createBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #2E5BFF;
            color: white;
            border: 3px solid #2a2a2a;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 999;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(backToTop);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        backToTop.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });

        backToTop.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }

    createBackToTopButton();

    // ===================================
    // Initialize all features
    // ===================================
    console.log('Portfolio website initialized successfully!');
});

// ===================================
// Service Worker Registration (Optional for PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(function(registration) {
        //     console.log('ServiceWorker registration successful');
        // }, function(err) {
        //     console.log('ServiceWorker registration failed: ', err);
        // });
    });
}
