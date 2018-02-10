
//成员分页
$(function(){  
	//添加高亮
$('.tabMenu>li:eq(1)').css('backgroundColor','#808080');
	//分页按钮
	var totalPage;
	var nowPage=1;
	var editId;
	//删除成员
	function del(obj){
		console.log(12);
		var graduationName=$(obj).parent().parent().children().eq(1).text();	
			if(window.confirm('你确定要删除数据吗')){
				$(obj).parent().parent().remove();			
				$.ajax({
					type:'POST',
					url:'/deleteGraduation',
					data:{
					 	"graduationName":graduationName,
				     },
					success:function(data){
						if(data=="1") {
							console.log(data);
							alert('成功删除数据');
							window.location.reload();
						}
						
					},
					error:function(){
					alert('删除异常');
					}
				})
			}else{
				alert('删除数据失败');
			}			
		}
	//编辑成员
	function edit(obj){
		$('#changeMember').show();
		var inpt=$('#changeform input');
		editId=inpt[1].value = $(obj).parents('tr').children().eq(1).text();
		inpt[2].value = $(obj).parents('tr').children().eq(2).text();
		inpt[3].value = $(obj).parents('tr').children().eq(3).text();
		inpt[0].value = $(obj).parents('tr').children().eq(0).text();
		//inpt[5].value = $(obj).parents('tr').children().eq(6).text();
		//$('#changeform textarea')[0].value = $(obj).parents('tr').children().eq(5).text();
		var scrollTop = $(document).scrollTop() || $(document.body).scrollTop();
		var scrollLeft = $(document).scrollLeft() || $(document.body).scrollLeft();		
		//遮罩层
		$('#bg').css('display','block') ;
		$('#bg').width( Math.max( $(document.body).outerWidth(true), $(window).width()));
		$('#bg').height(Math.max( $(document.body).outerHeight(true), $(window).height()))		
		//弹出层addMember
		$('#changeMember').css('left', ( $(document).width() - $('#changeMember').width() ) / 2 + scrollLeft);
		$('#changeMember').css('top', ( $(document).height() - $('#changeMember').height() ) / 2 + scrollTop);
	}
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
			url:'/findAllGraduation',
			data:{"page":gotoPage},
			success:function(data){
				totalPage=data.count;
				var listMember='';
				var listMembers=data.result;
				 listMember="<tr>"+
				 				"<th>grade</th>"+
				 				"<th>name</th>"+
				 				"<th>go</th>"+
				 				"<th >direction</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
				 $('#listMember').html(listMember);
				if (nowPage<=totalPage) {
					for(var i=0;i<listMembers.length;i++){
						listMember='<tr><td>'+listMembers[i].graduationGra+'</td><td>'+listMembers[i].graduationName+'</td><td>'+listMembers[i].graduationGo+'</td><td>'+listMembers[i].graduationDir+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
					$('#listMember').append(listMember);
					}				
				}
				$('#listMember').html(listMember);
				//删除成员
				$('.del').click(function(){
					del($(this));
				});
				//编辑成员
				$('.edit').click(function(){
					edit($(this));
				})
			},
			error:function(){
				alert('请求出错');
			}
		})
	}
	//查询跳转
	function lookgoTo(obj){
		var gotoPage=$(obj).parent().children().eq(0).val();
		if (gotoPage> totalPage||gotoPage<=0){
			alert('不存在当前页数，无法跳转到当前页数')
		}else{
			nowPage=gotoPage;
		}
		$('.paging>li:eq(1)').text(nowPage);
		var value=$('#studentNo').val();
		$.ajax({
			type:'GET',
			url:'/findAllGraduation',
			data:{"page":gotoPage},
			success:function(data){
				totalPage=data.count;
				var listMember='';
				var listMembers=data.result;
				console.log(listMembers[0].photo);
				 listMember="<tr>"+
				 				"<th>grade</th>"+
				 				"<th>name</th>"+
				 				"<th>go</th>"+
				 				"<th >direction</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
				 $('#listMember').html(listMember);
				if (nowPage<=totalPage) {
					for(var i=0;i<listMembers.length;i++){
						listMember='<tr><td>'+listMembers[i].graduationGra+'</td><td>'+listMembers[i].graduationName+'</td><td>'+listMembers[i].graduationGo+'</td><td>'+listMembers[i].graduationDir+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
					$('#listMember').append(listMember);
					}				
				}
				//删除成员
				$('.del').click(function(){
					del($(this));
				});
				//编辑成员
				$('.edit').click(function(){
					edit($(this));
				})
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
			url:'/findAllGraduation',
			data:{"page":nowPage},	
			success:function(data){
				console.log(data);
				if(data.status=="1"){	
					totalPage=data.count;
					var listMember='';
					var listMembers=data.result;
					console.log(listMembers[0].photo);
					 listMember="<tr>"+
				 				"<th>grade</th>"+
				 				"<th>name</th>"+
				 				"<th>go</th>"+
				 				"<th >direction</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
					 $('#listMember').html(listMember);
					if (nowPage<=totalPage) {
						for(var i=0;i<listMembers.length;i++){
							listMember='<tr><td>'+listMembers[i].graduationGra+'</td><td>'+listMembers[i].graduationName+'</td><td>'+listMembers[i].graduationGo+'</td><td>'+listMembers[i].graduationDir+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
						$('#listMember').append(listMember);
						}				
					}
				}
					//删除成员
					$('.del').click(function(){
						del($(this));
					});
					//编辑成员
					$('.edit').click(function(){
						edit($(this));
					})
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
				url:'/findAllGraduation',
				data:{
					"page":nowPage
				},
				success:function(data){
					totalPage=data.count;
					var listMember='';
					var listMembers=data.result;
					console.log(listMembers[0].photo);
					listMember="<tr>"+
				 				"<th>grade</th>"+
				 				"<th>name</th>"+
				 				"<th>go</th>"+
				 				"<th >direction</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
					 $('#listMember').html(listMember);
					if (nowPage<=totalPage) {
						for(var i=0;i<listMembers.length;i++){
							listMember='<tr><td>'+listMembers[i].graduationGra+'</td><td>'+listMembers[i].graduationName+'</td><td>'+listMembers[i].graduationGo+'</td><td>'+listMembers[i].graduationDir+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
						$('#listMember').append(listMember);
						}				
					}
				
					// //删除成员
					$('.del').click(function(){
						del($(this));
					});
					//编辑成员
					$('.edit').click(function(){
						edit($(this));
					})
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
				url:'/findAllGraduation',
				data:{
					"page":nowPage
				},
				success:function(data){
					totalPage=data.count;
					var listMember='';
					var listMembers=data.result;
					listMember="<tr>"+
				 				"<th>grade</th>"+
				 				"<th>name</th>"+
				 				"<th>go</th>"+
				 				"<th >direction</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 			"</tr>";
					 $('#listMember').html(listMember);
					if (nowPage<=totalPage) {
						for(var i=0;i<listMembers.length;i++){
							listMember='<tr><td>'+listMembers[i].graduationGra+'</td><td>'+listMembers[i].graduationName+'</td><td>'+listMembers[i].graduationGo+'</td><td>'+listMembers[i].graduationDir+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
						$('#listMember').append(listMember);
						}				
					}
					//删除成员
					$('.del').click(function(){
						del($(this));
					});
					//编辑成员
					$('.edit').click(function(){
						edit($(this));
					})
					//跳转到固定页
					$('.goTo').click(function(){
						goTo($(this))
					})
				}
			})
		})
	})();	
	//学生查询
	$(function(){
		$('#lookFor').click(function(){
			//默认页
			(function(){
				var pageBtn='';
				pageBtn+="<li id='page_prev'>上一页</li>"+"<li>"+nowPage+"</li>"+"<li id='page_next'>下一页</li>"+"<li>跳到<input type='text'>"+"页<input class='goTo' type='button' value='确定'></li>";	
				$('.paging').html(pageBtn);
				var value=$('#studentNo').val();
				console.log(value);
				alert(value);
				$.ajax({
						type:'GET',
						url:'/findOneGraduation',
						data:{
							"graduationName":value,
							"page":nowPage
						},
						success:function(data){
							if(data.status=="1"){
								totalPage=data.count;
								var listMember='';
								var listMembers=data.result;
								console.log(listMembers[0].photo);
								listMember="<tr>"+
				 				"<th>grade</th>"+
				 				"<th>name</th>"+
				 				"<th>go</th>"+
				 				"<th >direction</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 				"</tr>";
								 $('#listMember').html(listMember);
								if (nowPage<=totalPage) {
									for(var i=0;i<listMembers.length;i++){
										listMember='<tr><td>'+listMembers[i].graduationGra+'</td><td>'+listMembers[i].graduationName+'</td><td>'+listMembers[i].graduationGo+'</td><td>'+listMembers[i].graduationDir+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
									$('#listMember').append(listMember);
									}				
								}
							}
							//删除成员
							$('.del').click(function(){
								del($(this));
							});
							//编辑成员
							$('.edit').click(function(){
								edit($(this));
							})
							//跳转到固定页
							$('.goTo').click(function(){
								lookgoTo($(this))
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
					var value=$('#studentNo').val();
					$.ajax({
						type:'GET',
						url:'/findOneItem',
						data:{
							"itemName":value,
							"page":nowPage
						},
						success:function(data){
								totalPage=data.count;
								var listMember='';
								var listMembers=data.result;
								console.log(listMembers[0].photo);
								listMember="<tr>"+
				 				"<th>grade</th>"+
				 				"<th>name</th>"+
				 				"<th>go</th>"+
				 				"<th >direction</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 				"</tr>";
								 $('#listMember').html(listMember);
								if (nowPage<=totalPage) {
									for(var i=0;i<listMembers.length;i++){
										listMember='<tr><td>'+listMembers[i].graduationGra+'</td><td>'+listMembers[i].graduationName+'</td><td>'+listMembers[i].graduationGo+'</td><td>'+listMembers[i].graduationDir+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
									$('#listMember').append(listMember);
									}				
								}
							
						
							// //删除成员
							$('.del').click(function(){
								del($(this));
							});
							//编辑成员
							$('.edit').click(function(){
								edit($(this));
							})
							//跳转到固定页
							$('.goTo').click(function(){
								lookgoTo($(this))
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
					var value=$('#studentNo').val();
					$.ajax({
						type:'GET',
						url:'/findOneItem',
						data:{
							"itemName":value,
							"page":nowPage
						},
						success:function(data){
							totalPage=data.count;
								var listMember='';
								var listMembers=data.result;
								console.log(listMembers[0].photo);
								listMember="<tr>"+
				 				"<th>grade</th>"+
				 				"<th>name</th>"+
				 				"<th>go</th>"+
				 				"<th >direction</th>"+
				 				"<th class='th'></th>"+
				 				"<th class='th'></th>"+
				 				"</tr>";
								 $('#listMember').html(listMember);
								if (nowPage<=totalPage) {
									for(var i=0;i<listMembers.length;i++){
										listMember='<tr><td>'+listMembers[i].graduationGra+'</td><td>'+listMembers[i].graduationName+'</td><td>'+listMembers[i].graduationGo+'</td><td>'+listMembers[i].graduationDir+"</td><td><input type='button' value='修改' class='edit'>"+"</td><td><input type='button' value='删除' class='del'>"+'</td></tr>';		
									$('#listMember').append(listMember);
									}				
								}
							//删除成员
							$('.del').click(function(){
								del($(this));
							});
							//编辑成员
							$('.edit').click(function(){
								edit($(this));
							})
							//跳转到固定页
							$('.goTo').click(function(){
								lookgoTo($(this))
							})
						}
					})
				})
			})();
		})
	})

	//保存修改
	$(function(){
		$('#edit').click(function(){
			 var data = new FormData($('#changeform')[0]);
			 data.append("_method","put");
			 $.ajax({
			 	type:'POST',
			 	url: '/updataGraduation',
			 	data:data,
			 	async:false,
	            cache:false,
	            contentType:false,
	            processData:false,
	            success:function(data){
	            	console.log(data) ;	
	            	if(data=="1"){

	            		alert('保存修改成功');
	            		window.location.reload();
	            	} else{
	            		alert('保存修改失败')
	            	}   
	            	console.log(data.success) 	
	            },
	            error:function() {
	                alert("请求保存修改错误！");
	       		}
			 })
			 $('#changeMember').hide();
			 $('#bg').hide();
		});

	});
});

//增加成员
$(function(){
	$('#submit').click(function(){
		 var data = new FormData($('#addform')[0]);
		 // console.log(data.memberId);
		 $.ajax({
		 	type:'POST',
		 	url:'/insertGraduation',
		 	data:data,
		 	async:false,
            cache:false,
            contentType:false,
            processData:false,
            success:function(data){
            	console.log(data);
            	if(data=="1"){
            		alert('添加成功');
            		window.location.reload();
            	} else{
            		alert(data)
            	}   
            	// console.log(data.success) 	
            },
            error:function() {
                alert("请求添加成员错误！");
       		}
		 })
		 $('#addMember').hide();
		 $('#bg').hide();
	});

});
//遮罩层
window.onload = function() {
	var oAdd = document.getElementById('add');
	var oBg = document.getElementById('bg');
	var oAddMember = document.getElementById('addMember');
	var oX = document.getElementById('x');
	var oChangeMember=document.getElementById('changeMember');
	var oClose=document.getElementById('close');
	function close(obj){
		oBg.style.display = 'none';
		obj.style.display = 'none';
	}
	function change(obj){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;		
		//遮罩层
		oBg.style.display = 'block';
		oBg.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
		oBg.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';		
		//弹出层
		oAddMember.style.display = 'block';
		oAddMember.style.left = ( document.documentElement.clientWidth - oAddMember.offsetWidth ) / 2 + scrollLeft + 'px';
		oAddMember.style.top = ( document.documentElement.clientHeight - oAddMember.offsetHeight ) / 2 + scrollTop + 'px';
	}
	function scroll( obj){
		if (obj.style.display == 'none') return ;	
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;	
		obj.style.left = ( document.documentElement.clientWidth - obj.offsetWidth ) / 2 + scrollLeft + 'px';
		obj.style.top = ( document.documentElement.clientHeight - obj.offsetHeight ) / 2 + scrollTop + 'px';	
	}
	function resize(obj){
		if (oBg.style.display == 'none') return ;		
		oBg.style.width = Math.max( document.body.offsetWidth, document.documentElement.clientWidth ) + 'px';
		oBg.style.height = Math.max( document.body.offsetHeight, document.documentElement.clientHeight ) + 'px';		
		if (obj.style.display == 'none') return ;		
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;		
		obj.style.left = ( document.documentElement.clientWidth - obj.offsetWidth ) / 2 + scrollLeft + 'px';
		obj.style.top = ( document.documentElement.clientHeight - obj.offsetHeight ) / 2 + scrollTop + 'px';
	}
	oX.onclick = function() {	
		close(oAddMember);	
	}	
	oAdd.onclick = function() {	
		change(oAddMember);
	}
	oClose.onclick = function() {	
		close(oChangeMember);	
	}		
	window.onscroll = function() {	
		scroll(oAddMember);
	}
	window.onresize = function() {		
		resize(oAddMember);
	}
	window.onscroll = function() {	
		scroll(oChangeMember);
	}
	window.onresize = function() {		
		resize(oChangeMember);
	}
}

