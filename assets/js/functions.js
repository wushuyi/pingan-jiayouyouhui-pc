(function($) {
    $(function() {
        if (Modernizr.canvas) {
            $('.map').html('<canvas id="canvas" width="615" height="420"></canvas>')
        }
    });
	var line = {
        init: function() {
            $("#line > .line_1").width(0);
            $("#line > .line_2").width(0);
            $("#line > .line_3").height(0);
            $("#line > .line_4").width(0);
            $(".icon").hide();
        },
        start: function() {
            var time = 2;
            map.start();
            $("#line>.line_1").animate({
                width: 50
            },
            50 * time,
            function() {
                line.icon($(".icon_1"), -50);
            }).animate({
                width: 240
            },
            190 * time,
            function() {
                line.icon($(".icon_2"), -30);
            }).animate({
                width: "340"
            },
            90 * time,
            function() {
                $("#line > .line_2").animate({
                    width: 195
                },
                100 * time,
                function() {
                    line.icon($(".icon_3"), -40);
                }).animate({
                    width: "195"
                },
                100 * time,
                function() {
                    $("#line > .line_3").height(42).animate({
                        height: 100
                    },
                    100 * time,
                    function() {
                        $('.morebtn').show();
                        line.icon($(".icon_4"), -30);
                    }).animate({
                        height: "164"
                    },
                    164 * time,
                    function() {
                        $("#line > .line_4").animate({
                            width: "152"
                        },
                        152 * time,
                        function() {
                            line.icon($(".icon_5"), -60);
                        });
                    });
                });
            });
        },
        icon: function(obj, val) {
            obj.show().children(".icon_top").css("margin-top", val).animate({
                marginTop: 0
            },
            3800, "easeOutElastic");
        }
    };
    var addoil = {
        init: function() {
            /*$(".iconoil").css({
				height: 0,
				width: 0,
				marginBottom: 100,
				marginLeft: -30,
			});*/
        },
        start: function() {

            TweenLite.from($(".iconoil"), 1, {
                bottom: 100,
                ease: Elastic.easeOut,
                onComplete: function() {
                    line.start();
                }
            });

        }
    };

    var top_icon = {
        start: function() {
            TweenLite.from($(".top_qrcode"), 1, {
                top: -2,
                ease: Elastic.easeOut
            });
        },
        loop: function() {
            var iconloop = setInterval(function() {
                top_icon.start();
            },
            2000);
        }
    }

    var map = {
        init: function() {
            if (Modernizr.canvas) return;
            //$(".map").hide();
            $(".map_oil").css({
                top: 290
            });
            $('.map-di').show()

        },
        start: function() {
            if (Modernizr.canvas) {
                init();
                return;
            }
            $(".map").show();
            $(".map_oil").animate({
                top: 120
            },
            2000, "easeOutQuad");

        }
    };
    var iplookup = {
        addsinfo: "",
        city: "",
        init: function() {
            $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",
            function() {
                iplookup.addsinfo = remote_ip_info;
                if (iplookup.addsinfo != "") {
                    iplookup.view();
                }
            });
        },
        view: function() {
            //console.log(iplookup.addsinfo);
            if (iplookup.addsinfo.city != "") {
                var city = iplookup.addsinfo.city;
            } else {
                var city = iplookup.addsinfo.province;
            }
            //$(".select_1").html(city);
            iplookup.city = city;
            addsList.init();
        }
    }
    var addsList = {
        data: "",
        list: new Array(),
        init: function() {
            $.getJSON("./assets/js/addsjson.js",
            function(data) {
                addsList.data = data.data;
                addsList.start();
            });
            $(".select_2").click(function() {
                $(".city_list").toggleClass("active");
            });
        },
        start: function() {
            var region = "",
            adds = "",
            i, j;
            var adds_list = new Array();
            var autocity = '<div class="select_1">请手动选择地区</div>\n';
            for (i in addsList.data) {
                region += '<li class="region">' + addsList.data[i].region + '<span class="list_icon"></span></li>\n';
                var region_adds = "";
                //console.log(iplookup.city);
                for (j in addsList.data[i].data) {
                    region_adds += '<li><a target="_blank" href="' + addsList.data[i].data[j].link + '" >' + addsList.data[i].data[j].adds + '</a></li>\n';
                    if (addsList.data[i].data[j].adds.toString() == iplookup.city.toString()) {

                        if (addsList.data[i].data[j].adds.indexOf('上海') > -1) {
                            autocity = '<div class="select_1 select_left_btn">' + addsList.data[i].data[j].adds + '</div>';

                            $('.select_left_all').html('<a target="_blank" href="http://creditcard.pingan.com/cms-tmplt/creditecard/searchPreferentialInformDetail.do?wid=40001887"><li>中石油</li></a>' + '<a target="_blank" href="http://creditcard.pingan.com/cms-tmplt/creditecard/searchPreferentialInformDetail.do?wid=40001888"><li>中石化</li></a>')

                            ;

                        } else if (addsList.data[i].data[j].adds.indexOf('北京') > -1) {
                            autocity = '<div class="select_1 select_left_btn">' + addsList.data[i].data[j].adds + '</div>';

                            $('.select_left_all').html('<a target="_blank" href="http://creditcard.pingan.com/cms-tmplt/creditecard/searchPreferentialInformDetail.do?wid=40001897"><li>中石油</li></a>' + '<a target="_blank" href="http://creditcard.pingan.com/cms-tmplt/creditecard/searchPreferentialInformDetail.do?wid=40001898"><li>中石化</li></a>')

                        } else {
                            autocity = '<a target="_blank" href="' + addsList.data[i].data[j].link + '" ><div class="select_1">' + addsList.data[i].data[j].adds + '</div></a>\n';
                        }

                    }
                }
                var num = parseInt(i) + 1;
                adds_list[num] = '<ul class="adds_list adds_list_' + i + '">\n' + region_adds + '</ul>';
            }
            $(".select_1").replaceWith(autocity);
            adds_list[0] = '<ul class="region_list">\n' + region + '</span></ul>';
            addsList.list = adds_list;
            addsList.view();

            $('.select_left_btn').bind('click',
            function() {
                $('.select_left_all').toggle();
            })

        },
        view: function() {
            $(".city_list").html(addsList.list[0]);
            $(".region:last").css({
                "borderBottom": "none"
            });
            $(".region").each(function(i) {
                i += 1;
                $(this).append(addsList.list[i]);
                $(this).click(function() {
                    $(".region").removeClass("active").children(".list_icon").removeClass("active").next().removeClass("active");
                    $(this).addClass("active").children(".list_icon").addClass("active").next().addClass("active");
                });
            });
            addsList.viewReset();
        },
        viewReset: function() {
            var beijing = '<a href="javascript:void(0)" style="height: 26px;">北京</a><span style="display: none;height: 23px;padding-left: 30px;float:left;"><a target="_blank" href="http://creditcard.pingan.com/cms-tmplt/creditecard/searchPreferentialInformDetail.do?wid=40001897" style="display: block;float: left;width: 60px;">中石油</a><a target="_blank" href="http://creditcard.pingan.com/cms-tmplt/creditecard/searchPreferentialInformDetail.do?wid=40001898" style="display: block;float: left;width: 60px;">中石化</a></span>';
            var shanghai = '<a href="javascript:void(0)" style="height: 26px;">上海<img src="assets/images/hot.png" style="margin-left: 4px;"></a><span style="display: none;height: 23px;padding-left: 30px;float:left;"><a target="_blank" href="http://creditcard.pingan.com/cms-tmplt/creditecard/searchPreferentialInformDetail.do?wid=40001887" style="display: block;float: left;width: 60px;">中石油</a><a target="_blank" href="http://creditcard.pingan.com/cms-tmplt/creditecard/searchPreferentialInformDetail.do?wid=40001888" style="display: block;float: left;width: 60px;">中石化</a></span>';
            //更改上海 北京的时候 记得改165行附近的内容
            $(".adds_list_0 li:first").html(beijing).click(function() {
                $(this).toggleClass("list_open");
                if ($(this).attr("class") == "list_open") {
                    $(this).css({
                        "height": "62px"
                    });
                    $(this).children("span").show();
                } else {
                    $(this).css({
                        "height": "auto"
                    });
                    $(this).children("span").hide();
                }
            });; //.css({"height": "62px"});
            $(".adds_list_1 li:first").html(shanghai).click(function() {
                $(this).toggleClass("list_open");
                if ($(this).attr("class") == "list_open") {
                    $(this).css({
                        "height": "62px"
                    });
                    $(this).children("span").show();
                } else {
                    $(this).css({
                        "height": "auto"
                    });
                    $(this).children("span").hide();
                }
            });
            $(".adds_list_3 li:eq(4) a").css({
                "color": "#D3D3D3"
            });
            //$(".adds_list_3 li:eq(6) a").css({"color": "#D3D3D3"});
        }
    }

    /* trigger when page is ready */

    $(window).load(function() {
        $('#line').show();
        // your functions go here
        line.init();
        addoil.init();
        map.init();
        top_icon.loop();
        $(".top_nav").hide();
        $(".map").hide();
        $(".title").hide();
    })

    $(window).load(function() {
        addoil.start();
        $(".top_nav").show();
        $(".map").show();
        $(".title").show();
        iplookup.init();
    });

})(window.jQuery);