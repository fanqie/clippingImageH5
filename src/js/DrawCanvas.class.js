(function(){

    $Clip.DrawCanvas=function(drawConfig,$baseclipbox){
        this.drawConfig = drawConfig;
        this.baseClipBox=$baseclipbox;
        this.createCanvas();
    };
    $Clip.DrawCanvas.prototype={
        "drawImage":function(x,y,width,height){
            var base = this;
            //绘制图片到画布
            var img =new Image();


            img.onload = function() {

                var imgw = img.width;
                var imgh = img.height;

                if(imgw>=imgh){

                    //高大于宽框子
                    width=base.baseClipBox.width();
                    height=base.baseClipBox.width()/imgw*imgh;
                    if(height<base.drawConfig.canvasHeight){
                        width=(base.drawConfig.canvasHeight/height)*width;
                        height=base.drawConfig.canvasHeight;
                    }
                    y=(base.baseClipBox.height()-height)/2;
                }else{
                    //宽小于高 高等比缩放
                    height=base.baseClipBox.height();
                    width=(base.baseClipBox.height()/imgh)*imgw;
                    if(width<base.drawConfig.canvasWidth){
                        height=(base.drawConfig.canvasWidth/width)*height;
                        width=base.drawConfig.canvasWidth;
                    }
                    x=(base.baseClipBox.width()-width)/2;

                }
                base.imgData={
                    "img":img,
                    "x":x,
                    "y":y,
                    "width":width,
                    "height":height
                };
                base.ctx.fillStyle="#555555";
                base.ctx.fillRect(0,0,base.drawConfig.width,base.drawConfig.height);
                base.ctx.save();
                base.ctx.drawImage(img,x,y,width,height);
                base.ctx.restore();

            };
            img.src=this.drawConfig.imgpath;
            //            $(img).css({
            //                "z-index":999999,
            //                "display":"none"
            //            });
            //base.baseClipBox.append(img);
        },
        "translate":function(transX,transY){
            //如果左边进入边框则停止
            if((this.imgData.x+transX)>(this.drawConfig.canvasWidth-this.drawConfig.width)/2){
                return;
            }
            //如果进入右边边框则停止
            if(Math.abs(this.imgData.x+this.imgData.width+transX)<((this.drawConfig.canvasWidth-this.drawConfig.width)/2+this.drawConfig.width)){
                return;
            }
            //如果进入上边边框则停止
            if((this.imgData.y+transY)>(this.drawConfig.canvasHeight-this.drawConfig.height)/2){
                return;
            }

            //如果进入下边边框则停止
            if(Math.abs(this.imgData.y+this.imgData.height+transY)<((this.drawConfig.canvasHeight-this.drawConfig.height)/2+this.drawConfig.height)){
                return;
            }
            this.imgData.x+=transX;
            this.imgData.y+=transY;

            this.ctx.fillStyle="#555555";
            this.ctx.fillRect(0,0,this.drawConfig.canvasWidth,this.drawConfig.canvasHeight);

            this.ctx.save();
            this.ctx.drawImage(this.imgData.img,
                               this.imgData.x,
                               this.imgData.y,
                               this.imgData.width,
                               this.imgData.height
                              );
            this.ctx.restore();
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
