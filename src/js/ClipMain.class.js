
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
            if(_Config.btn){
                this._Config.btn.ok = _Config.btn.ok||$Clip._Config.btn.ok;
                this._Config.btn.canel = _Config.btn.canel||$Clip._Config.btn.canel;
            }
            this.height = $(window).height();
            this.width = $(window).width();
        },"dataURLToBlob":function(dataURL) {
            var BASE64_MARKER = ';base64,';
            var parts=null;
            var contentType=null;
            var raw=null;
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                parts = dataURL.split(',');
                contentType = parts[0].split(':')[1];
                raw = parts[1];

                return new Blob([raw], {type: contentType});
            }
            else {
                parts = dataURL.split(BASE64_MARKER);
                contentType = parts[0].split(':')[1];
                raw = window.atob(parts[1]);
                var rawLength = raw.length;

                var uInt8Array = new Uint8Array(rawLength);

                for (var i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }

                return new Blob([uInt8Array], {type: contentType});
            }
        },
        "sendForm":function(url,fileData,callback) {

            fileData.append("CustomField", "This is some extra data");
            var oReq = new XMLHttpRequest();
            oReq.open("POST", url, true);
            oReq.onload = function(oEvent) {
                if(oReq.status==200){
                    var data = JSON.parse(oReq.responseText);
                    callback.call(this, data);
                }
            };
            oReq.send(fileData);
        },
        "addEvent":function(){
            var base=this;
            var $basebgMask = $("#"+this._Config.clipboxId+">.Dc_clipbox_Canvasbox>.Dc_clipbox_bgMask");
            var btnH = $("#"+this._Config.clipboxId+">.Dc_clipbox_btnbox").height();
            //添加按钮事件
            //getImageData
            $("#"+this._Config.clipboxId+">.Dc_clipbox_btnbox>.Dc_clipbox_btn_ok").on("click",function(){
                var data = {};
                var x=(base.width-base._Config.width)/2;
                var y=(base.height-btnH-base._Config.height)/2;
                data.img = base.draw.getImageData(x,y,base._Config.width,base._Config.height);
                var imgCanvas = document.createElement("canvas");
                imgCanvas.setAttribute("width",base._Config.width);
                imgCanvas.setAttribute("height",base._Config.height);
                var imgctx = imgCanvas.getContext("2d");
                imgctx.putImageData(data.img,0,0);
                $("#"+base._Config.clipboxId).append(imgCanvas);

                //获取 base64 的图片
                data.imgBase64=imgCanvas.toDataURL("image/png");
                data.formData =new FormData();
                var imgBlob = base.dataURLToBlob(data.imgBase64);
                data.formData.append("file",imgBlob);
                //上传接口
                data.upload=function(url,callback) {
                    base.sendForm(url,data.formData,callback);
                };
                base._Config.btn.ok.callback.call(data);
                base.destroy();
            }).html(base._Config.btn.ok.btnTitle);
            $("#"+this._Config.clipboxId+">.Dc_clipbox_btnbox>.Dc_clipbox_btn_canel").on("click",function(){
                base._Config.btn.canel.callback.call(this);
                base.destroy();
            }).html(base._Config.btn.canel.btnTitle);
            //创建图像
            this.event = new $Clip.EventTool({
                /*     "op":{
                        "touchCount":1,
                        "startX":0,
                        "startY":0,
                        "currentX":0,
                        "currentY":0,
                        "endX":0,
                        "endY":0
                    }*/
                "elem":$basebgMask,
                "touchStart":function(){
                    //callback
                },
                "touchEnd":function(){
                    //callback
                    base.draw.lastX=null;
                    base.draw.lastY=null;
                    base.draw.lastDistance=null;
                },
                "touchMove":{
                    singlePoint:function(){
                        var moveX = 0;
                        var moveY = 0;

                        if(base.draw.lastX===undefined||base.draw.lastX===null){
                            moveX = this.currentX-this.startX;
                            moveY = this.currentY-this.startY;
                        }else{
                            moveX = this.currentX-base.draw.lastX;
                            moveY = this.currentY-base.draw.lastY;

                        }
                        base.draw.lastX=this.currentX;
                        base.draw.lastY=this.currentY;
                        base.draw.translate(moveX,moveY);

                    },
                    multiPointFunc:function(){
                        if(base.draw.lastDistance===undefined||base.draw.lastDistance===null){
                            distance=base.getDistance(this.startX,this.current2X,this.startY,this.current2Y);
                            base.draw.lastDistance = distance;
                        }else{
                            //缩放
                            // console.log("多点触控");
                            distance=base.getDistance(this.currentX,this.current2X,this.currentY,this.current2Y);
                            var currentDistance = distance-base.draw.lastDistance;
                            base.draw.lastDistance = distance;
                            base.draw.scale(currentDistance);

                        }
                    }
                }}
                                            ).addEvents();
        },
        "destroy":function(){
            $("#"+this._Config.clipboxId).remove();
            $(this.fileInput).val("");
        },
        "getDistance":function (x1, x2, y1,y2) {

            var x = x2 - x1,
                y = y2 - y1;

            return Math.sqrt((x * x) + (y * y));
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
                "margin-top":(-this._Config.height)/2+"px",
                "z-index":100
            });
            this.$clipBox.find(".Dc_clipbox_Canvasbox").append(boderRect);

            var leftRightTop=(((this.height-this.btnHeight)-this._Config.height)/2);//左右top坐标
            //创建黑背景
            var bgTop = document.createElement("div");
            $(bgTop).css({
                "width":this.width+"px",
                "height":(((this.height-this.btnHeight)-this._Config.height)/2)+"px",
                "background-color":"rgba(0,0,0,0.8)",
                "position":"absolute",
                "top":"0px",
                "left":"0px",
                "z-index":99
            });
            this.$clipBox.find(".Dc_clipbox_Canvasbox").append(bgTop);

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
            this.$clipBox.find(".Dc_clipbox_Canvasbox").append(bgLeft);

            var bgBottom = document.createElement("div");
            $(bgBottom).css({
                "width":this.width+"px",
                "height":(((this.height-this.btnHeight)-this._Config.height)/2)+"px",
                "background-color":"rgba(0,0,0,0.8)",
                "position":"absolute",
                "top":this._Config.height+(((this.height-this.btnHeight)-this._Config.height)/2)+"px",
                "left":"0px",
                "z-index":99
            });
            this.$clipBox.find(".Dc_clipbox_Canvasbox").append(bgBottom);

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
            this.$clipBox.find(".Dc_clipbox_Canvasbox").append(touchMask);
        },
        "createCanavs":function(){
            var $baseClipBox = $("#"+this._Config.clipboxId+">.Dc_clipbox_Canvasbox");
            var $btnBox = $("#"+this._Config.clipboxId+">.Dc_clipbox_btnbox");

            $baseClipBox.width(this.width);
            $baseClipBox.height(this.height-$btnBox.height());
            this._Config.canvasWidth=$baseClipBox.width();
            this._Config.canvasHeight=$baseClipBox.height();
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
