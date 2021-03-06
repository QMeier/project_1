window.addEventListener('load', displaySignUp, false)
window.addEventListener('load', EventOption, false)

// var keyS = 1;
// var keyE = 1.5;
// var keyT = 0;

// /** Name: displaySignUp
// *Scope: SignUp
// *Description:  Displays the available events for signup by drawing in from the localStorage and displaying on the page
// *     Will show dates and times ranges and amount of people signed up.  Will show nothing if no events available.
// *Pre: Singnup page loaded
// *Post: Any and all created events are listed out for the user to see
// */
function displaySignUp () {
  var Eventlist = document.getElementById('Eventlist')
  Eventlist.innerHTML = 'We are ready have following event(s):' + '<br />' + '<br />'
  for (var x = 1; x <= localStorage.length; x++) {
    var N = loadeventObj(x).name
    var D = loadeventObj(x).date
    var ST = loadeventObj(x).starttime
    var ET = loadeventObj(x).endtime
    var M = loadeventObj(x).member
    Eventlist.innerHTML += x + '. Event: ' + N + '. Date: ' + D + '. Time(24hrs): ' + ST + '-' + ET + '. Member: ' + M + '<br />'
  }
  sessionStorage.setItem(1, 'test1')
  sessionStorage.setItem(1.5, 'test2')
  sessionStorage.setItem(0, 'test3')
}

/** Name: EventOption
*Scope: SignUp
*Description:  Displays the available events for signup by drawing in from the localStorage and displaying in a dropdown list for the user to select to see times available for signup
*     Will show an empty drop box if no events available.
*Pre: Singnup page loaded
*Post: Any and all created events are listed out for the user to see
*/
function EventOption () {
  var eventOption = "<option value ='0'>select</option>"
  for (var x = 1; x <= localStorage.length; x++) {
    var N = loadeventObj(x).name
    eventOption += "<option value= '" + x + "'>" + N + '</option>'
  }
  document.getElementById('eventoption').innerHTML = eventOption
}

/** Name: SlotsOption
*Scope: SignUp
*Description:  Displays the available time slots for signing up for an event.  Displays times in 30 minute increments for people to select.
*     Ex: An event time from 1 - 2:30 will display times 1, 1:30, 2, and 2:30.  User can select one a a time to sign up in that 30 min range.
*Pre: Singnup page loaded and an event created and selected
*Post: 30 min signup slot will be selected and used to save signup slots for the event saved in localStorage.
*/
function SlotsOption (eventoption) {
  var n = document.getElementById(eventoption).value
  if (n > 0) {
    var SlotsOption
    var storedValue = localStorage.getItem(n)// get string event
    var ob = JSON.parse(storedValue)// get event object
    var st = ob.starttime
    var slotsArray = ob.slots
    var hr = parseInt(st.substring(0, 2))
    var min = parseInt(st.substring(3, 5))
    for (var x = 0; x < slotsArray.length; x++) {
      if (min == 30) {
        SlotsOption += "<option value= '" + x + "'>" + hr + ':30' + '</option>'
        min = 0
        hr++
      } else {
        SlotsOption += "<option value= '" + x + "'>" + hr + ':00' + '</option>'
        min = 30
      }
         // slotsArray[x]=0;
    }
    localStorage.setItem(n, JSON.stringify(ob))
    document.getElementById('timeslot').innerHTML = SlotsOption
  } else {
    SlotsOption = "<option value =''>--:--</option>"
    document.getElementById('timeslot').innerHTML = SlotsOption
  }
}

/** Name: initialtime
*Scope: SignUp
*Description: Sets the time slot box to --:-- before the box is selected and a time is selected
*
*Pre: Singnup page loaded
*Post: Signup time box initalized to --:--
*/
function initialtime () {
  var SlotsOption = "<option value =''>--:--</option>"
  document.getElementById('timeslot').innerHTML = SlotsOption
}

/** Name: Addmember
*Scope: SignUp
*Description:  Adds the member to the signup when all boxes are filled out.  The same name cannot be entered twice for an event slot.  Saves signup to the localStorage.
*     Takes in name of person, event, and event timeslot.
*Pre: Singnup page loaded, event loaded, and all boxes filled out or selected correctly.
*Post: Name added to signup and signup slot updated with new count as well as overall signup count for the event.
*/
function Addmember (name, eventoption, timeslot, tasksAll) {
  var Student = document.getElementById(name).value
  var n = document.getElementById(eventoption).value
  var Slotnumber = document.getElementById(timeslot).value
  var listItem = document.getElementById(TaskList).value

  if (Student != '' && n != 0 && Slotnumber != '') {
      // the same person can sign up mutiple event or same event at different time
    keyS = keyS + 1
    keyE = keyE + 1
    keyT = keyT - 1
    sessionStorage.setItem(keyS, Student)
    sessionStorage.setItem(keyE, n)
    sessionStorage.setItem(keyT, Slotnumber)

    var storedValue = localStorage.getItem(n)
    var ob = JSON.parse(storedValue)
      // The same person cannot sign one event at same timeslot twice
    if (sessionStorage.getItem(keyS) == sessionStorage.getItem(keyS - 1) && sessionStorage.getItem(keyE) == sessionStorage.getItem(keyE - 1) && sessionStorage.getItem(keyT) == sessionStorage.getItem(keyT + 1)) {
      alert('You cannot sign an event at same time twice.')
    } else if (sessionStorage.getItem(keyS) == sessionStorage.getItem(keyS - 1) && sessionStorage.getItem(keyE) == sessionStorage.getItem(keyE - 1)) {
      ob.slots[Slotnumber] += 1
      localStorage.setItem(n, JSON.stringify(ob))
      alert('Sign up successfully.')
    } else {
      ob.member += 1
      ob.slots[Slotnumber] += 1
      localStorage.setItem(n, JSON.stringify(ob))
      alert('Sign up successfully.')
    }

      // document.getElementById(name).value ="";
  } else if (n == 0) {
    alert('Please select a event.')
  } else if (Slotnumber == '') {
    alert('Please select a Time.')
  } else {
    alert('Please enter your name.')
  }
  displaySignUp()
}

function loadeventObj (n) {
  var storedValue = localStorage.getItem(n)
  var ob = JSON.parse(storedValue)
  return ob
}

/**
* @Function backButton()
*
* @description this function takes the user back to the homepage. Technically it takes them to the last page they were on,
* but since this button only appears on sidepages and the sidepages don't point to each other, it functionally takes the user
* back to the homepage.
*
*/
function backButton () {
  window.history.back()
}
