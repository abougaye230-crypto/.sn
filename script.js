// ===== MENU BURGER MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    // Création du menu burger pour mobile
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Créer le bouton burger
    const burgerButton = document.createElement('button');
    burgerButton.className = 'burger-menu';
    burgerButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insérer le bouton burger dans la navigation
    document.querySelector('.nav-container').appendChild(burgerButton);
    
    // Styles pour le bouton burger
    const burgerStyles = `
        .burger-menu {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            width: 30px;
            height: 24px;
            position: relative;
        }
        
        .burger-menu span {
            display: block;
            height: 3px;
            width: 100%;
            background-color: var(--white);
            margin: 3px 0;
            transition: var(--transition);
            border-radius: 2px;
        }
        
        .burger-menu.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .burger-menu.active span:nth-child(2) {
            opacity: 0;
        }
        
        .burger-menu.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        @media (max-width: 768px) {
            .burger-menu {
                display: flex;
            }
            
            .nav-menu {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: var(--white);
                flex-direction: column;
                padding: 2rem;
                box-shadow: var(--shadow-lg);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: var(--transition);
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-menu li {
                margin: 1rem 0;
                text-align: center;
            }
            
            .nav-menu a {
                font-size: 1.2rem;
                padding: 1rem;
                display: block;
                color: var(--text-dark) !important;
            }
        }
    `;
    
    // Ajouter les styles du burger
    const styleSheet = document.createElement('style');
    styleSheet.textContent = burgerStyles;
    document.head.appendChild(styleSheet);
    
    // Gestionnaire d'événement pour le burger
    burgerButton.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fermer le menu quand on clique sur un lien
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerButton.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===== ANIMATION AU SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.skill-category, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== NAVIGATION ACTIVE =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function setActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

   // ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides ou mal formés
        if (!href || href === '#' || href === '#!') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

    // ===== CHANGEMENT DE COULEUR DE LA NAVBAR AU SCROLL =====
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(30, 58, 138, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
            navbar.style.background = 'rgba(30, 58, 138, 0.95)';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    }

    window.addEventListener('scroll', updateNavbar);

    console.log('🚀 Portfolio initialisé avec succès !');
});