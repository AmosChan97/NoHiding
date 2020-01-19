import React from 'react';
import {Radar} from 'react-chartjs-2';

const backup =  {
	"realMac": "B8:27:EB:69:C1:9D",
	"Pi_SpoofedMac": "0A:00:27:5B:98:5C",
	"AP_name": "CC-03-AP04",
	"AP_bssid": "08:96:AD:91:8D:8E",
	"gateway_addr": "172.17.84.1",
	"google_ping_ms": "null",
	"DNS_ping_ms": "null",
	"gateway_ping_ms": "null",
	"HTTP_PING_ms": "HTTP/1.1 200 OK",
	"RSSI_dBm": "null",
	"Signal_in_percent": "null",
	"RF_hz": "5180",
	"authTime_sec": "null",
	"ping_date": "2020-01-07 01:48:39"
}

const radarData = (rawData = [], buttonState=[], apState=[]) => {
  let fiveHz = [], twoHz = [];
  rawData.forEach((val, index) => {
    if (val.RF_hz > 4000 && (buttonState[0] && val.AP_name === apState[0].AP_name) || (buttonState[1] && val.AP_name === apState[1].AP_name)) {
      fiveHz.push(val)
    } else if (val.RF_hz < 4000 && (buttonState[0] && val.AP_name === apState[0].AP_name) || (buttonState[1] && val.AP_name === apState[1].AP_name)) {
      twoHz.push(val)
    } 
  })
  let fiveData = fiveHz[0];
  let twoData = twoHz[0];
  if (fiveData === undefined) {
    fiveData = backup
  }
  if (twoData === undefined) {
    twoData = backup
  }

  return {
    labels: ['Google.com Avg Res/ms' ,'Google DNS Avg Res/ms', 'RSSI/dBm', 'Signal Quality/%', 'Gateway Avg Res/ms'],
    datasets: [
      {
        label: '5-GHz WiFi Band',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [fiveData.google_ping_ms, fiveData.DNS_ping_ms, fiveData.RSSI_dBm, fiveData.Signal_in_percent, fiveData.gateway_ping_ms]
      },
      {
        label: '2-4GHz Wifi Band',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [twoData.google_ping_ms, twoData.DNS_ping_ms, twoData.RSSI_dBm, twoData.Signal_in_percent, twoData.gateway_ping_ms]
      }
    ]
  };
} 

export const radarGraphMaker = (rawData = [], buttonState=[], apState=[]) => {
  if (rawData === undefined) {
    return (
      <div></div>
    )
  }
  const data = radarData(rawData, buttonState, apState);
  return (
    <div>
      <h5>Comparison between 5GHz and 2-4GHz WiFi Band</h5>
      <Radar data={data}
        height={400}
        width={400}
        options={
          {
            maintainAspectRatio: false
          }
        }
      />
    </div>
  );
}

export default radarGraphMaker;