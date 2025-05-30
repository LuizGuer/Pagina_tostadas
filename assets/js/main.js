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
            wrap: true,
            pause: false,
            keyboard: false,
            touch: false
        });
    }

    /*=============== SEARCH ===============*/
    const searchBtn = document.getElementById('search-btn');
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

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            login.classList.add('show-login');
        });
    }

    if (loginClose) {
        loginClose.addEventListener('click', () => {
            login.classList.remove('show-login');
        });
    }
}); 