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