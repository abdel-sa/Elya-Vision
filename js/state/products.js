/**
 * Product State Management
 * Handles product data state and transformations
 */

import { STORAGE_KEYS, CACHE_DURATION } from '../config/constants.js';

// Global product state
let allProducts = [];

/**
 * Get all products from state
 */
export function getAllProducts() {
  return allProducts;
}

/**
 * Set products in state
 */
export function setProducts(products) {
  allProducts = products;
}

/**
 * Transform raw Shopify product to app format
 */
export function transformProduct(shopifyProduct) {
  try {
    const image = shopifyProduct.images?.edges?.[0]?.node?.url || '/assets/images/placeholder.svg';
    const variant = shopifyProduct.variants?.edges?.[0]?.node;
    const price = parseFloat(variant?.price?.amount ?? shopifyProduct.priceRange?.minVariantPrice?.amount) || 0;
    const compareAtPrice = parseFloat(variant?.compareAtPrice?.amount) || 0;
    const variantId = variant?.id || null;
    const available = variant?.availableForSale ?? shopifyProduct.availableForSale ?? true;
    const tags = shopifyProduct.tags || [];

    // Determine if product is on sale
    const hasSaleTag = tags.some(t => t.toLowerCase() === 'sale');
    const isPriceReduced = compareAtPrice > price;
    const isOnSale = hasSaleTag || isPriceReduced;

    return {
      id: shopifyProduct.id,
      handle: shopifyProduct.handle,
      variantId: variantId,
      name: shopifyProduct.title || 'Unnamed Product',
      brand: (shopifyProduct.vendor || 'ELYA').toUpperCase(),
      productType: shopifyProduct.productType || '',
      price: `€${Math.round(price)}`,
      priceNumber: price,
      compareAtPrice: compareAtPrice > price ? `€${Math.round(compareAtPrice)}` : null,
      compareAtPriceNumber: compareAtPrice,
      isOnSale: isOnSale,
      image: image,
      color: 'Schwarz',
      availability: available ? 'inStock' : 'outOfStock',
      description: shopifyProduct.description || 'Premium eyewear collection',
      tags: tags,
      specs: {
        material: '-',
        frame_width: '-',
        bridge: '-',
        temple_length: '-',
        lens_type: '-'
      },
      reviews: [],
      rating: 0,
      isNew: false
    };
  } catch (error) {
    console.error('Error transforming product:', error, shopifyProduct);
    return null;
  }
}

/**
 * Get value from tags like "material:Acetate"
 */
function getTagValue(tags, prefix) {
  if (!tags || !Array.isArray(tags)) return null;
  const tag = tags.find(t => t.toLowerCase().startsWith(prefix.toLowerCase()));
  return tag ? tag.split(':')[1]?.trim() : null;
}

/**
 * Transform raw Shopify product to detailed app format (single product page)
 * Use when API returns productByHandle with variants, tags, multiple images
 */
export function transformProductDetailed(shopifyProduct) {
  try {
    const images = shopifyProduct.images?.edges?.map(e => e.node?.url).filter(Boolean) || [];
    const mainImage = images[0] || shopifyProduct.images?.edges?.[0]?.node?.url || '/assets/images/placeholder.svg';
    const variant = shopifyProduct.variants?.edges?.[0]?.node;
    const priceAmount = variant?.price?.amount ?? shopifyProduct.priceRange?.minVariantPrice?.amount ?? '0';
    const price = parseFloat(priceAmount) || 0;
    const compareAtPrice = parseFloat(variant?.compareAtPrice?.amount) || 0;
    const tags = shopifyProduct.tags || [];

    // Determine if product is on sale
    const hasSaleTag = tags.some(t => t.toLowerCase() === 'sale');
    const isPriceReduced = compareAtPrice > price;
    const isOnSale = hasSaleTag || isPriceReduced;

    const specs = {
      material: getTagValue(tags, 'material:') || '-',
      frame_width: getTagValue(tags, 'frame_width:') || '-',
      bridge: getTagValue(tags, 'bridge:') || '-',
      temple_length: getTagValue(tags, 'temple:') || '-',
      lens_type: getTagValue(tags, 'lens:') || '-',
    };

    return {
      id: shopifyProduct.id,
      handle: shopifyProduct.handle,
      name: shopifyProduct.title || 'Unnamed Product',
      brand: (shopifyProduct.vendor || 'ELYA').toUpperCase(),
      price: `€${Math.round(price)}`,
      priceNumber: price,
      compareAtPrice: compareAtPrice > price ? `€${Math.round(compareAtPrice)}` : null,
      compareAtPriceNumber: compareAtPrice,
      isOnSale: isOnSale,
      image: mainImage,
      images: images.length ? images : [mainImage],
      color: getTagValue(tags, 'farbe:') || 'Schwarz',
      availability: variant?.availableForSale ? 'inStock' : 'outOfStock',
      description: shopifyProduct.description || 'Premium Eyewear aus unserer exklusiven Kollektion.',
      specs,
      reviews: [],
      rating: 0,
      isNew: tags.includes('new') || false,
      variantId: variant?.id || null,
      variants: (shopifyProduct.variants?.edges || []).map(edge => ({
        id: edge.node.id,
        title: edge.node.title,
        available: edge.node.availableForSale,
      })),
    };
  } catch (error) {
    console.error('Error transforming detailed product:', error, shopifyProduct);
    return null;
  }
}

/**
 * Transform multiple products (input: array of edges with .node)
 */
export function transformProducts(shopifyProducts) {
  const nodes = Array.isArray(shopifyProducts)
    ? shopifyProducts.map(e => (e && e.node) ? e.node : e)
    : [];
  return nodes.map(node => transformProduct(node)).filter(p => p !== null);
}

/**
 * Cache products in localStorage
 */
export function cacheProducts(products) {
  const cache = {
    timestamp: Date.now(),
    products: products
  };
  localStorage.setItem(STORAGE_KEYS.PRODUCTS_CACHE, JSON.stringify(cache));
}

/**
 * Get cached products
 */
export function getCachedProducts() {
  const cached = localStorage.getItem(STORAGE_KEYS.PRODUCTS_CACHE);
  if (!cached) return null;

  const cache = JSON.parse(cached);
  const cacheAge = Date.now() - cache.timestamp;

  if (cacheAge > CACHE_DURATION) {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS_CACHE);
    return null;
  }

  return cache.products;
}

/**
 * Clear products cache
 */
export function clearProductsCache() {
  localStorage.removeItem(STORAGE_KEYS.PRODUCTS_CACHE);
}

/**
 * Search products by query
 */
export function searchProducts(products, query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => {
    const name = product.name.toLowerCase();
    const brand = product.brand.toLowerCase();
    const description = (product.description || '').toLowerCase();

    return name.includes(lowerQuery) ||
      brand.includes(lowerQuery) ||
      description.includes(lowerQuery);
  });
}

/**
 * Filter products by criteria
 */
export function filterProducts(products, filters) {
  return products.filter(product => {
    // Availability filter
    if (filters.availability?.length > 0) {
      if (!filters.availability.includes(product.availability)) {
        return false;
      }
    }

    // Color filter
    if (filters.colors?.length > 0) {
      if (!filters.colors.includes(product.color)) {
        return false;
      }
    }

    // Brand filter
    if (filters.brands?.length > 0) {
      if (!filters.brands.includes(product.brand)) {
        return false;
      }
    }

    // Price filter
    if (filters.priceMin !== undefined && product.priceNumber < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && product.priceNumber > filters.priceMax) {
      return false;
    }

    return true;
  });
}
