// Products Database (Sample Data)
// Admin anaweza kuongeza bidhaa kupitia admin panel
const productsData = [
    {
        id: 1,
        name: "Gauni la Harusi",
        price: 150000,
        discount_price: 120000,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"
    },
    {
        id: 2,
        name: "Suti ya Kiume",
        price: 200000,
        discount_price: null,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"
    },
    {
        id: 3,
        name: "Nguo ya Kitenge",
        price: 85000,
        discount_price: 65000,
        image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400"
    },
    {
        id: 4,
        name: "Gauni la Jioni",
        price: 95000,
        discount_price: null,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400"
    },
    {
        id: 5,
        name: "Shati la Kikazi",
        price: 45000,
        discount_price: 35000,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"
    },
    {
        id: 6,
        name: "Mguu wa Tende",
        price: 120000,
        discount_price: 100000,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cda2ab6?w=400"
    }
];

// Load Products
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    const loading = document.getElementById('loadingMessage');
    const noProducts = document.getElementById('noProducts');
    
    loading.style.display = 'block';
    
    // Simulate loading
    setTimeout(() => {
        loading.style.display = 'none';
        
        if (productsData.length === 0) {
            noProducts.style.display = 'block';
            return;
        }
        
        grid.innerHTML = productsData.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.name}"
                         onerror="this.src='https://via.placeholder.com/400x400/D4AF37/111?text=PENDEZA'">
                </div>
                
                <div class="product-details">
                    <h3>${product.name}</h3>
                    
                    ${product.discount_price ? `
                        <p class="original-price">
                            <del>Tsh ${product.price.toLocaleString()}</del>
                        </p>
                        <p class="discount-price gold-text">
                            Tsh ${product.discount_price.toLocaleString()}
                        </p>
                    ` : `
                        <p class="price">
                            Tsh ${product.price.toLocaleString()}
                        </p>
                    `}
                    
                    <button onclick="openOrderForm(${product.id}, '${product.name.replace(/'/g, "\\'")}')" 
                            class="btn-order">
                        🛒 AGIZA SASA
                    </button>
                </div>
            </div>
        `).join('');
        
    }, 1000);
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);
