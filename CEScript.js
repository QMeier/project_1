window.addEventListener("load", doFirst, false);
function doFirst(){
	var button = document.getElementById("button");
	button.addEventListener("click", saveCrap, false);
	display();
}
function saveCrap(){
	var name = document.getElementById("name").value;
	sessionStorage.setItem(name,"234");
	document.getElementById('name').value = "";
	display();	
}

function display(){
	var Eventlist = document.getElementById("Eventlist");
	Eventlist.innerHTML = "We are ready have following event(s):" +"<br />";
	for(var x=0;x<sessionStorage.length;x++)
	{
		var EN = sessionStorage.key(x);
		var D = sessionStorage.getItem(EN);
		Eventlist.innerHTML += (x+1) + ". Event:" + EN + ". Time:" + D + "<br />";
	}
}



function show(f)
{
	var x=f.hobby;
	alert(x.value);
}