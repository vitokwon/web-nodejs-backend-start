// express로 작업 (사용자 입력 데이터 서버 파일에 저장하기)
const fs = require("fs"); // nodeJS 내장 패키지 (file system)
const path = require("path"); // 모든 운영체제에서 경로 설정 작동
const express = require("express");

//express 패키지 사용
const app = express(); 
app.use(express.urlencoded({ extended: false }));

// app.get('/currenttime') // localhost:3000/currenttime
app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

app.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>'
  );
}); // localhost:3000/

app.post("/store-user", function (req, res) {
  // 입력받은 값 (유저 네임)
  const userName = req.body.username; 

  // 모든 운영체제에 적용되는 파일경로작성
  const filePath = path.join(__dirname, "data", "users.json"); 

  // 데이터를 쓰기 전, 파일을 먼저 읽어야 함 (원시 텍스트)
  const fileData = fs.readFileSync(filePath); 

  // 원시 데이터(텍스트)를 자바 배열이나 객체로 변환
  // JSON 객체는 두가지 메서드(parse,stringfy)
  // parse는 JSON형식의 데이터가 포함된 일부 텍스트를 자바 배열,객체로 변환
  const existingUsers = JSON.parse(fileData) // 작업할 수 있는 자바데이터(배열)로 변환


  // push 메서드는 자바스크립트 모든 배열 호출, 새로운 항목 추가함.
  // userName을 추가 후 existingUsers 업데이트함.
  existingUsers.push(userName) 
  
  // const(상수)를 사용해도 괜찮은 이유?
  // 메모리 기본 값을 변경하지만 existingUsers에 새로운 값을 할당하지 않음.
  // 다시 사용하는 경우(등호연산자) 새로운 값을 할당하게 됨
  // ex) exsitingUsres = [somthing]

  // 데이터 쓰기, 자바데이터를 원시데이터(JSON포멧)로 다시 변환 필요함.
  fs.writeFileSync(filePath, JSON.stringify(existingUsers))

  res.send("<h1>Username stroed!</h1>");
});

app.listen(3000);

// // express로 작업 (사용자 입력 데이터 출력)
// const express = require("express");

// const app = express();

// app.use(express.urlencoded({extended: false}));

// // app.get('/currenttime') // localhost:3000/currenttime
// app.get("/currenttime", function (req, res) {
//   res.send("<h1>" + new Date().toISOString() + "</h1>");
// }); // localhost:3000/currenttime

// app.get("/", function (req, res) {
//   res.send(
//     '<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>'
//   );
// }); // localhost:3000/

// app.post("/store-user", function (req, res) {
//     const userName = req.body.username;
//     console.log(userName)
//     res.send('<h1>Username stroed!</h1>')
// });

// app.listen(3000);

// // express로 작업
// const express = require("express");

// const app = express();

// // app.get('/currenttime') // localhost:3000/currenttime
// app.get("/currenttime", function (req, res) {
//   res.send("<h1>" + new Date().toISOString() + "</h1>");
// }); // localhost:3000/currenttime

// app.get('/',function(req, res) {
//     res.send('<h1>Hello World</h1>')
// }) // localhost:3000/

// app.listen(3000);

// nodeJS 작업 (row level)
// const http = required('http');

// function handleRequest(request, response) {
//   if (request.url === "/currenttime") {
//     response.statusCode = 200;
//     response.end("<h1>" + new Date().toISOString() + "</h1>");
//   } else if (request.url === "/") {
//     response.statusCode = 200;
//     response.end("<h1>Hello World</h1>");
//   }
// }

// const server = http.createServer(handleRequest);

// server.listen(3000); // 3000은 로컬개발용
// // amazon.com => Send a request to Amazon's server
// // amazon.com:80 , 433 은 디폴트 포트 넘버