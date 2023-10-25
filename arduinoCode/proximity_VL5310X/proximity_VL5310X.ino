#include "Adafruit_VL53L0X.h"

Adafruit_VL53L0X lox = Adafruit_VL53L0X();

void setup() {
  Serial.begin(115200);
  lox.begin();
  // start continuous ranging
  lox.startRangeContinuous();
}

void loop() {
  if (lox.isRangeComplete()) {
    Serial.println(lox.readRange());
  }
}
