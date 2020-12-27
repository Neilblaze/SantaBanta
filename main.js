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
