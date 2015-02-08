// This file is required by app.js. It sets up event listeners
// and listens for socket.io messages.


// Export a function, so that we can pass 
// the app and io instances from the app.js file:
module.exports = function(app,io){

	app.get('/', function(req, res){
		// Render views/home.html
		res.render('home');
	});

};
