class ProductManager {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'Chapulines Tostados',
                price: 120.00,
                image: '../assets/img/products/chapulines-tostados.jpg',
                category: 'chapulines',
                description: 'Deliciosos chapulines tostados con chile y limón. Perfectos para botana o como ingrediente en tus platillos favoritos.',
                weight: '250g'
            },
            {
                id: 2,
                name: 'Tostadas de Maíz con Chapulín',
                price: 85.00,
                image: '../assets/img/products/tostadas-chapulin.jpg',
                category: 'tostadas',
                description: 'Tostadas de maíz artesanales con chapulín molido. Una deliciosa combinación de texturas y sabores tradicionales.',
                weight: '300g'
            },
            {
                id: 3,
                name: 'Gusanos de Maguey',
                price: 350.00,
                image: '../assets/img/products/gusanos-maguey.jpg',
                category: 'gusanos',
                description: 'Gusanos de maguey seleccionados y tostados. Un manjar prehispánico rico en proteínas y nutrientes.',
                weight: '200g'
            }
        ];

        this.init();
    }

    init() {
        console.log('ProductManager init started');
        this.productGrid = document.getElementById('productGrid');
        this.searchInput = document.getElementById('searchInput');
        this.categoryButtons = document.querySelectorAll('.products-filter__category');
        
        console.log('ProductManager - searchInput element:', this.searchInput);

        this.bindEvents();
        this.renderProducts();

        // Check for URL parameter to focus search input
        const urlParams = new URLSearchParams(window.location.search);
        console.log('ProductManager - URL search params:', urlParams.toString());
        if (urlParams.has('focusSearch') && this.searchInput) {
            console.log('ProductManager - focusSearch parameter found, attempting to focus search input');
            this.searchInput.focus();
        } else {
            console.log('ProductManager - focusSearch parameter not found or searchInput is null');
        }
    }

    bindEvents() {
        // Búsqueda de productos
        this.searchInput.addEventListener('input', () => {
            this.filterProducts();
        });

        // Filtrado por categoría
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.filterProducts();
            });
        });
    }

    filterProducts() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.products-filter__category.active');
        const category = activeCategory ? activeCategory.dataset.category : 'all';

        const filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || product.category === category;
            return matchesSearch && matchesCategory;
        });

        this.renderProducts(filteredProducts);
    }

    renderProducts(products = this.products) {
        if (!this.productGrid) return;

        this.productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="product-card__badge">${product.weight}</span>
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__description">${product.description}</p>
                    <div class="product-card__price">$${product.price.toFixed(2)}</div>
                    <div class="product-card__actions">
                        <button class="btn btn-primary btn-add-cart" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i>
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Agregar eventos a los botones de carrito
        this.productGrid.querySelectorAll('.btn-add-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.btn-add-cart').dataset.productId);
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    window.shoppingCart.addItem(product);
                }
            });
        });
    }
}

// Inicializar el gestor de productos
const productManager = new ProductManager(); 