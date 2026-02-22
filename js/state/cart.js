/**
 * Cart State Management
 * Handles cart data state
 */

import { STORAGE_KEYS } from '../config/constants.js';

/**
 * Initialize cart in localStorage
 */
export function initCart() {
  if (!localStorage.getItem(STORAGE_KEYS.CART)) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }
}

/**
 * Get cart from localStorage
 */
export function getCart() {
  const cart = localStorage.getItem(STORAGE_KEYS.CART);
  return cart ? JSON.parse(cart) : [];
}

/**
 * Save cart to localStorage
 */
export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

/**
 * Clear cart
 */
export function clearCart() {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
}

/**
 * Get cart item count
 */
export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get cart total
 */
export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const price = item.priceNumber || extractPrice(item.price);
    return total + (price * item.quantity);
  }, 0);
}

/**
 * Extract numeric price from string
 */
function extractPrice(priceString) {
  if (typeof priceString === 'number') return priceString;
  const match = priceString.match(/[\d.,]+/);
  return match ? parseFloat(match[0].replace(',', '.')) : 0;
}

/**
 * Find item in cart by product ID
 */
export function findCartItem(productId) {
  const cart = getCart();
  const id = String(productId);
  return cart.find(item => String(item.id) === id);
}

/**
 * Add item to cart
 */
export function addCartItem(product, quantity = 1) {
  const cart = getCart();
  const productId = String(product.id);
  const existingItem = cart.find(item => String(item.id) === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      handle: product.handle || null,
      variantId: product.variantId || (product.variants && product.variants[0]?.id) || null,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: quantity,
      priceNumber: extractPrice(product.price)
    });
  }

  saveCart(cart);
  return cart;
}

/**
 * Remove item from cart
 */
export function removeCartItem(productId) {
  const id = String(productId);
  let cart = getCart();
  cart = cart.filter(item => String(item.id) !== id);
  saveCart(cart);
  return cart;
}

/**
 * Update cart item quantity
 */
export function updateCartItemQuantity(productId, quantity) {
  if (quantity <= 0) {
    return removeCartItem(productId);
  }

  const id = String(productId);
  const cart = getCart();
  const item = cart.find(item => String(item.id) === id);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }

  return cart;
}
