
import PID from '../../PID'

const dt    =   0.001;
const T     =   10;

let samples =   Math.floor(T/dt);


function f1(t, y,u) {
    return [y[1],
    -y[1]-y[0]+u];
}

function simulate(){

    let t       =   [];
    let y       =   [];
    let x       =   [];
    let c       =   [];
    let input   =   1;
    let state   =   [0,0];
    let P = Number($("#P").val());
    let I = Number($("#I").val());
    let D = Number($("#D").val());
    let  C = new PID({P:P, I:I, D:D,dt:dt});

    for(var i=0; i <samples;i++){
        t.push(i * dt);
        x.push(input);
        c = C.control(state[0], input, t[i]);
        y.push(numeric.dopri(0, dt, state, function(t,y){
        return f1(t,y,c)}, 1e-12, 1000).at(dt));
        state= y[i];
        console.log(state)
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
        },{
            data: x
        }]

    });
}

$('#startSim').on('click', function () {
    simulate();
})

$( document ).ready(function() {
    simulate();
});
