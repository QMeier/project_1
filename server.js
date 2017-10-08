var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var bodyParser = require('body-parser')

// models

// viewed at http://localhost:8080
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'html')
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.use('/CSS', express.static(__dirname + '/CSS'))
app.use('/HTML', express.static(__dirname + '/HTML'))
app.use('/Script', express.static(__dirname + '/Script'))
app.use('/models', express.static(__dirname + '/models'))
app.use('/assets', express.static(__dirname + '/Image'))
console.log(app.routes)

// app.get('//HTML/CreateEvent.html', function (req, res,next) {
//    res.sendFile(path.join(__dirname + "/admin.html"));
//    app.use(function(req, res, next) {
//       next();
//    });
// })

var Airtable = require('airtable')
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'key3aAov6nCuefMUX'
})
var base = Airtable.base('appv0XuVYZCSh5sX0')

app.post('/create', function (req, res, next) {
  base('Events').create({
    'Name': req.body.name,
    'People': req.body.people,
	 'Times': req.body.timesObjects,
	'Tasks': req.body.tasks
  }, function (err, record) {
    if (err) { console.error(err); return }
    res.send(record)
  })
})

/**
*	@Function		eachPage && "/admin/events"
*	Each page is just a singular HTML file that will hold all of the events for said day. It takes
*	the record of the information and the following day as parameters. It will then display
*	this information within the HTML page.
*
*	@pre		records-information based on the events
*			fetchNextPage- gets the next day of the month to make a clickable link.
*	@post		no return
*	@version	1.0
*	@since		September 17, 2017
*
*/

app.get("/events", function(req,res,next){
   var eventsArr = [];
   base('Events').select({
         view: "Grid view"
   }
   ).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record) {
               record.fields.Id = record.id
               eventsArr.push(record.fields);
         });
      fetchNextPage();
      }, function done(err) {
         if (err) { console.error(err); return; }
         res.send(eventsArr);
         next()
         })
})

var port = 8080
app.listen(port)
console.log('App running on port ', port)
