/**
 * Created by Administrator on 2016/12/8.
 */
var sharObj = function(){
}
sharObj.prototype.shareToQq = function(content,url,picture){
    var qqString = "http://v.t.qq.com/share/share.php?title='+content+'&url='+url+'&pic='+picture";
    window.open(qqString,'newwindow','height=100,width=100,top=100,left=100');
}