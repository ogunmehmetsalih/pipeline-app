const http = require('http');

const server = http.createServer((req, res) => {
  res.end("Merhaba, bu bir pipeline uygulamasıdır!");
});

server.listen(3000, () => {
  console.log("Sunucu 3000 portunda çalışıyor.");
});

