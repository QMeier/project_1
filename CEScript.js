window.addEventListener("load", displayCreateEvent, false);
window.addEventListener("load", displaySignUp, false);
// function doFirst(){
// 	var button = document.getElementById("button");
// 	button.addEventListener("click", saveCrap, false);
// 	display();
// }
// function saveCrap(){
// 	var name = document.getElementById("name").value;
// 	sessionStorage.setItem(name,"234");
// 	document.getElementById('name').value = "";
// 	display();
// }

// function display(){
// 	var Eventlist = document.getElementById("Eventlist");
// 	Eventlist.innerHTML = "We are ready have following event(s):" +"<br />";
// 	for(var x=0;x<sessionStorage.length;x++)
// 	{
// 		var EN = sessionStorage.key(x);
// 		var D = sessionStorage.getItem(EN);
// 		Eventlist.innerHTML += (x+1) + ". Event:" + EN + ". Time:" + D + "<br />";
// 	}
// }

//var eventArray = [];

// function init(){
// 	if(localStorage.eventRecord)
// 	{
// 		eventArray = JSON.parse(localStorage.eventRecord);
// 		for(var i=0;i<eventArray.lengthl;i++)
// 		{

// 		}
// 	}
// }
// function save(name, year, month, date, time){
// 	var n = document.getElementById(name).value;
// 	var y = document.getElementById(year).value;
// 	var m = document.getElementById(month).value;
// 	var d = document.getElementById(date).value;
// 	var t = document.getElementById(time).value;
// 	var eventObj = {name:n, year:y, month:m, date:d, time:t};
// 	eventArray.push(eventObj);
// 	localStorage.eventRecord = JSON.stringify(eventArray);
// 	//var fs = require("fs");
// 	//fs.writeFile('write.txt',eventObj.name);
// 	//document.cookie = eventObj.name+"expires=Fri, 18 Dec 2019 UTC; path=/;";
// 	console.log(eventArray);
// }

function save(name, date, starttime, endtime){
	var n = document.getElementById(name).value;
	var d = document.getElementById(date).value;
	var st = document.getElementById(starttime).value;
	var et = document.getElementById(endtime).value;
	
	var hrs = parseInt(et.substring(0, 2)) - parseInt(st.substring(0, 2));
	var min;
	if(parseInt(et.substring(4, 6)) > parseInt(st.substring(4, 6)))
	{
		min = 1;
	}
	else if(parseInt(et.substring(4, 6)) == parseInt(st.substring(4, 6)))
	{
		min = 0;		
	}
	else
	{
		min = -1;
	}
	
	var timeslots = new Array(2*hrs + min);

	var eventObj = {name:n, date:d, starttime:st, endtime:et, member:0, slots:timeslots};
	// eventArray.push(eventObj);
	// localStorage.eventRecord = JSON.stringify(eventArray);
	//console.log(eventObj.name);
	var size = localStorage.length;
	if(n!="" && n!="Enter a name here" && d!="" && st!="" && et!="" && st<et)
	{
		if((st[3]=='0'||st[3]=='3') && (et[3]=='0'||et[3]=='3') && st[4]=='0' && et[4]=='0')
		{
			var str = JSON.stringify(eventObj);
			size++;
			localStorage.setItem(size,str);
			alert("You add an event successfully");
			loadeventObj(size);
		}
		else
		{
			alert("A single time slot should be 30 minutes.");
		}
	}
	else if(st>=et)//(st and et may not be the same day; st and et cannot be 12:12 or)
	{
		alert("Please enter a reasonable time!");
	}
	else
	{
		alert("Please fill out all information.");
	}
	document.getElementById('name').value = "Enter a name here";
	console.log(size);//test size
	//displaySignUp();
}
function loadeventObj(n){
	var storedValue = localStorage.getItem(n);
	console.log(storedValue);//test the localStorage;
	var ob = JSON.parse(storedValue);
	console.log(ob.name);
	return ob;
}

function displayCreateEvent(){
	document.getElementById('name').value = "Enter a name here";
}








function displaySignUp(){
	var Eventlist = document.getElementById('Eventlist');
	Eventlist.innerHTML = "We are ready have following event(s):" +"<br />";
	for(var x=1;x<=localStorage.length;x++)
	{
		var N = loadeventObj(x).name;
		var D = loadeventObj(x).date;
		var ST = loadeventObj(x).starttime;
		var ET = loadeventObj(x).endtime;
		var M = loadeventObj(x).member;

		Eventlist.innerHTML += x + ". Event: " +N+ ". Date: " +D+ ". Time: " +ST+ "-" +ET+ ". Member: " +M+"<br />";
	}
}





function cleanlist(){
	localStorage.clear();
}