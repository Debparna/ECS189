
function handleUpload(form, request, response) {

    form.parse(request, parseCallback); // figures out what files are in form

    // debugging function to show what's in form
    function parseCallback(err, fields, files) {
	console.log("Got form with:");
	console.log(err);
	console.log(JSON.stringify(fields));
	console.log(JSON.stringify(files));
    }
    
    // callback for when a file begins to be processed
    form.on('fileBegin', function (name, file){
	// put it in /public
	console.log(file.type);
	if ((file.type == "image/jpeg") | (file.type == "image/png")) {
	    file.path = __dirname + '/public/' + file.name;
	    console.log("uploading ",file.name);
	} else {
	    console.log("cannot upload files of type "+file.type);
	}
    });

    // callback for when file is fully recieved
    form.on('end', function (){
	    console.log('success');
	    sendCode(201,response,'recieved file');  // respond to browser
    });
}

function sendCode(code,response,message) {
    response.status(code);
    response.send(message);
}

exports.handleUpload = handleUpload;
