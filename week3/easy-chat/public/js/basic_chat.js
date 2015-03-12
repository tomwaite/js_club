// This file is executed in the browser

$(function(){

	// connect to the socket
	var socket = io.connect('/socket');

	// some jquery objects
	var chatForm = $("#chatform"),
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
		//Question: what value does name have?
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
	
	
});
