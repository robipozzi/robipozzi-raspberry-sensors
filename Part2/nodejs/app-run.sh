### Install required modules with NPM
npm install
### Run Node.Js application
KAFKA_BOOTSTRAP_SERVER=robipozzi-kafka-kafka-tls-bootstrap-openshift-operators.robipozzi-rhocp-420022-3c76f4d12b7fe02f9cab56e64bec3e29-0000.eu-de.containers.appdomain.cloud:443 \
KAFKA_SENSOR_TOPIC=sensor \
npm start