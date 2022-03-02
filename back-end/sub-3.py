import time
import paho.mqtt.client as paho
from paho import mqtt
from flask import Flask, render_template, jsonify
from flask_mqtt import Mqtt
import mysql.connector as sql
import json
import datetime

mydb = sql.connect(
    host = 'localhost',
    user = 'root',
    password = '251120',
    database = 'iot'
)

app = Flask(__name__, template_folder='./templates', static_folder='./static')
app.config['MQTT_BROKER_URL'] = 'broker.emqx.io'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = 'emqx'
app.config['MQTT_PASSWORD'] = 'public'
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds
mqtt = Mqtt(app)

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    mqtt.subscribe('esp8266/nhom_12_led_control', qos=0)

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    print(message.topic + " " + str(message.qos) + " " + str(message.payload))
    # data = json.loads(message.payload)
    # print(data)
    mycursor = mydb.cursor()
    sql = "INSERT INTO `light` (`time`, `intensity`) VALUES (%s, %s)"
    key = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    val = (key, float(message.payload))
    mycursor.execute(sql, val)
    mydb.commit()

@app.route('/', methods=['GET'])
def home():
    """

    """
    # return render_template('index.html')
    cursor = mydb.cursor(prepared = True)
    cursor.execute("SELECT * FROM `light` ORDER BY `time` DESC LIMIT 50")
    all_result = cursor.fetchall()
    my_dict = dict()
    for record in all_result[::-1]:
        my_dict[str(record[0])] = {
            "1. open": record[1],
            "2. high": record[1],
            "3. low": record[1],
            "4. close": record[1]
        }
    response = jsonify({"Time Series (1min)": my_dict})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(port=5000)
    # client.subscribe("esp8266/nhom_12_led_control", qos=1)
    # client.loop_forever()