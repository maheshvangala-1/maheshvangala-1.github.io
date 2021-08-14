/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/order.js":
/*!**************************!*\
  !*** ./src/app/order.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_order_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/order.scss */ "./src/style/order.scss");

var firebaseConfig = {
  apiKey: "AIzaSyDx53oC3GtlInJ3lrj98UtlfHb1x1K5r5o",
  authDomain: "restaurant-mgmt-5f4e6.firebaseapp.com",
  projectId: "restaurant-mgmt-5f4e6",
  storageBucket: "restaurant-mgmt-5f4e6.appspot.com",
  messagingSenderId: "1086270523601",
  appId: "1:1086270523601:web:78140f673079dd8700ddf0"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig);
var vegMenu = [{
  id: 1,
  type: "starter",
  name: "Veg Manchurian",
  image: "./public/images/starter1.jpg",
  cost: 199,
  quantity: 1
}, {
  id: 2,
  type: "starter",
  name: "Paneer Tikka",
  image: "./public/images/starter2.jfif",
  cost: 255,
  quantity: 1
}, {
  id: 3,
  type: "starter",
  name: "Crispy Corn",
  image: "./public/images/starter3.jpg",
  cost: 199,
  quantity: 1
}, {
  id: 4,
  type: "maincourse",
  name: "Chicken Biryani",
  image: "./public/images/maincourse1.jfif",
  cost: 240,
  quantity: 1
}, {
  id: 5,
  type: "maincourse",
  name: "Paneer Biryani",
  image: "./public/images/maincourse2.jpg",
  cost: 225,
  quantity: 1
}, {
  id: 6,
  type: "maincourse",
  name: "Veg Pulao",
  image: "./public/images/maincourse3.jfif",
  cost: 240,
  quantity: 1
}, {
  id: 7,
  type: "dessert",
  name: "Ice cream",
  image: "./public/images/dessert1.jfif",
  cost: 240,
  quantity: 1
}, {
  id: 8,
  type: "dessert",
  name: "Gulab Jamun",
  image:"./public/images/dessert2.jfif",
  //image: "../public/images/dessert2.jfif",
  cost: 240,
  quantity: 1
}, {
  id: 9,
  type: "dessert",
  name: "Rasmalai",
  image: "./public/images/dessert3.jfif",
  cost: 240,
  quantity: 1
}];

//console.log(digitalData)
// let fitems=document.getElementsByClassName("food-item")
// if(fitems)
// {
// let l=fitems.length
// alert(l)
// for(let i=0;i<l;i++)
// {
//   fitems[i].onclick=function(e){
//     let p=fitems[i].children[1].innerText;
//     alert(p)
//   }
// }
// }
if (document.getElementById("welcome")) {
  var loginName = localStorage.getItem("username45");
  document.getElementById("welcome").innerHTML = "<i class=\"fa fa-user\" aria-hidden=\"true\"></i> " + loginName;
}

if (document.getElementById("menu")) {
  for (var i = 0; i < vegMenu.length; i++) {
    if (vegMenu[i].type = "starter") {
      var div = document.createElement("div");
      //div.id = "food-menu";
      div.className="food-item"
      var image = document.createElement("img");
      image.src = vegMenu[i].image; // image.height="200px";
      // image.width="200px";

      var name = document.createElement("h4");
      name.innerHTML = vegMenu[i].name;
      var cost = document.createElement("P");
      cost.innerHTML = "&#8377 " + vegMenu[i].cost;
      image.id = "menu-img";
      image.className="food-img"
      var button = document.createElement("button");
      button.id = vegMenu[i].id;
      button.addEventListener("click", function () {
        
        addCart(this);
      });
      button.innerHTML = "Add to cart";
      div.appendChild(image);
      div.appendChild(name);
      cost.appendChild(button);
      div.appendChild(cost);
      
      document.getElementById("menu2").appendChild(div);
    }
  }
}


var cart = [];

// document.onclick=function(e)
// {
//   if(e.target.className=="food-img")
//   {
    
//     let fname=e.target.nextElementSibling.innerHTML
//     console.log(fname)
//     digitalData.products.prodview=fname
//     console.log(digitalData)
//   }
// }

  // let menudivs=document.getElementsByClassName("food-item")
  // if(menudivs)
  // {
  //   let l=menudivs.length
  //   for(let i=0;i<l;i++)
  //   {
  //     let img1=menudivs[i].children[0]

  //     let p1=menudivs[i].children[2].children
  //     p1[0].onclick=function(e)
  //     {
  //       digitalData.products.productEvent="cart-add"
  //       digitalData.products.cartadd=menudivs[i].children[1].innerHTML
  //       console.log(digitalData)
        
  //     }
  //     if(img1)
  //     {
  //       img1.onclick=function(e)
  //       {
  //         digitalData.products.productEvent="prod-view"
  //         digitalData.products.prodview=menudivs[i].children[1].innerHTML
  //         console.log(digitalData)
  //       }
  //     }
  //   }
  // }


function Item(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
}

function saveCart() {
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function loadCart() {
  cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
}

if (sessionStorage.getItem("shoppingCart") != null) {
  loadCart();
}

function addItemToCart(name, price, count) {
  digitalData.products.cartadd=name
  _satellite.track("Cart-Add")
  
  if(cart.length==0)
  {

    digitalData.products.cartOpen=name;
    _satellite.track("Cart-Open")
  }
  for (var item in cart) {
  
    if (cart[item].name === name) {
      cart[item].count++;
      saveCart();
      displayCart();
      return;
    }
  }

  var item = new Item(name, price, count);
  
  cart.push(item);
  console.log(cart)
  saveCart();
  displayCart();
}

function setCountForItem(name, count) {
  for (var i in cart) {
    if (cart[i].name === name) {
      cart[i].count = count;
      break;
    }
  }
}

function removeItemFromCart(name) {
  for (var item in cart) {
    if (cart[item].name === name) {
      cart[item].count--;
      _satellite.track("Cart-Remove")

      if (cart[item].count === 0) {
        cart.splice(item, 1);
      }

      break;
    }
  }

  saveCart();
}

function removeItemFromCartAll(name) {
  for (var item in cart) {
    if (cart[item].name === name) {
      cart.splice(item, 1);
      break;
    }
  }

  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function totalCount() {
  var totalCount = 0;

  for (var item in cart) {
    totalCount += cart[item].count;
  }

  return totalCount;
}

function totalCart() {
  var totalCart = 0;

  for (var item in cart) {
    totalCart += cart[item].price * cart[item].count;
  }

  return Number(totalCart);
}

function listCart() {
  var cartCopy = [];

  for (i in cart) {
    var item = cart[i];
    var itemCopy = {};

    for (var p in item) {
      itemCopy[p] = item[p];
    }

    itemCopy.total = Number(item.price * item.count);
    cartCopy.push(itemCopy);
  }

  return cartCopy;
}

displayCart();

function addCart(button) {
  var id = Number(button.id) - 1;
  var name = vegMenu[id].name;
  var price = vegMenu[id].cost;
  addItemToCart(name, price, 1);
}

function displayCart() {
  var cartArray = listCart();

  console.log("HIIIIII ",cartArray)
  var output = "";
  // digitalData.products.cartview=[]
  //console.log("HII",cartArray)
  for (var i in cartArray) {
    // digitalData.products.cartview.push(cartArray[i].name)

    output += "<tr>" + "<td>" + cartArray[i].name + "</td>" + "<td><div id='variant'><button id=minus name=" + i + ">-</button>" + "<span id=a" + i + " class='inputs'>" + cartArray[i].count + "</span>" + "<button  id='plus' name=" + i + " >+</button></div></td>" + "<td>" + " &#8377 " + cartArray[i].total + "</td>" + "</tr>";
  }
  console.log(digitalData)

  if (document.getElementById("ord-cnt")) document.getElementById("ord-cnt").dataset.count = totalCount();
  document.getElementById("disp-items").innerHTML = output;
  document.getElementById("total").innerHTML = "&#8377 " + totalCart();

  if (document.getElementById("topay")) {
    document.getElementById("topay").innerHTML = totalCart() + 30;
  }

  if (document.getElementById("totamt")) {
    document.getElementById("totamt").innerHTML = totalCart() + 30;
  }

  document.querySelectorAll("#plus").forEach(function (element) {
    element.addEventListener("click", function (e) {
      var id = e.target.name;
      var qty = document.querySelector("span#a".concat(id));
      qty.innerHTML = Number(qty.innerHTML) + 1;
      addItemToCart(cartArray[Number(id)].name, cartArray[Number(id)].price, 1);
      displayCart();
    });
  });
  document.querySelectorAll("#minus").forEach(function (element) {
    element.addEventListener("click", function (e) {
      var id = e.target.name;
      var qty = document.querySelector("span#a".concat(id));
      qty.innerHTML = Number(qty.innerHTML) - 1;
      removeItemFromCart(cartArray[Number(id)].name);
      displayCart();
    });
  });
  document.querySelectorAll("#remove").forEach(function (element) {
    element.addEventListener("click", function (e) {
      var id = e.target.name;
      var qty = document.querySelector("span#a".concat(id));
      qty.innerHTML = Number(qty.innerHTML) - 1;
      removeItemFromCartAll(cartArray[Number(id)].name);
      displayCart();
    });
  });
}

if (document.getElementById("cart-btn")) {
  document.getElementById("cart-btn").onclick = function () {
    document.getElementById("cart-modal").style.visibility = "visible";
   

    let tab1=document.getElementById("disp-items").children[0].children
    
    console.log(tab1)
    let arr=[]
    
    for(let i=0;i<tab1.length;i++)
    {
      let p11=tab1[i].children[0].innerHTML
      
      arr.push(p11) 
    }
    console.log(arr)
    digitalData.products.cartview=arr;
    
    _satellite.track("Cart-View")

    digitalData.products.productEvent="cart-view"



  };
}

if (document.getElementById("cancel")) {
  document.getElementById("cancel").onclick = function () {
    document.getElementById("cart-modal").style.visibility = "hidden";
  };
}

if (document.getElementById("checkout")) {
  document.getElementById("checkout").onclick = function () {
    window.location.href = "./checkout.html";
    // digitalData.products.productEvent="checkout"
  };
}

if (document.getElementById('hamburger')) {
  document.getElementById('hamburger').onclick = function () {
    var x = document.getElementById("order-header");

    if (x.className === "order-header") {
      x.className = "order-header1";
    }
  };
}

if (document.getElementById("reserve")) {
  document.getElementById("reserve").onclick = function () {
    window.location.href = "./users.html";
  };
}

if (document.getElementById("logout")) {
  document.getElementById("logout").onclick = function logout() {
    firebase.auth().signOut().then(function () {
      localStorage.setItem("loginname", null);
      window.location.href = "./index.html";
    })["catch"](function (error) {});
  };
}

if(document.getElementsByClassName("food-img")){
  let l=document.getElementsByClassName("food-img").length
  
  let p=document.getElementsByClassName("food-img")
  for(let i=0;i<l;i++)
  {
    p[i].onclick=function(){
      let p11=this.nextElementSibling.innerHTML

      digitalData.products.prodview=p11

      _satellite.track("Product-View")
      // console.log("DHONI",digitalData.products.prodview)
      

    }
  }
}

/***/ }),

/***/ "./src/style/order.scss":
/*!******************************!*\
  !*** ./src/style/order.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app/order.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL2FwcC9vcmRlci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL3N0eWxlL29yZGVyLnNjc3M/MzljMSIsIndlYnBhY2s6Ly9yZXN0YXVyYW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3RhdXJhbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsImZpcmViYXNlIiwiaW5pdGlhbGl6ZUFwcCIsInZlZ01lbnUiLCJpZCIsInR5cGUiLCJuYW1lIiwiaW1hZ2UiLCJjb3N0IiwicXVhbnRpdHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibG9naW5OYW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImlubmVySFRNTCIsImkiLCJsZW5ndGgiLCJkaXYiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiYnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZENhcnQiLCJhcHBlbmRDaGlsZCIsImNhcnQiLCJJdGVtIiwicHJpY2UiLCJjb3VudCIsInNhdmVDYXJ0Iiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImxvYWRDYXJ0IiwicGFyc2UiLCJhZGRJdGVtVG9DYXJ0IiwiaXRlbSIsImRpc3BsYXlDYXJ0IiwicHVzaCIsInNldENvdW50Rm9ySXRlbSIsInJlbW92ZUl0ZW1Gcm9tQ2FydCIsInNwbGljZSIsInJlbW92ZUl0ZW1Gcm9tQ2FydEFsbCIsImNsZWFyQ2FydCIsInRvdGFsQ291bnQiLCJ0b3RhbENhcnQiLCJOdW1iZXIiLCJsaXN0Q2FydCIsImNhcnRDb3B5IiwiaXRlbUNvcHkiLCJwIiwidG90YWwiLCJjYXJ0QXJyYXkiLCJvdXRwdXQiLCJkYXRhc2V0IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGVtZW50IiwiZSIsInRhcmdldCIsInF0eSIsInF1ZXJ5U2VsZWN0b3IiLCJvbmNsaWNrIiwic3R5bGUiLCJ2aXNpYmlsaXR5Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwieCIsImNsYXNzTmFtZSIsImxvZ291dCIsImF1dGgiLCJzaWduT3V0IiwidGhlbiIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLElBQUlBLGNBQWMsR0FBRztBQUNqQkMsUUFBTSxFQUFFLHlDQURTO0FBRWpCQyxZQUFVLEVBQUUsdUNBRks7QUFHakJDLFdBQVMsRUFBRSx1QkFITTtBQUlqQkMsZUFBYSxFQUFFLG1DQUpFO0FBS2pCQyxtQkFBaUIsRUFBRSxlQUxGO0FBTWpCQyxPQUFLLEVBQUU7QUFOVSxDQUFyQixDLENBUUE7O0FBQ0FDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QlIsY0FBdkI7QUFDQSxJQUFJUyxPQUFPLEdBQUcsQ0FDVjtBQUNJQyxJQUFFLEVBQUUsQ0FEUjtBQUVJQyxNQUFJLEVBQUUsU0FGVjtBQUdJQyxNQUFJLEVBQUUsZ0JBSFY7QUFJSUMsT0FBSyxFQUFFLCtCQUpYO0FBS0lDLE1BQUksRUFBRSxHQUxWO0FBTUlDLFVBQVEsRUFBRTtBQU5kLENBRFUsRUFTVjtBQUNJTCxJQUFFLEVBQUUsQ0FEUjtBQUVJQyxNQUFJLEVBQUUsU0FGVjtBQUdJQyxNQUFJLEVBQUUsY0FIVjtBQUlJQyxPQUFLLEVBQUUsZ0NBSlg7QUFLSUMsTUFBSSxFQUFFLEdBTFY7QUFNSUMsVUFBUSxFQUFFO0FBTmQsQ0FUVSxFQWlCVjtBQUNJTCxJQUFFLEVBQUUsQ0FEUjtBQUVJQyxNQUFJLEVBQUUsU0FGVjtBQUdJQyxNQUFJLEVBQUUsYUFIVjtBQUlJQyxPQUFLLEVBQUUsK0JBSlg7QUFLSUMsTUFBSSxFQUFFLEdBTFY7QUFNSUMs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QixFQUFvQztBQUNsQ0QsT0FBQyxDQUFDQyxTQUFGLEdBQWMsZUFBZDtBQUNEO0FBQ0osR0FMRDtBQU1IOztBQUNELElBQUk1RCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztBQUNwQ0QsVUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLEVBQW1Db0QsT0FBbkMsR0FBNkMsWUFBWTtBQUNyREcsVUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QixjQUF2QjtBQUNILEdBRkQ7QUFHSDs7QUFFRCxJQUFJMUQsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQUosRUFBdUM7QUFDbkNELFVBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixFQUFrQ29ELE9BQWxDLEdBQTRDLFNBQVNRLE1BQVQsR0FBa0I7QUFDMUR0RSxZQUFRLENBQ0h1RSxJQURMLEdBRUtDLE9BRkwsR0FHS0MsSUFITCxDQUdVLFlBQU07QUFDUjdELGtCQUFZLENBQUNrQixPQUFiLENBQXFCLFdBQXJCLEVBQWtDLElBQWxDO0FBQ0FtQyxZQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLGNBQXZCO0FBQ0gsS0FOTCxXQU9XLFVBQUNPLEtBQUQsRUFBVyxDQUFFLENBUHhCO0FBUUgsR0FURDtBQVVILEM7Ozs7Ozs7Ozs7O0FDblVEOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoib3JkZXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi4vc3R5bGUvb3JkZXIuc2Nzc1wiO1xyXG52YXIgZmlyZWJhc2VDb25maWcgPSB7XHJcbiAgICBhcGlLZXk6IFwiQUl6YVN5RHg1M29DM0d0bEluSjNscmo5OFV0bGZIYjF4MUs1cjVvXCIsXHJcbiAgICBhdXRoRG9tYWluOiBcInJlc3RhdXJhbnQtbWdtdC01ZjRlNi5maXJlYmFzZWFwcC5jb21cIixcclxuICAgIHByb2plY3RJZDogXCJyZXN0YXVyYW50LW1nbXQtNWY0ZTZcIixcclxuICAgIHN0b3JhZ2VCdWNrZXQ6IFwicmVzdGF1cmFudC1tZ210LTVmNGU2LmFwcHNwb3QuY29tXCIsXHJcbiAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxMDg2MjcwNTIzNjAxXCIsXHJcbiAgICBhcHBJZDogXCIxOjEwODYyNzA1MjM2MDE6d2ViOjc4MTQwZjY3MzA3OWRkODcwMGRkZjBcIixcclxufTtcclxuLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZVxyXG5maXJlYmFzZS5pbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcclxudmFyIHZlZ01lbnUgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgdHlwZTogXCJzdGFydGVyXCIsXHJcbiAgICAgICAgbmFtZTogXCJWZWcgTWFuY2h1cmlhblwiLFxyXG4gICAgICAgIGltYWdlOiBcIi4uL3B1YmxpYy9pbWFnZXMvc3RhcnRlcjEuanBnXCIsXHJcbiAgICAgICAgY29zdDogMTk5LFxyXG4gICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogMixcclxuICAgICAgICB0eXBlOiBcInN0YXJ0ZXJcIixcclxuICAgICAgICBuYW1lOiBcIlBhbmVlciBUaWtrYVwiLFxyXG4gICAgICAgIGltYWdlOiBcIi4uL3B1YmxpYy9pbWFnZXMvc3RhcnRlcjIuamZpZlwiLFxyXG4gICAgICAgIGNvc3Q6IDI1NSxcclxuICAgICAgICBxdWFudGl0eTogMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgdHlwZTogXCJzdGFydGVyXCIsXHJcbiAgICAgICAgbmFtZTogXCJDcmlzcHkgQ29yblwiLFxyXG4gICAgICAgIGltYWdlOiBcIi4uL3B1YmxpYy9pbWFnZXMvc3RhcnRlcjMuanBnXCIsXHJcbiAgICAgICAgY29zdDogMTk5LFxyXG4gICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogNCxcclxuICAgICAgICB0eXBlOiBcIm1haW5jb3Vyc2VcIixcclxuICAgICAgICBuYW1lOiBcIkNoaWNrZW4gQmlyeWFuaVwiLFxyXG4gICAgICAgIGltYWdlOiBcIi4uL3B1YmxpYy9pbWFnZXMvbWFpbmNvdXJzZTEuamZpZlwiLFxyXG4gICAgICAgIGNvc3Q6IDI0MCxcclxuICAgICAgICBxdWFudGl0eTogMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDUsXHJcbiAgICAgICAgdHlwZTogXCJtYWluY291cnNlXCIsXHJcbiAgICAgICAgbmFtZTogXCJQYW5lZXIgQmlyeWFuaVwiLFxyXG4gICAgICAgIGltYWdlOiBcIi4uL3B1YmxpYy9pbWFnZXMvbWFpbmNvdXJzZTIuanBnXCIsXHJcbiAgICAgICAgY29zdDogMjI1LFxyXG4gICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogNixcclxuICAgICAgICB0eXBlOiBcIm1haW5jb3Vyc2VcIixcclxuICAgICAgICBuYW1lOiBcIlZlZyBQdWxhb1wiLFxyXG4gICAgICAgIGltYWdlOiBcIi4uL3B1YmxpYy9pbWFnZXMvbWFpbmNvdXJzZTMuamZpZlwiLFxyXG4gICAgICAgIGNvc3Q6IDI0MCxcclxuICAgICAgICBxdWFudGl0eTogMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDcsXHJcbiAgICAgICAgdHlwZTogXCJkZXNzZXJ0XCIsXHJcbiAgICAgICAgbmFtZTogXCJJY2UgY3JlYW1cIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL2Rlc3NlcnQxLmpmaWZcIixcclxuICAgICAgICBjb3N0OiAyNDAsXHJcbiAgICAgICAgcXVhbnRpdHk6IDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA4LFxyXG4gICAgICAgIHR5cGU6IFwiZGVzc2VydFwiLFxyXG4gICAgICAgIG5hbWU6IFwiR3VsYWIgSmFtdW5cIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL2Rlc3NlcnQyLmpmaWZcIixcclxuICAgICAgICBjb3N0OiAyNDAsXHJcbiAgICAgICAgcXVhbnRpdHk6IDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA5LFxyXG4gICAgICAgIHR5cGU6IFwiZGVzc2VydFwiLFxyXG4gICAgICAgIG5hbWU6IFwiUmFzbWFsYWlcIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL2Rlc3NlcnQzLmpmaWZcIixcclxuICAgICAgICBjb3N0OiAyNDAsXHJcbiAgICAgICAgcXVhbnRpdHk6IDEsXHJcbiAgICB9LFxyXG5dO1xyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlbGNvbWVcIikpe1xyXG4gIHZhciBsb2dpbk5hbWU9bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZTQ1XCIpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VsY29tZVwiKS5pbm5lckhUTUw9YDxpIGNsYXNzPVwiZmEgZmEtdXNlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gYCtsb2dpbk5hbWU7XHJcbn1cclxuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudVwiKSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZWdNZW51Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCh2ZWdNZW51W2ldLnR5cGUgPSBcInN0YXJ0ZXJcIikpIHtcclxuICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdi5pZCA9IFwiZm9vZC1tZW51XCI7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHZlZ01lbnVbaV0uaW1hZ2U7XHJcbiAgICAgICAgICAgIC8vIGltYWdlLmhlaWdodD1cIjIwMHB4XCI7XHJcbiAgICAgICAgICAgIC8vIGltYWdlLndpZHRoPVwiMjAwcHhcIjtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XHJcbiAgICAgICAgICAgIG5hbWUuaW5uZXJIVE1MID0gdmVnTWVudVtpXS5uYW1lO1xyXG4gICAgICAgICAgICB2YXIgY29zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJQXCIpO1xyXG4gICAgICAgICAgICBjb3N0LmlubmVySFRNTCA9IFwiJiM4Mzc3IFwiICsgdmVnTWVudVtpXS5jb3N0O1xyXG4gICAgICAgICAgICBpbWFnZS5pZCA9IFwibWVudS1pbWdcIjtcclxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5pZCA9IHZlZ01lbnVbaV0uaWQ7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2FydCh0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBcIkFkZCB0byBjYXJ0XCI7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgICAgICAgICAgY29zdC5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY29zdCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudTJcIikuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxudmFyIGNhcnQgPSBbXTtcclxuZnVuY3Rpb24gSXRlbShuYW1lLCBwcmljZSwgY291bnQpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnByaWNlID0gcHJpY2U7XHJcbiAgICB0aGlzLmNvdW50ID0gY291bnQ7XHJcbn1cclxuZnVuY3Rpb24gc2F2ZUNhcnQoKSB7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwic2hvcHBpbmdDYXJ0XCIsIEpTT04uc3RyaW5naWZ5KGNhcnQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZENhcnQoKSB7XHJcbiAgICBjYXJ0ID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwic2hvcHBpbmdDYXJ0XCIpKTtcclxufVxyXG5pZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInNob3BwaW5nQ2FydFwiKSAhPSBudWxsKSB7XHJcbiAgICBsb2FkQ2FydCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRJdGVtVG9DYXJ0KG5hbWUsIHByaWNlLCBjb3VudCkge1xyXG4gICAgZm9yICh2YXIgaXRlbSBpbiBjYXJ0KSB7XHJcbiAgICAgICAgaWYgKGNhcnRbaXRlbV0ubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICBjYXJ0W2l0ZW1dLmNvdW50Kys7XHJcbiAgICAgICAgICAgIHNhdmVDYXJ0KCk7XHJcbiAgICAgICAgICAgIGRpc3BsYXlDYXJ0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgaXRlbSA9IG5ldyBJdGVtKG5hbWUsIHByaWNlLCBjb3VudCk7XHJcbiAgICBjYXJ0LnB1c2goaXRlbSk7XHJcbiAgICBzYXZlQ2FydCgpO1xyXG4gICAgZGlzcGxheUNhcnQoKTtcclxufVxyXG5mdW5jdGlvbiBzZXRDb3VudEZvckl0ZW0obmFtZSwgY291bnQpIHtcclxuICAgIGZvciAodmFyIGkgaW4gY2FydCkge1xyXG4gICAgICAgIGlmIChjYXJ0W2ldLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgY2FydFtpXS5jb3VudCA9IGNvdW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlSXRlbUZyb21DYXJ0KG5hbWUpIHtcclxuICAgIGZvciAodmFyIGl0ZW0gaW4gY2FydCkge1xyXG4gICAgICAgIGlmIChjYXJ0W2l0ZW1dLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgY2FydFtpdGVtXS5jb3VudC0tO1xyXG4gICAgICAgICAgICBpZiAoY2FydFtpdGVtXS5jb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2FydC5zcGxpY2UoaXRlbSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2F2ZUNhcnQoKTtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVJdGVtRnJvbUNhcnRBbGwobmFtZSkge1xyXG4gICAgZm9yICh2YXIgaXRlbSBpbiBjYXJ0KSB7XHJcbiAgICAgICAgaWYgKGNhcnRbaXRlbV0ubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICBjYXJ0LnNwbGljZShpdGVtLCAxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2F2ZUNhcnQoKTtcclxufVxyXG5mdW5jdGlvbiBjbGVhckNhcnQoKSB7XHJcbiAgICBjYXJ0ID0gW107XHJcbiAgICBzYXZlQ2FydCgpO1xyXG59XHJcbmZ1bmN0aW9uIHRvdGFsQ291bnQoKSB7XHJcbiAgICB2YXIgdG90YWxDb3VudCA9IDA7XHJcbiAgICBmb3IgKHZhciBpdGVtIGluIGNhcnQpIHtcclxuICAgICAgICB0b3RhbENvdW50ICs9IGNhcnRbaXRlbV0uY291bnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG90YWxDb3VudDtcclxufVxyXG5mdW5jdGlvbiB0b3RhbENhcnQoKSB7XHJcbiAgICB2YXIgdG90YWxDYXJ0ID0gMDtcclxuICAgIGZvciAodmFyIGl0ZW0gaW4gY2FydCkge1xyXG4gICAgICAgIHRvdGFsQ2FydCArPSBjYXJ0W2l0ZW1dLnByaWNlICogY2FydFtpdGVtXS5jb3VudDtcclxuICAgIH1cclxuICAgIHJldHVybiBOdW1iZXIodG90YWxDYXJ0KTtcclxufVxyXG5mdW5jdGlvbiBsaXN0Q2FydCgpIHtcclxuICAgIHZhciBjYXJ0Q29weSA9IFtdO1xyXG4gICAgZm9yIChpIGluIGNhcnQpIHtcclxuICAgICAgICB2YXIgaXRlbSA9IGNhcnRbaV07XHJcbiAgICAgICAgdmFyIGl0ZW1Db3B5ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBpdGVtKSB7XHJcbiAgICAgICAgICAgIGl0ZW1Db3B5W3BdID0gaXRlbVtwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbUNvcHkudG90YWwgPSBOdW1iZXIoaXRlbS5wcmljZSAqIGl0ZW0uY291bnQpO1xyXG4gICAgICAgIGNhcnRDb3B5LnB1c2goaXRlbUNvcHkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhcnRDb3B5O1xyXG59XHJcbmRpc3BsYXlDYXJ0KCk7XHJcbmZ1bmN0aW9uIGFkZENhcnQoYnV0dG9uKSB7XHJcbiAgICB2YXIgaWQgPSBOdW1iZXIoYnV0dG9uLmlkKSAtIDE7XHJcbiAgICB2YXIgbmFtZSA9IHZlZ01lbnVbaWRdLm5hbWU7XHJcbiAgICB2YXIgcHJpY2UgPSB2ZWdNZW51W2lkXS5jb3N0O1xyXG4gICAgYWRkSXRlbVRvQ2FydChuYW1lLCBwcmljZSwgMSk7XHJcbn1cclxuZnVuY3Rpb24gZGlzcGxheUNhcnQoKSB7XHJcbiAgICB2YXIgY2FydEFycmF5ID0gbGlzdENhcnQoKTtcclxuICAgIHZhciBvdXRwdXQgPSBcIlwiO1xyXG4gICAgZm9yICh2YXIgaSBpbiBjYXJ0QXJyYXkpIHtcclxuICAgICAgICBvdXRwdXQgKz1cclxuICAgICAgICAgICAgXCI8dHI+XCIgK1xyXG4gICAgICAgICAgICBcIjx0ZD5cIiArXHJcbiAgICAgICAgICAgIGNhcnRBcnJheVtpXS5uYW1lICtcclxuICAgICAgICAgICAgXCI8L3RkPlwiICtcclxuICAgICAgICAgICAgXCI8dGQ+PGRpdiBpZD0ndmFyaWFudCc+PGJ1dHRvbiBpZD1taW51cyBuYW1lPVwiICtcclxuICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgIFwiPi08L2J1dHRvbj5cIiArXHJcbiAgICAgICAgICAgIFwiPHNwYW4gaWQ9YVwiICtcclxuICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgIFwiIGNsYXNzPSdpbnB1dHMnPlwiICtcclxuICAgICAgICAgICAgY2FydEFycmF5W2ldLmNvdW50ICtcclxuICAgICAgICAgICAgXCI8L3NwYW4+XCIgK1xyXG4gICAgICAgICAgICBcIjxidXR0b24gIGlkPSdwbHVzJyBuYW1lPVwiICtcclxuICAgICAgICAgICAgaSArXHJcbiAgICAgICAgICAgIFwiID4rPC9idXR0b24+PC9kaXY+PC90ZD5cIiArXHJcbiAgICAgICAgICAgIFwiPHRkPlwiICtcclxuICAgICAgICAgICAgXCIgJiM4Mzc3IFwiICtcclxuICAgICAgICAgICAgY2FydEFycmF5W2ldLnRvdGFsICtcclxuICAgICAgICAgICAgXCI8L3RkPlwiICtcclxuICAgICAgICAgICAgXCI8L3RyPlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3JkLWNudFwiKSlcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9yZC1jbnRcIikuZGF0YXNldC5jb3VudCA9IHRvdGFsQ291bnQoKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcC1pdGVtc1wiKS5pbm5lckhUTUwgPSBvdXRwdXQ7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFsXCIpLmlubmVySFRNTCA9IFwiJiM4Mzc3IFwiICsgdG90YWxDYXJ0KCk7XHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3BheVwiKSkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wYXlcIikuaW5uZXJIVE1MID0gdG90YWxDYXJ0KCkgKyAzMDtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFtdFwiKSkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG90YW10XCIpLmlubmVySFRNTCA9IHRvdGFsQ2FydCgpICsgMzA7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3BsdXNcIikuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGUudGFyZ2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGxldCBxdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzcGFuI2Eke2lkfWApO1xyXG4gICAgICAgICAgICBxdHkuaW5uZXJIVE1MID0gTnVtYmVyKHF0eS5pbm5lckhUTUwpICsgMTtcclxuICAgICAgICAgICAgYWRkSXRlbVRvQ2FydChcclxuICAgICAgICAgICAgICAgIGNhcnRBcnJheVtOdW1iZXIoaWQpXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgY2FydEFycmF5W051bWJlcihpZCldLnByaWNlLFxyXG4gICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBkaXNwbGF5Q2FydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI21pbnVzXCIpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBlLnRhcmdldC5uYW1lO1xyXG4gICAgICAgICAgICBsZXQgcXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3BhbiNhJHtpZH1gKTtcclxuICAgICAgICAgICAgcXR5LmlubmVySFRNTCA9IE51bWJlcihxdHkuaW5uZXJIVE1MKSAtIDE7XHJcbiAgICAgICAgICAgIHJlbW92ZUl0ZW1Gcm9tQ2FydChjYXJ0QXJyYXlbTnVtYmVyKGlkKV0ubmFtZSk7XHJcbiAgICAgICAgICAgIGRpc3BsYXlDYXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcmVtb3ZlXCIpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBlLnRhcmdldC5uYW1lO1xyXG4gICAgICAgICAgICBsZXQgcXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3BhbiNhJHtpZH1gKTtcclxuICAgICAgICAgICAgcXR5LmlubmVySFRNTCA9IE51bWJlcihxdHkuaW5uZXJIVE1MKSAtIDE7XHJcbiAgICAgICAgICAgIHJlbW92ZUl0ZW1Gcm9tQ2FydEFsbChjYXJ0QXJyYXlbTnVtYmVyKGlkKV0ubmFtZSk7XHJcbiAgICAgICAgICAgIGRpc3BsYXlDYXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5pZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJ0LWJ0blwiKSkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJ0LWJ0blwiKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FydC1tb2RhbFwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICB9O1xyXG59XHJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbmNlbFwiKSkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWxcIikub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcnQtbW9kYWxcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICB9O1xyXG59XHJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoZWNrb3V0XCIpKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoZWNrb3V0XCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vY2hlY2tvdXQuaHRtbFwiO1xyXG4gICAgfTtcclxufVxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGFtYnVyZ2VyJykpe1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hhbWJ1cmdlcicpLm9uY2xpY2s9ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3JkZXItaGVhZGVyXCIpO1xyXG4gICAgICAgIGlmICh4LmNsYXNzTmFtZSA9PT0gXCJvcmRlci1oZWFkZXJcIikge1xyXG4gICAgICAgICAgeC5jbGFzc05hbWUgPSBcIm9yZGVyLWhlYWRlcjFcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXJ2ZVwiKSkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNlcnZlXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi4vdXNlcnMuaHRtbFwiO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb3V0XCIpKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ291dFwiKS5vbmNsaWNrID0gZnVuY3Rpb24gbG9nb3V0KCkge1xyXG4gICAgICAgIGZpcmViYXNlXHJcbiAgICAgICAgICAgIC5hdXRoKClcclxuICAgICAgICAgICAgLnNpZ25PdXQoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxvZ2lubmFtZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2luZGV4Lmh0bWxcIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge30pO1xyXG4gICAgfTtcclxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAvb3JkZXIuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9