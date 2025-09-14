// === SISTEMA DE MENÚ HAMBURGUESA ===

// Variables globales para el menú hamburguesa
let isHamburgerMenuOpen = false;

// Configuración del menú con iconos y secciones
const menuItems = {
    es: [
        { id: 'home', label: 'Inicio', icon: 'fas fa-home' },
        { id: 'about', label: 'Sobre Mí', icon: 'fas fa-user' },
        { id: 'skills', label: 'Competencias', icon: 'fas fa-code' },
        { id: 'projects', label: 'Proyectos', icon: 'fas fa-laptop-code' },
        { id: 'experience', label: 'Experiencia', icon: 'fas fa-briefcase' },
        { id: 'contact', label: 'Contacto', icon: 'fas fa-envelope' }
    ],
    en: [
        { id: 'home', label: 'Home', icon: 'fas fa-home' },
        { id: 'about', label: 'About Me', icon: 'fas fa-user' },
        { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
        { id: 'projects', label: 'Projects', icon: 'fas fa-laptop-code' },
        { id: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
        { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
    ],
    de: [
        { id: 'home', label: 'Startseite', icon: 'fas fa-home' },
        { id: 'about', label: 'Über mich', icon: 'fas fa-user' },
        { id: 'skills', label: 'Fähigkeiten', icon: 'fas fa-code' },
        { id: 'projects', label: 'Projekte', icon: 'fas fa-laptop-code' },
        { id: 'experience', label: 'Erfahrung', icon: 'fas fa-briefcase' },
        { id: 'contact', label: 'Kontakt', icon: 'fas fa-envelope' }
    ]
};

// Función para crear el menú hamburguesa
function createHamburgerMenu() {
    // Verificar si ya existe
    if (document.querySelector('.hamburger-menu')) return;

    const currentMenuItems = menuItems[currentLanguage] || menuItems['es'];

    const menu = document.createElement('div');
    menu.className = 'hamburger-menu';
    menu.innerHTML = `
        <div class="hamburger-backdrop"></div>
        <div class="hamburger-content">
            <div class="hamburger-header">
                <div class="hamburger-logo">
                    <img src="./Assets/logo10.png" alt="Logo" class="hamburger-logo-img">
                </div>
                <button class="hamburger-close" aria-label="Cerrar menú">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <nav class="hamburger-nav">
                ${currentMenuItems.map(item => `
                    <a href="#${item.id}" class="hamburger-nav-item" data-section="${item.id}">
                        <i class="${item.icon}"></i>
                        <span>${item.label}</span>
                        <i class="fas fa-chevron-right hamburger-arrow"></i>
                    </a>
                `).join('')}
            </nav>
            <div class="hamburger-footer">
                <div class="hamburger-social">
                    <a href="https://www.linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/MiiguelMM" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="mailto:tu.email@example.com" aria-label="Email">
                        <i class="fas fa-envelope"></i>
                    </a>
                </div>
                <p class="hamburger-copyright">© 2025 Miguel</p>
            </div>
        </div>
    `;

    document.body.appendChild(menu);

    // Event listeners
    setupHamburgerEventListeners();
}

// Función para configurar los event listeners del menú
function setupHamburgerEventListeners() {
    const menu = document.querySelector('.hamburger-menu');
    const closeBtn = menu.querySelector('.hamburger-close');
    const backdrop = menu.querySelector('.hamburger-backdrop');
    const navItems = menu.querySelectorAll('.hamburger-nav-item');

    // Cerrar menú
    closeBtn.addEventListener('click', closeHamburgerMenu);
    backdrop.addEventListener('click', closeHamburgerMenu);

    // Navegación con scroll suave y cierre automático
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Cerrar menú primero con animación
                closeHamburgerMenu();

                // Scroll suave después de un pequeño delay
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Actualizar indicador activo
                    updateActiveMenuItem(targetId);
                }, 300);
            }
        });

        // Efecto hover con sonido visual
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

// Función para abrir el menú hamburguesa
function openHamburgerMenu() {
    createHamburgerMenu();
    const menu = document.querySelector('.hamburger-menu');
    const hamburgerBtn = document.querySelector('.navbar');

    if (menu) {
        // Animaciones de apertura
        menu.classList.add('open');
        hamburgerBtn.classList.add('active');
        isHamburgerMenuOpen = true;

        // Bloquear scroll del body
        document.body.classList.add('hamburger-menu-open');

        // Animar elementos del menú con delay escalonado
        const navItems = menu.querySelectorAll('.hamburger-nav-item');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 100 + (index * 50));
        });

        // Actualizar el elemento activo basado en la posición actual
        updateActiveMenuItemFromScroll();
    }
}

// Función para cerrar el menú hamburguesa
function closeHamburgerMenu() {
    const menu = document.querySelector('.hamburger-menu');
    const hamburgerBtn = document.querySelector('.navbar');

    if (menu) {
        menu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        isHamburgerMenuOpen = false;

        // Restaurar scroll del body
        document.body.classList.remove('hamburger-menu-open');

        // Remover el menú después de la animación
        setTimeout(() => {
            if (menu.parentNode) {
                menu.remove();
            }
        }, 400);
    }
}

// Función para alternar el menú
function toggleHamburgerMenu(e) {
    e.stopPropagation();

    if (!isHamburgerMenuOpen) {
        openHamburgerMenu();
    } else {
        closeHamburgerMenu();
    }
}

// Función para actualizar el elemento activo del menú
function updateActiveMenuItem(activeId) {
    const navItems = document.querySelectorAll('.hamburger-nav-item');
    navItems.forEach(item => {
        const itemId = item.getAttribute('href').substring(1);
        if (itemId === activeId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Función para detectar la sección actual y actualizar el menú
function updateActiveMenuItemFromScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100; // Offset para el header

    let currentSection = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });

    updateActiveMenuItem(currentSection);
}

// Función para actualizar el menú cuando cambie el idioma
function updateHamburgerMenuLanguage() {
    if (isHamburgerMenuOpen) {
        // Si el menú está abierto, recrearlo con el nuevo idioma
        closeHamburgerMenu();
        setTimeout(() => {
            openHamburgerMenu();
        }, 400);
    }
}

// Función para inicializar el sistema de menú hamburguesa
function initializeHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.navbar');

    if (hamburgerBtn) {
        // Event listener para el botón
        hamburgerBtn.addEventListener('click', toggleHamburgerMenu);

        // Agregar tooltip
        hamburgerBtn.setAttribute('title', 'Menú de navegación');
    }

    // Cerrar menú con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isHamburgerMenuOpen) {
            closeHamburgerMenu();
        }
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (isHamburgerMenuOpen &&
            !e.target.closest('.hamburger-menu') &&
            !e.target.closest('.navbar')) {
            closeHamburgerMenu();
        }
    });

    // Actualizar elemento activo al hacer scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (isHamburgerMenuOpen) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveMenuItemFromScroll, 100);
        }
    });

    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', () => {
        if (isHamburgerMenuOpen && window.innerWidth > 768) {
            closeHamburgerMenu();
        }
    });
}

// === SISTEMA DE IDIOMAS CÍCLICO (RESTAURADO) ===

// Variables globales para el sistema de idiomas
let currentLanguageIndex = 0;
const languageOrder = ['es', 'en', 'de'];

// Diccionario de traducciones
const translations = {
    es: {
        pageTitle: "Portfolio de Miguel | Full Stack Developer",
        changeLanguage: "Cambiar idioma",
        changeTheme: "Cambiar tema de color",
        openMenu: "Abrir menú de navegación",
        backToHome: "Volver al inicio",
        // Navegación desktop
        navHome: "Inicio",
        navAbout: "Sobre Mí",
        navSkills: "Habilidades",
        navProjects: "Proyectos",
        navExperience: "Experiencia",
        navContact: "Contacto",
        // Resto del contenido
        heroTitle: "Miguel",
        heroSubtitle: "Full Stack Developer<br>Java & React",
        heroDescription: "Con 3 años de experiencia industrial en Eli Lilly, Hexcel y más. Ahora especializado en desarrollo Full Stack, creando soluciones digitales que aportan valor real a las empresas.",
        contactMe: "Contáctame",
        aboutTitle: "Sobre Mí",
        aboutText1: "Profesional con experiencia en procesos de manufactura de precisión, cumpliendo estándares como GMP y normativas aeroespaciales. Tras años en entornos corporativos, ahora enfocado en desarrollo Full Stack para crear soluciones reales y escalables.",
        aboutText2: "Siempre aprendiendo, siempre construyendo. ¡Conectemos!",
        viewLinkedIn: "Ver perfil en LinkedIn",
        skillsTitle: "Competencias Técnicas",
        projectsTitle: "Proyectos",
        crmTitle: "Sistema de gestion Empresarial completo (ERP-CRM) ",
        crmDescription: "Plataforma de gestión empresarial desarrollada desde cero que integra todas las operaciones de negocio en un solo sistema. Incluye gestión completa de clientes, productos, ventas e inventario con dashboard interactivo, métricas en tiempo real, generación automática de PDFs y envío de emails. Desarrollado con Spring Boot en el backend, React en el frontend, base de datos PostgreSQL y desplegado en Render. Sistema completamente responsive con filtros inteligentes y búsqueda avanzada que demuestra capacidades full-stack para soluciones empresariales reales <br><br> *NOTA: Primera carga puede tardar ~30-60 segundos (servidor gratuito en standby).",
        spyzerTitle: "Spyzer",
        spyzerDescription: "En desarrollo: plataforma fintech para seguimiento en tiempo real del SP500.",
        viewDemo: "Ver Demo",
        viewCode: "Código",
        experienceTitle: "Experiencia previa",
        hpRole: "Desarrollador de software (abr. 2025 - may. 2025)",
        hexcelRole: "Operador de producción (ene. 2024 - ago. 2024)",
        lillyRole: "Operador de producción (feb. 2022 - jul. 2023)",
        ketersaRole: "Programador y diseñador CNC (jun. 2021 - feb. 2022)",
        fuymaRole: "Operador de producción (abr. 2021 - jun. 2021)",
        contactTitle: "Contacto",
        contactDescription: "¿Interesado en colaborar? Escríbeme o contáctame a través de mis redes.",
        yourName: "Tu Nombre",
        yourEmail: "Tu Email",
        yourMessage: "Tu Mensaje",
        sendMessage: "Enviar Mensaje",
        footerCopy: "© 2025 Miguel. Todos los derechos reservados.",
        languageNames: {
            es: "Español",
            en: "English",
            de: "Deutsch"
        }
    },

    en: {
        pageTitle: "Miguel's Portfolio | Full Stack Developer",
        changeLanguage: "Change language",
        changeTheme: "Change color theme",
        openMenu: "Open navigation menu",
        backToHome: "Back to home",
        // Navegación desktop
        navHome: "Home",
        navAbout: "About Me",
        navSkills: "Skills",
        navProjects: "Projects",
        navExperience: "Experience",
        navContact: "Contact",
        // Resto del contenido
        heroTitle: "Miguel",
        heroSubtitle: "Full Stack Developer<br>Java & React",
        heroDescription: "With 3 years of industrial experience at Eli Lilly, Hexcel and more. Now specialized in Full Stack development, creating digital solutions that bring real value to companies.",
        contactMe: "Contact Me",
        aboutTitle: "About Me",
        aboutText1: "Professional with experience in precision manufacturing processes, meeting standards such as GMP and aerospace regulations. After years in corporate environments, now focused on Full Stack development to create real and scalable solutions.",
        aboutText2: "Always learning, always building. Let's connect!",
        viewLinkedIn: "View LinkedIn profile",
        skillsTitle: "Technical Skills",
        projectsTitle: "Projects",
        crmTitle: "Complete Enterprise Management System (ERP-CRM)",
        crmDescription: "A full-featured business management platform that streamlines operations by bringing customers, products, sales, and inventory into one centralized system. The platform offers real-time analytics through an interactive dashboard, automated PDF reporting, and email notifications. Built using Spring Boot for the backend and React for the frontend, with PostgreSQL database and cloud deployment on Render. The responsive design includes smart filtering and advanced search functionality, showcasing modern full-stack development for enterprise-grade solutions. <br><br>*NOTE: Initial load may take ~30-60 seconds (free server on standby)",
        spyzerTitle: "Spyzer",
        spyzerDescription: "In development: fintech platform for real-time SP500 tracking.",
        viewDemo: "View Demo",
        viewCode: "Code",
        experienceTitle: "Previous Experience",
        hpRole: "Software Developer (Apr. 2025 - May 2025)",
        hexcelRole: "Production Operator (Jan. 2024 - Aug. 2024)",
        lillyRole: "Production Operator (Feb. 2022 - Jul. 2023)",
        ketersaRole: "CNC Programmer and Designer (Jun. 2021 - Feb. 2022)",
        fuymaRole: "Production Operator (Apr. 2021 - Jun. 2021)",
        contactTitle: "Contact",
        contactDescription: "Interested in collaborating? Write to me or contact me through my networks.",
        yourName: "Your Name",
        yourEmail: "Your Email",
        yourMessage: "Your Message",
        sendMessage: "Send Message",
        footerCopy: "© 2025 Miguel. All rights reserved.",
        languageNames: {
            es: "Español",
            en: "English",
            de: "Deutsch"
        }
    },

    de: {
        pageTitle: "Miguels Portfolio | Full Stack Entwickler",
        changeLanguage: "Sprache ändern",
        changeTheme: "Farbthema ändern",
        openMenu: "Navigationsmenü öffnen",
        backToHome: "Zurück zur Startseite",
        // Navegación desktop
        navHome: "Startseite",
        navAbout: "Über mich",
        navSkills: "Fähigkeiten",
        navProjects: "Projekte",
        navExperience: "Erfahrung",
        navContact: "Kontakt",
        // Resto del contenido
        heroTitle: "Miguel",
        heroSubtitle: "Full Stack Entwickler<br>Java & React",
        heroDescription: "Mit drei Jahren Industrieerfahrung bei Eli Lilly, Hexcel und anderen Unternehmen. Heute spezialisiere ich mich auf Full Stack-Entwicklung und entwickle digitale Lösungen, die Unternehmen echten Mehrwert bieten.",
        contactMe: "Kontaktiere mich",
        aboutTitle: "Über mich",
        aboutText1: "Als Fachkraft in der Präzisionsfertigung habe ich jahrelang in anspruchsvollen Unternehmensumgebungen gearbeitet und dabei Standards wie GMP und Luftfahrtvorschriften umgesetzt. Heute konzentriere ich mich auf Full Stack-Entwicklung und erstelle maßgeschneiderte, skalierbare Lösungen für echte Geschäftsanforderungen.",
        aboutText2: "Ich lerne ständig dazu und entwickle kontinuierlich weiter. Lass uns in Kontakt treten!",
        viewLinkedIn: "LinkedIn-Profil anzeigen",
        skillsTitle: "Technische Fähigkeiten",
        projectsTitle: "Projekte",
        crmTitle: "Vollständiges Unternehmens-Management-System (ERP-CRM)",
        crmDescription: "Eine umfassende Geschäftsverwaltungsplattform, die alle Betriebsabläufe in einem zentralisierten System zusammenführt. Die Plattform bietet Echtzeit-Analysen über ein interaktives Dashboard, automatisierte PDF-Berichte und E-Mail-Benachrichtigungen. Entwickelt mit Spring Boot im Backend und React im Frontend, PostgreSQL-Datenbank und Cloud-Deployment auf Render. Das responsive Design umfasst intelligente Filterung und erweiterte Suchfunktionen und demonstriert moderne Full-Stack-Entwicklung für Unternehmenslösungen. <br><br>*HINWEIS: Der erste Ladevorgang kann ~30-60 Sekunden dauern (kostenloser Server im Standby-Modus).",
        spyzerTitle: "Spyzer",
        spyzerDescription: "In Entwicklung: Eine Fintech-Plattform für Echtzeit-SP500-Tracking und Portfolio-Management.",
        viewDemo: "Demo ansehen",
        viewCode: "Code",
        experienceTitle: "Erfahrung",
        hpRole: "Software-Entwickler (Apr. 2025 - Mai 2025)",
        hexcelRole: "Produktionsoperator (Jan. 2024 - Aug. 2024)",
        lillyRole: "Produktionsoperator (Feb. 2022 - Jul. 2023)",
        ketersaRole: "CNC-Programmierer und Designer (Jun. 2021 - Feb. 2022)",
        fuymaRole: "Produktionsoperator (Apr. 2021 - Jun. 2021)",
        contactTitle: "Kontakt",
        contactDescription: "Interesse an einer Zusammenarbeit? Schreib mir eine Nachricht oder kontaktiere mich über meine Netzwerke.",
        yourName: "Name",
        yourEmail: "E-Mail",
        yourMessage: "Nachricht",
        sendMessage: "Nachricht senden",
        footerCopy: "© 2025 Miguel. Alle Rechte vorbehalten.",
        languageNames: {
            es: "Español",
            en: "English",
            de: "Deutsch"
        }
    }
};

// Configuración de idiomas con banderas
const languages = {
    es: { name: 'Español', flag: '🇪🇸', code: 'es' },
    en: { name: 'English', flag: '🇺🇸', code: 'en' },
    de: { name: 'Deutsch', flag: '🇩🇪', code: 'de' }
};

//Variables globales para idiomas
let currentLanguage = 'es';

// Función para cambiar idioma (sistema cíclico)
function changeLanguage() {
    // Avanzar al siguiente idioma en el ciclo
    currentLanguageIndex = (currentLanguageIndex + 1) % languageOrder.length;
    currentLanguage = languageOrder[currentLanguageIndex];

    // Guardar la preferencia en localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);

    // Aplicar las traducciones
    applyTranslationsWithAnimation();

    // Actualizar el atributo lang del HTML
    document.documentElement.setAttribute('lang', currentLanguage);

    // Animación visual del botón
    const languageBtn = document.querySelector('.languages');
    languageBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        languageBtn.style.transform = 'scale(1)';
    }, 150);

    // Mostrar indicador visual del idioma actual
    showLanguageIndicator();

    // Actualizar menú hamburguesa si está abierto
    updateHamburgerMenuLanguage();

    if (window.innerWidth >= 1024) {
    updateSidebarTexts();
}
}

// Función para mostrar indicador visual del idioma actual
function showLanguageIndicator() {
    // Remover indicador previo si existe
    const existingIndicator = document.querySelector('.language-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }

    // Crear nuevo indicador
    const indicator = document.createElement('div');
    indicator.className = 'language-indicator';
    indicator.textContent = currentLanguage.toUpperCase();

    // Estilos del indicador
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--dark-bg);
        padding: 8px 12px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 0.8rem;
        z-index: 9999;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        pointer-events: none;
    `;

    document.body.appendChild(indicator);

    // Animación de entrada
    setTimeout(() => {
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0)';
    }, 10);

    // Remover después de 2 segundos
    setTimeout(() => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.remove();
            }
        }, 300);
    }, 2000);
}

// Mapeo de elementos (ACTUALIZADO con navegación desktop)
const elementTranslationMap = {
    'title': 'pageTitle',
    'html': 'lang',
    '.languages': 'changeLanguage',
    '.theme': 'changeTheme',
    '.navbar': 'openMenu',
    '.logo a': 'backToHome',
    // Navegación desktop - elementos específicos
    '.desktop-nav-item[href="#home"]': 'navHome',
    '.desktop-nav-item[href="#about"]': 'navAbout',
    '.desktop-nav-item[href="#skills"]': 'navSkills',
    '.desktop-nav-item[href="#projects"]': 'navProjects',
    '.desktop-nav-item[href="#experience"]': 'navExperience',
    '.desktop-nav-item[href="#contact"]': 'navContact',
    // Resto del contenido
    '.hero__title': 'heroTitle',
    '.hero__subtitle': 'heroSubtitle',
    '.hero__description': 'heroDescription',
    '.hero .btn-primary': 'contactMe',
    '#about .section__title': 'aboutTitle',
    '.about__text p:nth-child(1)': 'aboutText1',
    '.about__text p:nth-child(2)': 'aboutText2',
    '.about__text .btn-secondary': 'viewLinkedIn',
    '#skills .section__title': 'skillsTitle',
    '#projects .section__title': 'projectsTitle',
    '.project-card:nth-child(1) .project-card__title': 'crmTitle',
    '.project-card:nth-child(1) .project-card__description': 'crmDescription',
    '.project-card:nth-child(2) .project-card__title': 'spyzerTitle',
    '.project-card:nth-child(2) .project-card__description': 'spyzerDescription',
    '.btn-tertiary': 'viewDemo',
    '.project-card .btn-secondary': 'viewCode',
    '#experience .section__title': 'experienceTitle',
    '.experience-badge:nth-child(1) p': 'hpRole',
    '.experience-badge:nth-child(2) p': 'hexcelRole',
    '.experience-badge:nth-child(3) p': 'lillyRole',
    '.experience-badge:nth-child(4) p': 'ketersaRole',
    '.experience-badge:nth-child(5) p': 'fuymaRole',
    '#contact .section__title': 'contactTitle',
    '.contact__description': 'contactDescription',
    'input[name="name"]': 'yourName',
    'input[name="email"]': 'yourEmail',
    'textarea[name="message"]': 'yourMessage',
    '.contact__form .btn-primary': 'sendMessage',
    '.footer__copy': 'footerCopy'
};

// Funciones de idiomas simplificadas (sin dropdown)
function applyTranslationsWithAnimation() {
    const currentTranslations = translations[currentLanguage];
    document.title = currentTranslations.pageTitle;

    Object.entries(elementTranslationMap).forEach(([selector, translationKey]) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            const translation = currentTranslations[translationKey];

            if (translation) {
                element.classList.add('translating');

                setTimeout(() => {
                    if (selector.includes('aria-label') ||
                        ['.languages', '.theme', '.navbar', '.logo a'].includes(selector)) {
                        element.setAttribute('aria-label', translation);
                    } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.setAttribute('placeholder', translation);
                    } else {
                        element.innerHTML = translation;
                    }

                    element.classList.remove('translating');
                }, 150);
            }
        });
    });

    handleSpecialCases(currentTranslations);
}

function handleSpecialCases(translations) {
    setTimeout(() => {
        const demoBtns = document.querySelectorAll('.btn-tertiary');
        demoBtns.forEach(btn => {
            if (btn.textContent.includes('Demo') || btn.textContent.includes('Ver') ||
                btn.textContent.includes('View') || btn.textContent.includes('ansehen')) {
                btn.textContent = translations.viewDemo;
            }
        });

        const codeBtns = document.querySelectorAll('.project-card .btn-secondary');
        codeBtns.forEach(btn => {
            btn.textContent = translations.viewCode;
        });
    }, 150);
}

function initializeLanguageSystem() {
    // Cargar idioma guardado o detectar idioma del navegador
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const browserLanguage = navigator.language.split('-')[0];

    if (savedLanguage && languageOrder.includes(savedLanguage)) {
        currentLanguage = savedLanguage;
    } else if (languageOrder.includes(browserLanguage)) {
        currentLanguage = browserLanguage;
    } else {
        currentLanguage = 'es'; // Idioma por defecto
    }

    // Establecer índice actual
    currentLanguageIndex = languageOrder.indexOf(currentLanguage);

    // Aplicar traducciones iniciales
    applyTranslationsWithAnimation();

    // Configurar el atributo lang del HTML
    document.documentElement.setAttribute('lang', currentLanguage);

    // Agregar event listener a TODOS los botones de idiomas (móvil y desktop)
    const languageBtns = document.querySelectorAll('.languages');
    languageBtns.forEach(btn => {
        btn.addEventListener('click', changeLanguage);
        // Agregar tooltip con información de idiomas
        btn.setAttribute('title', 'ES → EN → DE');
    });
}

// === RESTO DEL SCRIPT ORIGINAL ===

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'blue') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'blue');
        localStorage.setItem('theme', 'blue');
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

        particlesContainer.appendChild(particle);
    }
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }

    animateFollower();
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', function () {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'blue') {
        document.body.setAttribute('data-theme', 'blue');
    }

    // Sincronizar TODOS los botones de tema (móvil y desktop)
    const themeBtns = document.querySelectorAll('.theme');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // Inicializar todos los sistemas
    initializeLanguageSystem();
    initializeHamburgerMenu();
    createParticles();
    initCustomCursor();
    handleScrollAnimations();

    // Ocultar loader
    setTimeout(hideLoader, 1000);
});

// Inicializar EmailJS
emailjs.init({
    publicKey: "4ycG7kxE89bcvayF_"
});

// Manejar envío del formulario de contacto
document.querySelector('.contact__form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Mostrar loading
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    emailjs.sendForm('service_bpdnbop', 'template_if725cz', this)
        .then(function () {
            alert('¡Mensaje enviado correctamente!');
            document.querySelector('.contact__form').reset();
        })
        .catch(function (error) {
            alert('Error al enviar el mensaje: ' + error.text);
            console.error('EmailJS Error:', error);
        })
        .finally(function () {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

window.addEventListener('load', hideLoader);
// JavaScript simple y funcional para diseño horizontal
document.addEventListener('DOMContentLoaded', function() {
    // SOLO ejecutar en desktop (1024px o más)
    if (window.innerWidth >= 1024) {
        initHorizontalDesktop();
    }
});

// También verificar en resize
window.addEventListener('resize', function() {
    const isDesktop = window.innerWidth >= 1024;
    const navExists = document.querySelector('.desktop-horizontal-nav');
    
    if (isDesktop && !navExists) {
        // Cambió a desktop y no existe navegación
        initHorizontalDesktop();
    } else if (!isDesktop && navExists) {
        // Cambió a móvil y existe navegación, removerla
        removeDesktopElements();
    }
});

function initHorizontalDesktop() {
    // Solo proceder si estamos en desktop
    if (window.innerWidth < 1024) return;
    
    console.log('Inicializando diseño horizontal');
    
    // Crear navegación en el header
    createSidebarNavigation();
    
    // Crear indicadores de navegación
    createNavigationDots();
    
    // Configurar scroll horizontal
    setupHorizontalScroll();
    
    // Configurar navegación activa
    updateActiveNavigation();
}

function removeDesktopElements() {
    // Remover elementos desktop cuando se cambia a móvil
    const elementsToRemove = [
        '.desktop-horizontal-nav',
        '.sidebar-controls',
        '.horizontal-dots'
    ];
    
    elementsToRemove.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.remove();
        }
    });
}

function createSidebarNavigation() {
    const header = document.querySelector('header');
    if (!header || window.innerWidth < 1024) return;
    
    // Verificar si ya existe para evitar duplicados
    if (document.querySelector('.desktop-horizontal-nav')) return;
    
    // Crear contenedor de navegación
    const navContainer = document.createElement('div');
    navContainer.className = 'desktop-horizontal-nav';
    
    // Crear enlaces de navegación
    const navItems = [
        { href: '#home', icon: 'fas fa-home', text: 'Inicio' },
        { href: '#about', icon: 'fas fa-user', text: 'Sobre Mí' },
        { href: '#skills', icon: 'fas fa-code', text: 'Habilidades' },
        { href: '#projects', icon: 'fas fa-laptop-code', text: 'Proyectos' },
        { href: '#experience', icon: 'fas fa-briefcase', text: 'Experiencia' },
        { href: '#contact', icon: 'fas fa-envelope', text: 'Contacto' }
    ];
    
    navItems.forEach((item, index) => {
        const link = document.createElement('a');
        link.className = 'desktop-nav-link';
        if (index === 0) link.classList.add('active');
        link.href = item.href;
        link.innerHTML = `<i class="${item.icon}"></i>${item.text}`;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            goToSection(index);
            updateActiveLink(link);
        });
        navContainer.appendChild(link);
    });
    
    // Crear controles del sidebar
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'sidebar-controls';
    
    // Botón de idioma
    const langBtn = document.createElement('button');
    langBtn.className = 'sidebar-btn';
    langBtn.innerHTML = '<i class="fas fa-globe"></i>Idioma';
    langBtn.addEventListener('click', () => {
        const originalBtn = document.querySelector('.navItems .languages');
        if (originalBtn) originalBtn.click();
    });
    
    // Botón de tema
    const themeBtn = document.createElement('button');
    themeBtn.className = 'sidebar-btn';
    themeBtn.innerHTML = '<i class="fas fa-palette"></i>Tema';
    themeBtn.addEventListener('click', () => {
        const originalBtn = document.querySelector('.navItems .theme');
        if (originalBtn) originalBtn.click();
    });
    
    controlsContainer.appendChild(langBtn);
    controlsContainer.appendChild(themeBtn);
    
    // Insertar después del logo
    const logo = header.querySelector('.logo');
    if (logo) {
        logo.insertAdjacentElement('afterend', navContainer);
        header.appendChild(controlsContainer);
    }
}

function createNavigationDots() {
    if (window.innerWidth < 1024) return;
    
    // Verificar si ya existen para evitar duplicados
    if (document.querySelector('.horizontal-dots')) return;
    
    // Crear contenedor de dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'horizontal-dots';
    
    // Crear 6 dots para las 6 secciones
    for (let i = 0; i < 6; i++) {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSection(i);
            updateActiveDot(dot);
        });
        dotsContainer.appendChild(dot);
    }
    
    document.body.appendChild(dotsContainer);
}

function setupHorizontalScroll() {
    const main = document.querySelector('main');
    if (!main) return;
    
    let isScrolling = false;
    
    // Scroll con rueda del mouse
    main.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (isScrolling) return;
        isScrolling = true;
        
        const currentSection = getCurrentSection();
        let targetSection = currentSection;
        
        if (e.deltaY > 0 && currentSection < 5) {
            targetSection = currentSection + 1;
        } else if (e.deltaY < 0 && currentSection > 0) {
            targetSection = currentSection - 1;
        }
        
        if (targetSection !== currentSection) {
            goToSection(targetSection);
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
        
    }, { passive: false });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const current = getCurrentSection();
            if (current < 5) goToSection(current + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const current = getCurrentSection();
            if (current > 0) goToSection(current - 1);
        }
    });
    
    // Actualizar navegación en scroll manual
    main.addEventListener('scroll', () => {
        updateActiveNavigation();
    });
}

function getCurrentSection() {
    const main = document.querySelector('main');
    const sidebarWidth = getSidebarWidth();
    const sectionWidth = window.innerWidth - sidebarWidth;
    return Math.round(main.scrollLeft / sectionWidth);
}

function getSidebarWidth() {
    if (window.innerWidth >= 1600) return 400;
    if (window.innerWidth >= 1366) return 300;
    return 280;
}

function goToSection(index) {
    const main = document.querySelector('main');
    const sidebarWidth = getSidebarWidth();
    const sectionWidth = window.innerWidth - sidebarWidth;
    
    main.scrollTo({
        left: index * sectionWidth,
        behavior: 'smooth'
    });
    
    updateActiveNavigation(index);
}

function updateActiveNavigation(sectionIndex = null) {
    const currentSection = sectionIndex !== null ? sectionIndex : getCurrentSection();
    
    // Actualizar links del sidebar
    const navLinks = document.querySelectorAll('.desktop-nav-link');
    navLinks.forEach((link, index) => {
        link.classList.toggle('active', index === currentSection);
    });
    
    // Actualizar dots
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSection);
    });
}

function updateActiveLink(activeLink) {
    document.querySelectorAll('.desktop-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateActiveDot(activeDot) {
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.classList.remove('active');
    });
    activeDot.classList.add('active');
}

// Función para reinicializar en caso de resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        const navExists = document.querySelector('.desktop-horizontal-nav');
        if (!navExists) {
            location.reload();
        }
    }
});

console.log('JavaScript horizontal simple cargado');
// JavaScript mejorado con soporte para traducción
document.addEventListener('DOMContentLoaded', function() {
    // SOLO ejecutar en desktop (1024px o más)
    if (window.innerWidth >= 1024) {
        initHorizontalDesktop();
    }
});

// También verificar en resize
window.addEventListener('resize', function() {
    const isDesktop = window.innerWidth >= 1024;
    const navExists = document.querySelector('.desktop-horizontal-nav');
    
    if (isDesktop && !navExists) {
        // Cambió a desktop y no existe navegación
        initHorizontalDesktop();
    } else if (!isDesktop && navExists) {
        // Cambió a móvil y existe navegación, removerla
        removeDesktopElements();
    }
});

function initHorizontalDesktop() {
    // Solo proceder si estamos en desktop
    if (window.innerWidth < 1024) return;
    
    console.log('Inicializando diseño horizontal');
    
    // Crear navegación en el header
    createSidebarNavigation();
    
    // Crear indicadores de navegación
    createNavigationDots();
    
    // Configurar scroll horizontal
    setupHorizontalScroll();
    
    // Configurar navegación activa
    updateActiveNavigation();
}

function removeDesktopElements() {
    // Remover elementos desktop cuando se cambia a móvil
    const elementsToRemove = [
        '.desktop-horizontal-nav',
        '.sidebar-controls',
        '.horizontal-dots'
    ];
    
    elementsToRemove.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.remove();
        }
    });
}

// Función para obtener texto traducido
 function getTranslatedText(key) {
    // Obtener idioma actual - adapta esto a tu sistema de traducción
    const currentLang = document.documentElement.lang || 'es';
    
    const translations = {
        'es': {
            'nav.home': 'Inicio',
            'nav.about': 'Sobre Mí',
            'nav.skills': 'Habilidades',
            'nav.projects': 'Proyectos',
            'nav.experience': 'Experiencia',
            'nav.contact': 'Contacto',
            'nav.language': 'Idioma',
            'nav.theme': 'Tema'
        },
        'en': {
            'nav.home': 'Home',
            'nav.about': 'About Me',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.experience': 'Experience',
            'nav.contact': 'Contact',
            'nav.language': 'Language',
            'nav.theme': 'Theme'
        },
        'fr': {
            'nav.home': 'Accueil',
            'nav.about': 'À Propos',
            'nav.skills': 'Compétences',
            'nav.projects': 'Projets',
            'nav.experience': 'Expérience',
            'nav.contact': 'Contact',
            'nav.language': 'Langue',
            'nav.theme': 'Thème'
        },
        'de': {
            'nav.home': 'Startseite',
            'nav.about': 'Über Mich',
            'nav.skills': 'Fähigkeiten',
            'nav.projects': 'Projekte',
            'nav.experience': 'Erfahrung',
            'nav.contact': 'Kontakt',
            'nav.language': 'Sprache',
            'nav.theme': 'Thema'
        }
    };
    
    return translations[currentLang]?.[key] || translations['es'][key] || key;
}

function createSidebarNavigation() {
    const header = document.querySelector('header');
    if (!header || window.innerWidth < 1024) return;
    
    // Verificar si ya existe para evitar duplicados
    if (document.querySelector('.desktop-horizontal-nav')) return;
    
    // Crear contenedor de navegación
    const navContainer = document.createElement('div');
    navContainer.className = 'desktop-horizontal-nav';
    
    // Crear enlaces de navegación con traducción
    const navItems = [
        { href: '#home', icon: 'fas fa-home', textKey: 'nav.home' },
        { href: '#about', icon: 'fas fa-user', textKey: 'nav.about' },
        { href: '#skills', icon: 'fas fa-code', textKey: 'nav.skills' },
        { href: '#projects', icon: 'fas fa-laptop-code', textKey: 'nav.projects' },
        { href: '#experience', icon: 'fas fa-briefcase', textKey: 'nav.experience' },
        { href: '#contact', icon: 'fas fa-envelope', textKey: 'nav.contact' }
    ];
    
    navItems.forEach((item, index) => {
        const link = document.createElement('a');
        link.className = 'desktop-nav-link';
        if (index === 0) link.classList.add('active');
        link.href = item.href;
        link.innerHTML = `<i class="${item.icon}"></i>${getTranslatedText(item.textKey)}`;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            goToSection(index);
            updateActiveLink(link);
        });
        navContainer.appendChild(link);
    });
    
    // Crear controles del sidebar
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'sidebar-controls';
    
    // Botón de idioma
    const langBtn = document.createElement('button');
    langBtn.className = 'sidebar-btn';
    langBtn.innerHTML = `<i class="fas fa-globe"></i>${getTranslatedText('nav.language')}`;
    langBtn.addEventListener('click', () => {
        const originalBtn = document.querySelector('.navItems .languages');
        if (originalBtn) originalBtn.click();
    });
    
    // Botón de tema
    const themeBtn = document.createElement('button');
    themeBtn.className = 'sidebar-btn';
    themeBtn.innerHTML = `<i class="fas fa-palette"></i>${getTranslatedText('nav.theme')}`;
    themeBtn.addEventListener('click', () => {
        const originalBtn = document.querySelector('.navItems .theme');
        if (originalBtn) originalBtn.click();
    });
    
    controlsContainer.appendChild(langBtn);
    controlsContainer.appendChild(themeBtn);
    
    // Insertar después del logo
    const logo = header.querySelector('.logo');
    if (logo) {
        logo.insertAdjacentElement('afterend', navContainer);
        header.appendChild(controlsContainer);
    }
}

// Función para actualizar textos cuando cambia el idioma
function updateSidebarTexts() {
    const navLinks = document.querySelectorAll('.desktop-nav-link');
    const navItems = [
        { textKey: 'nav.home' },
        { textKey: 'nav.about' },
        { textKey: 'nav.skills' },
        { textKey: 'nav.projects' },
        { textKey: 'nav.experience' },
        { textKey: 'nav.contact' }
    ];
    
    navLinks.forEach((link, index) => {
        if (navItems[index]) {
            const icon = link.querySelector('i').outerHTML;
            link.innerHTML = `${icon}${getTranslatedText(navItems[index].textKey)}`;
        }
    });
    
    // Actualizar botones de control
    const langBtn = document.querySelector('.sidebar-controls .sidebar-btn:first-child');
    const themeBtn = document.querySelector('.sidebar-controls .sidebar-btn:last-child');
    
    if (langBtn) {
        langBtn.innerHTML = `<i class="fas fa-globe"></i>${getTranslatedText('nav.language')}`;
    }
    
    if (themeBtn) {
        themeBtn.innerHTML = `<i class="fas fa-palette"></i>${getTranslatedText('nav.theme')}`;
    }
}

// Escuchar cambios de idioma - adapta esto a tu sistema
document.addEventListener('languageChanged', function(e) {
    if (window.innerWidth >= 1024) {
        updateSidebarTexts();
    }
});

// Si tu sistema de traducción usa otra forma de notificar cambios, úsala aquí
// Por ejemplo, si usas un MutationObserver o tienes una función global:
window.addEventListener('translationComplete', function() {
    if (window.innerWidth >= 1024) {
        updateSidebarTexts();
    }
});

// Resto del código JavaScript permanece igual...
function createNavigationDots() {
    if (window.innerWidth < 1024) return;
    if (document.querySelector('.horizontal-dots')) return;
    
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'horizontal-dots';
    
    for (let i = 0; i < 6; i++) {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSection(i);
            updateActiveDot(dot);
        });
        dotsContainer.appendChild(dot);
    }
    
    document.body.appendChild(dotsContainer);
}

function setupHorizontalScroll() {
    const main = document.querySelector('main');
    if (!main) return;
    
    let isScrolling = false;
    
    main.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (isScrolling) return;
        isScrolling = true;
        
        const currentSection = getCurrentSection();
        let targetSection = currentSection;
        
        if (e.deltaY > 0 && currentSection < 5) {
            targetSection = currentSection + 1;
        } else if (e.deltaY < 0 && currentSection > 0) {
            targetSection = currentSection - 1;
        }
        
        if (targetSection !== currentSection) {
            goToSection(targetSection);
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
        
    }, { passive: false });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const current = getCurrentSection();
            if (current < 5) goToSection(current + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const current = getCurrentSection();
            if (current > 0) goToSection(current - 1);
        }
    });
    
    main.addEventListener('scroll', () => {
        updateActiveNavigation();
    });
}

function getCurrentSection() {
    const main = document.querySelector('main');
    const sidebarWidth = getSidebarWidth();
    const sectionWidth = window.innerWidth - sidebarWidth;
    return Math.round(main.scrollLeft / sectionWidth);
}

function getSidebarWidth() {
    if (window.innerWidth >= 1920) return 380;
    if (window.innerWidth >= 1440) return 320;
    if (window.innerWidth >= 1280) return 300;
    return 280;
}

function goToSection(index) {
    const main = document.querySelector('main');
    const sidebarWidth = getSidebarWidth();
    const sectionWidth = window.innerWidth - sidebarWidth;
    
    main.scrollTo({
        left: index * sectionWidth,
        behavior: 'smooth'
    });
    
    updateActiveNavigation(index);
}

function updateActiveNavigation(sectionIndex = null) {
    const currentSection = sectionIndex !== null ? sectionIndex : getCurrentSection();
    
    const navLinks = document.querySelectorAll('.desktop-nav-link');
    navLinks.forEach((link, index) => {
        link.classList.toggle('active', index === currentSection);
    });
    
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSection);
    });
}

function updateActiveLink(activeLink) {
    document.querySelectorAll('.desktop-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateActiveDot(activeDot) {
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.classList.remove('active');
    });
    activeDot.classList.add('active');
}

console.log('JavaScript horizontal con traducción cargado');