// Button Example

var mouseUp = 1;
var bFunction = -1;
var frame = 0;

var icon;
var theScanner;
var theScannerMask;
var firstScan;

var scan = 0; // red canner line
var l = 0; // Lines for var
var c = 0; // Columns for var
var t = 0; // scann Thickness for var
var st = 10; // Scann Thickness
var w = 0; // canvers width
var h = 0; // canvers height
var oldPixels = [];
var once = 0;
var capRatY = 0;// capture ratio
var capRatX = 0;// capture ratio
var landscape = 1; 

var fakeScan = 0;
var fakeScanMove = 15;

var slider; // for st = Scann Thickness = speed

function setup() {
  pixelDensity(1);

  mySetup();

  slider = createSlider(1, 100, 10);
  slider.style('width', '250px');
  slider.hide();

}

function draw() {
  p5ButtonSetup();
 
  background(0);

  textSize(14);
  textAlign(LEFT);
    text("Frame " + frame, 5, 20);

    if(frame == 0){

      getLiveVideo();

      // start screen 
      textAlign(CENTER);
      textSize(24);
      fill(255);
      textStyle(BOLD);
      text("Scanner Cam", width/2, height/2 + 120);
      textStyle(NORMAL);
      textSize(16);
      text("tap to start", width/2, height/2 + 180);

      imageMode(CENTER);
      image(icon, width/2, height/2 - 100, 350, 350);

      if(fullscreen()){
        frame = 1;
      }

    }

    if(frame == 1){
      // Setup start Capture
      getLiveVideo();
      frame = 2;
    }

    if(frame == 2){
      // start Capture

      image(theScanner, 0, 0, width, height);

      liveVideo();
      filter('GRAY');

      

      imageMode(CORNER);
      if(landscape == 0){
        fakeScan = fakeScan + fakeScanMove;
        if(fakeScan > height) fakeScanMove = random(-1, -30);
        if(fakeScan < 0) fakeScanMove = random(0, 5);
        if(fakeScanMove == 0){
          fakeScan = 0;
          if(random(50)<=1) fakeScanMove = random(-1, -30);
        }
    
        rectMode(CORNER);
        fill(255, 110);
        rect(0, fakeScan, width, height-fakeScan);
        rectMode(CENTER);
        fill(5, 70);
        rect(width/2, fakeScan-40, width, 180);
        fill(255, 170);
        rect(width/2, fakeScan, width, 8);
        rect(width/2, fakeScan+20, width, 8);
        fill(5, 170);
        rect(width/2, fakeScan+10, width, 8);
        
        image(theScannerMask, 0,0, width, height);
      }else{
        fakeScan = fakeScan + fakeScanMove;
        if(fakeScan > width) fakeScanMove = random(-1, -30);
        if(fakeScan < 0) fakeScanMove = random(0, 5);
        if(fakeScanMove == 0){
          fakeScan = 0;
          if(random(50)<=1) fakeScanMove = random(-1, -30);
        }
        rectMode(CORNER);
        fill(255, 110);
        rect(fakeScan, 0, width-fakeScan, height);
        rectMode(CENTER);
        fill(5, 70);
        rect(fakeScan-40, height/2, 180, height);
        fill(255, 170);
        rect(fakeScan, height/2, 8, height);
        rect(fakeScan+20, height/2, 8, height);
        fill(5, 170);
        rect(fakeScan+10, height/2, 8, height);
        image(theScannerMask1, 0,0, width, height);
      }
      
      p5Button(width/2, height/ 5*4, 180, 40, 24, "Start", 4); 
      scan = 0; 

      loadPixels();
      for(l=0; l<(width*height*4); l++){
        oldPixels[l] = pixels[l];
      }
    }

    if(frame == 3){
      // precessing Capture ----------------------- * * * * * * * * *
      liveVideo();   
      
      loadPixels();

      if(landscape == 1){

        // Scan left to right
        for(c=0; c<h; c=c+1){
          for(t=0; t<st; t++){
            oldPixels[((scan*4)+1+(t*4))+(w*c*4)] = pixels[((scan*4)+1+(t*4))+(w*c*4)];
            oldPixels[((scan*4)+2)+(t*4)+(w*c*4)] = pixels[((scan*4)+2+(t*4))+(w*c*4)];
            oldPixels[((scan*4)+3)+(t*4)+(w*c*4)] = pixels[((scan*4)+3+(t*4))+(w*c*4)];
            oldPixels[((scan*4)+4)+(t*4)+(w*c*4)] = pixels[((scan*4)+4+(t*4))+(w*c*4)];
          }
        }
        
        
        for(c=0; c<h*4; c++){
          for(l=0; l<scan*4; l++){
            pixels[l+(w*c*4)] = oldPixels[l+(w*c*4)];
          }
        }
        
        updatePixels();
        fill(255);
        text(oldPixels.length + " : " + pixels.length, 5, 20);

        stroke(255, 10, 10);
      
        line(scan+1, 0, scan+1, height); 
        scan = scan + st;
        if(scan >= width) {
          frame = 5;
        }
        
      }else{

        // Scan To down
          for(t=w*4*scan; t<(w*4*scan)+(w*4*st); t++){
            oldPixels[t] = pixels[t];
          }
        
        for(c=0; c<w*4*(scan+st); c++){
            pixels[c] = oldPixels[c];
        }
        
        updatePixels();

        fill(255);
        text(oldPixels.length + " : " + pixels.length, 5, 20);
        stroke(255, 10, 10);
        line(0, scan+1, width, scan+1); 
        scan = scan + st;
        if(scan >= height) {
          frame = 5;
        }
      }
    }
    
    if(frame == 5){
      // Save Menue
      capture.stop();
      loadPixels();
      for(l=0; l<(width*height*4); l++){
         pixels[l] = oldPixels[l];
      }
      updatePixels();

      p5Button(width/2, height/ 6, 180, 40, 24, "Save", 8);
      p5Button(width/2, height/ 6*2, 180, 40, 24, "New Scan", 1);
      p5Button(width/2, height/ 6*3, 180, 40, 24, "Settings", 9);
      p5Button(width/2, height/ 6*4, 180, 40, 24, "About", 2);
      p5Button(width/2, height/ 6*5, 180, 40, 24, "Quit", 3);
    }

    if(frame == 6){
      // Main Menue
      p5Button(width/2, height/ 6*1, 180, 40, 24, "New Scan", 1);
      p5Button(width/2, height/ 6*2, 180, 40, 24, "Settings", 9);
      p5Button(width/2, height/ 6*3, 180, 40, 24, "About", 2);
      p5Button(width/2, height/ 6*5, 180, 40, 24, "Quit", 3);
    }

    if(frame == 8){
      // Saveing
      loadPixels();
      for(l=0; l<(width*height*4); l++){
         pixels[l] = oldPixels[l];
      }
      updatePixels();

      saveCanvas();
      frame = 6;
    }

    if(frame == 9){
      // About 
      imageMode(CENTER);
      image(firstScan, width/2, height/2, height*0.79, height);

      textAlign(LEFT);
      textSize(18);
      fill(255);
      textStyle(BOLD);
      text("Scanner Cam", width/2 -200, height/22*1);
      textStyle(NORMAL);
      text("Olaf Val, 2018, Based on Javascript and p5*js", width/2 -200, height/22*2);

      text("The scanner app simulates the scanner process", width/2 -200, height/22*4);
      text("to produce interesting image artifacts. The pixels", width/2 -200, height/22*5);
      text("of the camera sensor will read out deliberately", width/2 -200, height/22*6);
      text("slowly row by row.", width/2 -200, height/22*7);

      text("Inspired by Stefan Mildenbergers", width/2 -200, height/22*12);
      text("SMART SCAN LAB: Thoughts on moving Images", width/2 -200, height/22*13);

      textSize(14);
      text("Photo: The first image ever scanned at the NBS", width/2 -200, height-20);
      text("by Russell A. Kirschs Team 1957", width/2 -200, height-5);

      p5Button(width/2, height/ 22*16, 180, 40, 24, "New Scan", 1);
      p5Button(width/2, height/ 22*18, 180, 40, 24, "Mildenberger", 7);
      p5Button(width/2, height/ 22*20, 180, 40, 24, "Olaf Val", 3);
    }

    if(frame == 15){
      // Settings 
      textAlign(CENTER);
      textSize(24);
      fill(255);
      text("Scanner Speed", width/2, height/12*2);
      slider.show();
      slider.position(width/2 - 200, height/12*3);
      st = slider.value();

      text("Camera Orientation", width/2, height/12*6);
      // p5Button(width/12*5, height/ 7*4, 180, 40, 24, "Selfie", 1);
      fill(155);
      rect(width/12*4, height/ 7*4, 180, 40, 5);
      fill(0);
      text("Selfie", width/12*4, height/ 7*4 + (24 / 3) );
      p5Button(width/12*8, height/ 7*4, 180, 40, 24, "Environment", 1);

      p5Button(width/2, height/ 7*6, 180, 40, 24, "New Scan", 1);
    }else{
      slider.hide();
    }

}

function p5ButtonSetup(){
  if(!mouseIsPressed){
    mouseUp = 0;
  }
}

// x, y, width, width, textSize, text, p5ButtonFunction-Number (starts with 0)
function p5Button(bx, by, bw, bh, bts, bt, bN){

  if(mouseIsPressed){

    if ( (mouseX>bx-bw/2)&&(mouseX<bx+bw/2)&&(mouseY>by-bh/2)&&(mouseY<by+bh/2) ) {
      if(mouseUp == 0) {
        mouseUp = 1;
        if(bN == 0) frame = 5;
        if(bN == 1) frame = 1;
        if(bN == 2) frame = 9;     
        if(bN == 3) window.location.href = "http://www.olafval.de";
        if(bN == 4) frame = 3; 
        if(bN == 7) window.location.href = "http://www.stefanmildenberger.de";
        if(bN == 8) frame = 8;
        if(bN == 9) frame = 15;
      }
      fill(155);
    }else{
      fill(255);

    }
  }else{
    fill(255);
  }

  rectMode(CENTER);
  stroke(180);
  rect(bx, by, bw, bh, 5);

  if(bt != ""){
    textAlign(CENTER);
    textSize(bts);
    noStroke();
    fill(20);
    text(bt, bx, by + (bts / 3) );
  }
}

function getLiveVideo(){
  var constraints = {
    audio: false,
    video: {
      facingMode: "user"
      // facingMode: "environment"
    }
  };
  capture = createCapture(constraints);
  // capture = createCapture(VIDEO);

  capRatX = capture.width / capture.height;
  capRatY = capture.height / capture.width;

  // capture.size(width, width * capRatY);
  capture.hide();

}

function liveVideo(){
  imageMode(CORNER);
  if(width*capRatY < height){
    image(capture, 0, 0, height*capRatX, height);
  } else {
    image(capture, 0, 0, width, width*capRatY); 
  }
}

function liveVideoScanner(){
  imageMode(CORNER);
  if(width*capRatY < height){
    image(capture, width/8, height/8, width/8*6, height/8*6 );
  } else {
    image(capture, width/15, height/15, width, width*capRatY); 
  }
}


function preload() {
  icon = loadImage('RetroCannCam-Icon.png');
  theScanner = loadImage('scanner-002.jpg');
  theScannerMask = loadImage('scanner-003.png');
  theScannerMask1 = loadImage('scanner-004.png');
  firstScan = loadImage('NBS-First-Scanner-Image.jpg');
}

function windowResized() {
  mySetup();
}

function mySetup(){
  // landscape mode or not
  if(windowWidth > windowHeight){
    landscape = 1;
    createCanvas(windowWidth, windowHeight);
  }else{
    landscape = 0;
    createCanvas(windowWidth, windowHeight);
  }
  w = width;
  h = height;
}

function mousePressed() {
  if(frame == 0){
    fullscreen(true);
  }
}