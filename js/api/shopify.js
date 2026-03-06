/**
 * Shopify Storefront API Integration
 * Pure API layer - no UI, no state management
 */

import { SHOPIFY_CONFIG } from '../config/constants.js';

/**
 * Base fetch function for Shopify API
 */
async function shopifyFetch(query, variables = {}) {
  try {
    const response = await fetch(SHOPIFY_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontToken
      },
      body: JSON.stringify({ query, variables })
    });

    const data = await response.json();

    if (data.errors) {
      console.error('Shopify API Error:', data.errors);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('Shopify Fetch Error:', error);
    return null;
  }
}

/**
 * Get all products
 */
export async function fetchProducts(first = 100) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            tags
            availableForSale
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { first });
  return response?.products?.edges || [];
}

/**
 * Get single product by handle
 */
export async function fetchProductByHandle(handle) {
  const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        vendor
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        tags
      }
    }
  `;

  const response = await shopifyFetch(query, { handle });
  return response?.productByHandle || null;
}

/**
 * Get products by collection
 */
export async function fetchProductsByCollection(collectionHandle, first = 20) {
  const query = `
    query GetCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        handle
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              vendor
              tags
              availableForSale
              productType
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { handle: collectionHandle, first });
  return response?.collectionByHandle?.products?.edges || [];
}

/**
 * Get products by vendor
 */
export async function fetchProductsByVendor(vendorName, first = 50) {
  const query = `
    query GetProductsByVendor($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            tags
            availableForSale
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, {
    query: `vendor:"${vendorName}"`,
    first
  });
  return response?.products?.edges || [];
}

/**
 * Create Shopify cart and get checkout URL
 */
export async function createCart(lineItems = []) {
  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }))
    }
  };

  const response = await shopifyFetch(query, variables);

  if (!response?.cartCreate || response.cartCreate.userErrors?.length > 0) {
    console.error('Cart creation errors:', response?.cartCreate?.userErrors);
    return null;
  }

  return {
    id: response.cartCreate.cart.id,
    webUrl: response.cartCreate.cart.checkoutUrl
  };
}

/**
 * Get all collections
 */
export async function fetchCollections(first = 20) {
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch(query, { first });
  return response?.collections?.edges || [];
}
