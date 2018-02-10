$(function(){
	// $('.tabMenu>li').click(function(){
	// 	$(this).css('backgroundColor','#808080').siblings().css('backgroundColor','#DDDDDD');
	// });
	$('.tabMenu>li:eq(0)').click(function(){
		window.location.href="studioMember.html";
	});
	$('.tabMenu>li:eq(1)').click(function(){
		window.location.href="graduation.html";
	});
	$('.tabMenu>li:eq(2)').click(function(){
		window.location.href="exhibition.html";
	});
	$('.tabMenu>li:eq(3)').click(function(){
		window.location.href="joinUs.html";
	});
	$('.tabMenu>li:eq(4)').click(function(){
		window.location.href="study.html";
	});
	// $('.sider').height($(document).height()-110);
})