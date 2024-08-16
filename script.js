const speech = new p5.SpeechRec('en-US', parseResult);
speech.continuous = true;
speech.interimResults = false;

const colors = ['RED', 'GREEN', 'BLUE', 'YELLOW', 'ORANGE', 'PURPLE', 'PINK', 'BLACK', 'WHITE', 'GRAY'];
const rainbowColors = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];
let img;
let showImage = false;
let showRainbow = false;
let showWave = false;
let timer = 0;
let colorIndex = 0;
let rainbowSpeed = 10;
let waveOffset = 0;

function preload() {
  img = loadImage('Never.webp');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  fill(25);

  textSize(48);
  textAlign(CENTER);
  textStyle(BOLDITALIC);
  textFont('"Avenir Next", system-ui, sans-serif');
  text('SAY A COLOR', width / 2, height / 2);
  speech.start();
}

function draw() {
  if (showImage) {
    image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
    if (millis() - timer > 3000) {
      showImage = false;
      background(255);
      text('SAY A COLOR', width / 2, height / 2);
    }
  } else if (showRainbow) {
    if (frameCount % rainbowSpeed === 0) {
      background(rainbowColors[colorIndex]);
      colorIndex = (colorIndex + 1) % rainbowColors.length;
    }
    if (millis() - timer > 3000) {
      showRainbow = false;
      background(255);
      text('SAY A COLOR', width / 2, height / 2);
    }
  } else if (showWave) {
    waveOffset += 0.05;
    for (let y = 0; y < height; y++) {
      let waveColor = color(127 + 127 * sin(waveOffset + y * 0.05), 127 + 127 * sin(waveOffset + y * 0.05 + PI / 2), 127 + 127 * sin(waveOffset + y * 0.05 + PI));
      stroke(waveColor);
      line(0, y, width, y);
    }
    if (millis() - timer > 3000) {
      showWave = false;
      background(255);
      text('SAY A COLOR', width / 2, height / 2);
    }
  }
}

function parseResult() {
  if (speech.resultValue) {
    const result = speech.resultString.toUpperCase();
    console.log('Recognized speech:', result);
    if (result.includes('NEVER GONNA GIVE YOU UP')) {
      showImage = true;
      timer = millis();
      console.log('Displaying image');
    } else if (result.includes('RAINBOW')) {
      showRainbow = true;
      timer = millis();
      console.log('Displaying rainbow colors');
    } else if (result.includes('WAVE')) {
      showWave = true;
      timer = millis();
      console.log('Displaying wave effect');
    } else {
      const color = result.split(' ').pop();
      if (colors.includes(color)) {
        background(color);
        text(color, width / 2, height / 2);
        console.log('Displaying color:', color);
      } else {
        console.log('Color not recognized');
      }
    }
  }
}
