import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Spinner } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import DetailComponent from './DetailComponent';
// import { name, name2 } from './data.js';
// import시 export로 선언된 데이터들을 그대로 받아오면 된다

import { Link, Route, Switch } from 'react-router-dom';
// 리액트 라우터를 사용하기 위한 import

import axios from 'axios';
// axios 라이브러리 import

export let 재고context = React.createContext();
// context만들기
// 1. React.createContext()로 범위생성
// 2. 같은 값을 공유할 HTML을 범위로 싸매기
// # export로 외부파일에서 import를 할 수 있도록 만들 수 있다

function App() {

  let [shoes, shoesChange] = useState(Data);
  let [loading, loadingState] = useState(false);
  let [재고, 재고변경] = useState([10,11,12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">KimShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link } to="/">Home</Nav.Link>
              <Nav.Link as={Link } to="/detail">Detail</Nav.Link>
              {/* router 문법 중 link를 사용하여 이동을 할수 있음 a태그의 href처럼 to속성을 사용하면됨 */}
              {/* as를 사용해 변수값에 들어온 태그명처럼 사용할 수 있음 */}
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* 스위치를 사용하면 path들이 중복 매칭이 되지 않도록 함. 만약 중복이 되면 그 중 가장 근접한 것만 보여줌 */}
      <Switch>
        {/* 라우팅 하는법 *exact 속성을 걸면 path에 정확히 일치해야만 보여준다. 걸지않으면 LIKE건것처럼 매칭이 되면 다 보임 */}
        <Route exact path="/">
          <Container>
            <div className="main_css">
              {/* src에 넣은 이미지 : 파일명 변경 + 압축됨
              public에 넣은 파일은 원본 그대로 이며 가져오는 방식이 다름
              절대경로/파일명.확장자 형식으로 가져와야함 */}
              <h1>20% Season Off</h1>
              
              </div>
          </Container>
          {/* 부트스트랩을 이렇게 className으로도 사용할 수 있다
            단, 이런 방식으로 사용하기 위해서는 index.html에서 부트스트랩 link태그를 넣어야함 */}
          <div className="container">

            <재고context.Provider value={재고}>
            {/* 값을 공유를 원하는 html들을 context태그로 감싸기 value에는 공유를 원하는 값을 넣기 */}
            <div className="row">
              {
                shoes.map((value, key)=>{
                  return <ShoesComponent key={key} shoes={value} idx={key} />
                })
              }
              {
                loading == true
                ? (<LoadingComponent loading={loading} ></LoadingComponent>)
                : null
              }
            </div>
            </재고context.Provider>

            <button className="btn btn-primary" onClick={()=>{ 

              // post방식으로 전달하는 방법
              //axios.post('서버URL', {id : 'test01', pw : 1234});

              //로딩중이라는 ui 띄우기
              loadingState(true);
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{
                  // 로딩중 ui 삭제
                  loadingState(false);
                  console.log("axios 미션 성공!");
                  shoesChange([...shoes, ...result.data]);
                  // 새로운 js 문법 [...객체, ...합칠객체]로 하나의 리스트객체로 변환이 가능하다. 
                })
                .catch(()=>{
                  // 로딩중 ui 삭제2
                  loadingState(false);
                  console.log("axios 미션 실패");
                });
              // .then() : ajax가 요청 성공시 처리할 코드
              // .catch() : ajax가 요청 실패시 처리할 코드

            }}>더보기</button>

          </div>
        </Route>
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
          {/* 무엇을 입력하든간에 /detail로 가주세요라는 의미 url 파라미터 문법임 */}
          <DetailComponent shoes={shoes} 재고={재고} 재고변경={재고변경}/>
          </재고context.Provider>
        </Route>
        {/* <Route path="/어쩌구" component={Modal}></Route> */}
              
        
        <Route path="/:id">
        {/* :id는 매개변수를 의미. */}
              <div>아무거나 적었을때 이거 보여주셈</div>
        </Route>
      </Switch>
      { 
      }
    </div>
  );
}

function ShoesComponent(props) {

  let 재고 = useContext(재고context);

  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.shoes.id + 1) + '.jpg' } width="100%" alt="신발이미지.jpg"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}$</p>
      <Test></Test>
    </div>
  )
}

function Test() {
  let 재고2 = useContext(재고context);
  return <p>{재고2[0]}</p>
}

function LoadingComponent(props) {
  return (
    <div className="loading_div">
      <Spinner animation="border" variant="primary" />
    </div>
  )
}



export default App;
