window.addEventListener("load", displaySignUp, false);
function savestudent(name, event){
	var n = document.getElementById(name).value;
	var eventObj = {name:n, };
	var str = JSON.stringify(eventObj);
	localStorage.setItem(n,str);
	//var storedValue = localStorage.getItem(n);
	//console.log(storedValue);
	load(n);
}
function loadstudent(n){
	var storedValue = localStorage.getItem(n);
	console.log(storedValue);
}
function displaySignUp(){
	var Eventlist = document.getElementById('Eventlist');
	Eventlist.innerHTML = "We are ready have following event(s):" +"<br />";
	for(var x=1;x<=localStorage.length;x++)
	{
		var EN = load(x);

		Eventlist.innerHTML += x + ". " + EN + "<br />";
	}
}