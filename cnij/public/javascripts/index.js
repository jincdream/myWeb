var topics = {};
jQuery.Topic = function (id) {
	var callbacks,
		topic = id && topics[id];
	if(!topic){
		callbacks = jQuery.Callbacks();
		topic = {
			public: callbacks.fire,
			subscribe: callbacks.add,
			unsubscribe: callbacks.remove
		};
		if(!id){
			topics[id] = topic;
		}
	}
	return topic;
};
(function (){
	var shade = $('.shade');
	var nav = $('.nav'),lft = $('.left');
	var down = [],
		move = [],
		up = [];
	function addHandler(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	}
	//移动端 不能使用mousemove，JQ的touch事件没有相应的clientX。- -
	/*
	shade.mousedown(function (event){
		down[0] = event.clientX;
		down[1] = event.clientY;
		shade.mousemove(function (e){
			move[0] = e.clientX;
			move[1] = e.clientY;
			console.log(move);
		});
		console.log(down);	
	});
	shade.mouseup(function (event){
		shade.off("mousemove");
		up[0] = event.clientX;
		up[1] = event.clientY;
		console.log(up+"up");
	});
*/	//这里只能用原生js写 touch事件；

	//订阅模式

	var jShade = document.querySelectorAll('.shade')[0];
	addHandler(jShade,"touchstart",function(event){
		down[0] = event.targetTouches[0].clientX;
		down[1] = event.targetTouches[0].clientY;
	});//靠，start是在targetTouches下，
	addHandler(jShade,"touchmove",function(event){
		move[0] = event.targetTouches[0].clientX;
		move[1] = event.targetTouches[0].clientY;
		var blA = down[1] - move[1],
			bl2 = Math.abs(down[0] - move[0]);
		if(bl2 <= 40)
			if(blA >= 120)
				shade.animate({
					top: '-100%'
				});
	});
	shade.find('a').eq(0).on('click',function (event) {
		event.preventDefault();
		shade.animate({
			top: '-100%'
		},function (){
			nav.addClass('leftShow');
		});
	});
	/*addHandler(jShade,"touchend",function(event){
		up[0] = event.changedTouches[0].clientX;
		up[1] = event.changedTouches[0].clientY;	
	});*///end是在changedTouches下.闹哪样
})();