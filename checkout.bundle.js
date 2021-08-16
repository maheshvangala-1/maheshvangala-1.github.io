/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/checkout.js":
/*!*****************************!*\
  !*** ./src/app/checkout.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var _style_checkout_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/checkout.scss */ "./src/style/checkout.scss");
  /* harmony import */ var _app_order_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/order.js */ "./src/app/order.js");
  
  
  mapboxgl.accessToken = "pk.eyJ1Ijoic3dhcG5pa2E5OCIsImEiOiJja2tmM3cybW0wcHg3MndxdDRwMHVsd3pvIn0.VmNY-6vcIA6sksGgLzBsbg";
  var mapLoaded = false;
  var mapLoaded2 = false;
  var map;
  var directions;
  var geocode;
  var map2;
  var navigation;
  
  function loadMap(origin, destination) {
    if (!mapLoaded) {
      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [78.37, 17.47],
        zoom: 13
      });
      directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
      });
      navigation = new mapboxgl.NavigationControl({
        accessToken: mapboxgl.accessToken
      });
      map.addControl(directions, 'top-left');
      map.addControl(navigation);
      map.on("load", function () {
        mapLoaded = true;
        directions.setOrigin(origin);
        directions.setDestination(destination);
      });
    } else {
      directions.setOrigin(origin);
      directions.setDestination(destination);
    }
  }
  
  map2 = new mapboxgl.Map({
    container: "map2",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [78.3880086832732, 17.44268372054046],
    zoom: 13
  });
  geocode = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  });
  map2.on("mousedown", function (e) {
    var center = map2.getCenter();
    getReverseGeocode(center.lng, center.lat);
  });
  map2.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }));
  
  function getReverseGeocode(lati, _long) {
    var lat = lati;
    var lng = _long;
    var cord = [lng, lat];
    var cord1 = [lat, lng];
    localStorage.setItem('coordinates', JSON.stringify(cord1));
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lat + "," + lng + ".json?access_token=" + mapboxgl.accessToken;
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      return document.getElementById('add-gen').value = data.features[0].place_name;
    });
  }
  
  document.getElementById("newadd").addEventListener("click", function () {
    document.getElementById("address-modal").style.visibility = "visible";
  });
  document.getElementById("close1").addEventListener("click", function () {
    document.getElementById("address-modal").style.visibility = "hidden";
  });
  document.getElementById("addressform").addEventListener("submit", function () {
    if (localStorage.getItem('address')) {
      var address = JSON.parse(localStorage.getItem('address'));
    } else {
      var address = [];
    }
  
    var coord = JSON.parse(localStorage.getItem("coordinates"));
    var distance = getDistanceFromLatLonInKm(17.44268372054046, 78.3880086832732, coord[1], coord[0]);
    console.log(distance);
  
    if (distance <= 5) {
      var addr = document.getElementById("add-gen").value;
      var city = document.getElementById("city").value;
      var landmark = document.getElementById("street").value;
      var mark = document.getElementById("mark").value;
      var username = localStorage.getItem("username45");
      var samp = {
        name: username,
        mark: mark,
        address: addr,
        landmark: landmark,
        city: city,
        latLong: JSON.parse(localStorage.getItem("coordinates"))
      };
      address.push(samp);
      localStorage.setItem("address", JSON.stringify(address));
      alert('address added');
      location.reload();
    } else {
      alert("distance is more than 5km from restaurant..!");
    }
  });
  var userAdd = JSON.parse(localStorage.getItem("address"));
  var k = "";
  
  for (var i = 0; i < userAdd.length; i++) {
    k += "<div class='addr'><p><b>".concat(userAdd[i].mark, "</b><button id=").concat(i, "  class='select-btn'>Select</button> <button class='remove-btn'><i class=\"fa fa-trash fa-lg\" id=").concat(i, "  aria-hidden=\"true\"></i></button></p>\n    <p>").concat(userAdd[i].address, "</p></div>");
  }
  
  document.getElementById("address").innerHTML = k;
  var mark;
  document.querySelectorAll(".select-btn").forEach(function (element) {
    element.addEventListener("click", function (e) {
      mark = Number(e.target.id);
      document.getElementById('payments1').scrollIntoView({
        behavior: "smooth"
      });
    });
  });
  document.querySelectorAll(".remove-btn").forEach(function (element) {
    element.addEventListener("click", function (e) {
      var id = Number(e.target.id);
      console.log(id);
      var address = JSON.parse(localStorage.getItem("address"));
  
      if (confirm('want to delete this address.?')) {
        address.splice(id, 1);
        localStorage.setItem('address', JSON.stringify(address));
        alert('address removed');
        location.reload();
      }
    });
  });
  let order_place1=document.getElementById("order-place")
  
  if(order_place1)
  {
    order_place1.onclick=function(){
      console.log(mark);
      console.log("HIII");
    
      if (typeof mark === 'undefined') {
        alert('select any address');
      } else {
        if (confirm("Do yo want to place order.?")) {
          document.getElementById("map").style.display = "block";
          var address = JSON.parse(localStorage.getItem("address"));
          var viewadd = address[mark];
          digitalData.products.cart_products=[]
          digitalData.products.cart_count=[]
          digitalData.products.cart_cost=[]
          var cartArray1 =[]
          var ele=document.getElementById("disp-items")
          var elerows=ele.children[0].children
          var l=elerows.length
          console.log(elerows)
          for(var i=0;i<l;i++)
          {
            var obj1={}
            
            obj1.name=elerows[i].children[0].innerHTML
            obj1.count=elerows[i].children[1].children[0].children[1].innerHTML
            obj1.cost=elerows[i].children[2].innerHTML.substring(3)
            cartArray1.push(obj1)
          }
          
          for (var i in cartArray1) {
           // console.log("HELLO",obj1)
            digitalData.products.cart_products.push(cartArray1[i].name)
            digitalData.products.cart_count.push(cartArray1[i].count)
            digitalData.products.cart_cost.push(cartArray1[i].cost)
      
      
          }
        
          _satellite.track("Cart Purchase")
          
        
  
  
          setTimeout(function () {
            loadMap("hyderabad", viewadd.latLong);
          }, 400);
          alert("order has been placed");
          document.getElementById('map').scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    }
  }
  // document.getElementById('order-place').onclick=function () {
  
  // }
  
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
  
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
  
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
  
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
  /***/ }),
  
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
    image: "../public/images/starter1.jpg",
    cost: 199,
    quantity: 1
  }, {
    id: 2,
    type: "starter",
    name: "Paneer Tikka",
    image: "../public/images/starter2.jfif",
    cost: 255,
    quantity: 1
  }, {
    id: 3,
    type: "starter",
    name: "Crispy Corn",
    image: "../public/images/starter3.jpg",
    cost: 199,
    quantity: 1
  }, {
    id: 4,
    type: "maincourse",
    name: "Chicken Biryani",
    image: "../public/images/maincourse1.jfif",
    cost: 240,
    quantity: 1
  }, {
    id: 5,
    type: "maincourse",
    name: "Paneer Biryani",
    image: "../public/images/maincourse2.jpg",
    cost: 225,
    quantity: 1
  }, {
    id: 6,
    type: "maincourse",
    name: "Veg Pulao",
    image: "../public/images/maincourse3.jfif",
    cost: 240,
    quantity: 1
  }, {
    id: 7,
    type: "dessert",
    name: "Ice cream",
    image: "../public/images/dessert1.jfif",
    cost: 240,
    quantity: 1
  }, {
    id: 8,
    type: "dessert",
    name: "Gulab Jamun",
    image: "../public/images/dessert2.jfif",
    cost: 240,
    quantity: 1
  }, {
    id: 9,
    type: "dessert",
    name: "Rasmalai",
    image: "../public/images/dessert3.jfif",
    cost: 240,
    quantity: 1
  }];
  
  if (document.getElementById("welcome")) {
    var loginName = localStorage.getItem("username45");
    document.getElementById("welcome").innerHTML = "<i class=\"fa fa-user\" aria-hidden=\"true\"></i> " + loginName;
  }
  
  if (document.getElementById("menu")) {
    for (var i = 0; i < vegMenu.length; i++) {
      if (vegMenu[i].type = "starter") {
        var div = document.createElement("div");
        div.id = "food-menu";
        var image = document.createElement("img");
        image.src = vegMenu[i].image; // image.height="200px";
        // image.width="200px";
  
        var name = document.createElement("h4");
        name.innerHTML = vegMenu[i].name;
        var cost = document.createElement("P");
        cost.innerHTML = "&#8377 " + vegMenu[i].cost;
        image.id = "menu-img";
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
    for (var item in cart) {
      if (cart[item].name === name) {
        digitalData.products.cartadd=name
        _satellite.track("Cart-Add")
        cart[item].count++;
        saveCart();
        displayCart();
        return;
      }
    }
  
    var item = new Item(name, price, count);
    cart.push(item);
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
      digitalData.products.cartRemove=cart[item].name
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
    var output = "";
    digitalData.products.cart_products=[]
    for (var i in cartArray) {
      output += "<tr>" + "<td>" + cartArray[i].name + "</td>" + "<td><div id='variant'><button id=minus name=" + i + ">-</button>" + "<span id=a" + i + " class='inputs'>" + cartArray[i].count + "</span>" + "<button  id='plus' name=" + i + " >+</button></div></td>" + "<td>" + " &#8377 " + cartArray[i].total + "</td>" + "</tr>";
      digitalData.products.cart_products.push(cartArray[i].name)


    }
  
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
  
  /***/ }),
  
  /***/ "./src/style/checkout.scss":
  /*!*********************************!*\
    !*** ./src/style/checkout.scss ***!
    \*********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  // extracted by mini-css-extract-plugin
  
  
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
  /******/ 	__webpack_require__("./src/app/checkout.js");
  /******/ 	// This entry module used 'exports' so it can't be inlined
  /******/ })()
  ;
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL2FwcC9jaGVja291dC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL2FwcC9vcmRlci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL3N0eWxlL2NoZWNrb3V0LnNjc3M/MjcxOSIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL3N0eWxlL29yZGVyLnNjc3M/MzljMSIsIndlYnBhY2s6Ly9yZXN0YXVyYW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3RhdXJhbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJtYXBib3hnbCIsImFjY2Vzc1Rva2VuIiwibWFwTG9hZGVkIiwibWFwTG9hZGVkMiIsIm1hcCIsImRpcmVjdGlvbnMiLCJnZW9jb2RlIiwibWFwMiIsIm5hdmlnYXRpb24iLCJsb2FkTWFwIiwib3JpZ2luIiwiZGVzdGluYXRpb24iLCJNYXAiLCJjb250YWluZXIiLCJzdHlsZSIsImNlbnRlciIsInpvb20iLCJNYXBib3hEaXJlY3Rpb25zIiwiTmF2aWdhdGlvbkNvbnRyb2wiLCJhZGRDb250cm9sIiwib24iLCJzZXRPcmlnaW4iLCJzZXREZXN0aW5hdGlvbiIsIk1hcGJveEdlb2NvZGVyIiwiZSIsImdldENlbnRlciIsImdldFJldmVyc2VHZW9jb2RlIiwibG5nIiwibGF0IiwiR2VvbG9jYXRlQ29udHJvbCIsInBvc2l0aW9uT3B0aW9ucyIsImVuYWJsZUhpZ2hBY2N1cmFjeSIsInRyYWNrVXNlckxvY2F0aW9uIiwibGF0aSIsImxvbmciLCJjb3JkIiwiY29yZDEiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsInVybCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJmZWF0dXJlcyIsInBsYWNlX25hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwidmlzaWJpbGl0eSIsImdldEl0ZW0iLCJhZGRyZXNzIiwicGFyc2UiLCJjb29yZCIsImRpc3RhbmNlIiwiZ2V0RGlzdGFuY2VGcm9tTGF0TG9uSW5LbSIsImNvbnNvbGUiLCJsb2ciLCJhZGRyIiwiY2l0eSIsImxhbmRtYXJrIiwibWFyayIsInVzZXJuYW1lIiwic2FtcCIsIm5hbWUiLCJsYXRMb25nIiwicHVzaCIsImFsZXJ0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJ1c2VyQWRkIiwiayIsImkiLCJsZW5ndGgiLCJpbm5lckhUTUwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJOdW1iZXIiLCJ0YXJnZXQiLCJpZCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJjb25maXJtIiwic3BsaWNlIiwiZGlzcGxheSIsInZpZXdhZGQiLCJzZXRUaW1lb3V0IiwibGF0MSIsImxvbjEiLCJsYXQyIiwibG9uMiIsIlIiLCJkTGF0IiwiZGVnMnJhZCIsImRMb24iLCJhIiwiTWF0aCIsInNpbiIsImNvcyIsImMiLCJhdGFuMiIsInNxcnQiLCJkIiwiZGVnIiwiUEkiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsImZpcmViYXNlIiwiaW5pdGlhbGl6ZUFwcCIsInZlZ01lbnUiLCJ0eXBlIiwiaW1hZ2UiLCJjb3N0IiwicXVhbnRpdHkiLCJsb2dpbk5hbWUiLCJkaXYiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiYnV0dG9uIiwiYWRkQ2FydCIsImFwcGVuZENoaWxkIiwiY2FydCIsIkl0ZW0iLCJwcmljZSIsImNvdW50Iiwic2F2ZUNhcnQiLCJzZXNzaW9uU3RvcmFnZSIsImxvYWRDYXJ0IiwiYWRkSXRlbVRvQ2FydCIsIml0ZW0iLCJkaXNwbGF5Q2FydCIsInNldENvdW50Rm9ySXRlbSIsInJlbW92ZUl0ZW1Gcm9tQ2FydCIsInJlbW92ZUl0ZW1Gcm9tQ2FydEFsbCIsImNsZWFyQ2FydCIsInRvdGFsQ291bnQiLCJ0b3RhbENhcnQiLCJsaXN0Q2FydCIsImNhcnRDb3B5IiwiaXRlbUNvcHkiLCJwIiwidG90YWwiLCJjYXJ0QXJyYXkiLCJvdXRwdXQiLCJkYXRhc2V0IiwicXR5IiwicXVlcnlTZWxlY3RvciIsIm9uY2xpY2siLCJ3aW5kb3ciLCJocmVmIiwieCIsImNsYXNzTmFtZSIsImxvZ291dCIsImF1dGgiLCJzaWduT3V0IiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0FBLFFBQVEsQ0FBQ0MsV0FBVCxHQUNJLCtGQURKO0FBRUEsSUFBSUMsU0FBUyxHQUFHLEtBQWhCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEtBQWpCO0FBQ0EsSUFBSUMsR0FBSjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJQyxPQUFKO0FBQ0EsSUFBSUMsSUFBSjtBQUNBLElBQUlDLFVBQUo7O0FBQ0EsU0FBU0MsT0FBVCxDQUFpQkMsTUFBakIsRUFBeUJDLFdBQXpCLEVBQXNDO0FBQ2xDLE1BQUksQ0FBQ1QsU0FBTCxFQUFnQjtBQUNaRSxPQUFHLEdBQUcsSUFBSUosUUFBUSxDQUFDWSxHQUFiLENBQWlCO0FBQ25CQyxlQUFTLEVBQUUsS0FEUTtBQUVuQkMsV0FBSyxFQUFFLG9DQUZZO0FBR25CQyxZQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUhXO0FBSW5CQyxVQUFJLEVBQUU7QUFKYSxLQUFqQixDQUFOO0FBTUFYLGNBQVUsR0FBRyxJQUFJWSxnQkFBSixDQUFxQjtBQUM5QmhCLGlCQUFXLEVBQUVELFFBQVEsQ0FBQ0M7QUFEUSxLQUFyQixDQUFiO0FBR0FPLGNBQVUsR0FBQyxJQUFJUixRQUFRLENBQUNrQixpQkFBYixDQUErQjtBQUNyQ2pCLGlCQUFXLEVBQUVELFFBQVEsQ0FBQ0M7QUFEZSxLQUEvQixD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QXZCO0FBQ0gsS0FOTCxXQU9XLFVBQUNNLEtBQUQsRUFBVyxDQUFFLENBUHhCO0FBUUgsR0FURDtBQVVILEM7Ozs7Ozs7Ozs7O0FDblVEOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImNoZWNrb3V0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlL2NoZWNrb3V0LnNjc3NcIjtcclxuaW1wb3J0IFwiLi4vYXBwL29yZGVyLmpzXCI7XHJcbm1hcGJveGdsLmFjY2Vzc1Rva2VuID1cclxuICAgIFwicGsuZXlKMUlqb2ljM2RoY0c1cGEyRTVPQ0lzSW1FaU9pSmphMnRtTTNjeWJXMHdjSGczTW5keGREUndNSFZzZDNwdkluMC5WbU5ZLTZ2Y0lBNnNrc0dnTHpCc2JnXCI7XHJcbnZhciBtYXBMb2FkZWQgPSBmYWxzZTtcclxudmFyIG1hcExvYWRlZDIgPSBmYWxzZTtcclxudmFyIG1hcDtcclxubGV0IGRpcmVjdGlvbnM7XHJcbnZhciBnZW9jb2RlO1xyXG52YXIgbWFwMjtcclxudmFyIG5hdmlnYXRpb247XHJcbmZ1bmN0aW9uIGxvYWRNYXAob3JpZ2luLCBkZXN0aW5hdGlvbikge1xyXG4gICAgaWYgKCFtYXBMb2FkZWQpIHtcclxuICAgICAgICBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcclxuICAgICAgICAgICAgY29udGFpbmVyOiBcIm1hcFwiLFxyXG4gICAgICAgICAgICBzdHlsZTogXCJtYXBib3g6Ly9zdHlsZXMvbWFwYm94L3N0cmVldHMtdjExXCIsXHJcbiAgICAgICAgICAgIGNlbnRlcjogWzc4LjM3LCAxNy40N10sXHJcbiAgICAgICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpcmVjdGlvbnMgPSBuZXcgTWFwYm94RGlyZWN0aW9ucyh7XHJcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiBtYXBib3hnbC5hY2Nlc3NUb2tlbixcclxuICAgICAgICB9KTtcclxuICAgICAgICBuYXZpZ2F0aW9uPW5ldyBtYXBib3hnbC5OYXZpZ2F0aW9uQ29udHJvbCh7XHJcbiAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogbWFwYm94Z2wuYWNjZXNzVG9rZW5cclxuICAgICAgICB9KTtcclxuICAgICAgICBtYXAuYWRkQ29udHJvbChkaXJlY3Rpb25zLCd0b3AtbGVmdCcpO1xyXG4gICAgICAgIG1hcC5hZGRDb250cm9sKG5hdmlnYXRpb24pO1xyXG4gICAgICAgIG1hcC5vbihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtYXBMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnNldE9yaWdpbihvcmlnaW4pO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnNldERlc3RpbmF0aW9uKGRlc3RpbmF0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZGlyZWN0aW9ucy5zZXRPcmlnaW4ob3JpZ2luKTtcclxuICAgICAgICBkaXJlY3Rpb25zLnNldERlc3RpbmF0aW9uKGRlc3RpbmF0aW9uKTtcclxuICAgIH1cclxufVxyXG5tYXAyID0gbmV3IG1hcGJveGdsLk1hcCh7XHJcbiAgICBjb250YWluZXI6IFwibWFwMlwiLFxyXG4gICAgc3R5bGU6IFwibWFwYm94Oi8vc3R5bGVzL21hcGJveC9zdHJlZXRzLXYxMVwiLFxyXG4gICAgY2VudGVyOiBbNzguMzg4MDA4NjgzMjczMiwxNy40NDI2ODM3MjA1NDA0Nl0sXHJcbiAgICB6b29tOiAxMyxcclxufSk7XHJcbmdlb2NvZGU9ICBuZXcgTWFwYm94R2VvY29kZXIoe1xyXG4gICAgICAgIGFjY2Vzc1Rva2VuOiBtYXBib3hnbC5hY2Nlc3NUb2tlbixcclxuICAgICAgICBtYXBib3hnbDogbWFwYm94Z2xcclxuICAgIH0pXHJcbm1hcDIub24oXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBjZW50ZXIgPSBtYXAyLmdldENlbnRlcigpO1xyXG4gICAgZ2V0UmV2ZXJzZUdlb2NvZGUoY2VudGVyLmxuZyxjZW50ZXIubGF0KVxyXG59KTtcclxubWFwMi5hZGRDb250cm9sKFxyXG4gICAgbmV3IG1hcGJveGdsLkdlb2xvY2F0ZUNvbnRyb2woe1xyXG4gICAgICAgIHBvc2l0aW9uT3B0aW9uczoge1xyXG4gICAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmFja1VzZXJMb2NhdGlvbjogdHJ1ZSxcclxuICAgIH0pXHJcbik7XHJcbmZ1bmN0aW9uIGdldFJldmVyc2VHZW9jb2RlKGxhdGksbG9uZykge1xyXG4gICAgdmFyIGxhdCA9IGxhdGk7XHJcbiAgICB2YXIgbG5nID0gbG9uZztcclxuICAgIHZhciBjb3JkPVtsbmcsbGF0XTtcclxuICAgIHZhciBjb3JkMT1bbGF0LGxuZ107XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29vcmRpbmF0ZXMnLEpTT04uc3RyaW5naWZ5KGNvcmQxKSk7XHJcbiAgICB2YXIgdXJsID0gXCJodHRwczovL2FwaS5tYXBib3guY29tL2dlb2NvZGluZy92NS9tYXBib3gucGxhY2VzL1wiICsgbGF0ICsgXCIsXCIgKyBsbmcgKyBcIi5qc29uP2FjY2Vzc190b2tlbj1cIiArIG1hcGJveGdsLmFjY2Vzc1Rva2VuO1xyXG4gICAgZmV0Y2godXJsKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgLnRoZW4oZGF0YSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLWdlbicpLnZhbHVlPWRhdGEuZmVhdHVyZXNbMF0ucGxhY2VfbmFtZSk7XHJcbn1cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXdhZGRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkcmVzcy1tb2RhbFwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbn0pO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlMVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRyZXNzLW1vZGFsXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG59KTtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRyZXNzZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FkZHJlc3MnKSl7XHJcbiAgICAgICAgdmFyIGFkZHJlc3M9SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWRkcmVzcycpKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgdmFyIGFkZHJlc3M9W107XHJcbiAgICB9XHJcbiAgICB2YXIgY29vcmQ9SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNvb3JkaW5hdGVzXCIpKTtcclxuICAgIHZhciBkaXN0YW5jZT1nZXREaXN0YW5jZUZyb21MYXRMb25JbkttKDE3LjQ0MjY4MzcyMDU0MDQ2LDc4LjM4ODAwODY4MzI3MzIsY29vcmRbMV0sY29vcmRbMF0pO1xyXG4gICAgY29uc29sZS5sb2coZGlzdGFuY2UpO1xyXG4gICAgaWYoZGlzdGFuY2U8PTUpe1xyXG4gICAgdmFyIGFkZHI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtZ2VuXCIpLnZhbHVlO1xyXG4gICAgdmFyIGNpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHlcIikudmFsdWU7XHJcbiAgICB2YXIgbGFuZG1hcmsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0cmVldFwiKS52YWx1ZTtcclxuICAgIHZhciBtYXJrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXJrXCIpLnZhbHVlO1xyXG4gICAgdmFyIHVzZXJuYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZTQ1XCIpO1xyXG4gICAgdmFyIHNhbXAgPSB7XHJcbiAgICAgICAgbmFtZTogdXNlcm5hbWUsXHJcbiAgICAgICAgbWFyazogbWFyayxcclxuICAgICAgICBhZGRyZXNzOiBhZGRyLFxyXG4gICAgICAgIGxhbmRtYXJrOmxhbmRtYXJrLFxyXG4gICAgICAgIGNpdHk6IGNpdHksXHJcbiAgICAgICAgbGF0TG9uZzpKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29vcmRpbmF0ZXNcIikpXHJcbiAgICB9O1xyXG4gICAgYWRkcmVzcy5wdXNoKHNhbXApO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhZGRyZXNzXCIsSlNPTi5zdHJpbmdpZnkoYWRkcmVzcykpO1xyXG4gICAgYWxlcnQoJ2FkZHJlc3MgYWRkZWQnKTtcclxuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICB9XHJcbiAgIGVsc2V7XHJcbiAgICAgICBhbGVydChcImRpc3RhbmNlIGlzIG1vcmUgdGhhbiA1a20gZnJvbSByZXN0YXVyYW50Li4hXCIpO1xyXG4gICB9XHJcbn0pO1xyXG52YXIgdXNlckFkZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhZGRyZXNzXCIpKTtcclxudmFyIGsgPSBcIlwiO1xyXG5mb3IgKHZhciBpID0gMDsgaSA8IHVzZXJBZGQubGVuZ3RoOyBpKyspIHtcclxuICAgIGsgKz0gYDxkaXYgY2xhc3M9J2FkZHInPjxwPjxiPiR7dXNlckFkZFtpXS5tYXJrfTwvYj48YnV0dG9uIGlkPSR7aX0gIGNsYXNzPSdzZWxlY3QtYnRuJz5TZWxlY3Q8L2J1dHRvbj4gPGJ1dHRvbiBjbGFzcz0ncmVtb3ZlLWJ0bic+PGkgY2xhc3M9XCJmYSBmYS10cmFzaCBmYS1sZ1wiIGlkPSR7aX0gIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT48L2J1dHRvbj48L3A+XHJcbiAgICA8cD4ke3VzZXJBZGRbaV0uYWRkcmVzc308L3A+PC9kaXY+YDtcclxufVxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZHJlc3NcIikuaW5uZXJIVE1MID0gaztcclxudmFyIG1hcms7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0LWJ0blwiKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIG1hcmsgPSBOdW1iZXIoZS50YXJnZXQuaWQpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXltZW50czEnKS5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6XCJzbW9vdGhcIn0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlbW92ZS1idG5cIikuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgaWQgPSBOdW1iZXIoZS50YXJnZXQuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkKTtcclxuICAgICAgICB2YXIgYWRkcmVzcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhZGRyZXNzXCIpKTtcclxuICAgICAgICBpZihjb25maXJtKCd3YW50IHRvIGRlbGV0ZSB0aGlzIGFkZHJlc3MuPycpKXtcclxuICAgICAgICAgICAgYWRkcmVzcy5zcGxpY2UoaWQsMSk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhZGRyZXNzJyxKU09OLnN0cmluZ2lmeShhZGRyZXNzKSk7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdhZGRyZXNzIHJlbW92ZWQnKTtcclxuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcmRlci1wbGFjZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgIGNvbnNvbGUubG9nKG1hcmspO1xyXG4gICAgIGNvbnNvbGUubG9nKFwiSElJSVwiKVxyXG4gICAgIGlmKHR5cGVvZihtYXJrKT09PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgYWxlcnQoJ3NlbGVjdCBhbnkgYWRkcmVzcycpO1xyXG4gICAgIH0gXHJcbiAgICAgZWxzZXtcclxuICAgICAgICAgaWYoY29uZmlybShcIkRvIHlvIHdhbnQgdG8gcGxhY2Ugb3JkZXIuP1wiKSl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIHZhciBhZGRyZXNzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFkZHJlc3NcIikpO1xyXG4gICAgICAgICAgICB2YXIgdmlld2FkZD1hZGRyZXNzW21hcmtdO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRNYXAoXCJoeWRlcmFiYWRcIix2aWV3YWRkLmxhdExvbmcpO1xyXG4gICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgICAgICBhbGVydChcIm9yZGVyIGhhcyBiZWVuIHBsYWNlZFwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjpcInNtb290aFwifSk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbiB9KVxyXG5cclxuIGZ1bmN0aW9uIGdldERpc3RhbmNlRnJvbUxhdExvbkluS20obGF0MSxsb24xLGxhdDIsbG9uMikge1xyXG4gICAgdmFyIFIgPSA2MzcxOyAvLyBSYWRpdXMgb2YgdGhlIGVhcnRoIGluIGttXHJcbiAgICB2YXIgZExhdCA9IGRlZzJyYWQobGF0Mi1sYXQxKTsgIC8vIGRlZzJyYWQgYmVsb3dcclxuICAgIHZhciBkTG9uID0gZGVnMnJhZChsb24yLWxvbjEpOyBcclxuICAgIHZhciBhID0gXHJcbiAgICAgIE1hdGguc2luKGRMYXQvMikgKiBNYXRoLnNpbihkTGF0LzIpICtcclxuICAgICAgTWF0aC5jb3MoZGVnMnJhZChsYXQxKSkgKiBNYXRoLmNvcyhkZWcycmFkKGxhdDIpKSAqIFxyXG4gICAgICBNYXRoLnNpbihkTG9uLzIpICogTWF0aC5zaW4oZExvbi8yKVxyXG4gICAgICA7IFxyXG4gICAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxLWEpKTsgXHJcbiAgICB2YXIgZCA9IFIgKiBjOyAvLyBEaXN0YW5jZSBpbiBrbVxyXG4gICAgcmV0dXJuIGQ7XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGRlZzJyYWQoZGVnKSB7XHJcbiAgICByZXR1cm4gZGVnICogKE1hdGguUEkvMTgwKVxyXG4gIH1cclxuICIsImltcG9ydCBcIi4uL3N0eWxlL29yZGVyLnNjc3NcIjtcclxudmFyIGZpcmViYXNlQ29uZmlnID0ge1xyXG4gICAgYXBpS2V5OiBcIkFJemFTeUR4NTNvQzNHdGxJbkozbHJqOThVdGxmSGIxeDFLNXI1b1wiLFxyXG4gICAgYXV0aERvbWFpbjogXCJyZXN0YXVyYW50LW1nbXQtNWY0ZTYuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwicmVzdGF1cmFudC1tZ210LTVmNGU2XCIsXHJcbiAgICBzdG9yYWdlQnVja2V0OiBcInJlc3RhdXJhbnQtbWdtdC01ZjRlNi5hcHBzcG90LmNvbVwiLFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTA4NjI3MDUyMzYwMVwiLFxyXG4gICAgYXBwSWQ6IFwiMToxMDg2MjcwNTIzNjAxOndlYjo3ODE0MGY2NzMwNzlkZDg3MDBkZGYwXCIsXHJcbn07XHJcbi8vIEluaXRpYWxpemUgRmlyZWJhc2VcclxuZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcbnZhciB2ZWdNZW51ID0gW1xyXG4gICAge1xyXG4gICAgICAgIGlkOiAxLFxyXG4gICAgICAgIHR5cGU6IFwic3RhcnRlclwiLFxyXG4gICAgICAgIG5hbWU6IFwiVmVnIE1hbmNodXJpYW5cIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL3N0YXJ0ZXIxLmpwZ1wiLFxyXG4gICAgICAgIGNvc3Q6IDE5OSxcclxuICAgICAgICBxdWFudGl0eTogMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgdHlwZTogXCJzdGFydGVyXCIsXHJcbiAgICAgICAgbmFtZTogXCJQYW5lZXIgVGlra2FcIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL3N0YXJ0ZXIyLmpmaWZcIixcclxuICAgICAgICBjb3N0OiAyNTUsXHJcbiAgICAgICAgcXVhbnRpdHk6IDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiAzLFxyXG4gICAgICAgIHR5cGU6IFwic3RhcnRlclwiLFxyXG4gICAgICAgIG5hbWU6IFwiQ3Jpc3B5IENvcm5cIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL3N0YXJ0ZXIzLmpwZ1wiLFxyXG4gICAgICAgIGNvc3Q6IDE5OSxcclxuICAgICAgICBxdWFudGl0eTogMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgdHlwZTogXCJtYWluY291cnNlXCIsXHJcbiAgICAgICAgbmFtZTogXCJDaGlja2VuIEJpcnlhbmlcIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL21haW5jb3Vyc2UxLmpmaWZcIixcclxuICAgICAgICBjb3N0OiAyNDAsXHJcbiAgICAgICAgcXVhbnRpdHk6IDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA1LFxyXG4gICAgICAgIHR5cGU6IFwibWFpbmNvdXJzZVwiLFxyXG4gICAgICAgIG5hbWU6IFwiUGFuZWVyIEJpcnlhbmlcIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL21haW5jb3Vyc2UyLmpwZ1wiLFxyXG4gICAgICAgIGNvc3Q6IDIyNSxcclxuICAgICAgICBxdWFudGl0eTogMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDYsXHJcbiAgICAgICAgdHlwZTogXCJtYWluY291cnNlXCIsXHJcbiAgICAgICAgbmFtZTogXCJWZWcgUHVsYW9cIixcclxuICAgICAgICBpbWFnZTogXCIuLi9wdWJsaWMvaW1hZ2VzL21haW5jb3Vyc2UzLmpmaWZcIixcclxuICAgICAgICBjb3N0OiAyNDAsXHJcbiAgICAgICAgcXVhbnRpdHk6IDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA3LFxyXG4gICAgICAgIHR5cGU6IFwiZGVzc2VydFwiLFxyXG4gICAgICAgIG5hbWU6IFwiSWNlIGNyZWFtXCIsXHJcbiAgICAgICAgaW1hZ2U6IFwiLi4vcHVibGljL2ltYWdlcy9kZXNzZXJ0MS5qZmlmXCIsXHJcbiAgICAgICAgY29zdDogMjQwLFxyXG4gICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogOCxcclxuICAgICAgICB0eXBlOiBcImRlc3NlcnRcIixcclxuICAgICAgICBuYW1lOiBcIkd1bGFiIEphbXVuXCIsXHJcbiAgICAgICAgaW1hZ2U6IFwiLi4vcHVibGljL2ltYWdlcy9kZXNzZXJ0Mi5qZmlmXCIsXHJcbiAgICAgICAgY29zdDogMjQwLFxyXG4gICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogOSxcclxuICAgICAgICB0eXBlOiBcImRlc3NlcnRcIixcclxuICAgICAgICBuYW1lOiBcIlJhc21hbGFpXCIsXHJcbiAgICAgICAgaW1hZ2U6IFwiLi4vcHVibGljL2ltYWdlcy9kZXNzZXJ0My5qZmlmXCIsXHJcbiAgICAgICAgY29zdDogMjQwLFxyXG4gICAgICAgIHF1YW50aXR5OiAxLFxyXG4gICAgfSxcclxuXTtcclxuaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lXCIpKXtcclxuICB2YXIgbG9naW5OYW1lPWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcm5hbWU0NVwiKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlbGNvbWVcIikuaW5uZXJIVE1MPWA8aSBjbGFzcz1cImZhIGZhLXVzZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IGArbG9naW5OYW1lO1xyXG59XHJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnVcIikpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVnTWVudS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICgodmVnTWVudVtpXS50eXBlID0gXCJzdGFydGVyXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXYuaWQgPSBcImZvb2QtbWVudVwiO1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB2ZWdNZW51W2ldLmltYWdlO1xyXG4gICAgICAgICAgICAvLyBpbWFnZS5oZWlnaHQ9XCIyMDBweFwiO1xyXG4gICAgICAgICAgICAvLyBpbWFnZS53aWR0aD1cIjIwMHB4XCI7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xyXG4gICAgICAgICAgICBuYW1lLmlubmVySFRNTCA9IHZlZ01lbnVbaV0ubmFtZTtcclxuICAgICAgICAgICAgdmFyIGNvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiUFwiKTtcclxuICAgICAgICAgICAgY29zdC5pbm5lckhUTUwgPSBcIiYjODM3NyBcIiArIHZlZ01lbnVbaV0uY29zdDtcclxuICAgICAgICAgICAgaW1hZ2UuaWQgPSBcIm1lbnUtaW1nXCI7XHJcbiAgICAgICAgICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBidXR0b24uaWQgPSB2ZWdNZW51W2ldLmlkO1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGFkZENhcnQodGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gXCJBZGQgdG8gY2FydFwiO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobmFtZSk7XHJcbiAgICAgICAgICAgIGNvc3QuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGNvc3QpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnUyXCIpLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbnZhciBjYXJ0ID0gW107XHJcbmZ1bmN0aW9uIEl0ZW0obmFtZSwgcHJpY2UsIGNvdW50KSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5wcmljZSA9IHByaWNlO1xyXG4gICAgdGhpcy5jb3VudCA9IGNvdW50O1xyXG59XHJcbmZ1bmN0aW9uIHNhdmVDYXJ0KCkge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInNob3BwaW5nQ2FydFwiLCBKU09OLnN0cmluZ2lmeShjYXJ0KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRDYXJ0KCkge1xyXG4gICAgY2FydCA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInNob3BwaW5nQ2FydFwiKSk7XHJcbn1cclxuaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJzaG9wcGluZ0NhcnRcIikgIT0gbnVsbCkge1xyXG4gICAgbG9hZENhcnQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkSXRlbVRvQ2FydChuYW1lLCBwcmljZSwgY291bnQpIHtcclxuICAgIGZvciAodmFyIGl0ZW0gaW4gY2FydCkge1xyXG4gICAgICAgIGlmIChjYXJ0W2l0ZW1dLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgY2FydFtpdGVtXS5jb3VudCsrO1xyXG4gICAgICAgICAgICBzYXZlQ2FydCgpO1xyXG4gICAgICAgICAgICBkaXNwbGF5Q2FydCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGl0ZW0gPSBuZXcgSXRlbShuYW1lLCBwcmljZSwgY291bnQpO1xyXG4gICAgY2FydC5wdXNoKGl0ZW0pO1xyXG4gICAgc2F2ZUNhcnQoKTtcclxuICAgIGRpc3BsYXlDYXJ0KCk7XHJcbn1cclxuZnVuY3Rpb24gc2V0Q291bnRGb3JJdGVtKG5hbWUsIGNvdW50KSB7XHJcbiAgICBmb3IgKHZhciBpIGluIGNhcnQpIHtcclxuICAgICAgICBpZiAoY2FydFtpXS5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhcnRbaV0uY291bnQgPSBjb3VudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZUl0ZW1Gcm9tQ2FydChuYW1lKSB7XHJcbiAgICBmb3IgKHZhciBpdGVtIGluIGNhcnQpIHtcclxuICAgICAgICBpZiAoY2FydFtpdGVtXS5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhcnRbaXRlbV0uY291bnQtLTtcclxuICAgICAgICAgICAgaWYgKGNhcnRbaXRlbV0uY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNhcnQuc3BsaWNlKGl0ZW0sIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNhdmVDYXJ0KCk7XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlSXRlbUZyb21DYXJ0QWxsKG5hbWUpIHtcclxuICAgIGZvciAodmFyIGl0ZW0gaW4gY2FydCkge1xyXG4gICAgICAgIGlmIChjYXJ0W2l0ZW1dLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgY2FydC5zcGxpY2UoaXRlbSwgMSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNhdmVDYXJ0KCk7XHJcbn1cclxuZnVuY3Rpb24gY2xlYXJDYXJ0KCkge1xyXG4gICAgY2FydCA9IFtdO1xyXG4gICAgc2F2ZUNhcnQoKTtcclxufVxyXG5mdW5jdGlvbiB0b3RhbENvdW50KCkge1xyXG4gICAgdmFyIHRvdGFsQ291bnQgPSAwO1xyXG4gICAgZm9yICh2YXIgaXRlbSBpbiBjYXJ0KSB7XHJcbiAgICAgICAgdG90YWxDb3VudCArPSBjYXJ0W2l0ZW1dLmNvdW50O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvdGFsQ291bnQ7XHJcbn1cclxuZnVuY3Rpb24gdG90YWxDYXJ0KCkge1xyXG4gICAgdmFyIHRvdGFsQ2FydCA9IDA7XHJcbiAgICBmb3IgKHZhciBpdGVtIGluIGNhcnQpIHtcclxuICAgICAgICB0b3RhbENhcnQgKz0gY2FydFtpdGVtXS5wcmljZSAqIGNhcnRbaXRlbV0uY291bnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTnVtYmVyKHRvdGFsQ2FydCk7XHJcbn1cclxuZnVuY3Rpb24gbGlzdENhcnQoKSB7XHJcbiAgICB2YXIgY2FydENvcHkgPSBbXTtcclxuICAgIGZvciAoaSBpbiBjYXJ0KSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSBjYXJ0W2ldO1xyXG4gICAgICAgIHZhciBpdGVtQ29weSA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gaXRlbSkge1xyXG4gICAgICAgICAgICBpdGVtQ29weVtwXSA9IGl0ZW1bcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW1Db3B5LnRvdGFsID0gTnVtYmVyKGl0ZW0ucHJpY2UgKiBpdGVtLmNvdW50KTtcclxuICAgICAgICBjYXJ0Q29weS5wdXNoKGl0ZW1Db3B5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYXJ0Q29weTtcclxufVxyXG5kaXNwbGF5Q2FydCgpO1xyXG5mdW5jdGlvbiBhZGRDYXJ0KGJ1dHRvbikge1xyXG4gICAgdmFyIGlkID0gTnVtYmVyKGJ1dHRvbi5pZCkgLSAxO1xyXG4gICAgdmFyIG5hbWUgPSB2ZWdNZW51W2lkXS5uYW1lO1xyXG4gICAgdmFyIHByaWNlID0gdmVnTWVudVtpZF0uY29zdDtcclxuICAgIGFkZEl0ZW1Ub0NhcnQobmFtZSwgcHJpY2UsIDEpO1xyXG59XHJcbmZ1bmN0aW9uIGRpc3BsYXlDYXJ0KCkge1xyXG4gICAgdmFyIGNhcnRBcnJheSA9IGxpc3RDYXJ0KCk7XHJcbiAgICB2YXIgb3V0cHV0ID0gXCJcIjtcclxuICAgIGZvciAodmFyIGkgaW4gY2FydEFycmF5KSB7XHJcbiAgICAgICAgb3V0cHV0ICs9XHJcbiAgICAgICAgICAgIFwiPHRyPlwiICtcclxuICAgICAgICAgICAgXCI8dGQ+XCIgK1xyXG4gICAgICAgICAgICBjYXJ0QXJyYXlbaV0ubmFtZSArXHJcbiAgICAgICAgICAgIFwiPC90ZD5cIiArXHJcbiAgICAgICAgICAgIFwiPHRkPjxkaXYgaWQ9J3ZhcmlhbnQnPjxidXR0b24gaWQ9bWludXMgbmFtZT1cIiArXHJcbiAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICBcIj4tPC9idXR0b24+XCIgK1xyXG4gICAgICAgICAgICBcIjxzcGFuIGlkPWFcIiArXHJcbiAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICBcIiBjbGFzcz0naW5wdXRzJz5cIiArXHJcbiAgICAgICAgICAgIGNhcnRBcnJheVtpXS5jb3VudCArXHJcbiAgICAgICAgICAgIFwiPC9zcGFuPlwiICtcclxuICAgICAgICAgICAgXCI8YnV0dG9uICBpZD0ncGx1cycgbmFtZT1cIiArXHJcbiAgICAgICAgICAgIGkgK1xyXG4gICAgICAgICAgICBcIiA+KzwvYnV0dG9uPjwvZGl2PjwvdGQ+XCIgK1xyXG4gICAgICAgICAgICBcIjx0ZD5cIiArXHJcbiAgICAgICAgICAgIFwiICYjODM3NyBcIiArXHJcbiAgICAgICAgICAgIGNhcnRBcnJheVtpXS50b3RhbCArXHJcbiAgICAgICAgICAgIFwiPC90ZD5cIiArXHJcbiAgICAgICAgICAgIFwiPC90cj5cIjtcclxuICAgIH1cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9yZC1jbnRcIikpXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcmQtY250XCIpLmRhdGFzZXQuY291bnQgPSB0b3RhbENvdW50KCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3AtaXRlbXNcIikuaW5uZXJIVE1MID0gb3V0cHV0O1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbFwiKS5pbm5lckhUTUwgPSBcIiYjODM3NyBcIiArIHRvdGFsQ2FydCgpO1xyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wYXlcIikpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvcGF5XCIpLmlubmVySFRNTCA9IHRvdGFsQ2FydCgpICsgMzA7XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3RhbXRcIikpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvdGFtdFwiKS5pbm5lckhUTUwgPSB0b3RhbENhcnQoKSArIDMwO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNwbHVzXCIpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBlLnRhcmdldC5uYW1lO1xyXG4gICAgICAgICAgICBsZXQgcXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3BhbiNhJHtpZH1gKTtcclxuICAgICAgICAgICAgcXR5LmlubmVySFRNTCA9IE51bWJlcihxdHkuaW5uZXJIVE1MKSArIDE7XHJcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0NhcnQoXHJcbiAgICAgICAgICAgICAgICBjYXJ0QXJyYXlbTnVtYmVyKGlkKV0ubmFtZSxcclxuICAgICAgICAgICAgICAgIGNhcnRBcnJheVtOdW1iZXIoaWQpXS5wcmljZSxcclxuICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZGlzcGxheUNhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNtaW51c1wiKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gZS50YXJnZXQubmFtZTtcclxuICAgICAgICAgICAgbGV0IHF0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNwYW4jYSR7aWR9YCk7XHJcbiAgICAgICAgICAgIHF0eS5pbm5lckhUTUwgPSBOdW1iZXIocXR5LmlubmVySFRNTCkgLSAxO1xyXG4gICAgICAgICAgICByZW1vdmVJdGVtRnJvbUNhcnQoY2FydEFycmF5W051bWJlcihpZCldLm5hbWUpO1xyXG4gICAgICAgICAgICBkaXNwbGF5Q2FydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3JlbW92ZVwiKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gZS50YXJnZXQubmFtZTtcclxuICAgICAgICAgICAgbGV0IHF0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNwYW4jYSR7aWR9YCk7XHJcbiAgICAgICAgICAgIHF0eS5pbm5lckhUTUwgPSBOdW1iZXIocXR5LmlubmVySFRNTCkgLSAxO1xyXG4gICAgICAgICAgICByZW1vdmVJdGVtRnJvbUNhcnRBbGwoY2FydEFycmF5W051bWJlcihpZCldLm5hbWUpO1xyXG4gICAgICAgICAgICBkaXNwbGF5Q2FydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FydC1idG5cIikpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FydC1idG5cIikub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcnQtbW9kYWxcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgfTtcclxufVxyXG5pZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWxcIikpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FuY2VsXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJ0LW1vZGFsXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgfTtcclxufVxyXG5pZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGVja291dFwiKSkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGVja291dFwiKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL2NoZWNrb3V0Lmh0bWxcIjtcclxuICAgIH07XHJcbn1cclxuaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hhbWJ1cmdlcicpKXtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoYW1idXJnZXInKS5vbmNsaWNrPWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9yZGVyLWhlYWRlclwiKTtcclxuICAgICAgICBpZiAoeC5jbGFzc05hbWUgPT09IFwib3JkZXItaGVhZGVyXCIpIHtcclxuICAgICAgICAgIHguY2xhc3NOYW1lID0gXCJvcmRlci1oZWFkZXIxXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc2VydmVcIikpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXJ2ZVwiKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIuL3VzZXJzLmh0bWxcIjtcclxuICAgIH07XHJcbn1cclxuXHJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ291dFwiKSkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRcIikub25jbGljayA9IGZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICAgICAgICBmaXJlYmFzZVxyXG4gICAgICAgICAgICAuYXV0aCgpXHJcbiAgICAgICAgICAgIC5zaWduT3V0KClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsb2dpbm5hbWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLi9pbmRleC5odG1sXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHt9KTtcclxuICAgIH07XHJcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwL2NoZWNrb3V0LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==