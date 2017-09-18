//==========To do first functions=================
window.addEventListener("load", displaySignUp, false);
window.addEventListener("load", EventOption, false);
window.addEventListener("load", displayCheckstatus, false);
window.addEventListener("load", initialMode, false);
//=================================================




//======The functions for CreatEvent.html Page======
function ModeControl(mode){
	if(mode==12)
	{
		var STP = "<option value ='1'>AM</option>";
		STP += "<option value ='2'>PM</option>";
		var ETP = "<option value ='1'>AM</option>";
		ETP += "<option value ='2'>PM</option>";
		document.getElementById("STP").innerHTML = STP;
		document.getElementById("ETP").innerHTML = ETP;
		var hour;
		for(var x=1;x<=12;x++)
		{
			hour +="<option value= '"+x+"'>"+ x +"</option>"
		}	
		document.getElementById("SThour").innerHTML = hour;
		document.getElementById("EThour").innerHTML = hour;
	}
	else
	{
		var P = "<option value =''></option>";
		document.getElementById("STP").innerHTML = P;
		document.getElementById("ETP").innerHTML = P;
		var hour;
		for(var x=0;x<=23;x++)
		{
			hour +="<option value= '"+x+"'>"+ x +"</option>"
		}	
		document.getElementById("SThour").innerHTML = hour;
		document.getElementById("EThour").innerHTML = hour;
	}
}
function initialMode(){
	var mode = document.getElementById("TimeMode").value;
	ModeControl(mode);
}
function save(name, date, TimeMode, SThour, STmin, STP, EThour, ETmin , ETP){
	var n = document.getElementById(name).value;
	var d = document.getElementById(date).value;// min date= now
	var tm = document.getElementById(TimeMode).value;
	var stp = document.getElementById(STP).value;;
	var etp = document.getElementById(ETP).value;;
	var SHrs = document.getElementById(SThour).value;
	var EHrs = document.getElementById(EThour).value;
	var STM = document.getElementById(STmin).value;
	var ETM = document.getElementById(ETmin).value;
	SHrs = parseInt(SHrs);
	EHrs = parseInt(EHrs);
	if(tm==12)
	{   
		if(stp==1 && SHrs == 12)
		{
			SHrs = 0;
		}
		else if(stp==2 && SHrs != 12)
		{
			SHrs = SHrs+12;
		}

		if(etp==1 && EHrs == 12)
		{
			EHrs = 0;
		}
		else if(etp==2 && EHrs != 12)
		{
			EHrs = EHrs+12;
		}
	}
	var st = SHrs.toString();
	var et = EHrs.toString();

	if(STM == 30)
	{
		SHrs = SHrs + 0.5;
	}
	if(ETM == 30)
	{
		EHrs = EHrs + 0.5;
	}

	if(st<10)
	{
		st = '0'+ st + ":" + STM;
	}
	else
	{
		st = st + ":" + STM;
	}
	if(et<10)
	{	
		et = '0'+ et + ":" + ETM;
	}
	else
	{
		et = et + ":" + ETM;
	}
	var size = localStorage.length;
	var DD = new Date();
	var currentDate = DD.getDate();
	var currentMonth = DD.getMonth()+1;
	var currentYear = DD.getFullYear();
	var chooseYear = parseInt(d.substring(0, 4));
	var chooseMonth = parseInt(d.substring(5, 7));
	var chooseDate = parseInt(d.substring(8, 10));

	if(n!="" &&  d!="" && SHrs<EHrs)
	{
		if(currentYear < chooseYear)
		{
			var timeslots = new Array((EHrs-SHrs)*2);
			var eventObj = new Object();
			eventObj = {name:n, date:d, starttime:st, endtime:et, member:1, slots:timeslots};
			for(var i=0;i<timeslots.length;i++)
			{
				timeslots[i]=0;
			}
			var str = JSON.stringify(eventObj);
			size++;
			localStorage.setItem(size,str);
			alert("You have successfully added an event");
			console.log(eventObj);//test object
			loadeventObj(size);
		}
		else if (currentYear == chooseYear)
		{
			if(currentMonth < chooseMonth)
			{
				var timeslots = new Array((EHrs-SHrs)*2);
				var eventObj = new Object();
				eventObj = {name:n, date:d, starttime:st, endtime:et, member:1, slots:timeslots};
				for(var i=0;i<timeslots.length;i++)
				{
					timeslots[i]=0;
				}
				var str = JSON.stringify(eventObj);
				size++;
				localStorage.setItem(size,str);
				alert("You have successfully added an event");
				console.log(eventObj);//test object
				loadeventObj(size);
			}
			else if(currentMonth == chooseMonth)
			{
				if(currentDate < chooseDate)
				{
					var timeslots = new Array((EHrs-SHrs)*2);
					var eventObj = new Object();
					eventObj = {name:n, date:d, starttime:st, endtime:et, member:1, slots:timeslots};
					for(var i=0;i<timeslots.length;i++)
					{
						timeslots[i]=0;
					}
					var str = JSON.stringify(eventObj);
					size++;
					localStorage.setItem(size,str);
					alert("You have successfully added an event");
					console.log(eventObj);//test object
					loadeventObj(size);
				}
			}
			else
			{
				alert("Please enter a date in the future");
			}
		}
		else
		{
			alert("Please enter a date in the future");
		}
	}
	else if(SHrs>=EHrs)//(st and et may not be the same day;
	{
		alert("Please enter a reasonable time!");
	}
	else
	{
		alert("Please fill out all information.");
	}
}
//=================================================





//======The functions for SignUp.html Page==========
var keyS = 1;
var keyE = 1.5;
var keyT = 0;
function displaySignUp(){
	var Eventlist = document.getElementById('Eventlist');
	Eventlist.innerHTML = "We are ready have following event(s):" +"<br />"+"<br />";
	for(var x=1;x<=localStorage.length;x++)
	{
		var N = loadeventObj(x).name;
		var D = loadeventObj(x).date;
		var ST = loadeventObj(x).starttime;
		var ET = loadeventObj(x).endtime;
		var M = loadeventObj(x).member;
		Eventlist.innerHTML += x + ". Event: " +N+ ". Date: " +D+ ". Time(24hrs): " +ST+ "-" +ET+ ". Member: " +M+"<br />";
	}
	sessionStorage.setItem(1,"test1");
	sessionStorage.setItem(1.5,"test2");
	sessionStorage.setItem(0,"test3");
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
			// slotsArray[x]=0;
		}	
		localStorage.setItem(n,JSON.stringify(ob));
		document.getElementById("timeslot").innerHTML = SlotsOption;
	}
	else
	{
		SlotsOption = "<option value =''>--:--</option>";
		document.getElementById("timeslot").innerHTML = SlotsOption;
	}

}

function initialtime(){
	var SlotsOption = "<option value =''>--:--</option>";
	document.getElementById("timeslot").innerHTML = SlotsOption;
}

function Addmember(name,eventoption,timeslot){
	var Student = document.getElementById(name).value;
	var n = document.getElementById(eventoption).value;
	var Slotnumber = document.getElementById(timeslot).value;

	if(Student!="" && n!=0 && Slotnumber!="")
	{
		//the same person can sign up mutiple event or same event at different time
		keyS=keyS+1;
		keyE=keyE+1;
		keyT=keyT-1;
		sessionStorage.setItem(keyS,Student);
		sessionStorage.setItem(keyE,n);
		sessionStorage.setItem(keyT,Slotnumber);

		var storedValue = localStorage.getItem(n);
		var ob = JSON.parse(storedValue);
		//The same person cannot sign one event at same timeslot twice
		if(sessionStorage.getItem(keyS)==sessionStorage.getItem(keyS-1) && sessionStorage.getItem(keyE)==sessionStorage.getItem(keyE-1) && sessionStorage.getItem(keyT)==sessionStorage.getItem(keyT+1))
		{
			alert("You cannot sign an event at same time twice.");
		}
		else if(sessionStorage.getItem(keyS)==sessionStorage.getItem(keyS-1) && sessionStorage.getItem(keyE)==sessionStorage.getItem(keyE-1))
		{
			ob.slots[Slotnumber] += 1; 
			localStorage.setItem(n,JSON.stringify(ob));
			alert("Sign up successfully.");
		}
		else
		{
			ob.member += 1;
			ob.slots[Slotnumber] += 1; 
			localStorage.setItem(n,JSON.stringify(ob));
			alert("Sign up successfully.");
		}
		
		// document.getElementById(name).value ="";
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
//==================================================





//======The Functions for CheckEvent.html page======
// Add a drop down box to choose 12 or 24 mode
function displayCheckstatus(){
	var checkstatus = document.getElementById('checkstatus');
	checkstatus.innerHTML = "All times shown below are based on 24 hrs format."+"<br />"+"<br />";
	for(var x=1;x<=localStorage.length;x++)
	{
		var N = loadeventObj(x).name;
		var D = loadeventObj(x).date;
		var ST = loadeventObj(x).starttime;
		var ET = loadeventObj(x).endtime;
		var M = loadeventObj(x).member;
		var TS = loadeventObj(x).slots;
		var hr = parseInt(ST.substring(0, 2));
		var min = parseInt(ST.substring(3, 5));
		checkstatus.innerHTML += x + ". Event: " +N+ ". Date: " +D+ ". Time: " +ST+ "-" +ET+ ". Member: " +M+ " (include event creator)"+ "<br />";
		for(var i=0;i<TS.length;i++)
		{
			if(min==30)
			{
				checkstatus.innerHTML += hr +":30 - " + (hr+1) + ":00 have: " +TS[i]+ " people signed up." + "<br />";
				min = 0;
				hr++;
			}
			else
			{
				checkstatus.innerHTML += hr +":00 - " + hr + ":30 have: " +TS[i]+ " people signed up." + "<br />";
				min = 30;
			}
		}
	}
}
//==================================================





//=====The functions for other function or test=====
function loadeventObj(n){
	var storedValue = localStorage.getItem(n);
	var ob = JSON.parse(storedValue);
	return ob;
}
function cleanlist(){
	localStorage.clear();
	alert("All Events Deleted!")
}
//==================================================




















