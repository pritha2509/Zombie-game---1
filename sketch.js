var player;
var backgroundImg;
var playerImg,player2;
var bullet;
var edge1,edge2,edge3,edge4;
var bulletImg;
var lifeBar;
var shootSound;
var zombie , zombieImg;
var zombieGroup;
var bulletGroup;
function preload(){
backgroundImg = loadImage("images/background.jpg");
playerImg = loadImage("images/Player.png");
player2 = loadImage("images/Player2.png");
shootSound = loadSound('Gun.mp3.mp3');
bulletImg = loadImage("images/bullet.png");
zombieImg = loadImage("images/zombie.png");
}

function setup() {
  var canvas = createCanvas(displayWidth+1000, 700);

  player = createSprite(150,550,20,20);
  player.scale = 0.3;
  player.addImage(playerImg);

  lifeBar = createSprite(player.x , player.y-120,100,10);
  lifeBar.shapeColor = "RED";
  lifeBar.width = 100;

  edge1 = createSprite(0,350,15,1000);
  edge1.visible = false;

  edge2 = createSprite(2480,350,15,1000);
  edge2.visible = false;

  edge3 = createSprite(displayWidth/2,670,displayWidth*2+1250,10);
  edge3.visible = false;

  zombieGroup = createGroup();
  bulletGroup = createGroup();
}

function draw() {
  background(backgroundImg);
   
   player.collide(edge1);
   player.collide(edge2);
   player.collide(edge3);
   lifeBar.collide(player);
   lifeBar.collide(edge1);
   lifeBar.collide(edge2);
   spawnZombies();
   
   if(zombieGroup.isTouching(bulletGroup)){
     zombieGroup.get(0).destroy();
     bulletGroup.get(0).destroy();
   }
   if(zombieGroup.isTouching(player)){
     lifeBar.width-=5;
     console.log(lifeBar.width);
     text("Life"+ lifeBar.width,player.x , player.y-250);
   }
   if(player.collide(edge3)){
     player.scale = 0.3;
   }
  if(lifeBar.width === 0){
    text("GAME OVER",player.x , 200);
    lifeBar.width = 0;
  }
  if(keyIsDown(RIGHT_ARROW)){
    changePosition(10,0);
    player.addImage(playerImg);
  }
  if(keyIsDown(LEFT_ARROW)){
    changePosition(-10,0);
    player.addImage(player2);
  }
  if(keyIsDown(UP_ARROW)&& player.y>470){
    changePosition(0,-1);
    player.scale -=0.001;
  }
  if(keyIsDown(DOWN_ARROW)){
    changePosition(0,1);
    player.scale +=0.001;
  }
  drawSprites();
}
function changePosition(x,y){
  player.x = player.x+x;
  player.y  = player.y+y
  lifeBar.x = lifeBar.x+x;
  lifeBar.y = lifeBar.y+y;
}
function keyPressed(){
  if(keyCode === 32){
    bullet = createSprite(player.x+50 , player.y-48 , 20,20);
    bullet.addImage(bulletImg);
    bullet.velocityX = 5;
    bullet.scale = 0.2;
    bulletGroup.add(bullet);
    shootSound.play();
  }
}
function spawnZombies(){
  if(World.frameCount%100===0){
    zombie = createSprite(2470,random(480,635),20,20);
    zombie.addImage(zombieImg);
    zombie.velocityX = -4;
    zombie.scale = random(0.35,0.4);
    
    zombieGroup.add(zombie);
  }
}