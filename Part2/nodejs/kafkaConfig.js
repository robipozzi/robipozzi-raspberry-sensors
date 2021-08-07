module.exports = {
    clientId: 'sensor',
    kafka_topic: process.env.KAFKA_SENSOR_TOPIC,
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
    connectionTimeout: 3000,
    authenticationTimeout: 1000,
    reauthenticationThreshold: 10000,
};