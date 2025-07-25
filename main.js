let col_tg = '#EBECBF';
let col_tg2 = '#8AA565';
let col_s1 = '#508038';
let col_s2 = '#66984D';
let col_p = '#A07A42';
let col_p2 = '#85622E';
let col_f1 = '#FF5C72';
let col_f2 = '#FFD500';

let flowers = [];
let stars = [];
let sabos;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();

  // 星の準備
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      alpha: random(100, 255)
    });
  }

  sabos = min(width, height) / 4;

  flowers = [];

  // 💐 中央サボテンの花
  flowers.push({
    x: 0,
    y: -sabos / 2,
    size: sabos / 3,
    color: col_f2,
    growth: 0,
    isGrowing: false
  });

  // 💐 右サボテンの花（x: width/4 にある → 中心起点で width/4）
  flowers.push({
    x: width / 4+50,
    y: -sabos / 1.2,
    size: sabos / 3,
    color: col_f1,
    growth: 0,
    isGrowing: false
  });

// 左のサボテン：左側花（変わらず）
flowers.push({
  x: -width / 4 -50 - sabos * 0.37,
  y: -sabos * 0.61,
  size: sabos / 3.4,
  color: col_f1,
  growth: 0,
  isGrowing: false
});

// 左のサボテン：右上の花（さらに上から少し右に寄せる）
flowers.push({
  x: -width / 4 -50 + sabos * 0.22,  // ちょい右
  y: -sabos*0.95,              // 少し下げる
  size: sabos / 3.8,
  color: col_f1,
  growth: 0,
  isGrowing: false
});




}



function draw() {
  let h = hour();
  if (h >= 6 && h < 12) {
    background('#FFFAE3'); // 朝
  } else if (h >= 12 && h < 18) {
    background('#CDF1FF'); // 昼
  } else if (h >= 18 && h < 21) {
    drawGradient('#FFD1A6', '#3C1C54'); // 夕方
    fill(255, 80); // 半透明の白
    noStroke();
    rect(width/2, height/2, width, height);
  } else {
    background('#1D1D4A'); // 夜
  
    // ⭐キラキラ星たち
    noStroke();
    for (let s of stars) {
      fill(255, s.alpha);
      ellipse(s.x, s.y, s.size);
      s.alpha += random(-10, 10);
      s.alpha = constrain(s.alpha, 100, 255);
    }
  }
  

  translate(width / 2, height / 1.7);
  noStroke();

  // 1. 花の成長だけ先に更新
  for (let f of flowers) {
    if (f.isGrowing && f.growth < 1) {
      f.growth += 0.02;
    }
  }

  // 2. 花をサボテンより後ろに描く
  push();
  for (let f of flowers) {
    push();
    translate(f.x, f.y);
    scale(constrain(f.growth, 0, 1));
    drawFlower(0, 0, f.size, f.color);
    pop();
  }
  pop();

  // 3. サボテンを上から描く
  drawSabo01(0, 0, sabos);
  drawSabo02(width / 4+50, 0, sabos);
  drawSabo03(-width / 4-50, 0, sabos);


  fill(col_f2);
  strokeWeight(3);
  stroke(col_s1);
  textAlign(CENTER,CENTER);
  textSize(sabos/3.4);
  textFont("Cherry Bomb One");
  text('Tap the cactus!',0,-height/3.4);
}


function drawSabo01(x,y,s){
  push();
  translate(x,y);
  fill(col_s1);
  ellipse(0,0,s*1.05,s);
  fill(col_s2);
  ellipse(0,0,s*0.7,s);
  fill(col_s1);
  ellipse(0,0,s*0.25,s*0.98);
  let num = 20;
  for (let j = 0; j < 360; j+=num) {
    let x = cos(j)*s/2;
    let y = sin(j)*s/2;
    fill(col_tg);
    drawStar(x*1.05,y,s/32,8);
    drawStar(x*0.7,y,s/28,8);
    drawStar(x*0.25,y,s/24,8);
  }
  drawPot(0,0,s);
  pop();

}


function drawSabo02(x,y,s){
  push();
  translate(x,y);

  //枝
  fill(col_s1);
  rect(s/4,-s/3,s*0.5,s*0.2,s/4);
  rect(s/2.4,-s/2.2,s*0.2,s*0.4,s/4);
  fill(col_s2);
  rect(s/4,-s/3,s*0.4,s*0.08,s/6);
  rect(s/2.4,-s/2.1,s*0.08,s*0.35,s/6);
  push();
  scale(-1,1);
  fill(col_s1);
  rect(s/4,-s/12,s*0.5,s*0.2,s/4);
  rect(s/2.4,-s/5,s*0.2,s*0.4,s/4);
  fill(col_s2);
  rect(s/4,-s/12,s*0.4,s*0.08,s/6);
  rect(s/2.4,-s/4.5,s*0.08,s*0.35,s/6);
  pop();
  //枝ここまで
  fill(col_s1);
  rect(0,0,s*0.4,s*1.7,s/4);
  fill(col_s2);
  rect(0,0,s*0.25,s*1.7,s/4);
  fill(col_s1);
  rect(0,0,s*0.1,s*1.7,s/4);
  let num = 7;
  for (let j = -s/8; j < s/7; j+=num) {
    fill(col_tg);
    drawStar(-s/8,j*5,s/30,3);
    drawStar(0,j*6,s/30,3);
    drawStar(s/8,j*5,s/30,3);
  }
  drawStar(s/3.5,-s/3,s/30,3);
  drawStar(s/2.4,-s/2,s/30,3);
  drawStar(-s/3.5,-s/12,s/30,3);
  drawStar(-s/2.4,-s/4,s/30,3);
  drawPot(0,s/5,s*0.8);
  pop();

}


function drawSabo03(x,y,s){
  push();
  translate(x,y);
  
  fill(col_s1);
  ellipse(0,0,s*0.75,s*0.9);
  push();
  rotate(25);
  ellipse(s/6,-s/1.5,s*0.5,s*0.6); 
 push();
  translate(s/6,-s/1.5);
  let num = 8;
  for (let j = 0; j < 360; j+=360/num) {
    let x = cos(j)*s/2;
    let y = sin(j)*s/2;
    fill(col_tg);
    drawStar(x*0.45,y*0.5,s/28,4);
    drawStar(x*0.15,y*0.5,s/28,4);
  }
  pop();
  rotate(-45);
  fill(col_s1);
  ellipse(s/2,-s/1.4,s*0.22,s*0.25);
  ellipse(-s/5,-s/2,s*0.4,s*0.45);
  pop();

  let num2 = 14;
  for (let j = 0; j < 360; j+=360/num2) {
    let x = cos(j)*s/2;
    let y = sin(j)*s/2;
    fill(col_tg);
    drawStar(x*0.6,y*0.9,s/28,4);
    drawStar(x*0.2,y*0.9,s/24,4);
  }
  drawStar(-s/2.5,-s/3.3,s/28,4);
  drawStar(-s/2.1,-s/2.1,s/30,4);
  drawStar(-s/3.5,-s/2,s/30,4);

  drawStar(s/4.4,-s/1.18,s/28,4);

  drawPot(0,0,s);
  pop();

}


function drawPot(x,y,s){
  push();
  translate(x,y);
  beginShape();
  fill(col_p);
  vertex(-s/2.5,s/2.2);
  vertex(s/2.5,s/2.2);
  vertex(s/3.5,s/1.1);
  vertex(-s/3.5,s/1.1);
  endShape(CLOSE);

  beginShape();
  fill(col_p2);
  vertex(-s/2.5,s/2.2);
  vertex(s/2.5,s/2.2);
  vertex(s/2.7,s/1.8);
  vertex(-s/2.7,s/1.8);
  endShape(CLOSE);

  fill(col_p);
  rect(0,s/2-s/16,s,s/10,2);
  pop();
}



function mousePressed() {
  for (let f of flowers) {
    let d = dist(mouseX, mouseY, width/2 + f.x, height/1.7 + f.y);
    if (d < 100) {
      f.isGrowing = true;
    }
  }
}

function drawFlower(x, y, s, col) {
  push();
  translate(x, y);
  fill(col);
  ellipse(0, 0, s * 0.3, s);
  rotate(45);
  ellipse(0, 0, s * 0.3, s);
  rotate(-90);
  ellipse(0, 0, s * 0.3, s);
  pop();
}



// 星
function drawStar(x, y, r, prickleNum) {
  let vertexNum = prickleNum * 2; // 頂点数(トゲの数*2)
  let R; // 中心点から頂点までの距離
  
  push();
  translate(x, y);
  rotate(-90);
  
  beginShape();
  for (let i = 0; i < vertexNum; i++) {
    R = i % 2 == 0 ? r : r / 4;
  
    vertex(R * cos(360 * i / vertexNum), R * sin(360 * i / vertexNum));
  }
  endShape(CLOSE);
  
  pop();
  }

  function drawGradient(col1, col2) {
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(col1), color(col2), inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  function handleTouch(x, y) {
    for (let f of flowers) {
      let d = dist(x, y, width / 2 + f.x, height / 1.7+100 + f.y);
      if (d < sabos / 2) {
        f.isGrowing = true;
      }
    }
  }
  
  function mousePressed() {
    handleTouch(mouseX, mouseY);
  }
  
  function touchStarted() {
    if (touches.length > 0) {
      handleTouch(touches[0].x, touches[0].y);
    }
    return false; // スクロール防止
  }
