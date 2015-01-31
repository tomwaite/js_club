// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

var gravatar = require('gravatar');

var ElizaBot = require('./node-eliza/elizabot.js')
var eliza = new ElizaBot
eliza.memSize = 1024

// Export a function, so that we can pass 
// the app and io instances from the app.js file:

module.exports = function(app,io){

	app.get('/', function(req, res){

		// Render views/home.html
		//res.render('home');
		res.render('eliza_home');
	});

	app.get('/create', function(req,res){

		// Generate unique id for the room
		var id = Math.round((Math.random() * 1000000));

		// Redirect to the random room
		res.redirect('/chat/'+id);
	});

	app.get('/eliza/1966', function(req,res){

		res.render('chat')
	});

	app.get('/chat/:id', function(req,res){

		// Render the chat.html view
		res.render('chat');
	});

	// Initialize a new socket.io application, named 'chat'
	var chat = io.of('/socket').on('connection', function (socket) {

		// When the client emits the 'load' event, reply with the 
		// number of people in this chat room

		socket.on('load',function(data){

			if(chat.clients(data).length === 0 ) {

				socket.emit('peopleinchat', {number: 0});
			}
			else if(chat.clients(data).length === 1) {

				socket.emit('peopleinchat', {
					number: 1,
					user: chat.clients(data)[0].username,
					avatar: chat.clients(data)[0].avatar,
					id: data
				});
			}
			else if(chat.clients(data).length >= 2) {

				chat.emit('tooMany', {boolean: true});
			}
		});

		// When the client emits 'login', save his name and avatar,
		// and add them to the room
		socket.on('login', function(data) {

			// Only two people per room are allowed
			if(chat.clients(data.id).length < 2){

				// Use the socket object to store data. Each client gets
				// their own unique socket object

				socket.username = data.user;
				socket.room = data.id;

                                
				socket.avatar = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});
                                

				// Tell the person what he should use for an avatar
				socket.emit('img', socket.avatar);


				// Add the client to the room
				socket.join(data.id);

				//if(chat.clients(data.id).length == 2) {

					var usernames = [],
						avatars = [];

					usernames.push(chat.clients(data.id)[0].username);
					usernames.push('Eliza');

					avatars.push(chat.clients(data.id)[0].avatar);
					avatars.push(null);

					// Send the startChat event to all the people in the
					// room, along with a list of people that are in it.

					chat.in(data.id).emit('startChat', {
						boolean: true,
						id: data.id,
						users: usernames,
						avatars: avatars
					});
				//}

			}
			else {
				socket.emit('tooMany', {boolean: true});
			}
		});

		// Somebody left the chat
		socket.on('disconnect', function() {

			// Notify the other person in the chat room
			// that his partner has left

			socket.broadcast.to(this.room).emit('leave', {
				boolean: true,
				room: this.room,
				user: this.username,
				avatar: this.avatar
			});

			// leave the room
			socket.leave(socket.room);
		});


		// Handle the sending of messages
		socket.on('msg', function(data){
			console.log(data.msg)
			
			//we received a msg from the human, 
			var reply = eliza.transform(data.msg)
			console.log(reply)
			// When the server receives a message, it sends it to the other person in the room.
			//socket.broadcast.to(socket.room).emit('receive', {msg: reply, user: 'Eliza', img: data.img});
			socket.emit('receive', {msg: reply, user: 'Eliza', img: data.img});
		});
	});
};
