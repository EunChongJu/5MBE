// 이 파일은 겉으로 드러나지 않는, 내부적으로 프로그램을 구성한다.
'use strict';





// 	class Breathing Exercise Program
var BEP = function() {
	//// BASIC ////
	var inhaleTime = 5;
	var exhaleTime = 5;
	var allowHold = true;
	var holdTime = 1;
	
	// 들이쉬기 시간설정
	this.getInhale = function() {
		return inhaleTime;
	};
	this.setInhale = function(time) {
		if (time != 0) inhaleTime = time;
	};
	
	// 내쉬기 시간설정
	this.getExhale = function() {
		return exhaleTime;
	};
	this.setExhale = function(time) {
		if (time != 0) exhaleTime = time;
	};
	
	// 숨참기 허용여부
	this.getAllowHold = function() {
		return allowHold;
	};
	this.setAllowHold = function() {
		if (!allowHold) this.setHold(0);
		allowHold = !allowHold;
	};
	
	// 숨참기 시간설정
	this.getHold = function() {
		return holdTime;
	};
	this.setHold = function(time) {
		if (time == 0) this.setAllowHold();
		holdTime = time;
	};
	
	//// PARA SCRIPTER ////
	var repeat = 1;
	var cycle = 1;
	var subtitleOnHold = true;	// hold 상태일 때 자막 표시?
	
	var parasArr = [
		{str: '들이쉬기', id: 0},
		{str: '숨참기', id: 1},
		{str: '내쉬기', id: 2},
	];
	var parasId = 3;
	
	// 초기화
	this.init = function() {
		parasArr = [
			{str: '들이쉬기', id: 0},
			{str: '숨참기', id: 1},
			{str: '내쉬기', id: 2},
		];
		repeat = 1;
		cycle = 1;
		subtitleOnHold = true;
		parasId = 3;
	};
	
	// 스크립트 반복 설정
	this.getRepeat = function() {
		return repeat;
	};
	this.setRepeat = function(r) {
		if (r != 0) repeat = r;
	};
	
	// 호흡 사이클 업데이트
	function updateCycle() {
		var len = this.len();
		var hold = subtitleOnHold();
		var repeat = this.getRepeat();
		
		var n = (len * repeat) % ((hold) ? 3 : 2);
		var dispart = parseInt(((len * repeat)) / ((hold) ? 3 : 2));
		
		cycle = ((n == 0) ? dispart : dispart + 1);
	}
	
	// 숨참기 중 자막 표시여부
	this.getSubOnHold = function() {
		return subtitleOnHold;
	};
	this.setSubOnHold = function() {
		subtitleOnHold = !subtitleOnHold;
	};
	
	// 스크립트 개수 반환
	this.len = function() {
		return parasArr.length;
	};
	
	// 외부로부터 스크립트를 불러오거나 스크립트를 저장할 때
	this.setParas = function(arr) {
		parasArr = arr;
	};
	this.getParas = function() {
		return parasArr;
	};
	
	// 특정 문단의 아이디를 찾아 배열번호를 반환
	function findParaId(id) {
		for (var i = 0; i < parasArr.length; i++) {
			if (parasArr[i].id == id) return i;
		}
		return -1;
	}
	
	// 특정 문단의 아이디를 찾아 파라미터의 함수 실행
	function findParaIdAndActive(id, func) {
//		var index = findParaId(id);
//		func(parasArr[i]);
		for (var i = 0; i < parasArr.length; i++) {
			if (parasArr[i].id == id) {
				func(i);
				return true;
			}
		}
		return false;
	}
	
	// 전체 문단을 모두 파라미터로 받은 함수로 일일이 실행
	function activeAllParas(func) {
		for (var i = 0; i < parasArr.length; i++) {
			func(parasArr[i]);
			// function(para) { console.log(para); }
		}
	}
	
	// 스크립트 문단 하나 추가
	this.addPara = function() {
		parasArr.push({str: '', id: parasId});
		return parasId++;
	};
	
	// 스크립트 특정 문단 읽기
	this.readParaId = function(id) {
//		findParaIdAndActive(id, function(i) {
//			return parasArr[i].str;
//		});
		var index = findParaId(id);
		if (index != -1) {
			return parasArr[i].str;
		}
	}
	
	// 스크립트 특정 문단 수정
	this.updateParaId = function(id, str) {
//		findParaIdAndActive(id, function(i) {
//			parasArr[i].str = str;
//		});
		var index = findParaId(id);
		if (index != -1) {
			parasArr[i].str = str;
		};
	}
	
	// 스크립트 특정 문단 삭제
	this.removeParaId = function(id) {
//		findParaIdAndActive(id, function(i) {
//			parasArr.splice(i,1);
//		});
		var index = findParaIndex(id);
		if (index != -1) parasArr.splice(index,1);
	}
	
	// 스크립트 전체 문단 삭제
	this.deleteParas = function() {
		parasArr = [];
	};
	
	
	
	
	
	
	
	
	
	
	// 이것은 매우 위험한(?) 코드들의 모음이다. //
	// 위험한 이유는 변경 하나라도 바꾸다간 골로 가는 것이기 때문이다. //
	
	// 스크립트의 갯수와 반복횟수를 곱한 값을 반환한다.
	this.getBreathingParasLength = function() {
		return this.len() * this.getRepeat();
	};
	
	// 스크립트의 갯수와 숨참기시 자막표시 허용여부, 반복을 반영하여 사이클 값을 반환한다.
	this.getCycle = function() {
		var len = this.len();
		var hold = subtitleOnHold();
		var repeat = this.getRepeat();
		
		var n = (len * repeat) % ((hold) ? 3 : 2);
		var dispart = parseInt(((len * repeat)) / ((hold) ? 3 : 2));
		
		return ((n == 0) ? dispart : dispart + 1);
	};
	
	
	//////////////////////////////////////////// 아직 수정하지 않음//////////////////////////
	// timeArr = stepArr
	// 호흡운동에서의 타임 배열과 순서 배열의 원소 갯수를 계산하여 반환
	function getTimeArrLength(isStop, parasGroup) {
		// 어차피 isStop은 이 배열을 생성하는 함수에도 필요할 것
		var timeGroup = getTimeGroup(isStop);
		var parasAllLength = getParasAllLength(parasGroup, paraRepeat);
		var timeRepeat = getTimeRepeat(parasAllLength, timeGroup);
		
		return getTimeGroupAllLength(timeRepeat, timeGroup);
	}
	
	// parasArr = ccArr
	// 스크립트 자막을 표시하게 될 갯수를 계산하여 자막배열의 원소 갯수를 반환
	function getParasArrLength(parasGroup, paraRepeat) {
		return getParasAllLength(parasGroup, paraRepeat);
	}
	
	
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

































































