import { writable } from 'svelte/store';

// Estado inicial: tenta carregar do localStorage
let savedProduto = [];
if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('produto');
    if (stored) {
        try {
            savedProduto = JSON.parse(stored);
        } catch {
            savedProduto = [];
        }
    }
}

export const produto = writable(savedProduto);

// Sempre que mudar, salva no localStorage
produto.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
        if (value && value.length > 0) {
            localStorage.setItem('produto', JSON.stringify(value));
        } else {
            localStorage.removeItem('produto');
        }
    }
});