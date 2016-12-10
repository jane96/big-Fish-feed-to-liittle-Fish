/**
 * Created by Administrator on 2016/12/6.
 */
var waveObj = function(){
    this.x;
    this.y;
    this.alive;
    this.r;
    this.alpha
    this.type;
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function(){
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
    this.alpha = 1;
    for(var i = 0; i < this.num; i++){
        this.alive[i] = false;
        this.r[i] = 0;
    }
    this.type = "";
}
waveObj.prototype.draw = function(){
    for(var i= 0; i < this.num; i++){
        if(this.alive[i]){
            //draw
            ctx1.save();
            ctx1.beginPath();
            ctx1.lineWidth = 3;
            ctx1.shadowColor = "blue";
            ctx1.shadowBlur = 10;
            this.r[i] += deltime * 0.05;
            if(this.r[i] >= 40){
                this.alive[i] = false;
                this.alpha = 1;
               break;
            }
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,2 * Math.PI);
            this.alpha -= deltime * 0.001;
            if(this.alpha <= 0)
                this.alpha = 0;
            if(wave.type == "white")
                ctx1.strokeStyle ="rgba(255,255,255," + this.alpha + ")";
            else
                ctx1.strokeStyle ="rgba(254,143,75," + this.alpha + ")";
            ctx1.stroke();
            ctx1.restore();
        }
    }
}
waveObj.prototype.born = function(x,y){
    for(var i = 0; i < this.num; i++){
        if(!this.alive[i]){
            this.x[i]= x;
            this.y[i] = y;
            this.alive[i] = true;
            this.r[i] = 10;
            return;
        }
    }
}
