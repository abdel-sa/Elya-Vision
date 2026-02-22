/**
 * Centralized UI strings - Translation Keys
 * Diese Keys werden in js/i18n/translations.js aufgelöst
 */

import { t } from '../services/i18n-service.js';

export const STRINGS = {
  // Product Keys
  PRODUCT_ADD_TO_CART: 'product_add_to_cart',
  PRODUCT_ADDED_TO_CART: 'product_added_to_cart',
  PRODUCT_NEW_BADGE: 'product_new_badge',
  PRODUCT_SALE_BADGE: 'product_sale_badge',

  // Cart Keys
  CART_ADDED_SUCCESS: 'cart_added_success',
  CART_REMOVED_SUCCESS: 'cart_removed_success',
  CART_EMPTY: 'cart_empty',
  CART_ITEM_REMOVE: 'cart_item_remove',
  CART_SHIPPING_FREE: 'cart_shipping_free',

  // Search Keys
  SEARCH_PLACEHOLDER: 'search_placeholder',
  SEARCH_HINT: 'search_hint',
  SEARCH_NO_RESULTS: 'search_no_results',
  SEARCH_TRY_DIFFERENT: 'search_try_different',
  SEARCH_MORE_PRODUCTS: 'search_more_products',

  // Filter Keys
  FILTER_APPLY: 'filter_apply',
  FILTER_RESET: 'filter_reset',
  FILTER_NO_PRODUCTS: 'filter_no_products',

  // Loading Keys
  LOADING_PRODUCTS: 'loading_products',

  // Error Keys
  ERROR_LOAD_PRODUCTS: 'error_load_products',
  ERROR_INVALID_PRODUCT: 'error_invalid_product',
  ERROR_PRODUCT_NOT_IN_CART: 'error_product_not_in_cart',

  // Product page Keys
  PRODUCT_NOT_FOUND: 'product_not_found',
  PRODUCT_LOAD_ERROR: 'product_load_error',
  PRODUCT_DISPLAY_ERROR: 'product_display_error',
  IN_STOCK: 'in_stock',
  OUT_OF_STOCK: 'out_of_stock',
  COLOR_LABEL: 'color_label',
  ADDED_TO_CART: 'added_to_cart',

  // Cart page Keys
  CART_EMPTY_MESSAGE: 'cart_empty_message',
  REMOVE_ITEM_CONFIRM: 'remove_item_confirm',
  CHECKOUT_LOADING: 'checkout_loading',
  CHECKOUT_BTN: 'checkout_btn',

  // Checkout Keys
  CART_EMPTY_CHECKOUT: 'cart_empty_checkout',
  NO_VARIANT_ID: 'no_variant_id',

  // Brand page Keys
  BRAND_NOT_FOUND: 'brand_not_found',
  BRAND_NO_PRODUCTS: 'brand_no_products',
  BRAND_NO_PRODUCTS_MESSAGE: 'brand_no_products_message',
  BRAND_BACK_TO_HOME: 'brand_back_to_home',
  PRODUCT_UNAVAILABLE: 'product_unavailable',
  PRODUCT_ADDED_FEEDBACK: 'product_added_feedback',
};

/**
 * Helper Funktionen für dynamische Texte
 */
export function getCartAddedSuccessText(name) {
  return t('cart_added_success').replace('{name}', name);
}

export function getSearchNoResultsText(query) {
  return t('search_no_results').replace('{query}', query);
}

export function getColorLabelText(color) {
  return t('color_label').replace('{color}', color || t('color_default'));
}

export function getAddedToCartText(name, qty) {
  return t('added_to_cart').replace('{qty}', qty).replace('{name}', name);
}

export function getSearchMoreProductsText(count) {
  return t('search_more_products').replace('{count}', count);
}

export function getBrandNotFoundText(brand) {
  return t('brand_not_found').replace('{brand}', brand);
}
