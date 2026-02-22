import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                agb: resolve(__dirname, 'pages/agb.html'),
                alleBrillen: resolve(__dirname, 'pages/alle-brillen.html'),
                alleSonnenbrillen: resolve(__dirname, 'pages/alle-sonnenbrillen.html'),
                brand: resolve(__dirname, 'pages/brand.html'),
                cart: resolve(__dirname, 'pages/cart.html'),
                damen: resolve(__dirname, 'pages/damen.html'),
                datenschutz: resolve(__dirname, 'pages/datenschutz.html'),
                getTheLook: resolve(__dirname, 'pages/get-the-look.html'),
                herren: resolve(__dirname, 'pages/herren.html'),
                impressum: resolve(__dirname, 'pages/impressum.html'),
                preloved: resolve(__dirname, 'pages/preloved.html'),
                product: resolve(__dirname, 'pages/product.html'),
                support: resolve(__dirname, 'pages/support.html'),
                unisex: resolve(__dirname, 'pages/unisex.html'),
                widerruf: resolve(__dirname, 'pages/widerruf.html')
            }
        }
    },
    esbuild: {
        drop: ['console', 'debugger'],
    },
});
