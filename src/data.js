// var name = "Kim";
// var name2 = "Park";

// export {name, name2 }
// 만약 두개의 변수라면, 오브젝트형식으로 export를 해주면 된다

export default [
    {
        id : 0,
        title : "White and Black",
        content : "Born in France",
        price : 120000,
        src : "https://codingapple1.github.io/shop/shoes1.jpg"
    },
    
    {
        id : 1,
        title : "Red Knit",
        content : "Born in Seoul",
        price : 110000,
        src : "https://codingapple1.github.io/shop/shoes2.jpg"
    },
    
    {
        id : 2,
        title : "Grey Yordan",
        content : "Born in the States",
        price : 130000,
        src : "https://codingapple1.github.io/shop/shoes3.jpg"
    }
]

// import export 문법
// export는 특정한 파일을 다른 파일에서 사용할 수 있도록 해주는 세팅법(import와 세트..?)
// export default는 파일당 단 한번만, 보통 페이지 가장 마지막에 사용