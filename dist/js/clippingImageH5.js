var $Clip = Object.create(null);
(function(){

})();

(function(){
    /*configMap={
         elemId:'mycanvas',
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
        this.elem = document.getElementById(this.configMap.elemId);
    };

    $Clip.EventTool.prototype={
        "touchMove":function(e){

        },
        "touchStart":function(e){

        },
        "touchEnd":function(e){

        },
        "addEvents":function(){

        }
    };
})();
