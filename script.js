/* ============================================
   COCA-COLA PREMIUM EXPERIENCE
   Production JavaScript
   ============================================ */

(function () {
    'use strict';

    // --- Utilities ---
    const throttle = (func, limit) => {
        let inThrottle;
        return function (...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    };

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // --- App State ---
    const state = {
        currentSlide: 0,
        totalSlides: 0,
        autoPlayInterval: null
    };

    // --- DOM Cache ---
    const DOM = {
        loader: document.getElementById('loader'),
        navbar: document.getElementById('navbar'),
        hamburger: document.getElementById('hamburger'),
        navLinks: document.getElementById('navLinks'),
        testimonialTrack: document.getElementById('testimonialTrack'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        sliderDotsContainer: document.getElementById('sliderDots'),
        contactForm: document.getElementById('contactForm'),
        experienceScroll: document.querySelector('.experience-scroll'),
        testimonialCards: document.querySelectorAll('.testimonial-card')
    };

    // --- Loader ---
    const initLoader = () => {
        if (!DOM.loader) return;
        const hideLoader = () => DOM.loader.classList.add('hidden');
        window.addEventListener('load', () => setTimeout(hideLoader, 1200));
        setTimeout(hideLoader, 3000); // Fallback
    };

    // --- Navigation ---
    const initNavigation = () => {
        if (!DOM.navbar) return;

        const handleScroll = throttle(() => {
            DOM.navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });

        if (DOM.hamburger && DOM.navLinks) {
            DOM.hamburger.addEventListener('click', toggleMobileMenu);
            DOM.navLinks.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) closeMobileMenu();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.hamburger && DOM.hamburger.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    };

    const toggleMobileMenu = () => {
        if (!DOM.hamburger || !DOM.navLinks) return;
        const isActive = DOM.hamburger.classList.toggle('active');
        DOM.navLinks.classList.toggle('active');
        DOM.hamburger.setAttribute('aria-expanded', isActive);
    };

    const closeMobileMenu = () => {
        if (!DOM.hamburger || !DOM.navLinks) return;
        DOM.hamburger.classList.remove('active');
        DOM.navLinks.classList.remove('active');
        DOM.hamburger.setAttribute('aria-expanded', 'false');
    };

    // --- Smooth Scroll ---
    const initSmoothScroll = () => {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMobileMenu(); // Close mobile menu on anchor click
            }
        });
    };

    // --- Scroll Reveal (Intersection Observer) ---

    // --- Scroll Reveal (Intersection Observer - Hide/Show) ---
    const initScrollReveal = () => {
        // Fixed Selectors: Space hata ke dot (.) lagaya hai aur typos fix ki hain.
        // Hero elements intentionally hataye hain taaki CSS keyframes break na ho.
        const animatedElements = document.querySelectorAll(  
            ".section-tag, .section-title, .section-description, .products-grid, .product-card, .product-desc, .product-name, .product-icon, " +
            ".story-image-wrapper.reveal, .stat-item.glass, .story-title, .story-text, .feature-item, .feature-text, " +
            ".exp-number, .exp-title, .exp-desc, "+
            ".drink-grid, .drink-visual, .drink-name, "+
            ".timeline-content.glass, .timeline-year, .timeline-title, .timeline-desc, .timeline-item.reveal, "+
            ".testimonial-inner.glass, .testimonial-quote, .author-avatar, .author-info, .stats-grid, .stat-text, .stat-value, " +
            ".faq-item.glass.reveal, .faq-question, .contact-info.reveal, .method-icon, .method-text, .form-group, .form-submit, "+
            ".footer-brand, .social-link, .footer-column, .footer-links, .footer-copyright, .footer-legal"
        );  

        if (!animatedElements.length) return;
    
        const scrollObserver = new IntersectionObserver((entries) => {  
            entries.forEach(entry => {  
                const isVisible = entry.isIntersecting;  
                entry.target.classList.toggle("show", isVisible);  
                entry.target.classList.toggle("hide", !isVisible);  
            });  
        }, {   
            threshold: 0.2,  
            rootMargin: "0px 0px -50px 0px"   
        });  
  
        animatedElements.forEach(el => {  
            el.classList.add("hide"); // Shuru mein sabko hide kar do
            scrollObserver.observe(el);  
        });  
    };



    // const initScrollReveal = () => {
    //     const revealElements = document.querySelectorAll('.reveal');
    //     if (!revealElements.length) return;

    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.isIntersecting) {
    //                     entry.target.classList.add('visible');
    //                     observer.unobserve(entry.target);
    //                 }
    //             });
    //         },
    //         { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    //     );

    //     revealElements.forEach((el) => observer.observe(el));
    // };

    // --- Counter Animation ---
    const initCounters = () => {
        const statNumbers = document.querySelectorAll('[data-count]');
        if (!statNumbers.length) return;

        const animateValue = (element, end) => {
            const duration = 2000;
            let startTime = null;

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const value = Math.floor(progress * end);
                element.textContent = value.toLocaleString() + (progress === 1 ? '+' : '');
                if (progress < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-count'), 10);
                        if (!isNaN(target)) animateValue(entry.target, target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statNumbers.forEach((stat) => observer.observe(stat));
    };

    // --- Testimonial Slider ---
    const initTestimonials = () => {
        if (!DOM.testimonialTrack || !DOM.testimonialCards.length) return;

        state.totalSlides = DOM.testimonialCards.length;
        
        // Generate Dots Dynamically
        if (DOM.sliderDotsContainer) {
            DOM.sliderDotsContainer.innerHTML = '';
            for (let i = 0; i < state.totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.setAttribute('data-index', i);
                dot.setAttribute('role', 'tab');
                dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
                if (i === 0) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-selected', 'true');
                } else {
                    dot.setAttribute('aria-selected', 'false');
                }
                DOM.sliderDotsContainer.appendChild(dot);
            }
        }

        const updateSlider = () => {
            DOM.testimonialTrack.style.transform = `translateX(-${state.currentSlide * 100}%)`;
            if (DOM.sliderDotsContainer) {
                DOM.sliderDotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
                    const isActive = index === state.currentSlide;
                    dot.classList.toggle('active', isActive);
                    dot.setAttribute('aria-selected', isActive);
                });
            }
        };

        const nextSlide = () => {
            state.currentSlide = (state.currentSlide + 1) % state.totalSlides;
            updateSlider();
        };

        const prevSlide = () => {
            state.currentSlide = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
            updateSlider();
        };

        const resetAutoPlay = () => {
            clearInterval(state.autoPlayInterval);
            state.autoPlayInterval = setInterval(nextSlide, 6000);
        };

        if (DOM.nextBtn) {
            DOM.nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
        }
        if (DOM.prevBtn) {
            DOM.prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
        }

        if (DOM.sliderDotsContainer) {
            DOM.sliderDotsContainer.addEventListener('click', (e) => {
                const dot = e.target.closest('.dot');
                if (!dot) return;
                state.currentSlide = parseInt(dot.getAttribute('data-index'), 10);
                updateSlider();
                resetAutoPlay();
            });
        }

        state.autoPlayInterval = setInterval(nextSlide, 6000);
    };

    // --- FAQ Accordion ---
    const initFaq = () => {
        const faqContainer = document.querySelector('.faq-container');
        if (!faqContainer) return;

        faqContainer.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (!question) return;

            const item = question.closest('.faq-item');
            const isActive = item.classList.contains('active');

            faqContainer.querySelectorAll('.faq-item.active').forEach((activeItem) => {
                activeItem.classList.remove('active');
                activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    };

    // --- Horizontal Drag Scroll ---
    const initDragScroll = () => {
        const slider = DOM.experienceScroll;
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        const stopDrag = () => {
            isDown = false;
            slider.style.cursor = 'grab';
        };

        slider.addEventListener('mouseleave', stopDrag);
        slider.addEventListener('mouseup', stopDrag);

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    };

    // --- Contact Form Validation ---
    const initContactForm = () => {
        if (!DOM.contactForm) return;

        DOM.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const inputs = DOM.contactForm.querySelectorAll('.form-input[required]');
            
            inputs.forEach((input) => {
                const group = input.closest('.form-group');
                const value = input.value.trim();
                const isInvalid = input.type === 'email' ? !isEmailValid(value) : !value;
                group.classList.toggle('error', isInvalid);
                if (isInvalid) isValid = false;
            });
            
            if (isValid) {
                const submitBtn = DOM.contactForm.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#22c55e';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    DOM.contactForm.reset();
                }, 3000);
            }
        });

        DOM.contactForm.addEventListener('input', (e) => {
            if (e.target.classList.contains('form-input')) {
                e.target.closest('.form-group').classList.remove('error');
            }
        });
    };

    // --- Centralized Initializer ---
    const initApp = () => {
        initLoader();
        initNavigation();
        initSmoothScroll();
        initScrollReveal();
        initCounters();
        initTestimonials();
        initFaq();
        initDragScroll();
        initContactForm();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();