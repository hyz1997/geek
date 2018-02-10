$(function(){
//主要成员
$.ajax({
	type:"GET",
	url:"/findMemberByMain",
	data:{
		"memberMain":"是"
	},
	success:function(data){
		if(data.status=="1"){
			console.log(data);
			var str=''
			result=data.result;
			for(var i=0;i<Math.min(result.length,8);i++){
				str="<li>"+
                    "<a href=''>"+
                        "<img src='img/member/"+result[i].memberImg+"' title='<h3>"+result[i].memberIntr+"<br>"+
                        result[i].memberName+"</h3>'>"+
                    "</a>"
                +"</li>";
                $("#hover ul").append(str);
			}
		}
	},
	error:function(data){
		console.log("请求出错");
	}
});
//优秀作品
$.ajax({
	type:"GET",
	url:"/findItemBydis",
	data:{
		"display":"是"
	},
	success:function(data){
		var item='';
		var result=data.result;
		var onefrist='';
		onefrist="<li ><div class='kuang kuang1' ></div>"
                  +"<div class='kuang kuang2'></div></li>"; 
                   $('.one').append(onefrist);
                
		for(var i=0;i<3;i++){
			item="<li class='addPosition'><div class='kuang kuang1'></div><div class='kuang kuang2'></div><div class='text1'><div class='bg'>"
                +"<img class='bg1' src='img/item/"+result[i].minImg+"'>"
                +"</div></div><div class='text2'><div class='mengban'></div>"
                +"<a href='"+result[i].itemUrl+"'><p class='desc'>"+result[i].itemName+"</p></a>"
                +"</div></li>";  
                $('.one').append(item);
		};
		
		var onelast="<li class='addPosition' style='margin-left: -145px;'>"
                    +"<div class='kuang kuang1'></div>"
                    +"<div class='kuang kuang2'></div>"
                +"</li>"
         $('.one').append(onelast);
         $('.one>li:eq(1)').css("margin-Left","-145px");

         var twoItem='';
         for(var i=3;i<Math.min(result.length,7);i++){
			twoItem="<li class='addPosition'><div class='kuang kuang1'></div><div class='kuang kuang2'></div><div class='text1'><div class='bg'>"
                +"<img class='bg1' src='img/item/"+result[i].minImg+"'>"
                +"</div></div><div class='text2'><div class='mengban'></div>"
                +"<a href='"+result[i].itemUrl+"'><p class='desc'>"+result[i].itemName+"</p></a>"
                +"</div></li>";  
                $('.two').append(twoItem);
		};
	},
	error:function(data){
		console.log("请求出错");
	}
})

})