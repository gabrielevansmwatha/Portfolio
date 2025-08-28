// Elegant Beauty Salon - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/95', 'shadow-lg');
            navbar.classList.remove('bg-white/95');
        } else {
            navbar.classList.remove('bg-white/95', 'shadow-lg');
        }
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Testimonial Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.remove('hidden');
                slide.classList.add('active');
            } else {
                slide.classList.add('hidden');
                slide.classList.remove('active');
            }
        });
        
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('bg-pink-500');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('bg-pink-500');
                dot.classList.add('bg-gray-300');
            }
        });
    }
    
    // Auto-advance testimonials
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Manual dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            let isValid = true;
            const errors = [];
            
            if (!name || name.trim().length < 2) {
                errors.push('Name must be at least 2 characters long');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                errors.push('Please enter a valid email address');
                isValid = false;
            }
            
            if (!message || message.trim().length < 10) {
                errors.push('Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                // Show error message
                showNotification(errors.join('\n'), 'error');
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
        
        // Set notification content based on type
        if (type === 'success') {
            notification.className += ' bg-green-500 text-white';
            notification.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4 class="font-semibold">Success!</h4>
                        <p class="text-sm">${message}</p>
                    </div>
                </div>
            `;
        } else if (type === 'error') {
            notification.className += ' bg-red-500 text-white';
            notification.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <h4 class="font-semibold">Error</h4>
                        <p class="text-sm">${message}</p>
                    </div>
                </div>
            `;
        } else {
            notification.className += ' bg-blue-500 text-white';
            notification.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <h4 class="font-semibold">Info</h4>
                        <p class="text-sm">${message}</p>
                    </div>
                </div>
            `;
        }
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.className = 'absolute top-2 right-2 text-white hover:text-gray-200 transition-colors';
        closeBtn.addEventListener('click', () => removeNotification(notification));
        notification.appendChild(closeBtn);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
    }

    function removeNotification(notification) {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Add fade-in-on-scroll class to elements
    const sectionsToAnimate = document.querySelectorAll('section');
    sectionsToAnimate.forEach(section => {
        const elements = section.querySelectorAll('h2, h3, p, .service-card, .pricing-card');
        elements.forEach((el, index) => {
            el.classList.add('fade-in-on-scroll');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Gallery Lightbox Effect (Simple Implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
            lightbox.innerHTML = `
                <div class="relative max-w-4xl max-h-full">
                    <div class="bg-white rounded-lg p-8 text-center">
                        <h3 class="text-2xl font-playfair font-semibold mb-4">${this.querySelector('h3').textContent}</h3>
                        <p class="text-gray-600 mb-6">${this.querySelector('p').textContent}</p>
                        <div class="h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-image text-4xl text-pink-500"></i>
                        </div>
                    </div>
                    <button class="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.closest('button')) {
                    document.body.removeChild(lightbox);
                }
            });
            
            document.body.appendChild(lightbox);
        });
    });

    // Service Cards Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Pricing Cards Hover Effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Loading Animation for Form Submission
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity()) {
                const originalText = this.innerHTML;
                this.innerHTML = '<div class="loading"></div> Sending...';
                this.disabled = true;
                
                // Simulate form submission delay
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40 opacity-0 pointer-events-none';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    // Initialize tooltips for service cards
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-900 text-white px-2 py-1 rounded text-sm z-50';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.top = '-40px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('div');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    console.log('Elegant Beauty Salon website loaded successfully!');
});