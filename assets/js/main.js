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

    /*=============== SHOW MENU - From Example ===============*/
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close');

    console.log('Nav Menu:', navMenu);
    console.log('Nav Toggle:', navToggle);
    console.log('Nav Close:', navClose);

    /* Menu show */
    if (navToggle) {
        navToggle.addEventListener('click', () =>{
           console.log('Nav Toggle Clicked');
           navMenu.classList.add('show-menu');
           console.log('Nav Menu classes:', navMenu.classList);
        });
    }

    /* Menu hidden */
    if (navClose) {
        navClose.addEventListener('click', () =>{
           console.log('Nav Close Clicked');
           navMenu.classList.remove('show-menu');
           console.log('Nav Menu classes:', navMenu.classList);
        });
    }

    /*=============== SEARCH - From Example ===============*/
    const searchBtn = document.getElementById('search-btn');
    const search = document.getElementById('search');
    const searchClose = document.getElementById('search-close');

    console.log('Search Button element (main.js):', searchBtn);

    /* Handle Search button click */
    if (searchBtn) {
        searchBtn.addEventListener('click', function(event) {
            console.log('Search Button Clicked (main.js)');
            // Prevent default link behavior
            event.preventDefault(); 
            // Redirect to products page and add a parameter to focus the search input
            window.location.href = '/pages/productos.html?focusSearch=true';
            console.log('Redirecting to products page with focus request (main.js)');
        });
    } else {
        console.log('Search button element not found in main.js!');
    }

    /*=============== LOGIN - From Example ===============*/
    const login = document.getElementById('login'),
          loginBtn = document.getElementById('login-btn'),
          loginClose = document.getElementById('login-close');

    console.log('Login Modal:', login);
    console.log('Login Button:', loginBtn);
    console.log('Login Close:', loginClose);

    /* Login show */
    if (loginBtn) {
        loginBtn.addEventListener('click', () =>{
           console.log('Login Button Clicked');
           login.classList.add('show-login');
            console.log('Login Modal classes:', login.classList);
        });
    }

    /* Login hidden */
    if (loginClose) {
        loginClose.addEventListener('click', () =>{
           console.log('Login Close Clicked');
           login.classList.remove('show-login');
            console.log('Login Modal classes:', login.classList);
        });
    }
}); 