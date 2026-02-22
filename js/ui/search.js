/**
 * Search UI Component
 */

import { STRINGS, getSearchNoResultsText, getSearchMoreProductsText } from '../config/strings.js';
import { t } from '../services/i18n-service.js';
import { STATE_CLASSES } from '../config/constants.js';
import { escapeHTML } from '../utils/security.js';

/**
 * Open search sidebar
 */
export function openSearchSidebar() {
  const sidebar = document.querySelector('[data-role="search-sidebar"]');
  const overlay = document.querySelector('[data-role="search-overlay"]');
  const button = document.querySelector('[data-role="search-trigger"]');

  if (!sidebar) return;

  sidebar.classList.add(STATE_CLASSES.ACTIVE);
  if (overlay) overlay.classList.add(STATE_CLASSES.ACTIVE);
  if (button) button.classList.add(STATE_CLASSES.ACTIVE);

  document.body.style.overflow = 'hidden';

  // Focus input
  const input = sidebar.querySelector('[data-role="search-input"]');
  if (input) {
    setTimeout(() => input.focus(), 300);
  }
}

/**
 * Close search sidebar
 */
export function closeSearchSidebar() {
  const sidebar = document.querySelector('[data-role="search-sidebar"]');
  const overlay = document.querySelector('[data-role="search-overlay"]');
  const button = document.querySelector('[data-role="search-trigger"]');

  if (!sidebar) return;

  sidebar.classList.remove(STATE_CLASSES.ACTIVE);
  if (overlay) overlay.classList.remove(STATE_CLASSES.ACTIVE);
  if (button) button.classList.remove(STATE_CLASSES.ACTIVE);

  document.body.style.overflow = '';

  // Clear search
  const input = sidebar.querySelector('[data-role="search-input"]');
  const results = sidebar.querySelector('[data-role="search-results"]');

  if (input) input.value = '';
  if (results) {
    results.innerHTML = `<div class="search__hint">${t(STRINGS.SEARCH_HINT)}</div>`;
  }
}

/**
 * Render search results
 */
export function renderSearchResults(products, query) {
  const resultsContainer = document.querySelector('[data-role="search-results"]');
  if (!resultsContainer) return;

  // Empty query
  if (!query || query.length === 0) {
    resultsContainer.innerHTML = `<div class="search__hint">${t(STRINGS.SEARCH_HINT)}</div>`;
    return;
  }

  // No results
  if (products.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search__no-results">
        <svg class="search__no-results-icon" width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="26" cy="26" r="20" stroke="currentColor" stroke-width="3"/>
          <path d="M40 40L54 54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <p class="search__no-results-text">${escapeHTML(getSearchNoResultsText(query))}</p>
        <p class="search__no-results-hint">${t(STRINGS.SEARCH_TRY_DIFFERENT)}</p>
      </div>
    `;
    return;
  }

  // Render results
  resultsContainer.innerHTML = '';

  const limitedResults = products.slice(0, 20);

  limitedResults.forEach(product => {
    const productLink = product.handle
      ? `/pages/product.html?handle=${product.handle}`
      : `/pages/product.html?id=${product.id}`;

    const item = document.createElement('a');
    item.className = 'search__item';
    item.href = productLink;
    item.dataset.productId = product.id;

    item.innerHTML = `
      <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" class="search__item-image" loading="lazy">
      <div class="search__item-info">
        <div class="search__item-brand">${escapeHTML(product.brand)}</div>
        <div class="search__item-name">${escapeHTML(product.name)}</div>
        <div class="search__item-price">${escapeHTML(product.price)}</div>
      </div>
    `;

    resultsContainer.appendChild(item);
  });

  // Show count if more results
  if (products.length > 20) {
    const moreMsg = document.createElement('div');
    moreMsg.className = 'search__more';
    moreMsg.textContent = getSearchMoreProductsText(products.length - 20);
    resultsContainer.appendChild(moreMsg);
  }
}
