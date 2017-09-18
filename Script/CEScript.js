//==========To do first functions=================
window.addEventListener("load", displaySignUp, false);
window.addEventListener("load", EventOption, false);
window.addEventListener("load", displayCheckstatus, false);
window.addEventListener("load", initialMode, false);
//=================================================




//======The functions for CreatEvent.html Page======
/** Name: Mode Control 
*Scope: CreateEvent
*Description:  Controls the time mode for event creation between 12 hour notation and 24 hour notation.
*
*Pre: Event create page loaded
*Post: Time mode changes as based on selection of 12 or 24
*/
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

/** Name: initialMode 
*Scope: CreateEvent
*Description:  Sets the initial time mode of event creation to 24 hour mode
*
*Pre: Event create page loaded
*Post: Time mode initialized to 24 hour mode
*/
function initialMode(){
	var mode = document.getElementById("TimeMode").value;
	ModeControl(mode);
}

/** Name: save
*Scope: CreateEvent
*Description:  Saves the input of the created event into a text document in localStorage for recall into event signup and even status checks
*
*Pre: Event create page loaded, all event creation inputs filled out according to rules of event signup
*Post: Event is saved in localStorage in either a new document if document not created or in a previously created event creation document
*/
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
	document.getElementById('name').value = "";
}
//=================================================


//======The functions for SignUp.html Page==========
var keyS = 1;
var keyE = 1.5;
var keyT = 0;

/** Name: displaySignUp
*Scope: SignUp
*Description:  Displays the available events for signup by drawing in from the localStorage and displaying on the page
*		Will show dates and times ranges and amount of people signed up.  Will show nothing if no events available.
*Pre: Singnup page loaded
*Post: Any and all created events are listed out for the user to see
*/
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

/** Name: EventOption 
*Scope: SignUp
*Description:  Displays the available events for signup by drawing in from the localStorage and displaying in a dropdown list for the user to select to see times available for signup
*		Will show an empty drop box if no events available.
*Pre: Singnup page loaded
*Post: Any and all created events are listed out for the user to see
*/
function EventOption(){
	var eventOption = "<option value ='0'>select</option>";
	for(var x=1;x<=localStorage.length;x++)
	{
		var N = loadeventObj(x).name;
		eventOption +="<option value= '"+x+"'>"+ N +"</option>"
	}	
	document.getElementById("eventoption").innerHTML = eventOption;
}

/** Name: SlotsOption
*Scope: SignUp
*Description:  Displays the available time slots for signing up for an event.  Displays times in 30 minute increments for people to select.
*		Ex: An event time from 1 - 2:30 will display times 1, 1:30, 2, and 2:30.  User can select one a a time to sign up in that 30 min range.
*Pre: Singnup page loaded and an event created and selected
*Post: 30 min signup slot will be selected and used to save signup slots for the event saved in localStorage.
*/
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

/** Name: initialtime
*Scope: SignUp
*Description: Sets the time slot box to --:-- before the box is selected and a time is selected
*		
*Pre: Singnup page loaded
*Post: Signup time box initalized to --:--
*/
function initialtime(){
	var SlotsOption = "<option value =''>--:--</option>";
	document.getElementById("timeslot").innerHTML = SlotsOption;
}

/** Name: Addmember
*Scope: SignUp
*Description:  Adds the member to the signup when all boxes are filled out.  The same name cannot be entered twice for an event slot.  Saves signup to the localStorage.
*		Takes in name of person, event, and event timeslot.		
*Pre: Singnup page loaded, event loaded, and all boxes filled out or selected correctly.
*Post: Name added to signup and signup slot updated with new count as well as overall signup count for the event.
*/
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
/** Name: displayCheckstatus
*Scope: CheckEvent
*Description:  Loads in all events created so far and shows the amount of people signed up for each event.  Breaks down each event into 30 minute blocks to show specifics of 
*		when people have signed up.
*Pre: Check event page loaded
*Post: Displays information for any and all events created so far. 
*/
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
/** Name: LoadeventObj
*Scope: Extra
*Description:  Uses JSON to load in event object from localStorage
*			
*Pre: event object created and stored in localStorage
*Post: event object returned to calling function
*/
function loadeventObj(n){
	var storedValue = localStorage.getItem(n);
	var ob = JSON.parse(storedValue);
	return ob;
}

/** Name: cleanlist
*Scope: Extra
*Description:  Deletes all created events from localStorage
*			
*Pre: None/events created
*Post: event objects deleted
*/
function cleanlist(){
	localStorage.clear();
	alert("All Events Deleted!")
}
//==================================================




















