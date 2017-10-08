//cd Documents/Fall 2017/EECS 448/project_1/
window.addEventListener('load', initialMode, false)
var militaryTime = false

var allTheTasks = []
var numberOfItems = 0
var listItems = 1
var numDates = 0

/** Name: initialMode
*Scope: CreateEvent
*@Description:  Sets the initial time mode of event creation to 24 hour mode and resets numDates for this
* new instance of the page. Then it builds the first date module.
*
*Pre: Event create page loaded
*Post: Time mode initialized to 24 hour mode
*/
function initialMode () {
  numDates = 0
  modeControl()
  buildDateModule()
}

/**
* @Function buildDateModule()
*
* @description Builds a new module for picking another date and times in the event creation, in order to handle
* multi-day events.
*/
function buildDateModule () {
  let module = document.getElementById('time-select-module')

  // create paragraph with text and input for date select
  let paragraph = document.createElement('P')
  let input = document.createElement('INPUT')
  let checkboxdiv = document.createElement('DIV')

  // build paragraph with date selector
  paragraph.appendChild(document.createTextNode('Date:'))
  input.setAttribute('type', 'date')
  input.setAttribute('min', '2017-09-01')
  input.setAttribute('max', '2030-09-01')
  input.setAttribute('id', 'date-' + numDates)
  paragraph.appendChild(input)
  paragraph.appendChild(document.createElement('BR'))

  // build div to hold the checkboxes
  checkboxdiv.setAttribute('id', 'time-selector-' + numDates)
  checkboxdiv.setAttribute('class', 'time-selector')

  module.appendChild(paragraph)
  module.appendChild(checkboxdiv)

  buildCheckBoxes(numDates)
  if (numDates > 0) { buildCopyBlocks(numDates) }
  numDates++
}

/** Name: buildCheckBoxes
*Scope: CreateEVent
*Description: Builds all the html needed for picking event times
*
*Pre: create event page needs to be loaded
*Post: page now has 48 checkboxes
*/
var buildCheckBoxes = function (index) {
  var container = document.getElementById('time-selector-' + index)
  if (militaryTime) {
    container.style.width = '330px'
  } else {
    container.style.width = '370px'
  }
  $('#time-selector-' + index).empty()
  for (var i = 0; i < 48; i++) {
    var label = document.createElement('label')
    label.innerHTML = blocksConversion(i)
    var box = document.createElement('input')
    box.setAttribute('value', i)
    box.setAttribute('id', index + '-block-' + i)
    box.setAttribute('type', 'checkbox')
    label.appendChild(box)
    if ((i + 1) % 4 == 0) { label.appendChild(document.createElement('br')) }
    container.appendChild(label)
  }
}

/**
* @Function buildCopyBlocks(index)
*
* @description this method creates a button that allows the user to copy selected times from a selected
* date.
*
*/
function buildCopyBlocks (index) {
  let module = document.getElementById('time-select-module')

  // create paragraph with text and input for date select
  let paragraph = document.createElement('P')
  let input = document.createElement('select')
  let submitButton = document.createElement('button')

  // build paragraph with date selector
  paragraph.appendChild(document.createTextNode('Copy selected times from date: '))
  input.setAttribute('name', 'dateCopy')
  input.setAttribute('id', 'select-' + index)

  // find out all the current chosen dates and add them as options
  for (let i = 0; i <= numDates - 1; i++) {
    let options = document.createElement('option')
    let currDate = document.getElementById('date-' + i).value
    if (currDate == '') {
      options.setAttribute('value', 'Date ' + (i + 1))
      options.appendChild(document.createTextNode('Date ' + (i + 1)))
    } else {
      options.setAttribute('value', currDate)
      options.appendChild(document.createTextNode(currDate))
    }

    input.appendChild(options)
  }

  submitButton.setAttribute('onclick', 'copyBlocks(' + index + ')')
  submitButton.setAttribute('class', 'button')
  submitButton.appendChild(document.createTextNode('Copy'))

  paragraph.appendChild(input)
  paragraph.appendChild(submitButton)
  paragraph.appendChild(document.createElement('BR'))

  module.appendChild(paragraph)
}

/**
* @Function copyBlocks(index)
*
* @description copyBlocks(index) does the actual copying of selected times from the chosen
* date module to the module whose index is passed in by the parameter
*
*/
function copyBlocks (index) {
  let copyFrom = document.getElementById('select-' + index).value
  let dateSearch

  // find the index of the date module we're copying from
  if (copyFrom.charAt(0) == 'D')  {
    // if the selected choice from the dropdown is of the form "Date #" then that number minus 1 is the index of the date module
    dateSearch = parseInt(copyFrom.substring(5)) - 1
  } else  {
    // otherwise, look for date module with the same date string as the selection
    for (let i = 0; i < numDates; i++)    {
      if (document.getElementById('date-' + i).value == copyFrom)     {
        dateSearch = i
        break
      }
    }
  }

  // now that we know what date to copy to and to copy from, actually copy the time block checkboxes
  for (let i = 0; i < 48; i++)  {
    if (document.getElementById(dateSearch + '-block-' + i).checked)    {
      document.getElementById(index + '-block-' + i).checked = true
    }   else      { document.getElementById(index + '-block-' + i).checked = false }
  }
}

/** Name: Mode Control
*Scope: CreateEvent
*Description:  Controls the time mode for event creation between 12 hour notation and 24 hour notation.
*
*Pre: Event create page loaded
*Post: Time mode changes as based on selection of 12 or 24
*/

function modeControl () {
  var mode = document.getElementById('TimeMode').value
  if (mode == 12) {
    militaryTime = false
    for (let i = 0; i < numDates; i++)      { buildCheckBoxes(i) }
  } else {
    militaryTime = true
    for (let i = 0; i < numDates; i++)      { buildCheckBoxes(i) }
  }
}

/** Name: save
*Scope: CreateEvent
*Description:  Saves the input of the created event into a text document in localStorage for recall into event signup and even status checks
*
*Pre: Event create page loaded, all event creation inputs filled out according to rules of event signup
*Post: Event is saved in localStorage in either a new document if document not created or in a previously created event creation document
*/
function save () {
  var n = document.getElementById('name').value
  var d = []// array for objects with dates and blocks
  var DD = new Date()
  var currentDate = DD.getDate()
  var currentMonth = DD.getMonth() + 1
  var currentYear = DD.getFullYear()
  var blocks = []
  var fillTask = JSON.stringify(allTheTasks);

   // populate dates array with all the dates
  for (let i = 0; i < numDates; i++) {
     let temp = {}
     temp.date = document.getElementById('date-' + i).value

     // initialize blocks to be empty array before looking at what blocks are checked
     temp.blocks = []
     d.push(temp)
  }

   // Check inputs
  if (!n) {
    return console.log('ERROR: missing event name')
  }
  for (let i = 0; i < numDates; i++) {
     if (!d[i].date) {
      return console.log('ERROR: missing at least one event date')
     }
  }

   // for each date object, constructs array of checked boxes
  for (let j = 0; j < numDates; j++) {
     for (var i = 0; i < 48; i++) {
      var box = document.getElementById(j + '-block-' + i)
      if (box.checked) {
    d[j].blocks.push(parseInt(box.value))
      }
     }
  }

   // for each date, check that at least 1 time block is checked
  for (let i = 0; i < numDates; i++) {
     if ((d[i].blocks).length == 0) {
      return console.log('ERROR: no times selected for at least one date')
     }
  }

   // for each date, check that there's no duplicate date among the ones below it
  for (let i = 0; i < numDates - 1; i++) {
    for (let j = i + 1; j < numDates; j++) {
      if (d[i].date == d[j].date)       { return console.log('ERROR: duplicate date chosen') }
    }
  }

   // create event object with data and sends to database, then goes back to homepage
  var event = new Event(n, '[{"name":"John Gibbons","times":' + JSON.stringify(d) + '}]', JSON.stringify(d),fillTask)

  $.ajax({
    url: '/create',
    method: 'POST',
    data: JSON.stringify(event),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      backButton()
    }
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
function backButton () {
  window.history.back()
}


/** Name: saveNewTask
*Scope: CreateEvent
*Description: Saves the task created into an array. It takes a child node and is going to display the tasks on the html document.
*       For everytime that the save task is hit it will clear the entrybox.
*
*Pre: Event create page loaded, all event creation inputs filled out according to rules of event signup
*Post: Event is saved in localStorage in either a new document if document not created or in a previously created event creation document
*/
function saveNewTask(){ 

    var node = document.createElement("ul");
    var newTask =  document.getElementById("TaskList").value;
    allTheTasks[numberOfItems] = new Task(newTask, '');
    newTask = listItems + "- " + newTask;
    var textnode = document.createTextNode(newTask);    //instead of node create an li to create the table method
    node.appendChild(textnode);
    document.getElementById("TaskList1").appendChild(node);
    document.getElementById("TaskList").value = "";
    numberOfItems++;  
    listItems++;
  
}