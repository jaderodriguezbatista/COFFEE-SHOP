const products=[
{id:1,name:"Latte",cat:"cafe",price:250,desc:"Café suave, leche y espuma."},
{id:2,name:"Cold Brew",cat:"frio",price:280,desc:"Intenso y refrescante."},
{id:3,name:"Caramel ",cat:"especial",price:320,desc:"Café, caramelo y dulzura."},
{id:4,name:"Iced Latte",cat:"frio",price:270,desc:"Espresso, leche y hielo."},
{id:5,name:"Americano",cat:"cafe",price:220,desc:"Limpio e intenso."},
{id:6,name:"Vainilla Cream",cat:"especial",price:330,desc:"Café frío con vainilla."},
{id:7,name:"Mocha",cat:"cafe",price:300,desc:"Café y chocolate."},
{id:8,name:"Frappé",cat:"frio",price:350,desc:"Frío y cremoso."}];
let cart=[];
const money=n=>"RD$"+n.toLocaleString("es-DO");
function render(cat="todos"){const box=document.getElementById("products");const list=cat==="todos"?products:products.filter(p=>p.cat===cat);box.innerHTML=list.map(p=>`<article class="product"><div class="drink"><div>LOGO</div></div><div class="info"><h3>${p.name}</h3><p>${p.desc}</p><div class="bottom"><span class="price">${money(p.price)}</span><button class="add" onclick="add(${p.id})">Agregar</button></div></div></article>`).join("")}
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});renderCart();document.body.classList.add("cart-open")}
function renderCart(){let count=0,total=0;const box=document.getElementById("items");box.innerHTML=cart.length?cart.map(i=>{const p=products.find(x=>x.id===i.id);count+=i.qty;total+=p.price*i.qty;return `<div class="cart-row"><div><b>${p.name}</b><div class="qty"><button onclick="change(${p.id},-1)">−</button>${i.qty}<button onclick="change(${p.id},1)">+</button></div></div><b>${money(p.price*i.qty)}</b></div>`}).join(""):"<p class='note'>Tu carrito está vacío.</p>";document.getElementById("count").textContent=count;document.getElementById("total").textContent=money(total)}
function change(id,d){let x=cart.find(i=>i.id===id);x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);renderCart()}
document.getElementById("cartBtn").onclick=()=>document.body.classList.add("cart-open");
document.getElementById("closeCart").onclick=()=>document.body.classList.remove("cart-open");
document.getElementById("overlay").onclick=()=>document.body.classList.remove("cart-open");
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.cat)});
document.getElementById("checkout").onclick=()=>{if(!cart.length)return alert("Agrega una bebida al carrito.");document.getElementById("modal").style.display="grid";document.body.classList.remove("cart-open")};
document.getElementById("closeModal").onclick=()=>document.getElementById("modal").style.display="none";
document.getElementById("form").onsubmit=e=>{e.preventDefault();alert("El checkout está listo. El siguiente paso es conectar AZUL, CardNET u otro proveedor de pagos.");};
render();renderCart();
