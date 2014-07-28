$(document).ready(function(){
	var isDebug = false;
	function gadebug(){
		if(isDebug){
			alert("ok");
		}
	}
	$('.top_link_1').click(function(){
		_gaq.push(['_trackEvent', 'TopNav', 'click', '平安车主卡']);
		gadebug();
	});
	$('.top_link_2').click(function(){
		_gaq.push(['_trackEvent', 'TopNav', 'click', '平安车险']);
		gadebug();
	});
	$('.top_link_3').click(function(){
		_gaq.push(['_trackEvent', 'TopNav', 'click', '免费油-吼出来']);
		gadebug();
	});
	$('.select_1').live('click', function(){
		var address = $(this).html();
		_gaq.push(['_trackEvent', 'cityselect', 'click', '点击定位 '+address]);
		gadebug();
	});
	
	$('.select_2').click(function(){
		_gaq.push(['_trackEvent', 'cityselect', 'click', '点击切换城市']);
		gadebug();
	});
	$('.select_left_all li').live('click', function(){
		var address = $(this).html();
		var data = 	$('.select_1').html();
		_gaq.push(['_trackEvent', 'cityselect', 'click', '点击定位 '+ data + " " + address]);
		gadebug();
	});
	$('.region_list a').live('click', function(){
		var address = $(this).html();
		var urlid = $(this).attr("href").split('?wid=')[1];
		if(urlid == "40001897" || urlid == "40001898"){
			address = "北京 "+address;
		}
		if(urlid == "40001887" || urlid == "40001888"){
			address = "上海 "+address;
		}
		_gaq.push(['_trackEvent', 'cityselect', 'click', '点击 '+address]);
		gadebug();
	});


});
