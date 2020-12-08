const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const {graphql, buildSchema} = require("graphql");

//1.쿼리생성 / hello라는 쿼리가 들어오면 문자열로 응답
const schema = buildSchema(`
type Query{
    hello:String,  
    nodejs:Int
}`);

const root = {
  hello: () => "helloWorld",
  nodejs: () => 20,
};
graphql(schema, "{hello}", root).then((response) => {
  console.log(response);
});

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
