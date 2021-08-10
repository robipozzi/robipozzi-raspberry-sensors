# Raspberry sensors project - PART 2
- [Introduction](#introduction)
- [Architecture](#architecture)
- [Connect DHT11 sensor to Raspberry](#connect-DHT11-sensor-to-raspberry)
- [Update Python program to read from sensor](#update-python-program-to-read-from-sensor)
- [Consume sensor data with Node](#consume-sensor-data-with-node)


## Introduction
In this second part we will build on Part 1 and extend it to with the following steps:
* Connect a DHT11 sensor to Raspberry Pi;
* Modify **[sensory.py](kafka/sensory.py)** to read data from the sensor;
* Run a Node.js web server to render the data with a simple HTML page and Javascript to continuously update Canvas Gauges charts (https://canvas-gauges.com/) that graphically represent the sensor data on the Web Ui interface.

To access code and scripts for the project, start by cloning this repository 
```
mkdir $HOME/dev
cd $HOME/dev
git clone https://github.com/robipozzi/robipozzi-raspberry-sensors 
cd robipozzi-raspberry-sensors/Part2
```

## Architecture
The overall architecture design is very simple: a Python program runs on a Raspberry board, reads data from a sensor and continuously sends sensor data to a Kafka topic. A web server, implemented in Node.js, consumes data from the Kafka topic and continuously updates a UI via Web Socket.

The logical architecture is sketched below

![](../images/architecture.png)

## Connect DHT11 sensor to Raspberry
[TODO]

## Update Python program to read from sensor
[TODO]

## Consume sensor data with Node
Once Kafka is setup and Python is deployed and runs on Raspberry, data are continuously read from the DHT11 sensor and written to **sensor** Kafka topic, on the other end some application needs to read the data from Kafka and make use of it, and here comes the Node.js component of the architecture.

The overall application logic is implemented in **[app.js](nodejs/app.js)** which basically does the following:
1. Read data from **sensor** Kafka topic: **[sensorConsumer.js](nodejs/sensorConsumer.js)** is responsible for this task, using **kafkajs** (https://kafka.js.org/) to implement the logic to connect and consume data from Kafka topic.
2. Send the data coming from Kafka to the User Interface component via a Web Socket.
3. Render the data with a simple HTML page and Javascript to continuously update Canvas Gauges charts (https://canvas-gauges.com/) that graphically represent the sensor data on the Web Ui interface.

Run **[app-run.sh](ui/nodejs/app/app-run.sh)** shell script to start Node.js application.
```
cd $HOME/dev/windfire-home-automation/ui/nodejs/app
./app-run.sh
```