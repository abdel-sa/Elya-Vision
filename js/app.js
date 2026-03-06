/**
 * Main Application Entry Point
 * Orchestrates initialization and connects all modules
 */

import { initCartService, addToCart } from './services/cart-service.js';
import { loadProducts, loadProductsByCollection, searchProducts, filterProducts } from './services/product-service.js';
import { renderProducts, showLoadingSkeletons, hideLoading, showError } from './ui/product-card.js';
import { initGridSwiper } from './ui/swiper-grid.js';
import { openSearchSidebar, closeSearchSidebar, renderSearchResults } from './ui/search.js';
import { openFilterSidebar, closeFilterSidebar, getActiveFilters, resetFilters, initPriceRangeSync } from './ui/filter.js';
import { initNavigation } from './ui/navigation.js';
import { updatePageTranslations, t } from './services/i18n-service.js';
import { STRINGS } from './config/strings.js';
import { STATE_CLASSES } from './config/constants.js';
import { cookieManager } from './ui/cookie-manager.js';

// Store current page's base products for context-aware filtering
let currentContextProducts = [];

/**
 * Initialize application
 */
async function initApp() {
  console.log('🚀 Initializing Elya Application...');

  // Initialize services
  initCartService();
  cookieManager.init();

  // Initialize UI components
  initNavigation();
  initSearch();
  initFilter();
  initAddToCartButtons();

  // Apply translations to the page
  updatePageTranslations();

  // Load products
  await initProducts();

  // Re-translate after products are loaded (for dynamically generated content)
  setTimeout(() => {
    updatePageTranslations();
  }, 500);

  console.log('✅ Application initialized');
}

/**
 * Initialize products
 */
async function initProducts() {
  const grids = document.querySelectorAll('[data-role="product-grid"]');

  // Show loading skeletons
  grids.forEach(grid => showLoadingSkeletons(grid, 4));

  try {
    // Load all products
    const allProducts = await loadProducts(250);

    if (!allProducts || allProducts.length === 0) {
      grids.forEach(grid => {
        hideLoading(grid);
        showError(grid, t(STRINGS.ERROR_LOAD_PRODUCTS));
      });
      return;
    }

    // Load collection-specific products
    const bestsellers = await loadProductsByCollection('bestsellers', 8);
    const newArrivals = await loadProductsByCollection('new-arrivals', 8);
    const saleProducts = await loadProductsByCollection('sale', 8);

    // Render to grids
    for (const grid of grids) {
      const collection = grid.dataset.collection;
      hideLoading(grid);

      if (collection === 'bestsellers') {
        const products = bestsellers.length > 0 ? bestsellers.slice(0, 4) : allProducts.slice(0, 4);
        renderProducts(products, grid);
        currentContextProducts = products;
      } else if (collection === 'new') {
        const products = newArrivals.length > 0 ? newArrivals.slice(0, 4) : allProducts.slice(4, 8);
        renderProducts(products, grid);
        currentContextProducts = products;
      } else if (collection === 'sale') {
        const products = saleProducts.length > 0 ? saleProducts.slice(0, 8) : [];
        renderProducts(products, grid);
        currentContextProducts = products;
      } else if (collection === 'all-brillen') {
        // Show only Brillen (optical glasses) - match both singular and plural
        const brillen = allProducts.filter(p => {
          const type = (p.productType || '').toLowerCase();
          return type === 'brille' || type === 'brillen';
        });
        const products = brillen.length > 0 ? brillen : allProducts;
        renderProducts(products, grid);
        currentContextProducts = products;
      } else if (collection === 'all-sonnenbrillen') {
        // Show only Sonnenbrillen (sunglasses) - match both singular and plural
        const sonnenbrillen = allProducts.filter(p => {
          const type = (p.productType || '').toLowerCase();
          return type === 'sonnenbrille' || type === 'sonnenbrillen';
        });
        const products = sonnenbrillen.length > 0 ? sonnenbrillen : allProducts;
        renderProducts(products, grid);
        currentContextProducts = products;
      } else if (collection === 'preloved') {
        // Show only preloved/vintage products (filter by tags)
        const prelovedProducts = allProducts.filter(p => {
          const tags = (p.tags || []).map(t => t.toLowerCase());
          return tags.includes('preloved') || tags.includes('vintage');
        });
        const products = prelovedProducts.length > 0 ? prelovedProducts : [];
        renderProducts(products, grid);
        currentContextProducts = products;
      } else if (collection === 'all') {
        // Show all products
        renderProducts(allProducts, grid);
        currentContextProducts = allProducts;
      } else if (collection) {
        // Dynamic collection loading (women, men, round, rectangle, aviator, cat-eye, rimless, etc.)
        const collectionProducts = await loadProductsByCollection(collection, 20);
        const products = collectionProducts.length > 0 ? collectionProducts : [];
        renderProducts(products, grid);
        currentContextProducts = products;
      }

      initGridSwiper(grid);
    }
  } catch (error) {
    console.error('Error initializing products:', error);
    grids.forEach(grid => {
      hideLoading(grid);
      showError(grid, t(STRINGS.ERROR_LOAD_PRODUCTS));
    });
  }
}

/**
 * Initialize search
 */
function initSearch() {
  const triggerBtn = document.querySelector('[data-role="search-trigger"]');
  const closeBtn = document.querySelector('[data-role="search-close"]');
  const overlay = document.querySelector('[data-role="search-overlay"]');
  const input = document.querySelector('[data-role="search-input"]');

  if (!triggerBtn) return;

  triggerBtn.addEventListener('click', openSearchSidebar);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearchSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSearchSidebar);
  }

  if (input) {
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (query.length > 0) {
        const results = searchProducts(query);
        renderSearchResults(results, query);
      } else {
        renderSearchResults([], '');
      }
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const sidebar = document.querySelector('[data-role="search-sidebar"]');
      if (sidebar && sidebar.classList.contains(STATE_CLASSES.ACTIVE)) {
        closeSearchSidebar();
      }
    }
  });
}

/**
 * Initialize filter
 */
function initFilter() {
  const triggerBtn = document.querySelector('[data-role="filter-trigger"]');
  const closeBtn = document.querySelector('[data-role="filter-close"]');
  const overlay = document.querySelector('[data-role="filter-overlay"]');
  const applyBtn = document.querySelector('[data-role="filter-apply"]');
  const resetBtn = document.querySelector('[data-role="filter-reset"]');

  if (!triggerBtn) return;

  triggerBtn.addEventListener('click', openFilterSidebar);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeFilterSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeFilterSidebar);
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', handleApplyFilters);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', handleResetFilters);
  }

  // Initialize price range sync
  initPriceRangeSync();

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const sidebar = document.querySelector('[data-role="filter-sidebar"]');
      if (sidebar && sidebar.classList.contains(STATE_CLASSES.ACTIVE)) {
        closeFilterSidebar();
      }
    }
  });
}

/**
 * Handle apply filters
 */
function handleApplyFilters() {
  const filters = getActiveFilters();

  // Check if any filters are actually active
  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.colors.length > 0 ||
    filters.availability.length > 0 ||
    filters.priceMin > 0 ||
    filters.priceMax < 1000;

  if (!hasActiveFilters) {
    alert('Bitte wähle mindestens einen Filter aus.');
    return;
  }

  // Filter within current context products
  const filtered = filterProducts(filters, currentContextProducts);

  // Render filtered products
  const grids = document.querySelectorAll('[data-role="product-grid"]');
  grids.forEach(grid => { renderProducts(filtered, grid); initGridSwiper(grid); });

  closeFilterSidebar();
}

/**
 * Handle reset filters
 */
async function handleResetFilters() {
  resetFilters();

  // Restore original context products without reloading
  const grids = document.querySelectorAll('[data-role="product-grid"]');
  grids.forEach(grid => { renderProducts(currentContextProducts, grid); initGridSwiper(grid); });
}

/**
 * Initialize add to cart buttons
 */
function initAddToCartButtons() {
  // Event delegation for dynamically added buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-role="add-to-cart"]');
    if (!btn) return;

    const product = {
      id: btn.dataset.productId,
      handle: btn.dataset.productHandle || null,
      variantId: btn.dataset.variantId || null,
      name: btn.dataset.productName,
      brand: btn.dataset.productBrand,
      price: btn.dataset.productPrice,
      image: btn.dataset.productImage,
      priceNumber: parseFloat(btn.dataset.productPriceNumber) || 0
    };

    const result = addToCart(product);

    if (result.success) {
      // Visual feedback
      const originalText = btn.textContent;
      btn.textContent = t(STRINGS.PRODUCT_ADDED_TO_CART);
      btn.classList.add(STATE_CLASSES.DISABLED);

      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove(STATE_CLASSES.DISABLED);
      }, 1500);
    }
  });
}

/**
 * Start application when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
