import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import DetailComponent from './DetailComponent';
// import { name, name2 } from './data.js';
// import시 export로 선언된 데이터들을 그대로 받아오면 된다

import { Link, Route, Switch } from 'react-router-dom';
// 리액트 라우터를 사용하기 위한 import

function App() {

  let [shoes, shoesChange] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">KimShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link ><Link to="/">Home</Link></Nav.Link>
              <Nav.Link ><Link to="/detail">Detail</Link></Nav.Link>
              {/* router 문법 중 link를 사용하여 이동을 할수 있음 a태그의 href처럼 to속성을 사용하면됨 */}
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
            <div className="row">
              {
                shoes.map((value, key)=>{
                  return <ShoesComponent key={key} shoes={value} idx={key} />
                })
              }
            </div>
          </div>
        </Route>
        <Route path="/detail/:id">
          {/* 무엇을 입력하든간에 /detail로 가주세요라는 의미 url 파라미터 문법임 */}
          <DetailComponent shoes={shoes} />
        </Route>
        {/* <Route path="/어쩌구" component={Modal}></Route> */}
              
        
        <Route path="/:id">
        {/* :id는 매개변수를 의미. */}
              <div>아무거나 적었을때 이거 보여주셈</div>
        </Route>
      </Switch>
      

    </div>
  );
}

function ShoesComponent(props) {
  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.idx + 1) + '.jpg' } width="100%" alt="신발이미지.jpg"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}$</p>
    </div>
  )
}



export default App;
