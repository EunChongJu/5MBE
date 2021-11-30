


var brtTimer = function(i, h, e) {
	var inhale=i, hold=h, exhale=e;
	
	this.start = function() {
		
	};
	this.get = function() {
		return {inhale: i, hold: h, exhale: e};
	};
}


// ex
var brt = new brtTimer(5.5, 0, 5.5);
brt.start();
brt.get();



