const http = require('http');

const server = http.createServer();

server.on('connection',(socket) => {
 console.log('connection')
});

server.emit('connection')


server.listen(3000);
console.log('listing to port 3000');


