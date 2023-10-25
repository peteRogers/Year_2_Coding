
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

//screen setup
#define SCREEN_ADDRESS 0x3D ///< See datasheet for Address; 0x3D for 128x64, 0x3C for 128x32
Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  Serial.begin(9600);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3D);
  display.setTextWrap(false);
  display.setTextColor(SSD1306_WHITE, 0x0000);
  display.setTextSize(2);
}


void loop(){
  
    display.clearDisplay();
    display.setCursor(20, 20);
    
    display.print("hello");
    display.fillRect(0,0, 20, 20, SSD1306_WHITE);
    display.drawLine(0, 0, 128, 64, SSD1306_WHITE);
    display.drawCircle(64, 32, 16, SSD1306_WHITE);
   
    for(int i = 0; i < 64; i = i + 4){
       display.drawCircle(64, 32, i, SSD1306_WHITE);
    }
     display.display();

}



