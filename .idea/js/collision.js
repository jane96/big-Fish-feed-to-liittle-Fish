function momFruitsCollision(){
    if(!data.gameOver){
        for(var i = 0; i < fruit.num; i++){
            if(fruit.alive[i]) {
                var d;
                if(data.level <=14)
                d = calLength2(mom.x, mom.y, fruit.x[i] - fruit.l[i] * 0.5, fruit.len[i] - fruit.l[i] * 0.5 * fruit.a[data.level]);
                else
                    d = calLength2(mom.x, mom.y, fruit.x[i] - fruit.l[i] * 0.5, fruit.len[i] - fruit.l[i] * 0.5 * fruit.a[14]);

                if (d <= 300) {
                    fruit.dead(i);
                    if (fruit.type[i] == "blue") {
                        data.type = "blue";
                        data.blue += 1;
                    }
                    else {
                        data.type = "orange";
                        data.orange += 1;
                    }
                    if( mom.bodyCount < 7)
                        mom.bodyCount += 1;
                    wave.type="white";
                    if(data.level <= 14)
                        wave.born(fruit.x[i] - fruit.l[i] * 0.5, fruit.len[i] - fruit.l[i] * 0.5 * fruit.a[data.level]);
                    else
                        wave.born(fruit.x[i] - fruit.l[i] * 0.5, fruit.len[i] - fruit.l[i] * 0.5 * fruit.a[14]);

                }
            }
        }
    }

}
function momBabyCollision(){
    if(!data.gameOver){
        var d = calLength2(mom.x,mom.y,baby.x,baby.y);
        if(d <= 400 && (data.blue >0 || data.orange > 0)){
            data.score += data.blue * 200 + data.orange * 100;//计算分数
            data.level = Math.floor(data.score / 2000) + 1;
            data.alpha = 1;
            data.orange =0;
            data.blue = 0;
            mom.bodyCount = 0;
            baby.bodyCount = 0;
            baby.recover();
            wave.type = "orange";
            wave.born(baby.x,baby.y);

        }
    }

}
function momBoomCollision(){//炸弹碰撞检测
    if(!data.gameOver){
        for(var i = 0; i < boom.num; i++){
            if(boom.alive[i]){
                var d = calLength2(mom.x,mom.y,boom.x[i],boom.y[i]);
                //console.log(d);
               if(d <= 400){
                   if(data.sound) {
                       document.getElementById("boomAudio").play();
                       document.getElementById("boomAudio").playbackRate = 4;//加快播放速度
                   }
                    boom.alive[i] = false;
                    warm.boom = true;
                     warm.alpha = 1;
                    data.boomNum += 1;
                   if(data.boomNum ==5){//炸弹让生命结束
                       if(data.score > data.maxScore)
                           data.maxScore = data.score;
                       data.gameOver = true;
                   }
                }
             }
        }
    }

}

