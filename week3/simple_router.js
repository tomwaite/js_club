var express = require('express')
var app = express()

// when we get asked for the root with a GET, reply Hello world
app.get('/', function (req, res) {
  res.send('Hello World!')
})

//start listening at port 3000 on this computer 
//when we attach to the port and start listening, call the function that says what 
// we are doing
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})