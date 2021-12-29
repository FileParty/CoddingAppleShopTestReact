import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
// import { name, name2 } from './data.js';
// import시 export로 선언된 데이터들을 그대로 받아오면 된다

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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
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
              return <ShoesComponent key={key} shoes={value} />
            })
          }
        </div>
      </div>
    </div>
  );
}

function ShoesComponent(props) {
  console.log(props);
  return (
    <div className="col-md-4">
      <img src={props.shoes.src} width="100%" alt="신발이미지.jpg"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}$</p>
    </div>
  )
}

export default App;
