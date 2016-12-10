/**
 * Created by Administrator on 2016/12/4.
 */
var aneObject = function(){
    this.rootx;
    this.headx;
    this.heady;
    this.beta;
    this.temp;
}
aneObject.prototype.num = 50;
aneObject.prototype.init = function(){
    this.rootx = [];
    this.headx = [];
    this.heady= [];
    this.beta = 0;
    this.tmp = [];
    for(var i = 0; i < this.num; i++){
        this.rootx[i] = i * 20 + Math.random() * 20;
        this.heady[i] = 350 + Math.random() * 30;
        this.headx[i] = this.rootx[i];
        this.tmp[i] = Math.random() * 100 + 50;
    }
}
aneObject.prototype.draw = function () {
    ctx2.save();
    this.beta += deltime * 0.001;
    var v = Math.sin(this.beta);
    ctx2.globalAlpha = 0.66;
    ctx2.strokeStyle = "purple";
    ctx2.lineWidth = 15;
    ctx2.lineCap = "round";
    for(var i = 0; i < this.num; i++){
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight)
        this.headx[i] = this.rootx[i] + v * this.tmp[i];
        ctx2.quadraticCurveTo(this.rootx[i],this.heady[i] + 300,this.headx[i],this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}
