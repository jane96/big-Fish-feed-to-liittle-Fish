/**
 * Created by Administrator on 2016/12/5.
 */
var babyObj = function(){
    this.x;
    this.y;
    this.eye = new Image();
    this.body = new Image();
    this.tail = new Image();
    this.angle;
    this.tailTime;
    this.tailCount;
    this.eyeTime;
    this.eyeStatus;
    this.eyeCount;
    this.bodyTime;
    this.bodyCount;
}
babyObj.prototype.init = function(){
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    this.tailTime = 0;
    this.tailCount = 0;
    this.eyeTime = 0;
    this.eyeStatus = false;
    this.eyeCount = 0;
    this.bodyTime = 0;
    this.bodyCount = 0;
}
babyObj.prototype.recover = function(){
    warm.hungry = false;
    if(this.bodyCount >= 19){
        return;
    }
    if(this.bodyCount >0)
        this.bodyCount -= 1;
}
babyObj.prototype.draw = function(){
    this.x = lerpDistance(mom.x,this.x,0.98);
    this.y = lerpDistance(mom.y,this.y,0.98);
    var deltaX = this.x - mom.x;
    var deltaY = this.y - mom.y;
    var beta = Math.atan2(deltaY,deltaX)
    this.angle = lerpAngle(beta,this.angle,0.6);
    this.tailTime += deltime;
    if(this.tailTime > 50){
        this.tailCount = (this.tailCount + 1) % 8;
        this.tailTime %= 50;//避免超出计数范围
    }
    this.eyeTime += deltime;
    if(!this.eyeStatus){
        if(this.eyeTime > 2000 + 1000 * Math.random()){
            this.eyeCount = 1;
            this.eyeTime %= 2000;
            this.eyeStatus = true;
         }
    }else{
        if(this.eyeTime >200){
            this.eyeCount = 0;
            this.eyeTime %= 200;
            this.eyeStatus = false;
        }
    }
    this.bodyTime += deltime;
    if(this.bodyTime >700){
        if(this.bodyCount == 15){
           warm.hungry = true;
        }
        if(this.bodyCount >= 19) {//小鱼死亡
            this.bodyCount = 19;
            if(data.score > data.maxScore)//更新记录
                data.maxScore =data.score;
            data.gameOver = true;

        }else {
            this.bodyCount = (this.bodyCount + 1) % 20;
            this.bodyTime %= 700;
        }

    }
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyTail[this.tailCount],-babyTail[this.tailCount].width * 0.5 + 23,-babyTail[this.tailCount].height * 0.5);
    ctx1.drawImage(babyBody[this.bodyCount],-babyBody[this.bodyCount].width * 0.5,-babyBody[this.bodyCount].height * 0.5);
    ctx1.drawImage(babyEye[this.eyeCount],-babyEye[this.eyeCount].width * 0.5,-babyEye[this.eyeCount].height * 0.5);
    ctx1.restore();
}


