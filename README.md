# ClippingImageH5
===================================  
HTML:
===================================  
###
```html
<div class="btn-row">
<div href="javascript:;" id="ID_clippingImageH5_btn">上传图片！abc </div>
</div>
```

JS调用:
===================================  
```javascript
<link type="text/css" href="dist/css/clippingImageH5.css" rel="stylesheet" />
<script src="bower_components/zepto-full/zepto.min.js" ></script>
<script src="dist/js/clippingImageH5.min.js"></script>
<script>

$Clip.setClipImage($("#ID_clippingImageH5_btn"),{"width":200,
"height":200,
"btn":{
"ok":{
    "btnTitle":"确定ok",
    "callback":function(){
        /* 返回结果可以参考
         * this= {formData: FormData
         * img: ImageData,
         * imgBase64: "data:image/png;base64,iVBORw...."}
         */
        /* 示例一：this.formData 可以用于ajax上传 */
        /* 示例二：this.img 可以用于图像计算 */
        /* 示例三：this.imgBase64 可以用于页面显示或者 input 赋值，方便数据库存储 */
        var img = new Image();
        img.src=this.imgBase64;
            $(".btn-row").append(img);
        }
    },
"canel":{
    "btnTitle":"取消",
    "callback":function(){
        //这里可以填写你的逻辑
        
        }
    }
}});
</script>
```