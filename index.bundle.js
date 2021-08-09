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
/* harmony import */ var _app_tableData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/tableData.js */ "./src/app/tableData.js");
/* harmony import */ var _app_tableData_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_tableData_js__WEBPACK_IMPORTED_MODULE_1__);

 // import "../public/order.html";

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

    if (email.includes("manager")) {
      window.location.href = "./manager.html";
    } else {
      window.location.href = "./users.html";
    }
  })["catch"](function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

if (document.getElementById("locateus")) {
  document.getElementById("locateus").onclick = function getLocation() {
    document.getElementById("getLoc").scrollIntoView({
      behavior: "smooth"
    });
  };
}

if (document.getElementById('aboutus')) {
  
  document.getElementById('aboutus').onclick = function () {
    
    window.location.href = "./aboutus.html";
  };
}

document.getElementById('hamburger').onclick = function () {
  var x = document.getElementById("wrapheader");

  if (x.className === "wrapper__header") {
    x.className = "wrapper__header1";
  } // } else {
  //   x.className = "wrapper__header";
  // }

};

/***/ }),

/***/ "./src/app/tableData.js":
/*!******************************!*\
  !*** ./src/app/tableData.js ***!
  \******************************/
/***/ (() => {

var tableData = [{
  id: 1,
  timeStamp: []
}, {
  id: 2,
  timeStamp: []
}, {
  id: 3,
  timeStamp: []
}, {
  id: 4,
  timeStamp: []
}, {
  id: 5,
  timeStamp: []
}, {
  id: 6,
  timeStamp: []
}, {
  id: 7,
  timeStamp: []
}, {
  id: 8,
  timeStamp: []
}, {
  id: 9,
  timeStamp: []
}, {
  id: 10,
  timeStamp: []
}];
if (!localStorage.getItem("Restaurant-Table-Data")) localStorage.setItem("Restaurant-Table-Data", JSON.stringify(tableData));
var resData = [{
  name: "vineeth",
  tableId: 1,
  date: "21-02-2021",
  time: "10:00 AM",
  persons: 4,
  timeStamp: new Date()
}];
if (!localStorage.getItem("restData")) localStorage.setItem("restData", JSON.stringify(resData));

/***/ }),

/***/ "./src/style/app.scss":
/*!****************************!*\
  !*** ./src/style/app.scss ***!
  \****************************/
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
/******/ 	__webpack_require__("./src/app/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50Ly4vc3JjL2FwcC90YWJsZURhdGEuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC8uL3NyYy9zdHlsZS9hcHAuc2Nzcz8yYzUwIiwid2VicGFjazovL3Jlc3RhdXJhbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3RhdXJhbnQvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwiZGF0YWJhc2UiLCJyZWYiLCJvbiIsImdvdGRhdGEiLCJlcnJkYXRhIiwidXNlckluZm8iLCJkYXRhIiwidXNlckRhdGEiLCJ2YWwiLCJrZXlzIiwiT2JqZWN0IiwiY29uc29sZSIsImxvZyIsImVyciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJvbmNsaWNrIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwiY2xvc2UiLCJyZWciLCJhZGRFdmVudExpc3RlbmVyIiwic3VibWl0Rm9ybSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm5hbWUiLCJ2YWx1ZSIsInBhc3N3b3JkIiwicmVlbnRlciIsInBobl9ubyIsImVtYWlsIiwiY29sb3IiLCJpbm5lckhUTUwiLCJhdXRoIiwiY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkIiwidGhlbiIsInVzZXJDcmVkZW50aWFsIiwiVWlkIiwidXNlciIsInVpZCIsInNldCIsInBobm5vIiwiVUlkIiwiZXJyb3IiLCJlcnJvckNvZGUiLCJjb2RlIiwiZXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsImFsZXJ0IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VyZGF0YSIsInJlc2V0IiwibG9naW5Gb3JtIiwic2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQiLCJzbmFwc2hvdCIsImluY2x1ZGVzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZ2V0TG9jYXRpb24iLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwieCIsImNsYXNzTmFtZSIsInRhYmxlRGF0YSIsImlkIiwidGltZVN0YW1wIiwiZ2V0SXRlbSIsInJlc0RhdGEiLCJ0YWJsZUlkIiwiZGF0ZSIsInRpbWUiLCJwZXJzb25zIiwiRGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtDQUVBOztBQUNBLElBQUlBLGNBQWMsR0FBRztBQUNqQkMsUUFBTSxFQUFFLHlDQURTO0FBRWpCQyxZQUFVLEVBQUUsdUNBRks7QUFHakJDLFdBQVMsRUFBRSx1QkFITTtBQUlqQkMsZUFBYSxFQUFFLG1DQUpFO0FBS2pCQyxtQkFBaUIsRUFBRSxlQUxGO0FBTWpCQyxPQUFLLEVBQUU7QUFOVSxDQUFyQixDLENBUUE7O0FBQ0FDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QlIsY0FBdkI7QUFFQSxJQUFJUyxRQUFRLEdBQUNGLFFBQVEsQ0FBQ0UsUUFBVCxFQUFiO0FBQ0EsSUFBSUMsR0FBRyxHQUFDRCxRQUFRLENBQUNDLEdBQVQsQ0FBYSxvQkFBYixDQUFSO0FBQ0FBLEdBQUcsQ0FBQ0MsRUFBSixDQUFPLE9BQVAsRUFBZUMsT0FBZixFQUF1QkMsT0FB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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlL2FwcC5zY3NzXCI7XHJcbmltcG9ydCBcIi4uL2FwcC90YWJsZURhdGEuanNcIjtcclxuLy8gaW1wb3J0IFwiLi4vcHVibGljL29yZGVyLmh0bWxcIjtcclxudmFyIGZpcmViYXNlQ29uZmlnID0ge1xyXG4gICAgYXBpS2V5OiBcIkFJemFTeUR4NTNvQzNHdGxJbkozbHJqOThVdGxmSGIxeDFLNXI1b1wiLFxyXG4gICAgYXV0aERvbWFpbjogXCJyZXN0YXVyYW50LW1nbXQtNWY0ZTYuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgICBwcm9qZWN0SWQ6IFwicmVzdGF1cmFudC1tZ210LTVmNGU2XCIsXHJcbiAgICBzdG9yYWdlQnVja2V0OiBcInJlc3RhdXJhbnQtbWdtdC01ZjRlNi5hcHBzcG90LmNvbVwiLFxyXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTA4NjI3MDUyMzYwMVwiLFxyXG4gICAgYXBwSWQ6IFwiMToxMDg2MjcwNTIzNjAxOndlYjo3ODE0MGY2NzMwNzlkZDg3MDBkZGYwXCIsXHJcbn07XHJcbi8vIEluaXRpYWxpemUgRmlyZWJhc2VcclxuZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcblxyXG52YXIgZGF0YWJhc2U9ZmlyZWJhc2UuZGF0YWJhc2UoKTtcclxudmFyIHJlZj1kYXRhYmFzZS5yZWYoXCJSZWdpc3RyYXRpb24tRGF0YS9cIik7XHJcbnJlZi5vbigndmFsdWUnLGdvdGRhdGEsZXJyZGF0YSk7XHJcbnZhciB1c2VySW5mbz1bXTtcclxuZnVuY3Rpb24gZ290ZGF0YShkYXRhKXtcclxuICAgdmFyIHVzZXJEYXRhPWRhdGEudmFsKCk7XHJcbiAgIHZhciBrZXlzPU9iamVjdC5rZXlzKHVzZXJEYXRhKTtcclxuICAgY29uc29sZS5sb2coa2V5cyk7XHJcbn1cclxuZnVuY3Rpb24gZXJyZGF0YShlcnIpe1xyXG4gIGNvbnNvbGUubG9nKGVycik7XHJcbn1cclxuXHJcblxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKSl7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBsb2coKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndyYXBwZXItbW9kYWxcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG59O1xyXG59XHJcbmlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VcIikpe1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBjbG9zZSgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid3JhcHBlci1tb2RhbFwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxufTtcclxufVxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZ1wiKSl7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiByZWcoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndyYXBwZXItbW9kYWwtcmVnXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxufTtcclxufVxyXG5pZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlMVwiKSl7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UxXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBjbG9zZSgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid3JhcHBlci1tb2RhbC1yZWdcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbn07XHJcbn1cclxuaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdmb3JtXCIpKXtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgc3VibWl0Rm9ybSk7XHJcbn1cclxudmFyIHVzZXJEYXRhO1xyXG5mdW5jdGlvbiBzdWJtaXRGb3JtKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1bmFtZVwiKS52YWx1ZTtcclxuICAgIHZhciBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHdkMlwiKS52YWx1ZTtcclxuICAgIHZhciByZWVudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwd2QtcmVcIikudmFsdWU7XHJcbiAgICB2YXIgcGhuX25vID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwaG5ub1wiKS52YWx1ZTtcclxuICAgIHZhciBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWU7XHJcbiAgICBpZiAocGFzc3dvcmQgIT0gcmVlbnRlcikge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZVwiKS5zdHlsZS5jb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpLmlubmVySFRNTCA9IFwiUGFzc3dvcmRzIERvbnQgTWF0Y2hcIjtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZpcmViYXNlLmF1dGgoKS5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3b3JkKVxyXG4gICAgICAgIC50aGVuKCh1c2VyQ3JlZGVudGlhbCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJDcmVkZW50aWFsKTtcclxuICAgICAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVpZFwiLEpTT04uc3RyaW5naWZ5KHVzZXJDcmVkZW50aWFsKSk7XHJcbiAgICAgICAgdmFyIFVpZD11c2VyQ3JlZGVudGlhbC51c2VyLnVpZDtcclxuICAgICAgICAgIGZpcmViYXNlXHJcbiAgICAgICAgICAgIC5kYXRhYmFzZSgpXHJcbiAgICAgICAgICAgIC5yZWYoXCJSZWdpc3RyYXRpb24tRGF0YS9cIitVaWQpXHJcbiAgICAgICAgICAgIC5zZXQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOnBhc3N3b3JkLFxyXG4gICAgICAgICAgICAgICAgcGhubm86IHBobl9ubyxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgICAgIFVJZDpVaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGVycm9yLmNvZGU7XHJcbiAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgIGFsZXJ0KGVycm9yQ29kZSxlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFsZXJ0KFwiUmVnaXN0cmF0aW9uIHN1Y2Nlc2Z1bGxcIik7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyZGF0YVwiLEpTT04uc3RyaW5naWZ5KHVzZXJkYXRhKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdmb3JtXCIpLnJlc2V0KCk7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcbmlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5mb3JtXCIpKXtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbmZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBsb2dpbkZvcm0pO1xyXG59XHJcbmZ1bmN0aW9uIGxvZ2luRm9ybShlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBlbWFpbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsLWxvZ1wiKS52YWx1ZTtcclxuICAgIHZhciBwYXNzd29yZD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInB3ZFwiKS52YWx1ZTtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpXHJcbiAgLnRoZW4oKHVzZXJDcmVkZW50aWFsKSA9PiB7XHJcbiAgICB2YXIgdWlkPXVzZXJDcmVkZW50aWFsLnVzZXIudWlkO1xyXG4gICAgY29uc29sZS5sb2codWlkKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcmNyZWRlbnRpYWxcIixKU09OLnN0cmluZ2lmeSh1c2VyQ3JlZGVudGlhbCkpO1xyXG4gICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoXCJSZWdpc3RyYXRpb24tRGF0YS9cIit1aWQpLm9uKFwidmFsdWVcIixmdW5jdGlvbihzbmFwc2hvdCl7XHJcbiAgICAgICAgIGxldCBVSWQ9c25hcHNob3QudmFsKCkuVUlkO1xyXG4gICAgICAgICBpZih1aWQ9PT1VSWQpe1xyXG4gICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcm5hbWU0NVwiLHNuYXBzaG90LnZhbCgpLm5hbWUpO1xyXG4gICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYoZW1haWwuaW5jbHVkZXMoXCJtYW5hZ2VyXCIpKVxyXG4gICAge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1cIi4vbWFuYWdlci5odG1sXCI7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWY9XCIuL3VzZXJzLmh0bWxcIjtcclxuICAgIH1cclxuICB9KVxyXG4gIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgIHZhciBlcnJvckNvZGUgPSBlcnJvci5jb2RlO1xyXG4gICAgdmFyIGVycm9yTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICBhbGVydChlcnJvck1lc3NhZ2UpO1xyXG4gIH0pO1xyXG59XHJcbmlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRldXNcIikpe1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRldXNcIikub25jbGljaz1mdW5jdGlvbiBnZXRMb2NhdGlvbigpe1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZXRMb2NcIikuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOlwic21vb3RoXCJ9KTtcclxuICB9XHJcbn1cclxuaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0dXMnKSl7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fib3V0dXMnKS5vbmNsaWNrPWZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1cIi4vYWJvdXR1cy5odG1sXCI7XHJcbiAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGFtYnVyZ2VyJykub25jbGljaz1mdW5jdGlvbigpe1xyXG4gIHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3cmFwaGVhZGVyXCIpO1xyXG4gIGlmICh4LmNsYXNzTmFtZSA9PT0gXCJ3cmFwcGVyX19oZWFkZXJcIikge1xyXG4gICAgeC5jbGFzc05hbWUgPSBcIndyYXBwZXJfX2hlYWRlcjFcIjtcclxuICB9XHJcbiAgLy8gfSBlbHNlIHtcclxuICAvLyAgIHguY2xhc3NOYW1lID0gXCJ3cmFwcGVyX19oZWFkZXJcIjtcclxuICAvLyB9XHJcbn1cclxuIiwidmFyIHRhYmxlRGF0YSA9IFtcclxuICAgICB7XHJcbiAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgdGltZVN0YW1wOltdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiAyLFxyXG4gICAgICAgIHRpbWVTdGFtcDpbXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogMyxcclxuICAgICAgICB0aW1lU3RhbXA6W11cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgdGltZVN0YW1wOltdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA1LFxyXG4gICAgICAgIHRpbWVTdGFtcDpbXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogNixcclxuICAgICAgICB0aW1lU3RhbXA6W11cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDcsXHJcbiAgICAgICAgdGltZVN0YW1wOltdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA4LFxyXG4gICAgICAgIHRpbWVTdGFtcDpbXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogOSxcclxuICAgICAgICB0aW1lU3RhbXA6W11cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDEwLFxyXG4gICAgICAgIHRpbWVTdGFtcDpbXVxyXG4gICAgfVxyXG5dO1xyXG5pZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJSZXN0YXVyYW50LVRhYmxlLURhdGFcIikpXHJcbmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiUmVzdGF1cmFudC1UYWJsZS1EYXRhXCIsSlNPTi5zdHJpbmdpZnkodGFibGVEYXRhKSk7XHJcbnZhciByZXNEYXRhPVtcclxuICAgIHtcclxuICAgICAgICBuYW1lOlwidmluZWV0aFwiLFxyXG4gICAgICAgICAgICB0YWJsZUlkOjEsXHJcbiAgICAgICAgICAgIGRhdGU6IFwiMjEtMDItMjAyMVwiLFxyXG4gICAgICAgICAgICB0aW1lOiBcIjEwOjAwIEFNXCIsXHJcbiAgICAgICAgICAgIHBlcnNvbnM6NCxcclxuICAgICAgICAgICAgdGltZVN0YW1wOm5ldyBEYXRlKClcclxuICAgIH1cclxuXVxyXG5pZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZXN0RGF0YVwiKSlcclxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJyZXN0RGF0YVwiLEpTT04uc3RyaW5naWZ5KHJlc0RhdGEpKTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=