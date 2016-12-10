/**
 * Created by Administrator on 2016/12/6.
 */
/*
* 1.define x,y,l(l represent the speed of up)
* 2.define number
* 3.define the number of alive's boom
* 4.improve the difficulte by the data.level
* */
var boomObj = function(){
    this.x = [];
    this.y = [];
    this.l = [];
    this.alive =[];
    this.sped = [];
}
boomObj.prototype.num = 15;//the capacity of pool
boomObj.prototype.init = function(){
    for(var i = 0; i < this.num; i++){
        this.y[i] = Math.random() * 500 + 50;
        this.x[i] = 0;
        this.alive[i] = false;
        this.sped[i] =  Math.random() * 0.017 + 0.06;
        this.l[i] = 0;
    }
}
boomObj.prototype.draw = function() {
    var pic = new Image();
    pic.src = "../src/boom.png";
    ctx2.save();
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            if (this.l[i] < 16)
                 this.l[i] += this.sped[i] * deltime;//开始增长慢
            this.x[i] += deltime * 0.1;
            ctx2.beginPath();
            ctx2.drawImage(pic, this.x[i], this.y[i], this.l[i], this.l[i]);
            if (this.x[i] >= 795) {
                this.alive[i] = false;
                this.x[i] = 0;
            }
         }

    }
    ctx2.restore();
}
boomObj.prototype.monitor = function(){
    var num=0;
    for(var i = 0; i < this.num ; i++){
        if(this.alive[i])num++;
    }
    if(num < data.level && num < 15)
        this.born();
}
boomObj.prototype.born = function(){
    for(var i = 0; i < this.num; i++){
        if(!this.alive[i]){
            this.alive[i] =true;
            //重新初始化x,y坐标
            this.x[i] = 0;
            this.y[i] = Math.random() * 500 + 50;
            return;
        }
    }
}
