/**
 * (星级评分插件)
**/
(function($){
	function ratingStar(ele,options){
		this.$ele = ele;  //传进来对象
		this.tagName = (ele.children(0)[0].tagName).toLowerCase(); //ele对象下子节点标签名
		this.opts = $.extend({}, ratingStar.prototype.DEFALUTS, options); //将传进来的可选参数覆盖默认参数
		
		var allStarPositionx,   //完整星星背景positionx
			allStarPositiony,   //完整星星背景positiony
			emptyStarPositionx, //空星星背景positionx
			emptyStarPositiony, //空星星背景positiony
			halfStarPositionx,  //半颗星星背景positionx
			halfStarPositiony;  //半颗星星背景positiony
		
		//获取背景positionx和positiony值
		if(this.opts.allStarPosition.length == 2){
			allStarPositionx = this.opts.allStarPosition[0];
			allStarPositiony = this.opts.allStarPosition[1];
		}
		
		if(this.opts.emptyStarPosition.length == 2){
			emptyStarPositionx = this.opts.emptyStarPosition[0];
			emptyStarPositiony = this.opts.emptyStarPosition[1];
		}
		
		if(this.opts.halfStarPosition.length == 2){
			halfStarPositionx = this.opts.halfStarPosition[0];
			halfStarPositiony = this.opts.halfStarPosition[1];
		}
		
		//公共监听事件
		this._star();
		
        if(this.opts.isHalf){
        	//点亮半颗星星
        	this._halfStar();
        }else{
        	//点亮半颗星星
        	this._allStar();
        }
        
		_lightOn = function(num){ //点亮星星函数
			var count = parseInt(num),
				isInt = count === num;
				
			var $item = ele.children();
			
			//遍历每颗星星
			$.each($item,function(index){
				if(index < num){	
					$item.eq(index++).css("background-position",allStarPositionx+"px "+allStarPositiony+"px");
				}else{
					$item.eq(index++).css("background-position",emptyStarPositionx+"px "+emptyStarPositiony+"px");
				}
			});
			if(!isInt){//点亮半颗
				$item.eq(count).css("background-position",halfStarPositionx+"px "+halfStarPositiony+"px");
			}
		}
	}
	
	ratingStar.prototype.DEFALUTS = {
		isHalf: false,             //默认全颗星星
		allStarPosition: [0,0],    //默认点亮全颗星星位置
		emptyStarPosition: [0,0],  //默认未点亮全颗星星位置
		halfStarPosition:["",""]   //默认半颗点亮全颗星星位置
	};
	
	ratingStar.prototype._star = function(){//星级评分事件监听共同部分
		var $rating = this.$ele,
		    tagName = this.tagName;
		    
		var opts = this.opts;
		
		$rating.on("mouseout",function(){ //鼠标移出事件
			_lightOn(0);
		}).on("click",tagName,function(){ //鼠标点击事件
			_lightOn(num);
			opts.isHalf?$rating.unbind("mousemove"):$rating.unbind("mouseover");
		 	$rating.unbind("mouseout");
		});
	}
	
	ratingStar.prototype._allStar = function(){//全颗星级评分
		
		var $rating = this.$ele,
		    tagName = this.tagName;
		
		$rating.on("mouseover",tagName,function(){
			num = $(this).index()+1;
			_lightOn(num);
		})
	}
	
	ratingStar.prototype._halfStar = function(){//半颗星级评分	
		var $rating = this.$ele,
		    tagName = this.tagName;
		
		$rating.on("mousemove",tagName,function(e){//鼠标移动事件
			var $this = $(this);
			num = $this.index() + 1;
			if(e.pageX - $this.offset().left < $this.width()/2){
				num -= 0.5;
			}
			_lightOn(num);
		})
	}
	
	//导出api
	$.extend({
		starRating: function (ele,opts){
			new ratingStar(ele,opts);
		}
	});

})(jQuery);
