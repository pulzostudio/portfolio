document.addEventListener('DOMContentLoaded', () => {
        // ========== COLORES
        const colorButtons = document.querySelectorAll('.color-btn');
        const colorToggle = document.querySelector('.color-toggle');
        const colorOptions = document.querySelector('.color-options');
        const main = document.querySelector('main');
        const footer = document.querySelector('.footer');

        // Mostrar/ocultar menú de colores
        colorToggle.addEventListener('click', () => {
            colorOptions.style.display = colorOptions.style.display === 'none' ? 'flex' : 'none';
        });

        // Cerrar menú de colores al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.color-toggle') && !e.target.closest('.color-options')) {
                colorOptions.style.display = 'none';
            }
        });

        // Función para cambiar los colores
        function changeColors(backgroundColor, textColor, spanColor) {
            // Cambiar colores de fondo
            main.style.backgroundColor = backgroundColor;
            footer.style.backgroundColor = backgroundColor;
            
            // Calcular colores más oscuros para case-study y carousel
            const caseStudyColor = backgroundColor === '#f2f2f2' ? '#ffffff' : 
                                 backgroundColor === '#1e1b1d' ? '#2a2628' : 
                                 '#05057c';
            
            const caseStudyHoverColor = backgroundColor === '#f2f2f2' ? '#f0f0f0' : 
                                      backgroundColor === '#1e1b1d' ? '#353132' : 
                                      '#06068c';
            
            // Cambiar color de los case-study
            document.querySelectorAll('.case-study').forEach(caseStudy => {
                caseStudy.style.backgroundColor = caseStudyColor;
            });

            // Cambiar color de los carousels
            document.querySelectorAll('.carousel').forEach(carousel => {
                carousel.style.backgroundColor = `rgba(${caseStudyColor.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.95)`;
            });

            // Cambiar color de elementos específicos
            document.querySelectorAll('.case-number, .hero h1, .hero p, .case-content h3, .footer-link, .social-link, .slide-title, .location').forEach(element => {
                element.style.color = textColor;
            });

            // Cambiar color de los spans y su fondo
            document.querySelectorAll('.case-tags span').forEach(span => {
                span.style.color = spanColor;
                if (backgroundColor === '#1e1b1d') {
                    span.style.backgroundColor = '#181617';
                } else if (backgroundColor === '#0e0eaf') {
                    span.style.backgroundColor = '#0e0eaf';
                } else {
                    span.style.backgroundColor = '#e0e0e0';
                }
            });

            // Agregar estilos para hover
            const style = document.createElement('style');
            style.textContent = `
                .case-study:hover {
                    background-color: ${caseStudyHoverColor} !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Agregar event listeners a los botones de color
        colorButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('color-light')) {
                    changeColors('#f2f2f2', '#f40202', '#1e1b1d');
                } else if (button.classList.contains('color-dark')) {
                    changeColors('#1e1b1d', '#f40202', '#f2f2f2');
                } else if (button.classList.contains('color-blue')) {
                    changeColors('#0e0eaf', '#f2f2f2', '#f2f2f2');
                }
                colorOptions.style.display = 'none';
            });
        });

        changeColors('#f2f2f2', '#f40202', '#1e1b1d');

        // ========== MODAL Y PROYECTOS (slideData)
        const caseStudies = document.querySelectorAll('.case-study');
        const floatingModal = document.getElementById('floatingModal');
        const closeModal = document.querySelector('.close-modal');
        const modalTitle = document.querySelector('.modal-title');
        const modalImage = document.querySelector('.modal-image');
        const modalVideo = document.querySelector('.modal-video');
        const modalText = document.querySelector('.modal-text');
        const modalImagesContainer = document.querySelector('.modal-images-container');
        let activeCarousel = null;

        // Datos de cada proyecto
        const slideData = {
            'TESORO': {
                title: 'TESORO - Branding',
                image: 'Images/GRAFICO/tesoro-branding.gif',
                images: [
                    'Images/GRAFICO/tesoro/behance tesoro-01.png',
                    'Images/GRAFICO/tesoro/behance tesoro-02.png',
                    'Images/GRAFICO/tesoro/behance tesoro-03.png',
                    'Images/GRAFICO/tesoro/behance tesoro-04.png',
                    'Images/GRAFICO/tesoro/behance tesoro-05.png',
                    'Images/GRAFICO/tesoro/behance tesoro-06.png',
                    'Images/GRAFICO/tesoro/behance tesoro-07.png',
                    'Images/GRAFICO/tesoro/behance tesoro-08.png',
                    'Images/GRAFICO/tesoro/behance tesoro-09.png'
                ]
            },
            'BLUE AURA': {
                title: 'BLUE AURA - Identidad',
                image: 'Images/GRAFICO/BLUE AURA/BLUE AURA PORTADA.jpg',
                images: [
                    'Images/GRAFICO/BLUE AURA/BLUE AURA 1.jpg',
                    'Images/GRAFICO/BLUE AURA/BLUE AURA 2.jpg'
                ]
            },
            'MARIPOSA': {
                title: 'MARIPOSA - Flyer',
                image: 'Images/GRAFICO/Mariposa/MARIPOSA.jpg',
                images: [
                    'Images/GRAFICO/Mariposa/MARIPOSA 2.jpg'
                ]
            },
            'KAISA': {
                title: 'KAISA - BRAND Y FLYERS',
                image: 'Images/GRAFICO/KAISA/kaisa banner.jpg',
                images: [
                    'Images/GRAFICO/KAISA/kaisa1.jpg',
                    'Images/GRAFICO/KAISA/kaisa2.jpg',
                    'Images/GRAFICO/KAISA/kaisa3.gif',
                    'Images/GRAFICO/KAISA/kaisa4.jpg',
                    'Images/GRAFICO/KAISA/kaisa5.jpg',
                    'Images/GRAFICO/KAISA/kaisa6.jpg',
                    'Images/GRAFICO/KAISA/kaisa7.jpg',
                    'Images/GRAFICO/KAISA/kaisa8.jpg',
                    'Images/GRAFICO/KAISA/kaisa9.jpg',
                    'Images/GRAFICO/KAISA/kaisa10.jpg',
                    'Images/GRAFICO/KAISA/kaisa11.jpg',
                    'Images/GRAFICO/KAISA/kaisa12.gif',
                    'Images/GRAFICO/KAISA/kaisa13.jpg',
                ]
            },
            'RIZHADA': {
                title: 'RIZHADA - BRANDING',
                image: 'Images/GRAFICO/RIZHADA/rizhada 1 banner.jpg',
                images: [
                    'Images/GRAFICO/RIZHADA/rizhada 1.jpg',
                    'Images/GRAFICO/RIZHADA/rizhada 2.jpg',
                    'Images/GRAFICO/RIZHADA/rizhada 3.jpg',
                    'Images/GRAFICO/RIZHADA/rizhada 4.jpg',
                    'Images/GRAFICO/RIZHADA/rizhada 5.jpg',
                    'Images/GRAFICO/RIZHADA/rizhada 6.jpg',
                    'Images/GRAFICO/RIZHADA/rizhada 7.jpg'
                ]
            },
            'AGENDA / CALENDARIO': {
                title: 'Agenda / Calendario',
                image: 'Images/GRAFICO/CALENDARIO/BANNER.jpg',
                images: [
                    'Images/GRAFICO/CALENDARIO/behance tesoro agenda-01.jpg',
                    'Images/GRAFICO/CALENDARIO/behance tesoro agenda-02.jpg',
                    'Images/GRAFICO/CALENDARIO/behance tesoro agenda-03.jpg',
                    'Images/GRAFICO/CALENDARIO/behance tesoro agenda-04.jpg'
                ]
            },
            'REFLEX': {
                title: 'REFLEX - Flyers',
                image: 'Images/GRAFICO/REFLEX/REFLEX mockup.jpg',
                images: [
                    'Images/GRAFICO/REFLEX/REFLEX 2025-TESIS.png',
                    'Images/GRAFICO/REFLEX/mock up reflex.png',
                ]
            },
            'NIVEA': {
                title: 'NIVEA - Motion Graphics',
                video: 'Videos/NIVEA/Nivea.mp4'
            },
            'DISHYPE': {
                title: 'DISHYPE - Motion Graphics',
                video: 'Videos/SENDA/senda.mp4'
            },
            'BUENOS_AIRES': {
                title: 'BUENOS AIRES - Motion Graphics',
                video: 'Videos/BUENOSAIRES/BUENOS-AIRES.mp4'
            },
            'JAM': {
                title: 'JAM - Motion Graphics',
                video: 'Videos/JAM/JAM.mp4'
            },
            'UTOPIA': {
                title: 'UTOPÍA - Motion Graphics',
                video: 'Videos/UTOPIA/UTOPIA.mp4'
            },
            'BALL': {
                title: 'BALL - Motion Graphics',
                video: 'Videos/PELOTITA/pelotita.mp4'
            }
        };

        // Función para abrir el modal
        function openModal(projectName, slideImage = null) {
            console.log('Abriendo modal para:', projectName);
            const data = slideData[projectName];
            if (data) {
                modalTitle.textContent = data.title || projectName;
                // Reiniciar contenedores auxiliares
                modalText.style.display = 'none';
                modalImagesContainer.style.display = 'none';
                modalImagesContainer.innerHTML = '';

                const modalMedia = document.querySelector('.modal-media');
                const isVideoOnly = !!data.video && !(data.images && data.images.length);
                const portraitVideoProjects = ['NIVEA', 'DISHYPE', 'BALL'];

                // Tamaño 1080x1920 solo para NIVEA, DISHYPE, BALL
                if (portraitVideoProjects.includes(projectName)) {
                    modalMedia.classList.add('modal-video-portrait');
                } else {
                    modalMedia.classList.remove('modal-video-portrait');
                }

                // Sin portada en módulo para motion: NIVEA, DISHYPE, BUENOS_AIRES, JAM, UTOPIA, BALL (solo video)
                const noPortadaEnModulo = ['NIVEA', 'DISHYPE', 'BUENOS_AIRES', 'JAM', 'UTOPIA', 'BALL'];
                const mostrarPortada = !noPortadaEnModulo.includes(projectName) && (data.image || slideImage);
                if (mostrarPortada) {
                    modalImage.src = (data.image || slideImage).includes(' ') ? encodeURI(data.image || slideImage) : (data.image || slideImage);
                    modalImage.style.display = 'block';
                } else {
                    modalImage.src = '';
                    modalImage.style.display = 'none';
                }

                // Módulos solo video: poco espacio entre título y vídeo
                if (noPortadaEnModulo.includes(projectName)) {
                    modalMedia.classList.add('modal-video-only');
                } else {
                    modalMedia.classList.remove('modal-video-only');
                }

                // Galería de imágenes (solo para proyectos con images; no en NIVEA→BALL)
                if (!isVideoOnly && data.images && data.images.length) {
                    const coverFileName = data.image ? data.image.split('/').pop() : null;
                    const slideFileName = slideImage ? slideImage.split('/').pop() : null;

                    data.images.forEach((imgSrc) => {
                        const imgFileName = imgSrc.split('/').pop();
                        if (imgFileName === coverFileName || imgFileName === slideFileName) return;
                        const img = document.createElement('img');
                        img.src = imgSrc.includes(' ') ? encodeURI(imgSrc) : imgSrc;
                        img.alt = projectName;
                        modalImagesContainer.appendChild(img);
                    });

                    if (modalImagesContainer.children.length > 0) {
                        modalImagesContainer.style.display = 'flex';
                    }
                }

                // Video para proyectos motion
                if (data.video) {
                    const source = modalVideo.querySelector('source');
                    const videoSrc = data.video.includes(' ') ? encodeURI(data.video) : data.video;
                    source.src = videoSrc;
                    modalVideo.load();
                    modalVideo.style.display = 'block';
                } else {
                    modalVideo.style.display = 'none';
                }

                floatingModal.style.display = 'flex';
                setTimeout(() => {
                    floatingModal.classList.add('active');
                }, 10);
            }
        }

        // Función para cerrar el modal
        function closeModalFunc() {
            floatingModal.classList.remove('active');
            setTimeout(() => {
                floatingModal.style.display = 'none';
                if (modalImage) modalImage.src = '';
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.querySelector('source').src = '';
                }
                if (modalImagesContainer) {
                    modalImagesContainer.innerHTML = '';
                    modalImagesContainer.style.display = 'none';
                }
            }, 300);
        }

        // Event listeners para el modal
        closeModal.addEventListener('click', closeModalFunc);
        floatingModal.addEventListener('click', (e) => {
            if (e.target === floatingModal) {
                closeModalFunc();
            }
        });

        // ========== CARRUSEL
        document.querySelectorAll('.carousel-slide').forEach(slide => {
            slide.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectName = slide.getAttribute('data-project');
                const image = slide.querySelector('img').src;
                const title = slide.querySelector('.slide-title').textContent;
                console.log('Click en slide:', projectName || title);
                if (projectName) {
                    openModal(projectName, image);
                } else if (title) {
                    // Para proyectos sin data-project, usar el título
                    openModal(title, image);
                }
            });
        });

        // Manejo del carrusel
        caseStudies.forEach(study => {
            const carousel = study.querySelector('.carousel');
            
            study.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.carousel').forEach(c => {
                    if (c !== carousel) {
                        c.classList.remove('active');
                        c.closest('.case-study').classList.remove('active');
                        c.closest('.case-study').classList.remove('carousel-active');
                    }
                });
                carousel.classList.toggle('active');
                study.classList.toggle('active');
                study.classList.toggle('carousel-active');
                activeCarousel = carousel;
            });
        });

        // Cerrar carrusel solo cuando no hay modal abierto y se hace click fuera
        document.addEventListener('click', (e) => {
            if (!floatingModal.classList.contains('active') && 
                !e.target.closest('.case-study') && 
                !e.target.closest('.floating-modal')) {
                document.querySelectorAll('.carousel').forEach(carousel => {
                    carousel.classList.remove('active');
                    carousel.closest('.case-study').classList.remove('active');
                    carousel.closest('.case-study').classList.remove('carousel-active');
                });
                activeCarousel = null;
            }
        });

        // ========== IDIOMA
        function updateExploreLanguage(lang) {
            // Ya no hay elementos de texto en el módulo de exploración, solo la imagen
            // Esta función se mantiene por compatibilidad pero no hace nada
        }

        // Manejo del cambio de idioma
        const languageButtons = document.querySelectorAll('.language-btn');
        const languageToggle = document.querySelector('.language-toggle');
        const htmlElement = document.documentElement;

        function changeLanguage(lang) {
            // Actualizar el atributo lang del HTML
            htmlElement.setAttribute('lang', lang);
            
            // Actualizar el texto del botón de idioma
            languageToggle.textContent = languageToggle.getAttribute(`data-lang-${lang}`);
            
            // Actualizar todos los elementos con atributos data-lang
            document.querySelectorAll('[data-lang-es]').forEach(element => {
                const newText = element.getAttribute(`data-lang-${lang}`);
                if (newText) {
                    element.textContent = newText;
                }
            });

            // Actualizar idioma en el módulo de exploración
            updateExploreLanguage(lang);

            // Guardar la preferencia de idioma
            localStorage.setItem('preferredLanguage', lang);
        }

        // Cargar el idioma guardado al iniciar
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
        changeLanguage(savedLanguage);

        // Agregar event listeners a los botones de idioma
        languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });

        // Cerrar el menú de idiomas al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-toggle') && !e.target.closest('.language-options')) {
                document.querySelector('.language-options').style.display = 'none';
            }
        });

        // Mostrar/ocultar menú de idiomas al hacer click en el botón
        languageToggle.addEventListener('click', () => {
            const options = document.querySelector('.language-options');
            options.style.display = options.style.display === 'none' ? 'flex' : 'none';
        });

        // ========== MÓDULO DE EXPLORACIÓN
        const exploreToggle = document.querySelector('.explore-toggle');
        const exploreModal = document.getElementById('exploreModal');
        const closeExploreModal = document.querySelector('.close-explore-modal');
        const exploreCanvas = document.getElementById('exploreCanvas');
        const exploreBackground = document.getElementById('exploreBackground');
        const exploreCursor = document.getElementById('exploreCursor');

        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let offsetX = 0;
        let offsetY = 0;
        let animationFrameId = null;

        // Abrir módulo de exploración
        exploreToggle.addEventListener('click', () => {
            exploreModal.style.display = 'block';
            setTimeout(() => {
                exploreModal.classList.add('active');
            }, 10);
            // Resetear posición
            offsetX = 0;
            offsetY = 0;
            updateTransform();
        });

        // Cerrar módulo de exploración
        closeExploreModal.addEventListener('click', () => {
            exploreModal.classList.remove('active');
            setTimeout(() => {
                exploreModal.style.display = 'none';
            }, 400);
            // Cancelar animación si está activa
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });

        // Cerrar al hacer click fuera del contenido
        exploreModal.addEventListener('click', (e) => {
            if (e.target === exploreModal) {
                exploreModal.classList.remove('active');
                setTimeout(() => {
                    exploreModal.style.display = 'none';
                }, 400);
                // Cancelar animación si está activa
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        });

        // Funciones para el movimiento con mouse (optimizado con requestAnimationFrame)
        function updateTransform() {
            // Usar translate3d para mejor rendimiento con GPU
            // Mantener el translate inicial para centrar y luego aplicar el offset
            exploreBackground.style.transform = `translate(-50%, -50%) translate3d(${offsetX}px, ${offsetY}px, 0)`;
        }

        function animate() {
            updateTransform();
            animationFrameId = null;
        }

        function handleStart(e) {
            isDragging = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            startX = clientX - offsetX;
            startY = clientY - offsetY;
            exploreCanvas.style.cursor = 'grabbing';
        }

        function handleMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            offsetX = clientX - startX;
            offsetY = clientY - startY;
            
            // Usar requestAnimationFrame para mejor rendimiento
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(animate);
            }
        }

        function handleEnd() {
            isDragging = false;
            exploreCanvas.style.cursor = 'grab';
            // Asegurar que la última actualización se aplique
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            updateTransform();
        }

        // Event listeners para mouse
        exploreCanvas.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);

        // Event listeners para touch
        exploreCanvas.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);

        // Seguir el cursor con el indicador visual
        exploreModal.addEventListener('mousemove', (e) => {
            if (exploreModal.classList.contains('active')) {
                exploreCursor.style.left = e.clientX + 'px';
                exploreCursor.style.top = e.clientY + 'px';   
            }

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
        });
