/**
 * ELYA - Brand Page
 * Uses product-service + cart-service (no global shopify/cart).
 */
import { loadProductsByVendor } from './services/product-service.js';
import { addToCart } from './services/cart-service.js';
import { getCartCount } from './state/cart.js';
import { initCart } from './state/cart.js';
import { updateCartBadge } from './ui/notification.js';
import { initNavigation } from './ui/navigation.js';
import { updatePageTranslations, t } from './services/i18n-service.js';
import { STRINGS, getBrandNotFoundText } from './config/strings.js';
import { escapeHTML } from './utils/security.js';

// Brand data with descriptions and images
const brandData = {
    'tom-ford': {
        name: 'Tom Ford',
        displayName: 'TOM FORD',
        heroClass: 'brand-hero-tom-ford',
        logoPath: '/assets/images/brands/tom-ford-logo.svg'
    },
    'gucci': {
        name: 'Gucci',
        displayName: 'GUCCI',
        heroClass: 'brand-hero-gucci',
        logoPath: '/assets/images/brands/gucci-logo.svg'
    },
    'cazal': {
        name: 'Cazal',
        displayName: 'CAZAL',
        heroClass: 'brand-hero-cazal',
        logoPath: '/assets/images/brands/cazal-logo.svg'
    },
    'prada': {
        name: 'Prada',
        displayName: 'PRADA',
        heroClass: 'brand-hero-prada',
        logoPath: '/assets/images/brands/prada-logo.svg'
    },
    'dita': {
        name: 'Dita',
        displayName: 'DITA',
        heroClass: 'brand-hero-dita',
        logoPath: '/assets/images/brands/dita-logo.svg'
    },
    'cartier': {
        name: 'Cartier',
        displayName: 'CARTIER',
        heroClass: 'brand-hero-cartier',
        logoPath: '/assets/images/brands/cartier-logo.svg'
    },
    'miu-miu': {
        name: 'Miu Miu',
        displayName: 'MIU MIU',
        heroClass: 'brand-hero-miumiu',
        logoPath: '/assets/images/brands/miu-miu-logo.svg'
    },
    'bottega-veneta': {
        name: 'Bottega Veneta',
        displayName: 'BOTTEGA VENETA',
        heroClass: 'brand-hero-bottega',
        logoPath: '/assets/images/brands/bottega-veneta-logo.svg'
    },
    'celine': {
        name: 'Celine',
        displayName: 'CÉLINE',
        heroClass: 'brand-hero-celine',
        logoPath: '/assets/images/brands/celine-logo.svg'
    },
    'chanel': {
        name: 'Chanel',
        displayName: 'CHANEL',
        heroClass: 'brand-hero-chanel',
        logoPath: '/assets/images/brands/chanel-logo.svg'
    },
    'fendi': {
        name: 'Fendi',
        displayName: 'FENDI',
        heroClass: 'brand-hero-fendi',
        logoPath: '/assets/images/brands/fendi-logo.svg'
    },
    'loewe': {
        name: 'Loewe',
        displayName: 'LOEWE',
        heroClass: 'brand-hero-loewe',
        logoPath: '/assets/images/brands/loewe-logo.svg'
    },
    'saint-laurent': {
        name: 'Saint Laurent',
        displayName: 'SAINT LAURENT',
        heroClass: 'brand-hero-saint-laurent',
        logoPath: '/assets/images/brands/saint-laurent-logo.svg'
    }
};

// Current brand and products
let currentBrand = null;
let brandProducts = [];

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    initCart();
    initNavigation();

    // Apply translations
    updatePageTranslations();

    const urlParams = new URLSearchParams(window.location.search);
    const brandSlug = urlParams.get('brand');
    const category = urlParams.get('category'); // 'sonnenbrillen' or 'brillen'

    if (!brandSlug) {
        showError('Keine Marke angegeben');
        return;
    }

    currentBrand = brandData[brandSlug.toLowerCase()];
    if (!currentBrand) {
        showError(getBrandNotFoundText(brandSlug));
        return;
    }

    updateBrandHero();
    updatePageTitle();
    await loadBrandProducts(currentBrand.name, category);

    // Re-translate after products are loaded
    setTimeout(() => {
        updatePageTranslations();
    }, 500);

    setupFilter();
    setupSearch();
    setupSort();
    updateCartBadge(getCartCount());
});

// ========================================
// Brand Hero
// ========================================

function updateBrandHero() {
    const heroSection = document.getElementById('brandHero');
    const brandNameEl = document.getElementById('brandName');
    const brandLogoImg = document.getElementById('brandLogoImage');
    const brandDescEl = document.getElementById('brandDescription');

    if (heroSection && currentBrand.heroClass) {
        heroSection.classList.add(currentBrand.heroClass);
    }

    // Try to load brand logo, fallback to text
    if (brandLogoImg && currentBrand.logoPath) {
        brandLogoImg.src = currentBrand.logoPath;
        brandLogoImg.alt = `${currentBrand.name} Logo`;

        // Test if logo loads successfully
        brandLogoImg.onload = function () {
            brandLogoImg.style.display = 'block';
            if (brandNameEl) brandNameEl.style.display = 'none';
        };

        // Fallback to text if logo fails to load
        brandLogoImg.onerror = function () {
            brandLogoImg.style.display = 'none';
            if (brandNameEl) {
                brandNameEl.style.display = 'block';
                brandNameEl.textContent = currentBrand.displayName;
            }
        };
    } else {
        // No logo path, use text
        if (brandNameEl) {
            brandNameEl.textContent = currentBrand.displayName;
        }
    }

    if (brandDescEl) {
        // Construct translation key from brand slug (e.g. brand-desc-tom-ford -> brand_desc_tom_ford)
        const brandKey = `brand_desc_${Object.keys(brandData).find(key => brandData[key] === currentBrand).replace(/-/g, '_')}`;
        brandDescEl.textContent = t(brandKey);
    }
}

function updatePageTitle() {
    document.title = `${currentBrand.name} | Elya Vision`;
}

// ========================================
// Load Products
// ========================================

async function loadBrandProducts(brandName, category) {
    const grid = document.getElementById('brandProductGrid');
    try {
        let products = await loadProductsByVendor(brandName);

        // Filter by category if specified
        if (category && products && products.length > 0) {
            products = products.filter(product => {
                const productType = (product.productType || '').toLowerCase();
                if (category === 'sonnenbrillen') {
                    return productType === 'sonnenbrille' || productType === 'sonnenbrillen';
                } else if (category === 'brillen') {
                    return productType === 'brille' || productType === 'brillen';
                }
                return true;
            });
        }

        if (products && products.length > 0) {
            brandProducts = products;
            renderBrandProducts(products);
            updateProductCount(products.length);
        } else {
            const mockProducts = getMockProductsByBrand(brandName);
            brandProducts = mockProducts;
            renderBrandProducts(mockProducts);
            updateProductCount(mockProducts.length);
        }
    } catch (error) {
        const mockProducts = getMockProductsByBrand(brandName);
        brandProducts = mockProducts;
        renderBrandProducts(mockProducts);
        updateProductCount(mockProducts.length);
    }
}

// Mock products fallback
function getMockProductsByBrand(brandName) {
    // Sample mock products for each brand
    const mockProductTemplates = [
        { suffix: 'Classic', price: 450, color: 'Black' },
        { suffix: 'Signature', price: 520, color: 'Gold' },
        { suffix: 'Aviator', price: 495, color: 'Silver' },
        { suffix: 'Round', price: 480, color: 'Brown' },
        { suffix: 'Square', price: 550, color: 'Black' },
        { suffix: 'Vintage', price: 620, color: 'Tortoise' }
    ];

    return mockProductTemplates.map((template, index) => ({
        id: `mock-${brandName.toLowerCase()}-${index + 1}`,
        name: `${brandName} ${template.suffix}`,
        brand: brandName.toUpperCase(),
        price: `€${template.price}`,
        priceNumber: template.price,
        image: '/assets/images/placeholder.svg',
        color: template.color,
        availability: index < 4 ? 'inStock' : 'outOfStock',
        description: `Exklusive ${brandName} ${template.suffix} Kollektion.`,
        handle: `${brandName.toLowerCase()}-${template.suffix.toLowerCase()}`
    }));
}

// ========================================
// Render Products
// ========================================

function renderBrandProducts(products) {
    const grid = document.getElementById('brandProductGrid');

    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="no-products">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="2"/>
                    <path d="M20 44C20 44 24 36 32 36C40 36 44 44 44 44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="22" cy="26" r="3" fill="currentColor"/>
                    <circle cx="42" cy="26" r="3" fill="currentColor"/>
                </svg>
                <h3>${t(STRINGS.BRAND_NO_PRODUCTS)}</h3>
                <p>${t(STRINGS.BRAND_NO_PRODUCTS_MESSAGE)}</p>
                <a href="/index.html" class="btn-back">${t(STRINGS.BRAND_BACK_TO_HOME)}</a>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map(product => createProductCard(product)).join('');
    setupAddToCartButtons();
}

function createProductCard(product) {
    const isOutOfStock = product.availability === 'outOfStock';
    const isOnSale = product.isOnSale || product.compareAtPrice;

    // Badge: Sale has priority over Out of Stock
    let badge = '';
    if (isOnSale) {
        badge = `<span class="stock-badge sale-badge">${t(STRINGS.PRODUCT_SALE_BADGE)}</span>`;
    } else if (isOutOfStock) {
        badge = `<span class="stock-badge">${t(STRINGS.PRODUCT_OUT_OF_STOCK)}</span>`;
    }

    // Price display: Show compare price if available
    let priceHTML = '';
    if (product.compareAtPrice) {
        priceHTML = `
            <div class="product-price-wrapper">
                <span class="product-price product-price--sale">${product.price}</span>
                <span class="product-price product-price--original">${product.compareAtPrice}</span>
            </div>
        `;
    } else {
        priceHTML = `<span class="product-price">${product.price}</span>`;
    }

    return `
        <article class="product-card ${isOutOfStock ? 'out-of-stock' : ''} ${isOnSale ? 'on-sale' : ''}">
            <a href="/pages/product.html?handle=${product.handle}" class="product-link">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    ${badge}
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand}</span>
                    <h3 class="product-name">${product.name}</h3>
                    ${priceHTML}
                </div>
            </a>
            <button class="add-to-cart-btn"
                data-product-id="${product.id}"
                data-product-handle="${product.handle || ''}"
                data-variant-id="${product.variantId || ''}"
                data-product-name="${product.name}"
                data-product-price="${product.price}"
                data-product-image="${product.image}"
                data-product-brand="${product.brand}"
                ${isOutOfStock ? 'disabled' : ''}>
                ${isOutOfStock ? t(STRINGS.PRODUCT_UNAVAILABLE) : t(STRINGS.PRODUCT_ADD_TO_CART)}
            </button>
        </article>
    `;
}

function updateProductCount(count) {
    const countEl = document.getElementById('productCount');
    if (countEl) {
        countEl.textContent = t('brand_products_count').replace('{count}', count);
    }
}

// ========================================
// Sorting
// ========================================

function setupSort() {
    const sortSelect = document.getElementById('sortSelect');

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortedProducts = sortProducts(brandProducts, sortSelect.value);
            renderBrandProducts(sortedProducts);
        });
    }
}

function sortProducts(products, sortType) {
    const sorted = [...products];

    switch (sortType) {
        case 'price-asc':
            sorted.sort((a, b) => a.priceNumber - b.priceNumber);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.priceNumber - a.priceNumber);
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Featured - keep original order
            break;
    }

    return sorted;
}

// ========================================
// Filter
// ========================================

function setupFilter() {
    const filterBtn = document.getElementById('filterIconBtn');
    const filterSidebar = document.getElementById('filterSidebar');
    const filterClose = document.getElementById('filterClose');
    const filterOverlay = document.getElementById('filterOverlay');
    const filterApply = document.getElementById('filterApply');
    const filterReset = document.getElementById('filterReset');

    if (filterBtn && filterSidebar) {
        filterBtn.addEventListener('click', () => {
            filterSidebar.classList.add('is-active');
            if (filterOverlay) filterOverlay.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (filterClose) {
        filterClose.addEventListener('click', closeFilter);
    }

    if (filterOverlay) {
        filterOverlay.addEventListener('click', closeFilter);
    }

    if (filterApply) {
        filterApply.addEventListener('click', applyFilters);
    }

    if (filterReset) {
        filterReset.addEventListener('click', resetFilters);
    }

    // Price slider sync
    const priceSlider = document.getElementById('priceSlider');
    const priceMaxInput = document.getElementById('priceMax');
    const priceMinInput = document.getElementById('priceMin');

    if (priceSlider && priceMaxInput) {
        priceSlider.addEventListener('input', () => {
            priceMaxInput.value = priceSlider.value;
        });
    }

    if (priceMinInput) {
        priceMinInput.addEventListener('change', () => {
            const val = Math.max(0, parseInt(priceMinInput.value) || 0);
            priceMinInput.value = val;
        });
    }

    if (priceMaxInput) {
        priceMaxInput.addEventListener('change', () => {
            const val = Math.min(10000, parseInt(priceMaxInput.value) || 10000);
            priceMaxInput.value = val;
            if (priceSlider) priceSlider.value = val;
        });
    }

    // Build dynamic filter options from loaded products
    buildDynamicFilters();
}

function buildDynamicFilters() {
    if (!brandProducts || brandProducts.length === 0) return;

    // Build Typ filter (Brille / Sonnenbrille)
    const types = {};
    brandProducts.forEach(p => {
        const type = p.productType || '';
        if (type) {
            types[type] = (types[type] || 0) + 1;
        }
    });

    const typeGroup = document.getElementById('filterTypeGroup');
    const typeOptions = document.getElementById('filterTypeOptions');
    if (typeGroup && typeOptions && Object.keys(types).length > 1) {
        typeGroup.style.display = '';
        typeOptions.innerHTML = Object.entries(types).map(([type, count]) => `
            <label class="filter-checkbox">
                <input type="checkbox" name="productType" value="${escapeHTML(String(type))}">
                <span>${escapeHTML(String(type))} (${count})</span>
            </label>
        `).join('');
    }

    // Update availability counts
    const inStock = brandProducts.filter(p => p.availability === 'inStock').length;
    const outOfStock = brandProducts.filter(p => p.availability === 'outOfStock').length;
    const availOptions = document.getElementById('filterAvailability');
    if (availOptions) {
        availOptions.innerHTML = `
            <label class="filter-checkbox">
                <input type="checkbox" name="availability" value="inStock">
                <span>Auf Lager (${inStock})</span>
            </label>
            <label class="filter-checkbox">
                <input type="checkbox" name="availability" value="outOfStock">
                <span>Nicht verfügbar (${outOfStock})</span>
            </label>
        `;
    }

    // Update price range based on actual products
    const prices = brandProducts.map(p => p.priceNumber).filter(p => p > 0);
    if (prices.length > 0) {
        const maxPrice = Math.ceil(Math.max(...prices) / 100) * 100;
        const priceSlider = document.getElementById('priceSlider');
        const priceMaxInput = document.getElementById('priceMax');
        if (priceSlider) { priceSlider.max = maxPrice; priceSlider.value = maxPrice; }
        if (priceMaxInput) { priceMaxInput.max = maxPrice; priceMaxInput.value = maxPrice; }
    }
}

function closeFilter() {
    const filterSidebar = document.getElementById('filterSidebar');
    const filterOverlay = document.getElementById('filterOverlay');

    if (filterSidebar) filterSidebar.classList.remove('is-active');
    if (filterOverlay) filterOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
}

function applyFilters() {
    const priceMin = parseInt(document.getElementById('priceMin').value) || 0;
    const priceMax = parseInt(document.getElementById('priceMax').value) || 10000;

    const availabilityChecks = document.querySelectorAll('input[name="availability"]:checked');
    const availabilities = Array.from(availabilityChecks).map(cb => cb.value);

    const typeChecks = document.querySelectorAll('input[name="productType"]:checked');
    const types = Array.from(typeChecks).map(cb => cb.value);

    let filtered = brandProducts.filter(product => {
        // Price filter
        if (product.priceNumber < priceMin || product.priceNumber > priceMax) {
            return false;
        }

        // Availability filter
        if (availabilities.length > 0 && !availabilities.includes(product.availability)) {
            return false;
        }

        // Product type filter
        if (types.length > 0 && !types.includes(product.productType || '')) {
            return false;
        }

        return true;
    });

    renderBrandProducts(filtered);
    updateProductCount(filtered.length);
    closeFilter();
}

function resetFilters() {
    const priceMinInput = document.getElementById('priceMin');
    const priceMaxInput = document.getElementById('priceMax');
    const priceSlider = document.getElementById('priceSlider');

    if (priceMinInput) priceMinInput.value = 0;
    if (priceMaxInput) priceMaxInput.value = priceMaxInput.max || 10000;
    if (priceSlider) priceSlider.value = priceSlider.max || 10000;

    document.querySelectorAll('#filterSidebar input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    renderBrandProducts(brandProducts);
    updateProductCount(brandProducts.length);
}

// ========================================
// Search
// ========================================

function setupSearch() {
    const searchBtn = document.getElementById('searchIconBtn');
    const searchSidebar = document.getElementById('searchSidebar');
    const searchClose = document.getElementById('searchSidebarClose');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('sidebarSearchInput');

    if (searchBtn && searchSidebar) {
        searchBtn.addEventListener('click', () => {
            searchSidebar.classList.add('is-active');
            if (searchOverlay) searchOverlay.classList.add('is-active');
            document.body.style.overflow = 'hidden';
            if (searchInput) searchInput.focus();
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', closeSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProducts(e.target.value);
        });
    }
}

function closeSearch() {
    const searchSidebar = document.getElementById('searchSidebar');
    const searchOverlay = document.getElementById('searchOverlay');

    if (searchSidebar) searchSidebar.classList.remove('is-active');
    if (searchOverlay) searchOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
}

function searchProducts(query) {
    const resultsContainer = document.getElementById('searchSidebarResults');

    if (!query || query.length < 2) {
        resultsContainer.innerHTML = '<p class="search-hint">Mindestens 2 Zeichen eingeben...</p>';
        return;
    }

    const queryLower = query.toLowerCase();
    const results = brandProducts.filter(product =>
        product.name.toLowerCase().includes(queryLower) ||
        product.brand.toLowerCase().includes(queryLower)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = `<p class="search-no-results">${t(STRINGS.BRAND_NO_PRODUCTS)}</p>`;
        return;
    }

    resultsContainer.innerHTML = results.map(product => `
        <a href="/pages/product.html?handle=${escapeHTML(String(product.handle))}" class="search-result-item">
            <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" class="search-result-image">
            <div class="search-result-info">
                <span class="search-result-brand">${escapeHTML(product.brand)}</span>
                <span class="search-result-name">${escapeHTML(product.name)}</span>
                <span class="search-result-price">${escapeHTML(String(product.price))}</span>
            </div>
        </a>
    `).join('');
}

// ========================================
// Cart
// ========================================

function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (button.disabled) return;
            const product = {
                id: button.dataset.productId,
                handle: button.dataset.productHandle || null,
                variantId: button.dataset.variantId || null,
                name: button.dataset.productName,
                price: button.dataset.productPrice,
                image: button.dataset.productImage,
                brand: button.dataset.productBrand,
            };
            addToCart(product, 1);
            showAddedToCartFeedback(button);
            updateCartBadge(getCartCount());
        });
    });
}

function showAddedToCartFeedback(button) {
    const originalText = button.textContent;
    button.textContent = t(STRINGS.PRODUCT_ADDED_FEEDBACK);
    button.classList.add('added');

    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('added');
    }, 2000);
}


// ========================================
// Error Handling
// ========================================

function showError(message) {
    const heroSection = document.getElementById('brandHero');
    const productSection = document.querySelector('.brand-products');

    if (heroSection) {
        heroSection.innerHTML = `
            <div class="brand-hero-content error-content">
                <h1>Fehler</h1>
                <p>${escapeHTML(String(message))}</p>
                <a href="/index.html" class="btn-back">Zurück zur Startseite</a>
            </div>
        `;
    }

    if (productSection) {
        productSection.style.display = 'none';
    }
}
