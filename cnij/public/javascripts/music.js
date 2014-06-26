var j = function(el){
	return document.querySelectorAll(el);
};

var cvs = j('#canvas')[0].getContext("2d");
var cvsPlay = j('#play canvas')[0].getContext("2d");
var music = j('#audio')[0];
$('#play').click(function(){
	music.play();
});

var w = cvs.canvas.width = document.body.clientWidth;
var h = cvs.canvas.height = document.body.clientHeight;
var img = new Image(),
	color = [];
var rgba;
var src = j('.cover')[0].src;
img.src = src;

/*获取颜色*/
function Rgba(img) {
	this.img = img;
	this.r = [];
	this.g = [];
	this.b = [];
	this.a = 1;
	this.pointP = -1;
	/*getImgData*/
	this.width = this.img.width;
	this.height = this.img.height;
	cvs.drawImage(img, 0, 0, this.width, this.height);
	this.da = cvs.getImageData(0, 0, this.width, this.height).data;
	var data = this.da;
	cvs.clearRect(0, 0, this.width, this.height);
	for (var i = 0; i < data.length; i += 4) {
		this.r.push(data[i]);
		this.g.push(data[i + 1]);
		this.b.push(data[i + 2]);
	}
}
Rgba.prototype.getColor = function() { /*getColor 多个点的rgba*/
	if (Object.prototype.toString.call(arguments[0]) != '[object Array]') return;
	var rgba = [];
	var arg = arguments;
	var len = arg.length;
	for (var i = 0; i < len; i++) {
		var n = this.getN(arg[i]); //点坐标转换
		var r = this.getRed(n);
		var g = this.getGreen(n);
		var b = this.getBlue(n);
		var str = "rgba(" + r + "," + g + "," + b + "," + this.a + ")";
		rgba.push(str);
	}
	return rgba;
};
Rgba.prototype.getN = function(ary) { //点坐标转换
	var point = ary,
		n = point[0] + this.width * point[1];
	this.a = point[2] || 1;
	return n;
};
Rgba.prototype.getColorP = function(num, rgb) {
	var arg = num;
	var n;
	if (typeof(arg) == "undefined") return rgb;
	if (typeof(arg) == "number") {
		n = arg;
	} else if (Object.prototype.toString.call(arg) == '[object Array]') {
		n = this.getN(arg);
	}
	return rgb[n];
};
Rgba.prototype.getRed = function(n) {
	return this.getColorP(n, this.r);
};
Rgba.prototype.getGreen = function(n) {
	return this.getColorP(n, this.g);
};
Rgba.prototype.getBlue = function(n) {
	return this.getColorP(n, this.b);
};
Rgba.prototype.linear = function(color){
	var linear = cvs.createLinearGradient(0,0,0,h);
	var mach = 1/(color.length);
	linear.addColorStop(0,"rgba(255,255,255,0.8)");
	for(var i=0;i<color.length;i++){
		linear.addColorStop((i+1)*mach,color[i]);
		console.log(i*mach,color[i]);
	}
	cvs.fillStyle=linear;
	cvs.fillRect(0,0,w,h);
};
var player = new Music();
img.onload = function() {
	rgba = new Rgba(img);
	color = rgba.getColor([40,40]);
	rgba.linear(color);
	player.drawPlay(cvsPlay);
};
/*-------------------------music-------------------------*/
function Music(){

}
Music.prototype.drawUi = function(){

};
Music.prototype.drawPlay = function(cvs){
		cvs.fillStyle=color[0];
		cvs.beginPath();
		cvs.moveTo(18,35);
		cvs.lineTo(18,15);
		cvs.lineTo(38,25);
		cvs.closePath();
		cvs.fill();
};

/*
try{
window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();
}
catch(e) {
alert(window.AudioContext);
}

Rgba.prototype.drawMohu = function(obj, cvs) {
	var len = this.da.length;
	var i = 0;
	var w = this.width;
	var h = this.height;

	var imgData = cvs.createImageData(w, h);
	for (i; i < len; i++) {
		var f = i * 4;
		imgData.data[f + 0] = obj.r[i];
		imgData.data[f + 1] = obj.g[i];
		imgData.data[f + 2] = obj.b[i];
		imgData.data[f + 3] = 255;
	}
	cvs.putImageData(imgData, 0, 0);
};
Rgba.prototype.mohu = function(r) {
	var _this = this;
	var radio = 1 / (4 * r * r);
	var w = _this.width;
	var h = _this.height;
	var lemit1 = _this.width - r;
	var lemit2 = _this.height - r;
	var round = r + r + 1;
	var color = {};
	color.r = [];
	color.g = [];
	color.b = [];
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var roundX = round + j;
			var roundY = round + i;
			var sumR = 0;
			var sumG = 0;
			var sumB = 0;
			if (i >= r && j >= r && i <= lemit2 && j <= lemit1) {
				var y=0;
				for (y; y < roundY; y++) {
					var x = 0;
					for (x; x < roundX; x++) {
						sumR += _this.getRed([x, y]);
						sumG += _this.getGreen([x, y]);
						sumB += _this.getBlue([x, y]);
					}
				}
				sumR = (sumR / round) | 0;
				sumG = (sumG / round) | 0;
				sumB = (sumB / round) | 0;
			} else {

			}
			color.r.push(sumR);
			color.g.push(sumG);
			color.b.push(sumB);
		}
	}
	return color;
};*/