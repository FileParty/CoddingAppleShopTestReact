import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
// styled-components 컴포넌트 가져오기

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
function DetailComponent(props) {

    let { id } = useParams(); // react router 5버전이상에서 사용가능한 훅, 변수명으로 파라미터명을 매칭시켜주면됨
    let history = useHistory(); // react-router-dom 5버전이상에서만 사용 가능한 훅(useHistory)
    // 방문기록 등을 저장해놓는 object
    let shoesDetail = props.shoes.find(function(shoes) {
        return shoes.id == id;
    });

    return (
        <div className="container">
            <박스>
                <제목 색상="red">상세페이지입니다.</제목>
                <제목 색상={"blue"}>상세페이지입니다.</제목>
            </박스>
            <div className="row">
                <div className="col-md-6">
                    <img src={shoesDetail.src} width="100%" alt="shoesimg.jpg" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{shoesDetail.title}</h4>
                    <p>{shoesDetail.content}</p>
                    <p>{shoesDetail.price}원</p>
                    <button className="btn btn-danger">주문하기</button> 
                    <button className="btn btn-danger" onClick={ ()=>{
                        //history.goBack(); // 뒤로가기(이전 페이지로 이동)
                        history.push("/"); // push 특정경로로 이동
                    } }>뒤로가기</button>
                </div>
            </div>
        </div>
    )
}
// 또한 외부 js 파일을 호출하기 위한 세팅또한 필요하다
export default DetailComponent;
