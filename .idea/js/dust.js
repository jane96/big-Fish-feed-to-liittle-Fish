/**
 * Created by Administrator on 2016/12/6.
 */
var dustObj = function() {
    this.x = [];
    this.y = [];
    this.no = [];
    this.alpha;
    this.tmp= [];
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
    this.alpha = 0;
    for(var i = 0; i < this.num; i++){
       this.x[i]= Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.tmp[i]= Math.random() * 20 + 20;
        this.no[i] = Math.floor(Math.random() * 7);
    }
}
dustObj.prototype.draw = function(){
    this.alpha += deltime * 0.001;
    var sin = Math.sin(this.alpha);
    for(var i = 0; i < this.num; i++){
        ctx2.beginPath();
        var n = this.no[i];
        ctx2.drawImage(dustPic[n],this.x[i] + sin *this.tmp[i],this.y[i]);
    }
}