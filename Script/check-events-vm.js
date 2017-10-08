
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
   for(var i=0;i<eventsFromDB.length;i++)
   {
      
      events[i] = document.createElement('div')
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

    for(var j=0;j<eventsFromDB[i].Times.length;j++){
        var eventDate = document.createElement('div')
        eventDate.setAttribute('class','event-date')
        eventDate.textContent = eventsFromDB[i].Times[j].date
        events[i].appendChild(eventDate)

        var eventTime = document.createElement('div')
        eventTime.setAttribute('class','event-time')

          eventTime.textContent = getTimes(eventsFromDB[i].Times[j].blocks)
          events[i].appendChild(eventTime)

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
             events[i].appendChild(eventsBlocks[j].label)
             $(".block-label").click(function(e) {
                e.stopPropagation();
             });
          }
    }
      

      //user's name textbox
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
      submitBtn.textContent = 'Submit'
      events[i].appendChild(submitBtn)
      $(".user-submit-btn").click(function(e) {
            e.stopPropagation();
      });
      //add onclick to submite btn and handle a submission
      submitBtn.onclick = function(){
         addUserToEvent(this.parentElement)
         clearEventFields(this.parentElement)
      }
    }
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
