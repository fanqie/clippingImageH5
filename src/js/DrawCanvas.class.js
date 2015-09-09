(function(){

    $Clip.DrawCanvas=function(drawConfig){
        this.drawConfig = drawConfig;
    };
    $Clip.DrawCanvas.prototype={
        "drawImage":function(imgpath,x,y,width,height){
            //绘制图片到画布
            var img =new Image();
            img.src=this.drawConfig.imgpath;
            this.ctx.drawImage(imgpath,x,y,width,height);
        },
        "createCanvas":function(){
            document.getElementById(this.drawConfig.canvasId);
            this.ctx=c.getContext("2d");
            return this;
        },
        "getImageData":function(x,y,width,height){
            //获取指定区域的图像
            return this.ctx.getImageData(x,y,width,height);
        }

    };
})();
