class ProductFilter {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'Chapulines Tostados',
                description: 'Chapulines tradicionales de Oaxaca',
                price: 120.00,
                category: 'chapulines',
                url: '/pages/chapulines.html'
            },
            {
                id: 2,
                name: 'Tostadas de Maíz con Chapulín',
                description: 'Tostadas artesanales con chapulines',
                price: 45.00,
                category: 'tostadas',
                url: '/pages/tostadas_chapulin.html'
            },
            {
                id: 3,
                name: 'Gusanos de Maguey',
                description: 'Gusanos de maguey tradicionales',
                price: 360.00,
                category: 'gusanos',
                url: '/pages/gusanos.html'
            }
        ];

        this.init();
    }

    init() {
        this.searchInput = document.getElementById('searchInput');
        this.categoryButtons = document.querySelectorAll('.products-filter__category');
        this.productGrid = document.getElementById('productGrid');

        this.bindEvents();
        this.filterProducts();
    }

    bindEvents() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.filterProducts());
        }

        this.categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.categoryButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
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

    renderProducts(products) {
        if (!this.productGrid) return;

        if (products.length === 0) {
            this.productGrid.innerHTML = `
                <div class="col-12 text-center">
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otra búsqueda o categoría</p>
                </div>
            `;
            return;
        }

        this.productGrid.innerHTML = products.map(product => `
            <div class="col-md-4">
                <div class="card product-card">
                    <img src="/assets/img/${this.getProductImage(product.category)}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="price">$${product.price.toFixed(2)} MXN</p>
                        <a href="${product.url}" class="btn btn-primary">Ver más detalles</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getProductImage(category) {
        const images = {
            'chapulines': 'chapulin.jpg',
            'tostadas': 'Tostada.png',
            'gusanos': 'istockphoto-1090755844-612x612.jpg'
        };
        return images[category] || 'default.jpg';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ProductFilter();
}); 