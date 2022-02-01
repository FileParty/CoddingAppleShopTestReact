import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
// 리액트 라우터를 사용하기 위한 세팅
// HashRouter을 사용하면 좀 더 안전하게 라우팅을 할 수 있다
// BrowserRouter는 서버에 요청을 해서 하고, HashRouter는 서버에 전송을 하지 않고 페이지 이동이 됨

import {Provider} from 'react-redux';
import { combineReducers, createStore } from 'redux';
// react-redux로 Provider를 호출해서
// contextAPI처럼 해당 태그로 감싸져있는 부분에 데이터공유를 이룰 수 있다.
// App태그를 감쌌으므로 앱전체에서 데이터 공유를 할 수 있다.
let defaultState = [
  { id:0,name:'White and Black', quan:2 },
    { id:11,name:'멋진모자', quan:1 },
    { id:12,name:'멋진바지', quan:10 },
    { id:13,name:'멋진양말', quan:255 },
    { id:14,name:'멋진셔츠', quan:0 },
    { id:15,name:'멋진패딩', quan:5 }
];
let alertState = true;
// redux에선 state 데이터의 수정방법을 미리 정의합니다...
function reducer(state = defaultState, 액션) {
  //console.log(액션);
  if ( 액션.type === '항목추가' ) {
    let copy = [...state];
    let found = state.findIndex((a)=>{return a.id === 액션.payload.id});
    if(found >= 0) {
      copy[found].quan += parseInt(액션.payload.quan);
    } else {
      copy.push(액션.payload);
    }
    // let copy = [...state];
    // let cloneChk = true;
    // copy.map((obj)=>{
    //   if(obj.id == 액션.payload.id) {
    //     obj.quan++;
    //     cloneChk = false;
    //   }
    // })
    // if(cloneChk) copy.push(액션.payload);
    console.log(copy);
    return copy;
  }
  else if( 액션.type === '수량증가' ) {
    // dispatch를 할떄 실어보낸 데이터를 받아보자
    console.log(액션.payload);
    // store 데이터를 변경하는 방법 정의
    let copyState = [...state];
    copyState[액션.id].quan++;
    return copyState;
  } 
  else if( 액션.type === '수량감소' ) {
    let copy = [...state];
    copy[액션.id].quan--;
    if(copy[액션.id].quan < 0) copy[액션.id].quan = 0;
    return copy;
  } 
  else {
    return state;
  }
}
// reducer 셋팅법
// reducer는 항상 state를 return해야한다(수정된 state)
// state = defaultState 이 문법은 state에 값이 없다면 defaultState를 초기값으로 지정해라 라는 의미
// if문으로 특정 조건일때에만 수정된 state를 return한다

function reducer2(state = true, action) {
  //console.log(action);
  if(action.type === "close") {
    state = false;
  }
  return state;
}

let store = createStore(combineReducers({reducer, reducer2}));
// store라는 이름으로 store를 생성한다
// combinReducers는 다수의 reducer들을 등록해줄 수 있다

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
