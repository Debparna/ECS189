var http  = require('http'); //Brings in the http module

function handler (request, response) { //All node.js servers use a handler function, which is a new kind of event handler – for incoming requests to the server.
	//A node.js handler function takes two object arguments
	//The request object contains information about the http request.
	//Http requests and responses have: 
	//Header
	//Body (sometimes)

	
    var urlStr = request.url; //Get whatever data we need out of request object
    var urlList = urlStr.split("?");
    var pathname = urlList[0];
    var query = urlList[1];

    response.writeHead(200, {"Content-Type": "text/html"}); //Builds an http response
    response.write("<h1>Hello!</h1>");
    response.write("<p>Pathname was <code>" + pathname + "</code></p>");
    response.write("<p>Query was <code>" + query + "</code></p>");
    response.end(); //Calling response.end() tells node.js that we have finished filling in the response object, and it is OK to send the response back to the browse
}


var server = http.createServer(handler); //Calling function createServer from the http module
//The function createServer creates a server object
//It takes the handler function as input
//The handler function will be called when the server gets an http request

/* listen to your port number, not mine! */
server.listen(9761); //This starts the server and tells node.js, Unix and TCP that requests to port 8082 should go to my server
//  Typical overall handler structure
//1. Make a handler function
//	 a. In it, get data out of request object
//   b. Then construct response header
//   c. Then construct response body
//	 d. Call response.end() when response is completed
//2. Create a server object using the handler 
//3. Start it listening to YOUR PORT
