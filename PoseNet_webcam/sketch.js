

let video;
let poseNet;
let poses = [];

// variable for p5.SerialPort object
let serial;


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
   // create instance of p5.SerialPort
   serial = new p5.SerialPort();
   //checks which serial port arduino is on
   serial.list();
   serial.on('list', gotList);
   // When you some data from the serial port
   serial.on('data', gotData);
 

}

function modelReady() {
  select("#status").html("Model Loaded");
}

function draw() {
  image(video, 0, 0, width, height);
  try{
    //console.log(poses[0].pose.nose.x);
    ellipse(poses[0].pose.nose.x, height/2, 20, 20);
    let outString = ""+round(poses[0].pose.nose.x)+"\n";
    serial.write(outString);
    
  }catch(err) {
    console.log(err);
  }
  
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    // For each pose detected, loop through all the keypoints
    const pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i += 1) {
    const skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
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