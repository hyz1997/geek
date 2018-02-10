$(function(){
	console.log(1);
	//添加高亮
	$('.tabMenu>li:eq(3)').css('backgroundColor','#808080');
	var totalPage;
	var nowPage=1;
	var editName;
	//跳转
	function goTo(obj){
		var gotoPage=$(obj).parent().children().eq(0).val();
		if (gotoPage> totalPage||gotoPage<=0){
			alert('不存在当前页数，无法跳转到当前页数')
		}else{
			nowPage=gotoPage;
		}
		$('.paging>li:eq(1)').text(nowPage);
		$.ajax({
			type:'GET',
			url:'/findAllSug',
			data:{"page":nowPage},	
			success:function(data){
				console.log(data);
				if(data.status=="1"){
					totalPage=data.count;
					var listCandidate='';
					listCandidate="<tr>"+
				 				"<th>name</th>"+
				 				"<th>content</th>"+
				 				"<th>adress</th>"+
				 				"<th>phone</th>"
				 			"</tr>";
					$('#listMember').html(listCandidate);
					var listCandidates=data.result;
					if (nowPage<=totalPage) {
						for(var i=0;i<listCandidates.length;i++){
							listCandidate='<tr><td>'+listCandidates[i].sugName+'</td><td>'+listCandidates[i].sugContent+'</td><td>'+listCandidates[i].sugAdress+'</td><td>'+listCandidates[i].sugPhone+"</td></tr>";		
							$('#listMember').append(listCandidate);
						}		
					}
						
				}
			},
			error:function(){
				alert('请求出错');
			}
		})
	}
	//默认页
	(function(){
		var pageBtn='';
		pageBtn+="<li id='page_prev'>上一页</li>"+"<li>"+nowPage+"</li>"+"<li id='page_next'>下一页</li>"+"<li>跳到<input type='text'>"+"页<input class='goTo' type='button' value='确定'></li>";	
		$('.paging').html(pageBtn);	
		$.ajax({
			type:'GET',
			url:'/findAllSug',
			data:{"page":nowPage},		
			success:function(data){
				console.log(data);
				if(data.status=="1"){
					totalPage=data.count;
					var listCandidate='';
					listCandidate="<tr>"+
				 				"<th> candidateId</th>"+
				 				"<th>name</th>"+
				 				"<th>school</th>"+
				 				"<th >major</th>"+
				 				"<th>direction</th>"+
				 				"<th>introduction</th>"+
				 			"</tr>";
					$('#listMember').html(listCandidate);
					var listCandidates=data.result;
					if (nowPage<=totalPage) {
						for(var i=0;i<listCandidates.length;i++){
							listCandidate='<tr><td>'+listCandidates[i].sugName+'</td><td>'+listCandidates[i].sugContent+'</td><td>'+listCandidates[i].sugAdress+'</td><td>'+listCandidates[i].sugPhone+"</td></tr>";		
							$('#listMember').append(listCandidate);
						}		
					}
				}
				//跳转到固定页
				$('.goTo').click(function(){
					goTo($(this))
				})
			},
			error:function(){
				alert('请求出错');
			}
		})	
		
	})();
	//上一页
	(function(){
		$('#page_prev').click(function(){
			if(nowPage>1){
				nowPage=nowPage-1;				
			}else{
				nowPage==1;
				alert("已经是第一页了");
			}
			$('.paging>li:eq(1)').text(nowPage);
			$.ajax({
				type:'GET',
				url:'/findAllSug',
				data:{"page":nowPage},	
				success:function(data){
					console.log(data);
					if(data.success==true){
						totalPage=data.count;
						var listCandidate='';
						listCandidate="<tr>"+
					 				"<th> candidateId</th>"+
					 				"<th>name</th>"+
					 				"<th>school</th>"+
					 				"<th >major</th>"+
					 				"<th>direction</th>"+
					 				"<th>introduction</th>"+
					 			"</tr>";
						$('#listMember').html(listCandidate);
						var listCandidates=data.result;
						if (nowPage<=totalPage) {
							for(var i=0;i<listCandidates.length;i++){
								listCandidate='<tr><td>'+listCandidates[i].sugName+'</td><td>'+listCandidates[i].sugContent+'</td><td>'+listCandidates[i].sugAdress+'</td><td>'+listCandidates[i].sugPhone+"</td></tr>";		
								$('#listMember').append(listCandidate);
							}		
						}	
					}	
					//跳转到固定页
					$('.goTo').click(function(){
						goTo($(this))
					})
				},
				error:function(){
				alert('请求出错');
				}
			})
		})
	})();
	//下一页
	(function(){
		$('#page_next').click(function(){
			if(nowPage<totalPage){
				nowPage= parseInt(nowPage)+1;
			}else{
				nowPage==totalPage;
				alert("已经是最后一页了");
			}
			$('.paging>li:eq(1)').text(nowPage);
			$.ajax({
				type:'GET',
				url:'/findAllSug',
				data:{"page":nowPage},	
				success:function(data){
					console.log(data);
					if(data.status=="1"){
						totalPage=data.count;
						var listCandidate='';
						listCandidate="<tr>"+
					 				"<th> candidateId</th>"+
					 				"<th>name</th>"+
					 				"<th>school</th>"+
					 				"<th >major</th>"+
					 				"<th>direction</th>"+
					 				"<th>introduction</th>"+
					 			"</tr>";
						$('#listMember').html(listCandidate);
						var listCandidates=data.result;
						if (nowPage<=totalPage) {
							for(var i=0;i<listCandidates.length;i++){
								listCandidate='<tr><td>'+listCandidates[i].sugName+'</td><td>'+listCandidates[i].sugContent+'</td><td>'+listCandidates[i].sugAdress+'</td><td>'+listCandidates[i].sugPhone+"</td></tr>";		
								$('#listMember').append(listCandidate);
							}		
						}	
					}
					//跳转到固定页
					$('.goTo').click(function(){
						goTo($(this))
					})
				}
			})
		})
	})();
})