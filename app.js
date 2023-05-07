const http = require("http");

function handleRequest(request, response) {
    response.statusCode = 200;
}

const server = http.createServer(handleRequest);

server.listen(3000); // 3000은 로컬개발용
// amazon.com => Send a request to Amazon's server
// amazon.com:80 , 433 은 디폴트 포트 넘버
