


// 이 클래스는 운동할 때만 실행
// 들숨시간(=endTime), 숨참시간, 날숨시간(=startTime), 자막의 갯수, 자막의 반복횟수, 들-날 그룹여부, 숨참시 자막표시 여부,
var Exercise = function() {
	this.paras = null;
	this.setParas = function(paras) { this.paras = paras; };

	var excFlag = true;
	function excFlagUp() { excFlag = true; }
	function excFlagDown() { excFlag = false; }
	function checkExcFlag() { return excFlag; }

	this.test = function() {
		return {
			time: time,
			useHolding: useHoldingTime,
			repeat: repeat,
			mergeInEx: mergeInEx,
			useCC: useCC,
			paras: this.paras,
		};
	};

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
	};

	this.setUseCC = function(b) {
		useCC = b;
		if (b) {
			this.setMerge(false);
			this.setUseHolding(true);
		}
	};


	// getSubtArr()와 getTimeArr()을 합병한 함수로 쓰는게 좋겠다.
	this.getStateArr = function() {
		var resultArr = [];
		var state = 2;	// 현재 상태
		var r = 0;	// 지금까지 반복한 횟수

		var parasArr = this.paras;

		var cycle = 1;
		var count = 1;
		var pi = 0;	// paras index

		var passFlag = false;	// 꼬리 전용
		var mergeFlag = false;	// 병합 독단 전용
		var ccFlag = false;	// 자막 안쓰는 홀딩 전용

		resultArr.push({
			state: 1,
			time: time.exhaleTime,
			subt: this.paras.start,
		});

		// 작업 전 미리 할 일
		var countMax = 0;
		var len = this.paras.list.length;

		if (useHoldingTime) {	// 홀딩이 들어감
			if (useCC) {	// 1:1, 숨참기에 자막 포함
				var ratio = len * repeat;
				// 만약 파라스의 길이를 반복한 전체 갯수가 3으로 나누어 떨어지지 않으면
				if (ratio % 3 != 0) {
					// 3으로 나눈 나머지가 위치하는 끝부분을 채운다.
					var tail = 3 - (ratio % 3);
					ratio += tail;
				}
				countMax = ratio;
			}
			else {	// 3:2, 숨참기 있는데 자막 비포함. 그만큼 뒤로 밀려남
				var ratio = Math.ceil(len * repeat * 1.5);
				countMax = ratio;
			}
		}
		else {	// 홀딩이 들어가지 않음
			if (mergeInEx) {	// In, Ex에 하나의 파라스가 차지한다. 그만큼 밀려난다.
				countMax = Math.ceil(len * repeat * 2);
			}
			else {	// 홀딩이 들어가지 않고 병합되지도 않으니 1:1 대응한다.
				var ratio = len * repeat;
				if (ratio % 2 != 0) {	// 2로 나누어 떨어지지 않으면
					// 꼬리 부분을 채운다.
					ratio += 1;
				}
				countMax = ratio;
			}
		}

		// 작업
		while (count <= countMax) {
			// 원소 중간에 passFlag가 발동되면
			// 나머지는 시간과 스테이트 값 저장은 그대로이나
			// 자막은 절대로 저장되지 않는다.

			if (state == 2) {
				// 원소 추가에 필요한 정보
				var t = time.inhaleTime;
				var p = this.paras.list[pi].paras;

				resultArr.push({
					state: state,
					time: t,
					subt: p,
				});

				// 홀딩 여부에 따라 다음이 홀딩일수도 아닐수도 있다.
				state = (useHoldingTime) ? 3 : 4;
			}
			else if (state == 3) {
				// 원소 추가에 필요한 정보
				var t = time.holdingTime;
				var p = (passFlag) ? '' : this.paras.list[pi].paras;

				resultArr.push({
					state: state,
					time: t,
					subt: p,
				});

				// 이건 무조건 날숨 간다.
				state = 4;
			}
			else if (state == 4) {
				// 원소 추가에 필요한 정보
				var t = time.exhaleTime;
				var p = (passFlag && !useCC) ? '' : this.paras.list[pi].paras;

				resultArr.push({
					state: state,
					time: t,
					subt: p,
				});

				// 이것은 들숨 갈수도 있으나 아닐수도 있음
				state = 2;
			}

			if (mergeInEx) {
				// 병합파라원소에서는 첫번째칸과 두번째칸으로 나뉜다.
				// 여기서 mergeFlag = false면 첫번째 원소임을 나타낸다.
				// = true면 두번째 원소임을 나타낸다.
				if (mergeFlag) pi++;
				mergeFlag = !mergeFlag;
			}
			// pi++;
			// 홀딩을 사용하면서 useCC = false이면
			// 자막이 출력되지 않았으므로 pi 값이 증가하지 않는다.
			if (useHoldingTime) {
				if (useCC) {	// 홀딩 있고 자막까지 쓰면?
					if (state == 4) {
						// 증가하지 않음
					}
					else {
						pi++
					}
				}
				else {	// 홀딩 있는데 자막 안쓰면 그만큼 뒤로 밀려난다.

				}
			}
			// 홀딩을 사용하지 않았으며 병합도 아니면
			// In과 Ex만 번갈아가므로 상관없음
			// 이건 홀딩 사용, 자막표시도 마찬가지임

			// 파라원소 주기 체크 겸 싸이클 체크
			if (pi == this.paras.list.length) {
				cycle++;
				pi = 0;
			}

			// 다음 배열 원소의 인덱스 번호 증가
			count++;
		}

		resultArr.push({
			state: 5,
			time: time.inhaleTime,
			subt: this.paras.end,
		});

		return resultArr;
	}

	this.testArr = function() {
		var arr = this.getStateArr();
		for (var i = 0; i < arr.length; i++) {
			console.log(arr[i].state, arr[i].time);
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
		var arr = this.getStateArr();
		for (var i = 0; i < arr.length; i++) {
			result += arr[i].time;
		}
		return result;
	};

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

			var activeArr = this.getStateArr();

			// example test
			// var activeArr = [{state: 1,time: 5,subt: 'START',},{state: 2,time: 5,subt: 'IN 1',},{state: 3,time: 1,subt: 'HOLDING 1',},{state: 4,time: 5,subt: 'EX 1',},{state: 2,time: 5,subt: 'IN 2',},{state: 3,time: 1,subt: 'HOLDING 2',},{state: 4,time: 5,subt: 'EX 2',},{state: 5,time: 5,subt: 'END',}];
			// var activeArr = [{state: 1, time: 5, subt: '시작!'}];

			var count = 0;
			var seconds = 0;

			let timer = setInterval(() => {
				if (seconds == 0 && ((activeArr[0].state!=0))) {
					var state = activeArr[count].state;
					console.log(state);
					console.log(activeArr[count]);
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
	tab(0);
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
