window.onload=function(){	
					
	var color=["#fff","#fff","#fff","#fff"];
	var theme=new Array();
	
	var song=["ogg/qingchen.ogg","ogg/zuilengyitian.ogg","ogg/putaochengshushi.ogg","ogg/suiyueruge.ogg"];
	var bg=["img/bg0.jpg","img/bg1.jpg","img/bg2.jpg","img/bg3.jpg"];
	var ag=["img/a.jpg","img/b.jpg","img/c.jpg","img/d.jpg"];
	
	var styleColor=[
		{"listBg":"rgba(206,83,104,.5)","btnBg":"#ce5368","cvs":"#b01751"
		,"btnwait":"#f583ae","btnready":"#8a1240","name":"#feebb5"}//第1套
		,{"listBg":"rgba(52,139,163,.5)","btnBg":"#484340","cvs":"#2f9dc8"
		,"btnwait":"#49b0cc","btnready":"#146277","name":"#eaebea"}//第2套
		,{"listBg":"rgba(144,41,123,.5)","btnBg":"#611477","cvs":"#694e6d"
		,"btnwait":"#b04a94","btnready":"#4c1c3f","name":"#e4eded"}//第3套(248,203,66,.5)
		,{"listBg":"rgba(81,92,65,.5)","btnBg":"#277b95","cvs":"#204f5d"
		,"btnwait":"#d9b562","btnready":"#db9f1f","name":"#fbd17d"}]//第4套json
					
					
	
	function changeStyle(x){
		theme[x]=styleColor[x].cvs;
		$(".btn").css("background",styleColor[x].btnBg);
		$("#list").css("background",styleColor[x].listBg);
		$("#div2").css("background",styleColor[x].cvs);
		$(".btnwait").css("background",styleColor[x].btnwait);
		$(".btnready").css("background",styleColor[x].btnready);
		$("body").css("background-image","url("+bg[x]+")");
		$(".btnplaying").css("background",styleColor[x].btnready);
		$(".name").css("color",styleColor[x].name);
	}
	changeStyle(0);
	
	
	var b1=document.getElementById("cns1").getContext("2d");
	var b2=document.getElementById("cns2").getContext("2d");
	var b3=document.getElementById("cns3").getContext("2d");
	var b4=document.getElementById("cns4").getContext("2d");

	var oMusic=document.getElementById("music");

	
	var oVolum=document.getElementById("volum");
	var oVol=document.getElementById("vol");
	var oDiv1=document.getElementById("div1");
	var oDiv2=document.getElementById("div2");

	var oPlay=document.getElementById("play");
	
	var oNext=document.getElementById("next");
	var oLast=document.getElementById("last");
	
	var oHide=document.getElementById("img").getElementsByTagName("span")[0];
	

	var disX=0;
	
	var timer=null;
	

	
	
		
	flashCanvas();
	
	


	function draw(color){
		b1.fillStyle=color[0];
		b1.beginPath();
		b1.moveTo(18,35);
		b1.lineTo(18,15);
		b1.lineTo(38,25);
		b1.closePath();
		b1.fill();

		
		b2.fillStyle=color[1];
		b2.beginPath();
		b2.moveTo(15,35);
		b2.lineTo(15,15);
		b2.lineTo(30,25);
		b2.closePath();
		b2.fill();

		b2.beginPath();
		b2.moveTo(24,35);
		b2.lineTo(24,15);
		b2.lineTo(40,25);
		b2.closePath();
		b2.fill();

		
		b3.fillStyle=color[2];
		b3.beginPath();
		b3.moveTo(35,15);
		b3.lineTo(35,35);
		b3.lineTo(20,25);
		b3.closePath();
		b3.fill();

		b3.beginPath();
		b3.moveTo(26,15);
		b3.lineTo(26,35);
		b3.lineTo(10,25);
		b3.closePath();
		b3.fill();

		
		b4.fillStyle=color[3];
		b4.beginPath();
		b4.moveTo(30,15);
		b4.lineTo(30,35);
		b4.lineTo(23,30);
		b4.lineTo(18,30);
		b4.lineTo(18,20);
		b4.lineTo(23,20);
		
		b4.closePath();
		b4.fill();
	}

	function flashCanvas(){
		b1.clearRect(0,0,50,50);
		b2.clearRect(0,0,50,50);
		b3.clearRect(0,0,50,50);
		b4.clearRect(0,0,50,50);
		draw(color);
	}


	
	
	oVol.onclick=function(ev){
		
		var oEvent=ev||event;
		if(oDiv1.style.display=="none"){
			
				
		
			oDiv1.style.display="block";
			oVol.style.background="#fff";
			oVol.style.opacity="1";
			color[3]=theme[0];
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
	
		function changPlay(a,b){
			oPlay.style.background=a;
			
			color[0]=b;
			flashCanvas();
			}
		
			
		oPlay.onclick=function(){
		if(oMusic.paused){
			changPlay("#fff",theme[0]);
			oMusic.play();
			
		}else if(oMusic.paused!=true)
		{
			changPlay(null,"#fff");
			oMusic.pause();
		}
		
	};
	
	
		
	function nextSong(){
		for(var i=(song.length-1);i>0;i--){
		
		songChange(0,i);
		
		}
		changeStyle(0);
		playThisSong();
	
	}
	
	function lastSong(){
		for(var i=1;i<song.length;i++){
		
		songChange(0,i);
		
		}
		changeStyle(0);
		playThisSong();
		
	}
	var pSongN=0;
	oNext.onclick=function(){
		nextSong();
		
	};
	var pSongL=0;	
	oLast.onclick=function(){
		lastSong();
		
	};


	$("#play").click(function(){
		$(".hide").fadeToggle(1000);
	});
	$("#more").click(function(){
		$(".h").slideToggle("slow");
	});
	$(".btnready").eq(0).click(function(){
		
		songChange(0,1);
		playThisSong();
		changeStyle(0);
		
		color[0]=theme[0];
			flashCanvas();
	}).end().eq(1).click(function(){
		
		songChange(0,2);
		playThisSong();
		changeStyle(0);
		
		color[0]=theme[0];
			flashCanvas();
	}).end().eq(2).click(function(){
		
		songChange(0,3);
		playThisSong();
		changeStyle(0);
		
		color[0]=theme[0];
			flashCanvas();
	});
	
	
	
	$(".btnwait").eq(0).mouseover(function(){
		$(".btnready").eq(0).animate({left:'0'});
	}).end().eq(1).mouseover(function(){
		$(".btnready").eq(1).animate({left:'0'});
	}).end().eq(2).mouseover(function(){
		$(".btnready").eq(2).animate({left:'0'});
	});
	
	function animateP(x){
		$(".btnready").eq(x).animate({top:'30px'});
		$(".btnready").eq(x).animate({left:'54px'},50);
		$(".btnready").eq(x).animate({top:'0'},50);
	}
	
	$(".btnbtn").eq(1).mouseleave(function(){
			animateP(0);
		}).end().eq(2).mouseleave(function(){
			animateP(1);
		}).end().eq(3).mouseleave(function(){
			animateP(2);
		})
		
		
	function changeDate(a,t,x){
			var p=a[t];
			a[t]=a[x];
			a[x]=p;
		}
	
	function songChange(t,x){
		var box1=$(".name").eq(t).html();
		var box2=$(".name").eq(x).html();
		
		
		$(".name").eq(t).html(box2).end().eq(x).html(box1);
		$("source").attr("src",song[x]);
		changeDate(song,t,x);
		changeDate(styleColor,t,x)
		changeDate(bg,t,x); 
		changeDate(ag,t,x);
		changeAgBtn();
		
		
	}
	$("#img img").eq(0).css("opacity",".85");
	function changeAgBtn(){
		
		for(var i=0;i<ag.length;i++){
			$("#img img").eq(i).attr("src",ag[i]);
			$("#img img").eq(i).css("opacity","0");
		}
		
		
	}
	
	
	
	
	function playThisSong(){
		if(oMusic.paused!=true){
			$(".hide").fadeIn(10);
		}
		oMusic.load();
		oMusic.play();
		$(".hide").fadeOut(1000);
		changPlay("#fff",theme[0]);
		$("#img img").eq(0).animate({opacity:'.85'},1000);
	}
	
	
	timer=setInterval(function(){
		if(oMusic.ended){
			nextSong();
		}
	},1000);
		


};