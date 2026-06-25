
// LOGIN FIX
function login(){
const pass = document.getElementById("pass");

if(!pass){
alert("Şifre alanı yok!");
return;
}

if(pass.value === "1234"){
document.getElementById("loginBox").style.display="none";
document.getElementById("adminPanel").style.display="block";
renderAdmin();
}
else{
alert("Hatalı şifre");
}
}

// ÜRÜN EKLE
function addProduct(){

let products = Storage.getProducts();

products.push({
name: document.getElementById("p_name").value,
price: document.getElementById("p_price").value,
img: document.getElementById("p_img").value
});

Storage.saveProducts(products);

renderAdmin();
}

// ÜRÜN LİSTE
function renderAdmin(){

let box = document.getElementById("adminProducts");
let products = Storage.getProducts();

box.innerHTML = "";

products.forEach((p,i)=>{
box.innerHTML += `
<div style="display:flex;justify-content:space-between;margin:5px 0">
<span>${p.name}</span>
<button onclick="del(${i})">Sil</button>
</div>
`;
});
}

// SİL
function del(i){
let products = Storage.getProducts();
products.splice(i,1);
Storage.saveProducts(products);
renderAdmin();
}
