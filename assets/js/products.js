// Datos de productos
const products = [
    {
        id: 1,
        name: 'Chapulines Tostados',
        description: 'Chapulines tradicionales de Oaxaca',
        price: 120.00,
        category: 'chapulines',
        image: '/assets/img/chapulin.jpg',
        detailUrl: '/pages/chapulines.html'
    },
    {
        id: 2,
        name: 'Tostadas de Maíz con Chapulín',
        description: 'Tostadas artesanales con chapulines',
        price: 40.00,
        category: 'chapulines',
        image: '/assets/img/Chapulintostada.png',
        detailUrl: '/pages/tostadas_chapulin.html'
    },
    {
        id: 3,
        name: 'Gusanos de Maguey',
        description: 'Gusanos de maguey tradicionales',
        price: 350.00,
        category: 'gusanos',
        image: '/assets/img/istockphoto-1090755844-612x612.jpg',
        detailUrl: '/pages/gusanos.html'
    }
];

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

// Función para crear la tarjeta de producto
function createProductCard(product) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="price mt-auto">$${product.price.toFixed(2)} MXN</p>
                    <a href="${product.detailUrl}" class="btn btn-primary">Ver más detalles</a>
                </div>
            </div>
        </div>
    `;
}

// Función para filtrar y ordenar productos
function filterAndSortProducts() {
    let filteredProducts = [...products];
    
    // Filtrar por búsqueda
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtrar por categoría
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === selectedCategory
        );
    }
    
    // Ordenar productos
    const sortOption = sortFilter.value;
    switch (sortOption) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    // Renderizar productos
    productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Event listeners
searchInput.addEventListener('input', filterAndSortProducts);
categoryFilter.addEventListener('change', filterAndSortProducts);
sortFilter.addEventListener('change', filterAndSortProducts);

// Cargar productos inicialmente
document.addEventListener('DOMContentLoaded', () => {
    filterAndSortProducts();
    
    // Verificar si hay que enfocar el campo de búsqueda
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('focusSearch') === 'true') {
        searchInput.focus();
    }
}); 