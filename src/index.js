import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {VideoContextProvider} from './Store/VideoContext'
import miragejs from './Api/mock.server'

miragejs()
ReactDOM.render(
  <React.StrictMode>
    <VideoContextProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </VideoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
