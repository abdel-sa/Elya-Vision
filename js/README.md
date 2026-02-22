# Elya Frontend Architecture

Sauber strukturierte, modulare Codebase mit strikter Trennung von API, State und UI.

## 📁 Ordnerstruktur

```
js/
├── api/              # API Layer - GraphQL Calls zu Shopify
│   └── shopify.js    # Shopify Storefront API Integration
│
├── state/            # State Management - Daten-State
│   ├── cart.js       # Cart State (localStorage)
│   └── products.js   # Product State & Transformationen
│
├── ui/               # UI Rendering - DOM Manipulation
│   ├── product-card.js   # Product Card Komponente
│   ├── search.js         # Search UI
│   ├── filter.js         # Filter UI
│   └── notification.js   # Notifications & Cart Badge
│
├── services/         # Business Logic
│   ├── cart-service.js     # Cart Operations
│   └── product-service.js  # Product Operations
│
├── config/           # Konfiguration & Constants
│   ├── strings.js    # UI-Texte zentralisiert
│   ├── constants.js  # App Constants (Storage Keys, API Config, etc.)
│   └── mock-data.js  # Mock Data für Development
│
└── app.js           # Main Entry Point - App Orchestration
```

## 🏗️ Architektur-Prinzipien

### 1. **Strikte Trennung**
- **API Layer**: Nur HTTP/GraphQL Calls, keine UI, kein State
- **State Layer**: Nur Daten-Management, keine UI, keine API Calls
- **UI Layer**: Nur DOM-Rendering, keine Business Logic
- **Services**: Business Logic, verbindet API/State/UI

### 2. **Keine Inline-Styles**
- Alle Styles in CSS-Dateien
- BEM-Naming Convention für CSS-Klassen
- State-Klassen: `is-loading`, `is-active`, `has-error`, etc.

### 3. **Data-Attributes für Hooks**
```html
<!-- Korrekt -->
<button data-role="add-to-cart" data-product-id="123">Add</button>

<!-- Falsch -->
<button id="addToCart123" onclick="addToCart()">Add</button>
```

### 4. **Zentralisierte Strings**
```javascript
// Korrekt
import { STRINGS } from './config/strings.js';
showNotification(STRINGS.CART_ADDED_SUCCESS(product.name));

// Falsch
showNotification(`${product.name} wurde hinzugefügt`);
```

### 5. **ES6 Modules**
Alle Dateien nutzen `import/export`, kein globales Scope-Pollution.

## 🎨 BEM CSS Konvention

```css
/* Block */
.product-card { }

/* Element */
.product-card__image { }
.product-card__title { }
.product-card__price { }

/* Modifier */
.product-card--featured { }
.product-card--skeleton { }

/* State */
.product-card.is-loading { }
.product-card.has-error { }
```

## 🔧 Wie man Features hinzufügt

### Neue UI-Komponente hinzufügen

1. **UI-Modul** erstellen: `js/ui/my-component.js`
```javascript
export function renderMyComponent(data) {
  // Pure rendering logic
}
```

2. **CSS** hinzufügen: `css/components.css`
```css
.my-component { }
.my-component__element { }
```

3. **Service** erstellen (falls nötig): `js/services/my-service.js`
```javascript
import { renderMyComponent } from '../ui/my-component.js';

export function initMyComponent() {
  // Business logic + UI orchestration
}
```

4. **In App integrieren**: `js/app.js`
```javascript
import { initMyComponent } from './services/my-service.js';

function initApp() {
  // ...
  initMyComponent();
}
```

## 🚀 Development

```bash
# Lokaler Server starten
python -m http.server 8000

# Im Browser öffnen
http://localhost:8000
```

## 📝 Code Style

- **Naming**: camelCase für Funktionen/Variablen, PascalCase für Klassen
- **Comments**: Funktions-Header mit JSDoc-Style
- **Keine Magic Numbers**: Nutze `config/constants.js`
- **Keine Hardcoded Strings**: Nutze `config/strings.js`
- **Event Delegation**: Nutze `data-role` Attributes

## 🔍 Debugging

```javascript
// State checken
import { getCart } from './state/cart.js';
console.log(getCart());

// Products checken
import { getAllProducts } from './state/products.js';
console.log(getAllProducts());
```

## ✅ Best Practices

- ✅ Nutze `data-role` für Event Delegation
- ✅ Nutze State-Klassen (`is-`, `has-`) für CSS
- ✅ Trenne API, State und UI strikt
- ✅ Zentralisiere Strings und Constants
- ❌ Kein Inline-Styling im JS
- ❌ Keine globalen Variablen
- ❌ Keine mixed concerns (UI + API in einer Funktion)
