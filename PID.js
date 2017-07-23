
 // ES6

 class PIDcontroller {

  constructor ({P = 1, I = 0, D = 0, dt = 1} = {}) {
    this.P = P;
    this.I = I;
    this.D = D;
    this.dt = dt;
    this.T = 0;
    this.ie = 0;
    this.pe=0;
    this.de=0;
    this.control_effort = 0;
    this.prev_error = 0;
  }

  control (state, setpoint, time) {
        this.pe = setpoint - state;
        this.de = (this.pe - this.prev_error) / (this.dt);
        this.ie = this.ie + (this.dt) * this.pe;
        var control = this.P * this.pe + this.I * this.ie + this.D * this.de;
        this.prev_error = this.pe;
        return control;
  }
}

export default PIDcontroller;