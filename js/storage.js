// ==========================
// UĞUR BÖCEĞİ STORAGE SYSTEM
// ==========================

const Storage = {

  // Ürünleri getir
  getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
  },

  // Ürünleri kaydet
  saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  },

  // Yeni ürün ekle
  addProduct(product) {
    const products = this.getProducts();
    products.push({
      id: Date.now(),
      ...product
    });
    this.saveProducts(products);
  },

  // Ürün sil
  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
  },

  // Ürün güncelle
  updateProduct(id, newData) {
    let products = this.getProducts();
    products = products.map(p => p.id === id ? { ...p, ...newData } : p);
    this.saveProducts(products);
  },

  // ==========================
  // AYARLAR
  // ==========================

  getSettings() {
    return JSON.parse(localStorage.getItem("settings")) || {
      siteTitle: "Uğur Böceği Giyim",
      subtitle: "Pratik Ev Aletleri",
      phone: "905553947289",
      email: "info@ugurbocegi.com",
      address: "Bolu Merkez",
      theme: "modern",
      whatsapp: "905553947289"
    };
  },

  saveSettings(settings) {
    localStorage.setItem("settings", JSON.stringify(settings));
  },

  updateSettings(newData) {
    const settings = this.getSettings();
    const updated = { ...settings, ...newData };
    this.saveSettings(updated);
  },

  // ==========================
  // SEPET
  // ==========================

  getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  },

  saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  },

  addToCart(product) {
    const cart = this.getCart();
    cart.push(product);
    this.saveCart(cart);
  },

  removeFromCart(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
  },

  clearCart() {
    localStorage.removeItem("cart");
  }

};
