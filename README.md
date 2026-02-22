# Elya – Luxury Eyewear Frontend

A high-end, editorial e-commerce frontend for luxury eyewear. Built with semantic HTML, modern CSS, and vanilla JavaScript. Designed for premium UX and Shopify-ready structure.

---

## Project Structure

```
Elya/
├── index.html                 # Main entry point
├── css/
│   └── styles.css            # All styles (typography, layout, responsive)
├── js/
│   └── main.js               # Navigation, modals, product rendering
├── assets/
│   └── images/               # Product images & hero images
└── README.md                 # This file
```

---

## Design System

### Color Palette
- **White**: `#ffffff`
- **Cream**: `#faf8f5` (Secondary background)
- **Beige**: `#e8e3db` (Cards, accents)
- **Dark Blue**: `#1a2847` (Primary text & UI)
- **Gold**: `#d4af37` (Highlights, hover states)
- **Light Gray**: `#9b9b9b` (Secondary text)

### Typography
- **Serif**: `Playfair Display` (Logo, headlines)
- **Sans-Serif**: `Lato` (Body, navigation)

### Spacing Scale
- `xs`: 0.5rem
- `sm`: 1rem
- `md`: 1.5rem
- `lg`: 2rem
- `xl`: 3rem
- `2xl`: 4rem

---

## Features

### 1. Navigation
- **Sticky header** with logo, main menu, and icons
- **Mega-menu** on BRILLEN (glasses) with 3 columns:
  - Categories (Men, Women, Unisex, All)
  - Collections/Brands (Prada, Gucci, Cartier, Tom Ford, Dior)
  - Get the Look (Round, Angular, Pilot, Rimless)
- **Responsive mobile menu** with burger toggle

### 2. Brand Modal
- Triggered by clicking on brand names in mega-menu
- Displays brand name and 3 category buttons:
  - Men's Glasses
  - Women's Glasses
  - Unisex
- Smooth fade-in/fade-out with scale animation
- Active button state in gold
- Close on ESC key or background click

### 3. Hero Section
- Full-width editorial image
- Centered text overlay ("Zeitlose Eleganz")
- Responsive typography

### 4. Product Grid
- Two sections: **Bestsellers** and **New Arrivals**
- Clean product cards with:
  - Image (hover zoom effect)
  - Brand label
  - Product name
  - Price in gold
  - "NEW" badge on new items
- Responsive grid layout

### 5. Interactive Elements
- Gold underline on navigation hover
- Product card hover effects (lift + shadow)
- Smooth transitions throughout
- Touch-friendly on mobile

---

## How to Use

### Running Locally
1. Open `index.html` in a modern browser
2. No build process or dependencies needed
3. All functionality works with vanilla JavaScript

### Adding Products
Edit the `mockProducts` object in `js/main.js`:

```javascript
const mockProducts = {
    bestsellers: [
        {
            id: 1,
            name: 'Product Name',
            brand: 'BRAND',
            price: '€XXX',
            image: 'assets/images/product.jpg',
        },
        // Add more products...
    ],
    newItems: [
        // Similar structure...
    ],
};
```

### Customizing Styles
All CSS variables are defined at the top of `styles.css`:

```css
:root {
    --color-gold: #d4af37;
    --spacing-lg: 2rem;
    /* etc... */
}
```

---

## Responsive Breakpoints
- **Desktop**: Full navigation menu, mega-menu on hover
- **Tablet (≤768px)**: Burger menu, mobile-optimized mega-menu
- **Mobile (≤480px)**: Single-column layout, optimized spacing

---

## Shopify Integration (Future)

This structure is designed for easy Shopify migration:

- **Collections**: Map to categories in mega-menu
- **Products**: Rendered from Shopify data instead of mock data
- **Variants**: Easy to add size/color selectors to product cards
- **Cart**: Connect to Shopify's cart API

---

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript
- CSS Grid & Flexbox
- No polyfills needed for current features

---

## Next Steps
1. Add hero image to `assets/images/hero.jpg`
2. Add product images following the naming pattern
3. Implement cart functionality
4. Add product detail pages
5. Integrate Shopify API

---

**Created**: January 2026
**Author**: Elya Design Studio
