# Year 2 Coding

#### Creating vectors in an array and shifting them around an array

```Javascript
let points = [];

function setup() {
  createCanvas(400, 400);
  for(var i = -10; i < 20; i++ ){
      var p = createVector(random(100, 300), i * 100);
      points.push(p);
  }
  strokeWeight(50);
}

function draw() {
  background(255);
  noFill();
  beginShape();
  for(var i = 0; i < points.length; i ++){
    curveVertex(points[i].x, points[i].y);
    points[i].y -= 1;
  }
  endShape();
  if(points[0].y < -1000){
    var p = points.shift();
    p.y = 2000;
    points.push(p);
  }
}
```