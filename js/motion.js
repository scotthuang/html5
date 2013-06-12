var easing = {
	'offset': 0,
	'pullOffset': 0,
	//下拉回缩时间
	'pullBackTime': 500,
	'pullBackFlag': null,

	'swing': function(p){
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	},

	'pullSwing': function(p){
		return 0.5 - (1 - Math.sin(p * Math.PI)) / 2;
	},

	'liner': function(p){
		return p;
	},

	'motion': function(elm, startTime, totalTime, startX, endX){
		var duration = (new Date().getTime() - startTime) / (totalTime);
		var newPos;

		if(duration >= 1){
			this.offset = 1;
		}else{
			this.offset = easing.swing(duration);
		}

		newPos = startX + (endX - startX) * this.offset;
		elm.style.left = newPos + 'px';
	},

	'pullMotion': function(elm, rate){
		var newPos;
		var pullMax = 0.5 * window.innerHeight;
		this.pullOffset = easing.pullSwing(rate);

		newPos = pullMax * this.pullOffset;
		elm.style.top = newPos + 'px';
	},

	'pullReleaseMotion': function(elm, startTime, startY){
		var duration = (new Date().getTime() - startTime) / (this.pullBackTime);
		var newPos;

		if(duration >= 1){
			clearInterval(this.pullBackFlag);
		}
		this.offset = easing.liner(duration);

		newPos = startY - parseInt(elm.style.top) * this.offset;
		elm.style.top = newPos + 'px';
	}
}