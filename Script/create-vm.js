window.addEventListener("load", initialMode, false);
var militaryTime = false
<<<<<<< HEAD

var allTheTasks = [];
var numberOfItems = 0;
var listItems =1;
=======
var numDates = 0;
>>>>>>> master
/** Name: initialMode 
*Scope: CreateEvent
*Description:  Sets the initial time mode of event creation to 24 hour mode
*
*Pre: Event create page loaded
*Post: Time mode initialized to 24 hour mode
*/
function initialMode(){
   var mode = document.getElementById("TimeMode").value;
   numDates = 0;
   ModeControl(mode);
}

/**
*	@Function buildDateModule()
*
*	@description Builds a new module for picking another date and times in the event creation, in order to handle
*	multi-day events.
*/
function buildDateModule() {
	let module = document.getElementById("time-select-module");
	
	//create paragraph with text and input for date select
	let paragraph = document.createElement("P");
	let input = document.createElement("INPUT");
	let checkboxdiv = document.createElement("DIV");
	
	//build paragraph with date selector
	paragraph.appendChild(document.createTextNode("Date:"));
	input.setAttribute("type","date");
	input.setAttribute("min","2017-09-01");
	input.setAttribute("max","2030-09-01");
	input.setAttribute("id","date");
	paragraph.appendChild(input);
	paragraph.appendChild(document.createElement("BR"));
	
	//build div to hold the checkboxes
	checkboxdiv.setAttribute("id","time-selector-"+numDates);
	checkboxdiv.setAttribute("class","time-selector");
	
	module.appendChild(paragraph);
	module.appendChild(checkboxdiv);
	
	buildCheckBoxes(numDates);
	numDates++;
}

/** Name: buildCheckBoxes
*Scope: CreateEVent
*Description: Builds all the html needed for picking event times
*
*Pre: create event page needs to be loaded
*Post: page now has 48 checkboxes
*/
var buildCheckBoxes = function(index){
   var container = document.getElementById('time-selector-'+index)
   if(militaryTime){
      container.style.width = '330px'
   }
   else {
      container.style.width = '370px'
   }
   $('#time-selector-'+index).empty()
   for(var i=0;i<48;i++){
      var label = document.createElement('label')
      label.innerHTML = blocksConversion(i)
      var box = document.createElement('input')
      box.setAttribute('value',i)
      box.setAttribute('id','block-'+i)
      box.setAttribute('type','checkbox')
      label.appendChild(box)
      container.appendChild(label)
   }
}

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
      militaryTime = false
      buildDateModule()
   }
   else
   {
      militaryTime = true
      buildDateModule()
   }
}


/** Name: save
*Scope: CreateEvent
*Description:  Saves the input of the created event into a text document in localStorage for recall into event signup and even status checks
*
*Pre: Event create page loaded, all event creation inputs filled out according to rules of event signup
*Post: Event is saved in localStorage in either a new document if document not created or in a previously created event creation document
*/
function save(){
   var n = document.getElementById('name').value;
   var d = document.getElementById('date').value;// min date= now
   var DD = new Date();
   var currentDate = DD.getDate();
   var currentMonth = DD.getMonth()+1;
   var currentYear = DD.getFullYear();
   var chooseYear = parseInt(d.substring(0, 4));
   var chooseMonth = parseInt(d.substring(5, 7));
   var chooseDate = parseInt(d.substring(8, 10));
   var blocks = ''
   var taskList = ''
   //Check inputs
   if(!n){
      return console.log('ERROR: missing event name')
   }
   if(!d){
      return console.log('ERROR: missing event date')
   }
   for(var i=0;i<48;i++){
      var box = document.getElementById('block-'+i)
      if(box.checked){
         if(blocks == ''){
            blocks = box.value
         }
         else{
            blocks = blocks + ',' + box.value
         }
      }
   }
   //takes all the tasks and combines into one task variable.
   for (let k=0;k<numberOfItems;k++)
   {
		taskList = taskList +',' +  allTheTasks[k]
   }
   //check here for the ability to input information to the airtable
   if(blocks == '') {
      return console.log('ERROR: no times selected')
   }
   var event = new Event(n, d, blocks, 'John Gibbons,'+blocks+'__', '[{"date":'+d+',"blocks":['+blocks+']}]',taskList)  

   $.ajax({
      url: '/create',
      method: 'POST',
      data: JSON.stringify(event),
      contentType: 'application/json',
      dataType: "json",
      success: function(data){
        window.history.back();
      },
   })
}
   /**
* @Function backButton()
*
* @description this function takes the user back to the homepage. Technically it takes them to the last page they were on,
* but since this button only appears on sidepages and the sidepages don't point to each other, it functionally takes the user
* back to the homepage.
*
*/
function backButton() {
    window.history.back();
}


/** Name: saveNewTask
*Scope: CreateEvent
*Description:	Saves the task created into an array. It takes a child node and is going to display the tasks on the html document.
*				For everytime that the save task is hit it will clear the entrybox.
*
*Pre: Event create page loaded, all event creation inputs filled out according to rules of event signup
*Post: Event is saved in localStorage in either a new document if document not created or in a previously created event creation document
*/
function saveNewTask(){
	

		var node = document.createElement("ul");
		var newTask =  document.getElementById("TaskList").value;
		allTheTasks[numberOfItems] = newTask;
		newTask = listItems + "- " + newTask;
		var textnode = document.createTextNode(newTask);    //instead of node create an li to create the table method
		node.appendChild(textnode);
		document.getElementById("TaskList1").appendChild(node);
		document.getElementById("TaskList").value = "";
		listItems++;
		numberOfItems++;		
	
}
