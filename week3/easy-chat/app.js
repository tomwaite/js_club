// This is the main file of our chat app. It initializes a new 
// express.js instance, requires the config and routes files
// and listens on a port. Start the application by running
// 'node app.js' in your terminal


var express = require('express'),
	app = express();

	
// bring in Eliza so she can talk to us
var ElizaBot = require('./node-eliza/elizabot.js')

// This is needed if the app is run on heroku:

var port = process.env.PORT || 8080;

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.

var io = require('socket.io').listen(app.listen(port));

// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.

require('./config')(app, io);
require('./routes')(app, io);


	// Initialize a new socket.io application, named 'chat'
	var chat = io.of('/socket').on('connection', function (socket) {
		var eliza = new ElizaBot
		eliza.memSize = 1024
		// Handle the sending of messages
		socket.on('msg', function(data){
			console.log(data.msg)
			
			//we received a msg from the human, 
			var reply = eliza.transform(data.msg)
			console.log(reply)
			// When the server receives a message, it sends it to the other person in the room.
			//socket.broadcast.to(socket.room).emit('receive', {msg: reply, user: 'Eliza', img: data.img});
			//because we are eliza we bounce back to the only person in the room with a simple emit
			socket.emit('receive', {msg: reply, user: 'Eliza', img: data.img});
		});
	}); 
console.log('Your application is running on http://localhost:' + port);