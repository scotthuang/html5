(function(){
	var start, end;
	var offsetStart, offsetEnd;

	document.addEventListener('touchstart', touchBindStart, false);
	document.addEventListener('touchend', touchBindEnd, false);
	document.addEventListener('touchmove', touchBindMove, false);
	document.addEventListener('touchcancel', touchBindCancel, false);

	function touchBindStart(evt){
		//evt.preventDefault();
		try{
			var touch = evt.touches[0]; //获取第一个触点  
            var x = Number(touch.pageX); //页面触点X坐标  
            var y = Number(touch.pageY); //页面触点Y坐标  
            //记录触点初始位置  
 			
 			start = x;
 			offsetStart = y;
		}catch(e){
			alert('fail');
		}
	}

	function touchBindMove(evt){
		//evt.preventDefault();
		try{
			var deviceHeight = window.innerHeight;
			var touch = evt.touches[0]; //获取第一个触点  
            var x = Number(touch.pageX); //页面触点X坐标  
            var y = Number(touch.pageY); //页面触点Y坐标  
            //记录触点初始位置  
 			
 			if((y - offsetStart) > 0 && document.body.scrollTop == 0){
 				evt.preventDefault();
 				var page = document.getElementsByClassName('tweet-page')[0];
	 			var rate = 0;

	 			end = x;
	 			offsetEnd = y;
	 			rate = (offsetEnd - offsetStart) / (2 * deviceHeight);

	 			//tool.print(rate);
	 			easing.pullMotion(page, rate);
 			}

 			/*var page = document.getElementsByClassName('tweet-page')[0];
 			var rate = 0;

 			end = x;
 			offsetEnd = y;
 			rate = (offsetEnd - offsetStart) / (2 * deviceHeight);

 			//tool.print(rate);
 			easing.pullMotion(page, rate);*/
		}catch(e){
			alert(e.message);
		}
	}

	function touchBindEnd(evt){
		evt.preventDefault();
		try{
			var startTime = new Date().getTime();
			easing.pullBackFlag = setInterval('pullBack(' + startTime + ')' ,13);
		}catch(e){
			alert(e.message);
		}
	}

	function touchBindCancel(evt){
		alert('3');
	}
})();

function pullBack(startTime){
	var page = document.getElementsByClassName('tweet-page')[0];
	easing.pullReleaseMotion(page, startTime, parseInt(page.style.top));
}