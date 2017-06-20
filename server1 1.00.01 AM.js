var http  = require('http');  // include module called "http"

/* handle http requests - that's what a server does! */
/* takes two objects as input, a request and a response */
/* the idea is to get data out of the request, and fill in */
/* required data in the response */
function handler (request, response) {
    var url = request.url;   // get some data out of request
    // start filling in response
    response.writeHead(200, {"Content-Type": "text/html"});
    // now write the body of the Web page - pretty minimal!
    response.write("<h1>Hello!</h1>");
    response.write("<p>You asked for <code>" + url + "</code></p>");
    // response.end() sends it off! So subtle you might have missed it...
    response.end();
}

// Create a server object 
var server = http.createServer(handler);

/* listen to your port number, not mine! */
server.listen(*your*port*number*);
