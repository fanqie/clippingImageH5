(function(){

    $Clip.DrawCanvas=function(drawConfig){
        this.drawConfig.canvasId = drawConfig.canvasId| this.drawConfig.canvasId ;
        this.drawConfig.width = drawConfig.width| this.drawConfig.width ;
        this.drawConfig.height = drawConfig.height| this.drawConfig.height ;
        this.drawConfig.borderColor = drawConfig.borderColor| this.drawConfig.borderColor ;
        this.drawConfig.bgOpcity = drawConfig.bgOpcity| this.drawConfig.bgOpcity ;
    };
    $Clip.DrawCanvas.prototype={
        "drawConfig":{
            "canvasId":'DC_canvas_clip_'+new Date().getTime(),
            "width":125,
            "height":125,
            "borderColor":"#999999",//边框颜色
            "bgOpcity":0.5,//背景透明度
        },
        "drawlineRect":function(){

        },
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
        }


    };
})();
