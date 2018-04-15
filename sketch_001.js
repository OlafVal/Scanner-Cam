// Button Example

var mouseUp = 1;
var bFunction = -1;
var frame = 0;
var icon;

var scan = 0;
var l = 0; // Lines for var
var c = 0; // Columns for var
var t = 0; // scann Thickness for var
var st = 3; // Scann Thickness
var w = 0;
var h = 0;
var oldPixels = [];
var once = 0;

function setup() {
  pixelDensity(1);
  // landscape mode only!
  if(windowWidth > windowHeight){
    createCanvas(windowWidth, windowHeight);
  }else{
    createCanvas(windowWidth, windowWidth* 0.56);
  }
  w = width;
  h = height;

  capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();
}

function draw() {
  p5ButtonSetup();
 
  background(255);

  textSize(14);
  textAlign(LEFT);
    text("Frame " + frame, 5, 20);

    if(frame == 0){
      // start screen 
      imageMode(CENTER);
      image(icon, width/2, height/5, 200, 200);
      p5Button(width/2, height/ 5*3, 180, 40, 24, "New Scan", 1);
      p5Button(width/2, height/ 5*4, 180, 40, 24, "About", 2);
    }

    if(frame == 1){
      // start Capture
      imageMode(CORNER);
      image(capture, 0, 0, width, height);  
      p5Button(width/2, height/ 5*4, 180, 40, 24, "Start", 4); 
      scan = 0; 

      loadPixels();
      for(l=0; l<(width*height*4); l++){
        oldPixels[l] = pixels[l];
      }
    }

    if(frame == 2){
      // precessing Capture ----------------------- * * * * * * * * *
      pixelDensity(1);
      imageMode(CORNER);
      image(capture, 0, 0, width, height);   
      
      if(once == 0){
        //once = 1;
        loadPixels();
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
      }

      stroke(255, 10, 10);
      line(scan+1, 0, scan+1, height); 
      scan = scan + st;
      if(scan >= width) {
        frame = 5;
      }
    }
    
    if(frame == 5){
      // Save Menue
      p5Button(width/2, height/ 5, 180, 40, 24, "Save", 0);
      p5Button(width/2, height/ 5*2, 180, 40, 24, "New Scan", 1);
      p5Button(width/2, height/ 5*3, 180, 40, 24, "About", 2);
      p5Button(width/2, height/ 5*4, 180, 40, 24, "Quit", 3);
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
        if(bN == 4) frame = 2; 
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

function preload() {
  icon = loadImage('RetroCannCam-Icon.png');
}