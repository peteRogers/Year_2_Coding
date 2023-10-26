# Year 2 Coding
### [Link to Arduino p5 starter code](https://editor.p5js.org/peterlightspeeder/sketches/cB8mSqMUY)
......
### [Link to acelerometer driving finished code](https://editor.p5js.org/peterlightspeeder/sketches/9LDKMknw7)
......
##### [Link to get P5.SerialControl app](https://github.com/p5-serial/p5.serialcontrol/releases/tag/0.1.2)

#### Use this code as a template to make a connection with the P5.SerialControl app. 

```Javascript
// variable for p5.SerialPort object
let serial;
//variable to hold sensor data from arduino
let sensorA = 0;

function setup() {
  createCanvas(650, 650);
  //sorts out connection to arduino on serial port
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', gotList);
  //when data comes then call gotData function
  serial.on('data', gotData);
}

function draw() {
  text(sensorA, 20, 20);
}

// Called when there is data available from the serial port
function gotData() {
  let currentString = serial.readLine(); // read the incoming data
  trim(currentString); // trim off trailing whitespace
  if (!currentString) return; // if the incoming string is empty, do no more
    //const sensorValues = currentString.split(">");
    if (!isNaN(currentString)) {
      // make sure the string is a number  (i.e. NOT Not a Number (NaN))
      sensorA = parseFloat(currentString);
      //sensorB = parseInt(sensorValues[1]); // save 
      console.log(sensorA);
  }
}

// Got the list of ports
function gotList(thelist) {
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + ' ' + thelist[i]);
  }
  //opens last item in list - should be arduino
  serial.openPort(thelist[thelist.length-1]);
}
```