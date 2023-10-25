// variable for p5.SerialPort object
let serial;

let cx = 0;
let moveTo = 0;


function setup() {
 
  createCanvas(500, 500);
  // create instance of p5.SerialPort
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', gotList);
  // When you some data from the serial port
  serial.on('data', gotData);
  cx = width/2;
  moveTo = width/2;
  
}

function draw() {
  background(0);
  cx = lerp(cx, moveTo, 0.2);
  ellipse(cx, height/2, 50, 50);
  
  
}



// Got the list of ports
function gotList(thelist) {
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console

    print(i + ' ' + thelist[i]);
  }
 // console.log(thelist[thelist.length-1])
  serial.openPort(thelist[thelist.length-1]);
 
}

// Called when there is data available from the serial port
function gotData() {
  let currentString = serial.readLine(); // read the incoming data
  trim(currentString); // trim off trailing whitespace
  console.log(currentString);
  if (!currentString) return; // if the incoming string is empty, do no more
    if(currentString == "right"){
      console.log("yep");
      moveTo = width;
    }
    if(currentString == "left"){
      console.log("yep");
      moveTo = 0;
    }
    const sensorValues = currentString.split(">");
    if (!isNaN(sensorValues[0])) {
      // make sure the string is a number  (i.e. NOT Not a Number (NaN))
      sensorA = parseFloat(sensorValues[0])*2.5;
      //sensorB = parseInt(sensorValues[1]); // save 

    
  }
}
