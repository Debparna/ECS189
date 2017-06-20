// Doing stuff with a database in Node.js
var express = require('express');

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
	    // good add query
	    // go to database! 
	    db.get(
		'SELECT labels FROM photoLabels WHERE fileName = ?',
		[imageFile], getCallback);

	    // callback for db.get
	    // defined inside answer so it knows about imageFile
	    // because closure!
	    function getCallback(err,data) {
		console.log("getting labels from "+imageFile);
		if (err) {
		    console.log("error: ",err,"\n");
		} else {
		    // good response...so let's update labels
		    db.run(
			'UPDATE photoLabels SET labels = ? WHERE fileName = ?',
			[data.labels+", "+newLabel, imageFile],
			updateCallback);
		}
	    }

	    // callback for db.run('UPDATE ..')
	    // Also defined inside answer so it knows about
	    // response object
	    function updateCallback(err) {
		console.log("updating labels for "+imageFile+"\n");
		if (err) {
		    console.log(err+"\n");
		    sendCode(400,response,"requested photo not found");		    
		} else {
		    // send a nice response back to browser
		    sendCode(200,response,"added label "+newLabel+
			     " to "+imageFile);
		}
	    }

	}
    }	    
}


function sendCode(code,response,message) {
    response.status(code);
    response.send(message);
}

// show just the answer function when this file is included as a module
exports.answer = answer;

