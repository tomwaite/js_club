// This file is executed in the browser

$(function(){

	// connect to the socket
	var socket = io.connect('/socket');

	// some more jquery objects
	var chatNickname = $(".nickname-chat"),
		leftNickname = $(".nickname-left"),
		chatForm = $("#chatform"),
		textarea = $("#message"),
		chats = $("#chats");  //was a .chats....


	// on connection to server get the id of person's room
	socket.on('connect', function(){
		textarea.focus()
	});

	
	socket.on('receive', function(data){
			createChatMessage(data.msg, data.user, moment());
	});

	
	
	textarea.keypress(function(e){

		// Submit the form on enter

		if(e.which == 13) {
			e.preventDefault();
			chatForm.trigger('submit');
		}

	});

	chatForm.on('submit', function(e){

		e.preventDefault();
		// Create a new chat message and display it directly		
		createChatMessage(textarea.val(), name, moment());
		
		// Send the message to the other person in the chat
		socket.emit('msg', {msg: textarea.val(), user: name});

		// Empty the textarea
		textarea.val("");
	});

	
	// Function that creates a new chat message
	function createChatMessage(msg,user,now){

		chats.append(user + ": "+msg+"\n");
		chats.animate({
		scrollTop:chats[0].scrollHeight - chats.height()},100)

		
	}
	
	
// bring in Eliza so she can talk to us
var ElizaBot = require('./node-eliza/elizabot.js')

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

	

	
});
