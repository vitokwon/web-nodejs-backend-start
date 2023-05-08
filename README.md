
# 백엔드 개발 시작

## nodeJS
 - 다운로드 및 설치
 - 서버 생성 (low level)
 ```//nodeJS 작업 (row level)
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
// amazon.com:80 , 433 은 디폴트 포트 넘버```