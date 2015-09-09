(function(){

    $Clip.DrawCanvas=function(drawConfig,$baseclipbox){
        this.drawConfig = drawConfig;
        this.baseClipBox=$baseclipbox;
        this.createCanvas();
    };
    $Clip.DrawCanvas.prototype={
        "drawImage":function(x,y,width,height){
            //绘制图片到画布
            var img =new Image();
            img.src=this.drawConfig.imgpath;
            var imgw = img.width;
            var imgh = img.height;
            if(imgw>=imgh){
                //高大于宽框子
                width=this.baseClipBox.width();
                height=this.baseClipBox.width()/imgw*imgh;
                y=(this.baseClipBox.height()-height)/2;
            }else{
                //宽小于高 高等比缩放
                height=this.baseClipBox.height();
                width=this.baseClipBox.height()/imgh*imgw;
                x=(this.baseClipBox.width()-width)/2;
            }

            this.ctx.drawImage(img,x,y,width,height);
        },
        "createCanvas":function(){
            this.canvas = document.createElement("canvas");
            this.canvas.setAttribute("width",this.drawConfig.canvasWidth);
            this.canvas.setAttribute("height",this.drawConfig.canvasHeight);
            this.canvas.setAttribute("id",this.drawConfig.canvasId);
            $(this.canvas).css(this.drawConfig.canvasCss);
            $(this.baseClipBox).append(this.canvas);
            this.ctx=this.canvas.getContext("2d");
            return this;
        },
        "getImageData":function(x,y,width,height){
            //获取指定区域的图像
            return this.ctx.getImageData(x,y,width,height);
        }

    };
})();
