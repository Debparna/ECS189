/* This server, unlike our previous ones, uses the express framework */
var express = require('express');
var formidable = require('formidable');  // we upload images in forms
// this is good for parsing forms and reading in the images

// make a new express server object
var app = express();

// Now we build a pipeline for processing incoming HTTP requests

// Case 1: static files
app.use(express.static('public')); // serve static files from public
// if this succeeds, exits, and rest of the pipeline does not get done

// Case 2: queries
// An example query URL is "138.68.25.50:???/query?img=hula"
app.get('/query', function (request, response){
    console.log("query");
    query = request.url.split("?")[1]; // get query string
    if (query) {
	answer(query, response);
    } else {
	sendCode(400,response,'query not recognized');
    }
});

// Case 3: upload images
// Responds to any POST request
app.post('/', function (request, response){
    var form = new formidable.IncomingForm();
    form.parse(request); // figures out what files are in form

    // callback for when a file begins to be processed
    form.on('fileBegin', function (name, file){
	// put it in /public
	file.path = __dirname + '/public/' + file.name;
	console.log("uploading ",file.name,name);
    });

    // callback for when file is fully recieved
    form.on('end', function (){
	console.log('success');
	sendCode(201,response,'recieved file');  // respond to browser
    });

});

// You know what this is, right? 
app.listen(60401);

// sends off an HTTP response with the given status code and message
function sendCode(code,response,message) {
    response.status(code);
    response.send(message);
}
    
// Stuff for dummy query answering
// We'll replace this with a real database someday! 
function answer(query, response) {
var labels = {hula:
"Dance, Performing Arts, Sports, Entertainment, Quinceañera, Event, Hula, Folk Dance",
	      eagle: "Bird, Beak, Bird Of Prey, Eagle, Vertebrate, Bald Eagle, Fauna, Accipitriformes, Wing",
	      redwoods: "Habitat, Vegetation, Natural Environment, Woodland, Tree, Forest, Green, Ecosystem, Rainforest, Old Growth Forest"};

    console.log("answering");
    kvpair = query.split("=");
    labelStr = labels[kvpair[1]];
    if (labelStr) {
	    response.status(200);
	    response.type("text/json");
	    response.send(labelStr);
    } else {
	    sendCode(400,response,"requested photo not found");
    }
}

