// LocalStorage yönetimi
const Storage = {
    getProducts: function() {
        return JSON.parse(localStorage.getItem("products")) || [];
    },
    
    saveProducts: function(products) {
        localStorage.setItem("products", JSON.stringify(products));
    },
    
    getCart: function() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    },
    
    saveCart: function(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
};