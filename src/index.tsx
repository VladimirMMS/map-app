import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1IjoidmxhZGltaXIyMDAxIiwiYSI6ImNsNXNrMThseTJic2EzanBpM3h2OGVsZDUifQ.ZLVhAaoTnxkoOgfdb8xrCg';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if(!navigator.geolocation) {
  alert('You Browser Doesnt have geolocation')
  throw new Error("You Browser Doesnt have geolocation");

}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


