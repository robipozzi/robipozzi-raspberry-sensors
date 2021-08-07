// ***** Add required modules
var express = require('express');
var socket = require('socket.io');
var logger = require('./utils/logger');
// ***** Initialize application
var app = express();
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');
// Setup static file serving
app.use(express.static(process.cwd() + '/public'));
app.use(express.json());
// ***** Routers setup
require("./routers/health")(app, logger);
require("./routers/index")(app, logger);
// ***** Run server
var PORT = 8082;
var server = app.listen(PORT, function() {
	logger.info("Current working directory = " + process.cwd());
	logger.info("Application is listening on port " + PORT);
});
// ***** Web Socket
const io = socket(server);
// ***** Start Kafka consumer
const sensorConsumer = require("./sensorConsumer");
sensorConsumer(io);