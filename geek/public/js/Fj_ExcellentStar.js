$(function(){

	//getExcellentInfo()函数:获取各个年级优秀之星的信息
	function getExcellentInfo(grade,index,page){
		$.ajax({
			
			type:'GET',
			url: '/findGraduationByGra',
			async:false,
			data:{
				"graduationGra":grade,
				"page":page
			},
			success:function(data){
				console.log(data);
				var str='';
				var button='';
				var result=data.result;
				totalPage=data.count;
				for (var i = 0; i <result.length; i++) {
					str+='<tr><td>'+result[i].graduationName+
						 '</td><td>'+result[i].graduationGo+
						 '</td><td>'+result[i].  graduationDir+'</td></tr>';
				};
				$('table:eq('+index+')').html(str);
				// button="<span id='slider-prev'><</span>"+
    //    		 			"<span id='slider-next' >></span>";
    //    		 	$(".button").html(button);
       		 	console.log(page);
       		 	console.log(index);
       		 	//console.log(data);

				$("tr:odd").addClass("odd");
			    $("tr:even").addClass("even");
			    $("tr").mouseover(function(){
			    $(this).addClass("selected").siblings().removeClass("selected").end();
			    })
			    $("tr").mouseout(function(){
			      $(this).removeClass("selected");
			    });
			},
			error:function(){
				console.log('未请求到数据');
			}
		});
	}
	//默认显示第一页
	var page=1;
	var index=0;
	var data="2008";
	var totalPage;
	//初始化页面，加载2008年的数据
	getExcellentInfo("2008",0,page);

	//点击对应的按钮加载对应的数据
	$('#grade>li').click(function(){
		page=1;
		index=$('#grade>li').index(this);
		//console.log(index);
		data=$(this).text().substring(0,4)
		console.log(data);
		getExcellentInfo(data,index,page);				
	})
	$('#slider-prev').click(function(){
			if(page>1){
				page=page-1;				
			}else{
				page==1;
				alert("已经是第一页了");
			}
			console.log(page);
       		 	console.log(index);
       		 	console.log(data);
			getExcellentInfo(data,index,page);
		});
	$('#slider-next').click(function(){
			if(page<totalPage){
				page= parseInt(page)+1;
			}else{
				page==totalPage;
				alert("已经是最后一页了");
			}
			console.log(page);
       		 	console.log(index);
       		 console.log(data);
			getExcellentInfo(data,index,page);
		})
})