$(function(){
	var totalPage;
	var page=1;
	//交互数据的函数
	function item (page) {
		$.ajax({
			type:'GET',
			url:'/findAllItem',
			data:{
				"page":page,
				"pageamount":"9"
			},
			success:function(data){
				if(data.status=="1"){
					console.log(data);
					console.log(data.count);
					totalPage=data.count;
					console.log(totalPage);
					var result=data.result;
					var str="";
					if (page<=totalPage){

						for(var i=0;i<result.length;i++){
							str+="<li>"+
									"<a href='"+result[i].itemUrl+"'>"+
    										"<img src='img/item/"+result[i].itemImg+"'>"+
    											"<div class='mask'>"+
    											"<h1>"+result[i].itemName+"</h1>"									
    										+"</div>"
    			   						+"</a>"
    								+"</li>";
    						
						}
						$(".s-show").html(str);
						$(".mask:even").addClass("s-mask1");
						$(".mask:odd").addClass("s-mask2");
					}
				}
			}
		})
	}
	//默认页
	(function(){
		var pageBtn='';
		pageBtn+="<ul><li id='page_prev'>上一页</li>"+"<li class='active'>"+page+"</li>"+"<li id='page_next'>下一页</li></ul>";	
		$('.pageButtom').html(pageBtn);
		item(page);

	})();
	//上一页
	(function(){
		$('#page_prev').click(function(){
			if(page>1){
				page=page-1;				
			}else{
				page==1;
				alert("已经是第一页了");
			}
			$('.active').text(page);
			item(page);
		})
	})();
	//下一页
	(function(){
		$('#page_next').click(function(){
			if(page<totalPage){
				page= parseInt(page)+1;
			}else{
				page==totalPage;
				alert("已经是最后一页了");
			}
			console.log(page);
			$('.active').text(page);
			item(page);
		})
	})();


})