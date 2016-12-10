/**
 * Created by Administrator on 2016/12/5.
 */
var momObj = function(){
    this.x;
    this.y;
    this.eye = new Image();
    this.body = new Image();
    this.tail = new Image();
    this.angle;
    this.tailTime;
    this.tailCount;
    this.eyeTime;
    this.eyeCount;
    this.eyeIntervalTime;
    this.bodyCount;
}
momObj.prototype.init = function(){
    this.x = canWidth *0.5;
    this.y = canHeight * 0.5;
    this.body.src = "../src/bigSwim0.png";
    this.angle = 0;
    this.tailTime = 0;
    this.tailCount = 0;
    this.eyeTime = 0;
    this.eyeCount = 0;
    this.eyeIntervalTime = 2000;
    this.bodyCount = 0;
}
momObj.prototype.draw = function(){
    this.x = lerpDistance(mx,this.x,0.95);
    this.y = lerpDistance(my,this.y,0.95);
    var deltaX = mx - this.x;
    var deltaY = my - this.y;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;
    this.angle = lerpAngle(beta,this.angle,0.9);
    this.tailTime += deltime;
    if(this.tailTime > 50){
        this.tailCount = (this.tailCount  + 1) % 8;
        this.tailTime %= 50;
    }
    this.eyeTime += deltime;
    if(this.eyeTime > this.eyeIntervalTime){
        this.eyeCount = (this.eyeCount + 1) % 2;
        this.eyeTime %= this.eyeIntervalTime;
        if(this.eyeCount == 0)
           this.eyeIntervalTime = this.eyeIntervalTime + Math.random() * 1000;
        else
            this.eyeIntervalTime= 200;
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    ctx1.drawImage(momTail[this.tailCount],-momTail[this.tailCount].width * 0.5+25,-momTail[this.tailCount].height * 0.5);
    if(data.type == "orange")
        ctx1.drawImage(momBodyOrange[this.bodyCount],-momBodyOrange[this.bodyCount].width * 0.5,-momBodyOrange[this.bodyCount].height * 0.5);
    else
        ctx1.drawImage(momBodyBlue[this.bodyCount],-momBodyBlue[this.bodyCount].width * 0.5,-momBodyBlue[this.bodyCount].height * 0.5);
    ctx1.drawImage(momEye[this.eyeCount],-momEye[this.eyeCount].width * 0.5,-momEye[this.eyeCount].height * 0.5);
    ctx1.restore();
}
