var warmObj = function(){
    this.x;
    this.y;
    this.hungry = false;
    this.dead = false;
    this.boom = false;
    this.alpha = 1;

}
warmObj.prototype.draw = function(){
    this.x = baby.x;
    this.y = baby.y;
    ctx1.save();
    ctx1.beginPath();
    ctx1.font = "18px Verdana";

    if(this.hungry){
        ctx1.shadowColor = "white";
        ctx1.shadowBlur = 15;
        ctx1.fillStyle = "rgba(241,153,11,1)";
        ctx1.fillText("mom!I'm hungry!",this.x - 50,this.y -30,200);
    }
    if(this.boom){
        this.alpha -= deltime * 0.0003;
        if(this.alpha <0)
            this.alpha = 0;
        ctx1.save();
        ctx1.shadowColor = "white";
        ctx1.shadowBlur = 20;
        ctx1.font = "17px Verdana";
        ctx1.fillStyle = "rgba(241,153,11," + this.alpha + ")";
        ctx1.fillText("boom!boom!", mom.x - 50, mom.y - 50, 200);
        ctx1.restore();
    }
    if(this.help){
        ctx1.fillStyle = "pink";
        ctx1.fillText("mom!Thanks!", this.x - 50, this.y - 30, 200);
    }
    ctx1.restore();

}
