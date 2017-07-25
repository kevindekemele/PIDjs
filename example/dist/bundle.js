/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _PID = __webpack_require__(1);

var _PID2 = _interopRequireDefault(_PID);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dt = 0.005;
var T = 10;

var samples = Math.floor(T / dt);

function f1(t, y, u) {
    return [y[1], -y[1] - y[0] + u];
}

function simulate() {

    var t = [];
    var y = [];
    var x = [];
    var c = [];
    var input = 1;
    var state = [0, 0];
    var P = Number($("#P").val());
    var I = Number($("#I").val());
    var D = Number($("#D").val());
    var C = new _PID2.default({ P: P, I: I, D: D, dt: dt });

    for (var i = 0; i < samples; i++) {
        t.push(i * dt);
        x.push(input);
        c = C.control(state[0], input, t[i]);
        y.push(numeric.dopri(0, dt, state, function (t, y) {
            return f1(t, y, c);
        }, 1e-12, 1000).at(dt));
        state = y[i];
        console.log(state);
    }

    Highcharts.chart('chart-output', {

        title: {
            text: 'System output'
        },

        yAxis: {
            title: {
                text: 'Output'
            }
        },
        xAxis: {
            title: {
                text: 'Time [s]'
            },
            categories: t
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        series: [{
            data: numeric.transpose(y)[0]
        }, {
            data: x
        }]

    });
}

$('#startSim').on('click', function () {
    simulate();
});

$(document).ready(function () {
    simulate();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ES6

var PIDcontroller = function () {
  function PIDcontroller() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$P = _ref.P,
        P = _ref$P === undefined ? 1 : _ref$P,
        _ref$I = _ref.I,
        I = _ref$I === undefined ? 0 : _ref$I,
        _ref$D = _ref.D,
        D = _ref$D === undefined ? 0 : _ref$D,
        _ref$dt = _ref.dt,
        dt = _ref$dt === undefined ? 1 : _ref$dt;

    _classCallCheck(this, PIDcontroller);

    this.P = P;
    this.I = I;
    this.D = D;
    this.dt = dt;
    this.T = 0;
    this.ie = 0;
    this.pe = 0;
    this.de = 0;
    this.control_effort = 0;
    this.prev_error = 0;
  }

  _createClass(PIDcontroller, [{
    key: "control",
    value: function control(state, setpoint, time) {
      this.pe = setpoint - state;
      this.de = (this.pe - this.prev_error) / this.dt;
      this.ie = this.ie + this.dt * this.pe;
      var control = this.P * this.pe + this.I * this.ie + this.D * this.de;
      this.prev_error = this.pe;
      return control;
    }
  }]);

  return PIDcontroller;
}();

exports.default = PIDcontroller;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map