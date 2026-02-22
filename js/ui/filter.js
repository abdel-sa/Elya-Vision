/**
 * Filter UI Component
 */

import { STATE_CLASSES } from '../config/constants.js';

/**
 * Open filter sidebar
 */
export function openFilterSidebar() {
  const sidebar = document.querySelector('[data-role="filter-sidebar"]');
  const overlay = document.querySelector('[data-role="filter-overlay"]');
  const button = document.querySelector('[data-role="filter-trigger"]');

  if (!sidebar) return;

  sidebar.classList.add(STATE_CLASSES.ACTIVE);
  if (overlay) overlay.classList.add(STATE_CLASSES.ACTIVE);
  if (button) button.classList.add(STATE_CLASSES.ACTIVE);

  document.body.style.overflow = 'hidden';
}

/**
 * Close filter sidebar
 */
export function closeFilterSidebar() {
  const sidebar = document.querySelector('[data-role="filter-sidebar"]');
  const overlay = document.querySelector('[data-role="filter-overlay"]');
  const button = document.querySelector('[data-role="filter-trigger"]');

  if (!sidebar) return;

  sidebar.classList.remove(STATE_CLASSES.ACTIVE);
  if (overlay) overlay.classList.remove(STATE_CLASSES.ACTIVE);
  if (button) button.classList.remove(STATE_CLASSES.ACTIVE);

  document.body.style.overflow = '';
}

/**
 * Get active filters from UI
 */
export function getActiveFilters() {
  const filters = {
    availability: [],
    colors: [],
    brands: [],
    priceMin: 0,
    priceMax: 1000,
  };

  // Availability
  document.querySelectorAll('[name="availability"]:checked').forEach(input => {
    filters.availability.push(input.value);
  });

  // Colors
  document.querySelectorAll('[name="color"]:checked').forEach(input => {
    filters.colors.push(input.value);
  });

  // Brands
  document.querySelectorAll('[name="brand"]:checked').forEach(input => {
    filters.brands.push(input.value);
  });

  // Price
  const priceMinInput = document.getElementById('priceMinInput');
  const priceMaxInput = document.getElementById('priceMaxInput');

  if (priceMinInput) filters.priceMin = parseInt(priceMinInput.value) || 0;
  if (priceMaxInput) filters.priceMax = parseInt(priceMaxInput.value) || 1000;

  return filters;
}

/**
 * Reset all filters
 */
export function resetFilters() {
  // Reset checkboxes
  document.querySelectorAll('.filter-checkbox input').forEach(input => {
    input.checked = false;
  });

  // Reset price sliders
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  const priceMinInput = document.getElementById('priceMinInput');
  const priceMaxInput = document.getElementById('priceMaxInput');

  if (priceMin) priceMin.value = 0;
  if (priceMax) priceMax.value = 1000;
  if (priceMinInput) priceMinInput.value = 0;
  if (priceMaxInput) priceMaxInput.value = 1000;
}

/**
 * Initialize price range sync
 */
export function initPriceRangeSync() {
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  const priceMinInput = document.getElementById('priceMinInput');
  const priceMaxInput = document.getElementById('priceMaxInput');

  if (!priceMin || !priceMax || !priceMinInput || !priceMaxInput) return;

  priceMin.addEventListener('input', function() {
    if (parseInt(this.value) > parseInt(priceMax.value)) {
      priceMax.value = this.value;
    }
    priceMinInput.value = this.value;
  });

  priceMax.addEventListener('input', function() {
    if (parseInt(this.value) < parseInt(priceMin.value)) {
      priceMin.value = this.value;
    }
    priceMaxInput.value = this.value;
  });

  priceMinInput.addEventListener('change', function() {
    const value = Math.max(0, parseInt(this.value) || 0);
    this.value = value;
    priceMin.value = value;
  });

  priceMaxInput.addEventListener('change', function() {
    const value = Math.min(1000, parseInt(this.value) || 1000);
    this.value = value;
    priceMax.value = value;
  });
}
