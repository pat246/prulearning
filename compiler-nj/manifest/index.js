var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(20316, function(){
  console.log('listening on *:20316');
});

socket.on('data', function(msg){
    console.log(msg);
  });