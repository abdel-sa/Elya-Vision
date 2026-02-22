/* ========================================
   SHOPPING CART SYSTEM
   Handles cart operations with localStorage
   ======================================== */

const CART_STORAGE_KEY = 'elya_cart';

/* ========================================
   INITIALIZE CART
   ======================================== */

function initializeCart() {
    if (!localStorage.getItem(CART_STORAGE_KEY)) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    }
}

/* ========================================
   GET CART
   ======================================== */

function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

/* ========================================
   SAVE CART
   ======================================== */

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

/* ========================================
   ADD TO CART
   ======================================== */

function addToCart(product, quantity = 1) {
    if (!product || !product.id) {
        return { success: false, error: 'Ungültiges Produkt' };
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            handle: product.handle || null,
            variantId: product.variantId || (product.variants && product.variants[0]?.id) || null,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: quantity,
            priceNumber: extractPrice(product.price)
        });
    }

    saveCart(cart);
    return { success: true, message: `${product.name} wurde hinzugefügt` };
}

/* ========================================
   REMOVE FROM CART
   ======================================== */

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    return { success: true };
}

/* ========================================
   UPDATE CART ITEM
   ======================================== */

function updateCartItem(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (!item) {
        return { success: false, error: 'Produkt nicht im Warenkorb' };
    }

    if (quantity <= 0) {
        return removeFromCart(productId);
    }

    item.quantity = quantity;
    saveCart(cart);
    return { success: true };
}

/* ========================================
   GET CART TOTAL
   ======================================== */

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        return total + (item.priceNumber * item.quantity);
    }, 0);
}

/* ========================================
   GET CART COUNT
   ======================================== */

function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

/* ========================================
   EXTRACT PRICE NUMBER
   ======================================== */

function extractPrice(priceString) {
    const price = parseFloat(priceString.replace('€', '').replace(',', '.'));
    return isNaN(price) ? 0 : price;
}

/* ========================================
   UPDATE CART BADGE
   ======================================== */

function updateCartBadge() {
    const cartIcon = document.querySelector('.cart-badge');
    const count = getCartCount();

    if (cartIcon) {
        if (count > 0) {
            cartIcon.textContent = count;
            cartIcon.style.display = 'flex';
        } else {
            cartIcon.style.display = 'none';
        }
    }
}

/* ========================================
   CLEAR CART
   ======================================== */

function clearCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    updateCartBadge();
    return { success: true };
}

/* ========================================
   FORMAT PRICE
   ======================================== */

function formatPrice(price) {
    return '€' + price.toFixed(2).replace('.', ',');
}

/* ========================================
   SHOPIFY CHECKOUT
   Creates a Shopify checkout and redirects
   ======================================== */

async function createShopifyCheckoutFromCart() {
    const cart = getCart();
    
    console.log('Cart contents:', cart);
    
    if (cart.length === 0) {
        alert('Ihr Warenkorb ist leer.');
        return null;
    }

    // Filter items that have Shopify variant IDs
    const shopifyItems = cart.filter(item => item.variantId);
    
    console.log('Shopify items with variantId:', shopifyItems);
    
    if (shopifyItems.length === 0) {
        // No Shopify products - need to re-add products
        console.warn('Keine Produkte mit variantId im Warenkorb');
        alert('Bitte leeren Sie den Warenkorb und fügen Sie die Produkte erneut hinzu.');
        return null;
    }

    // Create line items for Shopify
    const lineItems = shopifyItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
    }));
    
    console.log('Line items for checkout:', lineItems);

    try {
        // Create checkout using Shopify Storefront API
        const checkout = await createShopifyCheckout(lineItems);
        
        console.log('Checkout response:', checkout);
        
        if (checkout && checkout.webUrl) {
            // Redirect to Shopify checkout
            console.log('Redirecting to:', checkout.webUrl);
            window.location.href = checkout.webUrl;
            return checkout;
        } else {
            throw new Error('Checkout konnte nicht erstellt werden');
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Es gab einen Fehler beim Erstellen der Bestellung. Bitte versuchen Sie es erneut.');
        return null;
    }
}

/* ========================================
   INITIALIZATION
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    updateCartBadge();
});
