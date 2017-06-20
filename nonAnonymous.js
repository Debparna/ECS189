var http  = require('http');
var static = require('node-static');

var file = new static.Server('./public');

// callback function for beginning of request data stream
function handlerStart (request, response) {
    console.log("at handlerStart");

    // define callback function for end of request data stream
    function handlerEnd() {
	console.log("at handlerEnd");
	// use the static file server 
	file.serve(request, response);
	// notice it takes request and response from closure
    }
    // set up callback function for end of data stream
    request.addListener('end',handlerEnd);  
    request.resume(); // paused by default; this actually means start 
}

var server = http.createServer(handlerStart);

console.log("ready to listen");
/* listen to your port number, not mine! */
server.listen(60401);
