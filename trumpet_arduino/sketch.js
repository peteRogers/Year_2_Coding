let midi; // for store midi json
let current = 0; // current position in track
let notes; // for notes array
let osc;

//variables for data from arduino
let serial;
let sensorA = 0;
let sensorB = 0;
let preb = 0;

function preload() {
  // converted with http://tonejs.github.io/Midi/
  midi = loadJSON('test.json');
}


function setup() {
  createCanvas(600, 600);
  // get notes of first track (instrument) in midi
  notes = midi.tracks[0].notes; 
  strokeWeight(3);
  strokeCap(ROUND)
  osc = new p5.Oscillator('sawtooth');
  //Serial connection setup code
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', gotList);
  serial.on('data', gotData);
}

function draw() {
  background(220);
  push()
    translate(width-current, 0); // start from right of canvas
    for(let n of notes) {
      // start position of note
      let x = n.ticks;
      // length of note
      let len = n.durationTicks; 
      // y position is midi note (0-127) mapped to height of canvas
      let y = map(n.midi, 0, 127, height, 0);
      // draw note 
      stroke(255,0,0)
      line(x,y, x+len, y);
    }
  pop();
  // update position
  current++;
  fill(255)
  stroke(0)
  // draw the cursor thing
  line(100,0, 100, height); 
  ellipse(100, sensorA, 30,30)
  
  
  if(sensorB == 0) {
    // map position of mouse (0-height) to midi note (0-127)
    let midi = map(sensorA, height,0, 0,127);
    // convert midi to frequency
    let note = midiToFreq(midi);
    // set freq
    osc.freq(note, 0.1);
    fill(0)
    ellipse(100, sensorA+5, 10,random(4,7))
    ellipse(100-5, sensorA-4, 3,0.5)
    ellipse(100+5, sensorA-4, 3,0.5)
  } else {
    ellipse(100-5, sensorA-4, 3,5)
    ellipse(100+5, sensorA-4, 3,5)
    ellipse(100, sensorA+5, 10,2)
  }
}

function mousePressed() {
  userStartAudio();
}

// Got the list of ports
function gotList(thelist) {
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + ' ' + thelist[i]);
  }
  console.log(thelist[thelist.length-1])
  serial.openPort(thelist[thelist.length-1]);
}

// Called when there is data available from the serial port
function gotData() {
  let currentString = serial.readLine(); // read the incoming data
  trim(currentString); // trim off trailing whitespace
  if (!currentString) return; // if the incoming string is empty, do no more
  const sensorValues = currentString.split(">");
  if (!isNaN(sensorValues[0])) {
    // make sure the string is a number  (i.e. NOT Not a Number (NaN))
    sensorA = parseFloat(sensorValues[0])*2.5;
    sensorB = parseInt(sensorValues[1]); // save the currentString to use for the text position in draw()
    //console.log(sensorA,sensorB);
    //check to see if the button value has changed if so either play or stop the osc
    if(preb != sensorB){
      if(sensorB == 0){
        osc.start();
      }
      else{
        osc.stop();
      }
      preb = sensorB;
    }
  }
}
