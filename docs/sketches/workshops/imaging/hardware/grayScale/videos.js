let video;
let shaderVideo;
let videofinal;
let interfaz;

let v = 1.0 / 9.0;

let emboss = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]
];

let blurM = [
    [v, v, v],
    [v, v, v],
    [v, v, v]
];

let outline = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
];

let sharpen = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
];

let pred = 1;
let negative = 2;
let luma = 3;
let rgb = 4;

function preload() {
    shaderVideo = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
    video = createVideo("/vc/docs/sketches/fingers.webm");
}

function mousePressed() {
    video.loop();
}

function setup() {
    createCanvas(640, 480, WEBGL);
    noStroke();
    video.hide();
    video.volume(0);

    cam = createCamera();
    cam.setPosition(320, 240, (height / 2) / tan(PI / 6));

    interfaz = createGraphics(640, 480);
    interfaz.fill(255);
    interfaz.textSize(25);
    interfaz.text('Original', 220, 35);
    interfaz.text('Negative', 230, 275);
    interfaz.text('Luma', 520, 35);
    interfaz.text('RGB', 535, 275);

    stroke(255, 255, 255);
    strokeWeight(11);
    line(0, 246, 640, 246);
    strokeWeight(5);
    line(320, 0, 320, 480);

    shader(shaderVideo);
    shaderVideo.setUniform('texture', video);
    shaderVideo.setUniform('verticalOffset', 1 / video.height);
    shaderVideo.setUniform('horizontalOffset', 1 / video.width);
}

function draw() {
    filterVideo(pred, 1);
    filterVideo(negative, 2);
    filterVideo(luma, 3);
    filterVideo(rgb, 4);

    image(interfaz, 0, 0);
}

function filterVideo(grayType, nVideo) {
    shaderVideo.setUniform('grayType', grayType);

    var x0 = (width / 2) * (1 - (nVideo % 2));
    var x1 = (width / 2) * (2 - (nVideo % 2));
    var y0 = (height / 2) * (Math.ceil(nVideo / 2) - 1);
    var y1 = (height / 2) * Math.ceil(nVideo / 2);

    beginShape();
    vertex(x0, y0, 0, 0);
    vertex(x1, y0, 1, 0);
    vertex(x1, y1, 1, 1);
    vertex(x0, y1, 0, 1);
    endShape(CLOSE);
}