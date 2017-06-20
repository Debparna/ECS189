var express = require('express');
var formidable = require('formidable');  // we upload images in forms
//var queries = require('./queries');
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


      var sqlite3 = require("sqlite3").verbose();  // use sqlite
      var dbFile = "photos.db"
      var db = new sqlite3.Database(dbFile);  // new object, old DB

      function errorCallback(err) {
        if (err) {
	  console.log("error: ",err,"\n");
        }
      }
	
      function dataCallback(err, tableData) {
        if (err) {
	  console.log("error: ",err,"\n");
        } else {
	  console.log("got: ",tableData,"\n");
        }
      }

      db.serialize( function () {
        console.log("starting DB operations");

        // Insert or replace rows into the table
        db.run('INSERT OR REPLACE INTO photoLabels VALUES (?, "", 0)',[file.name],errorCallback);
        db.get('SELECT labels FROM photoLabels WHERE fileName = ?', [file.name],dataCallback);

        /* Some more examples of database commands you could try
        // Dump whole database 
        // db.all('SELECT * FROM photoLabels',dataCallback);
        // fill-in-the-blanks syntax for Update command
        */
        db.close();
        // to db.serialize 
      });


    });

    // callback for when file is fully recieved
    form.on('end', function (){
	console.log('success');
	sendCode(201,response,'recieved file');  // respond to browser
    });
});

app.listen(11015);

// sends off an HTTP response with the given status code and message
function sendCode(code, response, message) {
    response.status(code);
    response.send(message);
}
    
// Stuff for dummy query answering
// We'll replace this with a real database someday! 
function answer(query, response) {
var labels = {hula:
"Dance, Performing Arts, Sports, Entertainment, QuinceaÃ±era, Event, Hula, Folk Dance",
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

//QUERIES.JS

// Doing stuff with a database in Node.js

// Table was created with:
// CREATE TABLE PhotoLabels (fileName TEXT UNIQUE NOT NULL PRIMARY KEY, labels TEXT, favorite INTEGER)

var sqlite3 = require("sqlite3").verbose();  // use sqlite
var dbFile = "photos.db"
var db = new sqlite3.Database(dbFile);  // new object, old DB

// SERVER CODE
// Handle request to add a label
var querystring = require('querystring'); // handy for parsing query strings

function answer(query, response) {
    // query looks like: op=add&img=[image filename]&label=[label to add]
    queryObj = querystring.parse(query);
    if (queryObj.op == "add") {
        var newLabel = queryObj.label;
        var imageFile = queryObj.img;
        if (newLabel && imageFile) {
            // go to database! 
            db.get(
                'SELECT labels FROM photoLabels WHERE fileName = ?',
                [imageFile], getCallback);

            function getCallback(err,data) {
                console.log("getting labels from "+imageFile);
                if (err) {
                    console.log("error: ",err,"\n");
                } else {
                    if (data.labels === "")
                    {
     		      db.run(
                        'UPDATE photoLabels SET labels = ? WHERE fileName = ?',
                        [newLabel, imageFile],
                        updateCallback);

                    }
                    else{
                    // good response...so let's update labels
                    db.run(
                        'UPDATE photoLabels SET labels = ? WHERE fileName = ?',
                        [data.labels+","+newLabel, imageFile],
                        updateCallback);
                    }
                }
            }

            // Also define this inside queries so it knows about
            // response object
            function updateCallback(err) {
                console.log("updating labels for "+imageFile+"\n");
                if (err) {
                    console.log(err+"\n");
                    sendCode(400,response,"requested photo not found");
                } else {
                    // send a nice response back to browser
                    response.status(200);
                    response.type("text/plain");
                    //response.send("added label "+newLabel+" to "+imageFile);
		    response.send(newLabel);
                }
            }

        }
    } //end of add
    
    else if(queryObj.op == "delete")
    {
        console.log("going into delete");
        var delLabel = queryObj.label;
        var imageFile = queryObj.img;
        if (delLabel && imageFile) {
            // good add query
            // go to database!
            db.get(
                'SELECT labels FROM photoLabels WHERE fileName = ?',
                [imageFile], getCallback1);

            // define callback inside queries so it knows about imageFile
            // because closure!
            function getCallback1(err,data) {
                console.log("deleting labels from "+imageFile);
                if (err) {
                    console.log("error: ",err,"\n");
                } else {
                    // good response...so let's update labels
                    labelslist = data.labels.split(",");
 		    var j = 0;
                    var temp = [];
		    var labelStr = "";
                    for ( var i = 0; i < labelslist.length; i++)
                    {
                      if (labelslist[i] != delLabel)
                      {
                        console.log(labelslist[i]);
                        labelStr = labelStr + labelslist[i] + ",";
                        //temp[j] = labelslist[i];
                        j++;
		      }
                    }
                    labelStr = labelStr.substring(0, labelStr.length - 1);
                    //temp.toString();
                    console.log("This is labelStr" +labelStr);
                    db.run(
                        'UPDATE photoLabels SET labels = ? WHERE fileName = ?',
                        [labelStr, imageFile],
                        updateCallback1);
                }
            }

            // Also define this inside queries so it knows about
            // response object
            function updateCallback1(err) {
                console.log("updating labels for "+imageFile+"\n");
                if (err) {
                    console.log(err+"\n");
                    sendCode(400,response,"requested photo not found");
                } else {
                    // send a nice response back to browser
                    response.status(200);
                    response.type("text/plain");
                    response.send("deleted label "+delLabel+" from "+imageFile);
                }
            }

        }
    }//end of delete

  
    else if(queryObj.op == "editfav")
    {
console.log("going into fav");
      var imageFile = queryObj.img;
      var flag = queryObj.favorite;

      if (imageFile && flag)
      {
            db.get(
                'SELECT favorite FROM photoLabels WHERE fileName = ?', [imageFile], getCallback2);  
      }
      
            function getCallback2(err,data) {
                console.log("getting favorite flag from "+imageFile);
                if (err) {
                    console.log("error: ",err,"\n");
                } else {
                    // good response...so let's update labels
                    db.run(
                        'UPDATE photoLabels SET favorite = ? WHERE fileName = ?',
                        [flag, imageFile],
                        updateCallback2);
                }
            }

            // Also define this inside queries so it knows about
            // response object
            function updateCallback2(err) {
                console.log("updating favorites for "+imageFile+"\n");
                if (err) {
                    console.log(err+"\n");
                    sendCode(400,response,"requested photo not found");
                } else {
                    // send a nice response back to browser
                    response.status(200);
                    response.type("text/plain");
                    response.send("added" +imageFile+ " to favorites");
                }
            }
    }

    else if(queryObj.op == "dump"){
       db.all('SELECT * FROM photoLabels',dataCallback);
       
       function dataCallback(err, data){
         if (err) {
           console.log("error: ",err,"\n");
         } else {
           var dataArr = JSON.stringify(data);
	   response.status(200);
           response.type("text/plain");
           response.send(dataArr);
         
         }      
       }

    }
}

//exports.answer = answer;



 
