var oLi=document.getElementById('header').getElementsByClassName('mainUl')[0].getElementsByTagName('li'),
	oDiv=document.getElementById('header').getElementsByTagName('div');

	function next(){
		ppp++;
		if(ppp==oBanImg.length)
		{
			ppp=0;
		}
		tab();
	}
	function tabTitle(){
		oBanP[0].innerHTML=banTitleText[ppp].title;
		oBanP[1].innerHTML=banTitleText[ppp].writer;
		}
	function tab(){
		for(var j=0;j<oBanImg.length;j++){
				oBanImg[j].className="";
			}
		oBanImg[ppp].className="onImg";
		timerC=setTimeout("tabTitle()",600);
	};
	var oLiA=oLi[3],oLiB=oLi[4];
	oLiA.onmouseover=function(){
		oDiv[0].className="nHoverA";
		};
	oLiA.onmouseout=function(){
		oDiv[0].className="";
		};
	oLiB.onmouseover=function(){
		oDiv[1].className="nHoverB";
		};	
	oLiB.onmouseout=function(){
		oDiv[1].className="";
		};
	function out(){
		for(var j=1;j<oLeftUl.length;j++){
			oLeftUl[j].className="";
		}
	}
