import React from 'react';
import { Line } from 'react-chartjs-2';

/**
 * Sample line chart settings from http://jerairrest.github.io/react-chartjs-2/
 * @param {array<string>} labels 
 * @param {array<T>} data 
 * @param {string} label 
 */
 const lineData = (labels = [] , data = [], label = "sample data") => {

  if (labels.length === 0) {
    labels = [1,2,3,4,5]
  }
  if (data.length === 0) {
    data = [0,0,0,0,0]
  }
  return {
    labels: labels,
    datasets: [
      {
        label: label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      }
    ]
  }
};

const lineAuthGraph = (rawData = [], label = '', buttonState = [], apState=[]) => {
  let count = 0;
  let real_ping_date=[]
  let real_auth_time=[]
  let ping_date = rawData.map((val, index) => { 
    if((buttonState[0] && val.AP_name === apState[0].AP_name) || (buttonState[1] && val.AP_name === apState[1].AP_name)) {
      real_ping_date.push(++count);
      return count;
    }
  })
  let auth_time = rawData.map((val) => {
    if((buttonState[0] && val.AP_name === apState[0].AP_name) || (buttonState[1] && val.AP_name === apState[1].AP_name)) {
      real_auth_time.push(val.RSSI_dBm);
      return val.RSSI_dBm;
    }
  })
  let data = lineData(real_ping_date, real_auth_time, label)
const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'dBm'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Test Rounds'
      }
    }],
  }     
}
  return (
    <div>
    <h5>RSSI</h5>
      <Line data={data}
        width={400}
        height={300}
        options={options}
      />
    </div>
  );
}

export { lineAuthGraph };