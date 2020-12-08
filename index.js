const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const {graphql, buildSchema} = require("graphql");

//1.쿼리생성 / hello라는 쿼리가 들어오면 문자열로 응답
const schema = buildSchema(`
input ProductInput {
    name:String
    price:Int
    description:String
}
type Product{
    id:ID!  
    name:String
    price:Int
    description:String
}
type Query{
    getProduct(id:ID!):Product
}
type Mutation{
    addProduct(input:ProductInput):Product
}
`);

//Product schema를 만들어주고 (!는 필수라는 의미)
//getProduct쿼리를 받으면 Product를 return해준다.

//임시데이터
const products = [
  {
    id: 1,
    name: "첫번째 제품",
    price: 2000,
    description: "첫번째 제품입니다...",
  },
  {
    id: 2,
    name: "두번째 제품",
    price: 4000,
    description: "두번째 제품입니다...",
  },
];

//getProduct쿼리 요청이 들어오면, product데이터중에 상품id와 들어온 id가 같은 제품정보를 반환
const root = {
  getProduct: ({id}) => products.find((product) => product.id === parseInt(id)),
  addProduct: ({input}) => {
    input.id = parseInt(products.length + 1);
    products.push(input);
    return root.getProduct({id: input.id});
  },
};

//express서버 생성
const app = express();

//graphql이라는 주소로 요청이들어오면 아래 조건들을 실행
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //gui를 제공해준다.
  })
);

app.listen(4000, () => {
  console.log("서버는 4000번포트 구동중");
});
