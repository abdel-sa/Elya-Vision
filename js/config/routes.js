/**
 * Central routes and link helpers
 * Use for all navigation links to avoid scattered hrefs
 */

export const ROUTES = {
  HOME: '/index.html',
  CART: '/pages/cart.html',
  SUPPORT: '/pages/support.html',
  ALL_BRILLEN: '/pages/alle-brillen.html',
  ALL_SONNENBRILLEN: '/pages/alle-sonnenbrillen.html',
  HERREN: '/pages/herren.html',
  DAMEN: '/pages/damen.html',
  UNISEX: '/pages/unisex.html',
  GET_THE_LOOK: '/pages/get-the-look.html',
  IMPRESSUM: '/pages/impressum.html',
  DATENSCHUTZ: '/pages/datenschutz.html',
  AGB: '/pages/agb.html',
  WIDERRUF: '/pages/widerruf.html',
};

/**
 * Product detail URL by handle or id
 */
export function productUrl(handle, id) {
  if (handle) return `/pages/product.html?handle=${handle}`;
  if (id) return `/pages/product.html?id=${id}`;
  return ROUTES.HOME;
}

/**
 * Brand page URL
 */
export function brandUrl(brandSlug) {
  return `/pages/brand.html?brand=${brandSlug}`;
}
