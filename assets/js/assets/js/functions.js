// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function($){

	var line ={
		init: function(){
			$("#line > .line_1").width(0);
			$("#line > .line_2").width(0);
			$("#line > .line_3").height(0);
			$("#line > .line_4").width(0);
			$(".icon").hide();
		},
		start: function(){
			var time = 2;
			map.start();
			$("#line>.line_1").animate({
				width: 50,
			}, 50*time, function(){
				line.icon($(".icon_1"), -50);
			}).animate({
				width: 240,
			}, 190*time, function(){
				line.icon($(".icon_2"), -30);
			}).animate({
				width: "340",
			}, 90*time, function(){
				$("#line > .line_2").animate({
					width: 195,
				}, 100*time, function(){
					line.icon($(".icon_3"), -40);
				}).animate({
					width: "195",
				}, 100*time, function(){
					$("#line > .line_3").height(42)
					.animate({
						height: 100,	
					}, 100*time, function(){
						line.icon($(".icon_4"), -30);
					}).animate({
						height: "164",
					}, 164*time, function(){
						$("#line > .line_4").animate({
							width: "152",
						}, 152*time, function(){
							line.icon($(".icon_5"), -60);
						});
					});
				});
			});
		},
		icon: function(obj, val){
			obj.show().children(".icon_top").css("margin-top", val).animate({
				marginTop: 0,
			}, 3800, "easeOutElastic");
		},
	};
	var addoil ={
		init: function(){
			/*$(".iconoil").css({
				height: 0,
				width: 0,
				marginBottom: 100,
				marginLeft: -30,
			});*/
		},
		start: function(){
			
			
        TweenLite.from($(".iconoil"), 1, {
				bottom: 100,
				ease:Elastic.easeOut,
				onComplete: function() {
				line.start();
          }
        });
			
			
			
			
		},
	};
	var map = {
		init: function(){
			//$(".map").hide();
			$(".map_oil").css({
				top: 290,
			});
		},
		start: function(){
			//$(".map").fadeIn("slow");
			$(".map_oil").animate({
				top: 120,
			}, 2000, "easeOutQuad");
			

		}
	};
	var iplookup = {
		addsinfo: "",
		city: "",
		init: function(){
			$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js", function(){
				iplookup.addsinfo = remote_ip_info;
				if(iplookup.addsinfo != ""){
					iplookup.view();
				}
			});
		},
		view: function(){
			//console.log(iplookup.addsinfo);
			if(iplookup.addsinfo.city != ""){
				var city = iplookup.addsinfo.city;
			}else{
				var city = iplookup.addsinfo.province;
			}
			//$(".select_1").html(city);
			iplookup.city=city;
			addsList.init();
		}
	}
	var addsList = {
		data: "",
		list: new Array(),
		init: function(){
			$.getJSON("./assets/js/addsjson.js", function(data){
				addsList.data = data.data;
				addsList.start();
			});
			$(".select_2").click(function(){
				$(".city_list").toggleClass("active");
			});
		},
		start: function(){
			var region="", adds="", i, j;
			var adds_list = new Array();
			var autocity = '<div class="select_1">请手动选择地区</div>\n';
			for(i in addsList.data){
				region += '<li class="region">'+addsList.data[i].region+'<span class="list_icon"></li>\n';
				var region_adds="";
				//console.log(iplookup.city);
				for(j in addsList.data[i].data){
					region_adds += '<li><a target="_blank" href="'+addsList.data[i].data[j].link+'" >'+addsList.data[i].data[j].adds+'</a></li>\n';
					if(addsList.data[i].data[j].adds.toString() == iplookup.city.toString()){
						autocity ='<a target="_blank" href="'+addsList.data[i].data[j].link+'" ><div class="select_1">'
						+addsList.data[i].data[j].adds+'</div></a>\n';
					}
				}
				var num = parseInt(i) + 1;
				adds_list[num]= '<ul class="adds_list adds_list_'+i+'">\n'+region_adds+'</ul>';
			}
			$(".select_1").replaceWith(autocity);
			adds_list[0] = '<ul class="region_list">\n'+region+'</span></ul>';
			addsList.list = adds_list;
			addsList.view();
		},
		view: function(){
			$(".city_list").html(addsList.list[0]);
			$(".region").each(function(i){
				i+=1;
				$(this).append(addsList.list[i]);
				$(this).click(function(){
					$(".region").removeClass("active").children(".list_icon").removeClass("active")
					.next().removeClass("active");
					$(this).addClass("active").children(".list_icon").addClass("active")
					.next().addClass("active");
				});
			});
		}
	}

	/* trigger when page is ready */
	$(document).ready(function (){

		// your functions go here
		line.init();
		addoil.init();
		map.init();
		$(".top_nav").hide();
		$(".map").hide();
		$(".title").hide();
		
	})

	$(window).load(function() {
		addoil.start();
		$(".top_nav").fadeIn("slow");
		$(".map").fadeIn("slow");
		$(".title").fadeIn("slow");
		iplookup.init();
	});

	$(window).resize(function() {

	});


})(window.jQuery);
