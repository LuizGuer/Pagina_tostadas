// Animaciones personalizadas
const animations = {
    // Efecto de aparición suave para elementos
    fadeIn: (element, duration = 1000) => {
        element.style.opacity = 0;
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.style.opacity = 1;
                    observer.unobserve(element);
                }
            });
        });

        observer.observe(element);
    },

    // Efecto de deslizamiento para elementos
    slideIn: (element, direction = 'left', duration = 1000) => {
        const directions = {
            left: 'translateX(-100%)',
            right: 'translateX(100%)',
            up: 'translateY(-100%)',
            down: 'translateY(100%)'
        };

        element.style.transform = directions[direction];
        element.style.transition = `transform ${duration}ms ease-in-out`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.style.transform = 'translate(0)';
                    observer.unobserve(element);
                }
            });
        });

        observer.observe(element);
    },

    // Efecto de escala para elementos
    scaleIn: (element, duration = 1000) => {
        element.style.transform = 'scale(0)';
        element.style.transition = `transform ${duration}ms ease-in-out`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.style.transform = 'scale(1)';
                    observer.unobserve(element);
                }
            });
        });

        observer.observe(element);
    }
};

// Aplicar animaciones a elementos específicos
document.addEventListener('DOMContentLoaded', () => {
    // Animaciones para las tarjetas de productos
    document.querySelectorAll('.product-card').forEach((card, index) => {
        setTimeout(() => {
            animations.fadeIn(card);
        }, index * 200);
    });

    // Animaciones para las secciones principales
    document.querySelectorAll('section').forEach(section => {
        animations.slideIn(section, 'up');
    });

    // Animaciones para imágenes
    document.querySelectorAll('.product-image img').forEach(img => {
        animations.scaleIn(img);
    });
}); 