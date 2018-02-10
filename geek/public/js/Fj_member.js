$(function(){
	//前端人员
	var t='';
	t="<div class='Front'>"+
	 			"<div class='Front_title'>"+"FRONT-END" +
			"</div>"+
			"<div class='Front_re'>"+
			"<ul>"+"</ul>"+ 
			"</div>"+
			"</div>"+
			 "<div class='column'></div>";	
			$(".remmber").html(t);
					 
		
	$.ajax({
		type:'GET', 
		url:'/findMemberByDir',
		data:{
			"memberDir":"前端"
		},
		success:function(data){
			if(data.status=="1"){
				 //console.log(data);
				// alert('提交成功');
				var str='';
				var strName='';
				var strMember='';
				var strButton='';
				var result=data.result;
				var num=Math.ceil(result.length/6);
				// console.log(num);
				for(var i=0;i<result.length;i++){
					strName+="<li>"+result[i].memberName+"</li>";
				}
				$(".Front_re>ul").html(strName);
				//添加类为Front_pic的div
				for(i=0;i<num;i++){
					str="<div class='Front_pic'>"+"</div>";
					//console.log(str);
					$(".Front").append(str);
				};
				
				//给前num-1 div添加内容
				for(var i=0;i<num-1;i++){
					var ul="<ul class='aa'>"+"</ul>";
					//console.log(ul);
					$(".Front_pic").eq(i).append(ul);
					for(var j=0;j<6;j++){
						var n=6*i+j;
						strMember="<li>"+
              						"<img src=img/member/"+result[n].memberImg+">"+
              						"<div class='cover'>"+
                						"<div class='heart' id='like"+(n+1)+"'rel='like'></div>"+
                						"<h4>"+result[n].memberName+"</h4>"+
                						"<p>"+result[n].memberGra+"级</p>"+
                						"<div class='likeCount' id='likeCount"+(n+1)+"'>"+parseInt(Math.random()*10)+5+"</div>"+
              						"</div>"+
            					"</li>";
						$(".aa:eq("+i+")").append(strMember);
					};
				};
				//给最后一个div添加内容
				var ul="<ul class='aa'>"+"</ul>";
				$(".Front_pic").eq(num-1).append(ul);
				for(var i=6*(num-1);i<result.length;i++){
					strMember="<li>"+
              						"<img src=img/member/"+result[i].memberImg+">"+
              						"<div class='cover'>"+
                						"<div class='heart' id='like"+(i+1)+"'rel='like'></div>"+
                						"<h4>"+result[i].memberName+"</h4>"+
                						"<p>"+result[i].memberGra+"级</p>"+
                						"<div class='likeCount' id='likeCount"+(i+1)+"'>"+parseInt(Math.random()*10)+5+"</div>"+
              						"</div>"+
            					"</li>";
					$(".aa:eq("+(num-1)+")").append(strMember);
				}

				//添加按钮
				strButton="<div id='slider-prev' class='switch_button'></div>"+
        					"<div id='slider-next' class='switch_button'></div>";
				$(".Front").append(strButton);

				var divNumF=$(".Front_pic").length;
     			var indexF=0;
                 for (var i = 0; i <$(".Front_pic").length; i++) {
        			$(".Front_pic:eq("+i+")").hide();
   				 };
    			$(".Front_pic:eq(0)").show();
    			console.log(divNumF);

			    //后退
			    $("#slider-prev").click(function(){
			        
			        console.log(indexF);
			        //console.log(divNumF);
			        if(indexF==0) {
			            indexF=divNumF-1;
			            console.log(indexF);
			        }
			        else{
			            indexF--;
			            console.log(indexF);
			        };
			        console.log(indexF);
			        for (var i = 0; i <divNumF; i++) {
			            //console.log(i);
			            $(".Front_pic:eq("+i+")").hide();
			        };
			        var a1=".Front_pic:eq("+indexF+")";
			        console.log(a1);
			        $(a1).show();
			    });
			    //前进
			    $("#slider-next").click(function(){

			        if(indexF==divNumF-1) {
			            indexF=0;
			        }
			        else{
			            indexF++;
			        };
			        for (var i = 0; i <divNumF; i++) {
			        	console.log(i);
			            $(".Front_pic:eq("+i+")").hide();
			        };
			        $(".Front_pic:eq("+ indexF+")").show();
			    });
			}
		},
		error:function() {
            alert("请求错误！");
   		}
	});
	//后台人员
	$.ajax({
		type:'GET',
		url:'/findMemberByDir',
		async:false,
		data:{
			"memberDir":"后台"
		},
		success:function(data){
			if(data.status=="1"){
				var str='';
				var strName='';
				var strMember='';
				var strButton='';
				var backstage='';
				var result=data.result;
				var num=Math.ceil(result.length/6);
				//添加类为backstage_pic的div
				for(i=0;i<num;i++){
					var str="<div class='backstage_pic'></div>";
					$(".remmber").append(str);
				};
				//添加BACKSTAGE/MT
				backstage="<div class='backstage'>"+
      							"<div class='backstage_title'>BACKSTAGE/MT</div>"+
      							"<div class='backstage_re'>"+
       						 	"<ul></ul>"+
       						 	"</div>"+
       						"</div>";
				$(".remmber").append(backstage);
				for(var i=0;i<result.length;i++){
					strName+="<li>"+result[i].memberName+"</li>";
				}
				$(".backstage_re ul").html(strName);

				//添加按钮
				strButton="<div id='slider-prev1' class='switch_button'></div>"+
        					"<div id='slider-next1' class='switch_button'></div>";
				$(".remmber").append(strButton);
				//给前num-1 div添加内容
				for(var i=0;i<num-1;i++){
					var ul="<ul class='bb'>"+"</ul>";
					$(".backstage_pic").eq(i).append(ul);
					for(var j=0;j<6;j++){
						var n=6*i+j;
						strMember="<li>"+
              						"<img src=img/member/"+result[n].memberImg+">"+
              						"<div class='cover'>"+
                						"<div class='heart' id='like"+(10*n+1)+"' rel='like'></div>"+
                						"<h4>"+result[n].memberName+"</h4>"+
                						"<p>"+result[n].memberGra+"级</p>"+
                						"<div class='likeCount' id='likeCount"+(10*n+1)+"'>"+parseInt(Math.random()*10)+5+"</div>"+
              						"</div>"+
            					"</li>";
						$(".bb:eq("+i+")").append(strMember);
					};
				};
				//给最后一个div添加内容
				var ulL="<ul class='bb'>"+"</ul>";
				$(".backstage_pic").eq(num-1).append(ulL);
				for(var i=6*(num-1);i<result.length;i++){
					//console.log(result.length);
					strMember="<li>"+
      						"<img src=img/member/"+result[i].memberImg+">"+
      						"<div class='cover'>"+
        						"<div class='heart' id='like"+(100*i+1+100)+"' rel='like'></div>"+
        						"<h4>"+result[i].memberName+"</h4>"+
        						"<p>"+result[i].memberGra+"级</p>"+
        						"<div class='likeCount' id='likeCount"+(100*i+1+100)+"'>"+parseInt(Math.random()*10)+5+"</div>"+
      						"</div>"+
    					"</li>";
					$(".bb:eq("+(num-1)+")").append(strMember);
				}
				for (var i = 0; i <$(".backstage_pic").length; i++) {
			        $(".backstage_pic").eq(i).hide();
			    };
			    $(".backstage_pic").eq(0).show();
			    //后台人员按钮的点击事件
			    var divNumFB=$(".backstage_pic").length;
			    var indexFB=0;
			    
			    //后退
			    $("#slider-prev1").click(function(){
			        if(indexFB==0) {
			            indexFB=divNumFB-1;
			        }
			        else{
			            indexFB--;
			        };
			        for (var i = 0; i <divNumFB; i++) {
			            $(".backstage_pic").eq(i).hide();
			        };
			        $(".backstage_pic").eq(indexFB).show();
			        alert(i);
			        if(indexFB==divNumF-1) {
			            $(".Front_pic").eq(0).hide();
			        }
			        else {
			         $(".Front_pic").eq(0).hide();
			            div[i+1].style.display = 'none';
			        }    
			        div[i].style.display ='block';
			    });
			    //前进
			    $("#slider-next1").click(function(){
			        if(indexFB==divNumFB-1) {
			            indexFB=0;
			        }
			        else{
			            indexFB++;
			        };
			        for (var i = 0; i <divNumFB; i++) {
			            $(".backstage_pic").eq(i).hide();
			        };
			        $(".backstage_pic").eq(indexFB).show();
			    });
				
			}
		},
		error:function() {
            alert("请求错误！");
   		}
	});
	
})