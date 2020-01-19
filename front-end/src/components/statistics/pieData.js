import React from 'react';
import { Pie } from 'react-chartjs-2';

/**
 * Sample pie chart settings from http://jerairrest.github.io/react-chartjs-2/
 * @param {string<array>} rawData of response status from remote sensor
 */
const pieData = (rawData = [], buttonState=[], apState = []) => {
  let total = 0;
  let okRes = 0;
  rawData.map((val, index) => {
    if ((buttonState[0] && val.AP_name === apState[0].AP_name) || (buttonState[1] && val.AP_name === apState[1].AP_name)) {
      total++;
      if (val.HTTP_PING_ms === 'HTTP/1.1 200 OK') 
        okRes++;
    }
    return val;
  })
  let pieData = [
    okRes,
    (total - okRes)
  ]
  return {
    labels: [
      'Response OK',
      'Response Bad'
    ],
    datasets: [{
      data: pieData,
      backgroundColor: [
      '#00AA00',
      '#FF000',
      ],
      hoverBackgroundColor: [
      '#00FF00',
      '#FF000'
      ]
    }]
  }
}

export const pieComponentMaker = (allData = [], buttonState=[], apState = []) => {
  // let responseData = allData.map((val) => {
  //   if((buttonState[0] && val.AP_name === apState[0].AP_name) || (buttonState[1] && val.AP_name === apState[1].AP_name))
  //     return val.HTTP_PING_ms;
  // })
  const data = pieData(allData, buttonState, apState);
  return (
    <div className="center">
      <h5>Google HTTP response</h5>
      <Pie data={data} 
        height={300}
        widht={300}
        options={{
          maintainAspectRatio: false,
          responsive: true
        }}
      />
    </div>
  );
}

export default pieComponentMaker;