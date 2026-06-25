function login(){
if(document.getElementById("pass").value==="1234"){
alert("Giriş başarılı");
}else{
alert("Hatalı şifre");
}
}

function addProduct(){
let products = Storage.getProducts();

products.push({
name:document.getElementById("p_name").value,
price:document.getElementById("p_price").value,
img:document.getElementById("p_img").value
});

Storage.saveProducts(products);
renderAdmin();
}

function renderAdmin(){
let box=document.getElementById("adminProducts");
let products=Storage.getProducts();

box.innerHTML="";

products.forEach((p,i)=>{
box.innerHTML+=`
<div>
${p.name}
<button onclick="del(${i})">Sil</button>
</div>`;
});
}

function del(i){
let products=Storage.getProducts();
products.splice(i,1);
Storage.saveProducts(products);
renderAdmin();
}

renderAdmin();
