# Year 2 Coding

#### Creating vectors in an array and shifting them around an array

```Javascript
let points = [];

function setup() {
  createCanvas(400, 400);
  for(var i = 0; i < 20; i ++){
    var v = createVector(width/2, i * 20);
    points.push(v);
  }
}

function draw() {
  background(220);
  fill(0);
  for(var i = 0; i < 20; i ++){  
    ellipse(points[i].x, points[i].y, i*10, 20);
   // text(i, points[i].x, points[i].y); 
  }
  let p = points.pop();
  points.unshift(p);
}
```