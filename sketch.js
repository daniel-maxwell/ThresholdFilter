var imgIn;
var threshholdSlider;

function preload() {
    imgIn = loadImage("Assets/image.jpeg");
}

function setup() {
    createCanvas(imgIn.width * 2, imgIn.height);
    background(255);
    pixelDensity(1);
    threshholdSlider = createSlider(0, 255, 127);
    threshholdSlider.position(10, 10);
}

function draw() {
    image(imgIn, 0, 0);
    image(thresholdFilter(imgIn), imgIn.width, 0); 
}

function thresholdFilter(img) {
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();

    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            var index = (x + y * img.width) * 4;

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];

            var gray = (r + g + b) / 3;

            if (gray > threshholdSlider.value()) {
                gray = 255;
            } else {    
                gray = 0;
            }

            imgOut.pixels[index + 0] = gray;
            imgOut.pixels[index + 1] = gray;
            imgOut.pixels[index + 2] = gray;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}
