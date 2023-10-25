// variable for p5.SerialPort object
let serial;

//variable to hold sensor data from arduino
let sensorA = 0;
let points = [];


function setup() {
  createCanvas(650, 650);
  // create instance of p5.SerialPort
  serial = new p5.SerialPort();
  //checks which serial port arduino is on
  serial.list();
  serial.on('list', gotList);
  // When you some data from the serial port
  serial.on('data', gotData);
  for(var i = 0; i < 250; i ++){
    points.push(createVector(i * 5, height/2 ));
  }

}

function draw() {
  background(0);
  strokeWeight(15);
  stroke(255, 0, 255);
  if(sensorA > 0){
    sensorA = 0;
    for(p in points){
      var dist = abs(points[p].x - width/2);
      points[p].y = (height/2) - (width/2)-dist; 
    }
  }
  noFill();
  beginShape();



  for(p in points){
        curveVertex(points[p].x, points[p].y);
        points[p].y = lerp(points[p].y, height/2, map(abs(points[p].x - width/2), 0, height/2, 0.01, 0.5));
  }
  endShape();
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
      sensorA = 200;
      //sensorB = parseInt(sensorValues[1]); // save 
  }
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