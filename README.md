# big-Fish-feed-to-liittle-Fish


大于喂小鱼的游戏
游戏的总体思路：
    1.通过FPS（每秒传输帧数(Frames Per Second)）来循环打印canvas中的元素。
    2.通过控制果实以及炸弹的出生
    3.检测大鱼与小鱼，大鱼与炸弹的碰撞检测
    4.根据相应的分数计算游戏关数，通过游戏关数来增加游戏难度
    5.当游戏结束时，显示游戏结果
    6。当重新开始时，重新初始化数据
游戏中需要注意的地方：
    1.通过来控制每一帧都循环执行
        windows.requestAnimationFrame(function)；
    2.控制每次循环执行的时间间隔(main.js)
        deltime = Date.now() - lasttime;
        lasttime = Date.now();
        if(deltime >40)//规定每次执行的时间间隔
             deltime = 40;
    3.海葵(ane.js)
        (1).定义海葵的位置
            for(var i = 0; i < this.num; i++){
                    this.rootx[i] = i * 20 + Math.random() * 20;//根节点
                    this.heady[i] = 350 + Math.random() * 30;//头节点坐标
                    this.headx[i] = this.rootx[i];//头节点坐标
                    this.tmp[i] = Math.random() * 100 + 50;//随机值
                }
        (2).通过贝塞尔二次曲线来控制海葵的摆动
            quadraticCurveTo(控制点（x,y），结束点(x,y)) 方法通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点。
            for(var i = 0; i < this.num; i++){
                    ctx2.beginPath();
                    ctx2.moveTo(this.rootx[i],canHeight)//开始点
                    this.headx[i] = this.rootx[i] + v * this.tmp[i];//头节点的x坐标变化，实现摆动效果
                    ctx2.quadraticCurveTo(this.rootx[i],this.heady[i] + 300,this.headx[i],this.heady[i]);
                    ctx2.stroke();
                }
    4.果实(fruit.js)
        (1).定义果实的颜色，出生位置，以及渐变过程（由小到大）
            fruitObj.prototype.born//初始化
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
    5.炸弹(boom.js)
        (1).定义炸弹的出生以及坐标变化
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
    6.碰撞检测(collision.js)
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
         通过检测他们的相对位置，判断是否碰撞
    7.绘制碰撞的动态效果(wave.js)
             this.alpha = 0;
                    if(wave.type == "white")
                        ctx1.strokeStyle ="rgba(255,255,255," + this.alpha + ")";
                    else
                        ctx1.strokeStyle ="rgba(254,143,75," + this.alpha + ")";
                    ctx1.stroke();
    8.游戏提醒(warming.js)
         if(this.hungry){//小鱼是否饥饿
                ctx1.shadowColor = "white";
                ctx1.shadowBlur = 15;
                ctx1.fillStyle = "rgba(241,153,11,1)";
                ctx1.fillText("mom!I'm hungry!",this.x - 50,this.y -30,200);
            }
            if(this.boom){//是否碰到炸弹
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
    9.音效(index.html)
        <audio id="audio" loop>
                            <source src="../src/bgm.mp3" type="audio/mpeg">
                            您的浏览器不支持 audio 元素。
         </audio>
         document.getElementById("audio").play();//播放背景音乐
         document.getElementById("audio").pause();//关闭背景音乐
    10.分享游戏
        <td colspan="3">
             <b>分享到：&nbsp;</b>
                 <a target="_blank" href="http://v.t.sina.com.cn/share/share.php?url=http://www.funet8.com/index.html&amp;
                   title=大鱼喂小鱼&amp;" title="新浪微博">
                  <span> <img id="sina" src="../src/sinaRed.png" alt="新浪微博"/> </span>
                 </a>
                 <a target="_blank" href="http://share.v.t.qq.com/index.php?c=share&amp;a=index&amp;url=http://www.funet8.com/&amp;
                    title=大鱼喂小鱼&amp;pic=http://www.funet8.com/wp-content/uploads/file/jimixiu-pi.jpg"
                    title="腾讯微博">
                  <span> <img id="qq" src="../src/qqwb.png" alt="腾讯微博"/> </span>
                 </a>
                 <a target="_blank" href="http://widget.renren.com/dialog/share?url=http://www.funet8.com/&amp;
                 title=大鱼喂小鱼&amp;pic=http://www.funet8.com/wp-content/uploads/file/jimixiu-pi.jpg&amp;description=好玩的趣味游戏"
                 title="人人网">
              <span> <img id="people" src="../src/people.png"/> </span>
              </a>
           <a target="_blank" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://www.baidu.com/
                &title=大鱼喂小鱼"  title="QQ空间">
                <span> <img id="qZone" src="../src/qzone.png"/> </span>
           </a>
        </td>
    11.数据统计
        if (!data.gameOver) {//绘制游戏进行中的数据
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
            else{//绘制游戏结束的信息

                warm.boom = false;
                warm.hungry = false;
                document.getElementById("audio").pause();
                document.getElementById("dataLevel").innerText= this.level - 1;
                document.getElementById("dataScore").innerText= this.score;
                document.getElementById("dataMaxScore").innerText =this.maxScore;
                document.getElementById("form").style.display = "inline";

            }







