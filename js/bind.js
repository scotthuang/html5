/*(function(){
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
}*/

var obj = {
	//检测滑动两点坐标
	_coordinates: {},
	//绑定对象
	dom: document.getElementById('warpper'),
	//检测角度
	angle: 35,
	//回调函数
	callback: function(angle){
		alert(angle);
		if(angle <= this.angle){
			//alert('horizon');
			//bindHorizonEvent(obj);
		}else{
			//alert('a');
			bindVerticalEvent(obj);
		}
	}
}

bindDirection(obj);

function bindHorizonEvent(obj){
	addEventListener('touchmove', HorizonMove, false);

	function HorizonMove(e){
		e.preventDefault();
		try{
			var deviceWidth = window.innerWidth;
			var touch = e.touches[0]; //获取第一个触点  
            var pointX = Number(touch.pageX); //页面触点X坐标  
            var pointY = Number(touch.pageY); //页面触点Y坐标  

            //记录偏移值 
 			var offsetX = pointX - obj._coordinates.x1;
			var page = document.getElementsByClassName('tweet-page')[0];
 			var rate = 0;

 			rate = offsetX / (2 * deviceWidth);
 			easing.horizonMotion(page, rate);
		}catch(error){
			alert(error.message);
		}
	}

	function HorizonEnd(e){
		e.preventDefault();

		obj.dom.removeEventListener('touchmove', HorizonMove, false);
		obj.dom.removeEventListener('touchend', HorizonEnd, false);
	}
}

function bindVerticalEvent(obj){
	var offsetX = obj._coordinates.y2 - obj._coordinates.y1;
	if(offsetX > 0 && document.body.scrollTop == 0){
		obj.dom.addEventListener('touchmove', verticalMove, false);
		obj.dom.addEventListener('touchend', verticalEnd, false);
	}

	function verticalMove(e){
		e.preventDefault();
		try{
			var deviceHeight = window.innerHeight;
			var touch = e.touches[0]; //获取第一个触点  
            var pointX = Number(touch.pageX); //页面触点X坐标  
            var pointY = Number(touch.pageY); //页面触点Y坐标  
            
            //记录偏移值 
 			var offsetY = pointY - obj._coordinates.y1;
			var page = document.getElementsByClassName('tweet-page')[0];
 			var rate = 0;

 			rate = offsetY / (2 * deviceHeight);
 			easing.pullMotion(page, rate);
		}catch(error){
			alert(error.message);
		}
	}

	function verticalEnd(e){
		e.preventDefault();
		try{
			var startTime = new Date().getTime();
			easing.pullBackFlag = setInterval('pullBack(' + startTime + ')' ,13);
		}catch(error){
			alert(error.message);
		}

		obj.dom.removeEventListener('touchmove', verticalMove, false);
		obj.dom.removeEventListener('touchend', verticalEnd, false);
	}
}

function bindDirection(obj){
	obj = obj || {};
	if(typeof obj.dom == 'undefined'){
		return false;
	}

	obj.callback = obj.callback || new Function();

	obj.dom.addEventListener('touchstart', moveStart, false);
	function moveStart(e){
		e.preventDefault();
		var touch = e.touches[0]
		obj._coordinates.x1 = Number(touch.pageX);
		obj._coordinates.y1 = Number(touch.pageY);

		obj.dom.addEventListener('touchmove', moveProcess, false);
		function moveProcess(e){
			e.preventDefault();

			try{
				var endTouch = e.touches[0];
				var angle;

				obj._coordinates.x2 = endTouch.pageX;
				obj._coordinates.y2 = endTouch.pageY;

				angle = Math.atan((Math.abs(obj._coordinates.y2 - obj._coordinates.y1) / Math.abs(obj._coordinates.x2 - obj._coordinates.x1))) * (180 / Math.PI);

				obj.dom.removeEventListener('touchmove', moveProcess, false);

				obj.callback(angle);
			}catch(error){
				alert(error);
			}
		}
	}
}

function pullBack(startTime){
	var page = document.getElementsByClassName('tweet-page')[0];
	easing.pullReleaseMotion(page, startTime, parseInt(page.style.top));
}