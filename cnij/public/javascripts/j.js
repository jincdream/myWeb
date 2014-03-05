function MrJ(){};
var j = {};
	j.jEvent = {
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		removeHandler: function(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		getEvent: function(event) {
			return event ? event : window.event;
		},
		getTarget: function(event) {
			return event.target || event.srcElement;
		},
		preventDefault: function(event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		stopPropagation: function(event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		},
		getButton: function(event) {
			if (document.implementation.hasFeature("MouseEvents", "2.0")) {
				return event.button;
			} else {
				switch (event.button) {
					case 0:
					case 1:
					case 3:
					case 5:
					case 7:
						return 0;
					case 2:
					case 6:
						return 2;
					case 4:
						return 1;
				}
			}
		},
		getWheelDelta: function(event) {
			if (event.wheelDelta) {
				return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
			} else {
				return -event.delta * 40;
			}
		}
	};
	j.jTimer = {
		getTime: function() {
			var now = [],
				date = new Date();
			now[0] = date.getFullYear();
			now[1] = date.getMonth() + 1;
			now[2] = date.getDate();
			now[3] = date.getHours();
			now[4] = date.getMinutes();
			now[5] = date.getSeconds();
			return now;
		},
		getCountdown: function(newTime) {
			var now = this.getTime(),
				h = newTime.map(function(x, i, newTime) {
					return x - now[i];
				}).filter(function(x) {
					return x > 0;
				});
			return h;
		}
	};
	j.selector = function(s) {
		var element;
		var j = this;
		if (/#/.test(s)) {
			element = document.querySelector(s);
		} else {
			element = document.querySelectorAll(s);
		}
		if(element.getContext){
			element.snow = function() {
				var cvs = element.getContext("2d"),
					bd = document.querySelector("body"),
					width = element.width = bd.clientWidth,
					height = element.height; //= window.screen.availHeight;
				height += 6;
				width += 6;
				cvs.fillStyle = "rgba(255,255,255,0.8)";

				function Snow(x) { //创建每一个 雪点。
					var s = this; //保存snow,定时器用 
					var aa = [x, 0]; //每个雪点 x,y的坐标
					var speed = Math.random() * 16 + 27; //速度
					this.curve = Math.round(Math.random() * 4); //二次函数曲线的一个因素,影响下落的弧度.
					this.down = function() {
						cvs.clearRect(aa[0] - 5, aa[1] - 4, 10, 6);
						cvs.beginPath();
						cvs.arc(aa[0], aa[1]++, 3, 0, Math.PI * 2, false);
						cvs.closePath();
						cvs.fill(); // 上面是画布工作//这里是雪点坐标移动
						aa[0] = this.curve * Math.pow(aa[1], 0.5) + x; //运用二次函数,创建运动轨迹
						var timerA = setTimeout(function() {
							if (aa[1] > height || aa[0] > width) {
								clearTimeout(timerA);
							} else {
								s.down();
							}
						}, speed);
					};
				}

				function drawSnow() {
					var snow = [];
					var x = 0;
					var gather = [];
					var grain = Math.floor(width / 20);
					for (var i = 20; i >= 0; i--) {
						snow[i] = new Snow(x);
						snow[i].down();
						x += grain;
					}
					// setTimeout(drawSnow, 2000);
				}
				var timerB = setInterval(function() {
					if (!j.isPageHidden()){
						drawSnow();
					}
				}, 2000);
			};
		}
		
		return element;
	};
	j.isPageHidden = function() {
		/*var hidden = {};
		if (typeof document.hidden !== "undefined") {
			hidden.visibilityChange = "visibilitychange";
			hidden.state = "visibilityState";
		} else if (typeof document.mozHidden !== "undefined") {
			hidden.visibilityChange = "mozvisibilitychange";
			hidden.state = "mozVisibilityState";
		} else if (typeof document.msHidden !== "undefined") {
			hidden.visibilityChange = "msvisibilitychange";
			hidden.state = "msVisibilityState";
		} else if (typeof document.webkitHidden !== "undefined") {
			hidden.visibilityChange = "webkitvisibilitychange";
			hidden.state = "webkitVisibilityState";
		}
		hidden.state = document[hidden.state];
		hidden.eventH = function(fn) {
			document.addEventListener(hidden.visibilityChange, fn, false);
		}*/
		return document.hidden ||document.webkitHidden ||document.msHidden ||document.webkitHidden;
		// Add a listener that constantly changes the title
	};
	j.constructor = MrJ;
MrJ.prototype = j;