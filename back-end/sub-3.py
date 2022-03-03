import re
import time
from urllib import request
import paho.mqtt.client as paho
from paho import mqtt
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
from flask_mqtt import Mqtt
import mysql.connector as sql
from datetime import datetime as dt
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
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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

@app.route('/init', methods=['GET'])
def initialize():
    response = jsonify({
        "min": 0,
        "max": 100
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        cursor = mydb.cursor(prepared = True)
        cursor.execute("SELECT * FROM `light` ORDER BY `time` DESC LIMIT 100")
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
    elif request.method == 'POST':
        timestamp = int(request.form.get('time'))
        time_start = dt.fromtimestamp(timestamp / 1000).strftime("%Y-%m-%d %H:%M:%S")
        time_end = min(dt.fromtimestamp(timestamp / 1000 + 30 * 60), dt.now()).strftime("%Y-%m-%d %H:%M:%S")
        print(time_start, time_end)
        cursor = mydb.cursor(prepared = True)
        cursor.execute("SELECT * FROM `light` WHERE time BETWEEN '" + time_start + "' AND '" + time_end + "'")
        all_result = cursor.fetchall()
        my_dict = dict()
        print(len(all_result))
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

@app.route('/200', methods = ['POST', 'GET'])
@cross_origin()
def hello():
    if request.method == 'POST':
        print(request.form.get('min'))
        return str(request.form.get('min')) + ' ' + str(request.form.get('max'))
        # return '123'

if __name__ == '__main__':
    app.run(port=5000, host="0.0.0.0", debug=True)