
var militaryTime = false;
var eventsFromDB = []

/** Name: displayCheckstatus
*Scope: CheckEvent
*Description:  Loads in all events created so far and shows the amount of people signed up for each event.  Breaks down each event into 30 minute blocks to show specifics of
*     when people have signed up.
*Pre: Check event page loaded
*Post: Displays information for any and all events created so far.
*/

// =====The functions for other function or test=====
/** Name: LoadeventObj
*Scope: Extra
*Description:  Uses JSON to load in event object from localStorage
*
*Pre: event object created and stored in localStorage
*Post: event object returned to calling function
*

/**
*	@Function	getEventsForDay
*	This function takes a date as a parameter. This function which came from stackoverflow,
*	takes said date, and verifies that there is indeed valid information from the date.
*
*	@pre	 	Date - takes a date as the input of the function
*	@post		a composed date via just date, month, and the year of the event.
*	@since	September 17, 2017
*
*/

var getEvents = function(){
   $.ajax({
      url: "/events",
      method: "GET",
      dataType: "json",
      success: function(serverEventsArr){
        eventsFromDB = serverEventsArr
		    drawEvents();
      },
   })
}

window.addEventListener('load', getEvents(), false)


function drawEvents(){
  $('#events').empty()
   var eventsDiv = document.getElementById('events')
   var events = []
   // FOR EVERY EVENt
   for(var i=0;i<eventsFromDB.length;i++)
   {
      
      events[i] = document.createElement('div')
      events[i].setAttribute('id',eventsFromDB[i].Id)
      events[i].setAttribute('class','event')
      events[i].style.backgroundColor = eventsFromDB[i].color
      eventsDiv.appendChild(events[i])
      //add name to elements
      var eventName = document.createElement('div')
      eventName.setAttribute('class','event-name')
      eventName.textContent = eventsFromDB[i].Name
      events[i].appendChild(eventName)

    //get date and times
    eventsFromDB[i].Times = JSON.parse(eventsFromDB[i].Times)

    //FOR EVERY DATE 
    for(var j=0;j<eventsFromDB[i].Times.length;j++){
        var dateBlockContainer = document.createElement('div')
        dateBlockContainer.setAttribute('id', eventsFromDB[i].Times[j].date) 
        


        var eventDate = document.createElement('div')
        eventDate.setAttribute('class','event-date')
        eventDate.textContent = eventsFromDB[i].Times[j].date
        events[i].appendChild(eventDate)

        var eventTime = document.createElement('div')
        eventTime.setAttribute('class','event-time')

          eventTime.textContent = getTimes(eventsFromDB[i].Times[j].blocks)
          events[i].appendChild(eventTime)

          //CHECKBOX FOR TIMESWITIN DATES
          for(var t=0;t<eventsFromDB[i].Times[j].blocks.length;t++){

            var eventsBlocks = []
             eventsBlocks[j] = {}
             eventsBlocks[j].label = document.createElement('label')
             eventsBlocks[j].label.setAttribute('class','block-label')
             //Convert blocks to times here!
             eventsBlocks[j].label.innerHTML = blocksConversion(eventsFromDB[i].Times[j].blocks[t])
             //keep on creating the hmtl
             eventsBlocks[j].input = document.createElement('input')
             eventsBlocks[j].input.setAttribute('type','checkbox')
             eventsBlocks[j].input.setAttribute('name','block'+j)
             eventsBlocks[j].input.setAttribute('value',eventsFromDB[i].Times[j].blocks[t])
             eventsBlocks[j].label.appendChild(eventsBlocks[j].input)
             dateBlockContainer.appendChild(eventsBlocks[j].label)
             $(".block-label").click(function(e) {
                e.stopPropagation();
             });
          }
          events[i].appendChild(dateBlockContainer)
    }

      

      //FOR EVERY EVENT CREATE THE THING AND CHECK IF IT IS FULFILLED
        var completeTasks = document.createElement('div')
          completeTasks.setAttribute('class','complete-tasks')
          

        var incompleteTasks = document.createElement('div')
          incompleteTasks.setAttribute('class','incomplete-tasks')
          

      if(eventsFromDB[i].Tasks){
        var taskTitle = document.createElement('div')
        taskTitle.setAttribute('class', 'event-task-title')
        taskTitle.textContent = "Tasks"
        events[i].appendChild(taskTitle)

        eventsFromDB[i].Tasks = JSON.parse(eventsFromDB[i].Tasks)
        for(var j=0;j<eventsFromDB[i].Tasks.length;j++){

          var taskLabel = document.createElement('label')
          if(eventsFromDB[i].Tasks[j].person == ""){
            taskLabel.setAttribute('class','task-label-incomplete')  
            taskLabel.innerHTML = eventsFromDB[i].Tasks[j].name

            var cb = document.createElement('input')
            cb.setAttribute('type','checkbox')
            cb.setAttribute('value',eventsFromDB[i].Tasks[j].name)
            taskLabel.appendChild(cb)
            incompleteTasks.appendChild(taskLabel)

          }
          else{
            taskLabel.setAttribute('class','task-label-complete')   
            taskLabel.innerHTML = (eventsFromDB[i].Tasks[j].name + " - " + eventsFromDB[i].Tasks[j].person)
            completeTasks.appendChild(taskLabel)
          }
          events[i].appendChild(completeTasks)
          events[i].appendChild(incompleteTasks)
        }  
      }
      
      

      // NAME TEXTBOX
      var usersName = document.createElement('input')
      usersName.setAttribute('class','event-users-name')
      usersName.setAttribute('type','text')
      usersName.setAttribute('placeholder','Enter Your Name')
      events[i].appendChild(usersName)
      //prevents the click handler on parent element
      $(".event-users-name").click(function(e) {
         e.stopPropagation();
      });

      var submitBtn = document.createElement('button')
      submitBtn.setAttribute('class','user-submit-btn')
      submitBtn.textContent = 'Sign Up'
      events[i].appendChild(submitBtn)
      $(".user-submit-btn").click(function(e) {
            e.stopPropagation();
      });

      var viewAttendeesBtn = document.createElement('button')
      viewAttendeesBtn.setAttribute('class','user-submit-btn')
      viewAttendeesBtn.textContent = 'View Attendees'
      events[i].appendChild(viewAttendeesBtn)
      $(".user-submit-btn").click(function(e) {
            e.stopPropagation();
      });
      viewAttendeesBtn.onclick = function() {
        showAttendeesForEvent(this.parentElement)
      }
      //add onclick to submite btn and handle a submission
      submitBtn.onclick = function(){
         addUserToEvent(this.parentElement)
      }
    }
  }

var updateTaskList = function(element) {
  var tasks = []
  var selectedTaskNames = []
  var children = element.childNodes
  var tasksDiv = element.getElementsByClassName('incomplete-tasks')

  for(var i=0;i<eventsFromDB.length;i++){
    if(eventsFromDB[i].Id == element.id){
      tasks = eventsFromDB[i].Tasks
    }
  }

  if(tasksDiv.length > 0){
    var uncompletedTasks = tasksDiv[0].childNodes
    for(var i=0;i<uncompletedTasks.length;i++){
      if(uncompletedTasks[i].childNodes[1].checked == true){
        selectedTaskNames.push(uncompletedTasks[i].childNodes[0].textContent)
      }
    }

    //now actually make the field for DB

    for(var i=0;i<tasks.length;i++){
      for(var j=0;j<selectedTaskNames.length;j++){
        if(selectedTaskNames[j] == tasks[i].name){
          tasks[i].person = children[children.length-3].value
        }
      }
    }
    // tasks = JSON.stringify(tasks)
    updateEventTaskList(tasks, element.id)
  }
}

var addUserToEvent = function(element) {

  var children = element.childNodes
  if(children[children.length-3].value == ''){
  return console.log('error: must enter your name')
 }
  var people = {
    name: children[children.length-3].value,
    times: []
  } 

   //get updated fields
  var dateBlocks = []
  for(var i=0;i<children.length;i++){
    if(children[i].id){
      dateBlocks.push(children[i])
    }
  }
  //for every date
  for(var i=0;i<dateBlocks.length;i++){
    var datesTimes = {}
    datesTimes.date = dateBlocks[i].id
    var blocks = []
    //get Checked Times for that date
    for(var j=0;j<dateBlocks[i].childNodes.length;j++){
      if(dateBlocks[i].childNodes[j].childNodes[1].checked){
        blocks.push(parseInt(dateBlocks[i].childNodes[j].childNodes[1].value))
      }
    }
    datesTimes.blocks = blocks
    people.times.push(datesTimes)
  }
  var isInputValid = 0
  for(var i=0;i<people.times.length;i++){
    if(people.times[i].blocks.length > 0 ){
      isInputValid += people.times[i].blocks.length
    }
  }
  if(isInputValid == 0){
    return(console.log('error: must sign up for at least 1 time block'))
  }
  updateEvent(people, element.id)
  return(updateTaskList(element))
}

var showAttendeesForEvent = function(element){
  if($('.attendee-container')){
    $('.attendee-container').remove()
  }
  var attendees;
  for(var i=0;i<eventsFromDB.length;i++){
    if(eventsFromDB[i].Id == element.id){
      attendees = eventsFromDB[i].People
    }
  }
  attendees = JSON.parse(attendees)
  console.log(attendees)

  var attendeeDiv = document.createElement('div')
  attendeeDiv.setAttribute('class','attendee-container')
  element.appendChild(attendeeDiv)

  //display people!
  for(var i=0;i<attendees.length;i++){
    var attendee = document.createElement('div')
    attendee.setAttribute('class','attendee')
    attendee.textContent = attendees[i].name
    attendeeDiv.appendChild(attendee)

    var attendeeTimes = attendees[i].times
    //for every date
    for(var j=0;j<attendeeTimes.length;j++){
      var spacer = document.createElement('div')
      attendee.appendChild(spacer)

      var blocksDate = document.createElement('span')
      blocksDate.setAttribute('class','attendee-date')
      blocksDate.textContent = attendeeTimes[j].date
      attendee.appendChild(blocksDate)

      var blocks = document.createElement('span')
      blocks.setAttribute('class','attendee-blocks')
      blocks.textContent = getTimes(attendeeTimes[j].blocks)
      attendee.appendChild(blocks)
    }
  }
} 

/**
* @Function updateEvent
* This function sends information from the html document to the airTable database
* to be updated with the information
* 
* @pre    data - information to be updated at the database..  
* @post   none
* @since  September 17, 2017
*
*/

var updateEvent = function(data, id){
   var url = 'http://localhost:8080/event/'+id
   $.ajax({
      url: url,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: "json",
      success: function(data){
        window.location.href = '../'
      },
   })
}

var updateEventTaskList = function(data, id){
   var url = 'http://localhost:8080/tasklist/'+id
   $.ajax({
      url: url,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: "json",
      success: function(data){
        window.location.href = '../'
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
var backButton = function() {
  window.history.back()
}
