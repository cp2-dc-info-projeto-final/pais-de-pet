import { writable } from 'svelte/store';

export const user = writable(null);

// Carregar do localStorage
let savedUser: any = null;
if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('user');
    if (stored) {
        try {
            savedUser = JSON.parse(stored);
        } catch {
            savedUser = null;
        }
    }
}

user.set(savedUser);

// Sempre que mudar, salva no localStorage
user.subscribe((value) => {
    if (typeof localStorage !== 'undefined') {
        if (value) {
            localStorage.setItem('user', JSON.stringify(value));
        } else {
            localStorage.removeItem('user');
        }
    }
});
