window.addEventListener("load", getEvents, false);

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
  var checkstatus = document.getElementById('checkstatus');
	checkstatus.innerHTML = "All times shown below are based on 24 hrs format."+"<br />"+"<br />";
   $.ajax({
      url: "/events",
      method: "GET",
      dataType: "json",
      success: function(serverEventsArr){
		  for(let i=0;i<serverEventsArr.length;i++)
		  {
			  daysEvents.push(serverEventsArr[i]);
		  }
		drawEvents();
      },
   })
}
getEventsForDay();

function drawEvents(){
   var eventsDiv = document.getElementById('events')
   var events = []
   for(var i=0;i<daysEvents.length;i++)
   {
      events[i] = document.createElement('div')
      events[i].setAttribute('class','event')
      events[i].setAttribute('id',daysEvents[i].id)
      events[i].style.backgroundColor = daysEvents[i].color
      events[i].onclick = function(){expandEvent(this)}
      eventsDiv.appendChild(events[i])
      //add name to elements
      var eventName = document.createElement('div')
      eventName.setAttribute('class','event-name')
      eventName.textContent = daysEvents[i].name
      events[i].appendChild(eventName)


      var eventTime = document.createElement('div')
      eventTime.setAttribute('class','event-time')
      eventTime.textContent = getTimes(daysEvents[i].blocks)
      events[i].appendChild(eventTime)

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

      //add checkbox's for time blocks
      var blocks = daysEvents[i].blocks.split(',')
      for(var j=0;j<blocks.length;j++) {
         var eventsBlocks = []
         eventsBlocks[j] = {}
         eventsBlocks[j].label = document.createElement('label')
         eventsBlocks[j].label.setAttribute('class','block-label')
         //Convert blocks to times here!
         eventsBlocks[j].label.innerHTML = blocksConversion(blocks[j])
         //keep on creating the hmtl
         eventsBlocks[j].input = document.createElement('input')
         eventsBlocks[j].input.setAttribute('type','checkbox')
         eventsBlocks[j].input.setAttribute('name','block'+j)
         eventsBlocks[j].input.setAttribute('value',blocks[j])
         eventsBlocks[j].label.appendChild(eventsBlocks[j].input)
         events[i].appendChild(eventsBlocks[j].label)
         $(".block-label").click(function(e) {
            e.stopPropagation();
         });
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
