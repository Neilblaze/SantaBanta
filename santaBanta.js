let video;
let handpose;
let handPoses;
let handPose;
let handConfidence;

let imageArray = [];
let counter = 3;
let imageIndex = 0;
let noImage = true;
let pastX;
let pastY;

function preload() {
    imageArray = [fredrick, molecules, orbital];
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


//Drag & drop files on top of canvas
function gotFile(file) {
    let img = createImg(file.data);
    img.hide();
    imageArray[counter] = img;
    counter++;
}

function draw() {
    image(video, 0, 0);

    if (handPose) {
        thumbBase(30);
        neelUp(); // prev img
        indexUp(); //show img
        thumbUp();
        middleUp();
    } else{
       // noImage = true;
        console.log("Missing Hand")
    }    
}
