
export default class PIDcontroller{

  constructor({P = 1, I= 0, D = 0, dt = 1, ARW = true} = {}) {

    this.P = P; 
    this.I = I;
    this.D = D;
    this.setpoint = setpoint;
    this.ARW = ARW;
    this.dt = dt;
    this.T = 0;
    this.upperbound = NaN;
    this.lowerbound = NaN;
  }

  control(state,setpoint){
    var error = setpoint-state;
    var de;
    // derivative error
    if(this.T !== 0){
      d_e = (error - this.prev_error)/(this.dt);
    }
    else{
      d_e = 0;
    }
    //integral error
    this.i_e = this.i_e + (this.dt)*error;
    this.T = this.T+this.dt;
    this.prev_error = error;

    var control = P*p_e + I*i_e + D*d_e;

    if((this.upper_bound&& this.lower_bound)&& I !=0 && this.ARW){
     if(control > this.upper_bound){
      control = this.upper_bound;
      }
      else if(control < this.lower_bound){
      control = lower_bound;
      }
      this.ie = (control - (P*p_e  + D*d_e))/I;  // Clipped, so integral term needs to be adjusted
    }
  return control;
}

  setLowerBound(lowerbound){
    this.lowerbound = lowerbound;
  }

  setUpperBound(upperbound){
    this.upperbound = upperbound;
  }

  setBounds(lowerbound,upperbound){
    this.lowerbound = lowerbound;
    this.upperbound = upperbound;
  }
}