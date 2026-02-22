/**
 * Cart Service
 * Business logic for cart operations
 */

import { addCartItem, removeCartItem, updateCartItemQuantity, getCart, getCartCount, initCart } from '../state/cart.js';
import { createCart } from '../api/shopify.js';
import { showNotification, updateCartBadge } from '../ui/notification.js';
import { STRINGS } from '../config/strings.js';

/**
 * Initialize cart service
 */
export function initCartService() {
  initCart();
  refreshCartBadge();
}

/**
 * Add product to cart
 */
export function addToCart(product, quantity = 1) {
  if (!product || !product.id) {
    showNotification(STRINGS.ERROR_INVALID_PRODUCT, 'error');
    return { success: false, error: STRINGS.ERROR_INVALID_PRODUCT };
  }

  addCartItem(product, quantity);
  refreshCartBadge();
  showNotification(STRINGS.CART_ADDED_SUCCESS(product.name), 'success');

  return { success: true, message: STRINGS.CART_ADDED_SUCCESS(product.name) };
}

/**
 * Remove product from cart
 */
export function removeFromCart(productId) {
  removeCartItem(productId);
  refreshCartBadge();
  showNotification(STRINGS.CART_REMOVED_SUCCESS, 'success');

  return { success: true };
}

/**
 * Update cart item
 */
export function updateCart(productId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  updateCartItemQuantity(productId, quantity);
  refreshCartBadge();

  return { success: true };
}

/**
 * Refresh cart badge
 */
function refreshCartBadge() {
  const count = getCartCount();
  updateCartBadge(count);
}

/**
 * Get current cart
 */
export function getCurrentCart() {
  return getCart();
}

/**
 * Create Shopify checkout from current cart and redirect
 */
export async function createCheckoutFromCart() {
  const cart = getCart();

  if (cart.length === 0) {
    showNotification(STRINGS.CART_EMPTY, 'error');
    return null;
  }

  const shopifyItems = cart.filter(item => item.variantId);
  if (shopifyItems.length === 0) {
    showNotification(STRINGS.NO_VARIANT_ID, 'error');
    return null;
  }

  const lineItems = shopifyItems.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity
  }));

  try {
    const checkout = await createCart(lineItems);
    if (checkout?.webUrl) {
      window.location.href = checkout.webUrl;
      return checkout;
    }
    showNotification(STRINGS.ERROR_LOAD_PRODUCTS, 'error');
    return null;
  } catch (error) {
    console.error('Checkout error:', error);
    showNotification('Es gab einen Fehler beim Erstellen der Bestellung. Bitte versuchen Sie es erneut.', 'error');
    return null;
  }
}
