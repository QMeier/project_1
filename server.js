var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser')

//models

// viewed at http://localhost:8080
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'html');
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/static',express.static(__dirname + '/CSS'));
app.use('/static',express.static(__dirname + '/HTML'));
app.use('/static',express.static(__dirname + '/Script'));
app.use('/static',express.static(__dirname + '/Image'));

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyz6nhx5XT4NyMUp'
});
var base = Airtable.base('app2SkZOQcF0m2jZG');

var port = 8080
app.listen(port);
console.log("App running on port ",port)