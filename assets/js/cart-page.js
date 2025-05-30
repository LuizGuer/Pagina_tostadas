document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');

    // Función para crear el HTML de un item del carrito
    function createCartItemHTML(item) {
        return `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-sm btn-outline-secondary me-2" onclick="decreaseQuantity(${item.id})">-</button>
                                <span>${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-secondary ms-2" onclick="increaseQuantity(${item.id})">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card-body">
                            <p class="card-text">$${(item.price * item.quantity).toFixed(2)} MXN</p>
                            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para actualizar el resumen del carrito
    function updateCartSummary() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.16;
        const total = subtotal + tax;

        cartSubtotal.textContent = `$${subtotal.toFixed(2)} MXN`;
        cartTax.textContent = `$${tax.toFixed(2)} MXN`;
        cartTotal.textContent = `$${total.toFixed(2)} MXN`;

        // Actualizar el contenido del carrito
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="alert alert-info">Tu carrito está vacío</div>';
        } else {
            cartItemsContainer.innerHTML = cart.map(createCartItemHTML).join('');
        }

        // Actualizar el contador del carrito en el header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    // Event listener para el botón de comprar
    checkoutBtn.addEventListener('click', () => {
        alert('Esta funcionalidad está en construcción');
    });

    // Event listener para el botón de vaciar carrito
    clearCartBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('El carrito ya está vacío');
            return;
        }
        
        if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            localStorage.setItem('cart', '[]');
            updateCartSummary();
        }
    });

    // Función para aumentar la cantidad de un producto
    window.increaseQuantity = function(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
        }
    };

    // Función para disminuir la cantidad de un producto
    window.decreaseQuantity = function(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity === 1) {
                if (confirm('¿Estás seguro de que deseas eliminar este producto del carrito?')) {
                    cart.splice(itemIndex, 1);
                }
            } else {
                cart[itemIndex].quantity -= 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
        }
    };

    // Función para eliminar un item del carrito
    window.removeFromCart = function(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemToRemove = cart.find(item => item.id === itemId);
        
        if (itemToRemove && confirm(`¿Estás seguro de que deseas eliminar ${itemToRemove.name} del carrito?`)) {
            const updatedCart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            updateCartSummary();
        }
    };

    // Cargar el carrito inicialmente
    updateCartSummary();
}); 