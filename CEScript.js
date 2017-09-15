//window.addEventListener("load", displayCreateEvent, false);
window.addEventListener("load", displaySignUp, false);
window.addEventListener("load", EventOption, false);
// window.addEventListener("load", SlotsOption, false);
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
	var d = document.getElementById(date).value;// min date= now
	var st = document.getElementById(starttime).value;//24 or 12 option
	var et = document.getElementById(endtime).value;
	
	
	// eventArray.push(eventObj);
	// localStorage.eventRecord = JSON.stringify(eventArray);
	//console.log(eventObj.name);
	var size = localStorage.length;
	if(n!="" && n!="Enter a name here" && d!="" && st!="" && et!="" && st<et)
	{
		if((st[3]=='0'||st[3]=='3') && (et[3]=='0'||et[3]=='3') && st[4]=='0' && et[4]=='0')
		{
			var hrs = parseInt(et.substring(0, 2)) - parseInt(st.substring(0, 2));
			var min;
			console.log(parseInt(st.substring(0, 2)));
			console.log(parseInt(st.substring(3, 5)));
			if(parseInt(et.substring(3, 5)) > parseInt(st.substring(3, 5)))
			{
				min = 1;
			}
			else if(parseInt(et.substring(3, 5)) == parseInt(st.substring(3, 5)))
			{
				min = 0;		
			}
			else
			{
				min = -1;
			}
			var timeslots = new Array(2*hrs + min);
			var eventObj = {name:n, date:d, starttime:st, endtime:et, member:1, slots:timeslots};
			var str = JSON.stringify(eventObj);
			size++;
			localStorage.setItem(size,str);
			alert("You add an event successfully");
			console.log(eventObj);//test object
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
	//console.log(storedValue);//test the localStorage;
	var ob = JSON.parse(storedValue);
	//console.log(ob);//test object name
	return ob;
}

// function displayCreateEvent(){
// 	document.getElementById('name').value = "Enter a name here";
// }








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



function EventOption(){
	var eventOption = "<option value ='0'>select</option>";
	for(var x=1;x<=localStorage.length;x++)
	{
		var N = loadeventObj(x).name;
		eventOption +="<option value= '"+x+"'>"+ N +"</option>"
	}	
	document.getElementById("eventoption").innerHTML = eventOption;
}

function SlotsOption(eventoption){
	var n = document.getElementById(eventoption).value;
	if(n>0)
	{
		var SlotsOption;		
		var storedValue = localStorage.getItem(n);//get string event
		var ob = JSON.parse(storedValue);//get event object
		var st = ob.starttime;
		var slotsArray = ob.slots;
		var hr = parseInt(st.substring(0, 2));
		var min = parseInt(st.substring(3, 5));
		console.log(slotsArray);
		for(var x=0;x<slotsArray.length;x++)
		{
			if(min==30)
			{
				SlotsOption +="<option value= '"+x+"'>"+ hr +":30"+"</option>"
				min = 0;
				hr++;
			}
			else
			{
				SlotsOption +="<option value= '"+x+"'>"+ hr +":00"+"</option>"
				min = 30;
			}
			slotsArray[x]=0;
		}	
		localStorage.setItem(n,JSON.stringify(ob));
		console.log(localStorage.getItem(n));//test slot array number 
		document.getElementById("timeslot").innerHTML = SlotsOption;
	}
	else
	{
		SlotsOption = "<option value =''>--:--</option>";
		document.getElementById("timeslot").innerHTML = SlotsOption;
	}

}

function initialtime()
{
	var SlotsOption = "<option value =''>--:--</option>";
	document.getElementById("timeslot").innerHTML = SlotsOption;
}



function Addmember(name,eventoption,timeslot){
	var Student = document.getElementById(name).value;
	var n = document.getElementById(eventoption).value;
	var Slotnumber = document.getElementById(timeslot).value;
	if(Student!="" && n!=0 && Slotnumber!="")
	{
		var storedValue = localStorage.getItem(n);
		var ob = JSON.parse(storedValue);
		ob.member += 1;
		console.log(ob);
		localStorage.setItem(n,JSON.stringify(ob));
		alert("Sign up successfully.");
		document.getElementById(name).value ="";
	}
	else if(n==0)
	{
		alert("Please select a event.");
	}
	else if(Slotnumber=="")
	{
		alert("Please select a Time.");
	}
	else
	{
		alert("Please enter your name.");
	}
	displaySignUp();
}
// function updatemember(n)
// {

// }
// function updateslot()
// {
	
// }


function cleanlist(){
	localStorage.clear();
}
