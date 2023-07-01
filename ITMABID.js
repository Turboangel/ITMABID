// var width = 100;
// var addition = 2;
// var intervalID= 0;

// function increase()
// {
//       clearInterval(intervalID)
//        intervalID = setInterval(zoomin,10)
// }

// function decrease()
// {
//        clearInterval(intervalID)
//        intervalID = setInterval(zoomout,10)
// }

// function zoomin()
// {
//      if(width<200)
// {
//           width = width + addition;
//            document.getElementById("img").style.width = width;
//            console.log(width);
// }
// else{
// clearInterval(intervalID)
// }
// }

// function zoomout()
// {
//    if(width>100)
// {
//    width = width-addition;
//     document.getElementById("img").style.width = width;
//      console.log(width)
// }
// else
// {
//     clearInterval(intervalID)
// }
// }
var main = document.getElementById("main");
var bgImage = ['url("./ITMABIDimages/IMG-20230530-WA0008.jpg")'
, 'url("./ITMABIDimages/andres-vera-202NAwjisYA-unsplash.jpg")'
, 'url("./ITMABIDimages/gabrielle-henderson-Z0KoI2aysro-unsplash.jpg")',
'url("./ITMABIDimages/lilartsy-ZhmbakzCBtk-unsplash.jpg")',
'url("./ITMABIDimages/max-ducourneau-6uv43p1ePrk-unsplash.jpg")',
'url("./ITMABIDimages/patty-zavala-SniDFooLoow-unsplash.jpg")',
'url("./ITMABIDimages/tara-yates-ZL7JpQ3d1Yk-unsplash.jpg")'];
var counter = 0;
function changeBackground(){

if (counter >= bgImage.length) {
        counter = 0;
    };
main.style.backgroundImage = bgImage[counter];
       counter++;
};
    setInterval(changeBackground, 5000);

    var aim = document.getElementById("aim");
var bgColor = ["pink","blue","rgb(128, 106, 110)"
];
var i = 0;
function changebgColor() {
  if (i >= bgColor.length) {
   i = 0;
  }
  aim.style.backgroundColor = bgColor[i];
  i++;
}
setInterval(changebgColor, 5000);


var butn = document.getElementById("butn");
var btnColor = ["yellow","rgb(220, 134, 134)","rgb(212, 219, 200)"
];
var count = 0;
function changeBtnbgColor() {
  if (count >= btnColor.length) {
    count = 0;
  }
  butn.style.backgroundColor = btnColor[count];
  count++;
}
setInterval(changeBtnbgColor, 5000);

var drain = document.getElementById("top");
var bgImg = ['url("./ITMABIDimages/IMG-20230530-WA0008.jpg")'
, 'url("./ITMABIDimages/andres-vera-202NAwjisYA-unsplash.jpg")'
, 'url("./ITMABIDimages/gabrielle-henderson-Z0KoI2aysro-unsplash.jpg")',
'url("./ITMABIDimages/lilartsy-ZhmbakzCBtk-unsplash.jpg")',
'url("./ITMABIDimages/max-ducourneau-6uv43p1ePrk-unsplash.jpg")',
'url("./ITMABIDimages/patty-zavala-SniDFooLoow-unsplash.jpg")',
'url("./ITMABIDimages/tara-yates-ZL7JpQ3d1Yk-unsplash.jpg")'];
var tally = 0;
function changeBg(){
if (tally >= bgImg.length) {
        tally = 0;
    };
drain.style.backgroundImage = bgImg[tally];
       tally++;
};
    setInterval(changeBg, 5000);

const cart = document.querySelector("nav .cart");
const cartSideBar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");
const mainDiv = document.querySelector(".main-div");
const menuSidebar = document.querySelector(".menu-sidebar");
const closeMenu = document.querySelector(".close-menu");
const cartItemsTotal = document.querySelector(".No");
const cartPriceTotal = document.querySelector(".total-amount");
const cartUi = document.querySelector(".cart-sidebar .cart");
const totalDiv = document.querySelector(".total");
const clearBtn = document.querySelector(".clear-btn");
const cartContent = document.querySelector(".cart-content");

let Cart = [];
let buttonsDOM = [];
cart.addEventListener("click", function(){
  cartSideBar.style.transform = "translate(0%)";
  const bodyOverlay = document.createElement("div");
  bodyOverlay.classList.add("overlay");
  setTimeout(function(){
    document.querySelector("body").append(bodyOverlay)
  }, 300);
})

closeCart.addEventListener("click", function () {
  cartSideBar.style.transform = "translate(100%)";
  const bodyOverlay = document.querySelector(".overlay");
  document.querySelector("body").removeChild(bodyOverlay)
})

mainDiv.addEventListener("click", function() {
  menuSidebar.style.transform ="translate(0%)";
});

closeMenu.addEventListener("click", function () {
  menuSidebar.style.transform ="translate(-100%)";
})

class Product {
  async getProduct(){
    //CORS URL
    let corsURL = 'https://cors-anywhere.herokuapp.com/';
    let myURL = 'products.json';
    const response = await fetch(corsURL + myURL, {mode : 'no-cors'})
    const data = await response.json()
    let products = data.items;
    products = products.map(item=>{
      const{title,price}= item.jewelry;
      const id = item.sys;
      const image = item.jewelry.image.file.url;
      return(title,price,id,image);
    })
    return products;
  }
}
class UI{
  displayProducts(products){
    let result = "";
    products.forEach(product => {
      const productDiv = document.createElement("div")
      productDiv.innerHTML = `<div class= "product-card">
                              <img src= "${product.image}" alt= "product">
                              <span class = "add-to-cart" data-id = "${product.id}">
                              <i class="fa fa-cart--plus fa-1x"
                              style = "margin-right: 0.1em; font-size:1em;"></i>
                              Add to Cart
                              </span>
                              <div class = "product-name">${product.title}</div>
                              <div class = "product-pricing">${product.price}</div>
                              </div>`
      const p = document.querySelector(".product");
      p.append(productDiv)
    });
  }
  getButtons(){
  const btns = document.querySelectorAll(".add-to-cart")
  Array.from(btns)
  buttonsDOM=btns;
  btns.forEach((btn =>{
    let id =btn.dataset.id
    let inCart = Cart.find((item)=>item.id===id);
    if (inCart){
      btn.innerHTML = "In Cart"
      btn.dissabled = true
    }
    btn.addEventListener("click", (e)=>{
      e.currentTarget.innerHTML = "In Cart"
      e.currentTarget.style.color = "white"
      e.currentTarget.style.pointerEvents = "none"
      let cartItem = {...Storage.getStorageProducts(id), 'amount':1}
      Cart.push(cartItem)
      Storage.saveCart(Cart)
      this.setCartValues(Cart)
      this.addCartItem(cartItem)
    })
  })
  )
}
setCartValues(cart){
  let tempTotal = 0;
  let itemsTotal = 0;
  Cart.map((item) =>{
    tempTotal += (item.price*item.amount)
    itemsTotal = item.amount
    parseFloat(tempTotal.toFixed(2))
  })
  cartItemsTotal.innerHTML = itemsTotal
  cartPriceTotal.innerHTML = parseFloat(tempTotal.toFixed(2))
}
addCartItem(cartItem){
  let cartItemUI = document.createElement("div")
  cartItemUI.innerHTML= `<div class = "cart-product">
                        <div class = "product-image">
                        <img src = "${cartItem.image}" alt = "product"
                        </div>
                        <div class = "cart-product-content">
                        <div class = "cart-product-name><h3>${cartItem.title}</h3></div>
                        <div class "cart-product-price"><h3>#${cartItem.price}</h3></div>
                        <div class = "cart-product-remove" data-id= "${cartItem.id}" <a href
                        ="#" style = "color:red;">remove</a></div>
                        </div>
                        <div class = "plus-minus">
                        <i class = "fa fa-angle-left add-amount"
                        data-id="${cartItem.id}"></i>
                        <span class= "no-of-items">${cartItem.amount}</span>
                        data-id ="${cartItem.id}
                        </div>
                        </div>`
                        
                        cartContent.append(cartItemUI)
}



   setUpApp(){
    Cart =Storage.getCart()
    this.setCartValues(Cart)
    Cart.map((item=>{
      this.addCartItem(item)
    }))
   }
   cartLogic(){
    clearBtn.addEventListener("click", ()=>{
      this.closeCart()
    })
    cartContent.addEventListener("click", (event)=>{
      if (event.target.classList.contains("cart-product-remove")) {
        let id=event.target.dataset.id
        this.removeItem(id)
        let div =event.target.parentElement.parentElement.parentElement.parentElement
        div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
      }
      else if(event.target.classList.contains("add-amount")){
        let id= event.target.dataset.id
        let item =Cart.find((item)=>item.id===id)
          item.amount++
          Storage.saveCart(Cart)
          this.setCartValues(Cart)
          event.target.nextElementSibling.innerHTML = item.amount
      }
      else if (event.target.classList.contains("reduce-amount")) {
        let id = event.target.dataset.id
        let item = Cart.find((item)=>item.id===id)
        if (item.amount>1) {
          item.amount--
          Storage.saveCart(Cart)
          this.setCartValues(Cart)
          event.target.previousElementSibling.innerHTML= items.amount
        }
        else{
          this.removeItem(id)
          let div =event.target.parentElement.parentElement.parentElement.parentElement
          div.removeChild(event.target.parentElement.parentElement.parentElement.parentElement)
        }
      }
    })

   }
   addAmount(){
    const addBtn = document.querySelector("add-amount")
    addBtn.forEach((btn)=>{
      btn.addEventListener("click", (event)=>{
        let id= event.currentTarget.dataset.id
        Cart.map((item)=>{
          item.amount++
          Storage.saveCart(Cart)
          this.setCartValues(Cart)
          const amountUi = event.currentTarget.parentElement.children[1]
          amountUi.innerHTML= item.amount
        })
      })
    })
   }
   reduceAmount(){
    const reduceBtn = document.querySelector(".reduce-amount")
    reduceBtn.forEach((btn)=>{
      btn.addEventListener("click", (event)=>{
        let id = (event.currentTarget.dataset.id)
        Cart.map((item)=>{
          if (item.id===id) {
            item.amount--
            if (item.amount>0) {
              Storage.saveCart(Cart)
              this.setCartValues(Cart)
              const amountUi = event.currentTarget.parentElement.children[1]
              amountUi.innerHTML = item.amount
            }else{
              event.currentTarget.parentElement.parentElement.parentElement.removeChild(event.currentTarget.parentElement.parentElement)
              this.removeItem(id)
            }
          }
        })
      })
    })
   }
   clearCart(){
    let cartItem = Cart.map(item=>item.id)
    cartItem.forEach((id)=>this.removeItem(id))
    const cartProduct = document.querySelectorAll(".cart-product")
    cartProduct.forEach((item)=>{
      if (item) {
        item.parentElement.removeChild(item)
      }
    })
   }
   removeItem(id){
    Cart = Cart.filter((item)=>item.id!== id)
    this.setCartValues(Cart)
    Storage.saveCart(Cart)
    let button =this.getSingleButton(id)
    button.style.pointerEvents = "unset"
    button.innerHTML= `<i class = "fa fa-plus"></i>Add to Cart`
   }
   getSingleButton(id){
    let btn
    buttonsDOM.forEach((button)=>{
      if (button.dataset.id === id) {
        btn = button
      }
    })
    return btn;
   }
}
class Storage{
  static saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products))
  }
  static getStorageProducts(id){
    let products = JSON.parse(localStorage.getItem('products'))
    return products.find((items)=>items.id===id)
  }
  static saveCart(Cart){
    localStorage.setItem('Cart', JSON.stringify(Cart))
  }
  static getCart(){
    return localStorage.getItem('Cart')? JSON.parse(localStorage.getItem("Cart")):[]
  }
}
document.addEventListener("DOMContentLoaded", ()=>{
  const products = new Product;
  const ui = new UI;
  ui.setUpApp()
  products.getProduct().then(products=>{
    ui.displayProducts(products)
    Storage.saveProducts(products)
  }).then(()=>{
    ui.getButtons();
    ui.cartLogic();
  })
})






