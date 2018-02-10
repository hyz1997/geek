$(function(){
	$('#submit').click(function(){
		var sugContent=$('#sugContent').val();
		var sugName=$('#sugName').val();
		var sugAdress=$('#sugEmail').val();
		var sugPhone=$('#sugPhone').val();
		$.ajax({
			type:'POST',
			url:'/insertSug',
			data:{
				sugAdress:sugAdress,
				sugContent:sugContent,
				sugName:sugName,
				sugPhone:sugPhone
			},
			success:function(data){
				if(data==1){
					alert('提交成功');
				}else{
					alert('提交失败');
				}
			},
			error:function() {
                alert("请求错误！");
       		}
		});
	})
})