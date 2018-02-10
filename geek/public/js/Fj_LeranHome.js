$(function () {
	//测试
	// str="<li>"+
	// 	"<a href="+"#"+">"+
 //         "<div class='ranking mt5 mr5 white HihgLight'>"+"ccccccc"+"</div>"+
 //            "sssssss"+
 //              "</a>"+
 //              "</li>";
	//                     $("#BookTxt").append(str);
	//侧边栏--书籍推荐
	$.ajax({
		type:'GET',
		url:'/findStudyByKind',
		data:{
			studyKind:"书籍推荐"
		},
		success:function (data) {
			if(data.status=="1"){
				console.log(data);
				var result=data.result;
				var str='';
				var strMore='';
				var strImg='';
				//默认展示的书籍推荐
				if(result.length<=5){
					for(var i=0;i<result.length;i++){
						str="<li><a href="
                        +result[i].studyUrl+
                        "><div class='ranking mt5 mr5 white HihgLight'>"
                        +(i+1)+
                        "</div>"
                        +result[i].studyName+
                        "</a></li>";
	                    $("#BookTxt").append(str);
					}
				}else{
					for(var i=0;i<5;i++){
                        str="<li>"+
                        "<a href="+result[i].studyUrl+">"+
                        "<div class='ranking mt5 mr5 white HihgLight'>"+(i+1)+"</div>"+
                        result[i].studyName+
                        "</a>"+
                        "</li>";
	                    $("#BookTxt").append(str);
					}
				}

				//更多书籍推荐
				for(var i=0;i<result.length;i++){
					strMore="<li>"+
                    "<a href="+result[i].studyUrl+">"+
                    "<div class='ranking mt5 mr5 white HihgLight'>"+(i+1)+"</div>"+
                    result[i].studyName+
                    "</a>"+
                    "</li>";
                    $("#BookTxt-more").append(strMore);
				}
				//图片展示一
				for(var i=0;i<result.length;i++){
					strImg="<li>"+
								"<a href="+result[i].studyUrl+">"+
                    			"<img src='img/study/"+ result[i].studyImg+"'>"+
                    			"<div class='mask pa'></div>"+
                				"</a>"+
                			"</li>";
                    $("#BookShow").append(strImg);
				}
			};
		},
		error:function(data){
			console.log("未请求到书籍推荐数据");
		}
	});
	// // 学习网站链接
	$.ajax({
		type:'GET',
		url:'/findStudyByKind',
		data:{
			studyKind:"学习网站链接"
		},
		success:function(data){
			if(data.status=="1"){
				var result=data.result;
				var str='';
				var strMore='';
				var strImg='';
				//默认展示的学习网站链接
				if(result.length<=5){
					for(var i=0;i<result.length;i++){
                        //str="<li><a href="
                        //+result[i].studyUrl+
                        //"><div class='ranking mt5 mr5 white HihgLight'>"
                        //+(i+1)+
                        //"</div>"
                        //+ result[i].studyName+
                        //"</a></li>";
                        str="<li><a href='"+result[i].studyUrl+"'><div class='ranking mt5 mr5 white HihgLight'>"+(i+1)+"</div>"+ result[i].studyName+"</a></li>"
	                    $("#WebTxt").append(str);
					}
				}else{
					for(var i=0;i<5;i++){
						str="<li>"+
                        "<a href='"+result[i].studyUrl+"'>"+
                        "<div class='ranking mt5 mr5 white HihgLight'>"+(i+1)+"</div>"+
                        result[i].studyName+
                        "</a>"+
                        "</li>";
	                    $("#WebTxt").append(str);
					}
				}

				//更多学习网站链接
				for(var i=0;i<result.length;i++){
					strMore="<li>"+
                    "<a href='"+result[i].studyUrl+"'>"+
                    "<div class='ranking mt5 mr5 white HihgLight'>"+(i+1)+"</div>"+
                    result[i].studyName+
                    "</a>"+
                    "</li>";
                    $("#WebTxt-more").append(strMore);
				}

				//图片展示二
				for(var i=0;i<result.length;i++){
					strImg="<div class='text'>"+
                       			"<div class='entry-header'>"+
                            		"<a href="+result[i].studyUrl+" class='entry-title'>"+
                            		result[i].studyName+"</a>"+
                                "</div>"+
                                "<a href=''>"+
                                	"<img src='img/study/"+result[i].studyImg+"'>"+
                            	"</a>"+
                            	"<p>"+result[i]. studyIntr+"</p>"+
                            "</div>";
                    $("#link1").append(strImg);
				};
			}
		},
		error:function(data){
			console.log("未请求到学习网站链接数据");
		}
	});
	// //好玩好用
	$.ajax({
		type:"GET",
		url:'/findStudyByKind',
		data:{
			studyKind:"好玩好用"
		},
		success:function(data){
			if(data.status=="1"){
				var result=data.result;
				var str='';
				var strMore='';
				var strImg='';
				//默认展示的好玩好用
				if(result.length<=5){
					for(var i=0;i<result.length;i++){
						str="<li>"+
								"<a href="+result[i].studyUrl+">"+
	                            	"<div class='ranking mt5 mr5 white HihgLight'>"+(i+1)+"</div>"+
	                            	result[i].studyName+"</a>"+
	                        "</li>";
	                    $("#GoodTxt").append(str);
					}
				}else{
					for(var i=0;i<5;i++){
						str="<li>"+
								"<a href="+result[i].studyUrl+">"+
	                            	"<div class='ranking mt5 mr5 white HihgLight'>"+(i+1)+"</div>"+
	                            	result[i].studyName+"</a>"+
	                        "</li>";
	                    $("#GoodTxt").append(str);
					}
				}
				//更多好玩好用
				for(var i=0;i<result.length;i++){
					strMore="<li>"+
								"<a href="+result[i].studyUrl+">"+
	                            	"<div class='ranking mt5 mr5 white HihgLight'>"+(i+1)+"</div>"+
	                            	result[i].studyName+"</a>"+
	                        "</li>";
                    $("#GoodTxt-more").append(strMore);
				};
				// 图片展示4
				for(var i=0;i<result.length;i++){
					strImg="<li>"+
								"<a href="+result[i].studyUrl+">"+
                        			"<img src='img/study/"+result[i].studyImg+"'>"+
                        			"<div class='mask pa'></div>"+
                    				"</a>"+
                    		"</li>";
                    $("#GoodShow").append(strImg);
				}
			}
		},
		error:function(data){
			console.log("未请求到好玩好用数据");
		}
	})

})