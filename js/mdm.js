window.onload=function(){
    window.onscroll=function(){
        if(document.body.scrollTop> 200 ||
            document.documentElement.scrollTop>200){
                $('.mdui-fab-fixed').removeClass('mdui-fab-hide');
                $('#sidebar').addClass("fixPosition");
        }else{
            $(".mdui-fab-fixed").addClass('mdui-fab-hide');
            $('#sidebar').removeClass("fixPosition");
        }
    }
    //返回顶部点击事件
    $('.mdui-fab').on('click',function(){
        $('.mdui-fab').addClass('mdui-fab-hide');
        scroll(0,0);
        return false;
    });

    //设置主题
    var da = getCookie('IsDayTime');
    if(da==null || da=='' || da=='true'){
        setTheme('true');
    }
    else if(da=='false'){
        setTheme('false');
    }

    // 图片懒加载
    FunLazy({
        strictLazyMode: true,
        effect:"fadeIn",
        useErrorImagePlaceholder : "/8.jpg",
        onError:function(el, img){

        }
    });
}

//主题切换
function themeChange(){
    var _data = getCookie('IsDayTime');
    if(_data=='false'){
        setCookie('IsDayTime','true');
        setTheme('true');
    }
    else
    {
        setCookie('IsDayTime','false');
        setTheme('false');
    }
}
function setCookie(key,value){
    var date = new Date();
    date.setTime(date.getTime() + 365*24*3600*1000);
    document.cookie = key + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
};

function getCookie(name){
    var _name=name+'=';
    var list=document.cookie.split(';');
    for (var i = 0; i < list.length; i++) {
        var item=list[i].trim();
        if(item.indexOf(_name)==0)
            return item.substring(_name.length,item.length);
    }
    return '';
}

//true  day
//false night
function setTheme(DayTime){
    if(DayTime=='true'){
        $('body').removeClass('mdm_theme_dark');
        $('#themeIcon').text("brightness_7");
    }
    else{
        $('body').addClass('mdm_theme_dark');
        $('#themeIcon').text("brightness_4");
    }
}

//图片预览
function createImgPrevious() {
    var imgs = $(".article-content").find("img");
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onclick = function (e) {
            var src = e.srcElement.currentSrc;
            var _this = $(this);
            createCover(src,_this);
        }
    }
    function createCover(src,_this) {
        console.log(_this);
        console.log(src);
        var cover = $("<div id='outerDiv'  style='position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);z-index:5;width:100%;height:100%;display:none;'><div id='innerDiv' style='position:absolute;'><img  id='bigImg' style='border:5px solid #fff;' src=''/></div></div>");
        $("#outerDiv").remove();
        $("body").append(cover);
        imgShow("#outerDiv", "#innerDiv", "#bigImg", _this,src);
    }
}

function imgShow(outerDiv, innerDiv, bigImg, _this,src) {
    //var src = _this.attr("src"); //获取当前点击的common-img元素中的src属性
    $(bigImg).attr("src", src); //设置#bigImg元素的src属性

    /*获取当前点击图片的真实大小，并显示弹出层及大图*/
    $("img").attr("src", src).load(function () {
        var windowW = $(window).width(); //获取当前窗口宽度
        var windowH = $(window).height(); //获取当前窗口高度
        var realWidth = this.width; //获取图片真实宽度
        var realHeight = this.height; //获取图片真实高度
        var imgWidth, imgHeight;
        var scale = 0.8; //缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

        if (realHeight > windowH * scale) { //判断图片高度
            imgHeight = windowH * scale; //如大于窗口高度，图片高度进行缩放
            imgWidth = imgHeight / realHeight * realWidth; //等比例缩放宽度
            if (imgWidth > windowW * scale) { //如宽度仍大于窗口宽度
                imgWidth = windowW * scale; //再对宽度进行缩放
            }
        } else if (realWidth > windowW * scale) { //如图片高度合适，判断图片宽度
            imgWidth = windowW * scale; //如大于窗口宽度，图片宽度进行缩放
            imgHeight = imgWidth / realWidth * realHeight; //等比例缩放高度
        } else { //如果图片真实高度和宽度都符合要求，高宽不变
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
        $(bigImg).css("width", imgWidth); //以最终的宽度对图片缩放

        var w = (windowW - imgWidth) / 2; //计算图片与窗口左边距
        var h = (windowH - imgHeight) / 2; //计算图片与窗口上边距
        $(innerDiv).css({ "top": h, "left": w }); //设置#innerDiv的top和left属性
        //console.log('****')
        $(outerDiv).fadeIn("fast"); //淡入显示#outerDiv
    });

    $(outerDiv).click(function () { //再次点击淡出消失弹出层
        $(this).fadeOut("fast");
    });
}

setTimeout(function () {
    createImgPrevious();
}, 1000)