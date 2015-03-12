var express = require('express')
var app = express()

var x = 100

// when we get asked for the root with a GET, reply Hello world

//app.get(string, function_to_do_when_that_string_is_asked_for)
app.get('/', 
		function (req, res) 
		{
					res.send('Hello World!')
		}
		)
		
app.get('/Dune', 
		function (req, res) 
		{		console.log(req)
				console.log("someone just connected!!")
					res.send('Hello Dune!')
		}
		)

//start listening at port 3000 on this computer 
//when we attach to the port and start listening, call the function that says what 
// we are doing
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})