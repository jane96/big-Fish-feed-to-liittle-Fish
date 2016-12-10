/**
 * Created by Administrator on 2016/12/5.
 */
var dataObj = function(){
    this.orange;
    this.blue;
    this.type;
    this.score;
    this.gameOver;
    this.alpha;
    this.maxScore;
    this.level;
    this.curLevel;//当前关数
    this.boomNum;
    this.sound ;//是否开启背景音乐
}
dataObj.prototype.init = function(){
    this.orange = 0;
    this.blue = 0;
    this.type = "";
    this.score = 0;
    this.gameOver = false;
    this.alpha = 1;
    this.maxScore = 0;
    this.level = 1;
    this.curLevel = 1;
    this.boomNum = 0;
    this.sound = true;
}
dataObj.prototype.draw = function() {
    var x = canWidth;
    var y = canHeight;
    if (!data.gameOver) {
        ctx1.save();
        ctx1.beginPath();
        ctx1.shadowBlur = 20;
        ctx1.shadowColor = "white";
        ctx1.font = "20px Verdana";
        ctx1.fillText("得分  " + this.score, x - 550, 50);
        ctx1.save();
        ctx1.font = "18px Verdana";
        ctx1.fillText("第" + data.level + "关", 50, 50);
        ctx1.restore();
        if (this.score > this.maxScore) {//显示破纪录
            this.alpha -= deltime * 0.0002;
            ctx1.save();
            ctx1.font = "18px Verdana";
            ctx1.fillStyle = "rgba(255,170,215," + this.alpha + ")";
            ctx1.fillText("打破记录啦！", x * 0.5, 50);
            ctx1.restore();
        }
        ctx1.save();
        ctx1.font = "18px Vernada";
        ctx1.fillText("生命值 " + (5 - data.boomNum), x - 250, 50);
        ctx1.restore();
    }
    else{

        warm.boom = false;
        warm.hungry = false;
        document.getElementById("audio").pause();
        document.getElementById("dataLevel").innerText= this.level - 1;
        document.getElementById("dataScore").innerText= this.score;
        document.getElementById("dataMaxScore").innerText =this.maxScore;
        document.getElementById("form").style.display = "inline";

    }
    ctx1.restore();
}
