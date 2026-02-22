/**
 * Product Detail Page
 * Loads product by handle/id, renders details, add to cart.
 */

import { loadProductByHandle, loadProducts } from './services/product-service.js';
import { getCartCount } from './state/cart.js';
import { addToCart, initCartService } from './services/cart-service.js';
import { updateCartBadge } from './ui/notification.js';
import { initNavigation } from './ui/navigation.js';
import { updatePageTranslations, t } from './services/i18n-service.js';
import { STRINGS, getColorLabelText, getAddedToCartText } from './config/strings.js';
import { ROUTES, productUrl } from './config/routes.js';
import { escapeHTML } from './utils/security.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize navigation and cart service
  initNavigation();
  initCartService();

  // Apply translations
  updatePageTranslations();

  const params = new URLSearchParams(window.location.search);
  const productHandle = params.get('handle');
  const productId = params.get('id');

  if (!productHandle && !productId) {
    showProductError(t(STRINGS.PRODUCT_LOAD_ERROR));
    return;
  }

  let product = null;

  if (productHandle) {
    product = await loadProductByHandle(productHandle);
  }

  if (!product && productId) {
    const all = await loadProducts(250);
    product = all.find(p => String(p.id) === productId);
  }

  if (!product) {
    showProductError(t(STRINGS.PRODUCT_LOAD_ERROR));
    return;
  }

  try {
    loadProductDetails(product);
    updateCartBadge(getCartCount());
    setupThumbnails(product);
    setupQuantityControls();
    setupAddToCart(product);

    // Re-translate after product details are loaded
    setTimeout(() => {
      updatePageTranslations();
    }, 200);
  } catch (err) {
    showProductError(t(STRINGS.PRODUCT_DISPLAY_ERROR));
  }
});

function showProductError(message) {
  const container = document.querySelector('.product-detail-container');
  if (container) {
    container.classList.add('has-error');
    container.innerHTML = `
      <div class="product-error">
        <h2 class="product-error__title">${t(STRINGS.PRODUCT_NOT_FOUND)}</h2>
        <p class="product-error__text">${escapeHTML(String(message))}</p>
        <a href="${ROUTES.HOME}" class="btn btn--link">Zurück zur Startseite</a>
      </div>
    `;
  }
}

function loadProductDetails(product) {
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('breadcrumbProduct', product.name || '');
  setText('productBrand', product.brand || '');
  setText('productName', product.name || '');
  setText('productColor', getColorLabelText(product.color));
  setText('productDescription', product.description || '');

  // Handle price display with sale support
  const priceEl = document.getElementById('productPrice');
  if (priceEl) {
    if (product.compareAtPrice) {
      // Product on sale - show both prices
      priceEl.innerHTML = `
        <span class="price-current">${escapeHTML(String(product.price))}</span>
        <span class="price-original">${escapeHTML(String(product.compareAtPrice))}</span>
      `;
    } else {
      // Regular price
      priceEl.textContent = product.price || '';
    }
  }

  // Show sale badge if product is on sale
  const isOnSale = product.isOnSale || product.compareAtPrice;
  if (isOnSale) {
    const imageWrapper = document.querySelector('.product-images');
    if (imageWrapper && !imageWrapper.querySelector('.sale-badge')) {
      const saleBadge = document.createElement('span');
      saleBadge.className = 'sale-badge';
      saleBadge.textContent = t(STRINGS.PRODUCT_SALE_BADGE);
      imageWrapper.style.position = 'relative';
      imageWrapper.appendChild(saleBadge);
    }
  }

  const availabilityEl = document.getElementById('productAvailability');
  if (availabilityEl) {
    availabilityEl.textContent = product.availability === 'inStock' ? t(STRINGS.IN_STOCK) : t(STRINGS.OUT_OF_STOCK);
    availabilityEl.classList.toggle('out-of-stock', product.availability !== 'inStock');
  }

  const specIds = ['specMaterial', 'specFrameWidth', 'specBridge', 'specTempleLength', 'specLensType'];
  const specKeys = ['material', 'frame_width', 'bridge', 'temple_length', 'lens_type'];
  specIds.forEach((id, i) => setText(id, product.specs?.[specKeys[i]] || '-'));

  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    const images = product.images && product.images.length ? product.images : (product.image ? [product.image] : []);
    mainImage.src = images[0] || product.image || '';
    mainImage.alt = product.name || '';
    const thumbnails = document.querySelectorAll('.thumbnail');
    images.forEach((url, i) => {
      if (thumbnails[i]) {
        thumbnails[i].src = url;
        thumbnails[i].alt = `${product.name} – Bild ${i + 1}`;
      }
    });
  }

  document.title = `${product.name || 'Produkt'} - Elya`;
}

function setupThumbnails(product) {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainImage');
  if (!mainImage) return;

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const images = product.images && product.images.length ? product.images : (product.image ? [product.image] : []);
      if (images[index]) mainImage.src = images[index];
    });
  });
}

function setupQuantityControls() {
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  if (!qtyInput || !qtyMinus || !qtyPlus) return;

  qtyMinus.addEventListener('click', () => {
    const v = parseInt(qtyInput.value, 10) || 1;
    if (v > 1) qtyInput.value = v - 1;
  });
  qtyPlus.addEventListener('click', () => {
    const v = parseInt(qtyInput.value, 10) || 1;
    if (v < 10) qtyInput.value = v + 1;
  });
  qtyInput.addEventListener('change', () => {
    let v = parseInt(qtyInput.value, 10) || 1;
    v = Math.max(1, Math.min(10, v));
    qtyInput.value = v;
  });
}

function showCartNotification(message) {
  const existing = document.querySelector('.cart-notification');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'cart-notification';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => {
    el.classList.add('is-hidden');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

function setupAddToCart(product) {
  const addBtn = document.getElementById('addToCartBtn');
  if (!addBtn) return;

  if (product.availability === 'outOfStock') {
    addBtn.disabled = true;
    addBtn.classList.add('disabled');
    addBtn.textContent = t(STRINGS.OUT_OF_STOCK);
    return;
  }

  addBtn.addEventListener('click', () => {
    const qtyInput = document.getElementById('qtyInput');
    const quantity = Math.max(1, Math.min(10, parseInt(qtyInput?.value, 10) || 1));
    addToCart(product, quantity);
    const message = getAddedToCartText(product.name, quantity);
    showCartNotification(message);
    if (qtyInput) qtyInput.value = 1;
    updateCartBadge(getCartCount());
  });
}
