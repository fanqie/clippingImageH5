
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
            "borderColor":"#999999",//边框颜色
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

            //创建图像
            this.draw = new $Clip.EventTool({
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
                                           );
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
        "createBj":function(){
            //创建框子
            //创建黑背景
        },
        "createCanavs":function(){
            var $baseClipBox = $("#"+this._Config.clipboxId+">.Dc_clipbox_Canvasbox");
            var $btnBox = $("#"+this._Config.clipboxId+">.Dc_clipbox_btnbox")
            $baseClipBox.width(this.width);
            $baseClipBox.height(this.height);
            this._Config.canvasWidth=$baseClipBox.width();
            this._Config.canvasHeight=$baseClipBox.height()-$btnBox.height();
            this._Config.canvasCss={}
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
                base.reader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                this.upfile=base.fileInput.files[0];
                //console.log(this.upfile);
                base.reader.readAsDataURL(this.upfile);
                base.reader.onload = function (oFREvent) {
                    base._Config.imgpath=oFREvent.target.result;
                    base.createClipbox();
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
