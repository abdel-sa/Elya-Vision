/**
 * Product Card UI Component
 * Pure rendering - no business logic
 */

import { STRINGS } from '../config/strings.js';
import { t } from '../services/i18n-service.js';
import { escapeHTML } from '../utils/security.js';

/**
 * Create product card HTML
 */
export function createProductCard(product) {
  const productLink = product.handle
    ? `/pages/product.html?handle=${product.handle}`
    : `/pages/product.html?id=${product.id}`;

  const card = document.createElement('div');
  card.className = 'product-card';

  // Badge logic: Sale has priority over New
  let badge = '';
  if (product.isOnSale) {
    badge = `<span class="product-card__badge product-card__badge--sale">${t(STRINGS.PRODUCT_SALE_BADGE)}</span>`;
  } else if (product.isNew) {
    badge = `<span class="product-card__badge product-card__badge--new">${t(STRINGS.PRODUCT_NEW_BADGE)}</span>`;
  }

  // Price display: Show compare price if available
  let priceHTML = '';
  if (product.compareAtPrice) {
    priceHTML = `
      <div class="product-card__price-wrapper">
        <span class="product-card__price product-card__price--current">${escapeHTML(product.price)}</span>
        <span class="product-card__price product-card__price--compare">${escapeHTML(product.compareAtPrice)}</span>
      </div>
    `;
  } else {
    priceHTML = `<p class="product-card__price">${escapeHTML(product.price)}</p>`;
  }

  card.innerHTML = `
    <a href="${escapeHTML(productLink)}" class="product-card__link">
      <div class="product-card__image">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy" class="product-card__img">
        ${badge}
      </div>
      <div class="product-card__info">
        <p class="product-card__brand">${escapeHTML(product.brand)}</p>
        <h3 class="product-card__name">${escapeHTML(product.name)}</h3>
        ${priceHTML}
      </div>
    </a>
    <button
      class="btn btn--primary product-card__add-btn"
      data-role="add-to-cart"
      data-product-id="${escapeHTML(String(product.id))}"
      data-product-handle="${escapeHTML(product.handle || '')}"
      data-variant-id="${escapeHTML(String(product.variantId || ''))}"
      data-product-name="${escapeHTML(product.name)}"
      data-product-brand="${escapeHTML(product.brand)}"
      data-product-price="${escapeHTML(String(product.price))}"
      data-product-image="${escapeHTML(product.image)}"
      data-product-price-number="${escapeHTML(String(product.priceNumber))}">
      ${t(STRINGS.PRODUCT_ADD_TO_CART)}
    </button>
  `;

  return card;
}

/**
 * Create loading skeleton for product card
 */
export function createProductSkeleton() {
  const skeleton = document.createElement('div');
  skeleton.className = 'product-card product-card--skeleton';

  skeleton.innerHTML = `
    <div class="product-card__image product-card__image--skeleton">
      <div class="skeleton skeleton--image"></div>
    </div>
    <div class="product-card__info">
      <div class="skeleton skeleton--text skeleton--text-sm"></div>
      <div class="skeleton skeleton--text skeleton--text-md"></div>
      <div class="skeleton skeleton--text skeleton--text-sm"></div>
    </div>
    <div class="skeleton skeleton--button"></div>
  `;

  return skeleton;
}

/**
 * Create error box
 */
export function createErrorBox(message) {
  const error = document.createElement('div');
  error.className = 'error-box';

  error.innerHTML = `
    <svg class="error-box__icon" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="2"/>
      <path d="M24 14v14M24 34v0.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <p class="error-box__message">${escapeHTML(message)}</p>
  `;

  return error;
}

/**
 * Render products to container
 */
export function renderProducts(products, container) {
  if (!container) return;

  container.innerHTML = '';

  if (!products || products.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'products-empty';
    emptyMsg.textContent = t(STRINGS.FILTER_NO_PRODUCTS);
    container.appendChild(emptyMsg);
    return;
  }

  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

/**
 * Show loading skeletons
 */
export function showLoadingSkeletons(container, count = 8) {
  if (!container) return;

  container.innerHTML = '';
  container.classList.add('is-loading');

  for (let i = 0; i < count; i++) {
    const skeleton = createProductSkeleton();
    container.appendChild(skeleton);
  }
}

/**
 * Hide loading state
 */
export function hideLoading(container) {
  if (!container) return;
  container.classList.remove('is-loading');
}

/**
 * Show error in container
 */
export function showError(container, message) {
  if (!container) return;

  container.innerHTML = '';
  container.classList.add('has-error');

  const errorBox = createErrorBox(message);
  container.appendChild(errorBox);
}
