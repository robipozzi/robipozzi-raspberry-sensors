const log4js = require('log4js');
const appName = require('../package').name;
const logger = log4js.getLogger(appName);
logger.level = require('../package').loggerLevel;
// Functions
function debug(msg) {
	logger.debug(msg);
}
function info(msg) {
	logger.info(msg);
}
function warn(msg) {
	logger.warn(msg);
}
function error(msg) {
	logger.error(msg);
}

exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.error = error;