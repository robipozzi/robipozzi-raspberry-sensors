const { Kafka } = require('kafkajs');

module.exports = async function consume(io) {
  const config = require('./kafkaConfig');
  const fs = require('fs-extra');
  // Instantiating kafka
  const topic = config.kafka_topic;
  console.log("Instantiating Kafka with:");
  console.log("   --> Kafka Brokers: " + config.brokers);
  console.log("   --> Client ID: " + config.clientId);
  console.log("   --> Kafka Topic: " + topic);
  const kafka = new Kafka({
    clientId: config.clientId,
    brokers: config.brokers,
    ssl: {
      rejectUnauthorized: true,
      ca: [fs.readFileSync('certs/ca.crt', 'utf-8')],
    }
  });
  // Creating Kafka Consumer
  const consumer = kafka.consumer({ groupId: 'home-sensor' });
  // Asynchronously running Kafka Consumer
  const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} - ${message.value}`)
        io.sockets.emit('message', message.value.toString())
      },
    })
  };
  // Run
  run().catch(e => console.error(`[sensor/consumer] ${e.message}`, e));

  // Error management
  const errorTypes = ['unhandledRejection', 'uncaughtException'];
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  errorTypes.map(type => {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`)
        console.error(e)
        await consumer.disconnect()
        process.exit(0)
      } catch (_) {
        process.exit(1)
      }
    })
  });

  signalTraps.map(type => {
    process.once(type, async () => {
      try {
        await consumer.disconnect()
      } finally {
        process.kill(process.pid, type)
      }
    })
  });
}