$(function(){
	$('#landing').click(function(){
		// console.log($('#password').val() + "我是" + $('#userName').val());
		$.ajax({
			type:'POST',
			url:'/dologin',
			data:{
				password:$('#password').val(),
				userName:$('#userName').val(),
				// _method:"delete"
			},
			success:function(data){
				console.log(data);
				if (data=="1") {
					window.location.href="management.html";
				}else{
					alert('用户名或密码错误');
				}
				
			}
		})
	})
	
})