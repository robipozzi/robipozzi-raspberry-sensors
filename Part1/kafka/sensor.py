from kafka import KafkaProducer
from colorama import init, Fore, Back, Style
import os
import sys
import json
import time
import random

# ***** Initializes Colorama to format printing
init(autoreset=True)

# ********************************************
# ***** Variables initialization - START *****
# ********************************************
producer = None
caRootLocation='certs/CARoot.pem'
password='password'
# Get environment variables
kafkaBrokers = os.getenv('KAFKA_BROKER')
SSL = os.getenv('SSL')
topic = os.getenv('TOPIC')
# ********************************************
# ****** Variables initialization - END ******
# ********************************************

# *****************************
# ***** Functions - START *****
# *****************************
def simulate_sensor():
    temperature = random.randint(-10, 50)
    humidity = random.randint(0, 100)
    return humidity, temperature
# *****************************
# ****** Functions - END ******
# *****************************

# **********************************
# ***** Main program execution *****
# **********************************
if __name__ == '__main__':
    ###### Initialize Kafka producer
    if (kafkaBrokers == None) :
        print(Style.BRIGHT + 'No KAFKA_BROKER environment variable set, exiting ... ')
        sys.exit(1);
    if (SSL == None) | (SSL == "false"):
        print(Style.BRIGHT + 'Connecting to Kafka Broker without SSL')
        producer = KafkaProducer(bootstrap_servers=kafkaBrokers, value_serializer=lambda v: json.dumps(v).encode('utf-8'))
    else:
        print(Style.BRIGHT + 'Connecting to Kafka Broker with SSL')
        producer = KafkaProducer(bootstrap_servers=kafkaBrokers, value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                                security_protocol='SSL',
                                ssl_check_hostname=False,
                                ssl_cafile=caRootLocation,
                                ssl_password=password)

    while True:
        try:
            print(Style.BRIGHT + 'Simulate sensor reading')
            humidity, temperature = simulate_sensor();
            time.sleep(5)

            if humidity is not None and temperature is not None:
                print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
                ###### Write messages to Kafka topic
                print(Style.BRIGHT + 'Writing message to topic : ' + Fore.GREEN + topic)
                producer.send(topic, {'temperature': temperature,'humidity':humidity})
                producer.flush()
            else:
                print(Style.BRIGHT + Fore.RED + 'Failed to get reading. Try again!')

        except RuntimeError:
                print(Style.BRIGHT + Fore.RED + "RuntimeError, trying again...")
                continue