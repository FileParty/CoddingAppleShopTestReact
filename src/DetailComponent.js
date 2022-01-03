import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// react 컴포넌트를 외부 파일에서 작성하기 위해, 외부 파일에서 react를 import로 호출해야한다
// 이처럼 다른 파일에 컴포넌트를 만드는 것을 모듈화라고 한다
function DetailComponent(props) {

    let history = useHistory(); // react-router-dom 5버전이상에서만 사용 가능한 훅(useHistory)
    // 방문기록 등을 저장해놓는 object

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">상품명</h4>
                    <p>상품설명</p>
                    <p>120000원</p>
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
