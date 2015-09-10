
(function(window){
    $clip = $Clip = window.$Clip = {};

    $Clip.Main=function($btn,_Config){
        //默认配置
        this.$btn=$btn;
        this.init(_Config);

    };
    $Clip.Main.prototype={
        "_Config":{
            "canvasId":'DC_canvas_clip_'+new Date().getTime(),
            "clipboxId":'DC_clipbox_'+new Date().getTime(),
            "width":125,
            "height":125,
            "borderColor":"rgb(247, 251, 0)",//边框颜色
            "bgOpcity":0.5,//背景透明度
            "btn":{
                "ok":{
                    "btnTitle":"确定",
                    "callback":function(){}
                },
                "canel":{
                    "btnTitle":"取消",
                    "callback":function(){}
                }
            }
        },
        "init":function(_Config){

            this._Config.width = _Config.width||$Clip._Config.width;
            this._Config.height = _Config.height||$Clip._Config.height;
            this.height = $(window).height();
            this.width = $(window).width();
        },
        "addEvent":function(){
            var $basebgMask = $("#"+this._Config.clipboxId+">.Dc_clipbox_bgMask");
            //创建图像
            this.draw = new $Clip.EventTool({
                "elem":$basebgMask,
                "touchStart":function(){
                    //callback
                },
                "touchEnd":function(){
                    //callback
                },
                "touchMove":{
                    singlePoint:function(){
                        //callback
                    },
                    multiPointFunc:function(){
                        //callback
                    }
                }}
                                           ).addEvents();
        },
        "bulidHtml":function(){
            var clipHtml = "<div id=\""+this._Config.clipboxId+"\" class=\"Dc_clipbox_dialog\">";
            clipHtml += "	<div class=\"Dc_clipbox_Canvasbox\">";
            clipHtml += "	<\/div>";
            clipHtml += "	<div class=\"Dc_clipbox_btnbox\">";
            clipHtml += "		<button type=\"button\" class=\"Dc_clipbox_btn Dc_clipbox_btn_ok\">确认<\/button>";
            clipHtml += "		<button type=\"button\" class=\"Dc_clipbox_btn Dc_clipbox_btn_canel\">取消<\/button>";
            clipHtml += "	<\/div>";
            clipHtml += "<\/div>";
            $("body").append(clipHtml);
        },
        "createClipbox":function(){
            //创建窗口
            this.bulidHtml();
            this.$clipBox=$(this._Config.clipboxId);
            this.createCanavs();
            return this.$clipBox;
        },
        "createBjMask":function(){
            this.$clipBox = $("#"+this._Config.clipboxId);
            var $btnBox = $("#"+this._Config.clipboxId+">.Dc_clipbox_btnbox");
            this.btnHeight = $btnBox.height();
            //创建框子
            var boderRect = document.createElement("div");
            $(boderRect).css({
                "width":this._Config.width+"px",
                "height":this._Config.height+"px",
                "border-color":this._Config.borderColor,
                "border-style":"solid",
                "border-width":"1px",
                "position":"absolute",
                "top":"50%",
                "left":"50%",
                "margin-left":(-this._Config.width)/2-1+"px",
                "margin-top":(-this._Config.height-this.btnHeight)/2-1+"px",
                "z-index":100
            });
            this.$clipBox.append(boderRect);

            var leftRightTop=(this.height-this.btnHeight-this._Config.height)/2;//左右top坐标
            //创建黑背景
            var bgTop = document.createElement("div");
            $(bgTop).css({
                "width":this.width+"px",
                "height":(this.height-this.btnHeight-this._Config.height)/2+"px",
                "background-color":"rgba(0,0,0,0.8)",
                "position":"absolute",
                "top":"0px",
                "left":"0px",
                "z-index":99
            });
            this.$clipBox.append(bgTop);

            var bgLeft = document.createElement("div");

            $(bgLeft).css({
                "width":(this.width-this._Config.width)/2+"px",
                "height":this._Config.height+"px",
                "background-color":"rgba(0,0,0,0.8)",
                "position":"absolute",
                "top":leftRightTop+"px",
                "left":"0px",
                "z-index":99
            });
            this.$clipBox.append(bgLeft);

            var bgBottom = document.createElement("div");
            $(bgBottom).css({
                "width":this.width+"px",
                "height":(this.height-this.btnHeight-this._Config.height)/2+"px",
                "background-color":"rgba(0,0,0,0.8)",
                "position":"absolute",
                "top":this._Config.height+(this.height-this.btnHeight-this._Config.height)/2+"px",
                "left":"0px",
                "z-index":99
            });
            this.$clipBox.append(bgBottom);

            var bgRight = document.createElement("div");
            $(bgRight).css({
                "width":(this.width-this._Config.width)/2+"px",
                "height":this._Config.height+"px",
                "background-color":"rgba(0,0,0,0.8)",
                "position":"absolute",
                "top":leftRightTop+"px",
                "right":"0px",
                "z-index":99
            });
            this.$clipBox.append(bgRight);
            var touchMask = document.createElement("div");

            $(touchMask).css({
                "width":this.width+"px",
                "height":this.height-this.btnHeight+"px",
                "background-color":"rgba(55,255,0.8)",
                "position":"absolute",
                "top":"0px",
                "left":"0px",
                "z-index":101
            }).addClass("Dc_clipbox_bgMask");
            this.$clipBox.append(touchMask);
        },
        "createCanavs":function(){
            var $baseClipBox = $("#"+this._Config.clipboxId+">.Dc_clipbox_Canvasbox");
            var $btnBox = $("#"+this._Config.clipboxId+">.Dc_clipbox_btnbox");

            $baseClipBox.width(this.width);
            $baseClipBox.height(this.height-$btnBox.height());
            this._Config.canvasWidth=$baseClipBox.width();
            this._Config.canvasHeight=$baseClipBox.height()-$btnBox.height();
            this._Config.canvasCss={};
            this.draw = new $Clip.DrawCanvas(this._Config,$baseClipBox);
            this.draw.drawImage(0,0,this.width,this.height);

        },
        "getImageData":function(callback){
            //获取截图后图像数据
            callback.call(this.btn,data);
        },
        "createFileInput":function(){
            var base = this;
            this.fileInput = document.createElement("input");
            this.fileInput.setAttribute("type","file");
            this.fileInput.setAttribute("accept","image/*");

            this.fileInput.setAttribute("id","Dc_filebtn_input"+(new Date().getTime()));
            //创建文件上传框
            this.$btn.append(this.fileInput);
            this.$btn.css({"position":"relative"});
            $(this.fileInput).css({"position": "absolute",
                                   "width": "100%",
                                   "height": "100%",
                                   "display": "block",
                                   "top": "0px",
                                   "left": "0px",
                                   "opacity":"0",//透明度为0
                                   "-webkit-opacity":"0"
                                  });


            $(this.fileInput).on("change",function(e){
                base.reader = new FileReader();
                this.upfile=base.fileInput.files[0];
                //console.log(this.upfile);
                base.reader.readAsDataURL(this.upfile);
                base.reader.onload = function (oFREvent) {
                    base._Config.imgpath=oFREvent.target.result;
                    base.createClipbox();
                    base.createBjMask();
                    base.addEvent();
                };

            });



        }


    };

    //总入口
    $Clip.setClipImage=function($btn,_config){
        var clipMain = new $Clip.Main($btn,_config);
        clipMain.createFileInput();

    };
})(window);

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
                }
                base.ctx.drawImage(img,x,y,width,height);

            };
            img.src=this.drawConfig.imgpath;
//            $(img).css({
//                "z-index":999999,
//                "display":"none"
//            });
            //base.baseClipBox.append(img);
        },
        "translate":function(transX,tranY){
            this.imgData.x+=transX;
            this.imgData.y+=tranY;
            this.ctx.drawImage(this.imgData.img,
                               this.imgData.x,
                               this.imgData.y,
                               this.imgData.width,
                               this.imgData.height
                              );
        }
        ,
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
        "op":{
            "touchCount":1,
            "startX":0,
            "startY":0,
            "currentX":0,
            "currentY":0,
            "endX":0,
            "endY":0
        },
        "touchMove":function(e){

            this.op.currentX = e.touches[0].clientX;
            if(this.op.touchCount>1){
                this.op.currentY = e.touches[0].clientY;
            }
        },
        "touchStart":function(e){
            this.op.touchCount = e.touches;
            this.op.startX = e.touches[0].clientX;
            if(this.op.touchCount>1){
                this.op.startY = e.touches[0].clientY;
                //多点触摸
                this.configMap.multiPointFunc.call(this.op);
            }else{
                //单点触摸
                this.configMap.singlePoint.call(this.op);
            }

        },
        "touchEnd":function(e){
            //this.configMap.touchEnd.call();
//            this.op.endX = e.touches[0].clientX;
//            if(this.op.touchCount>1){
//                this.op.endY = e.touches[0].clientY;
//            }
        },
        "addEvents":function(){
            var base = this;
            this.elem.on("touchstart",function(e){
                e.stopPropagation();
                base.touchStart.call(base,e);
            });
            this.elem.on("touchmove",function(e){
                e.stopPropagation();
                base.touchMove.call(base,e);
            });
            this.elem.on("touchend",function(e){
                e.stopPropagation();
                base.touchEnd.call(base,e);
            });
        }
    };
})();
