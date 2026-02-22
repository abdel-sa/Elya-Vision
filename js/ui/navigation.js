/**
 * Drill-Down Navigation (Multi-Level Breadcrumb Style)
 * Clean, step-by-step mobile menu like COH eyewear
 */

import { STATE_CLASSES } from '../config/constants.js';
import { openSearchSidebar } from './search.js';
import { openFilterSidebar } from './filter.js';
import { initLanguageSelector } from './language-selector.js';
import { escapeHTML } from '../utils/security.js';

// Navigation state
let navigationStack = [];
let currentLevel = 0;

/**
 * Initialize navigation
 */
export function initNavigation() {
  console.log('🔧 Drill-Down Navigation Init');

  const burgerMenu = document.getElementById('burgerMenu');
  const navMenu = document.getElementById('navMenu');

  if (!burgerMenu || !navMenu) {
    console.error('❌ Navigation elements not found');
    return;
  }

  // Create mobile menu wrapper for drill-down
  createMobileMenuStructure(navMenu);

  // Burger Menu Click
  burgerMenu.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = navMenu.classList.contains(STATE_CLASSES.ACTIVE);
    toggleMenu(!isOpen);
  });

  // Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains(STATE_CLASSES.ACTIVE)) {
      toggleMenu(false);
    }
  });

  // Initialize header icons
  initHeaderIcons();

  // Initialize language selector
  initLanguageSelector();

  console.log('✅ Drill-Down Navigation initialized');
}

/**
 * Create mobile menu structure
 */
function createMobileMenuStructure(navMenu) {
  // Create mobile menu container
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu-container';
  mobileMenu.id = 'mobileMenuContainer';

  // Create header with close button and title
  const header = document.createElement('div');
  header.className = 'mobile-menu-header';
  header.innerHTML = `
    <button class="mobile-menu-back" id="mobileMenuBack" style="display: none;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <h2 class="mobile-menu-title" id="mobileMenuTitle"></h2>
    <button class="mobile-menu-close" id="mobileMenuClose">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  // Create views container (holds all menu levels)
  const viewsContainer = document.createElement('div');
  viewsContainer.className = 'mobile-menu-views';
  viewsContainer.id = 'mobileMenuViews';

  // Build Level 1 (Main Menu)
  const level1 = buildLevel1(navMenu);
  viewsContainer.appendChild(level1);

  // Build Level 2 and Level 3 views (for each submenu parent)
  const submenus = navMenu.querySelectorAll('.nav-item-with-submenu');
  submenus.forEach((submenu) => {
    const { level2, level3Views } = buildLevel2(submenu);
    viewsContainer.appendChild(level2);
    // Append all level 3 views
    level3Views.forEach(level3 => viewsContainer.appendChild(level3));
  });

  mobileMenu.appendChild(header);
  mobileMenu.appendChild(viewsContainer);

  // Insert mobile menu as first child of navMenu
  navMenu.insertBefore(mobileMenu, navMenu.firstChild);

  // Set up event handlers
  setupMobileMenuHandlers();
}

/**
 * Build Level 1 (Main Menu)
 */
function buildLevel1(navMenu) {
  const level1 = document.createElement('div');
  level1.className = 'mobile-menu-view mobile-menu-view--active';
  level1.setAttribute('data-level', '1');
  level1.setAttribute('data-view-id', 'main');

  const list = document.createElement('ul');
  list.className = 'mobile-menu-list';

  // Get all top-level nav items
  const navItems = navMenu.querySelectorAll(':scope > li');

  navItems.forEach((item) => {
    const link = item.querySelector('a.nav-link');
    if (!link) return;

    const hasSubmenu = item.classList.contains('nav-item-with-submenu');
    const text = link.textContent.trim();
    const href = link.getAttribute('href');

    const listItem = document.createElement('li');
    listItem.className = 'mobile-menu-item';

    if (hasSubmenu) {
      // Item with submenu - drill down
      const button = document.createElement('button');
      button.className = 'mobile-menu-link mobile-menu-link--submenu';
      button.setAttribute('data-action', 'drill-down');
      button.setAttribute('data-target', text.toLowerCase().replace(/\s+/g, '-'));
      button.innerHTML = `
        <span>${escapeHTML(text)}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      listItem.appendChild(button);
    } else {
      // Regular link
      const anchor = document.createElement('a');
      anchor.className = 'mobile-menu-link';
      anchor.href = href;
      anchor.innerHTML = `<span>${escapeHTML(text)}</span>`;
      listItem.appendChild(anchor);
    }

    list.appendChild(listItem);
  });

  level1.appendChild(list);
  return level1;
}

/**
 * Build Level 2 (Submenu - KATEGORIEN, MARKEN, GET THE LOOK)
 */
function buildLevel2(submenuItem) {
  const trigger = submenuItem.querySelector(':scope > a.nav-link');
  const text = trigger.textContent.trim();
  const viewId = text.toLowerCase().replace(/\s+/g, '-');

  const level2 = document.createElement('div');
  level2.className = 'mobile-menu-view';
  level2.setAttribute('data-level', '2');
  level2.setAttribute('data-view-id', viewId);
  level2.setAttribute('data-parent', 'main');

  const list = document.createElement('ul');
  list.className = 'mobile-menu-list';

  // Collect level 3 views
  const level3Views = [];

  // Get all mega-columns (KATEGORIEN, MARKEN, GET THE LOOK)
  const megaColumns = submenuItem.querySelectorAll('.mega-column');

  megaColumns.forEach((column) => {
    const heading = column.querySelector('h3');
    const columnText = heading ? heading.textContent.trim() : 'KATEGORIE';
    const columnId = columnText.toLowerCase().replace(/\s+/g, '-');

    // Create item for this column
    const listItem = document.createElement('li');
    listItem.className = 'mobile-menu-item';

    const button = document.createElement('button');
    button.className = 'mobile-menu-link mobile-menu-link--submenu';
    button.setAttribute('data-action', 'drill-down');
    button.setAttribute('data-target', `${viewId}-${columnId}`);
    button.innerHTML = `
      <span>${escapeHTML(columnText)}</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
    listItem.appendChild(button);
    list.appendChild(listItem);

    // Build Level 3 for this column
    const level3 = buildLevel3(column, viewId, columnId, columnText);
    level3Views.push(level3);
  });

  level2.appendChild(list);
  return { level2, level3Views };
}

/**
 * Build Level 3 (Final Links - Categories, Brands, Looks)
 */
function buildLevel3(column, parentViewId, columnId, columnTitle) {
  const viewId = `${parentViewId}-${columnId}`;

  const level3 = document.createElement('div');
  level3.className = 'mobile-menu-view';
  level3.setAttribute('data-level', '3');
  level3.setAttribute('data-view-id', viewId);
  level3.setAttribute('data-parent', parentViewId);
  level3.setAttribute('data-title', columnTitle);

  const list = document.createElement('ul');
  list.className = 'mobile-menu-list';

  // Get all links in this column
  const links = column.querySelectorAll('ul li a');

  links.forEach((link) => {
    const text = link.textContent.trim();
    const href = link.getAttribute('href');

    const listItem = document.createElement('li');
    listItem.className = 'mobile-menu-item';

    const anchor = document.createElement('a');
    anchor.className = 'mobile-menu-link';
    anchor.href = href;
    anchor.innerHTML = `<span>${escapeHTML(text)}</span>`;

    listItem.appendChild(anchor);
    list.appendChild(listItem);
  });

  level3.appendChild(list);
  return level3;
}

/**
 * Setup mobile menu event handlers
 */
function setupMobileMenuHandlers() {
  const mobileMenu = document.getElementById('mobileMenuContainer');
  const backBtn = document.getElementById('mobileMenuBack');
  const closeBtn = document.getElementById('mobileMenuClose');
  const viewsContainer = document.getElementById('mobileMenuViews');

  if (!mobileMenu || !backBtn || !closeBtn || !viewsContainer) return;

  // Close button
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu(false);
  });

  // Back button
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navigateBack();
  });

  // Drill-down buttons
  viewsContainer.addEventListener('click', (e) => {
    const button = e.target.closest('[data-action="drill-down"]');
    if (button) {
      e.preventDefault();
      const targetViewId = button.getAttribute('data-target');
      navigateForward(targetViewId);
    }
  });

  // Regular links - close menu after click
  viewsContainer.addEventListener('click', (e) => {
    const link = e.target.closest('a.mobile-menu-link');
    if (link) {
      setTimeout(() => {
        toggleMenu(false);
      }, 100);
    }
  });
}

/**
 * Navigate forward to a view
 */
function navigateForward(targetViewId) {
  const viewsContainer = document.getElementById('mobileMenuViews');
  const currentView = viewsContainer.querySelector('.mobile-menu-view--active');
  const targetView = viewsContainer.querySelector(`[data-view-id="${targetViewId}"]`);

  if (!targetView) {
    console.error(`View not found: ${targetViewId}`);
    return;
  }

  // Add current view to stack
  const currentViewId = currentView.getAttribute('data-view-id');
  navigationStack.push(currentViewId);

  // Update level
  currentLevel = parseInt(targetView.getAttribute('data-level'), 10);

  // Slide out current, slide in target
  currentView.classList.remove('mobile-menu-view--active');
  currentView.classList.add('mobile-menu-view--exit');

  targetView.classList.add('mobile-menu-view--active');
  targetView.classList.remove('mobile-menu-view--exit');

  // Update header
  updateMobileMenuHeader(targetView);

  console.log(`📂 Navigated to: ${targetViewId} (level ${currentLevel})`);
}

/**
 * Navigate back
 */
function navigateBack() {
  if (navigationStack.length === 0) return;

  const viewsContainer = document.getElementById('mobileMenuViews');
  const currentView = viewsContainer.querySelector('.mobile-menu-view--active');
  const previousViewId = navigationStack.pop();
  const previousView = viewsContainer.querySelector(`[data-view-id="${previousViewId}"]`);

  if (!previousView) {
    console.error(`Previous view not found: ${previousViewId}`);
    return;
  }

  // Update level
  currentLevel = parseInt(previousView.getAttribute('data-level'), 10);

  // Slide out current, slide in previous
  currentView.classList.remove('mobile-menu-view--active');
  currentView.classList.add('mobile-menu-view--exit');

  previousView.classList.add('mobile-menu-view--active');
  previousView.classList.remove('mobile-menu-view--exit');

  // Update header
  updateMobileMenuHeader(previousView);

  console.log(`🔙 Navigated back to: ${previousViewId} (level ${currentLevel})`);
}

/**
 * Update mobile menu header (title and back button)
 */
function updateMobileMenuHeader(view) {
  const backBtn = document.getElementById('mobileMenuBack');
  const titleEl = document.getElementById('mobileMenuTitle');
  const level = parseInt(view.getAttribute('data-level'), 10);
  const viewId = view.getAttribute('data-view-id');

  // Show/hide back button
  if (level === 1) {
    backBtn.style.display = 'none';
    titleEl.textContent = '';
  } else {
    backBtn.style.display = 'flex';

    // Set title
    const customTitle = view.getAttribute('data-title');
    if (customTitle) {
      titleEl.textContent = customTitle;
    } else {
      const formattedTitle = viewId.replace(/-/g, ' ').toUpperCase();
      titleEl.textContent = formattedTitle;
    }
  }
}

/**
 * Toggle menu open/close
 */
function toggleMenu(open) {
  const navMenu = document.getElementById('navMenu');
  const burgerMenu = document.getElementById('burgerMenu');

  if (open) {
    navMenu.classList.add(STATE_CLASSES.ACTIVE);
    burgerMenu.classList.add(STATE_CLASSES.ACTIVE);
    document.body.style.overflow = 'hidden';

    // Reset to level 1
    resetToLevel1();

    console.log('🍔 Menu OPENED');
  } else {
    navMenu.classList.remove(STATE_CLASSES.ACTIVE);
    burgerMenu.classList.remove(STATE_CLASSES.ACTIVE);
    document.body.style.overflow = '';

    console.log('🍔 Menu CLOSED');
  }
}

/**
 * Reset navigation to level 1
 */
function resetToLevel1() {
  const viewsContainer = document.getElementById('mobileMenuViews');
  const allViews = viewsContainer.querySelectorAll('.mobile-menu-view');
  const level1View = viewsContainer.querySelector('[data-level="1"]');

  // Clear all active states
  allViews.forEach(view => {
    view.classList.remove('mobile-menu-view--active', 'mobile-menu-view--exit');
  });

  // Activate level 1
  level1View.classList.add('mobile-menu-view--active');

  // Reset state
  navigationStack = [];
  currentLevel = 1;

  // Update header
  updateMobileMenuHeader(level1View);
}

/**
 * Initialize header icons (search + filter)
 */
function initHeaderIcons() {
  const searchIcon = document.querySelector('[data-role="search-trigger"]');
  const filterIcon = document.querySelector('[data-role="filter-trigger"]');

  if (searchIcon) {
    searchIcon.addEventListener('click', (e) => {
      e.preventDefault();
      openSearchSidebar();
    });
  }

  if (filterIcon) {
    filterIcon.addEventListener('click', (e) => {
      e.preventDefault();
      openFilterSidebar();
    });
  }
}
