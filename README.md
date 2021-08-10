# Raspberry sensors project
- [Introduction](#introduction)
- [Architecture](#architecture)
- [Part 1](#part-1)
- [Part 2](#part-2)

## Introduction
The concept of this project is to use sensors connected to a Raspberry Pi board and continuously get, visualize and manage data from the sensors.

Initially, a DHT11 sensor is used to get Temperature and Humidity data points.

## Architecture
The overall architecture design is very simple: a Python program runs on a Raspberry board, reads data from a sensor and continuously sends sensor data to a Kafka topic. A web server, implemented in Node.js, consumes data from the Kafka topic and continuously updates a UI via Web Socket.

The logical architecture is sketched below

![](images/architecture.png)

These are the macro activities and steps to take to actually implement this logical architecture:
1. Connect DHT11 sensor to Raspberry Pi board.
2. Deploy a Kafka cluster (the code in this repository assumes OpenShift as the target infrastructure).
3. Get the TLS certificate from Kafka and generate PEM files to securely connect to Kafka.
4. Deploy Python program to Raspberry Pi.
5. Deploy Node.js server to run Home Automation UI component.

## Part 1
In this first part we will concentrate on Kafka setup and how to send data from Raspberry Pi to a Kafka cluster using a Python program; we will go through the following steps:
* Deploy a Kafka cluster, using Red Hat AMQ Streams Operator available on Red Hat Openshift;
* Get the TLS certificate from Kafka and generate PEM files to securely connect to Kafka;
* Deploy a Python program to Raspberry Pi to send data to Kafka (data will be simulated, then in a future article we will build on this and get real data from DHT11).

[Go Here](Part1/README.md) for instructions.

## Part 2
In this second part we will build on Part 1 and extend it to with the following steps:
* Connect a DHT11 sensor to Raspberry Pi;
* Modify **[sensor.py](Part2/kafka/sensor.py)** to read data from the sensor;
* Run a Node.js web server to render the data with a simple HTML page and Javascript to continuously update Canvas Gauges charts (https://canvas-gauges.com/) that graphically represent the sensor data on the Web Ui interface.

[Go Here](Part2/README.md) for instructions.