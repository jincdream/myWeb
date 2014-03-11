window.onload=function(){	var oMusic=document.getElementById("music");
	
	var oVolum=document.getElementById("volum");
	var oVol=document.getElementById("vol");
	var oDiv1=document.getElementById("div1");
	var oDiv2=document.getElementById("div2");

	var oPlay=document.getElementById("play");
	
	var oUp=document.getElementById("up");
	var oDown=document.getElementById("down");
	
	var oHide=document.getElementById("img").getElementsByTagName("span")[0];
	

	var disX=0;
	var disY=0;
	var timer=null;
	
	oVol.onclick=function(ev){
		
		var oEvent=ev||event;
		if(oDiv1.style.display=="none"){
			
				
		
			oDiv1.style.display="block";
			oVol.style.background="#fff";
			oVol.style.opacity="1";
			color[3]="#278AE8";
			flashCanvas();

			oDiv1.onclick=function(ev)
			{
					var oEvent=ev||event;
					
					var l= oEvent.clientX-oDiv1.offsetLeft;
					if(l<=322){
						l=322;
					}else if(l>322 && l<414){
						l=oEvent.clientX-oDiv1.offsetLeft;
					}else if(l>=414){
						l=414;
					};
					oVolum.style.left=l-324+"px";
					oDiv2.style.width=l-322+"px"
					
					
					var s=(oDiv2.offsetWidth)/100;
					
					var num=new Number(s);
					var sd=num.toFixed(1);
					oMusic.volume=sd;
					oEvent.cancelBubble=true;
					return false;
					
			}
			oVolum.onmousedown=function (ev)
			{
				var oEvent=ev||event;
				disX = oEvent.clientX-oVolum.offsetLeft;
				
				document.onmousemove=function(ev){
					var oEvent=ev||event;
					var l= oEvent.clientX-disX;
					if(l<=-2){
						l=-2;
					}else if(l>oDiv1.offsetWidth-oVolum.offsetWidth){
						l=oDiv1.offsetWidth-oVolum.offsetWidth;
					};
					oVolum.style.left=l+"px";
					
					var speed=l/(oDiv1.offsetWidth-oVolum.offsetWidth);
					
					oDiv2.style.width=speed*100+"px";
					var s=(oDiv2.offsetWidth)/100;
					
					var num=new Number(s);
					var sd=num.toFixed(1);
					oMusic.volume=sd;
					return false;
					oEvent.cancelBubble=true;
					document.title=oMusic.volume+"'"+s;
				}
					
				document.onmouseup=function(ev)
				{
					var oEvent=ev||event;
					document.onmousemove=null;
					document.onmouseup=null;
					return false;
				}
				oEvent.cancelBubble=true;
				return false;
			}
		}else if(oDiv1.style.display!="none")	
		{
			oDiv1.style.display="none";

			oVol.style.background=null;
			oVol.style.opacity=null;
			oEvent.cancelBubble=true;
			color[3]="#fff";
			flashCanvas();
			return false;
		}
		oEvent.cancelBubble=true;
	}
			
		oPlay.onclick=function(){
		if(oMusic.paused){
			oPlay.style.background="#fff";
			oMusic.play();
			color[0]="#278AE8";
			flashCanvas();
		}else if(oMusic.paused!=true)
		{
			oPlay.style.background=null;
			oMusic.pause();
			color[0]="#fff";
			flashCanvas();
		}
		
	};

	
	oUp.onclick=function(){
		oMusic.currentTime+=1;
	};
		
	oDown.onclick=function(){
		oMusic.currentTime-=1;
	};

}	