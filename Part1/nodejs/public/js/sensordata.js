const socket = io();
var temperatureGauge;
var humidityGauge;
//on message 
socket.on('message', function (msg) {
    jsonMsg = JSON.parse(msg);
    var temperature = jsonMsg.temperature;
    var humidity = jsonMsg.humidity;
    temperatureGauge.value=temperature;
    humidityGauge.value=humidity;
});

function initGauge() {
    temperatureGauge = new LinearGauge({
        renderTo: 'temperature-gauge',
        width: 150,
        height: 400,
        units: '°C',
        title: "Temperature",
        value: 26,
        minValue: 0,
        maxValue: 100,
        highlights: [
            {
                "from": 30,
                "to": 100,
                "color": "rgba(200, 50, 50, .75)"
            }
        ],
    }).draw();

    humidityGauge = new RadialGauge({
        renderTo: 'humidity-gauge',
        width: 400,
        height: 400,
        units: '%',
        title: "Humidity",
        value: 37,
        minValue: 0,
        maxValue: 100
    }).draw();
}