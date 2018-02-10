// $(function(){

//     //前端人员按钮的点击事件
//     var divNumF;
//     var indexF=0;
//     //后退
//     $("#slider-prev").click(function(){
//         divNumF=$(".Front_pic").length;
//         console.log(indexF);
//         //console.log(divNumF);
//         if(indexF==0) {
//             indexF=divNumF-1;
//             console.log(indexF);
//         }
//         else{
//             indexF--;
//             console.log(indexF);
//         };
//         console.log(indexF);
//         for (var i = 0; i <divNumF; i++) {
//             //console.log(i);
//             $(".Front_pic:eq("+i+")").hide();
//         };
//         var a1=".Front_pic:eq("+indexF+")";
//         console.log(a1);
//         $(a1).show();
//     });
//     //前进
//     $("#slider-prev").click(function(){

//         if(indexF==divNumF-1) {
//             indexF=0;
//         }
//         else{
//             indexF++;
//         };
//         for (var i = 0; i <divNumF; i++) {

//             $(".Front_pic:eq("+i+")").hide();
//         };
//         $(".Front_pic:eq("+ indexF+")").show();
//     });



//     //后台人员按钮的点击事件
//     var divNumFB=$(".backstage_pic").length;
//     var indexFB=0;
//     for (var i = 0; i <divNumFB; i++) {
//         $(".backstage_pic").eq(i).hide();
//     };
//     $(".backstage_pic").eq(0).show();
//     //后退
//     $("#slider-prev1").click(function(){
//         if(indexFB==0) {
//             indexFB=divNumFB-1;
//         }
//         else{
//             indexFB--;
//         };
//         for (var i = 0; i <divNumFB; i++) {
//             $(".backstage_pic").eq(i).hide();
//         };
//         $(".backstage_pic").eq(indexFB).show();
//         // alert(i);
//         // if(indexFB==divNumF-1) {
//         //     $(".Front_pic").eq(0).hide();
//         // }
//         // else {
//         //  $(".Front_pic").eq(0).hide();
//         //     div[i+1].style.display = 'none';
//         // }    
//         // div[i].style.display ='block';
//     });
//     //前进
//     $("#slider-prev1").click(function(){
//         if(indexFB==divNumFB-1) {
//             indexFB=0;
//         }
//         else{
//             indexFB++;
//         };
//         for (var i = 0; i <divNumFB; i++) {
//             $(".backstage_pic").eq(i).hide();
//         };
//         $(".backstage_pic").eq(indexFB).show();
//     });
// })




