# ClippingImageH5
===================================  

DEMO:
===================================
![ClippingImageH5](/Screenshot/qrcode.png)
![ClippingImageH5](/Screenshot/1.png)
![ClippingImageH5](/Screenshot/2.png)
![ClippingImageH5](/Screenshot/3.png)
![ClippingImageH5](/Screenshot/4.png)
![ClippingImageH5](/Screenshot/5.png)


MATE:
===================================
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

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
$Clip.setClipImage($("#ID_clippingImageH5_btn"),{
"width":200,
"height":200,
"btn":{
    "ok":{
        "btnTitle":"确定ok",
        "callback":function(){
            /* 返回结果可以参考
            this= {formData: FormData
            img: ImageData,
            imgBase64: "data:image/png;base64,iVBORw...."}
            */
            //示例一：this.formData 可以用于ajax上传
            this.upload("upload.php",function(result){
                $("#message").html("上传成功，文件大小为："+result.file.size+"b");
                setTimeout(function(){$("#message").html("");},2000);
            });

            //示例二：this.imgBase64 可以用于页面显示或者 input 赋值，方便数据库存储
            var img = new Image();
            img.src=this.imgBase64;
            $(img).css(
                {
                    "margin-top":"5px",
                    "border":"10px solid #007941"
                }
            );
            $(".btn-row").append(img);

            //此外：this.img 可以用于图像计算 typeof this.img == "imageData"
        }
    },
    "canel":{
        "btnTitle":"取消canel",
        "callback":function(){}
        }
}});
</script>
```