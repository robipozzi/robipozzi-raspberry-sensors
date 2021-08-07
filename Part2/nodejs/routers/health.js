module.exports = function(app, logger) {
	app.get('/healthz', function(httpRequest, httpResponse) {
        logger.info("/healthz endpoint called");
        httpResponse.json({ response : 'App is healthy !!!'});
    });
};