// School Management System JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initFormValidation();
    initDashboardTabs();
    initSmoothScrolling();
    initAnnouncementCarousel();
    initGalleryEffects();
    initToastNotifications();
    initTimetableFunctionality();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white/95', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-white/95', 'shadow-lg');
        }
    });
    
    // Active navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Form validation
function initFormValidation() {
    // Admission form validation
    const admissionForm = document.getElementById('admission-form');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateAdmissionForm()) {
                showToast('Application submitted successfully!', 'success');
                admissionForm.reset();
            }
        });
    }
    
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                showToast('Message sent successfully!', 'success');
                contactForm.reset();
            }
        });
    }
}

function validateAdmissionForm() {
    const form = document.getElementById('admission-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (!input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
                showFieldError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Age validation
        if (input.name === 'student-age' && input.value) {
            const age = parseInt(input.value);
            if (age < 3 || age > 18) {
                showFieldError(input, 'Age must be between 3 and 18');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function validateContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            if (!input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    input.classList.add('form-error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
    input.classList.remove('form-error');
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Dashboard tabs functionality
function initDashboardTabs() {
    const tabButtons = document.querySelectorAll('.role-tab');
    const dashboardContents = document.querySelectorAll('.dashboard-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.id.replace('-tab', '-dashboard');
            
            // Update button styles
            tabButtons.forEach(btn => {
                btn.className = 'role-tab bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-300';
            });
            this.className = 'role-tab bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300';
            
            // Show/hide dashboard content
            dashboardContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('animate-fade-in');
            }
        });
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Announcement carousel
function initAnnouncementCarousel() {
    const announcements = document.querySelectorAll('#announcements .bg-white');
    let currentIndex = 0;
    
    if (announcements.length > 0) {
        setInterval(() => {
            announcements[currentIndex].classList.remove('animate-fade-in');
            currentIndex = (currentIndex + 1) % announcements.length;
            announcements[currentIndex].classList.add('animate-fade-in');
        }, 5000);
    }
}

// Gallery effects
function initGalleryEffects() {
    const galleryItems = document.querySelectorAll('#gallery .group');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Toast notifications
function initToastNotifications() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000;';
        document.body.appendChild(toastContainer);
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Timetable functionality
function initTimetableFunctionality() {
    const gradeButtons = document.querySelectorAll('.grade-btn');
    
    gradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            gradeButtons.forEach(btn => {
                btn.className = 'grade-btn bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-300';
            });
            this.className = 'grade-btn bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300';
            
            // Here you would typically load different timetable data
            // For now, we'll just show a toast
            const grade = this.textContent;
            showToast(`Loading timetable for ${grade}`, 'info');
        });
    });
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Data management functions (for demo purposes)
const schoolData = {
    students: [
        { id: 1, name: 'Sarah Johnson', grade: 'Grade 10', status: 'Active' },
        { id: 2, name: 'Michael Chen', grade: 'Grade 8', status: 'Active' },
        { id: 3, name: 'Emily Davis', grade: 'Grade 12', status: 'Pending' }
    ],
    teachers: [
        { id: 1, name: 'Mr. Johnson', subject: 'Mathematics', classes: 3 },
        { id: 2, name: 'Ms. Davis', subject: 'Science', classes: 2 },
        { id: 3, name: 'Mrs. Wilson', subject: 'English', classes: 4 }
    ],
    classes: [
        { id: 1, name: 'Mathematics - Grade 10', teacher: 'Mr. Johnson', students: 25 },
        { id: 2, name: 'Science - Grade 9', teacher: 'Ms. Davis', students: 22 },
        { id: 3, name: 'English - Grade 11', teacher: 'Mrs. Wilson', students: 28 }
    ]
};

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', query);
        }, 300));
    }
}

// Export functions for use in other scripts
window.SchoolManagementSystem = {
    showToast,
    validateAdmissionForm,
    validateContactForm,
    schoolData,
    debounce,
    throttle
};

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSearch();
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity()) {
                this.disabled = true;
                this.innerHTML = '<span class="loading-spinner"></span> Processing...';
                
                // Re-enable after 2 seconds (simulate processing)
                setTimeout(() => {
                    this.disabled = false;
                    this.innerHTML = this.getAttribute('data-original-text') || 'Submit';
                }, 2000);
            }
        });
    });
    
    // Store original button text
    buttons.forEach(button => {
        button.setAttribute('data-original-text', button.textContent);
    });
});