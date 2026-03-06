/**
 * Mobile-only Swiper carousel for product grids.
 * On mobile (<768px): wraps product cards in Swiper structure and initializes carousel.
 * On desktop (>=768px): Swiper is disabled, grid layout is restored via CSS.
 */

export function initGridSwiper(container) {
  if (!container || typeof Swiper === 'undefined') return;

  // Destroy existing Swiper instance if present (e.g. after filter/re-render)
  if (container.swiper) {
    try { container.swiper.destroy(true, true); } catch (e) {}
  }

  // Remove stale swiper class
  container.classList.remove('swiper');

  // Only initialize Swiper on mobile — desktop uses the normal CSS grid
  if (window.innerWidth >= 768) return;

  const cards = Array.from(container.children);
  if (cards.length === 0) return;

  // Don't initialize for empty/error states
  // Also skip if fewer than 3 products — CSS 2-column grid handles those better
  const isEmptyState = cards.every(c =>
    c.classList.contains('products-empty') ||
    c.classList.contains('error-box') ||
    c.classList.contains('no-products')
  );
  if (isEmptyState) return;

  // Skip Swiper for grids with fewer than 3 products
  if (cards.length < 3) return;

  // Mark container as Swiper
  container.classList.add('swiper');

  // Wrap all product cards in swiper-wrapper > swiper-slide
  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  cards.forEach(card => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.appendChild(card);
    wrapper.appendChild(slide);
  });

  container.appendChild(wrapper);

  new Swiper(container, {
    slidesPerView: 1.5,
    spaceBetween: 16,
    grabCursor: true,
  });
}
