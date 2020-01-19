import React from 'react';
import { Bar } from 'react-chartjs-2';

/**
 * Sample pie chart settings from http://jerairrest.github.io/react-chartjs-2/
 * @param {string<object>} rawData of response data from a SQL database
 */
const barData = (rawData = [], buttonState = [], apState = []) => {
  let count = 0;
  let real_dataLabel = [];
  let dataLabel = rawData.map((val, index) => {
    if((buttonState[0] && val.AP_name === apState[0].AP_name) || (buttonState[1] && val.AP_name === apState[1].AP_name)) {
      real_dataLabel.push(++count);
      return count;
    }
  })
  let real_gateway_ping_ms = [];
  let pingData = rawData.map((val, index) => {
    if((buttonState[0] && val.AP_name === apState[0].AP_name) || (buttonState[1] && val.AP_name === apState[1].AP_name)) {
      real_gateway_ping_ms.push(val.gateway_ping_ms);
      return val.gateway_ping_ms;
    }
    
  })
  if (real_gateway_ping_ms.length === 0) {
    real_gateway_ping_ms = [0,0,0,0,0];
  }
  if (real_dataLabel.length === 0) {
    real_dataLabel = [1,2,3,4,5];
  }
  console.log("Gateway ping", real_gateway_ping_ms);
  console.log("datalabel ping", dataLabel);
  return {
    labels: real_dataLabel,
    datasets: [
      {
        label: 'Gateway Response Time',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: real_gateway_ping_ms
      }
    ]
  }
}

export const barGraphMaker = (allData = [], buttonState=[], apState=[]) => {
  const data = barData(allData, buttonState, apState);
const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Time in milliseconds'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Test rounds'
      }
    }],
  }     
}

  return (
    <div>
      <h5>Gateway Response Statistics</h5>
      <Bar
        data={data}
        height={400}
        width={400}
        options={options}
      />
    </div>
  );
}

export default barGraphMaker;