// Add this to your existing JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // If you want to handle the form submission with JavaScript
            // Uncomment the line below and add your custom handling
            // e.preventDefault();
            
            // Show a loading message
            formStatus.innerHTML = '<p class="text-blue-400">Sending message...</p>';
            formStatus.classList.remove('hidden');
            
            // The form will be handled by Netlify automatically
            // This is just for user feedback
            setTimeout(() => {
                formStatus.innerHTML = '<p class="text-green-400">Message sent successfully! I\'ll get back to you soon.</p>';
            }, 2000);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const body = document.body;

    const themeIcon = (theme) => theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
        if(themeToggleBtn) themeToggleBtn.innerHTML = themeIcon(theme);
        if(themeToggleMobileBtn) themeToggleMobileBtn.innerHTML = themeIcon(theme);
        localStorage.setItem('theme', theme);
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark');
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
        .from('h1', { opacity: 0, y: 30, duration: 0.8 })
        .from('#typed-text', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
        .from('p.text-gray-300', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
        .from('.flex-wrap.gap-4 a', { opacity: 0, y: 30, duration: 0.8, stagger: 0.2 }, '-=0.6');

    // Scroll-triggered animations for other sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
});