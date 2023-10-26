let wd = [];
let ws = [];
let v;

let inc = 5;

function setup(){
  createCanvas(800,800);
  getWeather();
  v = createVector(width/2, height/2);
  stroke(0);
  background(255, 0,0)
}



function draw(){
  background(255);
  for(let i = 0; i < ws.length; i ++){
    let x2 = v.x + (ws[i]/30.0) * cos(radians(wd[i]));
    let y2 = v.y + (ws[i]/30.0) * sin(radians(wd[i]));
    line(v.x, v.y, x2, y2);
    v.x = x2
    v.y = y2
}

v = createVector(width/2, height/2);
 
}

function getWeather(){
  let weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=0.01&hourly=windspeed_10m,winddirection_10m&past_days=92"
  let weather = loadJSON(weatherURL, listWeather);
 
}

function listWeather(weather){
  console.log(weather);
 // console.log(weather.hourly.winddirection_10m);
  wd = weather.hourly.winddirection_10m;
  ws = weather.hourly.windspeed_10m;


}