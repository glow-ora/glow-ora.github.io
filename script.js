const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzSlf54-naWf-R3dGNFIFqeQD1sUOSeY8G8D9VKZLpP8a6l_JNcyh2GuUP_QgXJ2Bo/exec";

const products = [
{
id:1,
name:"Judydoll Iron Mascara",
price:999,
images:["images/mascara.png"],
desc:"✨ Long clean lashes. No clumps. Perfect for daily use."
},
{
id:2,
name:"Hydrocolloid Acne Patch",
price:150,
images:[
"images/acne-patch.png",
"images/acne-patch1.png",
"images/acne-patch2.png"
],
desc:"✨ Heals pimples fast. Cute star & cartoon design."
},
{
id:3,
name:"Hisyi Eyeshadow Palette",
price:299,
images:["images/eyeshadow.png"],
desc:"✨ Soft nude shades for everyday glam."
},
{
id:4,
name:"Blotting Paper",
price:350,
images:[
"images/blotting-paper.png",
"images/blotting-paper1.png",
"images/blotting-paper2.png"
],
desc:"✨ Oil control. 100 sheets. Travel friendly."
}
];

let cart=[];

function render(){
let html="";
products.forEach(p=>{
html+=`
<div class="product">
< img src="${p.images[0]}" id="img${p.id}" class="main-img">

${p.images.map(i=>`< img src="${i}" class="thumb" onclick="change(${p.id},'${i}')">`).join("")}

<h3>${p.name}</h3>
<p>${p.desc}</p >
<b>${p.price} tk</b><br>
<button onclick="add(${p.id})">Add to Cart</button>
</div>
`;
});
document.getElementById("product-list").innerHTML=html;
}

function change(id,img){
document.getElementById("img"+id).src=img;
}

function add(id){
let item=cart.find(i=>i.id==id);
if(item) item.qty++;
else{
let p=products.find(p=>p.id==id);
cart.push({...p,qty:1});
}
updateCart();
}

function updateCart(){
document.getElementById("cart-count").innerText=
cart.reduce((s,i)=>s+i.qty,0);

let html="";
let total=0;

cart.forEach(i=>{
html+=`${i.name} x ${i.qty}<br>`;
total+=i.price*i.qty;
});

document.getElementById("cart-items").innerHTML=html;
document.getElementById("subtotal").innerText=total;

let delivery=document.getElementById("area").value=="Inside Dhaka"?80:120;

document.getElementById("total").innerText=total+delivery;
}

function openCart(){
document.getElementById("cart").classList.remove("hidden");
updateCart();
}

function closeCart(){
document.getElementById("cart").classList.add("hidden");
}

async function placeOrder(){

let data={
name:document.getElementById("name").value,
phone:document.getElementById("phone").value,
address:document.getElementById("address").value,
area:document.getElementById("area").value,
payment:document.getElementById("payment").value,
products:cart.map(i=>i.name+" x "+i.qty).join(", "),
subtotal:document.getElementById("subtotal").innerText,
total:document.getElementById("total").innerText
};

document.getElementById("msg").innerText="Sending...";

try{
await fetch(SCRIPT_URL,{
method:"POST",
body:JSON.stringify(data)
});
document.getElementById("msg").innerText="Order sent!";
cart=[];
updateCart();
}catch{
document.getElementById("msg").innerText="Error!";
}
}

render();
