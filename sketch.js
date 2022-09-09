var canvas;
var sub;
var badSub,badSubImage,badSubGroup
var edges;
var subImage;
var backgorundImage;
var stoneImage;
var obstacleGroup;
var stationImage;
var station;
var lives = 3;
var torpedoes = 10;
var gameState = "PLAY";
var ammo,ammoImage,ammoGroup;

function preload(){ 
  subImage = loadImage('sub.png')
  backgroundImage = loadImage('sea.jpg')
  stoneImage = loadImage('stone.png')
  stationImage = loadImage('station.png')
  ammoImage = loadImage('ammo.png')
  badSubImage = loadImage('bg.png')
} 

function setup() { 
 canvas = createCanvas(5000,5000); 
 sub = createSprite(200,200,50,50)
 sub.addImage(subImage);
 edges = createEdgeSprites()
 sub.scale = 0.4

 station = createSprite(4500,4500,50,50);
 station.addImage(stationImage);

 obstacleGroup = new Group();
 ammoGroup = new Group();
 badSubGroup = new Group();

 for(var i = 0;i<50;i++){
  x = random(100,5000);
  y = random(100,5000)
  var obstacle = createSprite(x,y,50,50); 
  obstacle.addImage(stoneImage);
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle)
 }
 
} 

function draw() { 
  if(gameState === "PLAY"){
    background(backgroundImage); 
    if(keyDown("right")){
      sub.x = sub.x + 50;
    }
    if(keyDown("left")){
      sub.x = sub.x - 50;
    }
    if(keyDown("down")){
      sub.y = sub.y + 50;
    }
    if(keyDown("up")){
      sub.y = sub.y - 50;
    }

    if(keyDown("space") && torpedoes>0){
      ammo = createSprite(sub.x,sub.y);
      ammo.addImage(ammoImage);
      ammo.scale = 0.2;
      ammoGroup.add(ammo);
      ammo.velocityX = 7;
      torpedoes-=1;
    }
    
    if(frameCount%100 === 0){
      badSub = createSprite(5000,random(0,5000));
      badSub.addImage(badSubImage);
      badSub.scale = 0.9;
      badSub.velocityX = -12;
      badSubGroup.add(badSub);
    }

    textSize(30);
    text('Lives: '+lives, sub.x-100, sub.y-70)
    
    text('Torpedoes: '+torpedoes, sub.x+20, sub.y-70)

    sub.overlap(obstacleGroup,function(collecter,collected){
      lives-=1
      collected.remove();
    })

    sub.overlap(badSubGroup,function(collecter,collected){
      lives-=1
      collected.remove();
    })

    ammoGroup.overlap(obstacleGroup,function(collecter,collected){
      collected.remove();
      ammo.remove();
    })

    ammoGroup.overlap(badSubGroup,function(collecter,collected){
      collected.remove();
      ammo.remove();
    })

    if(lives<=0){
      gameState = 'GAMEOVER'
    }

    if(sub.isTouching(station)){
      gameState = 'WIN'
    }

    sub.bounceOff(edges)
    drawSprites(); 
  }
  
  if(gameState === 'GAMEOVER'){
    text("GAME OVER",sub.x,sub.y+100)
  }
   
  if(gameState === 'WIN'){
    text("MISSION COMPLETE",sub.x,sub.y+100)
  }

}

