var tool = {
	'print': function(msg){
		var tmp = document.createElement('div');
		var msgTmp = document.createTextNode(msg);

		tmp.appendChild(msgTmp);
		document.body.appendChild(tmp);
	}
}