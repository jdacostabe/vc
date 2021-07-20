let img, img2;
let button;
let slider;
let size;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/rendering/global_illumination/SSAOvsRTAO1.webp");
    img2 = loadImage("/vc/docs/sketches/workshops/rendering/global_illumination/SSAOvsRTAO2.webp")
}

function setup() {
    createCanvas(windowWidth-15, windowHeight-21);
    noLoop();

    button = createButton('FullScreen');
    button.attribute('style','box-shadow:inset 0px 1px 0px 0px #000000;\n' +
        '\tborder-radius:6px;\n' +
        '\tborder:1px solid #000000;\n' +
        '\tdisplay:inline-block;\n' +
        '\tcursor:pointer;\n' +
        '\tcolor:#000000;\n' +
        '\tfont-family:Arial;\n' +
        '\tfont-size:15px;\n' +
        '\tfont-weight:bold;\n' +
        '\tpadding:6px 24px;\n' +
        '\ttext-decoration:none;\n' );
    button.position(3, 3);
    button.mousePressed(fullScreen);

    slider = createElement("input");
    slider.id("slider_proof");
    slider.attribute("type", "range");
    slider.attribute('style','width: 400px; height: 60px;' );
    slider.attribute("min", "1");
    slider.attribute("max", "100");
    slider.attribute("value", "1");
    slider.position(200, 550);

    let text1 = createElement('text1', 'SSAO');
    text1.position(170,600);
    text1.style('font-weight', 'bold');
    text1.style('font-size', '30px');
    let text2 = createElement('text2', 'RTAO');
    text2.position(550, 600);
    text2.style('font-weight', 'bold');
    text2.style('font-size', '30px');

    document.getElementById("slider_proof").addEventListener("click", function () {
        size = slider.value();
        console.log(slider.value());
        draw();
    });
}

function draw() {
    img.resize(windowWidth-15, windowHeight-21);
    image(img, 0, 0);
    tint(255, size*2.55);
    img2.resize(windowWidth-15, windowHeight-21);
    image(img2, 0, 0);
    tint(255, 255-(size*2.55));
}

function fullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth-15, windowHeight-21);
}