/**
 * Created by hz on 2016/12/4.
 */
var ctx1;
var ctx2;
var canWidth;
var canHeight;
var lasttime ;
var deltime ;
var bgPic = new Image();
var ane;
var fruit;
var mom;
var baby;
var mx;
var my;
var babyTail
var babyEye;
var babyBody;
var momTail;
var momEye;
var momBodyOrange;
var momBodyBlue;
var data;
var wave;
var dust;
var dustPic;
var warm;
var boom;
//初始加载背景
document.getElementById("restart").style.display = "none";

$("#my-checkbox").bootstrapSwitch({
    onText:'声音开',
    offText:'声音关',
    onColor:'success',
    offColor:'danger',
    size:'mini',
    state:'false'
});
$("#my-checkbox").on({
    'switchChange.bootstrapSwitch': function(event, state) {
        if (state == true)
        {
            data.sound = true;
            document.getElementById("audio").play();//播放背景音乐
        }
        else
        {
            data.sound = false;
            document.getElementById("audio").pause();//关闭背景音乐
        }
    }
});
function startGame(){
    document.getElementById("start").style.display = "none";
    document.getElementById("switch").style.display = "inline";
    document.getElementById("audio").play();//播放背景音乐
    game();
}
function restartGame(){
    document.getElementById("form").style.display = "none";
    if(data.sound)
         document.getElementById("audio").play();
    data.gameOver = false;
    warm.hungry = false;
    data.orange = 0;
    data.blue = 0;
    data.score = 0;
    data.boomNum = 0;
    data.level = 1;
    baby.bodyCount = 0;
    mom.bodyCount = 0;
    boom.init();

}
function game(){
    init();
    gameLoop();
}
function init() {
    can1 = document.getElementById("canvas1");
    can2 = document.getElementById("canvas2");
    ctx1 = can1.getContext("2d");
    ctx1.fillStyle = "white";
    ctx1.font = "20px Verdana";
    ctx2 = can2.getContext("2d");
    lasttime = Date.now();
    deltime = 0;
    bgPic.src = "../src/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;
    can1.addEventListener('mousemove',onMouseMove,false);
    mx= canWidth * 0.5;
    my = canHeight * 0.5;
    ane = new aneObject();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    momTail = [];
    for(var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "../src/bigTail" + i + ".png";
    }
    momEye = [];
    for(var i = 0; i < 2; i++){
        momEye[i] = new Image();
        momEye[i].src = "../src/bigEye" + i + ".png";
    }
    momBodyBlue = [];
    momBodyOrange= [];
    for(var i = 0; i < 8; i++){
        momBodyBlue[i] = new Image();
        momBodyBlue[i].src ="../src/bigSwimBlue" + i + ".png";
        momBodyOrange[i] = new Image();
        momBodyOrange[i].src = "../src/bigSwim" + i + ".png";
    }
    mom = new momObj();
    mom.init();
    babyTail = [];
    for(var i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "../src/babyTail" + i +".png";
    }
    babyEye = [];
    for(var i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src ="../src/babyEye" + i + ".png";
    }
    babyBody = [];
    for(var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "../src/babyFade" + i + ".png";
    }
    baby = new babyObj();
    baby.init();
    data = new dataObj();
    data.init();
    wave = new waveObj();
    wave.init();
    dust = new dustObj();
    dustPic = [];
    for(var i = 0; i < 7; i++){
        dustPic[i] = new Image();
        dustPic[i].src = "../src/dust" + 0 + ".png";
    }
    dust.init();
    warm = new warmObj();
    boom = new boomObj();
    boom.init();

}
function gameLoop(){
    requestAnimationFrame(gameLoop);
    deltime = Date.now() - lasttime;
    lasttime = Date.now();
    if(deltime >40)//规定每次执行的时间间隔
        deltime = 40;
    drawBg();
    ane.draw();
    fruit.draw();
    fruit.monitor();
    momFruitsCollision();
    ctx1.clearRect(0,0,canWidth,canHeight);
    if(!data.gameOver)
        mom.draw();
    if(!data.gameOver)
        baby.draw();
    momBabyCollision();
    data.draw();
    wave.draw();
    dust.draw();
    warm.draw();
    boom.monitor();
    boom.draw();
    momBoomCollision();
}
function onMouseMove(e){
    if(!data.gameOver && (e.offsetX || e.layerX)){
        mx = e.offsetX == undefined ? e.layerX:e.offsetX;
        my = e.offsetY == undefined ? e.layerY:e.offsetY;
    }
}