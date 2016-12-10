/**
 *
 * Created by Administrator on 2016/12/5.
 */
var fruitObj = function() {
    this.x = [];
    this.len = []
    this.alive = [];
    this.aneNo = [];
    this.l = [];
    this.sped = [];
    this.orange = new Image();
    this.blue = new Image();
    this.type = [];
    this.a = [];//加速度
    this.aNum ;//总加速等级

}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function(){
    this.aNum = 15;
    this.orange.src = "../src/fruit.png";
    this.blue.src = "../src/blue.png";
    for(var i = 0; i < this.num; i++){
        this.alive[i]= false;
        this.x[i] = 0;
        this.len[i] = 0;
        this.aneNo[i] = 0;
        this.l[i] = 0;
        this.born(i);
        this.sped[i] = Math.random() * 0.017 + 0.06;
        this.type[i] = "";
    }
    for(var i = 0; i < this.aNum; i++ ){
        this.a[i] = i + 1;
    }
}
fruitObj.prototype.born = function(i){
    var aneId = Math.floor(Math.random() * ane.num);
    this.aneNo[i] = aneId;
    this.len[i] = ane.heady[aneId];
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran <= 0.3)
        this.type[i] = "blue";
    else
        this.type[i] = "orange";
}
fruitObj.prototype.draw = function(){
    var pic = new Image();
    for(var i = 0; i < this.num; i++){
            if(this.type[i] == "blue")
                pic.src ="../src/blue.png";
            else
                pic.src = "../src/fruit.png";
            if(this.alive[i]){
            if(this.l[i] < 15) {
                this.x[i] = ane.headx[this.aneNo[i]];
                this.len[i] = ane.heady[this.aneNo[i]];
                this.l[i] += this.sped[i] * deltime;
            }
            else{
                this.len[i] -= this.sped[i] * deltime * 2;
            }
            //根据等级选择相应的加速度，到达下一关
               if(data.level < 2){
                    ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.len[i] - this.l[i] * 0.5, this.l[i], this.l[i]);//控制果实变大
                }else if(data.level < 15){
                    ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.len[i] - this.l[i] * 0.5 * this.a[data.level], this.l[i], this.l[i]);//控制果实变大
                }else{
                    ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.len[i] - this.l[i] * 0.5 * this.a[14], this.l[i], this.l[i]);//控制果实变大
                }
             if(this.len[i] < 10)
                this.alive[i] = false;
        }
    }
}
fruitObj.prototype.monitor = function(){
    var count = 0;
    for(var i = 0; i < this.num; i++){
        if(this.alive[i])count++;
    }
    if(count < 25) {
        this.sendFruit();
        return;
    }
}
fruitObj.prototype.sendFruit = function(){
    for(var i = 0; i < this.num; i++){
        if(!this.alive[i]){
            this.born(i);
            return ;
        }
    }
}
fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
}