$(function(){
	var $item = $(".rating-item"), //li
	    $rating = $(".rating");    //ul
	
	//调用星级评分插件
	$.starRating($rating,{
		isHalf: true,   //半颗
		allStarPosition: [0,0], //点亮全颗星星位置
		emptyStarPosition: [-50,0], //未点亮全颗星星位置
		halfStarPosition: [-25,0]   //点亮半颗星星位置
	})
});
