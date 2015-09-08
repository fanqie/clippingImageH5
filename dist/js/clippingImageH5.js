
(function(){
widnow.$Clip = {};


})();

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

(function(){
    /*configMap={
         elem:mycanvas,
         touchStart:function(){
          //callback
         },
         touchEnd:function(){
         //callback
         },
         touchMove:{
            singlePoint:function(){//callback},
            multiPointFunc:function(){//callback}
          }
        }*/
    $Clip.EventTool=function(configMap){
        this.configMap = configMap;
        this.elem = configMap.elem;
    };

    $Clip.EventTool.prototype={
        "touchMove":function(e){
            console.log(e);
        },
        "touchStart":function(e){
            this.configMap.touchStart();
        },
        "touchEnd":function(e){
            this.configMap.touchEnd();
        },
        "addEvents":function(){
            this.elem.addEventListener("touchStart",this.touchStart,false);
            this.elem.addEventListener("touchEnd",this.touchEnd,false);
            this.elem.addEventListener("touchMove",this.touchMove,false);
        }
    };
})();
