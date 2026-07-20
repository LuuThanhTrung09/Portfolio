// Inventory Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Product data for quick view
    const productData = [
        {
            name: "Emperor's Collection",
            category: "Traditional Set",
            price: "$189.99",
            image: "https://i.pinimg.com/736x/7c/82/a9/7c82a9c0e9c9c6c6b4f6e8d3c8f5e9f3.jpg",
            description: "Exquisite porcelain tea set with hand-painted dragon motifs. This luxurious collection represents the pinnacle of traditional Chinese tea culture. Each piece is meticulously crafted by master artisans using techniques passed down through generations.",
            features: [
                "Hand-painted traditional dragon motifs",
                "Premium porcelain construction",
                "Includes 1 teapot (800ml), 6 tea cups, and serving tray",
                "Comes in elegant gift box with certificate",
                "Microwave and dishwasher safe (hand wash recommended)",
                "Perfect for special occasions and tea ceremonies"
            ]
        },
        {
            name: "Zen Garden Set",
            category: "Modern Set",
            price: "$149.99",
            image: "https://i.pinimg.com/736x/94/3a/e8/943ae8b8f5c7f3c8c5a6e8d3c8f5e9f3.jpg",
            description: "Minimalist Japanese-inspired tea set with natural bamboo tray and ceramic teaware. This contemporary design brings tranquility and mindfulness to your daily tea ritual.",
            features: [
                "Sustainable bamboo serving tray",
                "High-quality ceramic teapot and cups",
                "Includes teapot (600ml) and 4 cups",
                "Eco-friendly and sustainable materials",
                "Modern minimalist design",
                "Easy to clean and maintain"
            ]
        },
        {
            name: "Classic Jasmine Set",
            category: "Traditional Set",
            price: "$89.99",
            image: "https://i.pinimg.com/736x/5b/2c/d4/5b2cd4e8c7f3c8c5a6e8d3c8f5e9f3.jpg",
            description: "Traditional white porcelain tea set perfect for jasmine and green teas. Features delicate floral pattern that complements the natural beauty of tea.",
            features: [
                "Pure white porcelain with floral accents",
                "Includes teapot (700ml) and 6 tea cups",
                "Perfect temperature retention",
                "Classic and timeless design",
                "Ideal for jasmine and green teas",
                "Great value for quality"
            ]
        },
        {
            name: "Contemporary Glass Set",
            category: "Modern Set",
            price: "$119.99",
            image: "https://i.pinimg.com/736x/a2/7e/3c/a27e3c8c7f3c8c5a6e8d3c8f5e9f3.jpg",
            description: "Modern double-wall glass teapot with infuser and matching cups. Watch your tea bloom beautifully through the transparent glass while enjoying perfect temperature control.",
            features: [
                "Premium borosilicate glass construction",
                "Double-wall insulation keeps tea hot longer",
                "Includes teapot with infuser and 4 cups",
                "Heat resistant up to 150°C",
                "See-through design showcases tea blooming",
                "Removable stainless steel infuser"
            ]
        },
        {
            name: "Beginner's Essential Set",
            category: "Starter Set",
            price: "$45.99",
            image: "https://i.pinimg.com/736x/e9/4f/1a/e94f1a8c7f3c8c5a6e8d3c8f5e9f3.jpg",
            description: "Perfect starter set for tea enthusiasts. Includes everything you need to begin your tea journey with quality and affordability.",
            features: [
                "Complete beginner-friendly set",
                "Includes teapot (500ml) and 4 cups",
                "Durable ceramic construction",
                "Affordable without compromising quality",
                "Simple and elegant design",
                "Great gift for tea beginners"
            ]
        },
        {
            name: "Royal Dynasty Set",
            category: "Traditional Set",
            price: "$259.99",
            image: "https://i.pinimg.com/736x/c3/8d/5e/c38d5e8c7f3c8c5a6e8d3c8f5e9f3.jpg",
            description: "Luxurious gold-trimmed porcelain set with intricate lotus flower design. Limited edition collection that represents the height of elegance and craftsmanship.",
            features: [
                "24K gold trim accents",
                "Hand-painted lotus flower motif",
                "Includes teapot (900ml), 6 cups, 6 saucers, and serving tray",
                "Limited edition - numbered certificate",
                "Premium gift packaging",
                "Collector's item and family heirloom quality"
            ]
        },
        {
            name: "Minimalist Ceramic Set",
            category: "Modern Set",
            price: "$79.99",
            image: "https://i.pinimg.com/736x/7d/9b/2f/7d9b2f8c7f3c8c5a6e8d3c8f5e9f3.jpg",
            description: "Sleek matte finish ceramic tea set in neutral tones. Perfect for modern home aesthetics and daily use.",
            features: [
                "Elegant matte finish in neutral colors",
                "High-fired ceramic for durability",
                "Includes teapot (650ml) and 4 cups",
                "Dishwasher and microwave safe",
                "Scandinavian-inspired design",
                "Stackable for easy storage"
            ]
        },
        {
            name: "Daily Brew Set",
            category: "Starter Set",
            price: "$59.99",
            image: "https://i.pinimg.com/736x/b1/6c/4e/b16c4e8c7f3c8c5a6e8d3c8f5e9f3.jpg",
            description: "Practical and durable tea set for everyday use. Simple yet elegant design that makes daily tea time special.",
            features: [
                "Durable construction for daily use",
                "Includes teapot (550ml) and 4 cups",
                "Simple and functional design",
                "Easy to clean and care for",
                "Great value for money",
                "Perfect for home or office"
            ]
        },
        {
            name: "Cherry Blossom Set",
            category: "Traditional Set",
            price: "$129.99",
            image: "https://i.pinimg.com/736x/f8/a3/7b/f8a37b8c7f3c8c5a6e8d3c8f5e9f3.jpg",
            description: "Beautiful sakura-themed tea set with delicate pink cherry blossom decorations. Captures the essence of Japanese spring.",
            features: [
                "Hand-painted cherry blossom design",
                "Porcelain construction",
                "Includes teapot (700ml) and 6 cups",
                "Part of our Spring Collection",
                "Beautiful pink and white color palette",
                "Perfect for spring tea gatherings"
            ]
        }
    ];

    // Get all products
    const products = document.querySelectorAll('.product-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const noResults = document.getElementById('noResults');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    function filterProducts(filter) {
        let visibleCount = 0;

        products.forEach(product => {
            const categories = product.getAttribute('data-category');
            
            if (filter === 'all') {
                product.classList.remove('hidden');
                visibleCount++;
            } else {
                if (categories.includes(filter)) {
                    product.classList.remove('hidden');
                    visibleCount++;
                } else {
                    product.classList.add('hidden');
                }
            }
        });

        // Show/hide no results message
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            let visibleCount = 0;

            products.forEach(product => {
                const name = product.getAttribute('data-name').toLowerCase();
                const category = product.getAttribute('data-category').toLowerCase();
                
                if (name.includes(searchTerm) || category.includes(searchTerm)) {
                    if (!product.classList.contains('hidden')) {
                        product.style.display = 'block';
                        visibleCount++;
                    }
                } else {
                    product.style.display = 'none';
                }
            });

            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        });
    }

    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const productsArray = Array.from(products);
            const productsGrid = document.getElementById('productsGrid');

            if (sortValue === 'price-low') {
                productsArray.sort((a, b) => {
                    return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
                });
            } else if (sortValue === 'price-high') {
                productsArray.sort((a, b) => {
                    return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
                });
            } else if (sortValue === 'name') {
                productsArray.sort((a, b) => {
                    return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
                });
            }

            // Re-append sorted products
            if (sortValue !== 'default') {
                productsArray.forEach(product => {
                    productsGrid.appendChild(product);
                });
            }
        });
    }

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Add animation
            this.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
            this.style.background = '#5a7b2f';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to Cart';
                this.style.background = '';
            }, 2000);
        });
    });
});

// Quick View Modal functionality
function openQuickView(index) {
    const modal = document.getElementById('quickViewModal');
    const quickViewBody = document.getElementById('quickViewBody');
    const product = productData[index];

    // Create quick view content
    const content = `
        <div class="quick-view-content">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-details">
                <span class="quick-view-category">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="quick-view-price">${product.price}</div>
                <p class="quick-view-description">${product.description}</p>
                
                <div class="quick-view-features">
                    <h4>Features & Specifications:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="quick-view-actions">
                    <button class="btn-add-to-cart-large" onclick="addToCartQuick('${product.name}')">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                    <button class="btn-wishlist">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    quickViewBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function addToCartQuick(productName) {
    const btn = document.querySelector('.btn-add-to-cart-large');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added to Cart!';
    btn.style.background = '#5a7b2f';
    
    setTimeout(() => {
        closeQuickView();
    }, 1500);
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal events
document.addEventListener('DOMContentLoaded', function() {
    const quickViewClose = document.getElementById('quickViewClose');
    const quickViewOverlay = document.getElementById('quickViewOverlay');

    if (quickViewClose) {
        quickViewClose.addEventListener('click', closeQuickView);
    }

    if (quickViewOverlay) {
        quickViewOverlay.addEventListener('click', closeQuickView);
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuickView();
        }
    });
});