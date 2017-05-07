var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var allUsers = [];
app.use(express.static('public'));

/*app.get('/', function(req, res){
  res.sendfile('index.html');
});
*/



io.on('connection', function(socket){
  console.log('new user connected');
  console.log('id is '+ socket.id);
  socket.on('gettingUsername', function(username){
    
    if(allUsers.indexOf(username) == -1){
		allUsers.push(username);
		console.log(username + ' in chat now');
		socket.emit('userNew', username); 
    }
    else{
      socket.emit('userUsed', username + ' this name is already used. Try another one.');
    }
  });
	
	socket.on('msg', function(data){
	io.sockets.emit('newmsg', data);
    })
});
http.listen(3000, function(){
  console.log('listening on localhost:3000');
});