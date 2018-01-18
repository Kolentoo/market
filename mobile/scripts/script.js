$(function(){

    _IsIOS();
    listenTest();
    codeTime();
    artApi();
    closePop();
    setTimeout(function() {
        $('body').addClass('body-on');
    }, 100);

    $("img.lazy").lazyload({effect: "fadeIn"});


    var swiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
    });   

    $('.listen-btn').on('click',function(){
        $('body,html').animate({scrollTop:0},800);
    });

    $(window).scroll( function() {
        var w = $(window).scrollTop();

        if (w >= 500) {
                $(".nav").addClass('nav-on');
            } else {
                $(".nav").removeClass('nav-on');
            }
    }).trigger("scroll");
    
});

var panda = 'http://www.dfth.com/';
// var panda = 'http://192.168.1.227:8080/';

// 判断设备
function _IsIOS() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iPhone\sOS/i) == "iphone os") {
        $('.month-box').addClass('month-ios');
        $('body').children('div').addClass('pf').removeClass('sy');
        return true;
    }else{
        $('body').children('div').removeClass('pf').addClass('sy');
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

// 试听验证
function listenTest(){
    var inputCon = $('.apply-listen').find('input');
    inputCon.on('input propertychange',function(){
        var Lphone = $('apply-listen').find('.phone');
        var Lname = $('.apply-listen').find('.name')
        listenCheck();
    });
}

// 试听申请按钮唤醒
function listenCheck(){
    var Lname = $('.apply-listen').find('.name');
    var Lcode = $('.apply-listen').find('.code');
    var Lphone = $('.apply-listen').find('.phone');
    if(nameCheck(Lname)==false){
        Lname.parent('.infor-item').addClass('intro-wrong');
        $('.refer').removeClass('refer-on');
        return false;
    }else if(nameCheck(Lname)==true){
        if(phoneCheck(Lphone)==false){
            Lphone.parent('.infor-item').addClass('intro-wrong');
            $('.refer').removeClass('refer-on');
            return false;
        }else if(phoneCheck(Lphone)==true){
            if(Lcode.val().length>3){
                $('.refer').addClass('refer-on');
                return true;
            }else{
                $('.refer').removeClass('refer-on');
                return false;
            }
        }
    }
}

// 验证码倒计时
function codeTime(){
    var btn1 = $('.code-btn').find('.p1');
    var btn2 = $('.code-btn').find('.p2');
    btn1.on('click',function(){
        var Lphone = $('.apply-listen').find('.phone');
        if(phoneCheck(Lphone)==false){
            return false;
        }else if(phoneCheck(Lphone)==true){
            btn1.addClass('hide');
            btn2.removeClass('hide');
            var i = 60;
            var time1 = setInterval(function(){               
                if(i == 0) {
                        clearInterval(time1);
                        btn1.removeClass('hide');
                        btn2.addClass('hide');
                    }
                    btn2.find('i').text(i--);
            },1000);
            return true;
        }
    });
}

// 姓名验证
function nameCheck(b){
    var regName = /^[\u4e00-\u9fa5A-Za-z]*$/;
    if($(b).val()){
        if(regName.test($(b).val())){
            $(b).parent('.infor-item').removeClass('infor-wrong');
            return true;
        }else{
            $(b).parent('.infor-item').addClass('infor-wrong');
            $(b).parent('.infor-item').find('.hint').text('姓名错误');
        }
    }else{
        $(b).parent('.infor-item').addClass('infor-wrong');
        $(b).parent('.infor-item').find('.hint').text('姓名不能为空');
        return false;
    }
}

// 手机号验证
function phoneCheck(a){
    var regPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; 
    if(!$(a).val()){
        $(a).parents('.infor-item').addClass('infor-wrong');
        $(a).parents('.infor-item').find('.hint').text('手机号不能为空');
        $('.refer').removeClass('refer-on');
        return false;
    }else if(!regPhone.test($(a).val())){
        $(a).parents('.infor-item').addClass('infor-wrong');
        $(a).parents('.infor-item').find('.hint').text('手机号错误');
        $('.refer').removeClass('refer-on');
        return false;
    }else{
        $('.refer').addClass('refer-on');
        $(a).parents('.infor-item').removeClass('infor-wrong');
        return true;
    }
}

// 申请试听
function artApi(){
    if($('.market-index').get(0)){
        var cbtn = $('.code-btn');
        var btn1 = cbtn.find('.p1');
        var btn2 = cbtn.find('.p2');
        
        btn1.on('click', function() {
            var uphone = $('.phone');
            var uphoneVal = uphone.val();
            phoneCheck(uphone);
            if (phoneCheck(uphone) == false) {
                return false;
            } else if (phoneCheck(uphone) == true) {
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
            var uname = $('.name').val();
            var city1 = $(".city1").find("option:selected").text();
            var city2 = $(".city2").find("option:selected").text();
            var sid = $('.session').text();
            var uphone = $('.phone');
            var uphoneVal = uphone.val();
            var ucode = $('.code');
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
                                    $.ajax({
                                        type:'GET',
                                        cache:'false',
                                        url:panda+'LandApplyListen?SESSION_ID='+sid,
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

        $('.code').on('input propertychange',function(){
            $('.code').parents('.infor-item').removeClass('infor-wrong');
        });
    }
}

function closePop(){
    $('.sign-btn').on('click',function(){
        $('.sign-success').addClass('hide');
        $('.sign-failed').addClass('hide');
        maskoff();
    });
}


