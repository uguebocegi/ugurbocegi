// ==========================
// UĞUR BÖCEĞİ ADMIN.JS
// ==========================

function checkAdmin() {
  const pass = document.getElementById("pass").value;
  const settings = Storage.getSettings();

  if (pass === "1234") {
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Hatalı şifre");
  }
}

function closeAdmin() {
  document.getElementById("adminPanel").style.display = "none";
}

// ==========================
// ÜRÜN EKLE
// ==========================

function addProduct() {
  const name = document.getElementById("p_name").value;
  const price = document.getElementById("p_price").value;
  const img = document.getElementById("p_img").value;

  if (!name || !price || !img) {
    alert("Tüm alanları doldur");
    return;
  }

  Storage.addProduct({
    name,
    price,
    img
  });

  alert("Ürün eklendi 🐞");

  clearInputs();
  refreshAdminProducts();
  renderProducts();
}

function clearInputs() {
  document.getElementById("p_name").value = "";
  document.getElementById("p_price").value = "";
  document.getElementById("p_img").value = "";
}

// ==========================
// ÜRÜN SİL
// ==========================

function deleteProduct(id) {
  Storage.deleteProduct(id);

  refreshAdminProducts();
  renderProducts();
}

// ==========================
// ADMİN ÜRÜN LİSTELE
// ==========================

function refreshAdminProducts() {
  const box = document.getElementById("adminProducts");
  const products = Storage.getProducts();

  box.innerHTML = "";

  products.forEach((p) => {
    box.innerHTML += `
      <div style="display:flex;justify-content:space-between;margin:10px 0;padding:10px;border:1px solid #ddd;border-radius:10px;">
        <div>
          <b>${p.name}</b><br>
          ${p.price} TL
        </div>

        <button onclick="deleteProduct(${p.id})" style="background:red;color:white;border:none;padding:5px 10px;border-radius:8px;">
          Sil
        </button>
      </div>
    `;
  });
}

// ==========================
// AYAR KAYDET
// ==========================

function saveSettings() {
  const phone = document.getElementById("admin_phone").value;
  const email = document.getElementById("admin_email").value;
  const address = document.getElementById("admin_address").value;

  Storage.updateSettings({
    whatsapp: phone,
    email,
    address
  });

  alert("Ayarlar kaydedildi 🐞");
}

// ==========================
// SAYFA YÜKLENİNCE
// ==========================

refreshAdminProducts();
