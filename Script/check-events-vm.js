window.addEventListener('load', displayCheckstatus, false)

/*
** Name: LoadeventObj
*Scope: Extra
*Description:  Uses JSON to load in event object from localStorage
*
*Pre: event object created and stored in localStorage
*Post: event object returned to calling function
*/
function loadeventObj (n) {
  var storedValue = localStorage.getItem(n)
  var ob = JSON.parse(storedValue)
  return ob
}

/** Name: displayCheckstatus
*Scope: CheckEvent
*Description:  Loads in all events created so far and shows the amount of people signed up for each event.  Breaks down each event into 30 minute blocks to show specifics of
*     when people have signed up.
*Pre: Check event page loaded
*Post: Displays information for any and all events created so far.
*/
function displayCheckstatus () {
  var checkstatus = document.getElementById('checkstatus')
  checkstatus.innerHTML = 'All times shown below are based on 24 hrs format.' + '<br />' + '<br />'
  for (var x = 1; x <= localStorage.length; x++) {
    var N = loadeventObj(x).name
    var D = loadeventObj(x).date
    var ST = loadeventObj(x).starttime
    var ET = loadeventObj(x).endtime
    var M = loadeventObj(x).member
    var TS = loadeventObj(x).slots
    var hr = parseInt(ST.substring(0, 2))
    var min = parseInt(ST.substring(3, 5))
    checkstatus.innerHTML += x + '. Event: ' + N + '. Date: ' + D + '. Time: ' + ST + '-' + ET + '. Member: ' + M + ' (include event creator)' + '<br />'
    for (var i = 0; i < TS.length; i++) {
      if (min == 30) {
        checkstatus.innerHTML += hr + ':30 - ' + (hr + 1) + ':00 have: ' + TS[i] + ' people signed up.' + '<br />'
        min = 0
        hr++
      } else {
        checkstatus.innerHTML += hr + ':00 - ' + hr + ':30 have: ' + TS[i] + ' people signed up.' + '<br />'
        min = 30
      }
    }
  }
}

// =====The functions for other function or test=====
/** Name: LoadeventObj
*Scope: Extra
*Description:  Uses JSON to load in event object from localStorage
*
*Pre: event object created and stored in localStorage
*Post: event object returned to calling function
*/
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
