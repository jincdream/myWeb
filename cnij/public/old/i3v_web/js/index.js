var oLeftUl=document.getElementById("content").getElementsByTagName("ul"),
	oMainLi=document.getElementById("content").getElementsByClassName("leftMainNav")[0].getElementsByTagName("li"),
	oDivTab=document.getElementsByClassName("tab")[0].getElementsByTagName("div"),
	oLiTab=document.getElementsByClassName("tabA")[0].getElementsByTagName("li"),
	oLiTeaCher=document.getElementsByClassName("teacher")[0].getElementsByTagName("li"),
	oBanImg=document.getElementsByClassName("bannar")[0].getElementsByTagName("img"),
	oBanArticl=document.getElementsByClassName("banTitle")[0],
	oBanP=document.getElementsByClassName("banTitle")[0].getElementsByTagName("p"),
	p=0,pp=0,ppp=0,timer=null,timerT=null,speed=0,timerC;

var banTitleText=[{"title":"<a href='#'/>学员作品-室内设计</a>","writer":"<a href='#'/>2011.08.15 室内研修班 谢桥</a>"},{"title":"<a href='#'/>学员作品-VI设计</a>","writer":"<a href='#'/>2011.08.15 吴浩然、兰婧、彭思丽</a>"}];

	tabTitle();
	timerT=setInterval("next()",6000);
	oBanArticl.onmouseover=function(){
		clearInterval(timerT);
		clearTimeout(timerC);
		};
	oBanArticl.onmouseout=function(){
		timerT=setInterval("next()",6000);
		};
	for(var i=0;i<oMainLi.length;i++){
		oMainLi[i].index=i;
		oMainLi[i].onmouseover=function(){
			p=this.index+1;
			out();
			speed=5;
			var oLeft=oLeftUl[p].style.left;
			oLeftUl[p].className="on";
			clearTimeout(timer);
		};
		oMainLi[i].onmouseout=function(){
			timer=setTimeout("out()",200);	
		};
	};
	for(var i=1;i<oLeftUl.length;i++){
		oLeftUl[i].onmouseover=function(){
			clearTimeout(timer);	
		};
		oLeftUl[i].onmouseout=function(){
			timer=setTimeout("out()",200);
			}
	}
	for(var i=0;i<oMainLi.length;i++){
		oMainLi[i].index=i;
		oMainLi[i].onmouseover=function(){
			p=this.index+1;
			out();
			speed=5;
			var oLeft=oLeftUl[p].style.left;
			oLeftUl[p].className="on";
			clearTimeout(timer);
		};
		oMainLi[i].onmouseout=function(){
			timer=setTimeout("out()",200);	
		};
	};
	for(var i=0;i<oLiTab.length;i++){
		oLiTab[i].index=i;
		oLiTab[i].onmouseover=function(){
			pp=this.index;
			for(j=0;j<oDivTab.length;j++){
				oLiTab[j].className=oDivTab[j].className="";
			}
			this.className="onTab";
			oDivTab[pp].className="onDiv";
		}
	}
	for(var i=0;i<oLiTeaCher.length;i++){
		oLiTeaCher[i].onclick=function(){
			for(var j=0;j<oLiTeaCher.length;j++){
				oLiTeaCher[j].className="";
				}
			this.className="onT";
		};
	}