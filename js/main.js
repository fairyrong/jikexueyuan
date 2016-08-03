//主函数
define(function(require, exports, module) {

    require('jquery');
    /*轮播图模块*/
    require('./slide')($);//共享给JQuery
    /*其他动画模块*/
    var anmition = require('anmition');
    console.log("ok");
  
    $(document).ready(function(){

        //大图轮播,带轮播条
        $("#banner-list-top").slider({size:"560px", haveIndex:true ,isAuto:true});
        //系列课程,宽度不一致
        $("#banner-list-bottom").slider({showNum:3, size:"40px", isFixedWidth:false });
        //合作企业
        $("#company-slider").slider({showNum:6, size:"150px"});
        //合作学校
        $("#university-slider").slider({showNum:7, size:"100px"});
        //媒体播报
        $("#medias-slider").slider({showNum:6, size:"150px"});

        //搜索框点击聚焦失焦
        anmition.changeSearchByClick();

        //点击消息显示消息框
        anmition.showMessageByClick();

        //鼠标划过用户名，显示功能
        anmition.showUserByHover();

        //鼠标滑过头部导航
        anmition.showHeadNavByHover();

        //侧边栏
        anmition.showLeftNavByHover();

        //精品课程显示详情
        anmition.showExcellentByHover();

        //直播课程切换
        anmition.changeliveLessonByClick();

        //热门课程
        anmition.changeHotLessonByHover();

        //知识体系图翻转动画
    	anmition.flipSystemByHover();  
        
        //wiki图书
        anmition.changeBookByHover();

        //底部图标鼠标滑过动画
        anmition.changeFooterIconByHover();
    })
    
});
