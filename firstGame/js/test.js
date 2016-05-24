/**
 * Created by Mpoe on 5/17/2016.
 */
var stage;
var friendlyBullets =[];
var hostileBullets=[];
var enemies =[];
var shotsFired=0;
var hero;
var bulletSpeed =3;
var level =1;
var speed=5000-level*100;
var lives =3;
var gameIsRunning=true;
var queue;
var autoStart=true;
var preloadText, livesText, gameOverText, levelText;
var timer=0;
var fps=60;

function setUp(){
    stage = new createjs.Stage("spaceShooter");
    preloadText = new createjs.Text("Loading", "30px Verdana", "#000");
    preloadText.textBaseline="middle";
    preloadText.textAlign="center";
    preloadText.x=stage.canvas.width/2;
    preloadText.y=stage.canvas.height/2;
    stage.addChild(preloadText);

    queue = new createjs.LoadQueue(autoStart);
    queue.on('progress', progress);
    queue.on('complete', init);

    queue.loadManifest(
        [
            "img/player.png",
            "img/enemyShip.png",
            "img/laserGreen.png",
            "img/laserRed.png",
            "img/Background/spaceBG800.jpg"
        ]
    );
}

function progress(e){
    var percent = Math.floor(Math.round(e.progress*100));
    console.log(percent);
    preloadText.text = "Loading: "+percent+"%";
    stage.update()
}

function init(){
    stage.removeChild(preloadText);
    var canvas = document.querySelector("canvas");

    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener("tick", onTick);
    window.addEventListener('click', shoot);
    canvas.addEventListener("mousemove",move);

    var bg = new createjs.Bitmap("img/Background/spaceBG800.jpg")
    stage.addChild(bg);

    livesText = new createjs.Text("Lives: "+lives, "30px Verdana", "#FFF");
    stage.addChild(livesText);

    hero = new createjs.Bitmap("img/player.png");
    hero.width=99;
    hero.height=75;
    hero.x =stage.canvas.width/2-75/2;
    hero.y =stage.canvas.height-hero.height-20;
    stage.addChild(hero);

    addEnemy(level*50);
}

function onTick(e) {
    if (gameIsRunning) {
        timer++;
        bulletMove();
        checkCollisions();
        var rand = Math.floor(Math.random() * 10000);
        if (rand < 100) {
            enemyShoot(enemies[Math.floor(Math.random() * enemies.length)])
        }
        enemyDrop();
    }
    stage.update(e);
}

function addEnemy(y){
    if(y ===0){
        y=0;
    }
    y = y || -150;

    for(var i =friendlyBullets.length;i>=0;i--){
        stage.removeChild(friendlyBullets[i]);
        friendlyBullets.splice(i,1);
    }

    for(var i =hostileBullets.length;i>=0;i--){
        stage.removeChild(hostileBullets[i]);
        hostileBullets.splice(i,1);
    }

    for(var i = 0; i<6;i++){
        var nme = new createjs.Bitmap("img/enemyShip.png");
        nme.width=98;
        nme.height=50;
        nme.x=118*i+50;
        nme.y=y;
        enemies.push(nme);
        //container.width = container.width+nme.width;
        //container.addChild(nme)
        stage.addChild(nme);
    }
    enemyMove();
    timer =0;

}

function shoot(){
    var bullet = new createjs.Bitmap("img/laserGreen.png");
    bullet.width=9;
    bullet.height=33;
    if(shotsFired%2===0){
        bullet.x=hero.x;
        bullet.y=hero.y;
        shotsFired++;
    }else {//Right shoot
        bullet.x=hero.x+hero.width-10;
        bullet.y=hero.y;
        shotsFired++;
    }
    stage.addChild(bullet);
    friendlyBullets.push(bullet);
}

function enemyShoot(enemy){
    var bullet = new createjs.Bitmap("img/laserRed.png");
    bullet.width=9;
    bullet.height=33;
    bullet.x=enemy.x+enemy.width/2;
    bullet.y=enemy.y+enemy.height;
    hostileBullets.push(bullet);
    stage.addChild(bullet);
}

function bulletMove(){
    var fblength = friendlyBullets.length; // Better to declare it here, since it will only count once instead of N times
    if(fblength>0) {
        for (var i = fblength-1; i >= 0; i--) {
            friendlyBulletTravel(friendlyBullets[i]);
        }
    }
    var hblength = hostileBullets.length;
    if(hblength>0) {
        for (var i = hblength-1; i >= 0; i--) {
            hostileBulletTravel(hostileBullets[i]);
        }
    }
}

function friendlyBulletTravel(bullet){
    if(friendlyBullets.length===0){

    }else {
        bullet.y-=bulletSpeed;
    }
}

function hostileBulletTravel(bullet){
    if(hostileBullets.length===0){

    }else {
        bullet.y+=1.5;
    }
}

function move(e){
    hero.x=e.clientX-hero.width/2;
}

function enemyMove(){
    var e;
    var eLength=enemies.length-1;
    var rand=getRandomInt(0,stage.canvas.width-(118*6));//98 = enemy width+20 = padding

    for(e=eLength; e>=0; e--){
        createjs.Tween.get(enemies[e]).to({x:rand+(e%6)*118},speed);
    }
}

function enemyDrop(){
    var e;
    var eLength=enemies.length-1;
    var moveCheck = fps*15;
    if(timer%moveCheck===0){
        for(e=eLength; e>=0; e--){
            enemies[e].y+=50
        }
    }
}

function hitTest(rect1,rect2) {
    //console.log(rect1.x);
    //console.log(rect2.x);
    if ( rect1.x >= rect2.x + rect2.width
        || rect1.x + rect1.width <= rect2.x
        || rect1.y >= rect2.y + rect2.height
        || rect1.y + rect1.height <= rect2.y )
    {
        return false;
    }
    return true;
}

function checkCollisions(){
    var e;
    var b;
    var h;

    var eLength=enemies.length-1;
    var bLength=friendlyBullets.length-1;
    var hbLength=hostileBullets.length-1;

    for(b=bLength; b>=0; b--){
        for(e=eLength; e>=0; e--){
            if(hitTest( enemies[e], friendlyBullets[b] )){
                //we have a hit
                //console.log("hit");
                stage.removeChild(friendlyBullets[b]);
                stage.removeChild(enemies[e]);
                friendlyBullets.splice(b, 1);
                enemies.splice(e, 1);
                continue;
            }
        }
        if (friendlyBullets[b].y < -33) {
            friendlyBullets.splice(b, 1);
        }
    }
    if(enemies.length==0){
        level++;
        speed=5000-level*250;
        for(var l =1;l<=level;l++){
            addEnemy(l*70);
        }
    }
    for(h=hbLength;h>=0;h--){
        if(hitTest(hostileBullets[h],hero)){
            lives--;
            livesText.text="Lives: "+lives;
            stage.removeChild(hostileBullets[h]);
            hostileBullets.splice(h,1);
        }
        if(lives===0){
            gameOver();
        }
        if (hostileBullets[h].y > stage.canvas.height+33) {
            hostileBullets.splice(h, 1);
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameOver(){
    gameIsRunning=false;
    gameOverText = new createjs.Text("Game Over", "30px Verdana", "#000");
    gameOverText.textBaseline="middle";
    gameOverText.textAlign="center";
    gameOverText.x=stage.canvas.width/2;
    gameOverText.y=stage.canvas.height/2;
    stage.addChild(gameOverText);
}