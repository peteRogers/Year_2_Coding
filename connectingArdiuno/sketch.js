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