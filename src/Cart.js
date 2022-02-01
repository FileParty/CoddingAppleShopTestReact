import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

function Cart(props) {


    // useSelector : redux를 더 편하게 사용해보기
    let state = useSelector((state)=>state.reducer);
    // (state : redux에 있던 모든 state)
    // 위 구문은 reudx에 있는 모든 state를 state로 반환함
    //console.log(state);

    let dispatch = useDispatch();


    // store에 있는 데이터는 props형식으로 되었으므로..
    // console.log(props.state);

    let [transFlag, transFlagChg] = useState(false);

    return (
        <div>
            <Table responsive hover="true">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //props.state.map((value, key)=>{
                        state.map((value, key)=>{
                            return (
                                <tr key={key}>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.quan}</td>
                                    <td>
                                        <Button variant="outline-dark" onClick={()=>{ 
                                            //props.dispatch({ id : value.id, type : '수량증가', playload : {name:'kim'} });
                                            // 데이터 수정요청을 할땐 props.dispatch()
                                            dispatch({ id : value.id, type : '수량증가', playload : {name:'kim'} });
                                            // useDispatch()를 변수에 담아서 이렇게 사용할 수도 있음
                                        }}>
                                            add</Button>
                                        <Button variant="outline-dark" onClick={()=>{
                                            //props.dispatch({ id : value.id, type : '수량감소' });
                                            state.dispatch({ id : value.id, type : '수량감소' });
                                        }}>
                                            minus</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <CSSTransition in={transFlag} classNames="alertClose" timeout={500}>
            {
                //props.alertStat === true 
                state.alertStat === true 
                ? (<div className="my-alert2">
                    <p>지금 구매하시면 신규할인 20%!!!!!!!!!!</p>
                    <button onClick={() => { 
                        transFlagChg(true); 
                        //props.dispatch({type : "close"})}
                        state.dispatch({type : "close"})
                        } }>닫기</button>
                </div>)
                : <div></div>
            }
            </CSSTransition>
        </div>
    )
}

// 아래 함수는 store에 있는 state를 사용하기 위해 만든 함수
// store 데이터를 가져와서 props로 변환해주는 함수
// state(store에 있던 함수)를 지정한 속성으로 변환해서 리턴해줌
// function state를props화(state){
//     //console.log(state);
//     return {
//         state : state.reducer,
//         alertStat : state.reducer2
//     }
// }
// export default connect(state를props화)(Cart)
// redux를 사용하기 위한 세팅
// export default Cart;

// 총 정리하여 컴포넌트에서 store에 있는 state를 사용하기 위해서는
// 0. index.js에서 store 세팅
// 1. function 만들기
// 2. export default connect()()
// 3. store데이터를 props로 등록하기

// Redux 사용이유
// 1. 복잡한 props 전송이 필요없음 ex)comp/comp/comp... 맨 마지막 comp에 바로 전송이 가능하다
// 2. state데이터 관리 가능(100군대의 comp에서 store데이터를 동일하게 관리된다)

// redux 사실 소규모 프로젝트에서는 크게 필요가 없을 수 있지만..
// 대규모 사이트에서는 데이터 상태관리가 매우 매우 매우 중요해지므로 사용한다

// useSelector()으로 redux사용하기
export default Cart;