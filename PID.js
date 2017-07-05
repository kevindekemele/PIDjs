
export default class PIDcontroller {
  constructor ({P = 1, I = 0, D = 0, dt = 1} = {}) {
    this.P = P
    this.I = I
    this.D = D
    this.dt = dt
    this.T = 0
  }

  control (state, setpoint) {
    var pe = setpoint - state
    var de = 0
    // derivative error
    if (this.T !== 0) {
      de = (pe - this.prev_error) / (this.dt)
    }
    // integral error
    this.ie = this.ie + (this.dt) * pe
    this.T = this.T + this.dt
    this.prev_error = pe

    var control = this.P * pe + this.I * this.ie + this.D * de
    return control
  }
}
