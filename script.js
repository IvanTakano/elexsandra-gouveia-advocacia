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

    // Phone Mask
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

            if (value.length > 11) {
                value = value.slice(0, 11); // Limita a 11 dígitos
            }

            // Aplica a máscara (99) 99999-9999
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }

            e.target.value = value;
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Email validation function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const form = e.target;
            const emailInput = form.querySelector('input[name="email"]');

            // Validate email
            if (!isValidEmail(emailInput.value)) {
                alert('Por favor, insira um e-mail válido.');
                emailInput.focus();
                return;
            }

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
                    alert('✅ Mensagem enviada com sucesso!\n\nObrigada pelo contato. Em breve entraremos em contato com você.');
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
