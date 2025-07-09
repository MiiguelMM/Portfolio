// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 800);
});

// Partículas flotantes sutiles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30; // Reducido para ser más sutil
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (20 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 7.5 + 'px';
        cursorFollower.style.top = e.clientY - 7.5 + 'px';
    }, 50);
});

// Efecto hover en links y botones
const interactiveElements = document.querySelectorAll('a, button');
interactiveElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.3)';
    });
    elem.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Toggle tema
function toggleTheme() {
    const body = document.body;
    const themeButton = document.querySelector('.theme i');
    
    if (body.hasAttribute('data-theme')) {
        body.removeAttribute('data-theme');
        themeButton.className = 'fas fa-palette';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'blue');
        themeButton.className = 'fas fa-sun';
        localStorage.setItem('theme', 'blue');
    }
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeButton = document.querySelector('.theme i');
    
    if (savedTheme === 'blue') {
        document.body.setAttribute('data-theme', 'blue');
        themeButton.className = 'fas fa-sun';
    }
});

// Smooth scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animación de aparición en scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animación stagger para skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.08}s`;
});

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.skill-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 80);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Animación similar para experience badges
const experienceBadges = document.querySelectorAll('.experience-badge');
experienceBadges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(20px)';
    badge.style.transition = `all 0.5s ease ${index * 0.1}s`;
});

const experienceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const badges = entry.target.querySelectorAll('.experience-badge');
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

const experienceSection = document.querySelector('#experience');
if (experienceSection) {
    experienceObserver.observe(experienceSection);
}

// Efecto parallax sutil
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero__content');
    
    parallaxElements.forEach(el => {
        const speed = 0.3; // Más sutil
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Animación para project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
});

const projectObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Manejo del formulario de contacto
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch() para enviar los datos a un servidor
        
        // Simulación de envío exitoso
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '¡Mensaje Enviado!';
            button.style.backgroundColor = 'var(--secondary-color)';
            
            // Reset del formulario
            setTimeout(() => {
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
}

// Animación del título principal
const heroTitle = document.querySelector('.hero__title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    // Animación de escritura
    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Iniciar la animación después de que se cargue la página
    setTimeout(typeWriter, 1000);
}

// Menú móvil (navbar button)
const navbarButton = document.querySelector('.navbar');
if (navbarButton) {
    navbarButton.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para mostrar un menú móvil
        // Por ejemplo, agregar una clase para mostrar/ocultar el menú
        console.log('Menú móvil activado');
    });
}

// Cambio de idioma (languages button)
const languagesButton = document.querySelector('.languages');
if (languagesButton) {
    languagesButton.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para cambiar el idioma
        console.log('Cambio de idioma');
    });
}
// === SISTEMA DE INTERNACIONALIZACIÓN COMPLETO ===

// Diccionario de traducciones
const translations = {
    es: {
        // Meta y título
        pageTitle: "Portfolio de Miguel | Full Stack Developer",
        
        // Header
        changeLanguage: "Cambiar idioma",
        changeTheme: "Cambiar tema de color",
        openMenu: "Abrir menú de navegación",
        backToHome: "Volver al inicio",
        
        // Hero Section
        heroTitle: "Miguel",
        heroSubtitle: "Full Stack Developer<br>Java & React",
        heroDescription: "Con 3 años de experiencia industrial en Eli Lilly, Hexcel y más. Ahora especializado en desarrollo Full Stack, creando soluciones digitales que aportan valor real a las empresas.",
        contactMe: "Contáctame",
        
        // About Section
        aboutTitle: "Sobre Mí",
        aboutText1: "Profesional con experiencia en procesos de manufactura de precisión, cumpliendo estándares como GMP y normativas aeroespaciales. Tras años en entornos corporativos, ahora enfocado en desarrollo Full Stack para crear soluciones reales y escalables.",
        aboutText2: "Siempre aprendiendo, siempre construyendo. ¡Conectemos!",
        viewLinkedIn: "Ver perfil en LinkedIn",
        
        // Skills Section
        skillsTitle: "Competencias Técnicas",
        
        // Projects Section
        projectsTitle: "Proyectos",
        crmTitle: "CRM Web App",
        crmDescription: "Proyecto Full Stack para gestionar relaciones con clientes. Incluye login, panel de control y base de datos.",
        spyzerTitle: "Spyzer",
        spyzerDescription: "En desarrollo: plataforma fintech para seguimiento en tiempo real del SP500.",
        viewDemo: "Ver Demo",
        viewCode: "Código",
        
        // Experience Section
        experienceTitle: "Experiencia previa",
        hpRole: "Desarrollador de software (abr. 2025 - may. 2025)",
        hexcelRole: "Operador de producción (ene. 2024 - ago. 2024)",
        lillyRole: "Operador de producción (feb. 2022 - jul. 2023)",
        ketersaRole: "Programador y diseñador CNC (jun. 2021 - feb. 2022)",
        fuymaRole: "Operador de producción (abr. 2021 - jun. 2021)",
        
        // Contact Section
        contactTitle: "Contacto",
        contactDescription: "¿Interesado en colaborar? Escríbeme o contáctame a través de mis redes.",
        yourName: "Tu Nombre",
        yourEmail: "Tu Email",
        yourMessage: "Tu Mensaje",
        sendMessage: "Enviar Mensaje",
        
        // Footer
        footerCopy: "© 2025 Miguel. Todos los derechos reservados."
    },
    
    en: {
        // Meta y título
        pageTitle: "Miguel's Portfolio | Full Stack Developer",
        
        // Header
        changeLanguage: "Change language",
        changeTheme: "Change color theme",
        openMenu: "Open navigation menu",
        backToHome: "Back to home",
        
        // Hero Section
        heroTitle: "Miguel",
        heroSubtitle: "Full Stack Developer<br>Java & React",
        heroDescription: "With 3 years of industrial experience at Eli Lilly, Hexcel and more. Now specialized in Full Stack development, creating digital solutions that bring real value to companies.",
        contactMe: "Contact Me",
        
        // About Section
        aboutTitle: "About Me",
        aboutText1: "Professional with experience in precision manufacturing processes, meeting standards such as GMP and aerospace regulations. After years in corporate environments, now focused on Full Stack development to create real and scalable solutions.",
        aboutText2: "Always learning, always building. Let's connect!",
        viewLinkedIn: "View LinkedIn profile",
        
        // Skills Section
        skillsTitle: "Technical Skills",
        
        // Projects Section
        projectsTitle: "Projects",
        crmTitle: "CRM Web App",
        crmDescription: "Full Stack project for managing customer relationships. Includes login, dashboard and database.",
        spyzerTitle: "Spyzer",
        spyzerDescription: "In development: fintech platform for real-time SP500 tracking.",
        viewDemo: "View Demo",
        viewCode: "Code",
        
        // Experience Section
        experienceTitle: "Previous Experience",
        hpRole: "Software Developer (Apr. 2025 - May 2025)",
        hexcelRole: "Production Operator (Jan. 2024 - Aug. 2024)",
        lillyRole: "Production Operator (Feb. 2022 - Jul. 2023)",
        ketersaRole: "CNC Programmer and Designer (Jun. 2021 - Feb. 2022)",
        fuymaRole: "Production Operator (Apr. 2021 - Jun. 2021)",
        
        // Contact Section
        contactTitle: "Contact",
        contactDescription: "Interested in collaborating? Write to me or contact me through my networks.",
        yourName: "Your Name",
        yourEmail: "Your Email",
        yourMessage: "Your Message",
        sendMessage: "Send Message",
        
        // Footer
        footerCopy: "© 2025 Miguel. All rights reserved."
    },
    
    de: {
        // Meta y título
        pageTitle: "Miguels Portfolio | Full Stack Entwickler",
        
        // Header
        changeLanguage: "Sprache ändern",
        changeTheme: "Farbthema ändern",
        openMenu: "Navigationsmenü öffnen",
        backToHome: "Zurück zur Startseite",
        
        // Hero Section
        heroTitle: "Miguel",
        heroSubtitle: "Full Stack Entwickler<br>Java & React",
        heroDescription: "Mit 3 Jahren Industrieerfahrung bei Eli Lilly, Hexcel und mehr. Jetzt spezialisiert auf Full Stack-Entwicklung und erstelle digitale Lösungen, die echten Mehrwert für Unternehmen schaffen.",
        contactMe: "Kontaktiere mich",
        
        // About Section
        aboutTitle: "Über mich",
        aboutText1: "Fachkraft mit Erfahrung in Präzisionsfertigungsprozessen, die Standards wie GMP und Luftfahrtvorschriften erfüllen. Nach Jahren in Unternehmensumgebungen konzentriere ich mich jetzt auf Full Stack-Entwicklung, um echte und skalierbare Lösungen zu schaffen.",
        aboutText2: "Immer lernend, immer bauend. Lass uns vernetzen!",
        viewLinkedIn: "LinkedIn-Profil anzeigen",
        
        // Skills Section
        skillsTitle: "Technische Fähigkeiten",
        
        // Projects Section
        projectsTitle: "Projekte",
        crmTitle: "CRM Web App",
        crmDescription: "Full Stack-Projekt zur Verwaltung von Kundenbeziehungen. Beinhaltet Login, Dashboard und Datenbank.",
        spyzerTitle: "Spyzer",
        spyzerDescription: "In Entwicklung: Fintech-Plattform für Echtzeit-SP500-Tracking.",
        viewDemo: "Demo ansehen",
        viewCode: "Code",
        
        // Experience Section
        experienceTitle: "Berufserfahrung",
        hpRole: "Software-Entwickler (Apr. 2025 - Mai 2025)",
        hexcelRole: "Produktionsoperator (Jan. 2024 - Aug. 2024)",
        lillyRole: "Produktionsoperator (Feb. 2022 - Jul. 2023)",
        ketersaRole: "CNC-Programmierer und Designer (Jun. 2021 - Feb. 2022)",
        fuymaRole: "Produktionsoperator (Apr. 2021 - Jun. 2021)",
        
        // Contact Section
        contactTitle: "Kontakt",
        contactDescription: "Interessiert an einer Zusammenarbeit? Schreib mir oder kontaktiere mich über meine Netzwerke.",
        yourName: "Ihr Name",
        yourEmail: "Ihre E-Mail",
        yourMessage: "Ihre Nachricht",
        sendMessage: "Nachricht senden",
        
        // Footer
        footerCopy: "© 2025 Miguel. Alle Rechte vorbehalten."
    }
};

// Variables globales para el sistema de idiomas
let currentLanguage = 'es';
const languageOrder = ['es', 'en', 'de'];
let currentLanguageIndex = 0;

// Mapeo de elementos con sus claves de traducción
const elementTranslationMap = {
    // Meta y título
    'title': 'pageTitle',
    'html': 'lang',
    
    // Header aria-labels
    '.languages': 'changeLanguage',
    '.theme': 'changeTheme',
    '.navbar': 'openMenu',
    '.logo a': 'backToHome',
    
    // Hero section
    '.hero__title': 'heroTitle',
    '.hero__subtitle': 'heroSubtitle',
    '.hero__description': 'heroDescription',
    '.hero .btn-primary': 'contactMe',
    
    // About section
    '#about .section__title': 'aboutTitle',
    '.about__text p:nth-child(1)': 'aboutText1',
    '.about__text p:nth-child(2)': 'aboutText2',
    '.about__text .btn-secondary': 'viewLinkedIn',
    
    // Skills section
    '#skills .section__title': 'skillsTitle',
    
    // Projects section
    '#projects .section__title': 'projectsTitle',
    '.project-card:nth-child(1) .project-card__title': 'crmTitle',
    '.project-card:nth-child(1) .project-card__description': 'crmDescription',
    '.project-card:nth-child(2) .project-card__title': 'spyzerTitle',
    '.project-card:nth-child(2) .project-card__description': 'spyzerDescription',
    '.btn-tertiary': 'viewDemo',
    '.project-card .btn-secondary': 'viewCode',
    
    // Experience section
    '#experience .section__title': 'experienceTitle',
    '.experience-badge:nth-child(1) p': 'hpRole',
    '.experience-badge:nth-child(2) p': 'hexcelRole',
    '.experience-badge:nth-child(3) p': 'lillyRole',
    '.experience-badge:nth-child(4) p': 'ketersaRole',
    '.experience-badge:nth-child(5) p': 'fuymaRole',
    
    // Contact section
    '#contact .section__title': 'contactTitle',
    '.contact__description': 'contactDescription',
    'input[name="name"]': 'yourName',
    'input[name="email"]': 'yourEmail',
    'textarea[name="message"]': 'yourMessage',
    '.contact__form .btn-primary': 'sendMessage',
    
    // Footer
    '.footer__copy': 'footerCopy'
};

// Función para cambiar idioma
function changeLanguage() {
    // Avanzar al siguiente idioma en el ciclo
    currentLanguageIndex = (currentLanguageIndex + 1) % languageOrder.length;
    currentLanguage = languageOrder[currentLanguageIndex];
    
    // Guardar la preferencia en localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    // Aplicar las traducciones
    applyTranslations();
    
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
}

// Función para aplicar las traducciones
function applyTranslations() {
    const currentTranslations = translations[currentLanguage];
    
    // Actualizar título de la página
    document.title = currentTranslations.pageTitle;
    
    // Iterar sobre el mapeo de elementos y aplicar traducciones
    Object.entries(elementTranslationMap).forEach(([selector, translationKey]) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const translation = currentTranslations[translationKey];
            
            if (translation) {
                // Casos especiales para diferentes tipos de elementos
                if (selector.includes('aria-label') || 
                    ['.languages', '.theme', '.navbar', '.logo a'].includes(selector)) {
                    element.setAttribute('aria-label', translation);
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', translation);
                } else {
                    // Para elementos de texto normal, permitir HTML (como <br>)
                    element.innerHTML = translation;
                }
            }
        });
    });
    
    // Manejar casos especiales que necesitan selección más específica
    handleSpecialCases(currentTranslations);
}

// Función para manejar casos especiales de traducción
function handleSpecialCases(translations) {
    // Botones "Ver Demo" - necesitan selección más específica
    const demoBtns = document.querySelectorAll('.btn-tertiary');
    demoBtns.forEach(btn => {
        if (btn.textContent.includes('Demo') || btn.textContent.includes('Ver') || btn.textContent.includes('View') || btn.textContent.includes('ansehen')) {
            btn.textContent = translations.viewDemo;
        }
    });
    
    // Botones "Código" en proyectos
    const codeBtns = document.querySelectorAll('.project-card .btn-secondary');
    codeBtns.forEach(btn => {
        btn.textContent = translations.viewCode;
    });
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

// Función para inicializar el sistema de idiomas
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
    applyTranslations();
    
    // Configurar el atributo lang del HTML
    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Agregar event listener al botón de idiomas
    const languageBtn = document.querySelector('.languages');
    if (languageBtn) {
        languageBtn.addEventListener('click', changeLanguage);
        
        // Agregar tooltip con información de idiomas
        languageBtn.setAttribute('title', 'ES → EN → DE');
    }
}

// ===== RESTO DEL SCRIPT ORIGINAL =====

// Función para cambiar tema (mantener funcionalidad existente)
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

// Loader
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Partículas flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición inicial aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Cursor personalizado
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

// Animaciones de scroll
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

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'blue') {
        document.body.setAttribute('data-theme', 'blue');
    }
    
    // Inicializar sistemas
    initializeLanguageSystem(); // ¡Importante! Inicializar el sistema de idiomas
    createParticles();
    initCustomCursor();
    handleScrollAnimations();
    
    // Ocultar loader después de un breve delay
    setTimeout(hideLoader, 1000);
});

// Event listeners adicionales
window.addEventListener('load', function() {
    hideLoader();
});