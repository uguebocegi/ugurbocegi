// Local storage utilities for cart management

const StorageManager = {
    cartKey: 'ugurBocegi_cart',
    
    getCart() {
        try {
            return JSON.parse(localStorage.getItem(this.cartKey)) || [];
        } catch (e) {
            return [];
        }
    },
    
    saveCart(cart) {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
    },
    
    addItem(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCart(cart);
        return cart;
    },
    
    removeItem(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        this.saveCart(cart);
        return cart;
    },
    
    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                return this.removeItem(productId);
            }
            item.quantity = quantity;
            this.saveCart(cart);
        }
        
        return cart;
    },
    
    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
};
