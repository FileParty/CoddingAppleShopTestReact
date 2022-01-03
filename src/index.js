import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
// 리액트 라우터를 사용하기 위한 세팅
// HashRouter을 사용하면 좀 더 안전하게 라우팅을 할 수 있다
// BrowserRouter는 서버에 요청을 해서 하고, HashRouter는 서버에 전송을 하지 않고 페이지 이동이 됨

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
