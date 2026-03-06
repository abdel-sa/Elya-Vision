/**
 * Product Service
 * Business logic for product operations
 */

import { fetchProducts, fetchProductsByCollection, fetchProductByHandle, fetchProductsByVendor } from '../api/shopify.js';
import {
  transformProducts,
  transformProductDetailed,
  setProducts,
  getAllProducts,
  clearProductsCache,
  getCachedProducts,
  cacheProducts,
  searchProducts as searchProductsState,
  filterProducts as filterProductsState
} from '../state/products.js';

/**
 * Load all products
 */
export async function loadProducts(first = 100) {
  try {
    const rawProducts = await fetchProducts(first);
    const products = transformProducts(rawProducts);

    if (products && products.length > 0) {
      // Only clear and replace cache after a successful fetch
      clearProductsCache();
      setProducts(products);
      cacheProducts(products);
      return products;
    }

    // API returned empty — fallback to cache
    const cached = getCachedProducts();
    if (cached && cached.length > 0) {
      console.warn('API returned empty, using cached products');
      setProducts(cached);
      return cached;
    }

    return [];
  } catch (error) {
    console.error('Error loading products:', error);

    // Network error — fallback to cache
    const cached = getCachedProducts();
    if (cached && cached.length > 0) {
      console.warn('API fetch failed, using cached products');
      setProducts(cached);
      return cached;
    }

    return [];
  }
}

/**
 * Collection handle mapping: HTML data-collection -> possible Shopify handles
 * Tries each handle in order until one returns products
 */
const COLLECTION_HANDLE_ALIASES = {
  'women': ['women', 'damenbrillen', 'damen'],
  'men': ['men', 'herrenbrillen', 'herren'],
  'unisex': ['unisex', 'unisex-brillen'],
  'round': ['round', 'runde-brillen', 'rund'],
  'rectangle': ['rectangle', 'rechteckige-brillen', 'rechteckig', 'eckige-brillen'],
  'aviator': ['aviator', 'pilotenbrillen', 'piloten'],
  'cat-eye': ['cat-eye', 'cat-eye-brillen'],
  'rimless': ['rimless', 'randlose-brillen', 'randlos'],
  'new-arrivals': ['new-arrivals', 'neuheiten', 'new'],
  'bestsellers': ['bestsellers', 'bestseller'],
  'sale': ['sale'],
};

/**
 * Load products by collection (tries multiple handle aliases)
 */
export async function loadProductsByCollection(collectionHandle, first = 20) {
  // Get list of handles to try
  const handlesToTry = COLLECTION_HANDLE_ALIASES[collectionHandle] || [collectionHandle];

  for (const handle of handlesToTry) {
    try {
      const rawProducts = await fetchProductsByCollection(handle, first);
      if (rawProducts && rawProducts.length > 0) {
        console.log(`✅ Collection "${collectionHandle}" loaded via handle "${handle}" (${rawProducts.length} products)`);
        return transformProducts(rawProducts);
      }
    } catch (error) {
      console.warn(`Collection handle "${handle}" failed:`, error);
    }
  }
  // Fallback: use cached products filtered by collection when all API handles fail
  const cached = getCachedProducts();
  if (cached && cached.length > 0) {
    const filtered = filterCachedByCollection(cached, collectionHandle);
    if (filtered.length > 0) {
      console.warn(`No API products for collection "${collectionHandle}", using ${filtered.length} filtered cached products`);
      return filtered;
    }
  }

  console.warn(`No products found for collection "${collectionHandle}" (tried: ${handlesToTry.join(', ')})`);
  return [];
}

/**
 * Filter cached products by collection handle
 * Maps collection handles to product attributes (tags, productType)
 */
function filterCachedByCollection(products, collectionHandle) {
  const handle = collectionHandle.toLowerCase();

  // Gender/category-based collections → filter by tags
  const tagCollections = ['men', 'women', 'unisex', 'round', 'rectangle', 'aviator', 'cat-eye', 'rimless'];
  if (tagCollections.includes(handle)) {
    // Also try alias tags (e.g. 'men' → also match 'herren')
    const tagAliases = {
      'men': ['men', 'herren', 'männer'],
      'women': ['women', 'damen', 'frauen'],
      'unisex': ['unisex'],
      'round': ['round', 'rund', 'runde'],
      'rectangle': ['rectangle', 'rechteckig', 'eckig'],
      'aviator': ['aviator', 'piloten', 'pilot'],
      'cat-eye': ['cat-eye', 'cateye'],
      'rimless': ['rimless', 'randlos'],
    };
    const validTags = tagAliases[handle] || [handle];
    return products.filter(p => {
      const productTags = (p.tags || []).map(t => t.toLowerCase());
      return validTags.some(tag => productTags.includes(tag));
    });
  }

  // Product type-based collections
  if (handle === 'all-brillen') {
    return products.filter(p => {
      const type = (p.productType || '').toLowerCase();
      return type === 'brille' || type === 'brillen';
    });
  }
  if (handle === 'all-sonnenbrillen') {
    return products.filter(p => {
      const type = (p.productType || '').toLowerCase();
      return type === 'sonnenbrille' || type === 'sonnenbrillen';
    });
  }

  // Special named collections → filter by tags
  if (handle === 'bestsellers' || handle === 'sale') {
    return products.filter(p => {
      const productTags = (p.tags || []).map(t => t.toLowerCase());
      return productTags.includes(handle);
    });
  }

  // Handle 'new-arrivals' with 'new' alias
  if (handle === 'new-arrivals') {
    return products.filter(p => {
      const productTags = (p.tags || []).map(t => t.toLowerCase());
      return productTags.includes('new-arrivals') || productTags.includes('new');
    });
  }

  // Unknown collection — return empty to avoid showing wrong products
  return [];
}

/**
 * Load single product (detailed for product page)
 */
export async function loadProductByHandle(handle) {
  try {
    const rawProduct = await fetchProductByHandle(handle);
    return rawProduct ? transformProductDetailed(rawProduct) : null;
  } catch (error) {
    console.error(`Error loading product "${handle}":`, error);
    return null;
  }
}

/**
 * Load products by vendor/brand
 * Falls back to cached products on failure
 */
export async function loadProductsByVendor(vendorName, first = 50) {
  try {
    const rawEdges = await fetchProductsByVendor(vendorName, first);
    const products = transformProducts(rawEdges || []);
    if (products && products.length > 0) {
      return products;
    }

    // API returned empty — fallback to cached products filtered by vendor
    const cached = getCachedProducts();
    if (cached && cached.length > 0) {
      const vendorProducts = cached.filter(p =>
        (p.brand || '').toLowerCase() === vendorName.toLowerCase()
      );
      if (vendorProducts.length > 0) {
        console.warn(`API returned empty for vendor "${vendorName}", using ${vendorProducts.length} cached products`);
        return vendorProducts;
      }
    }

    return [];
  } catch (error) {
    console.error(`Error loading products for vendor "${vendorName}":`, error);

    // Network error — fallback to cached products filtered by vendor
    const cached = getCachedProducts();
    if (cached && cached.length > 0) {
      const vendorProducts = cached.filter(p =>
        (p.brand || '').toLowerCase() === vendorName.toLowerCase()
      );
      if (vendorProducts.length > 0) {
        console.warn(`API fetch failed for vendor "${vendorName}", using ${vendorProducts.length} cached products`);
        return vendorProducts;
      }
    }

    return [];
  }
}

/**
 * Search products
 */
export function searchProducts(query) {
  const products = getAllProducts();
  return searchProductsState(products, query);
}

/**
 * Filter products
 */
export function filterProducts(filters, productsToFilter = null) {
  const products = productsToFilter || getAllProducts();
  return filterProductsState(products, filters);
}

/**
 * Get current products
 */
export function getProducts() {
  return getAllProducts();
}
