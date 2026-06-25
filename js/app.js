// Product data
const products = [
    { id: 1, name: '🐞 Kırmızı Uğur Böceği', price: 45, description: 'Şanslı kırmızı uğur böceği' },
    { id: 2, name: '🟡 Sarı Uğur Böceği', price: 40, description: 'Mutluluk getiren sarı böcek' },
    { id: 3, name: '⚫ Siyah Uğur Böceği', price: 35, description: 'Gizemli siyah uğur böceği' },
    { id: 4, name: '🧡 Turuncu Uğur Böceği', price: 42, description: 'Enerji dolu turuncu böcek' },
    { id: 5, name: '💜 Mor Uğur Böceği', price: 50, description: 'Nadir mor uğur böceği' },
    { id: 6, name: '🎁 Uğur Böceği Seti', price: 180, description: '6 farklı renk böcek seti' }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCart();
});

// Render products
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product => `
        <div class="product">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">${product.price} ₺</div>
            <button onclick="addToCart(${product.id})">Sepete Ekle</button>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    StorageManager.addItem(product);
    updateCart();
    alert(`${product.name} sepete eklendi! ✓`);
}

// Update cart display
function updateCart() {
    const cart = StorageManager.getCart();
    const cartItems = document.getElementById('cartItems');
    const total = document.getElementById('total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="color: #999;">Sepet boş</p>';
        total.textContent = 'Toplam: 0 ₺';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                ${item.price} ₺ × 
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${item.id}, this.value)" 
                       style="width: 40px; padding: 2px;">
            </div>
            <button onclick="removeFromCart(${item.id})">❌</button>
        </div>
    `).join('');
    
    const cartTotal = StorageManager.getTotal();
    total.textContent = `Toplam: ${cartTotal} ₺`;
}

// Remove from cart
function removeFromCart(productId) {
    StorageManager.removeItem(productId);
    updateCart();
}

// Update quantity
function updateQuantity(productId, quantity) {
    StorageManager.updateQuantity(productId, parseInt(quantity));
    updateCart();
}

// Send WhatsApp order
function sendWhatsApp() {
    const cart = StorageManager.getCart();
    
    if (cart.length === 0) {
        alert('Sepet boş! Lütfen ürün seçin.');
        return;
    }
    
    const total = StorageManager.getTotal();
    const message = `*Uğur Böceği Mağaza Sipariş*\n\n${
        cart.map(item => `• ${item.name} x${item.quantity} = ${item.price * item.quantity} ₺`).join('\n')
    }\n\n*Toplam: ${total} ₺*\n\nSiparişi onaylamanız rica olunur.`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
