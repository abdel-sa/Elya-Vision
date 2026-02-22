/**
 * Cart Page
 * Renders cart, quantity controls, checkout. Uses state/cart + cart-service.
 */

import {
  getCart,
  getCartCount,
  getCartTotal,
  updateCartItemQuantity,
  removeCartItem,
  initCart,
} from './state/cart.js';
import { createCheckoutFromCart } from './services/cart-service.js';
import { updateCartBadge } from './ui/notification.js';
import { formatPrice } from './config/format.js';
import { STRINGS } from './config/strings.js';
import { updatePageTranslations, t } from './services/i18n-service.js';
import { escapeHTML } from './utils/security.js';

function getItemPriceNumber(item) {
  return typeof item.priceNumber === 'number' && !isNaN(item.priceNumber)
    ? item.priceNumber
    : parseFloat(String(item.price || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
}

function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const itemCount = document.getElementById('itemCount');
  const subtotal = document.getElementById('subtotal');
  const shipping = document.getElementById('shipping');
  const tax = document.getElementById('tax');
  const total = document.getElementById('total');

  if (itemCount) itemCount.textContent = getCartCount();

  const cartSubtitle = document.getElementById('cartSubtitle');
  if (cartSubtitle) {
    cartSubtitle.textContent = t('cart_total_items').replace('{count}', getCartCount());
  }

  if (!cart.length) {
    if (cartItemsContainer) cartItemsContainer.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'flex';
    if (subtotal) subtotal.textContent = '€0,00';
    if (shipping) shipping.textContent = '€0,00';
    if (tax) tax.textContent = '€0,00';
    if (total) total.textContent = '€0,00';
    return;
  }

  if (cartItemsContainer) {
    cartItemsContainer.style.display = 'flex';
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      cartItemsContainer.appendChild(createCartItemElement(item));
    });
  }
  if (emptyCart) emptyCart.style.display = 'none';

  if (subtotal && shipping && tax && total) {
    updateCartSummary(subtotal, shipping, tax, total);
  }
}

function createCartItemElement(item) {
  const div = document.createElement('div');
  div.className = 'cart-item';
  div.dataset.productId = String(item.id);

  const priceNum = getItemPriceNumber(item);
  const itemTotal = (priceNum * item.quantity).toFixed(2);

  div.innerHTML = `
    <div class="cart-item-image">
      <img src="${escapeHTML(item.image || '')}" alt="${escapeHTML(item.name || '')}" loading="lazy">
    </div>
    <div class="cart-item-content">
      <div class="cart-item-info">
        <div class="cart-item-brand">${escapeHTML(item.brand || '')}</div>
        <div class="cart-item-name">${escapeHTML(item.name || '')}</div>
        <div class="cart-item-price">${escapeHTML(String(item.price || ''))}</div>
        <div class="quantity-control">
          <button class="quantity-btn minus-btn" data-product-id="${escapeHTML(String(item.id))}">−</button>
          <input type="number" class="quantity-input" value="${escapeHTML(String(item.quantity))}" min="1" data-product-id="${escapeHTML(String(item.id))}">
          <button class="quantity-btn plus-btn" data-product-id="${escapeHTML(String(item.id))}">+</button>
        </div>
        <div class="cart-item-actions">
          <button class="remove-btn" data-product-id="${escapeHTML(String(item.id))}">${t(STRINGS.CART_ITEM_REMOVE)}</button>
        </div>
      </div>
      <div class="cart-item-total">${escapeHTML(formatPrice(priceNum * item.quantity))}</div>
    </div>
  `;

  return div;
}

function updateCartSummary(subtotalEl, shippingEl, taxEl, totalEl) {
  const subtotalAmount = getCartTotal();
  const shippingAmount = subtotalAmount >= 100 ? 0 : 9.99;
  const taxAmount = (subtotalAmount + shippingAmount) * 0.19;
  const totalAmount = subtotalAmount + shippingAmount + taxAmount;

  subtotalEl.textContent = formatPrice(subtotalAmount);
  shippingEl.textContent = shippingAmount === 0 ? t(STRINGS.CART_SHIPPING_FREE) : formatPrice(shippingAmount);
  taxEl.textContent = formatPrice(taxAmount);
  totalEl.textContent = formatPrice(totalAmount);
}

function setupCartEventListeners() {
  const cartItemsContainer = document.getElementById('cartItems');
  if (!cartItemsContainer) return;

  cartItemsContainer.addEventListener('click', (e) => {
    const productId = e.target.dataset?.productId;
    if (!productId) return;

    if (e.target.classList.contains('plus-btn')) {
      const input = cartItemsContainer.querySelector(`.quantity-input[data-product-id="${productId}"]`);
      const newQty = (parseInt(input?.value, 10) || 1) + 1;
      updateCartItemQuantity(productId, newQty);
      renderCart();
    } else if (e.target.classList.contains('minus-btn')) {
      const input = cartItemsContainer.querySelector(`.quantity-input[data-product-id="${productId}"]`);
      const newQty = Math.max(0, (parseInt(input?.value, 10) || 1) - 1);
      if (newQty > 0) {
        updateCartItemQuantity(productId, newQty);
        renderCart();
      }
    } else if (e.target.classList.contains('remove-btn')) {
      if (confirm(t(STRINGS.REMOVE_ITEM_CONFIRM))) {
        removeCartItem(productId);
        renderCart();
      }
    }
  });

  cartItemsContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('quantity-input')) {
      const productId = e.target.dataset.productId;
      const newQty = parseInt(e.target.value, 10);
      if (newQty > 0) {
        updateCartItemQuantity(productId, newQty);
        renderCart();
      } else {
        e.target.value = 1;
      }
    }
  });
}

function setupCheckout() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener('click', async () => {
    if (getCart().length === 0) {
      return;
    }
    checkoutBtn.textContent = t(STRINGS.CHECKOUT_LOADING);
    checkoutBtn.disabled = true;
    try {
      await createCheckoutFromCart();
    } finally {
      checkoutBtn.textContent = t(STRINGS.CHECKOUT_BTN);
      checkoutBtn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCart();

  // Apply translations
  updatePageTranslations();

  updateCartBadge(getCartCount());
  renderCart();
  setupCartEventListeners();
  setupCheckout();
});
