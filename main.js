//Initializing variables
let video;
let handpose;
let handPoses;
let handPose;
let handConfidence;
let lastGesture = "middle";
let THRESHOLD = 0.80;

//variables declaration for image loading
let imageArray = [];
let counter = 3;
let imageIndex = 0;
let currentImage;
// objects prefactor init
let tree;
let snowman;
let snow;
let holidays;
let noImage = true;
let pastX;
let pastY;

//Preload images
function preload() {
    tree = loadImage("images/tree.gif");
    snowman = loadImage("images/snowman.gif");
    snow = loadImage("images/snow01.gif");
    snowcode = loadImage("images/snowcode.gif");
    presentbox = loadImage("images/presentbox.gif");
    holidays = loadImage("images/happyholidays.gif");

    imageArray = [tree, snowman, snowcode, snow, presentbox, holidays];
}

function setup() {
    
    let canvas = createCanvas(640, 480); // Can be rescaled then change obj.input() of p5.js
    background(0);
    
    video = createCapture(VIDEO);
    video.hide();

    canvas.drop(gotFile);

    //Init handpose model from TF.js
    handpose = ml5.handpose(video, ()=> console.log("Model successfully initialized!"));

    handpose.on("predict", gotHandPoses);
}

function imageStay(){
    // checks variable value & if input is -1 then display no image
    console.log("function called")
    if (noImage){
        // don't display img
        return;
    } else {
        imageMode(CENTER);
        image(imageArray[imageIndex], lastX, lastY);
        imageMode(CORNER);
    }
}

function gotHandPoses(results) {
    handPoses = results;
    if (handPoses.length > 0) {
        handPose = handPoses[0].annotations;
        handConfidence = handPoses[0].handInViewConfidence;
    }
}
