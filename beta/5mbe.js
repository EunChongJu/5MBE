// 이 파일은 겉으로 드러나지 않는, 내부적으로 프로그램을 구성한다.
'use strict';





// 	class Breathing Exercise Program
var BEP = function() {
	var inhaleTime = 5;
	var exhaleTime = 5;
	var allowHold = true;
	var holdTime = 1;
	
	this.getInhale = function() {
		return inhaleTime;
	};
	this.setInhale = function(time) {
		if (time != 0) inhaleTime = time;
	};
	
	this.getExhale = function() {
		return exhaleTime;
	};
	this.setExhale = function(time) {
		if (time != 0) exhaleTime = time;
	};
	
	this.getAllowHold = function() {
		return allowHold;
	};
	this.setAllowHold = function() {
		if (!allowHold) this.setHold(0);
		allowHold = !allowHold;
	};
	
	this.getHold = function() {
		return holdTime;
	};
	this.setHold = function(time) {
		if (time == 0) this.setAllowHold();
		holdTime = time;
	};
	
	
	var repeat = 1;
	var cycle = 1;
	var subtitleOnHold = true;	// hold 상태일 때 자막 표시?
	
	var parasArr = [
		'들이쉬기',
		'숨참기',
		'내쉬기',
	];
	
	this.init = function() {
		parasArr = [
			'들이쉬기',
			'숨참기',
			'내쉬기',
		];
		repeat = 1;
		cycle = 1;
	};
	
	this.getRepeat = function() {
		return repeat;
	};
	this.setRepeat = function(r) {
		if (r != 0) repeat = r;
	};
	
	function updateCycle() {
		
	}
	
	
	this.len = function() {
		return parasArr.length;
	};
	
	
	
	this.setScripts = function(arr) {
		parasArr = arr;
	};
	
	this.getScripts = function() {
		return parasArr;
	};
}


// 아래의 함수를 얻는데 필요한 변수의 구성
let stopTime;	// 숨참기를 가지는 시간
let parasGroup;	// 입력된 인풋의 개수
let paraRepeat;	// 파라스 반복횟수


function isStop(stopTime) {
	return stopTime != 0;
}
function getTimeGroup(isStop) {
	return (isStop) ? 3 : 2;
}
function getParasAllLength(parasGroup, paraRepeat) {
	return parasGroup * paraRepeat;
}
function getTimeRepeat(parasAllLength, timeGroup) {
	var n = parasAllLength % timeGroup;
	var dispart = parseInt(parasAllLength / timeGroup);
	return (n == 0) ? dispart : dispart + 1;
}
function getTimeGroupAllLength(timeRepeat, timeGroup) {
	return timeRepeat * timeGroup;
}

// timeArr = stepArr
function getTimeArrLength(isStop, parasGroup) {
	// 어차피 isStop은 이 배열을 생성하는 함수에도 필요할 것
	var timeGroup = getTimeGroup(isStop);
	var parasAllLength = getParasAllLength(parasGroup, paraRepeat);
	var timeRepeat = getTimeRepeat(parasAllLength, timeGroup);
	
	return getTimeGroupAllLength(timeRepeat, timeGroup);
}
// parasArr = ccArr
function getParasArrLength(parasGroup, paraRepeat) {
	return getParasAllLength(parasGroup, paraRepeat);
}

































































