var express = require('express');
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var app = express();

app.use(express.static('public'));
app.get('/', function (req,res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection',function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});