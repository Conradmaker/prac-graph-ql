//데이터구조(쿼리)를 작성
const {graphql, buildSchema} = require("graphql");

//hello라는 쿼리가 들어오면 문자열로 응답
const schema = buildSchema(`
type Query{
    hello:String,  
    nodejs:Int
}`);

const root = {
  hello: () => "helloWorld",
};
graphql(schema, "{hello}", root).then((response) => {
  console.log(response);
});
