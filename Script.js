/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html"],
    theme: {
      extend: {},
    },
    plugins: [],
  }
// Modal functions (global)
function openModal() {
    document.getElementById('bookingModal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init("zEwstDRZqk1ReclZ4");

    // Form handler
    function handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };

        emailjs.send('service_9j6s3ve', 'template_gy0hhxo', data)
            .then(function(response) {
                alert('✅ Your message has been sent successfully!');
                form.reset();
                if (form.id === 'popupContactForm') closeModal();
            }, function(error) {
                alert('❌ Oops! There was a problem submitting your form.');
                console.error('EmailJS Error:', error);
            });
    }

    // Attach form handlers
    document.getElementById('contactForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(this);
    });

    document.getElementById('popupContactForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(this);
    });

    // Attach modal handlers
    document.querySelectorAll('[href="#contact"], .book-now-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });

    // Close modal button
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
});

// Smooth scrolling (keep this separate)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') { // Skip # links
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});