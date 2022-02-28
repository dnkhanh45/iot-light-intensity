#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter;


void setup(){
  Serial.begin(9600);
//  pinMode(D0, OUTPUT);
//  pinMode(D3, OUTPUT);
//  pinMode(D4, OUTPUT);
//  pinMode(D5, OUTPUT);
//  pinMode(D6, OUTPUT);
//  pinMode(D7, OUTPUT);
//  pinMode(D8, OUTPUT);
//  digitalWrite(D0, HIGH);
//  digitalWrite(D3, HIGH);
//  digitalWrite(D4, HIGH);
//  digitalWrite(D5, HIGH);
//  digitalWrite(D6, HIGH);
//  digitalWrite(D7, HIGH);
//  digitalWrite(D8, HIGH);
  // Initialize the I2C bus (BH1750 library doesn't do this automatically)
  Wire.begin(D2, D1);
  // On esp8266 you can select SCL and SDA pins using Wire.begin(D4, D3);
  // For Wemos / Lolin D1 Mini Pro and the Ambient Light shield use Wire.begin(D2, D1);
  lightMeter.begin();
  Serial.println(F("BH1750 Test begin"));
}


void loop() {
  float lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");
//  digitalWrite(D0, LOW);
//  digitalWrite(D3, LOW);
//  digitalWrite(D4, LOW);
//  digitalWrite(D5, LOW);
//  digitalWrite(D6, LOW);
//  digitalWrite(D7, LOW);
//  digitalWrite(D8, LOW);
  delay(1000);
  lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");
//  digitalWrite(D0, HIGH);
//  digitalWrite(D3, HIGH);
//  digitalWrite(D4, HIGH);
//  digitalWrite(D5, HIGH);
//  digitalWrite(D6, HIGH);
//  digitalWrite(D7, HIGH);
//  digitalWrite(D8, HIGH);
  delay(1000);
}
