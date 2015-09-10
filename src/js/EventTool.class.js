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
            "currentY":0
        },
        "touchMove":function(e){
            this.op.currentX = e.touches[0].clientX;
            if(this.op.touchCount>1){
                this.op.currentY = e.touches[0].clientY;
                //多点触摸
                this.configMap.touchMove.multiPointFunc.call(this.op);
            }else{

                //单点触摸
                this.configMap.touchMove.singlePoint.call(this.op);
            }

        },
        "touchStart":function(e){
            this.op.touchCount = e.touches;
            this.op.startX = e.touches[0].clientX;
            if(this.op.touchCount>1){
                this.op.startY = e.touches[0].clientY;
            }
            this.configMap.touchStart.call(this.op);
        },
        "touchEnd":function(e){
            this.configMap.touchEnd.call(this.op);
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
