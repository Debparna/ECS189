// table containing meta-data about images
// in our app, this will come from an AJAX query to server
tableData = [
    {filename: "hula.jpg", labels: "Dance, Hula, Lei", favorite: 0},
    {filename: "eagle.jpg", labels: "Eagle, Bird, Beak", favorite: 0},
    {filename: "redwoods.jpg", labels: "Forest, Trees, Redwoods", favorite: 0}
]

// do immediately on load
fillInImages();

function fillInImages() {
    var container = document.getElementById("photosContainer");
    for (i=0; i<tableData.length; i++) {
	photoObj = tableData[i];
	newDiv = document.createElement("div");
	newDiv.id = "photoDiv"+i;
	newDiv.className = "flexy";

	// calls function that returns a new function
	// that remembers it's parameters
	newDiv.onclick = createNewOnclick(i,photoObj.labels);
	container.appendChild(newDiv);

	newImg = document.createElement("img");
	newImg.className = "flickrPhoto";
	newImg.src = photoObj.filename;
	newDiv.appendChild(newImg);
    }
}

// function that returns a an anonymous function that takes
// no parameters. 
// Since the anonymous function is defined
// in the closure of createNewOnclick, it remembers the
// local variables index and labels
function createNewOnclick(index,labels) {
    return function() {
	showImageName("Photo "+index+", "+labels, index);
    }
}

// the actual onclick function, using the remembered values.
// there is only one of these, but a separate anonymous calling
// function, each with a different closure, for each image
function showImageName(text,index) {
    newP = document.createElement("p");
    newP.textContent = text;
    currentDiv = document.getElementById("photoDiv"+index);
    currentDiv.appendChild(newP);
}




