function dumpDB(){
  //return function(){
    //parse JSON string, loop through it to display images,lables
    var queryurl = "http://138.68.25.50:11015/query?op=dump";//what is the queryurl
console.log("in DB function");
    function reqListener () {
                //editlabels.textContent = this.responseText;
               //var pgh = delLabel.textContent;
                var dataArray = JSON.parse(this.responseText);
                addPhotostoDOM(dataArray);
        }
        var tagReq = new XMLHttpRequest();
        tagReq.addEventListener("load", reqListener);
        tagReq.open("GET", queryurl);
        tagReq.send();
   // }
}


function addPhotostoDOM(object){
  console.log("in add photos to DOM");
  console.log(object);
  for (var i = 0; i < object.length; i++)
  {
    var jpgfile = object[i].fileName;
    var container = document.createElement("div");
    container.id = jpgfile;

    var newDiv = document.createElement("div");
    newDiv.className = "photoDiv";

    var editdiv = document.createElement("div");
    editdiv.className = "editdiv";

    var editlabels = document.createElement("div");
    editlabels.className = "editlabels";
    editlabels.style.marginLeft = "7%";
console.log(object[i].labels);
    labelsList = object[i].labels.split(",");
console.log(labelsList);
    for (var j = 0; j < labelsList.length; j++)
    {
console.log("IN THE LOOP");
        var newlabel = document.createElement("div");
        //newlabel.textContent = inputBar.value;
        t = document.createTextNode(labelsList[j]);
        newlabel.appendChild(t);
console.log(newlabel.textContent);

        var xBtn = document.createElement("button");
        var x = document.createTextNode("X");
        xBtn.onclick = deleteTag(newlabel, jpgfile);
        xBtn.appendChild(x);
        xBtn.style.display = "none";
        xBtn.className = "xBtn";

        var labelDiv = document.createElement("div");
        labelDiv.appendChild(xBtn);
        labelDiv.appendChild(newlabel);
        labelDiv.style.display = "flex";
        editlabels.appendChild(labelDiv);
console.log("This is the labels in the loop " +newlabel.textContent);
    }


    var inputTag = document.createElement("input");
    inputTag.type = "text";
    inputTag.placeholder="enter tag";
    inputTag.className = "inputTag"; // set the CSS class
    //element.appendChild(inputTag);
    inputTag.style.display = "none";

    var addTag = document.createElement("button");
    addTag.ClassName = "addTag";
    var btnText = document.createTextNode("Add");
    addTag.appendChild(btnText);
    addTag.style.display = "none";

//********IMAGE*******
    var newImg = document.createElement("img");
    newImg.src = jpgfile;
    newImg.setAttribute("width", "300");
    newImg.setAttribute("height", "300");

//********DROP DOWN*******
    var dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    var newImgDrop = document.createElement("input");
    newImgDrop.type = "image";
    newImgDrop.src = "optionsTriangle.png";
    newImgDrop.className = "dropbtn";
    //dropdown.appendChild(newImgDrop);
    console.log("appended ham");
    var dropcontent = document.createElement("div");
    dropcontent.className = "dropdown-content";
    dropcontent.id = "myDropdown";

    var changetag = document.createElement("button");
    changetag.className = "changeTags";
    changetag.textContent = "change tags";
    changetag.onclick = changeTag(editdiv);
    changetag.style.backgroundColor = "#885541";
    changetag.style.color = "white";
    dropcontent.appendChild(changetag);
    
      var addfav = document.createElement("button");
      addfav.className = "addFav";
      addfav.textContent = "add to favorites";
      addfav.style.backgroundColor = "#885541";
      addfav.style.color = "white";
      addfav.onclick = editFav(container);
      dropcontent.appendChild(addfav);

    //dropcontent.appendChild(changetag);
    //dropcontent.appendChild(addfav);
    dropdown.appendChild(newImgDrop);
    dropdown.appendChild(dropcontent);

    newDiv.appendChild(newImg);
    newDiv.appendChild(dropdown);
console.log("These are the labels when the page loads " +editlabels.textContent);
    editdiv.appendChild(editlabels);
    editdiv.appendChild(inputTag);
    editdiv.appendChild(addTag);
    container.appendChild(newDiv);
    container.appendChild(editdiv);
    container.style.marginLeft = "3%";
    container.style.flexDirection = "row";

   document.getElementById("photoBody").appendChild(container);

    newImgDrop.onclick = myFunction(dropcontent);
    console.log("After post call");

  }
}


//dumbDB();
function readFile() {
    var url = "http://138.68.25.50:11015";
    
    var selectedFile = document.getElementById('fileSelector').files[0];
    /*if (window.innerWidth > 480) {
	var selectedFile = document.getElementById('fileSelector1').files[0];
   }
   else {
	var selectedFile = document.getElementById('fileSelector2').files[0];
    }*/

    var jpgfile = selectedFile.name; // jpgfile looks like a.jpg
    var formData = new FormData();
    formData.append("userfile", selectedFile);
    var oReq = new XMLHttpRequest();
    oReq.open("POST", url, true);
    oReq.onload = function() {
        console.log(oReq.responseText);
    }
    oReq.send(formData);
    var container = document.createElement("div");
    container.id = jpgfile;

    var newDiv = document.createElement("div");
    newDiv.className = "photoDiv";

    var editdiv = document.createElement("div");
    editdiv.className = "editdiv";

    var editlabels = document.createElement("div");
    editlabels.className = "editlabels";
    editlabels.style.marginLeft = "7%";   
 
    var inputTag = document.createElement("input");
    inputTag.type = "text";
    inputTag.placeholder="enter tag";
    inputTag.className = "inputTag"; // set the CSS class
    //element.appendChild(inputTag);
    inputTag.style.display = "none";

    var addTag = document.createElement("button");
    addTag.ClassName = "addTag";
    var btnText = document.createTextNode("Add");
    addTag.appendChild(btnText);
    addTag.style.display = "none";

//********IMAGE*******
    var newImg = document.createElement("img");
    var fr = new FileReader();
    fr.onload = function () {
        newImg.src = fr.result;
    };

    fr.readAsDataURL(selectedFile);
    newImg.setAttribute("width", "300");
    newImg.setAttribute("height", "300");

//********DROP DOWN*******
    var dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    var newImgDrop = document.createElement("input");
    newImgDrop.type = "image";
    newImgDrop.src = "optionsTriangle.png";
    newImgDrop.className = "dropbtn";
    //dropdown.appendChild(newImgDrop);
    console.log("appended ham");
    var dropcontent = document.createElement("div");
    dropcontent.className = "dropdown-content";
    dropcontent.id = "myDropdown";
    
    var changetag = document.createElement("button");
    changetag.className = "changeTags";
    changetag.textContent = "change tags";
    changetag.onclick = changeTag(editdiv);
    changetag.style.backgroundColor = "#885541";
    changetag.style.color = "white";
    
    var addfav = document.createElement("button");
    addfav.className = "addFav";
    addfav.textContent = "add to favorites";
    addfav.style.backgroundColor = "#885541";
    addfav.style.color = "white";    
    addfav.onclick = editFav(container);
   
    
    dropcontent.appendChild(changetag);
    dropcontent.appendChild(addfav);
    dropdown.appendChild(newImgDrop);
    dropdown.appendChild(dropcontent);
 
    newDiv.appendChild(newImg);
    newDiv.appendChild(dropdown);

    editdiv.appendChild(editlabels);
    editdiv.appendChild(inputTag);
    editdiv.appendChild(addTag);
    container.appendChild(newDiv);
    container.appendChild(editdiv);
    container.style.marginLeft = "3%";
    container.style.flexDirection = "row";
 
   document.getElementById("photoBody").appendChild(container);

    newImgDrop.onclick = myFunction(dropcontent);
    console.log("After post call");
}





function changeTag(element){
  return function(){
    
    var editlabels = element.children[0];
    var count = editlabels.childElementCount;
    for ( var i = 0; i < count ; i++)
    {
      editlabels.children[i].children[0].style.display = "flex";
      console.log("x tag being created for " + i);
    }
//console.log("this is the number of labels" +editlabels.childElementCount);
    var inputBar = element.children[1];
    inputBar.style.display = "flex";
    inputBar.style.marginLeft = "7%";
    inputBar.style.marginBottom = "2%";
    inputBar.style.marginTop = "2%";

    var addBtn = element.children[2];
    addBtn.style.display = "flex";
    addBtn.style.backgroundColor = "#885541";
    addBtn.style.color = "white";
    addBtn.style.marginLeft = "7%";

    addBtn.onclick = function () {   
    	var newlabel = document.createElement("div");
    	//newlabel.textContent = inputBar.value;
    	t = document.createTextNode(inputBar.value);
    	newlabel.appendChild(t);
console.log(newlabel.textContent);
        
        var imgsrc= element.parentElement.id;

    	var xBtn = document.createElement("button");
    	var x = document.createTextNode("X");
    	xBtn.onclick = deleteTag(newlabel, imgsrc);
    	xBtn.appendChild(x);
        var buttons = document.getElementsByClassName("xBtn");
        for(var k = 1; k < editlabels.childElementCount; k++)
        {
          buttons[k].style.display = "flex";
        }
        xBtn.className = "xBtn";
    
    	var labelDiv = document.createElement("div");
    	labelDiv.appendChild(xBtn);
    	labelDiv.appendChild(newlabel);
    	labelDiv.style.display = "flex";
    	editlabels.appendChild(labelDiv);

  	//here get the parent div to get the source which contains the image name
    	//var imgsrc= element.parentElement.id;

  	//var query = 'op=add&img=[?]&label=[?]', imgsrc, newtag;
    	var queryurl = "http://138.68.25.50:11015/query?op=add&img=" + imgsrc + "&label=" + inputBar.value ;
    	function reqListener () {
    		//editlabels.textContent = this.responseText;
    		var pgh = inputBar.value;
    		pgh = this.responseText;
    	}
    	var tagReq = new XMLHttpRequest();
    	tagReq.addEventListener("load", reqListener);
    	tagReq.open("GET", queryurl);
    	tagReq.send();
    }
   //inputBar.style.display = "none";
   //addBtn.style.display = "none";
}
}

function deleteTag(delLabel, id){

    return function(){
      delLabel.parentElement.remove();
        //var query = 'op=add&img=[?]&label=[?]', imgsrc, newtag;
        var queryurl = "http://138.68.25.50:11015/query?op=delete&img=" + id + "&label=" + delLabel.textContent;
        function reqListener () {
                //editlabels.textContent = this.responseText;
                var pgh = delLabel.textContent;
                pgh = this.responseText;
        }
        var tagReq = new XMLHttpRequest();
        tagReq.addEventListener("load", reqListener);
        tagReq.open("GET", queryurl);
        tagReq.send();
    }
}

/*function editFav(element, flag) {
  return function(){
console.log("fav updated");
    numFave = Number(element.children[2].textContent);
    numFave = numFave + 1;
    if(numFave % 2 == 0){
      flag = 0; 
    } 
    else{
      flag = 1;
    }
    element.children[2].textContent = numFave;
    if(container.children[2].textContent
    //var queryurl = 'op=fav&img=[?]&favorite=1',imgsrc;
    var queryurl = "http://138.68.25.50:11015/query?op=editfav&img=" + element.id + "&favorite=" +flag;

    var favReq = new XMLHttpRequest();
    favReq.open("GET", queryurl, true);
    favReq.send();
  }
  
}*/

function editFav(element) {
  return function(){
console.log("fav updated");
    //var queryurl = 'op=fav&img=[?]&favorite=1',imgsrc;
    var queryurl = "http://138.68.25.50:11015/query?op=editfav&img=" + element.id + "&favorite=1";

    var favReq = new XMLHttpRequest();
    favReq.open("GET", queryurl, true);
    favReq.send();
  }

}


/*function dumpDB(){
  return function(){
    //parse JSON string, loop through it to display images,lables
    var queryurl = "http://138.68.25.50:11015/query?op=dump";//what is the queryurl
    
    function reqListener () {
                //editlabels.textContent = this.responseText;
               //var pgh = delLabel.textContent;
                var dataArray = JSON.parse(this.responseText);
                addPhotostoDOM(dataArray);
        }
        var tagReq = new XMLHttpRequest();
        tagReq.addEventListener("load", reqListener);
        tagReq.open("GET", queryurl);
        tagReq.send();
    }
}


function addPhotostoDOM(object){ 
  console.log(object);
  //(for var i = 0; i < object.length; i++)
  //{
    
    
}*/

/*function fillInImages() {
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
*/


/*
function addTag() {
  
  var newtag = document.getElementById("taginput").value;
  //here get the parent div to get the source which contains the image name
  var imgsrc= document.getElementById("editButton").parentElement.src;


  //var query = 'op=add&img=[?]&label=[?]', imgsrc, newtag;
  var queryurl = "http://138.68.25.50:11015/query?op=add&img=" + imgsrc + "&label=" + newtag ;

  function reqListener () {
    var pgh = document.getElementById("labels");
    pgh.textContent = this.responseText;
  }
  var tagReq = new XMLHttpRequest();
  tagReq.addEventListener("load", reqListener);
  tagReq.open("GET", queryurl);
  tagReq.send();
}

function delTag() {
  var tagremove = document.getElementById("taginput").value;
  //here get the parent div to get the source which contains the image name
  var imgsrc= document.getElementById("editButton").parentElement.src;


  //var query = 'op=add&img=[?]&label=[?]', imgsrc, newtag;
  var queryurl = "http://138.68.25.50:11015/query?op=delete&img=" + imgsrc + "&label=" + tagremove ;

  function reqListener () {
    var pgh = document.getElementById("labels");
    pgh.textContent = this.responseText;
  }
  var tagReq = new XMLHttpRequest();
  tagReq.addEventListener("load", reqListener);
  tagReq.open("GET", queryurl);
  tagReq.send();
}

function editfav(flag) {

  var imgsrc= document.getElementById("editButton").parentElement.src;
  //var queryurl = 'op=fav&img=[?]&favorite=1',imgsrc;
  var queryurl = "http://138.68.25.50:11015/query?op=editfav&img=" + imgsrc + "&favorite=" + flag;

  var favReq = new XMLHttpRequest();
  favReq.open("GET", queryurl, true);
  favReq.send();
  
}
*/

function fadeImage() {
    var image = document.getElementById('theImage');
    var button = document.getElementById('fadeButton');
    if (button.textContent == 'Fade') {
	image.style.opacity = 0.5;
	button.textContent = 'UnFade';
    } else {
	image.style.opacity = 1.0;
	button.textContent = 'Fade';
    }
}

function myFunction(element) {
  return function(){
    //document.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
    element.classList.toggle("show");
  }
}

function myFunction2() {
    //document.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
      document.getElementById("M2myDropdown").classList.toggle("show");
        console.log("mF2");
}

function myFunction3() {
    //document.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
      document.getElementById("M3myDropdown").classList.toggle("show");
	console.log("mF3"); 
}
