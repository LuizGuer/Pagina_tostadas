document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Función para crear el HTML de un item del carrito
    function createCartItemHTML(item) {
        return `
            <div class="card mb-3" data-item-id="${item.id}">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-sm btn-outline-secondary me-2 decrease-quantity">-</button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-secondary ms-2 increase-quantity">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="card-body">
                            <p class="card-text">$${(item.price * item.quantity).toFixed(2)} MXN</p>
                            <button class="btn btn-sm btn-danger remove-item">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para mostrar el mensaje de carrito vacío
    function showEmptyCartMessage() {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x mb-3 text-muted"></i>
                <h3>Tu carrito está vacío</h3>
                <p class="text-muted">Agrega algunos productos para comenzar tu compra.</p>
                <a href="productos.html" class="btn btn-primary mt-3">Ver Productos</a>
            </div>
        `;
        
        // Resetear los totales
        cartSubtotal.textContent = '$0.00 MXN';
        cartTax.textContent = '$0.00 MXN';
        cartTotal.textContent = '$0.00 MXN';
        
        // Deshabilitar botón de comprar
        if (checkoutBtn) checkoutBtn.disabled = true;
    }

    // Función para actualizar el resumen del carrito
    function updateCartSummary() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Mostrar mensaje de carrito vacío si no hay items
        if (cart.length === 0) {
            showEmptyCartMessage();
            return;
        }

        // Habilitar botón de comprar
        if (checkoutBtn) checkoutBtn.disabled = false;

        // Actualizar items del carrito
        cartItemsContainer.innerHTML = cart.map(createCartItemHTML).join('');

        // Agregar event listeners a los botones
        cartItemsContainer.querySelectorAll('.card').forEach(card => {
            const itemId = card.dataset.itemId;
            
            // Botón de incrementar
            card.querySelector('.increase-quantity').addEventListener('click', () => {
                increaseQuantity(itemId);
            });
            
            // Botón de decrementar
            card.querySelector('.decrease-quantity').addEventListener('click', () => {
                decreaseQuantity(itemId);
            });
            
            // Botón de eliminar
            card.querySelector('.remove-item').addEventListener('click', () => {
                removeFromCart(itemId);
            });
        });

        // Calcular totales
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.16;
        const total = subtotal + tax;

        // Actualizar totales en el DOM
        cartSubtotal.textContent = `$${subtotal.toFixed(2)} MXN`;
        cartTax.textContent = `$${tax.toFixed(2)} MXN`;
        cartTotal.textContent = `$${total.toFixed(2)} MXN`;

        // Actualizar el contador del carrito en el header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }

    // Event listener para el botón de comprar
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Esta funcionalidad está en construcción');
        });
    }

    // Función para aumentar la cantidad de un producto
    function increaseQuantity(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
        }
    }

    // Función para disminuir la cantidad de un producto
    function decreaseQuantity(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity === 1) {
                const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto del carrito?');
                if (confirmacion) {
                    cart.splice(itemIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartSummary();
                }
            } else {
                cart[itemIndex].quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartSummary();
            }
        }
    }

    // Función para eliminar un item del carrito
    function removeFromCart(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemToRemove = cart.find(item => item.id === itemId);
        
        if (itemToRemove) {
            const confirmacion = confirm(`¿Estás seguro de que deseas eliminar ${itemToRemove.name} del carrito?`);
            if (confirmacion) {
                const updatedCart = cart.filter(item => item.id !== itemId);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                updateCartSummary();
            }
        }
    }

    // Cargar el carrito inicialmente
    updateCartSummary();
}); 