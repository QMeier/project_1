window.addEventListener("load", displaySignUp, false);

function displaySignUp(){
	var Eventlist = document.getElementById('Eventlist');
	Eventlist.innerHTML = "We are ready have following event(s):" +"<br />";
	for(var x=1;x<=localStorage.length;x++)
	{
		var EN = load(x);

		Eventlist.innerHTML += x + ". " + EN + "<br />";
	}
}