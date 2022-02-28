
#include <ESP8266WiFi.h>
#include <Wire.h>
#include <BH1750.h>
#include <PubSubClient.h>
#include <sstream>
#include <cstring>

BH1750 lightMeter;

// WiFi
const char *ssid = "Sát Thủ Đa Tình"; // Enter your WiFi name
const char *password = "19962000";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "esp8266/nhom_12_led_control";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
int value = 0;
#define MSG_BUFFER_SIZE (500)
char msg[MSG_BUFFER_SIZE];

void setup() {
  Serial.begin(9600);
  Wire.begin(D2, D1);
  lightMeter.begin();
  Serial.println(F("BH1750 Test begin"));
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  //connecting to a mqtt broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
      String client_id = "esp8266-client-";
      client_id += String(WiFi.macAddress());
      Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
          Serial.println("Public emqx mqtt broker connected");
      } else {
          Serial.print("failed with state ");
          Serial.print(client.state());
          delay(2000);
      }
  }
  // publish and subscribe
//  client.subscribe(topic);
//  client.publish(topic, "hello emqx");
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
      Serial.print((char) payload[i]);
  }
  Serial.print(" = ");
  if (payload[0] == '0') {
    digitalWrite(D1, LOW);
    Serial.println("Turn off");
  }
  else if (payload[0] == '1') {
    digitalWrite(D1, HIGH);
    Serial.println("Turn on");
  }
  else if (payload[0] == '2') {
    Serial.println("Do nothing");
  }
  Serial.println();
  Serial.println("-----------------------");
}

void loop() {
  float lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");
  std::ostringstream ss;
  ss << lux;
  std::string s(ss.str());
  const char * c = s.c_str();
  client.publish(topic, c);
  delay(2000);
//  client.loop();
//  unsigned long now = millis();
//  if (now - lastMsg > 2000) {
//    lastMsg = now;
//    ++value;
//    snprintf (msg, MSG_BUFFER_SIZE, "hello world #%ld", value);
//    Serial.print("Publish message: ");
//    Serial.println(msg);
//    client.publish(topic, msg);
//  }
}
