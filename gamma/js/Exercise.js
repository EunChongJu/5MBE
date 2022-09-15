


// 이 클래스는 운동할 때만 실행
// 들숨시간(=endTime), 숨참시간, 날숨시간(=startTime), 자막의 갯수, 자막의 반복횟수, 들-날 그룹여부, 숨참시 자막표시 여부,
var Exercise = function() {
	var excFlag = true;
	function excFlagUp() { excFlag = true; }
	function excFlagDown() { excFlag = false; }
	function checkExcFlag() { return excFlag; }

	var lungsId = '';
	var subtId = '';

	var time = {
		inhaleTime: 5,
		exhaleTime: 5,
		holdingTime: 1,
	};
	var useHoldingTime = true;
	var repeat = 1;
	var mergeInEx = false;
	var useCC = false;

	this.setTime = function(n, t) {
		time[n] = parseInt(t);
	};

	this.setRepeat = function(r) {
		repeat = r;
	};

	this.setUseHolding = function(b) {
		useHoldingTime = b;
		if (b) {
			this.setMerge(false);
			this.setTime('holdingTime', 1);
		}
		else {
			this.setUseCC(false);
			this.setTime('holdingTime', 0);
		}
	};

	this.setMerge = function(b) {
		mergeInEx = b;
		if (b) {
			this.setUseHolding(false);
			this.setUseCC(false);
			this.setTime('holdingTime', 0);
		}
		else {
			this.setUseHolding(true);
		}
	};

	this.setUseCC = function(b) {
		useCC = b;
		if (b) {
			this.setMerge(false);
			this.setUseHolding(true);
		}
		else {
			this.setMerge(true);
		}
	};

	// 숨참시 자막표시 여부는 숨참시간이 0이면 값은 무효가 됨
	// 들-날 그룹여부가 true면 들-날이 통합되어 들+날은 하나로 간주하게 된다.
	// 들-날 그룹여부가 false면 들-날이 분리되어 두개로 간주한다.
	//
	this.init = function() {
		hideReplay();
		showPlay();
	}

	this.allTime = function() {
		var result = 0;
		var length = 3;

		if (holdingTime) {
			if (mergeInEx) {
				result = (time.inhaleTime + time.exhaleTime) * length * (repeat+1);
			}
			else {

			}
		}
		else {
			if (useCC) {

			}
			else {

			}
		}
		result += (time.inhaleTime + time.exhaleTime);	// result += (start time + end time)
		return result;
	}

	this.setLungsId = function(id) {
		lungsId = id;
	};
	this.getLungsId = function() {
		return lungsId;
	};
	function lungs() {
		return getLId(lungsId);
	}

	this.setSubtId = function(id) {
		subtId = id;
	};
	this.getSubtId = function() {
		return subtId;
	};
	function subtitle() {
		return getLId(subtId);
	}

	this.active = function() {
		if (checkExcFlag()) {
			excFlagDown();
			hidePlay();
			hideReplay();

			// example test
			var activeArr = [
				{
					state: 1,
					time: 5,
					subt: 'START',
				},
				{
					state: 2,
					time: 5,
					subt: 'IN 1',
				},
				{
					state: 3,
					time: 1,
					subt: 'HOLDING 1',
				},
				{
					state: 4,
					time: 5,
					subt: 'EX 1',
				},
				{
					state: 2,
					time: 5,
					subt: 'IN 2',
				},
				{
					state: 3,
					time: 1,
					subt: 'HOLDING 2',
				},
				{
					state: 4,
					time: 5,
					subt: 'EX 2',
				},
				{
					state: 5,
					time: 5,
					subt: 'END',
				}
			];
			// var activeArr = [{state: 1, time: 5, subt: '시작!'}];
			var count = 0;
			var seconds = 0;

			let timer = setInterval(() => {
				if (seconds == 0 && ((activeArr[0].state!=0))) {
					var state = activeArr[count].state;
					console.log(state);
					var time = activeArr[count].time;
					var subt = activeArr[count].subt;
					seconds = time;

					if (state == 1) {
						// START: =exhaleTime
						lungsSmaller(time);
					}
					else if (state == 2) {
						// INHALE: =inhaleTime
						lungsBigger(time);
					}
					else if (state == 3) {
						// HOLDING: =holdingTime
					}
					else if (state == 4) {
						// EXHALE: =exhaleTime
						lungsSmaller(time);
					}
					else if (state == 5) {
						// END: =inhaleTime
						lungsBigger(time);
						setTimeout(() => {
							clearInterval(timer);
							excFlagUp();
							showReplay();
							subtitle().innerHTML = '';
						}, time*1000);
						activeArr = [{state: 0}];
					}

					subtitle().innerHTML = subt;

					count++;
				}
				seconds--;
			}, 1000);
		}
	}

	function hidePlay() {
		var id = lungsId + '-play';
		getLId(id).style.display = 'none';
	}
	function showPlay() {
		var id = lungsId + '-play';
		getLId(id).style.display = 'block';
	}
	function hideReplay() {
		var id = lungsId + '-replay';
		getLId(id).style.display = 'none';
	}
	function showReplay() {
		var id = lungsId + '-replay';
		getLId(id).style.display = 'block';
	}

	function lungsSmaller(t) {
		setTransition(t);
		lungs().style.transform = 'scaleX(0.1) scaleY(0.1)';
	}
	function lungsBigger(t) {
		setTransition(t);
		lungs().style.transform = 'scaleX(1) scaleY(1)';
	}
	function setTransition(t) {
		lungs().style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + t + 's';
	}
	function br(p) {
		return p.replaceAll('/', '<br>');
	}

	// getSubtArr()와 getTimeArr()을 합병한 함수로 쓰는게 좋겠다.
	this.getStateArr = function() {
		var state = 2;	// 현재 상태
		var r = 0;	// 지금까지 반복한 횟수

		var parasArr = [];

		while (r < repeat) {

			for (var i = 0; i < parasArr.length; i++) {

			}





			state = ((state!=4)?state+1:2);
			r++;
		}
	}
}


function CCMaker(parascript, inhaleTime, exhaleTime, holdingTime, repeat, merge, holdCC) {
	var startParas = parascript.getStartParas();
	var endParas = parascript.getEndParas();
	var parasList = parascript.get();

	var parasLength = (merge) ? parasList.length : parasList.length * 2;

	var ccArr = [];

	ccArr.push(startParas);

	for (var i = 0; i < parasList.length; i++) {
		// 홀드 타임 표시 허용 시 inhale, exhale 사이에 자막이 들어간다.
		// 그리고 표시 불허 시 inhale, exhale 사이에 자막이 들어가지 않아 비어있는 문자열이 들어간다.
		// 그러나 홀드 타임 표시 불허에서 merge가 true라면 inhale와 exhale는 하나의 자막으로 표시되므로 다음으로 넘어간다.
		// 그리고 repeat가 나오면 방금까지 한 것을 반복해서 표시해야 한다.
		// 아 코딩하기 귀찮
	}

	ccArr.push(endParas);

	return ccArr;
}


function getTimeArr(paras, subtitleLength, repeat, useHoldingTime, inexGroup, useHoldingSubtitle) {
	var timeElement = {
		time, subtitle
	};
	var timeArr = [];

}

function getSubtitleArr(paras, subtitleLength, repeat, useHoldingTime, inexGroup, useHoldingSubtitle) {
	var arr = [];
	// start Paras, end Paras는 원래 개별적으로 따로 표시됨
	if (useHoldingTime) {
		if (useHoldingSubtitle) {	// 숨참기 시간 사용, 숨참기 자막 표시

		}
		else {	// 숨참기 시간 사용, 숨참기 자막 표시안함

		}
	}
	else {
		if (inexGroup) {	// 숨참기 시간 사용안함, 들이쉬기-내쉬기 자막 일치(병합)

		}
		else {	// 숨참기 시간 사용안함, 들이쉬기-내쉬기 자막 불일치(분리)

		}
	}
}









var service;

function activeService() {
	var inhaleTime = 5;
	var holdTime = 1;
	var exhaleTime = 5;
	var subtitleLength = 10;
	var subtitleCycle = 2;
	var inexGroup = true;
	var subtitleOnHold = true;


}

function clickLungs() {
	var paras = ps.get();
	console.log(brt);
	brt.active();
}

var brt = null;

function init() {
	showIntro();
	addParas();
	tab(2);
	// TEMP
	changeSelectSubtitle();
//	eventOnChangeOn('start-paras');
//	eventOnChangeOn('end-paras');
	brt = new Exercise();
	brt.setSubtId('subt');
	brt.setLungsId('lungs');
	brt.init();
}


function getExerciseTime(inhaleTime, holdTime, exhaleTime, subtitleLength, subtitleCycle, inexGroup, subtitleOnHold) {
	var time = inhaleTime + exhaleTime;


	return time;
}










function backToIntro() {
	// 만약에 운동중이라면 운동을 멈추고 인트로로 화면전환을 실행해야 할 것이다.
	showIntro();
}
