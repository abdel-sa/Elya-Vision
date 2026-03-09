/**
 * Cart Drawer (Side Cart)
 * Luxury slide-in cart experience — injected into every page dynamically.
 */

import { getCart, getCartTotal } from '../state/cart.js';
import { updateCart, removeFromCart, createCheckoutFromCart } from '../services/cart-service.js';
import { updateCartBadge } from './notification.js';
import { getCartCount } from '../state/cart.js';
import { formatPrice } from '../config/format.js';
import { t } from '../services/i18n-service.js';

// ─── HTML Injection ─────────────────────────────────────────────────────────

/**
 * Inject the cart drawer HTML into <body> once.
 * Must be called before any open/render calls.
 */
export function injectCartDrawer() {
  if (document.getElementById('cartDrawer')) return; // already injected

  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cartOverlay';
  overlay.setAttribute('aria-hidden', 'true');

  const drawer = document.createElement('div');
  drawer.className = 'cart-drawer';
  drawer.id = 'cartDrawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', 'Warenkorb');

  drawer.innerHTML = `
    <div class="cart-drawer__header">
      <span class="cart-drawer__title">WARENKORB</span>
      <button class="cart-drawer__close" id="cartDrawerClose" aria-label="Schließen">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div class="cart-drawer__body" id="cartDrawerBody">
      <!-- Items rendered here -->
    </div>

    <div class="cart-drawer__footer" id="cartDrawerFooter">
      <!-- Total + CTA rendered here -->
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  // ── Event Listeners ──────────────────────────────────────────────────────
  overlay.addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerClose').addEventListener('click', closeCartDrawer);

  // Keyboard: close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('cart-drawer-open')) {
      closeCartDrawer();
    }
  });

  // Delegated events for quantity changes and remove buttons inside drawer
  document.getElementById('cartDrawerBody').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-drawer-action]');
    if (!btn) return;

    const action = btn.dataset.drawerAction;
    const productId = btn.dataset.productId;
    const currentQty = parseInt(btn.dataset.currentQty, 10) || 1;

    if (action === 'increase') {
      updateCart(productId, currentQty + 1);
    } else if (action === 'decrease') {
      if (currentQty <= 1) {
        removeFromCart(productId);
      } else {
        updateCart(productId, currentQty - 1);
      }
    } else if (action === 'remove') {
      removeFromCart(productId);
    }

    renderCartDrawer();
    updateCartBadge(getCartCount());
  });

  // Checkout button (delegated from footer)
  document.getElementById('cartDrawerFooter').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-drawer-action="checkout"]');
    if (!btn) return;

    btn.disabled = true;
    btn.textContent = 'WIRD GELADEN…';
    try {
      await createCheckoutFromCart();
    } finally {
      btn.disabled = false;
      btn.textContent = 'SICHER ZUR KASSE';
    }
  });
}

// ─── Open / Close ────────────────────────────────────────────────────────────

export function openCartDrawer() {
  renderCartDrawer();
  document.body.classList.add('cart-drawer-open');
  document.getElementById('cartOverlay').removeAttribute('aria-hidden');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

export function closeCartDrawer() {
  document.body.classList.remove('cart-drawer-open');
  document.getElementById('cartOverlay').setAttribute('aria-hidden', 'true');
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ─── Render ──────────────────────────────────────────────────────────────────

export function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody');
  const footer = document.getElementById('cartDrawerFooter');
  if (!body || !footer) return;

  const cart = getCart();

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-drawer__empty">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M6 9H9L12 30C12.36 33 14.64 36 18 36H36C39.36 36 41.64 33 42 30L45 12H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="21" cy="39" r="2" fill="currentColor"/>
          <circle cx="36" cy="39" r="2" fill="currentColor"/>
        </svg>
        <p class="cart-drawer__empty-text">Ihr Warenkorb ist leer.</p>
        <a href="index.html" class="cart-drawer__continue-link" onclick="closeCartDrawerGlobal()">Weiter einkaufen →</a>
      </div>
    `;
    footer.innerHTML = '';
    return;
  }

  // ── Items ────────────────────────────────────────────────────────────────
  body.innerHTML = cart.map(item => {
    const price = typeof item.priceNumber === 'number' && !isNaN(item.priceNumber)
      ? item.priceNumber
      : parseFloat(String(item.price || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

    const itemTotal = formatPrice(price * item.quantity);
    const imageSrc = item.image || '';
    const name = item.name || '';
    const brand = item.brand || '';

    return `
      <div class="cart-drawer__item" data-item-id="${item.id}">
        <div class="cart-drawer__item-image">
          ${imageSrc
            ? `<img src="${imageSrc}" alt="${name}" loading="lazy">`
            : `<div class="cart-drawer__item-image-placeholder"></div>`}
        </div>
        <div class="cart-drawer__item-details">
          <div class="cart-drawer__item-brand">${brand}</div>
          <div class="cart-drawer__item-name">${name}</div>
          <div class="cart-drawer__item-price">${itemTotal}</div>
          <div class="cart-drawer__item-controls">
            <div class="cart-drawer__qty">
              <button class="cart-drawer__qty-btn" data-drawer-action="decrease" data-product-id="${item.id}" data-current-qty="${item.quantity}" aria-label="Weniger">−</button>
              <span class="cart-drawer__qty-count">${item.quantity}</span>
              <button class="cart-drawer__qty-btn" data-drawer-action="increase" data-product-id="${item.id}" data-current-qty="${item.quantity}" aria-label="Mehr">+</button>
            </div>
            <button class="cart-drawer__remove" data-drawer-action="remove" data-product-id="${item.id}" aria-label="Entfernen">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // ── Footer ────────────────────────────────────────────────────────────────
  const total = getCartTotal();
  const shipping = total >= 100 ? 'Kostenlos' : '€ 9,99';

  footer.innerHTML = `
    <div class="cart-drawer__totals">
      <div class="cart-drawer__totals-row">
        <span>Zwischensumme</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="cart-drawer__totals-row cart-drawer__totals-row--shipping">
        <span>Versand</span>
        <span>${shipping}</span>
      </div>
      ${total < 100 ? `<p class="cart-drawer__free-shipping-hint">Noch ${formatPrice(100 - total)} bis zum kostenlosen Versand</p>` : ''}
    </div>
    <button class="cart-drawer__checkout-btn" data-drawer-action="checkout">
      SICHER ZUR KASSE
    </button>
    <a href="cart.html" class="cart-drawer__cart-link">Warenkorb ansehen</a>
  `;
}

// Expose close globally for onclick in empty state link
window.closeCartDrawerGlobal = closeCartDrawer;
