document.addEventListener('DOMContentLoaded', () => {
    // ========== 1. VARIABLES GLOBALES E IDIOMA ==========
    const palabrasHero = {
        es: ['arte', 'comunicación', 'experiencias', 'diseño'],
        en: ['art', 'communication', 'experiences', 'design']
    };
    let palabraIndex = 0;
    let idiomaActual = localStorage.getItem('preferredLanguage') || 'es';

    const wordElement = document.querySelector('.palabra-animada');

    // Función para cambiar idioma del Hero (Spans dinámicos)
    function cambiarIdiomaHero(lang) {
        idiomaActual = lang;
        const before = document.getElementById('hero-text-before');
        const after = document.getElementById('hero-text-after');
        
        if (before) before.textContent = before.dataset[`lang${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
        if (after) after.textContent = after.dataset[`lang${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
        
        if (wordElement) {
            palabraIndex = 0;
            wordElement.textContent = palabrasHero[lang][palabraIndex];
        }
    }

    // Intervalo de la palabra animada
    setInterval(() => {
        if (wordElement) {
            wordElement.style.opacity = 0;
            setTimeout(() => {
                palabraIndex = (palabraIndex + 1) % palabrasHero[idiomaActual].length;
                wordElement.textContent = palabrasHero[idiomaActual][palabraIndex];
                wordElement.style.opacity = 1;
            }, 500);
        }
    }, 2500);

    // ========== 2. COLORES Y TEMAS ==========
    const colorButtons = document.querySelectorAll('.color-btn');
    const colorToggle = document.querySelector('.color-toggle');
    const colorOptions = document.querySelector('.color-options');
    const main = document.querySelector('main');
    const footer = document.querySelector('.footer');

    if (colorToggle) {
        colorToggle.addEventListener('click', () => {
            colorOptions.style.display = colorOptions.style.display === 'none' ? 'flex' : 'none';
        });
    }

    function changeColors(backgroundColor, textColor, spanColor) {
        if (main) main.style.backgroundColor = backgroundColor;
        if (footer) footer.style.backgroundColor = backgroundColor;

        const caseStudyColor = backgroundColor === '#f2f2f2' ? '#ffffff' : 
                               backgroundColor === '#1e1b1d' ? '#2a2628' : '#05057c';
        
        document.querySelectorAll('.case-study').forEach(cs => cs.style.backgroundColor = caseStudyColor);
        document.querySelectorAll('.case-number, .hero h1, .hero p, .case-content h3, .footer-link, .social-link, .slide-title, .location').forEach(el => el.style.color = textColor);
        
        document.querySelectorAll('.case-tags span').forEach(span => {
            span.style.color = spanColor;
            span.style.backgroundColor = (backgroundColor === '#1e1b1d') ? '#181617' : 
                                         (backgroundColor === '#0e0eaf') ? '#0e0eaf' : '#e0e0e0';
        });
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('color-light')) changeColors('#f2f2f2', '#f40202', '#1e1b1d');
            else if (button.classList.contains('color-dark')) changeColors('#1e1b1d', '#f40202', '#f2f2f2');
            else if (button.classList.contains('color-blue')) changeColors('#0e0eaf', '#f2f2f2', '#f2f2f2');
            colorOptions.style.display = 'none';
        });
    });

    // ========== 3. NAVEGACIÓN, SCROLL Y HEADER ==========
    const header = document.querySelector('header');
    let lastScroll = 0;

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Header dinámico (aparece/desaparece)
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (header) {
            header.style.transform = (currentScroll > lastScroll && currentScroll > 100) 
                ? 'translateY(-100%)' 
                : 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Logo Sticky (fijar logo al pasar el hero)
    const logoLink = document.querySelector('.logo-link');
    const heroSection = document.getElementById('inicio');

    function updateLogoFixed() {
        if (!logoLink || !heroSection) return;
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        if (scrollY > heroHeight * 0.5) logoLink.classList.add('fixed-logo');
        else logoLink.classList.remove('fixed-logo');
    }
    window.addEventListener('scroll', updateLogoFixed);

    // Animación de secciones (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // ========== 4. MODAL Y DATOS DE PROYECTOS ==========
    const floatingModal = document.getElementById('floatingModal');
    const modalVideo = document.querySelector('.modal-video');
    
    const slideData = {
        'TESORO': { title: 'TESORO - Branding', image: 'Images/GRAFICO/tesoro-branding.gif', images: ['Images/GRAFICO/tesoro/behance tesoro-01.png','Images/GRAFICO/tesoro/behance tesoro-02.png','Images/GRAFICO/tesoro/behance tesoro-03.png','Images/GRAFICO/tesoro/behance tesoro-04.png','Images/GRAFICO/tesoro/behance tesoro-05.png','Images/GRAFICO/tesoro/behance tesoro-06.png','Images/GRAFICO/tesoro/behance tesoro-07.png','Images/GRAFICO/tesoro/behance tesoro-08.png','Images/GRAFICO/tesoro/behance tesoro-09.png'] },
        'BLUE AURA': { title: 'BLUE AURA - Identidad', image: 'Images/GRAFICO/BLUE AURA/BLUE AURA PORTADA.jpg', images: ['Images/GRAFICO/BLUE AURA/BLUE AURA 1.jpg', 'Images/GRAFICO/BLUE AURA/BLUE AURA 2.jpg'] },
        'MARIPOSA': { title: 'MARIPOSA - Flyer', image: 'Images/GRAFICO/Mariposa/MARIPOSA.jpg', images: ['Images/GRAFICO/Mariposa/MARIPOSA 2.jpg'] },
        'KAISA': { title: 'KAISA - BRAND Y FLYERS', image: 'Images/GRAFICO/KAISA/kaisa banner.jpg', images: ['Images/GRAFICO/KAISA/kaisa1.jpg','Images/GRAFICO/KAISA/kaisa2.jpg','Images/GRAFICO/KAISA/kaisa3.gif','Images/GRAFICO/KAISA/kaisa4.jpg','Images/GRAFICO/KAISA/kaisa5.jpg','Images/GRAFICO/KAISA/kaisa6.jpg','Images/GRAFICO/KAISA/kaisa7.jpg','Images/GRAFICO/KAISA/kaisa8.jpg','Images/GRAFICO/KAISA/kaisa9.jpg','Images/GRAFICO/KAISA/kaisa10.jpg','Images/GRAFICO/KAISA/kaisa11.jpg','Images/GRAFICO/KAISA/kaisa12.gif','Images/GRAFICO/KAISA/kaisa13.jpg'] },
        'RIZHADA': { title: 'RIZHADA - BRANDING', image: 'Images/GRAFICO/RIZHADA/rizhada 1 banner.jpg', images: ['Images/GRAFICO/RIZHADA/rizhada 1.jpg','Images/GRAFICO/RIZHADA/rizhada 2.jpg','Images/GRAFICO/RIZHADA/rizhada 3.jpg','Images/GRAFICO/RIZHADA/rizhada 4.jpg','Images/GRAFICO/RIZHADA/rizhada 5.jpg','Images/GRAFICO/RIZHADA/rizhada 6.jpg','Images/GRAFICO/RIZHADA/rizhada 7.jpg'] },
        'AGENDA / CALENDARIO': { title: 'Agenda / Calendario', image: 'Images/GRAFICO/CALENDARIO/BANNER.jpg', images: ['Images/GRAFICO/CALENDARIO/behance tesoro agenda-01.jpg','Images/GRAFICO/CALENDARIO/behance tesoro agenda-02.jpg','Images/GRAFICO/CALENDARIO/behance tesoro agenda-03.jpg','Images/GRAFICO/CALENDARIO/behance tesoro agenda-04.jpg'] },
        'REFLEX': { title: 'REFLEX - Flyers', image: 'Images/GRAFICO/REFLEX/REFLEX mockup.jpg', images: ['Images/GRAFICO/REFLEX/REFLEX 2025-TESIS.png','Images/GRAFICO/REFLEX/mock up reflex.png'] },
        'NIVEA': { title: 'NIVEA - Motion Graphics', video: 'Videos/NIVEA/Nivea.mp4' },
        'DISHYPE': { title: 'DISHYPE - Motion Graphics', video: 'Videos/SENDA/senda.mp4' },
        'BUENOS_AIRES': { title: 'BUENOS AIRES - Motion Graphics', video: 'Videos/BUENOSAIRES/BUENOS-AIRES.mp4' },
        'JAM': { title: 'JAM - Motion Graphics', video: 'Videos/JAM/JAM.mp4' },
        'UTOPIA': { title: 'UTOPÍA - Motion Graphics', video: 'Videos/UTOPIA/UTOPIA.mp4' },
        'BALL': { title: 'BALL - Motion Graphics', video: 'Videos/PELOTITA/pelotita.mp4' }
    };

    function openModal(projectName) {
        const data = slideData[projectName];
        if (!data || !floatingModal) return;
        document.querySelector('.modal-title').textContent = data.title;
        const modalImg = document.querySelector('.modal-image');
        const container = document.querySelector('.modal-images-container');
        container.innerHTML = '';

        if (data.image) {
            modalImg.src = data.image;
            modalImg.style.display = 'block';
        } else modalImg.style.display = 'none';

        if (data.images) {
            data.images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                container.appendChild(img);
            });
            container.style.display = 'flex';
        }

        if (data.video) {
            modalVideo.querySelector('source').src = data.video;
            modalVideo.load();
            modalVideo.style.display = 'block';
        } else modalVideo.style.display = 'none';

        floatingModal.style.display = 'flex';
        setTimeout(() => floatingModal.classList.add('active'), 10);
    }

    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            floatingModal.classList.remove('active');
            setTimeout(() => {
                floatingModal.style.display = 'none';
                modalVideo.pause();
            }, 300);
        });
    }

    // ========== 5. FORMULARIO Y OTROS ==========
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Te responderé pronto.');
            this.reset();
        });
    }

    // Inicializar idioma y tema
    cambiarIdiomaHero(idiomaActual);
    changeColors('#f2f2f2', '#f40202', '#1e1b1d');

    // Manejo de botones de idioma globales
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            localStorage.setItem('preferredLanguage', lang);
            cambiarIdiomaHero(lang);
            // Actualizar textos con data-lang-es/en
            document.querySelectorAll('[data-lang-es]').forEach(el => {
                el.textContent = el.getAttribute(`data-lang-${lang}`);
            });
        });
    });
    
    // Abrir modal desde carrusel
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.addEventListener('click', () => {
            const name = slide.getAttribute('data-project') || slide.querySelector('.slide-title').textContent;
            openModal(name);
        });
    });
});
