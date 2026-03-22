document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // 🎨 COLORES
    // =========================
    const colorButtons = document.querySelectorAll('.color-btn');
    const colorToggle = document.querySelector('.color-toggle');
    const colorOptions = document.querySelector('.color-options');
    const main = document.querySelector('main');
    const footer = document.querySelector('.footer');

    colorToggle?.addEventListener('click', () => {
        colorOptions.style.display = colorOptions.style.display === 'none' ? 'flex' : 'none';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.color-toggle') && !e.target.closest('.color-options')) {
            colorOptions.style.display = 'none';
        }
    });

    function changeColors(bg, text, span) {
        main.style.backgroundColor = bg;
        footer.style.backgroundColor = bg;

        document.querySelectorAll('.case-study').forEach(el => el.style.backgroundColor = bg);

        document.querySelectorAll('*').forEach(el => {
            if (el.matches('.hero h1, .hero p, .case-content h3')) {
                el.style.color = text;
            }
        });
    }

    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('color-light')) changeColors('#f2f2f2', '#f40202', '#1e1b1d');
            if (btn.classList.contains('color-dark')) changeColors('#1e1b1d', '#f40202', '#f2f2f2');
            if (btn.classList.contains('color-blue')) changeColors('#0e0eaf', '#f2f2f2', '#f2f2f2');
        });
    });

    // =========================
    // 🧩 MODAL
    // =========================
    const floatingModal = document.getElementById('floatingModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.querySelector('.modal-title');

    const slideData = {
        'TESORO': { title: 'TESORO - Branding' },
        'NIVEA': { title: 'NIVEA - Motion Graphics' }
        // podés seguir agregando
    };

    function openModal(name) {
        const data = slideData[name];
        if (!data) return;

        modalTitle.textContent = data.title;
        floatingModal.style.display = 'flex';

        setTimeout(() => {
            floatingModal.classList.add('active');
        }, 10);
    }

    function closeModalFunc() {
        floatingModal.classList.remove('active');
        setTimeout(() => {
            floatingModal.style.display = 'none';
        }, 300);
    }

    closeModal?.addEventListener('click', closeModalFunc);

    floatingModal?.addEventListener('click', (e) => {
        if (e.target === floatingModal) closeModalFunc();
    });

    // CLICK EN PROYECTOS
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.addEventListener('click', (e) => {
            e.stopPropagation();
            const project = slide.getAttribute('data-project');
            if (project) openModal(project);
        });
    });

    // =========================
    // 🌍 IDIOMA
    // =========================
    const languageButtons = document.querySelectorAll('.language-btn');
    const languageToggle = document.querySelector('.language-toggle');

    function changeLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('preferredLanguage', lang);
    }

    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });

    // =========================
    // 🔍 EXPLORE (ARREGLADO)
    // =========================
    const exploreModal = document.getElementById('exploreModal');
    const exploreCursor = document.getElementById('exploreCursor');

    exploreModal?.addEventListener('mousemove', (e) => {
        if (exploreModal.classList.contains('active')) {
            exploreCursor.style.left = e.clientX + 'px';
            exploreCursor.style.top = e.clientY + 'px';
        }
    });

    // ✅ ACÁ YA ESTÁ CERRADO (esto era tu bug)

    // =========================
    // 🧭 SMOOTH SCROLL
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // =========================
    // 👀 SCROLL ANIMATION
    // =========================
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    });

    document.querySelectorAll('section').forEach(sec => observer.observe(sec));

    // =========================
    // 📩 FORM
    // =========================
    const form = document.getElementById('contact-form');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje!');
        form.reset();
    });

    // =========================
    // 📌 HEADER SCROLL
    // =========================
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const current = window.pageYOffset;
        header.style.transform = current > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
        lastScroll = current;
    });

    // =========================
    // ✨ LOGO FIXED
    // =========================
    const logo = document.querySelector('.logo-link');
    const hero = document.getElementById('inicio');

    function updateLogo() {
        if (!logo || !hero) return;
        const scroll = window.scrollY;
        const trigger = hero.offsetHeight * 0.5;

        if (scroll > trigger) {
            logo.classList.add('fixed-logo');
        } else {
            logo.classList.remove('fixed-logo');
        }
    }

    window.addEventListener('scroll', updateLogo);

});
