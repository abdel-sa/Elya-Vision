/**
 * Central formatting helpers
 */

/**
 * Format price to EUR (e.g. 99.5 -> "€99,50")
 */
export function formatPrice(price) {
  if (typeof price !== 'number' || isNaN(price)) return '€0,00';
  return '€' + price.toFixed(2).replace('.', ',');
}

/**
 * Extract numeric price from string (e.g. "€99" -> 99)
 */
export function parsePrice(priceString) {
  if (typeof priceString === 'number' && !isNaN(priceString)) return priceString;
  if (!priceString) return 0;
  const match = String(priceString).match(/[\d.,]+/);
  return match ? parseFloat(match[0].replace(',', '.')) : 0;
}
