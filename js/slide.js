//轮播图插件
// /*slider()可定义变量*/     

// /*节点绑定*/
//innerCls: 'slide-inner', //轮播图
//prevBtnCls: 'slide-prev', //向前一步的class
//nextBtnCls: 'slide-next', //向后一步的class
//listCls:'slide-list',//单独的轮播图

///*动画相关属性*/
//haveIndex: false, //没有索引条
//isAuto: false, //不自动轮播
//isFixedWidth:true,//固定宽度
//size: '150px', //图片！！默认大小

///*不是一张图片时必须填写*/
//showNum:1,//可以看到的图片个数

define(function(require, exports, moudles) {
    //使用JQuery自定义插件
    return function(jquery) {
        (function($) {

            $.fn.slider = function(options) {

                    /*可定义变量*/
                    var defaults = { //默认参数
                        /*节点绑定*/
                        innerCls: 'slide-inner', //轮播图
                        prevBtnCls: 'slide-prev', //向前一步的class
                        nextBtnCls: 'slide-next', //向后一步的class
                        listCls: 'slide-list', //单独的轮播图
                        /*动画相关属性*/
                        haveIndex: false, //没有索引条
                        isAuto: false, //不自动轮播
                        isFixedWidth: true, //
                        size: '150px', //图片！！默认大小
                        showNum: 1, //可以看到的图片个数
                    };

                    /*默认值和参数值合并*/
                    var opts = $.extend(defaults, options);
                    //console.log(opts.size)
                    /*全局变量*/
                    var _ = this,
                        i = 0, //用来移动定位 i*size 就是移动距离
                        num, //实际图片个数
                        imgNum, //展示的图片个数,用于无缝轮播
                        fixDistance, //每次挪动的固定距离,当isFixedWidth为true时才用
                        distance = []; //存放每个slide-list的宽度

                    /*对象定义*/
                    var $this = $(this), //谁调用,this是谁
                        $inner = $this.find("." + opts.innerCls),
                        $prev = $this.find("." + opts.prevBtnCls),
                        $next = $this.find("." + opts.nextBtnCls),
                        $list = $this.find("." + opts.listCls);

                    /*对象属性及方法*/

                    //初始化所有变量
                    this.initVar = function() {

                        //设置--图片!宽度,不是slide
                        $list.find("img").css("width", options.size)
                            //获取图片个数
                        imgNum = $list.length
                        _.clone();
                        //真实图片个数
                        num = $inner.find(".slide-list").size(); //不能是$list.size()
                        //挪动的距离
                        if (opts.isFixedWidth == true) { //一样时
                            fixDistance = $list.outerWidth(true)
                        } else { //不一样时
                            distance[0] = 0;
                            for (var i = 1; i <= num; i++) { //每张图片需要挪动的距离是之前的累加
                                distance[i] = distance[i - 1] + $inner.find(".slide-list").eq(i - 1).outerWidth(true)
                            }
                        }

                        console.log(distance)
                        console.log(num + "/" + fixDistance)
                    };

                    //克隆slide-list,可见个
                    this.clone = function() {
                        $list.each(function(index) {
                            if (index < opts.showNum) {
                                $inner.append($(this).clone())
                            }
                        })
                    };

                    //移动
                    this.move = function(distance) {
                        $inner.stop().animate({ left: distance }, 500)
                    };

                    //向右
                    this.next = function() {

                        var moveDistance;

                        i--;
                        if (i == -1) { //这里很绕,画图理解吧
                            if (opts.isFixedWidth == true) { //如果宽度不固定
                                $inner.css({ left: -(num - opts.showNum) * fixDistance })
                            } else {
                                $inner.css({ left: -distance[num - opts.showNum] })
                            }
                            i = num - opts.showNum - 1;
                        }

                        if (opts.isFixedWidth == true) { //如果宽度不固定
                            moveDistance = -i * fixDistance;
                        } else {
                            moveDistance = -distance[i];
                        }
                        //移动
                        _.move(moveDistance)
                            //同时改变索引条样式
                        if (opts.haveIndex == true) {
                            $this.find(".pagination .pagination-switch").eq(i % imgNum).addClass("pagination-on").siblings().removeClass("pagination-on")
                        }
                    };

                    //向左
                    this.prev = function() {

                        var moveDistance;

                        i++;
                        if (i == imgNum + 1) {
                            if (opts.isFixedWidth == true) { //如果宽度不固定
                                $inner.css({ left: 0 })
                            } else {
                                $inner.css({ left: -distance[0] })
                            }
                            i = 1;
                        }

                        if (opts.isFixedWidth == true) { //如果宽度不固定
                            moveDistance = -i * fixDistance;
                        } else {
                            moveDistance = -distance[i];
                        }
                        //移动
                        _.move(moveDistance)
                        if (opts.haveIndex == true) {
                            //同时改变索引条
                            $this.find(".pagination .pagination-switch").eq(i % imgNum).addClass("pagination-on").siblings().removeClass("pagination-on")
                        }
                    };

                    //点索引
                    this.indexButton = function() {

                        var index = $(this).index(); //
                        //console.log(index);
                        i = index;
                        $inner.animate({ left: -index * fixDistance }, 500)
                        $(this).addClass("pagination-on").siblings().removeClass("pagination-on")

                    };
                    //自动轮播
                    this.auto = function() {

                        var t = setInterval(_.next, 2000)

                        $this.hover(function() {
                            clearInterval(t);
                        }, function() {
                            t = setInterval(_.next, 2000)
                        })

                    };

                    //显示
                    /*初始化函数*/
                    this.init = function() { //初始化

                        //初始化变量
                        _.initVar();
                        $this.on({
                            mouseenter: function() {
                                $prev.show()
                                $next.show()
                            },
                            mouseleave: function() {
                                $prev.hide()
                                $next.hide()
                            }
                        });
                        /*前后点击事件*/
                        $prev.on("click", _.prev);
                        $next.on("click", _.next);

                        /*索引条事件*/
                        if (opts.haveIndex == true) { //如果有索引条
                            $this.find(".pagination .pagination-switch").on("click", _.indexButton);
                        }
                        /*自动轮播事件*/
                        if (opts.isAuto == true) {
                            _.auto();
                        }

                    };

                    _.init();

                }
                /*测试插件*/
                // $.fn.test = function() {
                //     console.log("hello!");
                // };
        })(jquery);
    }
})
