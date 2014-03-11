var oNav=document.getElementById("nav");
var oLi=oNav.getElementsByTagName("ul")[0].getElementsByTagName("li");

	for(var i=0;i<oLi.length;i++){
		oLi[i].onmouseover=function(){
			for(var j=0;j<oLi.length;j++){
				oLi[j].className="";
			}
			this.className=oLi[page].className="on";
		}
	}
	for(var i=0;i<oLi.length;i++){
		oLi[i].onmouseout=function(){
			for(var j=0;j<oLi.length;j++){
				oLi[j].className="";
			}
		oLi[page].className="on";
		}
	}
var oBanner= document.getElementsByClassName("banner")[0],
oBanBtnImg=oBanner.getElementsByTagName("img"),
oBanBtnLi= document.getElementsByClassName("btn")[0].getElementsByTagName("li");
var time=0;
var timer=null;
for(var i=0;i<oBanBtnLi.length;i++){
	oBanBtnLi[i].index=i;
	oBanBtnLi[i].onclick=function(){
		time=this.index;//important!
		tab();
	}
function tab(){
	for(var j=0;j<oBanBtnLi.length;j++){
				oBanBtnLi[j].className="";
				oBanBtnImg[j].style.opacity="0";
			}
			oBanBtnLi[time].className="onBannar";
			oBanBtnImg[time].style.opacity="1";
		};
	}
function next(){
	time++;
	if(time==oBanBtnLi.length)
	{
		time=0;
	}
	tab();
}
oBanner.onmouseover=function(){
	clearInterval(timer);
	}
oBanner.onmouseout=function(){
	timer=setInterval(next, 4000);
	}
timer=setInterval(next, 4000);

// JavaScript Document