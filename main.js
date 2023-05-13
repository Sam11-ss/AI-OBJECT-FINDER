video="";
status="";
objects=[];
function preload(){
    
}
function setup(){
canvas=createCanvas(480,380);
canvas.center();
video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object(s) detected.";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are : "+objects.length;

            fill("red");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" ,objects[i].x +15,objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            if(objects[i].label==input){
                document.getElementById("status").innerHTML=input + "Found";
            }
            else{
                document.getElementById("status").innerHTML=input + "Not Found";
            }
        }
    }
}  

function gotResult(error, results){
  if (error){
    console.error(error);
  }
  console.log(results);
  objects = results;
}


function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    input=document.getElementById("input_object").value;
}

function modelLoaded(){
    console.log("Model loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}