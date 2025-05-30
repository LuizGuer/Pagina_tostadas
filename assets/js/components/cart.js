class ShoppingCart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.cartItems = document.getElementById('cartItems');
        this.cartCount = document.querySelector('.cart-count');
        this.subtotalElement = document.getElementById('subtotal');
        this.shippingElement = document.getElementById('shipping');
        this.totalElement = document.getElementById('total');
        this.clearCartBtn = document.getElementById('clearCartBtn');

        this.loadCart();
        this.bindEvents();
        this.updateCart();
    }

    bindEvents() {
        if (this.clearCartBtn) {
            this.clearCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearCart();
            });
        }
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.updateCart();
        this.saveCart();
    }

    removeItem(productId) {
        const itemToRemove = this.items.find(item => item.id === productId);
        if (itemToRemove && confirm(`¿Estás seguro de que deseas eliminar ${itemToRemove.name} del carrito?`)) {
            this.items = this.items.filter(item => item.id !== productId);
            this.updateCart();
            this.saveCart();
        }
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0 && !confirm('¿Estás seguro de que deseas eliminar este producto del carrito?')) {
                return;
            }
            
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.updateCart();
                this.saveCart();
            }
        }
    }

    clearCart() {
        if (this.items.length === 0) {
            alert('El carrito ya está vacío');
            return;
        }

        if (confirm('¿Estás seguro de que deseas vaciar el carrito? Esta acción no se puede deshacer.')) {
            this.items = [];
            this.updateCart();
            this.saveCart();
            alert('El carrito ha sido vaciado');
        }
    }

    updateCart() {
        if (this.cartItems) {
            if (this.items.length === 0) {
                this.cartItems.innerHTML = `
                    <div class="cart-empty">
                        <div class="cart-empty__icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <h2 class="cart-empty__title">Tu carrito está vacío</h2>
                        <p class="cart-empty__text">Agrega algunos productos para comenzar tu compra.</p>
                        <a href="productos.html" class="btn btn-primary">Ver Productos</a>
                    </div>
                `;
            } else {
                this.cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <div class="cart-item__image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item__content">
                            <h3 class="cart-item__title">${item.name}</h3>
                            <div class="cart-item__price">$${item.price.toFixed(2)}</div>
                            <div class="cart-item__quantity">
                                <button class="btn-quantity" onclick="window.shoppingCart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button class="btn-quantity" onclick="window.shoppingCart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <div class="cart-item__actions">
                            <button class="cart-item__remove" onclick="window.shoppingCart.removeItem(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Actualizar contador del carrito
        if (this.cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            this.cartCount.textContent = totalItems;
        }

        // Actualizar totales
        if (this.subtotalElement && this.shippingElement && this.totalElement) {
            const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 0 ? 100 : 0; // Envío fijo de $100
            const total = subtotal + shipping;

            this.subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            this.shippingElement.textContent = `$${shipping.toFixed(2)}`;
            this.totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }
}

// Inicializar el carrito
window.shoppingCart = new ShoppingCart(); 