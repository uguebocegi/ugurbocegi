// ==========================
// UĞUR BÖCEĞİ APP.JS
// ==========================

let cart = Storage.getCart();

function renderProducts() {
  const products = Storage.getProducts();
  const box = document.getElementById("products");

  box.innerHTML = "";

  products.forEach((p, i) => {
    box.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <p>${p.price} TL</p>
          <button class="add" onclick="addToCart(${i})">
            Sepete Ekle 🐞
          </button>
        </div>
      </div>
    `;
  });
}

function addToCart(index) {
  const products = Storage.getProducts();
  const product = products[index];

  cart.push(product);
  Storage.saveCart(cart);

  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const totalBox = document.getElementById("total");

  box.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    total += Number(item.price);

    box.innerHTML += `
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <span>${item.name}</span>
        <span>${item.price} TL</span>
      </div>
    `;
  });

  totalBox.innerText = "Toplam: " + total + " TL";
}

function sendWhatsApp() {
  const settings = Storage.getSettings();

  let message = "🐞 Uğur Böceği Sipariş:%0A%0A";

  cart.forEach(p => {
    message += `- ${p.name} : ${p.price} TL%0A`;
  });

  const total = cart.reduce((a, b) => a + Number(b.price), 0);

  message += `%0AToplam: ${total} TL`;

  window.open(
    "https://wa.me/" + settings.whatsapp + "?text=" + message,
    "_blank"
  );
}

function openCart() {
  document.getElementById("cart").classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cart").classList.add("hidden");
}

// İlk yükleme
renderProducts();
renderCart();
