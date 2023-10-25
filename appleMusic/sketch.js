// variable for p5.SerialPort object
let serial;

let sensorA = 10;
let imgs = [];
function setup() {
 
  createCanvas(800, 800);
  // create instance of p5.SerialPort
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', gotList);
  // When you some data from the serial port
  serial.on('data', gotData);
  //getSongData();
  getWeather();
  //img = loadImage("https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3e/a3/bd/3ea3bdc0-8e1d-33be-d615-3dd6304d6cb8/Cover.jpg/100x100bb.jpg");
}

function draw() {
  background(0);
  fill(255);
  ellipseMode(CENTER);
  ellipse(width/2, height/2, sensorA, sensorA);
  fill(255, 0, 0);
  text(""+sensorA, 20,20);
  let x = 0;
  let y = 0;
  for (let im of imgs){
    image(im, x, y,  200, 200);
    x = x + 200;
    if(x > width){
      x = 0; 
      y = y + 200;
    }
  }

  
}

function getSongData(){
  let url = "https://itunes.apple.com/search?term=snow&entity=song"
  let songs = loadJSON(url, listSongs);

  
}

function getWeather(){
  let weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=51.44&longitude=-0.0010&daily=temperature_2m_max,precipitation_probability_max,weathercode&timezone=GMT&forecast_days=1"
  let weather = loadJSON(weatherURL, listWeather);
}

function listWeather(weather){
  console.log(weather);
  console.log(weather.daily.weathercode[0]);
}

function listSongs(songs) {
  console.log(songs);
  console.log(songs.results[0].artistName);
  console.log(songs.results[0].artworkUrl100);
  for(let song of songs.results){
    img = loadImage(song.artworkUrl100);
    imgs.push(img)
  }
 // img = loadImage(songs.results[0].artworkUrl100);
  //console.log(songs[0].collectionCensoredName);

}



// Got the list of ports
function gotList(thelist) {
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console

    print(i + ' ' + thelist[i]);
  }
  console.log(thelist[thelist.length-1])
  serial.openPort(thelist[thelist.length-1]);
 
}

// Called when there is data available from the serial port
function gotData() {
  let currentString = serial.readLine(); // read the incoming data
  trim(currentString); // trim off trailing whitespace
  if (!currentString) return; // if the incoming string is empty, do no more
  //console.log(currentString);
  if (!isNaN(currentString)) {
    // make sure the string is a number (i.e. NOT Not a Number (NaN))
    sensorA = currentString; // save the currentString to use for the text position in draw()
  }
}
