# Elya Vision - Headless Shopify Frontend

![Elya Vision Placeholder](public/assets/images/placeholder.png)

A modern, high-performance headless eCommerce frontend for **Elya Vision**, built to interface securely with the Shopify Storefront API. This project prioritizes a premium user experience, fast load times, and robust security practices without the overhead of heavy JavaScript frameworks.

## ✨ Key Features
- **Headless Architecture**: Decoupled from Shopify liquid themes; consumes Shopify Storefront GraphQL API.
- **Vanilla JavaScript**: Lightweight, zero-dependency frontend logic (`Vanilla JS`, `HTML5`, `CSS3`).
- **Security First**: Comprehensive XSS sanitization (`escapeHTML`) across all dynamically rendered components, and strict privacy compliance (zero PII written to `localStorage`).
- **Production Build Pipeline**: Employs `Vite` for efficient bundling, minification, and cache-busting hashing.
- **Multilingual Support (i18n)**: Fully internationalized strings via dynamic tagging.
- **SEO Optimized**: Pre-configured `sitemap.xml` and `robots.txt` out of the box.

## 🛠 Tech Stack
- **HTML/CSS/JS** (Vanilla Web Standards)
- **Vite** (Build Tool & Dev-Server)
- **Shopify Storefront API** (Backend & Data Source)
- **ES Modules** (for component-based logic)

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- A Shopify Store with a generated **Storefront API Access Token**.

### 1. Clone the repository
```bash
git clone {YOUR_REPOSITORY_URL}
cd {YOUR_REPOSITORY_DIRECTORY}
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the `.env.example` file to create a local `.env` file:
```bash
cp .env.example .env
```
Open `.env` and insert your Shopify Storefront Token:
```env
VITE_SHOPIFY_STOREFRONT_TOKEN=your_token_here
```

### 4. Start the Dev Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### 5. Production Build
To create a minified, cache-busting production build (ready for deployment):
```bash
npm run build
```
The output will be generated in the `/dist` directory.

## 🔒 Security Notes
- Ensure that the Shopify Storefront API token is configured in the Shopify Admin to *only* accept requests from your production domains (e.g., `https://elya.at`).
- All `console.log` and `debugger` statements are stripped automatically during the Vite `build` step to prevent data leakage.

## 📄 License
All rights reserved © 2026 Elya Vision.
