
//'use strict';


// 인트로 화면과 메인 화면 구성
// 인트로 화면으로 전환
function showIntro() {
	displayHideId('main-5mbe');
	displayShowId('intro');
    stopCheckActive();
}

// 메인 화면으로 전환
function showMain() {
	displayHideId('intro');
	displayShowId('main-5mbe');
}

// 디스플레이 활성
function displayShowId(id) {
	getLId(id).style.display = 'block';
}
// 디스플레이 숨김
function displayHideId(id) {
	getLId(id).style.display = 'none';
}







// input들을 관리 - input에 들어가는 아이디를 통해 전체적으로 관리함
var inputIdList = [];
var inputCurrentId = 0;

// input 초기화
function setUpInput() {
    for (var i = 0; i < 5; i++) addInput();
}

// input 추가
function addInput() {
    inputIdList.push('input-'+(++inputCurrentId));
}

// input 삭제
function deleteInput(id) {
    var index = findIdInput(id);
    
}

function findIdInput(id) {
    for (var i = 0; i < inputIdList.length; i++) {
        if (inputIdList[i] === id) return i;
    }
    return -1;
}

// input들의 여러개의 데이터를 읽어옴
function readInputData() {
    var list = [];
    for (var i = 0; i < inputIdList.length; i++) {
        var data = readIdData(inputIdList[i]); 
        list.push(data);
    }
    return list;
}




// input들의 데이터를 저장
function saveInputData() {
    var list = readInputData();
    
    memory.set(list);
}





// 데이터 읽기
function readIdData(id) {
    return getLId(id).value;
}


// 자막에 표시될 인풋 리스트의 인풋들을 읽어와 저장한다.
function readInputList() {
	
}

// 인풋을 추가한다.

// 인풋을 삭제한다.

// 인풋을 편집한다.





// Read and Return TimeSet Values
function readTimerSet() {
    var inhale = readIdData('inhale-time');
	var hold = stopTimeSet();
	var exhale = readIdData('exhale-time');
	var during = readIdData('during-time');
    var timer = {i: inhale, s: hold, e: exhale, d: during};
    return timer;
}
// stophale, stop-time control
function stopTimeSet() {
    return stopChecking() ? readIdData('stop-time') : 0;
}
function stopCheckActive() {
	getLId('stop-option').style.display = ((stopChecking()) ? 'block' : 'none');
}
function stopChecking() {
    return getLId('stophale').checked;
}

// Find Element Id
function getLId(id) {
    return document.getElementById(id);
}





// 숨쉬기 운동 시작
function start5MBE() {
    saveInputData();
    showMain();
}

/*
// lungs를 눌렀을 때 상황이 어떤 상황인가 판단
// 운동중이라면 클릭해도 무응답, 시작 전이라면 클릭할 때 타이머가 실행되고, 끝나면 다시 타이머가 실행된다.

var clickFlag = true;	// 클릭했을 때 실행될 수 있는가?

function clickLungs() {
	if (clickFlag) {
		var time = readTimerSet();
		startTimer(inTime, time.h, exTime, drTimeur);
		getLId('brt-start').style.display = "none";
	}
}

// 재생 버튼을 누른지 1초 또는 2초 후부터 시작하도록 수정해야 한다.
// 그 이유는 화면부터가 100% 상태로 존재하는데, inhale 단계부터 하면 시작을 인지하지 못하게 될 것이다.




// I:Inhale, S:Stop, E:Exhale
function sumISO(i,s,e) {
	return i+s+e;
}

// I:Inhale Time, S:Stop Time, E:Exhale Time, D:During Time
function startTimer(i,s,e,d) {
	var all = sumISO(i,s,e);
	var time = {i: i, s: s, e: e, d: d, a: all};
	
	clickFlag = false;
	timer(time);
}

function timer(time) {
	var count = 0;
	
	var flag = 2;	// 0 is Stop Time, 1 is Inhale Time, -1 is Exhale Time, -2 is Over Time, 2 is starter
	
	var end = drTime % time.a;
	var over = drTime - end;
	
	var dur = { I: 0, S: 0, E:0, over: 0 };
	var max = { I: inTime, S: stTime, E: exTime };
	
	let seconder = setInterval(() => {
		console.warn((++count) + '초');
		
		switch (flag) {
			case -2:
				durEndTime();
				break;
			case -1:
				durExhaleTime();
				break;
			case 0:
				durStopTime();
				break;
			case 1:
				durInhaleTime();
				break;
			case 2:
				starter();
		}
		
		if (dur.I == max.I) flag = ((max.S != 0) ? startStopTime() : startExhaleTime());
		if (dur.E == max.E) flag = ((count == over) ? startEndTime() : startInhaleTime());
		if (max.S != 0 && dur.S == max.S) flag = startExhaleTime();
		if (count == over) flag = startEndTime();
		if (count == drTime) showReplay();
	}, 1000);
	
	setTimeout(() => { clearInterval(seconder); clickFlag = true; }, (drTime + 3)*1000);
	return true;
	
	// starter
	function starter() {
		
		if (count == 1) {
			console.log('Starter');
			toSmall(2);
		}
		if (count == 3) {
			flag = 1;
			startInhaleTime();
		}
	}
	
	// Inhale Time
	function startInhaleTime() {		// 지금 inhale 파트 시작 -> exhale 파트 종료
		console.log("Inhale Time Start");
		dur.E = 0;
		inhaleTime(inTime);
		return 1;
	}
	function durInhaleTime() {
		dur.I++;
		console.log("Inhale Time " + dur.I + "초");
	}
	
	// Stop Time
	function startStopTime() {		// 지금 stop 파트 시작 -> inhale 파트 종료
		console.log("Stop Time Start");
		stopTime(stTime);
		return 0;
	}
	function durStopTime() {
		dur.S++;
		console.log("Stop Time " + dur.S + "초");
	}
	
	// Exhale Time
	function startExhaleTime() {		// 지금 exhale 파트 시작 -> stop 파트 종료
		console.log("Exhale Time Start");
		dur.I = 0;
		dur.S = 0;
		exhaleTime(exTime);
		return -1;
	}
	function durExhaleTime() {
		dur.E++;
		console.log("Exhale Time " + dur.E + "초");
	}
	
	// Over Time
	function startEndTime() {		// 지금 over 파트 시작 -> exhale 파트 종료하고 over 단계 실행
		console.log("Over Time Start");
		endTime(end);
		return -2;
	}
	function durEndTime() {
		dur.over++;
		clearTime();
		console.log("Over Time " + dur.over + "초");
	}
//	function clearTime() {
//		dur.I = 0;
//		dur.S = 0;
//		dur.E = 0;
//	}
	function showReplay() {
		if (count == drTime) getLId('brt-replay').style.display = "block";
	}
}

// 이 함수는 lungs의 크기 제어와 모드상태 및 자막을 제어를 총괄하는 함수다.
function inhaleTime(t) {
	toLarge(t);
	modeStateChanger('들이쉬기');
	ccDisplay('들이쉬기');
}
function stopTime(t) {
	
	modeStateChanger('숨참기');
	ccDisplay('숨참기');
}
function exhaleTime(t) {
	toSmall(t);
	modeStateChanger('내쉬기');
	ccDisplay('내쉬기');
}
function endTime(t) {
	toLarge(t);
	modeStateChanger('마무리');
	ccDisplay('마무리');
}
*/



// 새로 코드를 구성하는게 좋겠다.

// 먼저 클릭이 감지되면 플레이어 아이콘을 숨긴다.
// 클릭이 감지되면 인트로의 지정한 값을 불러온다.
// 스타터 카운터를 먼저 실행한다.
// 스타터 카운터를 exhale 값으로 잡는다.
// 스타터 카운터 동안 렁스가 작아진다.
// 스타터 카운터 동안 자막은 '호흡법에 관심 기울이기'를 띄운다.
// 스타터 카운터가 끝나면 자막이 사라지고 싸이클에 진입한다.
// 싸이클 단계다.
// inhale 차례다.
// inhale 값을 카운트로 잡는다.
// inhale 동안 렁스가 커진다.
// inhale 동안 자막은 '들이쉬기'를 표시한다.
// inhale 단계가 끝나면 스톱 값을 통해 판단한다. 스톱 값이 1 이상이면 스톱 단계를, 0이면 exhale 단계를 실행한다.
// stop 단계는 stop 값을 카운터로 한다.
// stop 단계 동안에는 렁스 크기 변화없이 자막만 '숨참기'를 표시한다.
// stop 단계가 끝나면 exhale 단계로 넘어간다.
// exhale 단계에는 exhale 값을 카운터로 한다.
// exhale 동안 렁스가 작아진다.
// exhale 동안 자막은 '내쉬기'를 표시한다.
// exhale 단계가 끝나면 유효 싸이클 값을 확인한다.
// 유효 값은 전체 시간과 스타터를 포함한 값에 엔딩 값을 뺀 만큼이 유효한 싸이클 값이다.
// 엔딩 값은 설정한 전체시간과 스타터를 포함한 값을 스타터를 제외한 싸이클(in/ex-hale 값과 stop 값의 합)의 값을 뺀다.
// 카운트가 유효 값과 같아지게 되면 카운트를 멈춘다.
// 카운트를 멈추면 엔딩을 실행한다. 엔딩은 자막을 통해 마무리하고 있음을 알리고 엔딩 값만큼 크기 변화없이 실행하고 끝낸다.
// 엔딩이 완전히 끝나면 자막을 숨기고 리플레이 아이콘을 표시한다.

// 타이머의 최소기간을 구함
//function minDuringTime() {
//	var time = readTimerSet();
//	return (time.e * 2 + time.i + time.s);
//}

// 지금 렁스를 클릭해도 유효한가?
var clickFlag = true;

// 렁스의 클릭을 감지
function clickLungs() {
	if (clickFlag) startTimer(readTimerSet());
}

// 
function startTimer(time) {
	hideBtnPlay();
	hideBtnReplay();
	clickFlag = false;
	timer(time);
}

function timer(time) {
	var inTime = Math.floor(time.i);
	var exTime = Math.floor(time.e);
	var stTime = Math.floor(time.s);
	var drTime = Math.floor(time.d);
	var starterTime = exTime;
	var endingTime = inTime;	// 작아져 있는 상태에서 원래 크기로 돌아오는 시간과 마무리 시간은 동일
	var cycleTime = inTime + stTime + exTime;
	var realDuringTime = Math.floor(drTime / cycleTime) * cycleTime + starterTime + endingTime * 2;
	
	var realTimeCount = 0;
	var breakTime = realDuringTime - endingTime * 2;
	
	var starterFlag = true;	// false가 되면 cycleTime에 도달했다는 말이다.
	
	var inhaleFlag = false;
	var stopFlag = false;
	var exhaleFlag = false;
	
	var duringCount = 0;
	
	console.dir('inhale타임:'+inTime+', stop타임:'+stTime+', exhale타임:'+exTime+', during타임:'+drTime+', cycle타임:'+cycleTime+', 반복:'+(Math.floor(drTime / cycleTime))+', starter타임:'+starterTime+', ending타임:'+endingTime+', 실제엔딩타임:'+(endingTime*2)+', 실제풀타임:'+realDuringTime+', 제동타임:'+breakTime);
	
	let seconder = setInterval(() => {
		console.error(++realTimeCount + '초');
		console.warn(++duringCount + '초');
		
		if (starterFlag) {
			console.log('starterFlag');
			
			if (duringCount == 1) {
				console.log('starter start');
				
				toSmall(starterTime);
				modeStateChanger('여호와 하나님이 땅의 흙으로 사람을 지으시고 생기를 그 코에 불어넣으시니 사람이 생령이 되니라 -창2:7');
//				modeStateChanger('호흡법에 관심 기울이기');
			}
			if (duringCount == starterTime) {	// 스타터 타임에 도달하면 스타터 플래그가 해지되고 카운트가 리셋된다.
				console.log('starter end');
				
				starterFlag = false;
				inhaleFlag = true;
				duringCount = 0;
			}
		}
		else {
			if (inhaleFlag) {
				console.log('inhaleFlag');
				
				if (duringCount == 1) {	// 시작했을 때
					console.log('inhale start');
					
					modeStateChanger('들이쉬기');
					toLarge(inTime);
				}
				
				if (duringCount == inTime) {	// inhale 타임 끝에 도달
					console.log('inhale end');
					
					inhaleFlag = false;
					if (stTime != 0) {
						stopFlag = true;
					}
					else {
						exhaleFlag = true;
					}
					duringCount = 0;
				}
			}
			if (stopFlag) {
				console.log('stopFlag');
				
				if (duringCount == 1) {	// 시작했을 때
					console.log('stop start');
					
					modeStateChanger('숨참기');
				}
				
				if (duringCount == stTime) {	// stop 타임 끝에 도달
					console.log('stop end');
					
					stopFlag = false;
					exhaleFlag = true;
					duringCount = 0;
				}
			}
			if (exhaleFlag) {
				console.log('exhaleFlag');
				
				if (duringCount == 1) {	// 시작했을 때
					console.log('exhale start');
					
					modeStateChanger('내쉬기');
					toSmall(exTime);
				}
				
				if (duringCount == exTime) {	// exhale 타임 끝에 도달
					console.log('exhale end');
					
					exhaleFlag = false;
					inhaleFlag = true;
					duringCount = 0;
				}
			}
			if (realTimeCount >= breakTime) {	// 엔딩을 위한 시간이 되면 브레이크 제동을 건다.
				if (realTimeCount == breakTime) {
					inhaleFlag = false;
					stopFlag = false;
					exhaleFlag = false;
					duringCount = 0;
					toLarge(endingTime);
					modeStateChanger('마무리');
				}
				if (realTimeCount == (breakTime + endingTime)) {
					modeStateChanger(' ');
					showBtnReplay();
				}
			}
		}
//		duringCount++;	// 아무 일 없으면 계속 늘려간다.
		
	}, 1000);
	
	setTimeout(() => {
		clearInterval(seconder);
		clickFlag = true;
	}, realDuringTime*1000);
	
	return true;
}









// 
function hideBtnPlay() {
	getLId('brt-start').style.display = "none";
}
function showBtnPlay() {
	getLId('brt-start').style.display = "block";
}
function hideBtnReplay() {
	getLId('brt-replay').style.display = "none";
}
function showBtnReplay() {
	getLId('brt-replay').style.display = "block";
}

// 애니메이션을 적용시켜 몇 초간 변화를 보여주도록 설정할 것인가?
function aniTimeSet(t) {
	getLId('lungs').style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + t + 's';
}

// 안의 원이 작아지도록 한다.
function toSmall(t) {
	aniTimeSet(t);
	getLId('lungs').style.transform = 'scaleX(0.1) scaleY(0.1)';
}

// 안의 원이 커지도록 한다.
function toLarge(t) {
	aniTimeSet(t);
	getLId('lungs').style.transform = 'scaleX(1) scaleY(1)';
}

// 숨쉬기 모드 상태 알림
function modeStateChanger(state) {
	getLId('brt-cc').innerHTML = state;
}



// 저장된 자막들을 불러와 표시하는 모든 함수들의 모음







/*

// 자막 표기
// 자막 input들의 값을 불러옴


// input들의 값을 자막 내용에 저장


// 자막 내용을 불러옴


// 자막 표시에 대한 결정을 계산 - (표시될 자막 갯수, inhale, exhale, stop, step)
// 
// 계산방법은 다음과 같다. 인과 아웃, 그리고 스톱의 합을 싸이클이라 한다.
// 서비스의 이름에 맞게 5분에 맞춰서 싸이클을 반복하고 끝내는 역할을 하도록 한다.
// 스텝은 스톱 기간동안 자막을 표기할 것인지 결정한다. (true or false)
// 마지막에는 스톱이 포함되지 않는다.
function ccDisplayCalcFunc(cNum, inhale, exhale, stop, step) {
	var time = 300;
	stop = (step) ? stop : 0;
    
	var cycleTime = inhale + exhale + stop;
	var cycle = Math.floor(time / cycleTime);
	var end = time - (cycle * cycleTime);
	
	return {cycle: cycle, end: end};
}

function consoleLog(str) { console.log(str); }

function timerSetOut() {
    setTimeout(function() {
        consoleLog('time out');
    }, convertMS(5.5));
    var time = setInterval(function() {
        consoleLog('time continue');
    }, convertMS(5.5));
    // 정지방법은 각각 clearTimeout(), clearInterval()을 붙이면 된다.
}

function convertMS(s) {
    return s * 1000;
}

// 자막을 표시하는 것을 싸이클과 스텝 등에 따라 표시를 바꿈

// 이게 큰 문제가 타이머 함수와 표시가 변경되는 함수와 통합이 안되있음.
function ccDisplayCycle(ccInfo) {
    var num = ccInfo.num, inhale = ccInfo.inhale, exhale = ccInfo.exhale, stop = ccInfo.stop, step = ccInfo.step;
	var val = ccDisplayCalcFunc(num, inhale, exhale, stop, step);
	var timer = 0;
    var index = 0;
	
	consoleLog('싸이클 시작');
	for (var i = 0; i < val.cycle; i++) {
		consoleLog(i+1 + '번째 싸이클');
		
        indexCounter()
		consoleLog(ccInfo.inhale + '초 동안 인을 표시');
		timer+=ccInfo.inhale;
		
		if (ccInfo.step && (ccInfo.stop != 0)) {
            indexCounter()
			consoleLog(ccInfo.stop + '초 동안 스톱을 표시');
			timer+=ccInfo.stop;
		}
		
        indexCounter()
		consoleLog(ccInfo.exhale + '초 동안 아웃을 표시');
		timer+=ccInfo.exhale;
		
		consoleLog('현재까지 '+timer+'초 지남');
	}
	if (val.end != 0) consoleLog(val.end + '초 동안 마무리를 표시');
	
	consoleLog('싸이클 종료');
    return;
    
    // It have Error for count of index
    function indexCounter() {
        if (index == ccInfo.num) index = 0;
        else index++;
        consoleLog('인덱스 번호: ' + index);
    }
}

*/


/*
// TEST
//ccDisplayCycle({num: 3, inhale: 5.5, exhale: 5.5, stop: 0, step: false});
//ccDisplayCycle({num: 5, inhale: 5.5, exhale: 5.5, stop: 1, step: true});
ccDisplayCycle({num: 27, inhale: 5.5, exhale: 5.5, stop: 0, step: false});
*/

// 자막 내용을 표시
function ccDisplay(cc) {
	getLId('brt-cc').innerHTML = cc;
}


// 자막 내용을 숨김

























/*

데이터란 자막으로 표시하게 될 input의 데이터를 불러와 저장한다.
또한 데이터를 저장하고 이를 5분 내에 몇 번 반복을 할 것인지 계산한다.

1. 5분은 300초다.
2. 기본으로 설정된 타임의 값은 (5.5, 0, 5.5)다.
3. 그러므로 5.5초 동안의 한 자막은 5분동안 54번 반복된다.
4. 그리고 자막이 될 데이터의 갯수를 계산한다.
5. 데이터의 갯수가 27개라면 54/27=2이므로 27을 한 그룹으로 2번 반복한다.
5.1 데이터의 갯수가 3개면 54/3=18이므로 3개를 한 그룹으로 18번 반복된다.
5.2 데이터 갯수가 5개면 54/5=10.8이므로 5개를 한 그룹으로 묶어 11번 반복한다. (2.5초 추가됨)
5.3 데이터 갯수가 9개면 6번 반복된다.
5.4 데이터 갯수가 12개면 4.5다. 그러므로 29.7초동안 반복되므로 나머지 3초는 마무리로 아멘이 표시된다.
6. 
7. 
8. 
9. 


*/

var ccMemory = function() {
	var data = [];
	
    this.lenSet = function(len) {
        data = new Array(len);
    }
	this.set = function(arr) {
		if (!Array.isArray(arr)) {
			for (var i = 0; i < arr.length; i++) {
				data.push(arr[i]);
			}
		}
	}
	this.get = function() {
		return data;
	}
    
    this.push = function(str) {
        data.push(str);
    };
    this.shift = function() {
        return data.shift();
    };
    this.unshift = function(str) {
        data.unshift(str);
    }
    
}



// 메모리 생성
var memory = new ccMemory();




/*
Timer class


var brtTimer = function(i, h, e) {
	var inhale=i, hold=h, exhale=e;
	
	this.start = function() {
		
	};
	this.get = function() {
		return {inhale: i, hold: h, exhale: e};
	};
	this.update = function(i,h,e) {
		inhale = i;
		hold = h;
		exhale = e;
	};
}


// ex
var brt = new brtTimer(5.5, 0, 5.5);
brt.start();
brt.get();


*/















