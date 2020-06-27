$(function(){

	//根据性别显示图片
	var sex = $(".sex").text().trim();
	if (sex === "女") {
		$("#sex-pic").attr("src","img/girl.png");
	}else if (sex === "男") {
		$("#sex-pic").attr("src","img/boy.png");
	}else{
		$("#sex-pic").attr("src","img/sex-unknow.png");
	};


	//切换选项卡，并根据对应选型卡显示按钮
	$(".card-btn").find("span").on("click",function(){
		var title = $(this).attr("title");
		var name = $(this).attr("id");
		var showName = name.split("-")[0];
		$(this).addClass("active").siblings("span").removeClass("active");
		$(this).parent().find("#"+showName+"-upload").show().siblings("a").hide();
		$("#container").find("#"+title).show().siblings("div").hide();
	});


	//选择对应书本进行选择删除操作
	var itemIdArr=[],itemId;
	$("span.delete-btn").on("click",function(){

		itemId = $(this).siblings("form").find(".item-id").attr("value");
		//判断数组里是否有itemId,无则返回-1
		if($.inArray(itemId ,itemIdArr) == - 1){ 
			$(this).css("background-image","url(img/delete1.jpg)");
			itemIdArr.push(itemId);
			// console.log(itemIdArr);
		}else{
			$(this).css("background-image","url(img/delete2.jpg)");
			itemIdArr = $.grep(itemIdArr,function(val){
				return val != itemId;
			});
			// console.log(itemIdArr);			
		}		
	});


	//点击删除图标，确认是否删除
	var flag  = false;
	$("#delete-item").on("click",function(){
		var flag = confirm("确定删除所选择的二手书吗？");
	})

});
