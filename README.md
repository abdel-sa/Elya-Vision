# Elya Vision – Headless Shopify Frontend

A modern, high-performance headless eCommerce frontend for **Elya Vision**, built to interface securely with the Shopify Storefront API. This project prioritizes a premium user experience, fast load times, and robust security practices without the overhead of heavy JavaScript frameworks.

---

## Key Features

- **Headless Architecture** – Decoupled from Shopify Liquid themes; consumes the Shopify Storefront GraphQL API directly.
- **Vanilla JavaScript** – Lightweight, zero-dependency frontend logic using standard `HTML5`, `CSS3`, and `ES Modules`.
- **Security First** – Comprehensive XSS sanitization (`escapeHTML`) across all dynamically rendered components. Strict privacy compliance with zero PII written to `localStorage`.
- **Production Build Pipeline** – Uses `Vite` for efficient bundling, minification, and cache-busting hashing.
- **Multilingual Support (i18n)** – Fully internationalized UI strings via dynamic tagging.
- **SEO Optimized** – Pre-configured `sitemap.xml` and `robots.txt` included out of the box.

---

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Frontend      | HTML5, CSS3, Vanilla JavaScript     |
| Build Tool    | Vite                                |
| Data Source   | Shopify Storefront API (GraphQL)    |
| Module System | ES Modules                          |

---

## Setup and Installation

### Prerequisites

- Node.js v18 or later
- A Shopify Store with a generated **Storefront API Access Token**

### 1. Clone the repository
```bash
git clone https://github.com/abdel-sa/elya-vision.git
cd elya-vision
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and insert your Shopify credentials:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_SHOPIFY_STOREFRONT_TOKEN=your_token_here
```

### 4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 5. Production build

Generate a minified, cache-busted production build:
```bash
npm run build
```

Output is written to the `/dist` directory and is ready for deployment.

---

## Security Notes

- The Shopify Storefront API token should be configured in the Shopify Admin to accept requests only from the production domain (e.g., `https://elya.at`).
- All `console.log` and `debugger` statements are stripped automatically during the Vite production build to prevent data leakage.
- Dynamic content is sanitized via `escapeHTML` before DOM insertion to mitigate XSS vectors.

---

## License

All rights reserved. Copyright 2026 Elya Vision.
