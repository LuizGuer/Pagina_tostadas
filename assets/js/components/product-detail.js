class ProductDetail {
    constructor() {
        this.init();
    }

    init() {
        this.quantityInput = document.querySelector('.input-quantity');
        this.addToCartButton = document.querySelector('.btn-add-to-cart');
        this.incrementButton = document.getElementById('increment');
        this.decrementButton = document.getElementById('decrement');
        
        this.bindEvents();
    }

    bindEvents() {
        if (this.incrementButton) {
            this.incrementButton.addEventListener('click', () => this.updateQuantity(1));
        }
        
        if (this.decrementButton) {
            this.decrementButton.addEventListener('click', () => this.updateQuantity(-1));
        }
        
        if (this.addToCartButton) {
            this.addToCartButton.addEventListener('click', () => this.addToCart());
        }
    }

    updateQuantity(change) {
        if (this.quantityInput) {
            let currentValue = parseInt(this.quantityInput.value) || 1;
            currentValue += change;
            
            // Asegurar que la cantidad no sea menor a 1
            if (currentValue < 1) currentValue = 1;
            
            this.quantityInput.value = currentValue;
        }
    }

    addToCart() {
        const productInfo = this.getProductInfo();
        if (productInfo && window.shoppingCart) {
            const quantity = parseInt(this.quantityInput.value) || 1;
            
            // Agregar el producto al carrito la cantidad de veces especificada
            for (let i = 0; i < quantity; i++) {
                window.shoppingCart.addItem(productInfo);
            }
            
            // Resetear el contador a 1 después de agregar al carrito
            if (this.quantityInput) {
                this.quantityInput.value = "1";
            }
            
            // Mostrar mensaje de éxito
            this.showNotification('Producto agregado al carrito');
        }
    }

    getProductInfo() {
        const titleElement = document.querySelector('.container-info-product h2');
        const priceElement = document.querySelector('.container-price span');
        const imageElement = document.querySelector('#TostadaChapulin');

        if (titleElement && priceElement && imageElement) {
            const title = titleElement.textContent;
            const price = parseFloat(priceElement.textContent.replace('$', ''));
            const image = imageElement.src;

            // Generar un ID único basado en el título
            const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

            return {
                id: id,
                name: title,
                price: price,
                image: image,
                quantity: 1
            };
        }
        return null;
    }

    showNotification(message) {
        // Crear el elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Agregar estilos al elemento
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease-in-out';
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar la notificación
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.productDetail = new ProductDetail();
}); 