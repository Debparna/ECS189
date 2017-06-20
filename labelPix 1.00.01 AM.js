/* called when image is clicked */
function getLabels(imgName) {
        // construct url for query
	var url = "http://138.68.25.50:60401/query?img="+imgName;

        // becomes method of request object oReq
	function reqListener () {
  	    var pgh = document.getElementById("labels");
	    pgh.textContent = this.responseText;
	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", url);
	oReq.send();
}




