var app = require('express')();
const express = require('express')
var server = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
server.listen(process.env.PORT || 3000, () => { console.log("listening to port 3000") });
//server.listen(3000, () => { console.log("listening to port 3000") });



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
});