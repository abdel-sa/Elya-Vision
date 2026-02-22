/**
 * Application constants
 */

// Storage keys
export const STORAGE_KEYS = {
  CART: 'elya_cart',
  PRODUCTS_CACHE: 'elya_shopify_products_cache',
  USER: 'elya_current_user',
};

// API Configuration
export const SHOPIFY_CONFIG = {
  storeUrl: 'elyavision.myshopify.com',
  storefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '38f75548773a9f90c31c79472a5a5517',
  apiVersion: '2024-01',
  get apiUrl() {
    return `https://${this.storeUrl}/api/${this.apiVersion}/graphql.json`;
  }
};

// UI State Classes
export const STATE_CLASSES = {
  LOADING: 'is-loading',
  ERROR: 'has-error',
  ACTIVE: 'is-active',
  DISABLED: 'is-disabled',
  HIDDEN: 'is-hidden',
  EMPTY: 'is-empty',
};

// Data Attributes
export const DATA_ATTRS = {
  PRODUCT_ID: 'data-product-id',
  PRODUCT_HANDLE: 'data-product-handle',
  VARIANT_ID: 'data-variant-id',
  ROLE: 'data-role',
};

// Cache settings
export const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
