// Enhanced JavaScript for World-Class Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typedText = document.getElementById('typed-text');
    if (typedText) {
        const texts = [
            'Senior Software Engineer',
            'Technical Leader',
            'Full-Stack Developer',
            'Machine Learning Enthusiast',
            'Cloud Architect',
            'UX/UI Designer'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next word
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        typeWriter();
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-gray-800/95', 'backdrop-blur-md');
            navbar.classList.remove('bg-gray-800/90');
        } else {
            navbar.classList.remove('bg-gray-800/95', 'backdrop-blur-md');
            navbar.classList.add('bg-gray-800/90');
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Intersection Observer for Animations
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
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Skill Level Animations
    const skillLevels = document.querySelectorAll('.skill-level-fill');
    skillLevels.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0%';
        
        setTimeout(() => {
            skill.style.transition = 'width 1.5s ease-in-out';
            skill.style.width = width;
        }, 500);
    });
    
    // Form Handling
    const form = document.querySelector('form[name="contact"]');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Reset after form submission
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // Parallax Effect for Hero Section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Hover Effects for Project Cards
    const projectCards = document.querySelectorAll('.group');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Active Navigation Link Highlighting
    const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        navLinksArray.forEach(link => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionBottom = sectionTop + targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add('text-blue-400');
                    link.classList.remove('text-gray-300');
                } else {
                    link.classList.remove('text-blue-400');
                    link.classList.add('text-gray-300');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize tooltips for tech stack items
    const techStackItems = document.querySelectorAll('[title]');
    techStackItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg';
            tooltip.textContent = this.getAttribute('title');
            tooltip.style.top = '-30px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        item.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('div');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(updateActiveNavLink, 10);
    window.addEventListener('scroll', debouncedScrollHandler);
    
    console.log('Portfolio enhanced with interactive features! 🚀');
    
    // Blog-specific functionality
    // Mobile menu toggle for blog page
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Mobile dropdown functionality
    const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    mobileDropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const dropdownContent = this.nextElementSibling;
            const isActive = this.parentElement.classList.contains('active');
            
            // Close all other dropdowns
            mobileDropdownBtns.forEach(otherBtn => {
                otherBtn.parentElement.classList.remove('active');
                otherBtn.nextElementSibling.classList.add('hidden');
            });
            
            // Toggle current dropdown
            if (!isActive) {
                this.parentElement.classList.add('active');
                dropdownContent.classList.remove('hidden');
            }
        });
    });
    
    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Article card hover effects
    const articleCards = document.querySelectorAll('article');
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Category card hover effects
    const categoryCards = document.querySelectorAll('.grid.grid-cols-2.md\\:grid-cols-4 a');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('form[action*="mailchimp"]');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            const nameInput = this.querySelector('input[name="FNAME"]');
            
            if (!emailInput.value || !nameInput.value) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }
        });
    }
    
    // Smooth scrolling for all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    console.log('Blog page enhanced with interactive features! 📝');
});
