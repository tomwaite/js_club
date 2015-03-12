// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

var gravatar = require('gravatar');

// Export a function, so that we can pass 
// the app and io instances from the app.js file:

module.exports = function(app,io){

	//someone comes to the website - show them the home page!
	app.get('/', function(req, res){

		// Render views/home.html
		res.render('home');
	});
	
	//someone is creating a chat room.  Make up a number for the room
	//and send them to that page
	app.get('/create', function(req,res){

		// Generate unique id for the room
		var id = Math.round((Math.random() * 1000000));

		// Redirect to the random room
		res.redirect('/chat/'+id);
	});

	//someone has been sent to a chat room - show them the chat page
	app.get('/chat/:id', function(req,res){

		// Render the chant.html view
		res.render('chat');
	});

	// Initialize a new socket.io application, named 'chat'
	//when we get a connection event, register load, login, msg, disconnect handlers on the socket
	var chat = io.of('/socket').on('connection', function (socket) {

		// When the client emits the 'load' event, reply with the 
		// number of people in this chat room

		socket.on('load',function(data){
			//TODO write code to handle people connecting
			console.log("someone connected!!")
		});

		// When the client emits 'login', save his name and avatar,
		// and add them to the room or tell them it's too busy!
		socket.on('login', function(data) {

			// TODO Only two people per room are allowed
			
				// Use the socket object to store data. Each client gets
				// their own unique socket object
                  

				// Tell the person what he should use for an avatar
				

				// Make the client join the room
				
				// if we have exactly 2 people, set up the usernames and any pictures
				// and kick of the chatting!
				
					// Send the startChat event to all the people in the
					// room, along with a list of people that are in it.

					

			// else tell them there are too many people
				
			}
		});

		// Somebody left the chat
		socket.on('disconnect', function() {

			//TODO Notify the other person in the chat room
			// that his partner has left

			

			// TODO leave the room
			socket.leave(socket.room);
		});


		// Handle the sending of messages
		//When we get a msg, send it on to the other person in the chat
		socket.on('msg', function(data){

			// TODO When the server receives a message, it sends it to the other person in the room.
			
		});
	});
};
