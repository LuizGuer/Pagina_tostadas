// Inicialización de componentes
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Manejar el scroll del navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Manejar el carrusel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    }

    /*=============== SHOW MENU ===============*/
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Función para cerrar el menú
    const closeMenu = () => {
        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }
    };

    // Asegurarse de que el menú esté cerrado al inicio
    closeMenu();

    // Mostrar menú
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.add('show-menu');
        });
    }

    // Ocultar menú
    if (navClose) {
        navClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Ocultar menú cuando se hace clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('show-menu')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMenu();
            }
        }
    });

    /*=============== SEARCH ===============*/
    const searchBtn = document.getElementById('search-btn');

    /* Handle Search button click */
    if (searchBtn) {
        searchBtn.addEventListener('click', function(event) {
            event.preventDefault(); 
            window.location.href = '/pages/productos.html?focusSearch=true';
        });
    }

    /*=============== LOGIN ===============*/
    const login = document.getElementById('login');
    const loginBtn = document.getElementById('login-btn');
    const loginClose = document.getElementById('login-close');

    /* Login show */
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            login.classList.add('show-login');
        });
    }

    /* Login hidden */
    if (loginClose) {
        loginClose.addEventListener('click', () => {
            login.classList.remove('show-login');
        });
    }
}); 