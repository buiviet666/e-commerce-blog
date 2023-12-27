import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                product: resolve(__dirname, 'product.html'),
                singleProduct: resolve(__dirname, 'single_product.html'),
                blog: resolve(__dirname, 'blog.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                cart: resolve(__dirname, 'cart.html'),
            }
        }
    }
})