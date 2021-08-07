module.exports = function(app, logger) {
    app.get('/', function(httpRequest, httpResponse) {
        logger.info("/ endpoint called");
        httpResponse.render('index');
    });
};