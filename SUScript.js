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