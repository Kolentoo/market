$(function(){

    // 延迟加载
    if($('.pic-lazy').get(0)){
        $("img.lazy").lazyload({
            placeholder : "pc/images/gray.gif", //用图片提前占位
                // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
            effect: "fadeIn", // 载入使用何种效果
                // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
            threshold: 1300, // 提前开始加载
                // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
            failurelimit : 10 // 图片排序混乱时
                // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
        });
    }

    $('.back').on('click',function(){
        $('body,html').animate({scrollTop:0},800);
    });

    $('.apply-listen').on('click',function(){
        $('.listen-box').addClass('pop-out');
        maskon();
    });

    // 表单动效
    if($('.listen-con').get(0)){
        $('.listen-con').addClass('listen-on');
    }

    if($('.dfth-art').get(0)||$('.dfth-coop').get(0)){
        var width = $(window).width();
        if(width<=1366){
            $('.common-back').addClass('common-back-s');
        }
        $(window).scroll( function() {
            var bannerTop = $('.banner').height();
            var w = $(window).scrollTop();
            if (w >= bannerTop) {
                    $(".backto").addClass('back-on');
                } else {
                    $(".backto").removeClass('back-on');
                }
        }).trigger("scroll");
    }


    // 隐藏站长统计               
    $('.nav-body').children('a').addClass('hide');
    $('.nb').children('a').addClass('hide');
    $('.dfth-school').children('a').addClass('hide');
    
    webTab(); 
    commonTop();
    commonBottom();
    timeCatch();
    listenWakeup();
    popClose();
    lessonPop();
    enviroment();
    market();
    popclose();
    artScroll();
    browser();
    artPop();
    marketBtn();
    indexPop();
    // 接口部分
    artApi();
});

var panda = 'http://www.dfth.com/';
// var panda = 'http://192.168.1.227:8080/';

// 浏览器判断
function browser(){
    if ($.browser.msie && parseInt($.browser.version) < 10){
        if($('.dfth-myself').get(0)){

        }else{
            var ipt = $('input[type="text"]');
            ipt.each(function(a,b){
                var holder = $(b).attr('placeholder');
                $(b).val(holder);
            });
        }
        ipt.on('focus',function(){
            $(this).val('');
        });
    }
}

function indexPop(){
    // if($('.dfth-index').get(0)){
        var btn1 = $('.item1').find('.main-lesson').find('.des-btn');
        var btn2 = $('.item2').find('.main-lesson').find('.des-btn');
        var btn3 = $('.item1').find('.other-lesson').find('.des-btn');
        var btn4 = $('.item2').find('.other-lesson').find('.des-btn');
        btn1.on('click',function(){
            $('.pg1').find('.pop-inner').eq(0).removeClass('hide');
            $('.pg1').find('.pop-inner').eq(0).find('img.lazy').lazyload({effect: "fadeIn"});
            maskon();
        });
        btn2.on('click',function(){
            $('.pg2').find('.pop-inner').eq(0).removeClass('hide');
            $('.pg2').find('.pop-inner').eq(0).find('img.lazy').lazyload({effect: "fadeIn"});
            var w = $(window).scrollTop();
            $("html,body").animate({"scrollTop": w+1}, 100); 
            maskon();
        });
        btn3.on('click',function(){
            var t = $(this);
            var tp = t.parent('.lesson-list');
            var tindex = tp.index();
            $('.pg1').find('.pop-inner').eq(tindex+1).removeClass('hide');
            $('.pg1').find('.pop-inner').eq(tindex+1).find('img.lazy').lazyload({effect: "fadeIn"});
            maskon();
        });
        btn4.on('click',function(){
            var t = $(this);
            var tp = t.parent('.lesson-list');
            var tindex = tp.index();
            $('.pg2').find('.pop-inner').eq(tindex+1).removeClass('hide');
            $('.pg2').find('.pop-inner').eq(tindex+1).find('img.lazy').lazyload({effect: "fadeIn"});
            var w = $(window).scrollTop();
            $("html,body").animate({"scrollTop": w+1}, 100); 
            maskon();
        });
    // }
}

//校区环境轮播图
function enviroment(){
    if($('.swiper-enviro').get(0)){
        var swiperEnviro = new Swiper('.swiper-enviro',{
            pagination: '.pagination',
            paginationClickable: true,
            slidesPerView: 3,
            loop: true
        });
        $('.arrow3').on('click', function(e){
            e.preventDefault();
            swiperEnviro.swipePrev();
        });
        $('.arrow4').on('click', function(e){
            e.preventDefault();
            swiperEnviro.swipeNext();
        });
    }
}

// 全局遮罩层显示
function maskon(){
    $('body').append(
        '<div class="common-mask"></div>'
    );
    setTimeout(function() {
        $('.common-mask').addClass('mask-on');
    }, 200);
}

// 全局遮罩层消失
function maskoff(){
    $('.common-mask').removeClass('mask-on');
    $('.common-mask').remove();
}

// 弹窗关闭
function popClose(){
    $('.pop-close').on('click',function(){
        $('.pop-group').find('.pop-inner').addClass('hide');
        $('.pop-fail').addClass('hide');
        $('.pop-success').addClass('hide');
        maskoff();  
    });
}

// 美术教育弹窗
function lessonPop(){
    $('.lc1').find('.lesson-list').on('click',function(){
        var o = $(this);
        var oindex = o.index();
        $('.pg1').children('.pop-inner').eq(oindex).removeClass('hide');
        $('.pg1').children('.pop-inner').find('img').lazyload({effect: "fadeIn"});
        maskon();
    });

    $('.lc2').find('.lesson-list').on('click',function(){
        var o = $(this);
        var oindex = o.index();
        $('.pg2').children('.pop-inner').eq(oindex).removeClass('hide');
        var w = $(window).scrollTop();
        $("html,body").animate({"scrollTop": w+1}, 100); 
        maskon();
    });
}

// 全局tab切换
function webTab(){
    $('.hd-list').on('click',function(){
        var o = $(this);
        var oindex = o.index();
        var os = o.siblings();
        os.removeClass('on');
        o.addClass('on');
        var item1 = o.parents('.pop-con').find('.item-bd').find('.item').eq(oindex);
        var item2 = item1.siblings();
        console.log(oindex)
        item2.addClass('hide');
        item1.removeClass('hide');
        setTimeout(function() {
            $('.item').eq(oindex).find("img.lazy").lazyload({
                effect: "fadeIn" 
            });
            if($('.work-group').get(0)){
                $('.work-group').find("img.lazy").lazyload({
                    effect: "fadeIn" 
                });
            }
        }, 1);

        if($('.dfth-index').get(0)){
            setTimeout(function() {
                $('.main-lesson').find('h3').addClass('h3-on');
                $('.main-lesson').find('.p1').addClass('p1-on');
                $('.main-lesson').find('.des-btn').addClass('des-btn-in');
                $('.lesson-box').find('.main-pic').addClass('main-pic-on');
                $('.lesson-list').find('.other-pic').addClass('other-pic-on');
                $('.lesson-list').find('.lesson-title').addClass('lesson-title-on');
                $('.lesson-list').find('.lesson-des').addClass('lesson-des-on');
                $('.lesson-list').find('.lesson-btn').addClass('lesson-btn-on');
                item1.find('img').lazyload({effect: "fadeIn"});
            }, 1);
        }
    });
}

// 全局头部
function commonTop(){
    if($('.common-top').get(0)){
        $('.common-top').append(
            '<div class="menu-box clearfix">'+
                '<a href="dfthHome" class="logo block fl"><img class="vm g10" src="pc/images/logo.png" alt=""></a>'+
                '<ul class="menu-con clearfix">'+
                    '<li class="menu-list fl"><a href="dfthHome">'+
                        '<p class="p1">首页</p>'+
                        '<p class="p2">首页</p>'+
                    '</a></li>'+
                    '<li class="menu-list fl"><a href="dfthArt">'+
                        '<p class="p1">美术教育</p>'+
                        '<p class="p2">美术教育</p>'+
                    '</a></li>'+
                    '<li class="menu-list fl"><a href="dfthCoop">'+
                        '<p class="p1">授权合作</p>'+
                        '<p class="p2">授权合作</p>'+
                    '</a></li>'+
                    '<li class="menu-list fl"><a href="dfthPro">'+
                        '<p class="p1">创艺产品</p>'+
                        '<p class="p2">创艺产品</p>'+
                    '</a></li>'+
                    '<li class="menu-list fl"><a href="dfthGallery">'+
                        '<p class="p1">在线画廊</p>'+
                        '<p class="p2">在线画廊</p>'+
                    '</a></li>'+
                    '<li class="menu-list fl"><a href="dfthAbout">'+
                        '<p class="p1">品牌故事</p>'+
                        '<p class="p2">品牌故事</p>'+
                    '</a></li>'+
                    '<li class="menu-list fl"><a href="dfthJoinus">'+
                        '<p class="p1">加入我们</p>'+
                        '<p class="p2">加入我们</p>'+
                    '</a></li>'+
                    '<li class="menu-list fl"><a href="dfthSchool">'+
                        '<p class="p1">校区查询</p>'+
                        '<p class="p2">校区查询</p>'+
                    '</a></li>'+
                    '<li class="menu-list fl"><a href="dfthIntro">'+
                        '<p class="p1">学员中心</p>'+
                        '<p class="p2">学员中心</p>'+
                    '</a></li>'+
                '</ul>'+
            '</div>'
        );

        var location = $('.location-tips').text();
        var mlist = $('.common-top').find('.menu-list');
        mlist.each(function(a,b){
            var ot = $(b).find('a').text();
            if(location===ot){
                $(b).addClass('on');
            }
        });
    }
}

// 全局底部
function commonBottom(){
    if($('.bottom').get(0)){
        $('.bottom').append(
            '<div class="bottom-inner">'+
                '<div class="bottom-con clearfix">'+
                    '<div class="bottom-menu clearfix fl">'+
                        '<ul class="menu-con fl">'+
                            '<li class="menu-list first"><a>美术教育</a></li>'+
                            '<li class="menu-list"><a href="dfthArt?course">课程体系</a></li>'+
                            '<li class="menu-list"><a href="dfthArt?enviro">门店环境</a></li>'+
                            '<li class="menu-list"><a href="dfthSearch">师资查询</a></li>'+
                        '</ul>'+
                        '<ul class="menu-con fl">'+
                            '<li class="menu-list first"><a>创艺产品</a></li>'+
                            '<li class="menu-list"><a href="dfthPro">涂鸦涂本</a></li>'+
                            '<li class="menu-list"><a href="dfthPro?hb">画笔画材</a></li>'+
                            '<li class="menu-list"><a href="dfthPro?nt">超级粘土</a></li>'+
                            '<li class="menu-list"><a href="dfthPro?bh">创艺宝盒</a></li>'+
                            '<li class="menu-list"><a href="dfthPro?diy">DIY手工</a></li>'+
                        '</ul>'+
                        '<ul class="menu-con fl">'+
                            '<li class="menu-list first"><a>公司</a></li>'+
                            '<li class="menu-list"><a href="dfthSchool">校区查询</a></li>'+
                            '<li class="menu-list"><a href="dfthAbout">品牌故事</a></li>'+
                            '<li class="menu-list"><a href="dfthJoinus">加入我们</a></li>'+
                            '<li class="menu-list"><a href="dfthNews">新闻动态</a></li>'+
                            '<li class="menu-list"><a href="dfthCooplink">合作伙伴</a></li>'+
                        '</ul>'+
                    '</div>'+
                    '<div class="company-detail fr clearfix">'+
                        '<p class="phone">400-895-6006</p>'+
                        '<p class="address">上海市徐汇区 吴兴路 281号紫江大厦 3楼（总部）</p>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="bottom-other clearfix">'+
                '<div class="p1 fl">'+
                    '办学许可证：教民3101037020118号 沪ICP备08111589号<em>版权所有 东方童画（上海）教育科技有限公司</em>'+
                    '<img class="vm beian" src="pc/images/beian.jpg" alt=""><span class="s1">沪公网安备 31010402000339号</span>'+
                '</div>'+
                '<div class="share fr">'+
                    '<a class="wechat-box">'+
                        '<img class="share-icon vm" src="pc/images/wechat.png" alt="">'+
                        '<img class="share-icon2 vm hide" src="pc/images/wechatcode.png" alt="">'+
                    '</a>'+
                    '<i>|</i>'+
                    '<a href="https://weibo.com/512398902?sudaref=www.baidu.com&display=0&retcode=6102&sudaref=passport.weibo.com"><img class="share-icon vm weibo-icon" src="pc/images/weibo.png" alt=""></a>'+
                '</div>'+
            '</div>'
        );

        $('.wechat-box').on('mouseenter',function(){
            $('.wechat-box').find('.share-icon').attr('src','pc/images/wechat2.png');
            $('.share-icon2').removeClass('hide');
        });
        $('.wechat-box').on('mouseleave',function(){
            $('.wechat-box').find('.share-icon').attr('src','pc/images/wechat.png');
            $('.share-icon2').addClass('hide');
        });

        $('.weibo-icon').on('mouseenter',function(){
            $('.weibo-icon').attr('src','pc/images/weibo2.png');
        });
        $('.weibo-icon').on('mouseleave',function(){
            $('.weibo-icon').attr('src','pc/images/weibo.png');
        });
    }
}

// 手机号验证
function phoneCheck(a) {
    var regPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; 
    if (!$(a).val()) {
        $(a).parents('.infor-item').addClass('infor-wrong');
        $(a).parents('.infor-item').find('.hint').find('.p1').text('手机号不能为空');
        $('.refer').removeClass('refer-on');
        return false;
    } else if (!regPhone.test($(a).val())) {
        $(a).parents('.infor-item').addClass('infor-wrong');
        $(a).parents('.infor-item').find('.hint').find('.p1').text('手机号格式错误');
        $('.refer').removeClass('refer-on');
        return false;
    } else {
        $(a).parents('.infor-item').removeClass('infor-wrong');
        return true;
    }
}

// 姓名验证
function nameCheck(b) {
    var regName = /^[\u4e00-\u9fa5A-Za-z]*$/;
    if ($(b).val()) {
        if (regName.test($(b).val())) {
            $(b).parent('.infor-item').removeClass('infor-wrong');
            return true;
        } else {
            $(b).parent('.infor-item').addClass('infor-wrong');
            $(b).parent('.infor-item').find('.hint').find('.p1').text('姓名格式错误');
            return false;
        }
    } else {
        $(b).parent('.infor-item').addClass('infor-wrong');
        $(b).parent('.infor-item').find('.hint').find('.p1').text('姓名不能为空');    
        return false;
    }
}

// 验证码倒计时
function timeCatch() {
    var cbtn = $('.code-btn');
    var btn1 = cbtn.find('.p1');
    var btn2 = cbtn.find('.p2');

    btn1.on('click', function() {
        var uphone = $('.uphone');
        var uphoneVal = uphone.val();
        phoneCheck(uphone);
        if (phoneCheck(uphone) == false) {
            return false;
        } else if (phoneCheck(uphone) == true) {
            btn1.addClass('hide');
            btn2.removeClass('hide');
            btn2.find('i').text('60');
            var i = btn2.find('i').text();
            var itext = parseInt(i);
            var timeNum = setInterval(function () {
                if (itext == 0) {
                    clearInterval(timeNum);
                    btn1.removeClass('hide');
                    btn2.addClass('hide');
                }
                btn2.find('i').text(itext--);
            }, 1000);
        }
    });
}

// 美术教育自动跳转
function artScroll(){
    if($('.dfth-art').get(0)){
        var curl = window.location.href;
        if(curl.indexOf('?')>=0){
            var cgroup = curl.split('?');
            var ctips = cgroup[1];
            var ltop = $('.lesson-box').offset().top;
            var etop = $('.enviroment-box').offset().top;
            var qtop = $('.query-box').offset().top;
            if(ctips=='course'){
                $('body,html').animate({scrollTop:ltop},800);
            }else if(ctips=='enviro'){
                $('body,html').animate({scrollTop:etop},800);
            }
        }
    }
}

// 免费视听验证
function listenTest() {
    if($('.art-market').get(0)){
        var uname = $('.uname');
        var uphone = $('.uphone');
        var ucode = $('.ucode');
        var uplace = $('.uplace');
        var sid = $('.session').text();
        if (uname.val()) {
            if (nameCheck(uname) == false) {
                $('.refer').removeClass('refer-on');
                uname.parent('.infor-item').addClass('infor-wrong');
                uname.parent('.infor-item').find('.hint').find('.p1').text('姓名格式错误');
                $('.refer').removeClass('refer-on');
                return false;
            }else if(nameCheck(uname) == true){
                if(uphone.val()){
                    if(phoneCheck(uphone) == false){
                        $('.refer').removeClass('refer-on');
                        uphone.parent('.infor-item').addClass('infor-wrong');
                        uphone.parent('.infor-item').find('.hint').find('.p1').text('手机号格式错误');
                        return false;
                    }else if(phoneCheck(uphone) == true){
                        if(ucode.val().length>3){
                            ucode.parents('.infor-item').removeClass('infor-wrong');
                            $('.refer').addClass('refer-on');
                            return true;
                        }else{
                            ucode.parents('.infor-item').addClass('infor-wrong');
                            ucode.parents('.infor-item').find('.hint').find('.p1').text('验证码不能为空');
                            $('.refer').removeClass('refer-on');
                            return false;
                        }
                    }
                }else{
                    $('.refer').removeClass('refer-on');
                    uphone.parent('.infor-item').addClass('infor-wrong');
                    uphone.parent('.infor-item').find('.hint').find('.p1').text('手机号不能为空');
                    $('.refer').removeClass('refer-on');
                    return false;
                }
            }
        }else{
            $('.refer').removeClass('refer-on');
            uname.parent('.infor-item').addClass('infor-wrong');
            uname.parent('.infor-item').find('.hint').find('.p1').text('姓名不能为空');
            return false;
        }
    }
}

// 视听申请唤醒
function listenWakeup() {
    var listenInput = $('.listen-box').find('input');
    var listenSelect = $('.listen-box').find('select');
    listenInput.on('input propertychange', function() {
        listenTest();
    });
    listenSelect.on('change',function(){
        listenTest();
    });
}

// 市场推广页面
function market(){
    if($('.dfth-market').get(0)){
        var marketBox = $('.market-box');
        $('.menu-list').on('click',function(){
            var t = $(this);
            var ts = t.siblings('.menu-list');
            t.find('.menu-list').addClass('menu-on');
            ts.find('.menu-list').removeClass('menu-on');
            var tindex = t.index();
            var section = marketBox.eq(tindex);
            var stop = section.offset().top;
            $('body,html').animate({scrollTop:stop-100},800);
        });

        $('.listen').on('click',function(){
            $('body,html').animate({scrollTop:0},800);
        });

        $(window).scroll( function() {
            var w = $(window).scrollTop();
            var mTop = marketBox.offset().top;

            if (w >= 100) {
                    $(".market-top").addClass('market-on market-nav');
                } else {
                    $(".market-top").removeClass('market-on market-nav');
                }

            marketBox.each(function(a,b) {
                var ctop = $(this).offset().top;
                if (w>ctop-110) {
                    $('.market-top').find('.menu-list').removeClass('menu-on');
                    $('.market-top').find('.menu-list').eq(a).addClass('menu-on');
                }
            });
        }).trigger("scroll");
    }
}

// 弹窗关闭
function popclose(){
    $('.pop-close').on('click',function(){
        $('.pop').addClass('hide');
        $('.listen-box').removeClass('pop-out');
        maskoff();
    });
}

// 美术教育授权合作弹窗
function artPop(){
    $('.dfth-pop').find('.banner').find('.des-btn').on('click',function(){
        $('.listen-box').addClass('pop-out');
        maskon();
    });

    $('.lesson-pop').find('.des-btn').on('click',function(){
        var  o = $(this);
        var op = o.parents('.pop-inner');
        if($('.dfth-market').get(0)){
            op.addClass('hide');
            maskoff();
            $('body,html').animate({scrollTop:0},800);
        }else{
            op.addClass('hide');
            $('.listen-box').addClass('pop-out');
        }
    });

}


// 接口部分
function artApi(){
    if($('.dfth-listen').get(0)){
        var cbtn = $('.code-btn');
        var btn1 = cbtn.find('.p1');
        var btn2 = cbtn.find('.p2');
        
        btn1.on('click', function() {
            var uphone = $('.uphone');
            var uphoneVal = uphone.val();
            phoneCheck(uphone);
            if (phoneCheck(uphone) == false) {
                return false;
            } else{
                $.ajax({
                    type:'GET',
                    cache:'false',
                    url:panda+'LandPsendCode',
                    data:{'phone':uphoneVal},
                    dataType:'json',
                    success:function(data){
                        var SESSION_ID = data.SESSION_ID;
                        $('.session').text(SESSION_ID);
                        btn1.addClass('hide');
                        btn2.removeClass('hide');
                        btn2.find('i').text('60');
                        var i = btn2.find('i').text();
                        var itext = parseInt(i);
                        var timeNum = setInterval(function () {
                            if (itext == 0) {
                                clearInterval(timeNum);
                                btn1.removeClass('hide');
                                btn2.addClass('hide');
                            }
                            btn2.find('i').text(itext--);
                        }, 1000);  
                    },
                    error:function(data){
                    }  
                });
            }
        });

        $('.refer').on('click',function(){
            var uname = $('.uname').val();
            var city1 = $(".city1").find("option:selected").text();
            var city2 = $(".city2").find("option:selected").text();
            var sid = $('.session').text();
            var uphone = $('.uphone');
            var uphoneVal = uphone.val();
            var ucode = $('.ucode');
            var curl = window.location.href;
            if(curl.indexOf('=')>-1){
                var sGroup = curl.split('=');
                var cVal = sGroup[1];
            }else{
                var cVal = "";
            }

            if($('.refer').hasClass('refer-on')){
                if(ucode.val()){
                    if(ucode.val().length>3){
                        $.ajax({
                            type:'GET',
                            cache:'false',
                            url:panda+'LandCodeSure?SESSION_ID='+sid,
                            data:{'phone':uphoneVal,'code':ucode.val()},
                            dataType:'json',
                            success:function(data){
                                if(data.status===0){
                                    ucode.parents('.infor-item').addClass('infor-wrong');
                                    ucode.parents('.infor-item').find('.hint').find('.p1').text(data.msg);   
                                    return false;
                                }else if(data.status===1){
                                    if(city2==="全部"){
                                        city2="";
                                    }
                                    var city3 = city1+city2;
                                    var curl = window.location.href;
                                    var pramas = window.location.search.slice(1);
                                    $.ajax({
                                        type:'GET',
                                        cache:'false',
                                        url:panda+'LandApplyListen?SESSION_ID='+sid+'&'+pramas,
                                        data:{'phone':uphoneVal ,'name':uname,'code':ucode.val(),'area':city3,'tgid':cVal},
                                        dataType:'json',
                                        success:function(message){
                                            if(message.status===0){
                                                $('.pop-fail').removeClass('hide');
                                                $('.pop-fail').find('.p4').text(message.msg);
                                            }else{
                                                $('.pop-success').removeClass('hide');
                                            }
                                            $('.art-pop').removeClass('pop-out');
                                            maskon();
                                        },
                                        error:function(data){
                                        }  
                                    });
                                    ucode.parents('.infor-item').removeClass('infor-wrong');  
                                    return true;
                                }
                            },
                            error:function(data){
                            }  
                        });
                    }else{
                        ucode.parents('.infor-item').removeClass('infor-wrong');  
                        return false;
                    }
                }else{
                    ucode.parents('.infor-item').addClass('infor-wrong');
                    ucode.parents('.infor-item').find('.hint').find('.p1').text('验证码不能为空');   
                    return false;
                }
            }
        });

        $('.ucode').on('input propertychange',function(){
            $('.ucode').parents('.infor-item').removeClass('infor-wrong');
        });
    }
}

function marketBtn(){
    if($('.listen-btn').get(0)){
        $('.listen-btn').on('click',function(){
            $('body,html').animate({scrollTop:0},800);
        });
    }
}

