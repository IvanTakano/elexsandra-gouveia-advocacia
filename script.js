document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    form.reset();
                } else {
                    const jsonData = await response.json();
                    if (jsonData.errors) {
                        alert('Erro ao enviar mensagem: ' + jsonData.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
                    }
                }
            } catch (error) {
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
                console.error('Erro:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});
