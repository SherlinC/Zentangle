var express	= require('express');
var app = express();
var PORT = 8888;

// Routing
app.use('/', express.static(__dirname + '/public'));

// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Server listening at port ' + PORT);
});

/*-------------- SOCKET.IO --------------*/
io.on('connection', function(socket) {

    console.log('A new user has connected: ' + socket.id);

    // A listener for socket disconnection
    socket.on('index1',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'index1 mouse' " + data.x + " " + data.y);

        // Send it to all other clients
        socket.broadcast.emit('index1', data);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );
    socket.on('index2',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'index2 mouse' " + data.x + " " + data.y);

        // Send it to all other clients
        socket.broadcast.emit('index2', data);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
});