import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  datasets: [{
      label: '5GHz',
      type:'line',
      data: [51, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    },{
      type: 'line',
      label: '2-4Ghz',
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      borderColor: '#71B37C',
      backgroundColor: '#71B37C',
      pointBorderColor: '#71B37C',
      pointBackgroundColor: '#71B37C',
      pointHoverBackgroundColor: '#71B37C',
      pointHoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    }]
};

const options = {
  responsive: true,
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: true
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: true,
          labelString: ""
        },
        labels: {
          show: true
        }
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ]
  }
};

const plugins = [{
    afterDraw: (chartInstance, easing) => {
        const ctx = chartInstance.chart.ctx;
        ctx.fillText("", 100, 100);
    }
}];

const mixgraph = () => {
  return (
    <div>
      <h5>Google DNS Response</h5>
      <Line
        data={data}
        options={options}
        plugins={plugins}
      />
    </div>
  )
}


export default mixgraph;