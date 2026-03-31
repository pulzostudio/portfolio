// Smooth scroll para los enlaces de navegación
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

// Animación de secciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        console.log('Datos del formulario:', formValues);
        // Mensaje de éxito
        alert('¡Gracias por tu mensaje! Te responderé pronto.');
        this.reset();
    });
}

// Efecto de scroll para el header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        // Scroll hacia abajo
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Actualizar la navegación basada en la sección visible
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetLeft;
        const sectionHeight = section.clientWidth;
        if (window.scrollX >= sectionTop && window.scrollX < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Asegurar que la sección de inicio sea la predeterminada
window.addEventListener('load', () => {
    const inicioSection = document.querySelector('#inicio');
    if (inicioSection) {
        inicioSection.scrollIntoView({
            behavior: 'instant',
            block: 'nearest',
            inline: 'start'
        });
    }
    updateActiveNav();
});

window.addEventListener('scroll', updateActiveNav);

// Efecto de escala progresiva y sticky para el logo Pulzo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM listo, buscando logo-link...');
    const logoLink = document.querySelector('.logo-link');
    const heroSection = document.getElementById('inicio');
    console.log('logoLink:', logoLink, 'heroSection:', heroSection);

    function updateLogoFixed() {
        if (!logoLink || !heroSection) return;
        const scrollY = window.scrollY || window.pageYOffset;
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;
        if (scrollY > heroTop + heroHeight * 0.5) {
            logoLink.classList.add('fixed-logo');
        } else {
            logoLink.classList.remove('fixed-logo');
        }
        console.log('ScrollY:', scrollY, 'heroTop:', heroTop, 'Tiene fixed-logo:', logoLink.classList.contains('fixed-logo'));
    }
    updateLogoFixed();
    window.addEventListener('scroll', updateLogoFixed);

    // Animación de palabra en el hero
    const palabras = {
        es: ['arte', 'comunicación', 'experiencias', 'diseño'],
        en: ['art', 'communication', 'experiences', 'design']
    };
    let palabraIndex = 0;
    let idiomaActual = 'es';
    setInterval(() => {
        const palabraAnimada = document.querySelector('.palabra-animada');
        if (palabraAnimada) {
            palabraIndex = (palabraIndex + 1) % palabras[idiomaActual].length;
            palabraAnimada.textContent = palabras[idiomaActual][palabraIndex];
        }
    }, 1000);

    // Sistema de cambio de idioma para los spans del hero
    function cambiarIdiomaHero(idioma) {
        idiomaActual = idioma;
        const before = document.getElementById('hero-text-before');
        const after = document.getElementById('hero-text-after');
        const palabraAnimada = document.querySelector('.palabra-animada');
        if (before && before.dataset[`lang${idioma.charAt(0).toUpperCase() + idioma.slice(1)}`]) {
            before.textContent = before.dataset[`lang${idioma.charAt(0).toUpperCase() + idioma.slice(1)}`];
        }
        if (after && after.dataset[`lang${idioma.charAt(0).toUpperCase() + idioma.slice(1)}`]) {
            after.textContent = after.dataset[`lang${idioma.charAt(0).toUpperCase() + idioma.slice(1)}`];
        }
        if (palabraAnimada) {
            palabraIndex = 0;
            palabraAnimada.textContent = palabras[idioma][palabraIndex];
        }
    }

    // Detectar botones de idioma y aplicar el cambio
    const languageBtns = document.querySelectorAll('.language-btn');
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            cambiarIdiomaHero(lang);
            // Aquí puedes agregar el resto de lógica de cambio de idioma global si la tienes
        });
    });
}); 

// =========================
// ✉️ NEWSLETTER (MailerLite)
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("customForm");

    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email")?.value;
        const name = document.getElementById("name")?.value;

        if (!email) return;

        const interval = setInterval(() => {
            const mlEmail = document.querySelector('.ml-embedded input[type="email"], .ml-embedded input[name*="email"]');
            const mlName = document.querySelector('.ml-embedded input[type="text"], .ml-embedded input[name*="name"]');
            const mlButton = document.querySelector('.ml-embedded button, .ml-embedded input[type="submit"]');

            if (mlEmail && mlButton) {
                mlEmail.value = email;

                if (mlName && name) {
                    mlName.value = name;
                }

                mlButton.click();
                clearInterval(interval);

                form.innerHTML = "<p style='text-align:center;'>Ya estás adentro 💌 Buscá en tu mail - quizá en spam:´(</p>";
            }
        }, 300);
    });
});
