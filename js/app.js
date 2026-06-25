let cart = Storage.getCart();

function renderProducts(){
let products = Storage.getProducts();
let box = document.getElementById("productList");
box.innerHTML="";

products.forEach((p,i)=>{
box.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>${p.price} TL</p>
<button onclick="add(${i})">Sepete Ekle</button>
</div>`;
});
}

function add(i){
let products = Storage.getProducts();
cart.push(products[i]);
Storage.saveCart(cart);
renderCart();
}

function renderCart(){
let box=document.getElementById("cartItems");
box.innerHTML="";
let total=0;

cart.forEach(c=>{
total+=Number(c.price);
box.innerHTML+=`<p>${c.name} - ${c.price}</p>`;
});

document.getElementById("total").innerText="Toplam: "+total;
}

function sendWhatsApp(){
let settings = Storage.getSettings();

let msg="Sipariş:%0A";
cart.forEach(c=>{
msg+=c.name+" "+c.price+"%0A";
});

window.open("https://wa.me/"+settings.phone+"?text="+msg);
}

renderProducts();
renderCart();
