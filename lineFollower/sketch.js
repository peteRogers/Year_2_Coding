let vl = [];
let speed = -4;
let xpos = 0;

function setup() {
  createCanvas(400, 800);
  for(var y = -height; y < height; y = y + 150){
     vl.push(createVector(random(0, width), y));
  }
  strokeWeight(70);
  xpos = width/2;
}

function draw() {
  background(0, 255,0);
  strokeWeight(70);
  stroke(0);
  for(var p = 0; p < vl.length-1; p++){
    line(vl[p].x, vl[p].y, vl[p+1].x, vl[p+1].y);
    vl[p].y += speed;
  }
 
  if(vl[0].y < -height){
     vl.shift();
     vl.push(createVector(random(width/2 - 100,width / 2 + 100), height));
  }
  let colorPick = get(xpos, height/2);
  
  if(colorPick[1] == 255 && colorPick[0] == 0){
    let c = lerp(0, speed, 0.08);
    speed -= c;
    if(speed > 0){
      speed = 0;
    }
  }else{
      speed += -0.005;
    }
    fill(255, 0, 0);
    noStroke();
    rect(xpos, height/2, 40, 40);
    if(keyIsDown(LEFT_ARROW)){
      xpos --;
    }
    if(keyIsDown(RIGHT_ARROW)){
      xpos ++;
    }
  
}
