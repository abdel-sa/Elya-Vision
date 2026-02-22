import { translations } from '../i18n/locales.js';

/**
 * Get current language from localStorage or default to 'de'
 */
export function getCurrentLanguage() {
  return localStorage.getItem('elya_language') || 'de';
}

/**
 * Set current language
 */
export function setCurrentLanguage(lang) {
  if (!translations[lang]) {
    console.error(`Language "${lang}" not supported`);
    return false;
  }
  localStorage.setItem('elya_language', lang);
  return true;
}

/**
 * Get translation for a key
 */
export function t(key) {
  const lang = getCurrentLanguage();
  return translations[lang]?.[key] || translations.de[key] || key;
}

/**
 * Update all translatable elements on the page
 * PRIMÄR: data-i18n Attribute
 * FALLBACK: Text-Matching für dynamisch generierte Inhalte
 */
export function updatePageTranslations() {
  // PRIMARY METHOD: Update elements with data-i18n attributes
  updateDataI18nElements();

  // FALLBACK METHODS: Legacy text-matching for dynamic content
  // (Diese sollten schrittweise durch data-i18n ersetzt werden)
  translateNavigationItems();
  translateCommonElements();

  // DEPRECATED: Diese sollten durch data-i18n Attribute ersetzt werden
  // Nur noch für Backwards-Kompatibilität aktiv
  translateHeroSections();
  translateSectionTitles();
}

/**
 * PRIMARY: Update all elements with data-i18n attributes
 */
function updateDataI18nElements() {
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    const translation = t(key);

    // Handle different element types
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      // For input fields, update placeholder
      if (el.hasAttribute('placeholder')) {
        el.placeholder = translation;
      } else {
        el.value = translation;
      }
    } else if (el.tagName === 'IMG') {
      // For images, update alt text
      el.alt = translation;
    } else {
      // For all other visible elements: always update textContent
      el.textContent = translation;
    }

    // Independently update title attribute if present
    if (el.hasAttribute('title')) {
      el.setAttribute('title', translation);
    }

    // Independently update aria-label if present
    if (el.hasAttribute('aria-label')) {
      el.setAttribute('aria-label', translation);
    }
  });

  // Handle data-i18n-placeholder attributes (separate from data-i18n)
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const translation = t(key);
    if (translation !== key) {
      el.placeholder = translation;
    }
  });

  console.log(`✅ Translated ${elements.length} elements via data-i18n, ${placeholderElements.length} placeholders`);
}

/**
 * Translate navigation items
 */
function translateNavigationItems() {
  const lang = getCurrentLanguage();

  // Main navigation links
  const navLinks = {
    "WHAT'S NEW?": t('nav_whats_new'),
    "SONNENBRILLEN": t('nav_sonnenbrillen'),
    "BRILLEN": t('nav_brillen'),
    "PRELOVED": t('nav_preloved'),
    "SALE": t('nav_sale')
  };

  // Update main nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    const text = link.textContent.trim();
    if (navLinks[text]) {
      link.textContent = navLinks[text];
    }
  });

  // Update mega menu headings
  document.querySelectorAll('.mega-column h3').forEach(heading => {
    const text = heading.textContent.trim();
    if (text === 'KATEGORIEN') heading.textContent = t('cat_kategorien');
    if (text === 'MARKEN') heading.textContent = t('cat_marken');
    if (text === 'GET THE LOOK') heading.textContent = t('cat_get_the_look');
  });

  // Update category links
  const categoryLinks = {
    'Herren': t('cat_herren'),
    'Damen': t('cat_damen'),
    'Unisex': t('cat_unisex'),
    'Alle Sonnenbrillen': t('cat_alle_sonnenbrillen'),
    'Alle Brillen': t('cat_alle_brillen')
  };

  // COMPREHENSIVE shape/style links with bidirectional mappings
  const allShapeTexts = [
    // Runde Brillen
    { de: 'Runde Brillen', en: 'Round Eyeglasses', fr: 'Lunettes Rondes', es: 'Gafas Redondas' },
    // Rechteckige Brillen
    { de: 'Rechteckige Brillen', en: 'Rectangle Eyeglasses', fr: 'Lunettes Rectangulaires', es: 'Gafas Rectangulares' },
    // Pilotbrillen
    { de: 'Pilotbrillen', en: 'Aviator Eyeglasses', fr: 'Lunettes Aviateur', es: 'Gafas Aviador' },
    // Randlos
    { de: 'Randlos', en: 'Rimless', fr: 'Sans Monture', es: 'Sin Montura' },
    // Rechteckige Sonnenbrillen
    { de: 'Rechteckige Sonnenbrillen', en: 'Rectangle Sunglasses', fr: 'Lunettes de Soleil Rectangulaires', es: 'Gafas de Sol Rectangulares' },
    // Pilotenbrillen
    { de: 'Pilotenbrillen', en: 'Aviator Sunglasses', fr: 'Lunettes de Soleil Aviateur', es: 'Gafas de Sol Aviador' },
    // Runde Sonnenbrillen
    { de: 'Runde Sonnenbrillen', en: 'Round Sunglasses', fr: 'Lunettes de Soleil Rondes', es: 'Gafas de Sol Redondas' },
    // Cat-Eye Sonnenbrillen
    { de: 'Cat-Eye Sonnenbrillen', en: 'Cat-Eye Sunglasses', fr: 'Lunettes de Soleil Œil de Chat', es: 'Gafas de Sol Ojo de Gato' }
  ];

  // Create bidirectional mapping
  const shapeLinks = {};
  allShapeTexts.forEach(shape => {
    // Map from each language to all languages
    ['de', 'en', 'fr', 'es'].forEach(fromLang => {
      shapeLinks[shape[fromLang]] = shape;
    });
  });

  // Update all links in mega menus (also mobile menu links)
  document.querySelectorAll('.mega-column ul li a, .mobile-menu-link').forEach(link => {
    const text = link.textContent.trim();

    // Check category links first
    if (categoryLinks[text]) {
      link.textContent = categoryLinks[text];
    }
    // Then check shape/style links
    else if (shapeLinks[text] && shapeLinks[text][lang]) {
      link.textContent = shapeLinks[text][lang];
    }
  });
}

/**
 * Translate hero sections
 */
function translateHeroSections() {
  const lang = getCurrentLanguage();

  // Hero headlines based on page
  const heroMappings = {
    'Zeitlose Eleganz': {
      de: 'Zeitlose Eleganz',
      en: 'Timeless Elegance',
      fr: 'Élégance Intemporelle',
      es: 'Elegancia Atemporal'
    },
    'Exklusive Brillenkunst aus den renommiertesten Modehäusern der Welt': {
      de: 'Exklusive Brillenkunst aus den renommiertesten Modehäusern der Welt',
      en: 'Exclusive eyewear from the world\'s most renowned fashion houses',
      fr: 'Lunetterie exclusive des maisons de mode les plus renommées au monde',
      es: 'Gafas exclusivas de las casas de moda más prestigiosas del mundo'
    },
    'Alle Brillen': {
      de: 'Alle Brillen',
      en: 'All Eyeglasses',
      fr: 'Toutes les Lunettes',
      es: 'Todas las Gafas'
    },
    'Alle Sonnenbrillen': {
      de: 'Alle Sonnenbrillen',
      en: 'All Sunglasses',
      fr: 'Toutes les Lunettes de Soleil',
      es: 'Todas las Gafas de Sol'
    },
    'Preloved Vintage': {
      de: 'Preloved Vintage',
      en: 'Preloved Vintage',
      fr: 'Vintage d\'Occasion',
      es: 'Vintage de Segunda Mano'
    },
    'Unser komplettes Brillen-Sortiment': {
      de: 'Unser komplettes Brillen-Sortiment',
      en: 'Our complete eyeglasses collection',
      fr: 'Notre collection complète de lunettes',
      es: 'Nuestra colección completa de gafas'
    },
    'Einzigartige Vintage-Schätze und seltene Klassiker aus vergangenen Epochen': {
      de: 'Einzigartige Vintage-Schätze und seltene Klassiker aus vergangenen Epochen',
      en: 'Unique vintage treasures and rare classics from past eras',
      fr: 'Trésors vintage uniques et classiques rares d\'époques révolues',
      es: 'Tesoros vintage únicos y clásicos raros de épocas pasadas'
    }
  };

  // Translate hero headlines
  document.querySelectorAll('.hero-headline, .hero-title, h1, .section__title').forEach(el => {
    const text = el.textContent.trim();
    if (heroMappings[text] && heroMappings[text][lang]) {
      el.textContent = heroMappings[text][lang];
    }
  });

  // Translate hero sublines
  document.querySelectorAll('.hero-subline, .hero-subtitle, .section__subtitle').forEach(el => {
    const text = el.textContent.trim();
    if (heroMappings[text] && heroMappings[text][lang]) {
      el.textContent = heroMappings[text][lang];
    }
  });
}

/**
 * Translate section titles - COMPREHENSIVE with all variations
 */
function translateSectionTitles() {
  const lang = getCurrentLanguage();

  // Create bidirectional mappings - map ALL language variations to ALL others
  const sectionMappings = {
    // "Unsere Bestseller" variations (actual HTML text)
    'Unsere Bestseller': {
      de: 'Unsere Bestseller',
      en: 'Our Bestsellers',
      fr: 'Nos Meilleures Ventes',
      es: 'Nuestros Más Vendidos'
    },
    'Our Bestsellers': {
      de: 'Unsere Bestseller',
      en: 'Our Bestsellers',
      fr: 'Nos Meilleures Ventes',
      es: 'Nuestros Más Vendidos'
    },
    'Nos Meilleures Ventes': {
      de: 'Unsere Bestseller',
      en: 'Our Bestsellers',
      fr: 'Nos Meilleures Ventes',
      es: 'Nuestros Más Vendidos'
    },
    'Nuestros Más Vendidos': {
      de: 'Unsere Bestseller',
      en: 'Our Bestsellers',
      fr: 'Nos Meilleures Ventes',
      es: 'Nuestros Más Vendidos'
    },
    // UPPERCASE variations
    'UNSERE BESTSELLER': {
      de: 'UNSERE BESTSELLER',
      en: 'OUR BESTSELLERS',
      fr: 'NOS MEILLEURES VENTES',
      es: 'NUESTROS MÁS VENDIDOS'
    },
    'OUR BESTSELLERS': {
      de: 'UNSERE BESTSELLER',
      en: 'OUR BESTSELLERS',
      fr: 'NOS MEILLEURES VENTES',
      es: 'NUESTROS MÁS VENDIDOS'
    },
    'NOS MEILLEURES VENTES': {
      de: 'UNSERE BESTSELLER',
      en: 'OUR BESTSELLERS',
      fr: 'NOS MEILLEURES VENTES',
      es: 'NUESTROS MÁS VENDIDOS'
    },
    'NUESTROS MÁS VENDIDOS': {
      de: 'UNSERE BESTSELLER',
      en: 'OUR BESTSELLERS',
      fr: 'NOS MEILLEURES VENTES',
      es: 'NUESTROS MÁS VENDIDOS'
    },
    // "Neu Eingetroffen" variations (actual HTML text)
    'Neu Eingetroffen': {
      de: 'Neu Eingetroffen',
      en: 'New Arrivals',
      fr: 'Nouveautés',
      es: 'Nuevos Productos'
    },
    'New Arrivals': {
      de: 'Neu Eingetroffen',
      en: 'New Arrivals',
      fr: 'Nouveautés',
      es: 'Nuevos Productos'
    },
    'Nouveautés': {
      de: 'Neu Eingetroffen',
      en: 'New Arrivals',
      fr: 'Nouveautés',
      es: 'Nuevos Productos'
    },
    'Nuevos Productos': {
      de: 'Neu Eingetroffen',
      en: 'New Arrivals',
      fr: 'Nouveautés',
      es: 'Nuevos Productos'
    },
    // UPPERCASE variations
    'NEU EINGETROFFEN': {
      de: 'NEU EINGETROFFEN',
      en: 'NEW ARRIVALS',
      fr: 'NOUVEAUTÉS',
      es: 'NUEVOS PRODUCTOS'
    },
    'NEW ARRIVALS': {
      de: 'NEU EINGETROFFEN',
      en: 'NEW ARRIVALS',
      fr: 'NOUVEAUTÉS',
      es: 'NUEVOS PRODUCTOS'
    },
    'NOUVEAUTÉS': {
      de: 'NEU EINGETROFFEN',
      en: 'NEW ARRIVALS',
      fr: 'NOUVEAUTÉS',
      es: 'NUEVOS PRODUCTOS'
    },
    'NUEVOS PRODUCTOS': {
      de: 'NEU EINGETROFFEN',
      en: 'NEW ARRIVALS',
      fr: 'NOUVEAUTÉS',
      es: 'NUEVOS PRODUCTOS'
    },
    // "SALE" variations (actual HTML text)
    'SALE': {
      de: 'SALE',
      en: 'SALE',
      fr: 'SOLDES',
      es: 'REBAJAS'
    },
    'SOLDES': {
      de: 'SALE',
      en: 'SALE',
      fr: 'SOLDES',
      es: 'REBAJAS'
    },
    'REBAJAS': {
      de: 'SALE',
      en: 'SALE',
      fr: 'SOLDES',
      es: 'REBAJAS'
    },
    // Subtitle variations
    'Die beliebtesten Modelle aus unserer exklusiven Kollektion': {
      de: 'Die beliebtesten Modelle aus unserer exklusiven Kollektion',
      en: 'The most popular models from our exclusive collection',
      fr: 'Les modèles les plus populaires de notre collection exclusive',
      es: 'Los modelos más populares de nuestra colección exclusiva'
    },
    'The most popular models from our exclusive collection': {
      de: 'Die beliebtesten Modelle aus unserer exklusiven Kollektion',
      en: 'The most popular models from our exclusive collection',
      fr: 'Les modèles les plus populaires de notre collection exclusive',
      es: 'Los modelos más populares de nuestra colección exclusiva'
    },
    'Les modèles les plus populaires de notre collection exclusive': {
      de: 'Die beliebtesten Modelle aus unserer exklusiven Kollektion',
      en: 'The most popular models from our exclusive collection',
      fr: 'Les modèles les plus populaires de notre collection exclusive',
      es: 'Los modelos más populares de nuestra colección exclusiva'
    },
    'Los modelos más populares de nuestra colección exclusiva': {
      de: 'Die beliebtesten Modelle aus unserer exklusiven Kollektion',
      en: 'The most popular models from our exclusive collection',
      fr: 'Les modèles les plus populaires de notre collection exclusive',
      es: 'Los modelos más populares de nuestra colección exclusiva'
    },
    'Entdecken Sie die neuesten Kollektionen der exklusivsten Luxusmarken': {
      de: 'Entdecken Sie die neuesten Kollektionen der exklusivsten Luxusmarken',
      en: 'Discover the latest collections from the most exclusive luxury brands',
      fr: 'Découvrez les dernières collections des marques de luxe les plus exclusives',
      es: 'Descubre las últimas colecciones de las marcas de lujo más exclusivas'
    },
    'Discover the latest collections from the most exclusive luxury brands': {
      de: 'Entdecken Sie die neuesten Kollektionen der exklusivsten Luxusmarken',
      en: 'Discover the latest collections from the most exclusive luxury brands',
      fr: 'Découvrez les dernières collections des marques de luxe les plus exclusives',
      es: 'Descubre las últimas colecciones de las marcas de lujo más exclusivas'
    },
    'Découvrez les dernières collections des marques de luxe les plus exclusives': {
      de: 'Entdecken Sie die neuesten Kollektionen der exklusivsten Luxusmarken',
      en: 'Discover the latest collections from the most exclusive luxury brands',
      fr: 'Découvrez les dernières collections des marques de luxe les plus exclusives',
      es: 'Descubre las últimas colecciones de las marcas de lujo más exclusivas'
    },
    'Descubre las últimas colecciones de las marcas de lujo más exclusivas': {
      de: 'Entdecken Sie die neuesten Kollektionen der exklusivsten Luxusmarken',
      en: 'Discover the latest collections from the most exclusive luxury brands',
      fr: 'Découvrez les dernières collections des marques de luxe les plus exclusives',
      es: 'Descubre las últimas colecciones de las marcas de lujo más exclusivas'
    },
    'Exklusive Rabatte auf ausgewählte Kollektionen': {
      de: 'Exklusive Rabatte auf ausgewählte Kollektionen',
      en: 'Exclusive discounts on selected collections',
      fr: 'Remises exclusives sur une sélection de collections',
      es: 'Descuentos exclusivos en colecciones seleccionadas'
    },
    'Exclusive discounts on selected collections': {
      de: 'Exklusive Rabatte auf ausgewählte Kollektionen',
      en: 'Exclusive discounts on selected collections',
      fr: 'Remises exclusives sur une sélection de collections',
      es: 'Descuentos exclusivos en colecciones seleccionadas'
    },
    'Remises exclusives sur une sélection de collections': {
      de: 'Exklusive Rabatte auf ausgewählte Kollektionen',
      en: 'Exclusive discounts on selected collections',
      fr: 'Remises exclusives sur une sélection de collections',
      es: 'Descuentos exclusivos en colecciones seleccionadas'
    },
    'Descuentos exclusivos en colecciones seleccionadas': {
      de: 'Exklusive Rabatte auf ausgewählte Kollektionen',
      en: 'Exclusive discounts on selected collections',
      fr: 'Remises exclusives sur une sélection de collections',
      es: 'Descuentos exclusivos en colecciones seleccionadas'
    }
  };

  // Translate all section titles and subtitles
  document.querySelectorAll('.section__title, .section__subtitle, h2, .hero-subline').forEach(el => {
    const text = el.textContent.trim();
    if (sectionMappings[text] && sectionMappings[text][lang]) {
      el.textContent = sectionMappings[text][lang];
    }
  });
}

/**
 * Translate common elements (buttons, labels, etc.) - COMPREHENSIVE
 */
function translateCommonElements() {
  const lang = getCurrentLanguage();

  // Translate "Add to Cart" buttons with bidirectional mapping
  const addToCartTexts = ['IN DEN WARENKORB', 'ADD TO CART', 'AJOUTER AU PANIER', 'AÑADIR AL CARRITO'];
  document.querySelectorAll('[data-role="add-to-cart"], .add-to-cart-btn, .product-card__add-btn, button.btn--primary').forEach(btn => {
    const text = btn.textContent.trim();
    if (addToCartTexts.includes(text)) {
      btn.textContent = t('product_add_to_cart');
    }
  });

  // Translate NEW badges - check text content for all variations
  const newBadgeTexts = ['NEU', 'NEW', 'NOUVEAU', 'NUEVO'];
  document.querySelectorAll('.product-card__badge--new, .badge-new, .product-card__badge').forEach(badge => {
    const text = badge.textContent.trim();
    if (newBadgeTexts.includes(text)) {
      badge.textContent = t('product_new_badge');
    }
  });

  // Translate SALE badges - check text content for all variations
  const saleBadgeTexts = ['SALE', 'SOLDES', 'REBAJAS'];
  document.querySelectorAll('.product-card__badge--sale, .sale-badge, .badge-sale, .product-card__badge').forEach(badge => {
    const text = badge.textContent.trim();
    if (saleBadgeTexts.includes(text)) {
      badge.textContent = t('product_sale_badge');
    }
  });

  // Translate search placeholder
  document.querySelectorAll('[data-role="search-input"], input[type="search"], .search-sidebar__input').forEach(input => {
    const placeholderMap = {
      de: 'Suche nach Produkten, Marken...',
      en: 'Search for products, brands...',
      fr: 'Rechercher des produits, des marques...',
      es: 'Buscar productos, marcas...'
    };
    input.placeholder = placeholderMap[lang] || placeholderMap.de;
  });

  // Translate search title
  document.querySelectorAll('.search-sidebar__title').forEach(title => {
    const titleMap = {
      de: 'SUCHE',
      en: 'SEARCH',
      fr: 'RECHERCHE',
      es: 'BUSCAR'
    };
    const text = title.textContent.trim();
    if (['SUCHE', 'SEARCH', 'RECHERCHE', 'BUSCAR'].includes(text)) {
      title.textContent = titleMap[lang] || titleMap.de;
    }
  });

  // Translate cart title
  document.querySelectorAll('.cart-title, h1').forEach(title => {
    const text = title.textContent.trim();
    const cartTitleMap = {
      'Warenkorb': { de: 'Warenkorb', en: 'Shopping Cart', fr: 'Panier', es: 'Carrito' },
      'Shopping Cart': { de: 'Warenkorb', en: 'Shopping Cart', fr: 'Panier', es: 'Carrito' },
      'Panier': { de: 'Warenkorb', en: 'Shopping Cart', fr: 'Panier', es: 'Carrito' },
      'Carrito': { de: 'Warenkorb', en: 'Shopping Cart', fr: 'Panier', es: 'Carrito' }
    };
    if (cartTitleMap[text] && cartTitleMap[text][lang]) {
      title.textContent = cartTitleMap[text][lang];
    }
  });

  // Translate filter button
  document.querySelectorAll('[data-role="filter-apply"]').forEach(btn => {
    const textMap = {
      de: 'FILTER ANWENDEN',
      en: 'APPLY FILTERS',
      fr: 'APPLIQUER LES FILTRES',
      es: 'APLICAR FILTROS'
    };
    btn.textContent = textMap[lang] || textMap.de;
  });

  // Translate "Continue Shopping" / "Zur Kasse" buttons
  document.querySelectorAll('.btn, .cart-btn, button').forEach(btn => {
    const text = btn.textContent.trim();

    // Checkout button
    const checkoutMap = {
      'Zur Kasse': { de: 'Zur Kasse', en: 'Checkout', fr: 'Commander', es: 'Finalizar Compra' },
      'Checkout': { de: 'Zur Kasse', en: 'Checkout', fr: 'Commander', es: 'Finalizar Compra' },
      'Commander': { de: 'Zur Kasse', en: 'Checkout', fr: 'Commander', es: 'Finalizar Compra' },
      'Finalizar Compra': { de: 'Zur Kasse', en: 'Checkout', fr: 'Commander', es: 'Finalizar Compra' }
    };

    // Continue Shopping button
    const continueMap = {
      'Weiter einkaufen': { de: 'Weiter einkaufen', en: 'Continue Shopping', fr: 'Continuer les achats', es: 'Seguir Comprando' },
      'Continue Shopping': { de: 'Weiter einkaufen', en: 'Continue Shopping', fr: 'Continuer les achats', es: 'Seguir Comprando' },
      'Continuer les achats': { de: 'Weiter einkaufen', en: 'Continue Shopping', fr: 'Continuer les achats', es: 'Seguir Comprando' },
      'Seguir Comprando': { de: 'Weiter einkaufen', en: 'Continue Shopping', fr: 'Continuer les achats', es: 'Seguir Comprando' }
    };

    if (checkoutMap[text] && checkoutMap[text][lang]) {
      btn.textContent = checkoutMap[text][lang];
    } else if (continueMap[text] && continueMap[text][lang]) {
      btn.textContent = continueMap[text][lang];
    }
  });
}
