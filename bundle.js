/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/app.scss */ "./src/style/app.scss");
/* harmony import */ var _app_users_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/users.js */ "./src/app/users.js");
/* harmony import */ var _public_index_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../public/index.html */ "./src/public/index.html");
/* harmony import */ var _public_index_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_public_index_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_user_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/user.scss */ "./src/style/user.scss");



 // Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyDx53oC3GtlInJ3lrj98UtlfHb1x1K5r5o",
  authDomain: "restaurant-mgmt-5f4e6.firebaseapp.com",
  projectId: "restaurant-mgmt-5f4e6",
  storageBucket: "restaurant-mgmt-5f4e6.appspot.com",
  messagingSenderId: "1086270523601",
  appId: "1:1086270523601:web:78140f673079dd8700ddf0"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = database.ref("Registration-Data/");
ref.on('value', gotdata, errdata);
var userInfo = [];

function gotdata(data) {
  var userData = data.val();
  var keys = Object.keys(userData);
  console.log(keys);
}

function errdata(err) {
  console.log(err);
}

if (document.getElementById("log")) {
  document.getElementById("log").onclick = function log() {
    document.getElementById("wrapper-modal").style.visibility = "visible";
  };
}

if (document.getElementById("close")) {
  document.getElementById("close").onclick = function close() {
    document.getElementById("wrapper-modal").style.visibility = "hidden";
  };
}

if (document.getElementById("reg")) {
  document.getElementById("reg").onclick = function reg() {
    document.getElementById("wrapper-modal-reg").style.visibility = "visible";
  };
}

if (document.getElementById("close1")) {
  document.getElementById("close1").onclick = function close() {
    document.getElementById("wrapper-modal-reg").style.visibility = "hidden";
  };
}

if (document.getElementById("regform")) {
  document.getElementById("regform").addEventListener("submit", submitForm);
}

var userData;

function submitForm(e) {
  e.preventDefault();
  var name = document.getElementById("uname").value;
  var password = document.getElementById("pwd2").value;
  var reenter = document.getElementById("pwd-re").value;
  var phn_no = document.getElementById("phnno").value;
  var email = document.getElementById("email").value;

  if (password != reenter) {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "Passwords Dont Match";
    return false;
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (userCredential) {
      // console.log(userCredential);
      // localStorage.setItem("uid",JSON.stringify(userCredential));
      var Uid = userCredential.user.uid;
      firebase.database().ref("Registration-Data/" + Uid).set({
        name: name,
        password: password,
        phnno: phn_no,
        email: email,
        UId: Uid
      });
    })["catch"](function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
    alert("Registration succesfull");
    localStorage.setItem("userdata", JSON.stringify(userdata));
    document.getElementById("regform").reset();
  }
}

if (document.getElementById("loginform")) {
  document.getElementById("loginform").addEventListener("submit", loginForm);
}

function loginForm(e) {
  e.preventDefault();
  var email = document.getElementById("email-log").value;
  var password = document.getElementById("pwd").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (userCredential) {
    var uid = userCredential.user.uid;
    console.log(uid);
    localStorage.setItem("usercredential", JSON.stringify(userCredential));
    firebase.database().ref("Registration-Data/" + uid).on("value", function (snapshot) {
      var UId = snapshot.val().UId;

      if (uid === UId) {
        localStorage.setItem("username45", snapshot.val().name);
      }
    });
    window.location.href = "./users.html";
  })["catch"](function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

/***/ }),

/***/ "./src/app/users.js":
/*!**************************!*\
  !*** ./src/app/users.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/app/index.js");

var date_today = document.getElementById("date-today");
var dtToday = new Date();
var month = dtToday.getMonth() + 1;
var day = dtToday.getDate();
var year = dtToday.getFullYear();
if (month < 10) month = '0' + month.toString();
if (day < 10) day = '0' + day.toString();
var maxDate = year + '-' + month + '-' + day;
console.log(maxDate);

if (date_today) {
  date_today.setAttribute("min", maxDate);
}

if (document.getElementById("welcome")) {
  var loginName = localStorage.getItem("username45");
  document.getElementById("welcome").innerHTML = "Welcome " + loginName;
}

if (document.getElementById("logout")) {
  document.getElementById("logout").onclick = function logout() {
    firebase.auth().signOut().then(function () {
      localStorage.setItem("loginname", null);
      window.location.href = "./index.html";
    })["catch"](function (error) {});
  };
}

if (document.getElementById("date-today")) {
  document.getElementById("date-today").onchange = function () {
    var date = document.getElementById("date-today").value;
    var newDate = new Date(date.toString()).toLocaleDateString();
    console.log(date);
    console.log(newDate);
    var date2 = new Date().toLocaleDateString();

    if (newDate === date2) {
      console.log(newDate === date2);

      if (document.getElementById("time")) {
        var curr_time = new Date();
        var op = document.getElementById("time").getElementsByTagName("option");

        for (var i = 1; i < op.length; i++) {
          var time = new Date().toLocaleDateString() + " " + op[i].value;
          time = new Date(time);
          var diff = curr_time - time;
          console.log(diff);
          diff > 0 ? op[i].disabled = true : op[i].disabled = false;
        }
      }
    } else {
      var op = document.getElementById("time").getElementsByTagName("option");

      for (var i = 1; i < op.length; i++) {
        op[i].disabled = false;
      }
    }
  };
}

if (document.getElementById("book-form")) {
  document.getElementById("book-form").addEventListener("submit", bookForm);
}

var restData = [];

function bookForm(e) {
  e.preventDefault();
  var date = document.getElementById("date-today").value;
  var time = document.getElementById("time").value;
  var persons = document.getElementById("persons").value; // console.log(firebase.database().ref("Table-Reservation-Data/"));

  var dummy = {
    date: date,
    time: time,
    persons: persons,
    timestamp: new Date()
  };
  restData.push(dummy);
  localStorage.setItem("restData", JSON.stringify(restData));
  var name2 = localStorage.getItem("username45");
  firebase.database().ref("Table-Reservation-Data/" + name2).push({
    date: date,
    time: time,
    no_of_persons: persons,
    timestamp: new Date() // UId:JSON.parse(localStorage.getItem("uid")).user.uid,

  });
  alert("table booked Successfully");
}

/***/ }),

/***/ "./src/public/images/details1.svg":
/*!****************************************!*\
  !*** ./src/public/images/details1.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/details1.svg");

/***/ }),

/***/ "./src/public/images/details2.svg":
/*!****************************************!*\
  !*** ./src/public/images/details2.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/details2.svg");

/***/ }),

/***/ "./src/public/images/details3.svg":
/*!****************************************!*\
  !*** ./src/public/images/details3.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/details3.svg");

/***/ }),

/***/ "./src/public/images/details4.svg":
/*!****************************************!*\
  !*** ./src/public/images/details4.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/details4.svg");

/***/ }),

/***/ "./src/public/images/details5.svg":
/*!****************************************!*\
  !*** ./src/public/images/details5.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/details5.svg");

/***/ }),

/***/ "./src/public/images/logo45.png":
/*!**************************************!*\
  !*** ./src/public/images/logo45.png ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/logo45.png");

/***/ }),

/***/ "./src/public/index.html":
/*!*******************************!*\
  !*** ./src/public/index.html ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___ = __webpack_require__(/*! ../../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
var ___HTML_LOADER_IMPORT_0___ = __webpack_require__(/*! ./images/logo45.png */ "./src/public/images/logo45.png");
var ___HTML_LOADER_IMPORT_1___ = __webpack_require__(/*! ./images/details1.svg */ "./src/public/images/details1.svg");
var ___HTML_LOADER_IMPORT_2___ = __webpack_require__(/*! ./images/details2.svg */ "./src/public/images/details2.svg");
var ___HTML_LOADER_IMPORT_3___ = __webpack_require__(/*! ./images/details3.svg */ "./src/public/images/details3.svg");
var ___HTML_LOADER_IMPORT_4___ = __webpack_require__(/*! ./images/details4.svg */ "./src/public/images/details4.svg");
var ___HTML_LOADER_IMPORT_5___ = __webpack_require__(/*! ./images/details5.svg */ "./src/public/images/details5.svg");
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_5___);
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n    <head>\r\n        <meta charset=\"UTF-8\" />\r\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n        <title>Restaurant</title>\r\n    </head>\r\n    <link\r\n            rel=\"stylesheet\"\r\n            href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"\r\n        />\r\n    <script src=\"https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js\"></script>\r\n    <script src=\"https://www.gstatic.com/firebasejs/8.2.4/firebase-auth.js\"></script>\r\n    <script src=\"https://www.gstatic.com/firebasejs/8.2.4/firebase-database.js\"></script>\r\n    <!-- <script src=\"\"></script> -->\r\n    <body>\r\n        <div class=\"wrapper\">\r\n            <header class=\"header\">\r\n                    <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"logo\"/>\r\n                    <button id=\"log\"><i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i> Login</i> </button>\r\n                    <button id=\"reg\"><i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i> Sign Up</button>\r\n                    <button>About Us</button>\r\n            </header>\r\n            <section class=\"wrapper-section\">\r\n                <h1>Find Your Table. Get started</h1>\r\n                <div id=\"wrapper-modal\" class=\"wrapper-modal\">\r\n                    <div></div>\r\n                    <div id=\"login\">\r\n                        <form type=\"submit\" id=\"loginform\">\r\n                            <p id=\"dialog\">Enter login <a id=\"close\">&times;</a></p>\r\n                            <input\r\n                                type=\"email\"\r\n                                id=\"email-log\"\r\n                                placeholder=\"enter email..\"\r\n                                autocomplete=\"off\"\r\n                                required\r\n                            />\r\n                            <a id=\"error1\"></a>\r\n                            <input\r\n                                type=\"password\"\r\n                                id=\"pwd\"\r\n                                placeholder=\"enter password\"\r\n                                autocomplete=\"off\"\r\n                                required\r\n                            />\r\n                            <button id=\"login-val\">Login</button>\r\n                        </form>\r\n                        <a href=\"\" style=\"text-align: left; font-size: medium;\">register</a> \r\n                    </div>\r\n                    <div></div>\r\n                </div>\r\n                <div id=\"wrapper-modal-reg\" class=\"wrapper-modal-reg\">\r\n                    <div></div>\r\n                    <div id=\"register\">\r\n                        <form type=\"submit\" id=\"regform\">\r\n                            <p>Welcome to yum yum <a id=\"close1\">&times;</a></p>\r\n                            <input\r\n                                type=\"text\"\r\n                                id=\"uname\"\r\n                                placeholder=\"enter username..\"\r\n                                autocomplete=\"off\"\r\n                                required\r\n                            />\r\n                            <input\r\n                                type=\"password\"\r\n                                id=\"pwd2\"\r\n                                placeholder=\"enter password\"\r\n                                autocomplete=\"off\"\r\n                                required\r\n                            />\r\n                            <input\r\n                            type=\"password\"\r\n                            id=\"pwd-re\"\r\n                            placeholder=\"re-enter password\"\r\n                            autocomplete=\"off\"\r\n                            required\r\n                        />\r\n                        <input\r\n                        type=\"number\"\r\n                        id=\"phnno\"\r\n                        placeholder=\"enter number\"\r\n                        autocomplete=\"off\"\r\n                        required\r\n                    />\r\n                    <input\r\n                    type=\"email\"\r\n                    id=\"email\"\r\n                    placeholder=\"enter email\"\r\n                    autocomplete=\"off\"\r\n                    required\r\n                />\r\n                            <button id=\"register-val\">Register</button>\r\n                            <p id=\"message\"></p>\r\n                        </form>\r\n                        <a href=\"\" style=\"text-align: left; font-size: medium;\">Back to Login</a> \r\n                    </div>\r\n                    <div></div>\r\n                </div>\r\n            </section>\r\n            <h1 style=\"margin-left: 2%;\">Whenever You are Hungry.!</h1>\r\n            <ul class=\"wrapper-specify\">\r\n                <li>\r\n                    <div class=\"det1\">\r\n                        <img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\">\r\n                    </div>\r\n                    <h3>Book For Lunch Today</h3>\r\n                    <p>See Restaurants Available for lunch</p>\r\n                </li>\r\n                <li>\r\n                    <div class=\"det2\">\r\n                        <img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\">\r\n                    </div>\r\n                    <h3>Find Outdoor Dining</h3>\r\n                    <p>Give Restaurnts with outdoor Dining Options</p>\r\n                </li>\r\n                <li>\r\n                    <div class=\"det3\">\r\n                        <img src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\">\r\n                    </div>\r\n                    <h3>Order Takeout</h3>\r\n                    <p>Order and Pay for Takeout</p>\r\n                </li>\r\n                <li>\r\n                    <div class=\"det4\">\r\n                        <img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\">\r\n                    </div>\r\n                    <h3>Dining Experiences</h3>\r\n                    <p>Search and book unique experiences</p>\r\n                </li>\r\n                <li>\r\n                    <div class=\"det5\">\r\n                        <img src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\">\r\n                    </div>\r\n                    <h3>Give Dining</h3>\r\n                    <p>Support a local Restaurant</p>\r\n                </li>\r\n            </ul>\r\n            <footer class=\"footer\" style=\"padding-left: 10%;\">\r\n                <p>\r\n                <span>&#169;</span> 2019 RJ private Limited. Venkata Ramana\r\n                Vanchanagiri\r\n                </p>\r\n                <p>Follow Us On</p>\r\n                <p><i class=\"fa fa-facebook-square\" aria-hidden=\"true\"></i></p>\r\n                <p><i class=\"fa fa-instagram\" aria-hidden=\"true\"></i></p>\r\n                <!-- <p><i class=\"fa fa-twitter\" aria-hidden=\"true\"></i></p> -->\r\n        </footer>\r\n        </div>\r\n    </body>\r\n    <!-- <script src=\"/dist/index.bundle.js\"></script> -->\r\n</html>\r\n";
// Exports
module.exports = code;

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/style/app.scss":
/*!****************************!*\
  !*** ./src/style/app.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/user.scss":
/*!*****************************!*\
  !*** ./src/style/user.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/app/index.js");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL2FwcC91c2Vycy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL3B1YmxpYy9pbWFnZXMvZGV0YWlsczEuc3ZnIiwid2VicGFjazovL3Jlc3RhdXJhbnQvLi9zcmMvcHVibGljL2ltYWdlcy9kZXRhaWxzMi5zdmciLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC8uL3NyYy9wdWJsaWMvaW1hZ2VzL2RldGFpbHMzLnN2ZyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL3B1YmxpYy9pbWFnZXMvZGV0YWlsczQuc3ZnIiwid2VicGFjazovL3Jlc3RhdXJhbnQvLi9zcmMvcHVibGljL2ltYWdlcy9kZXRhaWxzNS5zdmciLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC8uL3NyYy9wdWJsaWMvaW1hZ2VzL2xvZ280NS5wbmciLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC8uL3NyYy9wdWJsaWMvaW5kZXguaHRtbCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vbm9kZV9tb2R1bGVzL2h0bWwtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC8uL3NyYy9zdHlsZS9hcHAuc2Nzcz8yYzUwIiwid2VicGFjazovL3Jlc3RhdXJhbnQvLi9zcmMvc3R5bGUvdXNlci5zY3NzPzA2MWUiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Jlc3RhdXJhbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3RhdXJhbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOlsiZmlyZWJhc2VDb25maWciLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJkYXRhYmFzZSIsInJlZiIsIm9uIiwiZ290ZGF0YSIsImVycmRhdGEiLCJ1c2VySW5mbyIsImRhdGEiLCJ1c2VyRGF0YSIsInZhbCIsImtleXMiLCJPYmplY3QiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9uY2xpY2siLCJzdHlsZSIsInZpc2liaWxpdHkiLCJjbG9zZSIsInJlZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJtaXRGb3JtIiwiZSIsInByZXZlbnREZWZhdWx0IiwibmFtZSIsInZhbHVlIiwicGFzc3dvcmQiLCJyZWVudGVyIiwicGhuX25vIiwiZW1haWwiLCJjb2xvciIsImlubmVySFRNTCIsImF1dGgiLCJjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJ0aGVuIiwidXNlckNyZWRlbnRpYWwiLCJVaWQiLCJ1c2VyIiwidWlkIiwic2V0IiwicGhubm8iLCJVSWQiLCJlcnJvciIsImVycm9yQ29kZSIsImNvZGUiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwiYWxlcnQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsInVzZXJkYXRhIiwicmVzZXQiLCJsb2dpbkZvcm0iLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsInNuYXBzaG90Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZGF0ZV90b2RheSIsImR0VG9kYXkiLCJEYXRlIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsIm1heERhdGUiLCJzZXRBdHRyaWJ1dGUiLCJsb2dpbk5hbWUiLCJnZXRJdGVtIiwibG9nb3V0Iiwic2lnbk91dCIsIm9uY2hhbmdlIiwiZGF0ZSIsIm5ld0RhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJkYXRlMiIsImN1cnJfdGltZSIsIm9wIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpIiwibGVuZ3RoIiwidGltZSIsImRpZmYiLCJkaXNhYmxlZCIsImJvb2tGb3JtIiwicmVzdERhdGEiLCJwZXJzb25zIiwiZHVtbXkiLCJ0aW1lc3RhbXAiLCJwdXNoIiwibmFtZTIiLCJub19vZl9wZXJzb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0NBRUE7O0FBQ0EsSUFBSUEsY0FBYyxHQUFHO0FBQ2pCQyxRQUFNLEVBQUUseUNBRFM7QUFFakJDLFlBQVUsRUFBRSx1Q0FGSztBQUdqQkMsV0FBUyxFQUFFLHVCQUhNO0FBSWpCQyxlQUFhLEVBQUUsbUNBSkU7QUFLakJDLG1CQUFpQixFQUFFLGVBTEY7QUFNakJDLE9BQUssRUFBRTtBQU5VLENBQXJCLEMsQ0FRQTs7QUFDQUMsUUFBUSxDQUFDQyxhQUFULENBQXVCUixjQUF2QjtBQUVBLElBQUlTLFFBQVEsR0FBQ0YsUUFBUSxDQUFDRSxRQUFULEVBQWI7QUFDQSxJQUFJQyxHQUFHLEdBQUNELFFBQVEsQ0FBQ0MsR0FBVCxDQUFhLG9CQUFiLENBQVI7QUFDQUEsR0FBRyxDQUFDQyxFQUFKLENBQU8sT0FBUCxFQUFlQyxPQUFmLEVBQXVCQyxPQUF2QjtBQUNBLElBQUlDLFFBQVEsR0FBQyxFQUFiOztBQUNBLFNBQVNGLE9BQVQsQ0FBaUJHLElBQWpCLEVBQXNCO0FBQ25CLE1BQUlDLFFBQVEsR0FBQ0QsSUFBSSxDQUFDRSxHQUFMLEVBQWI7QUFDQSxNQUFJQyxJQUFJLEdBQUNDLE1BQU0sQ0FBQ0QsSUFBUCxDQUFZRixRQUFaLENBQVQ7QUFD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aEUsaUNBQWlDLG1CQUFPLENBQUMsK0RBQXVCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa2xEQUFrbEQsNjRCQUE2NEIsbUJBQW1CLHdaQUF3WiwwdURBQTB1RCxtQkFBbUIsc0xBQXNMLHV0REFBdXRELDBEQUEwRDtBQUM5a047QUFDQSxzQjs7Ozs7Ozs7Ozs7QUNqQmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDekJBOzs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuLi9zdHlsZS9hcHAuc2Nzc1wiO1xyXG5pbXBvcnQgXCIuLi9hcHAvdXNlcnMuanNcIjtcclxuaW1wb3J0IFwiLi4vcHVibGljL2luZGV4Lmh0bWxcIjtcclxuaW1wb3J0IFwiLi4vc3R5bGUvdXNlci5zY3NzXCI7XHJcbi8vIFlvdXIgd2ViIGFwcCdzIEZpcmViYXNlIGNvbmZpZ3VyYXRpb25cclxudmFyIGZpcmViYXNlQ29uZmlnID0ge1xyXG4gICAgYXBpS2V5OiBcIkFJemFTeUR4NTNvQzNHdGxJbkozbHJqOThVdGxmSGIxeDFLNXI1b1wiLFxyXG4gICAgYXV0aERvbWFpbjogXCJyZXN0YXVyYW50LW1nbXQtNWY0ZTYuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwicmVzdGF1cmFudC1tZ210LTVmNGU2XCIsXHJcbiAgICBzdG9yYWdlQnVja2V0OiBcInJlc3RhdXJhbnQtbWdtdC01ZjRlNi5hcHBzcG90LmNvbVwiLFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTA4NjI3MDUyMzYwMVwiLFxyXG4gICAgYXBwSWQ6IFwiMToxMDg2MjcwNTIzNjAxOndlYjo3ODE0MGY2NzMwNzlkZDg3MDBkZGYwXCIsXHJcbn07XHJcbi8vIEluaXRpYWxpemUgRmlyZWJhc2VcclxuZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcblxyXG52YXIgZGF0YWJhc2U9ZmlyZWJhc2UuZGF0YWJhc2UoKTtcclxudmFyIHJlZj1kYXRhYmFzZS5yZWYoXCJSZWdpc3RyYXRpb24tRGF0YS9cIik7XHJcbnJlZi5vbigndmFsdWUnLGdvdGRhdGEsZXJyZGF0YSk7XHJcbnZhciB1c2VySW5mbz1bXTtcclxuZnVuY3Rpb24gZ290ZGF0YShkYXRhKXtcclxuICAgdmFyIHVzZXJEYXRhPWRhdGEudmFsKCk7XHJcbiAgIHZhciBrZXlzPU9iamVjdC5rZXlzKHVzZXJEYXRhKTtcclxuICAgY29uc29sZS5sb2coa2V5cyk7XHJcbn1cclxuZnVuY3Rpb24gZXJyZGF0YShlcnIpe1xyXG4gIGNvbnNvbGUubG9nKGVycik7XHJcbn1cclxuXHJcblxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKSl7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBsb2coKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndyYXBwZXItbW9kYWxcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG59O1xyXG59XHJcbmlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VcIikpe1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBjbG9zZSgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid3JhcHBlci1tb2RhbFwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxufTtcclxufVxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZ1wiKSl7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiByZWcoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndyYXBwZXItbW9kYWwtcmVnXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxufTtcclxufVxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlMVwiKSl7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UxXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBjbG9zZSgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid3JhcHBlci1tb2RhbC1yZWdcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbn07XHJcbn1cclxuaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdmb3JtXCIpKXtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgc3VibWl0Rm9ybSk7XHJcbn1cclxudmFyIHVzZXJEYXRhO1xyXG5mdW5jdGlvbiBzdWJtaXRGb3JtKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1bmFtZVwiKS52YWx1ZTtcclxuICAgIHZhciBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHdkMlwiKS52YWx1ZTtcclxuICAgIHZhciByZWVudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwd2QtcmVcIikudmFsdWU7XHJcbiAgICB2YXIgcGhuX25vID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwaG5ub1wiKS52YWx1ZTtcclxuICAgIHZhciBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWU7XHJcbiAgICBpZiAocGFzc3dvcmQgIT0gcmVlbnRlcikge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpLmlubmVySFRNTCA9IFwiUGFzc3dvcmRzIERvbnQgTWF0Y2hcIjtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpcmViYXNlLmF1dGgoKS5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3b3JkKVxyXG4gICAgICAgIC50aGVuKCh1c2VyQ3JlZGVudGlhbCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJDcmVkZW50aWFsKTtcclxuICAgICAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVpZFwiLEpTT04uc3RyaW5naWZ5KHVzZXJDcmVkZW50aWFsKSk7XHJcbiAgICAgICAgdmFyIFVpZD11c2VyQ3JlZGVudGlhbC51c2VyLnVpZDtcclxuICAgICAgICAgIGZpcmViYXNlXHJcbiAgICAgICAgICAgIC5kYXRhYmFzZSgpXHJcbiAgICAgICAgICAgIC5yZWYoXCJSZWdpc3RyYXRpb24tRGF0YS9cIitVaWQpXHJcbiAgICAgICAgICAgIC5zZXQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgcGhubm86IHBobl9ubyxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgICAgIFVJZDpVaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgIGFsZXJ0KGVycm9yQ29kZSxlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFsZXJ0KFwiUmVnaXN0cmF0aW9uIHN1Y2Nlc2Z1bGxcIik7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyZGF0YVwiLEpTT04uc3RyaW5naWZ5KHVzZXJkYXRhKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdmb3JtXCIpLnJlc2V0KCk7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcbmlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5mb3JtXCIpKXtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbmZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBsb2dpbkZvcm0pO1xyXG59XHJcbmZ1bmN0aW9uIGxvZ2luRm9ybShlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBlbWFpbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsLWxvZ1wiKS52YWx1ZTtcclxuICAgIHZhciBwYXNzd29yZD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInB3ZFwiKS52YWx1ZTtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpXHJcbiAgLnRoZW4oKHVzZXJDcmVkZW50aWFsKSA9PiB7XHJcbiAgICB2YXIgdWlkPXVzZXJDcmVkZW50aWFsLnVzZXIudWlkO1xyXG4gICAgY29uc29sZS5sb2codWlkKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcmNyZWRlbnRpYWxcIixKU09OLnN0cmluZ2lmeSh1c2VyQ3JlZGVudGlhbCkpO1xyXG4gICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJSZWdpc3RyYXRpb24tRGF0YS9cIit1aWQpLm9uKFwidmFsdWVcIixmdW5jdGlvbihzbmFwc2hvdCl7XHJcbiAgICAgICAgIGxldCBVSWQ9c25hcHNob3QudmFsKCkuVUlkO1xyXG4gICAgICAgICBpZih1aWQ9PT1VSWQpe1xyXG4gICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcm5hbWU0NVwiLHNuYXBzaG90LnZhbCgpLm5hbWUpO1xyXG4gICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWY9XCIuL3VzZXJzLmh0bWxcIjtcclxuICB9KVxyXG4gIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gIH0pO1xyXG59IiwiaW1wb3J0IHtkYXRhYmFzZX0gZnJvbSBcIi4vaW5kZXguanNcIlxyXG52YXIgZGF0ZV90b2RheT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGUtdG9kYXlcIik7XHJcbnZhciBkdFRvZGF5ID0gbmV3IERhdGUoKTtcclxudmFyIG1vbnRoID0gZHRUb2RheS5nZXRNb250aCgpICsgMTtcclxudmFyIGRheSA9IGR0VG9kYXkuZ2V0RGF0ZSgpO1xyXG52YXIgeWVhciA9IGR0VG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuaWYobW9udGggPCAxMClcclxuICAgIG1vbnRoID0gJzAnICsgbW9udGgudG9TdHJpbmcoKTtcclxuaWYoZGF5IDwgMTApXHJcbiAgICBkYXkgPSAnMCcgKyBkYXkudG9TdHJpbmcoKTtcclxuXHJcbnZhciBtYXhEYXRlID0geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xyXG5jb25zb2xlLmxvZyhtYXhEYXRlKTtcclxuaWYoZGF0ZV90b2RheSl7XHJcbmRhdGVfdG9kYXkuc2V0QXR0cmlidXRlKFwibWluXCIsbWF4RGF0ZSk7XHJcbn1cclxuaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lXCIpKXtcclxuICAgIHZhciBsb2dpbk5hbWU9bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZTQ1XCIpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWxjb21lXCIpLmlubmVySFRNTD1cIldlbGNvbWUgXCIrbG9naW5OYW1lO1xyXG59XHJcbmlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb3V0XCIpKXtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXRcIikub25jbGljaz1mdW5jdGlvbiBsb2dvdXQoKXtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsb2dpbm5hbWVcIixudWxsKTtcclxuICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWY9XCIuL2luZGV4Lmh0bWxcIjtcclxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pO1xyXG59XHJcbn1cclxuaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlLXRvZGF5XCIpKXtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlLXRvZGF5XCIpLm9uY2hhbmdlPWZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgZGF0ZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGUtdG9kYXlcIikudmFsdWU7XHJcbiAgICBsZXQgbmV3RGF0ZT1uZXcgRGF0ZShkYXRlLnRvU3RyaW5nKCkpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgY29uc29sZS5sb2coZGF0ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhuZXdEYXRlKTtcclxuICAgIGxldCBkYXRlMj1uZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgaWYobmV3RGF0ZSA9PT0gZGF0ZTIpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld0RhdGUgPT09IGRhdGUyKTtcclxuICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIikpe1xyXG4gICAgICAgICAgICBsZXQgY3Vycl90aW1lPW5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5nZXRFbGVtZW50c0J5VGFnTmFtZShcIm9wdGlvblwiKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBvcC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICBsZXQgdGltZT1uZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpK1wiIFwiK29wW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICAgdGltZT1uZXcgRGF0ZSh0aW1lKTtcclxuICAgICAgICAgICAgIHZhciBkaWZmPWN1cnJfdGltZSAtIHRpbWU7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWZmKTtcclxuICAgICAgICAgICAgIChkaWZmPjApIFxyXG4gICAgICAgICAgICAgICAgICA/IG9wW2ldLmRpc2FibGVkID10cnVlXHJcbiAgICAgICAgICAgICAgICAgIDogb3BbaV0uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgdmFyIG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwib3B0aW9uXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgb3AubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBvcFtpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG59XHJcbmlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9vay1mb3JtXCIpKXtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9vay1mb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIixib29rRm9ybSlcclxufVxyXG52YXIgcmVzdERhdGE9W107XHJcbmZ1bmN0aW9uIGJvb2tGb3JtKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IGRhdGU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlLXRvZGF5XCIpLnZhbHVlO1xyXG4gICAgbGV0IHRpbWU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpLnZhbHVlO1xyXG4gICAgbGV0IHBlcnNvbnM9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXJzb25zXCIpLnZhbHVlO1xyXG4gICAgLy8gY29uc29sZS5sb2coZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJUYWJsZS1SZXNlcnZhdGlvbi1EYXRhL1wiKSk7XHJcbiAgICB2YXIgZHVtbXk9e1xyXG4gICAgICAgIGRhdGU6IGRhdGUsXHJcbiAgICAgICAgdGltZTogdGltZSxcclxuICAgICAgICBwZXJzb25zOnBlcnNvbnMsXHJcbiAgICAgICAgdGltZXN0YW1wOm5ldyBEYXRlKClcclxuICAgIH1cclxuICByZXN0RGF0YS5wdXNoKGR1bW15KTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInJlc3REYXRhXCIsSlNPTi5zdHJpbmdpZnkocmVzdERhdGEpKTtcclxuICB2YXIgbmFtZTI9bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZTQ1XCIpO1xyXG4gICAgZmlyZWJhc2VcclxuICAgICAgICAgICAgLmRhdGFiYXNlKClcclxuICAgICAgICAgICAgLnJlZihcIlRhYmxlLVJlc2VydmF0aW9uLURhdGEvXCIrbmFtZTIpXHJcbiAgICAgICAgICAgIC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGRhdGU6IGRhdGUsXHJcbiAgICAgICAgICAgICAgICB0aW1lOnRpbWUsXHJcbiAgICAgICAgICAgICAgICBub19vZl9wZXJzb25zOnBlcnNvbnMsXHJcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6bmV3IERhdGUoKVxyXG4gICAgICAgICAgICAgICAgLy8gVUlkOkpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1aWRcIikpLnVzZXIudWlkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWxlcnQoXCJ0YWJsZSBib29rZWQgU3VjY2Vzc2Z1bGx5XCIpO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgXCJpbWFnZXMvZGV0YWlsczEuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJpbWFnZXMvZGV0YWlsczIuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJpbWFnZXMvZGV0YWlsczMuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJpbWFnZXMvZGV0YWlsczQuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJpbWFnZXMvZGV0YWlsczUuc3ZnXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJpbWFnZXMvbG9nbzQ1LnBuZ1wiOyIsIi8vIEltcG9ydHNcbnZhciBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9odG1sLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCIpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fID0gcmVxdWlyZShcIi4vaW1hZ2VzL2xvZ280NS5wbmdcIik7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzFfX18gPSByZXF1aXJlKFwiLi9pbWFnZXMvZGV0YWlsczEuc3ZnXCIpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF8yX19fID0gcmVxdWlyZShcIi4vaW1hZ2VzL2RldGFpbHMyLnN2Z1wiKTtcbnZhciBfX19IVE1MX0xPQURFUl9JTVBPUlRfM19fXyA9IHJlcXVpcmUoXCIuL2ltYWdlcy9kZXRhaWxzMy5zdmdcIik7XG52YXIgX19fSFRNTF9MT0FERVJfSU1QT1JUXzRfX18gPSByZXF1aXJlKFwiLi9pbWFnZXMvZGV0YWlsczQuc3ZnXCIpO1xudmFyIF9fX0hUTUxfTE9BREVSX0lNUE9SVF81X19fID0gcmVxdWlyZShcIi4vaW1hZ2VzL2RldGFpbHM1LnN2Z1wiKTtcbi8vIE1vZHVsZVxudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzBfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8wX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8xX19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfMV9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzJfX18pO1xudmFyIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzNfX18gPSBfX19IVE1MX0xPQURFUl9HRVRfU09VUkNFX0ZST01fSU1QT1JUX19fKF9fX0hUTUxfTE9BREVSX0lNUE9SVF8zX19fKTtcbnZhciBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF80X19fID0gX19fSFRNTF9MT0FERVJfR0VUX1NPVVJDRV9GUk9NX0lNUE9SVF9fXyhfX19IVE1MX0xPQURFUl9JTVBPUlRfNF9fXyk7XG52YXIgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0hUTUxfTE9BREVSX0dFVF9TT1VSQ0VfRlJPTV9JTVBPUlRfX18oX19fSFRNTF9MT0FERVJfSU1QT1JUXzVfX18pO1xudmFyIGNvZGUgPSBcIjwhRE9DVFlQRSBodG1sPlxcclxcbjxodG1sIGxhbmc9XFxcImVuXFxcIj5cXHJcXG4gICAgPGhlYWQ+XFxyXFxuICAgICAgICA8bWV0YSBjaGFyc2V0PVxcXCJVVEYtOFxcXCIgLz5cXHJcXG4gICAgICAgIDxtZXRhIG5hbWU9XFxcInZpZXdwb3J0XFxcIiBjb250ZW50PVxcXCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXFxcIiAvPlxcclxcbiAgICAgICAgPHRpdGxlPlJlc3RhdXJhbnQ8L3RpdGxlPlxcclxcbiAgICA8L2hlYWQ+XFxyXFxuICAgIDxsaW5rXFxyXFxuICAgICAgICAgICAgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIlxcclxcbiAgICAgICAgICAgIGhyZWY9XFxcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3NcXFwiXFxyXFxuICAgICAgICAvPlxcclxcbiAgICA8c2NyaXB0IHNyYz1cXFwiaHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vZmlyZWJhc2Vqcy84LjIuNC9maXJlYmFzZS1hcHAuanNcXFwiPjwvc2NyaXB0PlxcclxcbiAgICA8c2NyaXB0IHNyYz1cXFwiaHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vZmlyZWJhc2Vqcy84LjIuNC9maXJlYmFzZS1hdXRoLmpzXFxcIj48L3NjcmlwdD5cXHJcXG4gICAgPHNjcmlwdCBzcmM9XFxcImh0dHBzOi8vd3d3LmdzdGF0aWMuY29tL2ZpcmViYXNlanMvOC4yLjQvZmlyZWJhc2UtZGF0YWJhc2UuanNcXFwiPjwvc2NyaXB0PlxcclxcbiAgICA8IS0tIDxzY3JpcHQgc3JjPVxcXCJcXFwiPjwvc2NyaXB0PiAtLT5cXHJcXG4gICAgPGJvZHk+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ3cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVxcXCJoZWFkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMF9fXyArIFwiXFxcIiBhbHQ9XFxcImxvZ29cXFwiLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcImxvZ1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXNpZ24taW5cXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+IExvZ2luPC9pPiA8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XFxcInJlZ1xcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXVzZXItcGx1c1xcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvaT4gU2lnbiBVcDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5BYm91dCBVczwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDwvaGVhZGVyPlxcclxcbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVxcXCJ3cmFwcGVyLXNlY3Rpb25cXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8aDE+RmluZCBZb3VyIFRhYmxlLiBHZXQgc3RhcnRlZDwvaDE+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIndyYXBwZXItbW9kYWxcXFwiIGNsYXNzPVxcXCJ3cmFwcGVyLW1vZGFsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJsb2dpblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gdHlwZT1cXFwic3VibWl0XFxcIiBpZD1cXFwibG9naW5mb3JtXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgaWQ9XFxcImRpYWxvZ1xcXCI+RW50ZXIgbG9naW4gPGEgaWQ9XFxcImNsb3NlXFxcIj4mdGltZXM7PC9hPjwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVxcXCJlbWFpbFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVxcXCJlbWFpbC1sb2dcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwiZW50ZXIgZW1haWwuLlxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cXFwib2ZmXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaWQ9XFxcImVycm9yMVxcXCI+PC9hPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcInBhc3N3b3JkXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XFxcInB3ZFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJlbnRlciBwYXNzd29yZFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cXFwib2ZmXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwibG9naW4tdmFsXFxcIj5Mb2dpbjwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCJcXFwiIHN0eWxlPVxcXCJ0ZXh0LWFsaWduOiBsZWZ0OyBmb250LXNpemU6IG1lZGl1bTtcXFwiPnJlZ2lzdGVyPC9hPiBcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIndyYXBwZXItbW9kYWwtcmVnXFxcIiBjbGFzcz1cXFwid3JhcHBlci1tb2RhbC1yZWdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcInJlZ2lzdGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSB0eXBlPVxcXCJzdWJtaXRcXFwiIGlkPVxcXCJyZWdmb3JtXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+V2VsY29tZSB0byB5dW0geXVtIDxhIGlkPVxcXCJjbG9zZTFcXFwiPiZ0aW1lczs8L2E+PC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cXFwidW5hbWVcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwiZW50ZXIgdXNlcm5hbWUuLlxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cXFwib2ZmXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVxcXCJwYXNzd29yZFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVxcXCJwd2QyXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcImVudGVyIHBhc3N3b3JkXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVxcXCJvZmZcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cXFwicGFzc3dvcmRcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVxcXCJwd2QtcmVcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJyZS1lbnRlciBwYXNzd29yZFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVxcXCJvZmZcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVxcXCJudW1iZXJcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XFxcInBobm5vXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJlbnRlciBudW1iZXJcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVxcXCJvZmZcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcXHJcXG4gICAgICAgICAgICAgICAgICAgIC8+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcXHJcXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XFxcImVtYWlsXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgaWQ9XFxcImVtYWlsXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcImVudGVyIGVtYWlsXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVxcXCJvZmZcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxcclxcbiAgICAgICAgICAgICAgICAvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJyZWdpc3Rlci12YWxcXFwiPlJlZ2lzdGVyPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGlkPVxcXCJtZXNzYWdlXFxcIj48L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIlxcXCIgc3R5bGU9XFxcInRleHQtYWxpZ246IGxlZnQ7IGZvbnQtc2l6ZTogbWVkaXVtO1xcXCI+QmFjayB0byBMb2dpbjwvYT4gXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cXHJcXG4gICAgICAgICAgICA8aDEgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OiAyJTtcXFwiPldoZW5ldmVyIFlvdSBhcmUgSHVuZ3J5LiE8L2gxPlxcclxcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwid3JhcHBlci1zcGVjaWZ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGV0MVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgX19fSFRNTF9MT0FERVJfUkVQTEFDRU1FTlRfMV9fXyArIFwiXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGgzPkJvb2sgRm9yIEx1bmNoIFRvZGF5PC9oMz5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxwPlNlZSBSZXN0YXVyYW50cyBBdmFpbGFibGUgZm9yIGx1bmNoPC9wPlxcclxcbiAgICAgICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZXQyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8yX19fICsgXCJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aDM+RmluZCBPdXRkb29yIERpbmluZzwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8cD5HaXZlIFJlc3RhdXJudHMgd2l0aCBvdXRkb29yIERpbmluZyBPcHRpb25zPC9wPlxcclxcbiAgICAgICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZXQzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF8zX19fICsgXCJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aDM+T3JkZXIgVGFrZW91dDwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8cD5PcmRlciBhbmQgUGF5IGZvciBUYWtlb3V0PC9wPlxcclxcbiAgICAgICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZXQ0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyBfX19IVE1MX0xPQURFUl9SRVBMQUNFTUVOVF80X19fICsgXCJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aDM+RGluaW5nIEV4cGVyaWVuY2VzPC9oMz5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxwPlNlYXJjaCBhbmQgYm9vayB1bmlxdWUgZXhwZXJpZW5jZXM8L3A+XFxyXFxuICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgICAgIDxsaT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRldDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIF9fX0hUTUxfTE9BREVSX1JFUExBQ0VNRU5UXzVfX18gKyBcIlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxoMz5HaXZlIERpbmluZzwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8cD5TdXBwb3J0IGEgbG9jYWwgUmVzdGF1cmFudDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgICAgICA8L3VsPlxcclxcbiAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XFxcImZvb3RlclxcXCIgc3R5bGU9XFxcInBhZGRpbmctbGVmdDogMTAlO1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICA8c3Bhbj4mIzE2OTs8L3NwYW4+IDIwMTkgUkogcHJpdmF0ZSBMaW1pdGVkLiBWZW5rYXRhIFJhbWFuYVxcclxcbiAgICAgICAgICAgICAgICBWYW5jaGFuYWdpcmlcXHJcXG4gICAgICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgICAgICA8cD5Gb2xsb3cgVXMgT248L3A+XFxyXFxuICAgICAgICAgICAgICAgIDxwPjxpIGNsYXNzPVxcXCJmYSBmYS1mYWNlYm9vay1zcXVhcmVcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L2k+PC9wPlxcclxcbiAgICAgICAgICAgICAgICA8cD48aSBjbGFzcz1cXFwiZmEgZmEtaW5zdGFncmFtXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+PC9pPjwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPCEtLSA8cD48aSBjbGFzcz1cXFwiZmEgZmEtdHdpdHRlclxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvaT48L3A+IC0tPlxcclxcbiAgICAgICAgPC9mb290ZXI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9ib2R5PlxcclxcbiAgICA8IS0tIDxzY3JpcHQgc3JjPVxcXCIvZGlzdC9pbmRleC5idW5kbGUuanNcXFwiPjwvc2NyaXB0PiAtLT5cXHJcXG48L2h0bWw+XFxyXFxuXCI7XG4vLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IGNvZGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBvcHRpb25zID0ge307XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuXG5cbiAgdXJsID0gdXJsICYmIHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmw7XG5cbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMubWF5YmVOZWVkUXVvdGVzICYmIC9bXFx0XFxuXFxmXFxyIFwiJz08PmBdLy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybCwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAvaW5kZXguanNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9