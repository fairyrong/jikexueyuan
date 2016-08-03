//动画模块
define(function(require, exports, module) {

    var anmition = {};

    /*搜索框失焦,聚焦事件*/
    anmition.changeSearchByClick = function() {
        /*点击输入框触发事件*/
        $('.searchInput').on({
            focus: function() {
                $('.hotWord').hide();
                $('.searchButton').addClass("searchButton-hover");
            },
            blur: function() {
                $('.searchButton').removeClass("searchButton-hover");
                if ($(this).val() == '') { //移出时只有搜索框为空才显示热词
                    $('.hotWord').show();
                } else { //不为空时搜索按钮为绿色
                    $('.searchButton').addClass("searchButton-hover");
                }
            }
        });
        /*滑动提交按钮触发*/
        $('.searchButton').on({
            mouseenter: function() {
                $(this).addClass("searchButton-hover");
            },
            mouseleave: function() {
                $(this).removeClass("searchButton-hover");
            }

        });

    }

    /*点击消息事件*/
    anmition.showMessageByClick = function() {
        $('.message').on({
            focus: function() {
                $('.messageBox').show();
            },
            blur: function() {
                $('.messageBox').hide();
            }

        });
    }

    /*鼠标经过用户名*/
    anmition.showUserByHover = function() {
        $('.user').hover(function() {
            $('.userMenu').toggle();
        });
    }

    /*头部导航条显示动画*/
    anmition.showHeadNavByHover = function() {
            $('.navInner').hover(function() {
                $('.navDetail').toggle();
            });
        }
        /*侧边栏导航*/
    anmition.showLeftNavByHover = function() {
            $('#lesson-nav>ul>li').hover(function() {
                $(this).find('.lessonlist').toggle();
            });
        }
        /*精品课程动画*/
    anmition.showExcellentByHover = function() {
            $(".excellent-lessons-box").hover(function() {
                $(this).find(".description").toggle(0.1);
            });
        }
        /*直播课程列表切换*/
    anmition.changeliveLessonByClick = function() {
            $(".livebox-week li").click(function() {
                var week = $(this);
                week.addClass("liveweek-show").siblings().removeClass("liveweek-show")
                $('.livebox-lesson-list').eq(week.index()).addClass("lesson-list-show").siblings().removeClass("lesson-list-show")
            });
        }
        /*热门课程列表切换*/
    anmition.changeHotLessonByHover = function() {

        $(".pos").hover(function() {
            var lesson = $(this);
            lesson.addClass("pos-hover").siblings().removeClass("pos-hover")
            $('.lesson-first-day').eq(lesson.index()).addClass("lesson-first-show").siblings().removeClass("lesson-first-show")
        });
        $(".lesson-first-list").hover(function() {
            $(this).find('.lesson-text,.lesson-text-show,.lesson-img-hover').toggle()
        })
    }

    /*知识体系图翻转动画*/
    anmition.flipSystemByHover = function() {
            $(".ta-center-s2").on({
                mouseenter: function() {
                    $(this).find(".double-side").css("animation", "show-back 1s");
                    $(this).find(".double-side").css("transform", "rotateY(180deg)");
                },
                mouseleave: function() {
                    $(this).find(".double-side").css("animation", "show-front 0.5s");
                    $(this).find(".double-side").css("transform", "rotateY(0deg)");
                }
            });
        }
        /*图书翻页*/
    anmition.changeBookByHover = function() {
            $(".wikiBook").on({
                mouseenter: function() {
                    $(this).find('.have-a-look').show(0.5)
                    $(this).find(".cover img").addClass('book')
                    $(this).css("color", "#35b558")
                },
                mouseleave: function() {
                    $(this).find('.have-a-look').hide(0.5)
                    $(this).find(".cover img").removeClass('book')
                    $(this).css("color", "#666")
                }
            });

        }
        /*页面底部动画*/
    anmition.changeFooterIconByHover = function() {
        $('.weibo').hover(function() { $(this).toggleClass("weibo-hover") })
        $('.weixin').hover(function() {
            $(this).toggleClass("weixin-hover")
            $('.QR').toggle(0.1)
        })
        $('.tieba').hover(function() { $(this).toggleClass("tieba-hover") })
    }

    module.exports = anmition;

});
