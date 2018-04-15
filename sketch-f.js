// Button Example

var mouseUp = 1;
var bFunction = -1;
var frame = 0;

var icon;
var firstScan;
var scannIt;
var infoIt;
var setIt;
var goFull;
var noFull;
var turnCam;

var scan = 0; // red canner line
var l = 0; // Lines for var
var c = 0; // Columns for var
var t = 0; // scann Thickness for var
var st = 10; // Scann Thickness
var w = 0; // canvers width
var h = 0; // canvers height
var oldPixels = [];
var once = 0;
var ratio = 4;
var capRatY = 0;// capture ratio
var capRatX = 0;// capture ratio
var landscape = 1; 

var slider; // for st = Scann Thickness = speed

function setup() {
  pixelDensity(1);

  mySetup();

  slider = createSlider(1, 100, 10);
  slider.style('width', '200px');
  slider.hide();

}

function draw() {
  p5ButtonSetup();
 
  background(0);

  textSize(14);
  textAlign(LEFT);
  text("Frame " + frame, 5, 20);

    if(frame == 0){
      // start screen 
      background(250);

      imageMode(CENTER);
      textAlign(CENTER);
      if(landscape == 1){
        textSize(width/20);
        image(icon, width/2, height/9*2, width/3, width/3);
      }else{
        textSize(height/20);
        image(icon, width/2, height/9*2, height/3, height/3);
      }
      fill(5);
      textStyle(BOLD);
      text("Scanner Cam", width/2, height/9*5);

      if(landscape == 1){
        textSize(width/30);
      }else{
        textSize(height/30);
      }
      textStyle(ITALIC);
      text("tap to switch camera", width/2, height/9*6);
      textStyle(NORMAL);
      text("[sorry! ..not running on iOS!]", width/2, height/9*8);



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
      liveVideo();
      
      if(landscape == 1){
        fill(0);
        noStroke();
        rectMode(CORNER);
        rect(0, 0, width/15*1, height); // left bakground
        rect(width/15*14, 0, width/15*1, height); // right bakground
        p5Button(width/30*29, height/10*1, width/20, width/20, 24, "", 25); // settings
        p5Button(width/15*14, height/2, width/10, width/10, 24, "", 4); // start scan
        p5Button(width/30*29, height/10*9, width/20, width/20, 24, "", 19); // info - about
        p5Button(width/30*1, height/10*1, width/20, width/20, 24, "", 35); // turn cam
        imageMode(CENTER);
        image(setIt, width/30*29, height/10*1, width/20, width/20);
        image(scannIt, width/15*14, height/2, width/10,width/10);
        image(infoIt, width/30*29, height/10*9, width/20,width/20);
        image(turnCam, width/30*1, height/10*1, width/20,width/20);
        if(fullscreen()){
          image(noFull, width/30*1, height/10*9, width/25,width/25);
          p5Button(width/30*1, height/10*9, width/20, width/20, 24, "", 31); // full screen
        }else{
          p5Button(width/30*1, height/10*9, width/20, width/20, 24, "", 30); // full screen
          image(goFull, width/30*1, height/10*9, width/25, width/25);
        }
      } else {
        fill(0);
        noStroke();
        rectMode(CORNER);
        rect(0, 0, width, height/15*1); // top bakground
        rect(0, height/15*14, width, height/15*1); // right bakground
        p5Button(width/10*9, height/30*29, height/20, height/20, 24, "", 25); // settings
        p5Button(width/2, height/15*14, height/10, height/10, 24, "", 4); // start scan
        p5Button(width/10*1, height/30*29, height/20, height/20, 24, "", 19); // info - about
        p5Button(width/10*9, height/30*1, height/20, height/20, 24, "", 35); // trun-cam
        imageMode(CENTER);
        image(setIt, width/10*9, height/30*29, height/20, height/20);
        image(scannIt, width/2, height/15*14, height/10,height/10);
        image(infoIt, width/10*1, height/30*29, height/20,height/20);
        image(turnCam, width/10*9, height/30*1, height/20,height/20);
        if(fullscreen()){
          image(noFull, width/10*1, height/30*1, height/25,height/25);
          p5Button(width/10*1, height/30*1, height/20, height/20, 24, "", 31); // full screen
        }else{
          p5Button(width/10*1, height/30*1, height/20, height/20, 24, "", 30); // full screen
          image(goFull, width/10*1, height/30*1, height/25,height/25);
        }
      }
       
      scan = 0; 

      /*
      // Ruler
      textSize(14);
      textAlign(LEFT);
      text("capRatX " + capRatX, 5, 20);
      text("capRatY " + capRatY, 5, 40);
      */

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

        // fill(255);
        // text(oldPixels.length + " : " + pixels.length, 5, 20);

        stroke(255);
      
        line(scan+1, 0, scan+1, height); 
        scan = scan + st;
        if(scan >= width) {
          frame = 5;
        }
        
      }else{
        
        for(t=w*4*scan; t<(w*4*scan)+(w*4*st); t++){
        oldPixels[t] = pixels[t];
      }
      
        
        
        for(c=0; c<w*4*(scan+st); c++){
            pixels[c] = oldPixels[c];
        }
        
        updatePixels();

        fill(255);
        // text(oldPixels.length + " : " + pixels.length, 5, 20);
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

      p5Button(width/2, height/ 6*4, 180, 40, 24, "Save", 8);
      p5Button(width/2, height/ 6*5, 180, 40, 24, "New Scan", 1);
    }

    if(frame == 8){
      // Saveing
      loadPixels();
      for(l=0; l<(width*height*4); l++){
         pixels[l] = oldPixels[l];
      }
      updatePixels();

      saveCanvas();
      frame = 1;
    }

    if(frame == 19){
      // About to New Scan
      imageMode(CENTER);
      image(firstScan, width/2, height/2, height*0.79, height);

      textAlign(LEFT);
      textSize(14);
      fill(255);
      textStyle(BOLD);
      text("Scanner Cam", width/2 -160, height/22*1);
      textStyle(NORMAL);
      text("Olaf Val, 2018, Based on Javascript and p5*js", width/2 -160, height/22*2);

      text("The scanner app simulates the scanner process", width/2 -160, height/22*4);
      text("to produce interesting image artifacts. The pixels", width/2 -160, height/22*5);
      text("of the camera sensor will read out deliberately", width/2 -160, height/22*6);
      text("slowly row by row.", width/2 -160, height/22*7);

      text("Inspired by Stefan Mildenbergers", width/2 -160, height/22*9);
      text("SMART SCAN LAB: Thoughts on moving Images", width/2 -160, height/22*10);

      textSize(14);
      text("Photo: The first image ever scanned at the NBS", width/2 -160, height-25);
      text("by Russell A. Kirschs Team 1957", width/2 -160, height-10);

      p5Button(width/2, height/ 22*12, 180, 40, 24, "Mildenberger", 7);
      p5Button(width/2, height/ 22*15, 180, 40, 24, "Val", 3);
      p5Button(width/2, height/ 22*18, 180, 40, 24, "New Scan", 1);
    }

    if(frame == 15){
      // Settings - Menue
      textAlign(CENTER);
      textSize(24);
      fill(255);
      text("Scanner Speed", width/2, height/12*1);
      slider.show();
      slider.position(width/2 - 100, height/12*2);
      st = slider.value();

      text("Aspect Ratio", width/2, height/12*4);
      if(ratio == 4){
        p5Button(width/2, height/ 12*5, 180, 40, 24, "16:9", 11);
      } else {
        p5Button(width/2, height/ 12*5, 180, 40, 24, "4:3", 12);
      }

    }else{
      slider.hide();
    }

    if(frame == 25){
      // Settings - New Scan
      textAlign(CENTER);
      textSize(24);
      fill(255);
      text("Scanner Speed", width/2, height/12*1);
      slider.show();
      slider.position(width/2 - 100, height/12*2);
      st = slider.value();

      text("Aspect Ratio", width/2, height/12*4);
      if(ratio == 4){
        p5Button(width/2, height/ 12*5, 180, 40, 24, "16:9", 11);
      } else {
        p5Button(width/2, height/ 12*5, 180, 40, 24, "4:3", 12);
      }

      p5Button(width/2, height/ 12*11, 180, 40, 24, "New Scan", 1);
    }else{
      slider.hide();
    }

    if(frame == 30){
        background(250);

      textAlign(CENTER);
      fill(5);
      textStyle(ITALIC);
      textSize(28);
      text("tap to go fullscreen!", width/2, height/2 + 180);

      if(fullscreen()){
        frame = 1;
      }
    }

    if(frame == 31){
      fullscreen(false);
      frame = 1;
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
        if(bN == 10) frame = 6;
        if(bN == 11) ratio = 16;
        if(bN == 12) ratio = 4;
        if(bN == 19) frame = 19;
        if(bN == 25) frame = 25;
        if(bN == 30) frame = 30; // go fullScreen
        if(bN == 31) frame = 31; // exit fullScreen
        if(bN == 35) window.location.href = "https://olafval.de/scanner-cam/index-b.html";
      }
      fill(155);
    }else{
      fill(255);

    }
  }else{
    fill(255);
  }

  if(bt != ""){
    rectMode(CENTER);
    stroke(180);
    rect(bx, by, bw, bh, 5);
  
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

  if(ratio == 4){
    capRatX = 0.75;
    capRatY = 1.333;
  }
  if(ratio == 16){
    capRatX = 0.5625;
    capRatY = 1.333;
  }
  /*
  dose not work?!
  capRatX = capture.width / capture.height;
  capRatY = capture.height / capture.width;
  */
  capture.hide();

}

function liveVideo(){
  imageMode(CORNER);
  //if(width*capRatY < height){
  if(width < height){
    // portrait mode
    image(capture, 0, 0, height*capRatX, height);
  } else {
    // landscape mode
    image(capture, 0, 0, width, width*capRatX); 
  }
}

function preload() {
  icon = loadImage('RetroCannCam-Icon.png');
  firstScan = loadImage('NBS-First-Scanner-Image.jpg');
  scannIt = loadImage('start-scan.png');
  setIt = loadImage('settings.png');
  infoIt = loadImage('Info-icon.png');
  goFull = loadImage('fullscreen.png');
  noFull = loadImage('exit.png');
  turnCam = loadImage('turn-cam.png');
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

  if(frame == 30){
    fullscreen(true);
  }

}