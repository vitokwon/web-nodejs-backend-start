# 백엔드 개발 시작

## nodeJS
 - 다운로드 및 설치
 - 서버 생성 (low level)
 ```javaScript
 //nodeJS 작업 (row level)
const http = required('http');

function handleRequest(request, response) {
  if (request.url === "/currenttime") {
    response.statusCode = 200;
    response.end("<h1>" + new Date().toISOString() + "</h1>");
  } else if (request.url === "/") {
    response.statusCode = 200;
    response.end("<h1>Hello World</h1>");
  }
}

const server = http.createServer(handleRequest);

server.listen(3000); // 3000은 로컬개발용
// amazon.com => Send a request to Amazon's server
// amazon.com:80 , 433 은 디폴트 포트 넘버
```

## express & nodemon
- express 설치 (nodeJS 사용 편의성 향상)
1. npm init 
2. package.json 추가됨
3. npm install express // npm 홈페이지에 많은 패키지 있음
4. node_modules 폴더 생성됨 // 모든 패키지가 여기에 저장
5. npm install // 타 프로젝트 받았을 때 필요 패키지(package.json명시) 다운가능
- nodemon 설치(서버자동재시작)
```javascript
1. npm install nodemon
2. package.json에서 script에 내용 추가
3. "scripts": {
    "start": "nodemon app.js"
    },
```

## express 작업
- 필요 객체 및 form 생성
```javascript
const fs = require("fs"); // nodeJS 내장 패키지 (file system)
const path = require("path"); // 모든 운영체제에서 경로 설정 작동
const express = require("express"); // express 객체생성

// express 패키지사용
const app = express();

// express 미들웨어 사용 (HTTP POST 요청에서 URL파싱)
app.use(express.urlencoded({ extended: false }));

// app.get('/currenttime')
// HTTP GET URL파싱 (localhost:3000/currenttime)
app.get("/currenttime", function (req, res) {
  // 서버 응답 생성
  // send 메서드로 응답 (시간 생성)
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});

// app.get('/')
// HTTP GET URL파싱 (localhost:3000/)
app.get("/", function (req, res) {
  // 서버 응답 생성
  // send 메서드로 응답 (form 생성)
  res.send(
    '<form action="/store-user" method="POST"><label>Your Name : </label><input type="text" name="username"><button>Submit</button></form>'
  );
}); // localhost:3000/
```
- 폼 데이터 저장
```javascript
// app.post("/store-user")
// HTTP POST URL파싱 (localhost:3000/store-user)
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
  const existingUsers = JSON.parse(fileData); // 작업할 수 있는 자바데이터(배열)로 변환

  // push 메서드는 자바스크립트 모든 배열 호출, 새로운 항목 추가함.
  // userName을 추가 후 existingUsers 업데이트함.
  existingUsers.push(userName);

  // const(상수)를 사용해도 괜찮은 이유?
  // 메모리 기본 값을 변경하지만 existingUsers에 새로운 값을 할당하지 않음.
  // 다시 사용하는 경우(등호연산자) 새로운 값을 할당하게 됨
  // ex) exsitingUsres = [somthing]

  // 데이터 쓰기, 자바데이터를 원시데이터(JSON포멧)로 다시 변환 필요함.
  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send("<h1>Username stroed!</h1>");
});
```

- 데이터 조회 및 조회 데이터 포함 응답
```javascript
// 데이터 조회 후, 조회한 데이터를 응답으로 보내기
app.get("/users", function (req, res) {
  // filepath 생성
  const filePath = path.join(__dirname, "data", "users.json");
  // path 파일 읽기
  const fileData = fs.readFileSync(filePath);
  // 원시 텍스트 변환
  const exsitingUsers = JSON.parse(fileData);

  // HTML ul 에 담기
  let responseData = "<ul>";
  // 배열 출력 시, for-of를 사용 const user가 배열 단일 항목
  for (const user of exsitingUsers) {
    responseData += "<li>" + user + "</li>";
  }
  responseData += "</ul>";

  // send메서드로 변수담아서 보냄
  res.send(responseData);
});

app.listen(3000);
```

