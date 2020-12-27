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


//Algorithms for gesture detection
    function neelUp(){
        if(handPose.neel[3] && handConfidence > THRESHOLD){
            // checking if up
            fill(0, 0, 255);
            noStroke();
            if(tallest(handPose.neel[3])){
              //  console.log("up");
 
                lastGesture = "neel";
                return true;;
            }
        }
        return false;
    }

    function indexUp(){
        if(handPose.indexFinger[3] && handConfidence > THRESHOLD){      
            fill(0, 255, 0);
            noStroke();
            if(tallest(handPose.indexFinger[3])){
               // console.log("index up");
                lastGesture = "index";
                imageMode(CENTER);
                image(imageArray[imageIndex], handPose.indexFinger[3][0], handPose.indexFinger[3][1]);
                imageMode(CORNER);
                return true;;
            }
        }
        return false;
    }

    function middleUp(){
        if(handPose.middleFinger[3] && handConfidence > THRESHOLD){    
            fill(255, 0, 0);
            noStroke();
            if(tallest(handPose.middleFinger[3])){
                action();
                imageStay();
                return true;;
            }
        }
        return false;
    }

    function action(){
       // call things upon most recent gesture
        if(lastGesture === "index"){
            //  noImage = false;
            console.log("index action");
        } else if (lastGesture === "thumb"){
            // goes to next image
            if(imageIndex == imageArray.length -1){
                console.log("Already at last image") //at final img
            } else {
                imageIndex++;
            }
            console.log("thumb");
        } else if (lastGesture === "neel"){
            // Go to prev img
            console.log("action");
            if(imageIndex ==0){
                console.log("Already at first image")
            } else {
                imageIndex--;
            }
        }else if (lastGesture === "stickyx"){
            noImage = !noImage;
            console.log("stickyx action"); // flips img on and off
        }
        else{
            // no action
        }
        lastGesture = "middle";
        
    }
    
    //gesture for populating img
    function stickyx(){
        if( handPose.indexFinger[3] && handConfidence > THRESHOLD && tallest(handPose.indexFinger[3])){
            
            if(handPose.neel[3]){
                if(handPose.neel[3][1] < handPose.middleFinger[3][1] && handPose.neel[3][1] < handPose.ringFinger[3][1]){
                    pastX = handPose.indexFinger[3][0];
                    pastY = handPose.indexFinger[3][1];
                    lastGesture = "stickyx";
                    return true;
                }
            }
        }
        return false;
    }

    function thumbUp(){
        if(handPose.thumb[3] && handConfidence > THRESHOLD){
            fill(255, 0, 255);
            noStroke();

            if(tallest(handPose.thumb[3])){
                //console.log("thumb up");
                lastGesture = "thumb";
                return true;
            }
        }
        return false;
    }

    
    function tallest(input){   
        if(input[1] <= handPose.thumb[3][1] && input[1] <= handPose.indexFinger[3][1] && input[1] <= handPose.middleFinger[3][1] && input[1] <= handPose.ringFinger[3][1] && input[1] <= handPose.neel[3][1]){
            return true;
        } else {
            return false;
        }
    }


function thumbBase(r) {
    if (handPose.thumb[0] && handConfidence > .80) {
        fill(0, 0, 255);
        noStroke();
    }
}

function thumbFinger(r) {
    if (handPose.thumb[3] && handConfidence > .80) {
        fill(255, 0, 0);
        noStroke();
    }
}

// Tests
