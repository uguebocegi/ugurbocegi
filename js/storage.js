const Storage = {

getProducts(){
return JSON.parse(localStorage.getItem("products")) || [];
},

saveProducts(p){
localStorage.setItem("products", JSON.stringify(p));
},

getCart(){
return JSON.parse(localStorage.getItem("cart")) || [];
},

saveCart(c){
localStorage.setItem("cart", JSON.stringify(c));
},

getSettings(){
return JSON.parse(localStorage.getItem("settings")) || {
phone:"905553947289"
};
},

saveSettings(s){
localStorage.setItem("settings", JSON.stringify(s));
}

};
