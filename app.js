const express = require("express");
const bodyParser = require("body-parser");
const {graphExpress, graphqlExpress} = require("apollo-server-express");
const {makeExecutableSchema} = require("graphql-tools");

const PORT = 8000;

const app = express();

//타입정의
const typeDef = `
   type Lang {
       id:Int,
       name:String!, 
   }
   type Query {
       getLangs(name:String):[Lang]
   }
`;
// 여기서 Lang은 graphQL의 스키마이고,
// Query는 스키마를 이용해 실제 데이터를 얻기위한 쿼리문을 말합니다.

//getLangs쿼리를 요청받으면 Lang스키마 형식으로 구성된 배열을 리턴

const langs = [
  {
    id: 0,
    name: "Node",
  },
  {
    id: 1,
    name: "Java",
  },
];
//위에서의 Lang은 추상화된 데이터 타입이 정의된 것이고,
//langs 에서는 구체화된 실제 데이터들입니다.

//해당하는 데이터를 반환하기 위한 함수 Resolver를 만들어주세요.
const resolvers = {
  Query: {
    getLangs: () => langs, //getLangs요청을 받으면 langs배열을 응답해줄 것입니다.
  },
};

//makeExecutableSchema활용법

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
//쉽게 타입Definition과 resolver를 넣어주는 것만으로도 스키마를 작성할 수 있습니다.
//여기까지가 기본적인 사용법입니다.

app.use("/graphql", bodyParser.json(), graphExpress({schema}));
//단일 endpoint이기 때문에 "/graphql"를 지정해주고 , Request의 데이터를 파싱하기 위해서 파디파서를 사용.
//graphExpress를 호출하고 스키마를 넣어줍니다.

app.use(
  "/graphiql",
  graphiqlExpress({
    endpoint: "/graphiql",
  })
);
//UI툴을 이용해 연습해볼 수 있다.

app.listen(PORT, () => console.log(`SERVER RUNNING AT ${PORT}`));
