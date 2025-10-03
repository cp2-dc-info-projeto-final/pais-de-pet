import { writable } from 'svelte/store';

// Estado inicial: tenta carregar do localStorage
let savedProducts = [];
if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('products');
    if (stored) {
        try {
            savedProducts = JSON.parse(stored);
        } catch {
            savedProducts = [];
        }
    }
}

export const products = writable(savedProducts);

// Sempre que mudar, salva no localStorage
products.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
        if (value && value.length > 0) {
            localStorage.setItem('products', JSON.stringify(value));
        } else {
            localStorage.removeItem('products');
        }
    }
});