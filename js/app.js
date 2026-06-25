// Ürün listesini göster
function displayProducts() {
    const products = Storage.getProducts();
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    
    if (products.length === 0) {
        productList.innerHTML = "<p style='grid-column: 1/-1; text-align: center; padding: 40px; color: #999;'>Henüz ürün eklenmemiş. Admin panelinden ürün ekleyiniz.</p>";
        return;
    }
    
    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200?text=${encodeURIComponent(product.name)}'">
            <h3>${product.name}</h3>
            <p>${product.price} ₺</p>
            <button onclick="addToCart(${index})">Sepete Ekle</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Sepete ürün ekle
function addToCart(index) {
    const products = Storage.getProducts();
    const product = products[index];
    const cart = Storage.getCart();
    
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: parseFloat(product.price),
            quantity: 1
        });
    }
    
    Storage.saveCart(cart);
    displayCart();
    alert(product.name + " sepete eklendi!");
}

// Sepeti göster
function displayCart() {
    const cart = Storage.getCart();
    const cartItems = document.getElementById("cartItems");
    const total = document.getElementById("total");
    
    cartItems.innerHTML = "";
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <button onclick="removeFromCart(${index})" style="width: auto; padding: 3px 8px; background-color: #e55555; font-size: 12px;">Sil</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    total.innerHTML = "Toplam: " + totalPrice.toFixed(2) + " ₺";
}

// Sepetten ürün kaldır
function removeFromCart(index) {
    const cart = Storage.getCart();
    cart.splice(index, 1);
    Storage.saveCart(cart);
    displayCart();
}

// WhatsApp sipariş gönder
function sendWhatsApp() {
    const cart = Storage.getCart();
    
    if (cart.length === 0) {
        alert("Sepet boş!");
        return;
    }
    
    let message = "Merhaba! Aşağıdaki ürünleri sipariş etmek istiyorum:\n\n";
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.name} x${item.quantity} = ${itemTotal.toFixed(2)} ₺\n`;
    });
    
    message += `\nToplam: ${total.toFixed(2)} ₺`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
}

// Sayfa yüklendiğinde
document.addEventListener("DOMContentLoaded", function() {
    displayProducts();
    displayCart();
});