// Simple Intersection Observer for "Scrollytelling" feel
document.addEventListener('DOMContentLoaded', () => {
    // Sticky Nav Logic
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Mobile Menu Toggle (Event Delegation for Robustness)
    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');

        // 1. Toggle Click
        if (toggleBtn && navLinks) {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            return;
        }

        // 2. Link Click (Close Menu)
        if (e.target.closest('.nav-links a')) {
            if (navLinks) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }

        // 3. Outside Click (Optional Polish)
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-toggle') && document.body.classList.contains('menu-open')) {
            if (navLinks) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});
