import { writable } from 'svelte/store';

export const cart = writable([]);

// Estado inicial: tenta carregar do localStorage
let savedCart: any = null;

if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('cart');
    if (stored) {
        try {
            savedCart = JSON.parse(stored);
            // Carrega no store
            cart.set(savedCart);
        } catch {
            savedCart = [];
        }
    }
}

// Sempre que mudar, salva no localStorage
cart.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
        if (value && value.length > 0) {
            localStorage.setItem('cart', JSON.stringify(value));
        } else {
            localStorage.removeItem('cart');
        }
    }
});
