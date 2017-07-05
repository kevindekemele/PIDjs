"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  }

  _createClass(PIDcontroller, [{
    key: "control",
    value: function control(state, setpoint) {
      var pe = setpoint - state;
      var de = 0;
      // derivative error
      if (this.T !== 0) {
        de = (pe - this.prev_error) / this.dt;
      }
      // integral error
      this.ie = this.ie + this.dt * pe;
      this.T = this.T + this.dt;
      this.prev_error = pe;

      var control = this.P * pe + this.I * this.ie + this.D * de;
      return control;
    }
  }]);

  return PIDcontroller;
}();

exports.default = PIDcontroller;