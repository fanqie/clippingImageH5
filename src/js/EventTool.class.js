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
