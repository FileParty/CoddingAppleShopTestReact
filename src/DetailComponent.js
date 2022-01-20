import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
// styled-components 컴포넌트 가져오기
import './Detail.scss';
// css파일 import 해오는 법

import {재고context} from './App.js';

import { CSSTransition } from 'react-transition-group';
// react-transition-group 라이브러리 import

let 박스 = styled.div`
    padding: 20px;
`;
let 제목 = styled.h4`
    font-size : 25px;
    color : ${ props => props.색상 }
`;
// 백틱. 자바스크립트에서 텍스트를 입력할 수 있는 기호
// css를 미리 입혀놓은 컴포넌트라고 보면 됨
// ${}는 자바스크립트 문법으로 ``(백틱)안에서 변수나 함수를 자유롭게 사용할 수 있음 

// react 컴포넌트를 외부 파일에서 작성하기 위해, 외부 파일에서 react를 import로 호출해야한다
// 이처럼 다른 파일에 컴포넌트를 만드는 것을 모듈화라고 한다



// Lifecycle Hook(구버전)
// class Detail2 extends React.Component {
//     // Detail2 컴포넌트가 실행이 되기전에 실행
//     componentDidMount() {
//         // ex) ajax같은걸 여기서 요청을 할 수도 있다!
//     }

//     // 컴포넌트가 Unmount(사라지기전)에 실행
//     componentWillUnmount() {

//     }
// }


function DetailComponent(props) {

    let [alertState, alertStateChg ] = useState(true);
    let [inData, inDataChg] = useState("");

    // context 가져오기
    let 재고 = useContext(재고context);

    // tab state
    let [누른탭, 누른탭변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);

    // 최신버전 hook useEffect
    useEffect(()=>{
        // detail컴포넌트가 호출될때 ajax요청 처리
        //axios.get();
        // 또한 이런것들은 최초 호출시에만 사용되어야하므로 useEffect 매개변수에 []을 넣어주자..


        // 컴포넌트가 mount(실행) 되었을때
        // 컴포넌트가 update 될 때
        // 특정 코드를 실행할 수 있음
       // console.log("와! 샌즈! 파피루스! WA!!!!!!!!!!!!!!!!");
        // 2초뒤에 죽는 alert창만들기(숙제)
        let times = setTimeout(()=>{
            // 방법1 html을 날린다
            //document.getElementsByClassName("my-alert2")[0].outerHTML = null;
            // 방법2 css display를 none처리한다
            //document.getElementsByClassName("my-alert2")[0].style.display = "none";
            // 해답편
            alertStateChg(false);
        }, 3000);
        // setTimeout 같은경우는 뒤로가기 후 재진입시 오류가 발생할 수 있으므로.. return삭제해줘야한다

        // 해당 컴포넌트가 삭제될때 코드를 실행할 수 있는 방법
        return function detailUnMount() {
            // ()=>{}로도 대체가능
            console.log("끼요르힝힝");
            clearTimeout(times); // setTimeout을 제거하는 방법
        }
    },[alertState]); // useEffect가 실행되는 조건을 설정할 수 있다. 이 구문의 의미는 alertState라는 스테이트가 업데이트될떄만 실행되주세요 라는 조건
    // useEffect는 여러번 선언해도 괜찮지만, 윗순서부터 실행됨
    // useEffect(()=>{
    //     //console.log("우효ww");
    // },[inData])
    useEffect(()=>{
        console.log("로드시 단 한번!");
    },[]) // 이렇게 매개변수를 공백으로 두면, 페이지가 실행될때만 딱 한번 실행됨

    let { id } = useParams(); // react router 5버전이상에서 사용가능한 훅, 변수명으로 파라미터명을 매칭시켜주면됨
    let history = useHistory(); // react-router-dom 5버전이상에서만 사용 가능한 훅(useHistory)
    // 방문기록 등을 저장해놓는 object
    let shoesDetail = props.shoes.find(function(shoes) {
        return shoes.id == id;
    });

    return (
        <div className="container">
            <박스>
                <제목 className="red" 색상={"blue"}>상세페이지입니다.</제목>
            </박스>

            <input onInput={(e)=>{inDataChg(e.target.value)}}/>
            {inData}
            {
                alertState === true
                ? (<div className="my-alert">
                        <p>재고가 얼마 남지 않았습니다! 품절임박!</p>
                    </div>)
                : null
            }
            
            <div className="row">
                <div className="col-md-6">
                    <img src={ 'https://codingapple1.github.io/shop/shoes' + (shoesDetail.id + 1) + '.jpg' } width="100%" alt="shoesimg.jpg" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{shoesDetail.title}</h4>
                    <p>{shoesDetail.content}</p>
                    <p>{shoesDetail.price}원</p>
                    <Info 재고={props.재고}></Info>
                    <button className="btn btn-danger" onClick={ ()=>{
                        let itemCount = [...props.재고];
                        itemCount[0] = itemCount[0] - 1;
                        props.재고변경(itemCount);
                    }}>주문하기</button> 
                    <button className="btn btn-danger" onClick={ ()=>{
                        //history.goBack(); // 뒤로가기(이전 페이지로 이동)
                        history.push("/"); // push 특정경로로 이동
                    } }>뒤로가기</button>
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0); }}>탭1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1) }}>탭2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{ 스위치변경(false); 누른탭변경(2) }}>탭3</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <CSSTransition in={스위치} classNames="wow" timeout={500}>
                {/* in: 애니메이션 동작스위치 classNames:동작할 애니메이션 class명 timeout : 애니메이션 지속시간 
                    in에 원할떄 스위치를 켜면 된다
                */}
                <TabContnet 누른탭={누른탭} 스위치변경={스위치변경} />
            </CSSTransition>

        </div>
    )
}

function TabContnet(props) {

    useEffect(()=>{
        props.스위치변경(true);
    });

   if(props.누른탭 == 0) {
       return <div>0번쨰 내용입니다.</div>
   } else if(props.누른탭 == 1) {
       return <div>1번쨰 내용입니다.</div>
   } else if(props.누른탭 == 2) {
       return <div>2번쨰 내용입니다.</div>
   }
}

function Info(props) {
    return (
      <p>재고 : {props.재고[0]}</p>
    )
  }


// 또한 외부 js 파일을 호출하기 위한 세팅또한 필요하다
export default DetailComponent;
