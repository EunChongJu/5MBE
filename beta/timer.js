
// beach(0)인지 lungs(1)인지 알려줌
var modeNum = 1;

// 이거는 고정된, 변하지 않음
var inTime = 5;
var stopTime = 0;	// 이거 사용 안하면 반드시 0으로 설정해 둬야함.
var outTime = 5;

// stop을 사용하는지 유무(true:사용)
var useStop = false;
// 들숨 날숨 같은 스크립트 사용 여부 (true:같음, false:다름)
var inoutScript = false;

// 이거는 1초마다 증가시켜 아래 변수와 비교하는거임
var sec = 0;

// thisTime--(sec++)--nextTime
// 위처럼 this는 출발점, next는 그 턴이 어디까지인지 확인하여
// sec가 1초씩 증가하여 next에 당도하면 이번 턴이 종료되고 다음 턴으로 넘어간다.
var thisTime = 0;
var nextTime = 0;

// 전체적으로 얼만큼만 할 지 적어둔다. 이게 없으면 무한히 계속할 것이다.
var endTime = 0;

// 턴, 차례상 in(+1)인지 out(+2)인지 stop(0)인지 확인. -1이면 실행 못하게 함.
var nextTurn = 1;

// 현재 시간을 알리는 역할을 함.
var timer;

// 함수를 실행하자마자 시작함
function startTimer() {
	if (nextTurn != -1) {
		// 맨 처음에 썰물처럼 줄여야 한다. 그래야 IN을 구현할 수 있다.
		nextTime = thisTime + outTime;
		outTimeTurn();
		endTime = getEndTime(2);
		hideTitle();
		
		// 1초마다 1씩 증가시킴
		timer = setInterval(function() {
			sec++;
			textTime();
			
			// 시간이 다되면 마무리로 넘어가도록 함
			if (sec == endTime) {
				textModen('END');
				textModek('끝');
				finishTimer();
				nextTurn = -1;
			}
			
			// sec와 매번 비교하여 제때 되면 다음 턴으로 넘어가 계산하도록 함 (다음 턴이 되면 자막을 바꾸거나 애니메이션을 전환하도록 한다)
			if (sec == nextTime) {
				thisTime = nextTime;
				// nextTurn이 뭔지 확인하여 다음(턴,시간)을 구한다.
				if (nextTurn == 1) {
					// inTimeTurn
					inTimeTurn();
					// 이거 다음이 뭔지 판단 필요.
					nextTime = thisTime + inTime;
					nextTurn = ((useStop)?0:2);
				}
				else if (nextTurn == 2) {
					// outTimeTurn
					outTimeTurn();
					// 이거 다음은 무조건 inTimeTurn임.
					nextTime = thisTime + outTime;
					nextTurn = 1;
				}
				else if (nextTurn == 0) {
					// stopTimeTurn
					stopTimeTurn();
					// 이거 다음은 무조건 outTimeTurn임.
					nextTime = thisTime + stopTime;
					nextTurn = 2;
				}
				else {

				}
			}
		}, 1000);
	}
}

//// 아래 -TimeTurn()들은 시작 함수로 애니메이션을 시작하거나 자막을 띄우는 등 한다.
// inTimeTurn
function inTimeTurn() {
	modeIn();
	setTimeTransition(inTime);
//	document.getElementById('gpMovement').style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + inTime + 's';
	if (modeNum == 1) lungsIn();
	else beachIn();
	
}
// outTimeTurn
function outTimeTurn() {
	modeOut();
	setTimeTransition(outTime);
//	document.getElementById('gpMovement').style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + outTime + 's';
	if (modeNum == 1) lungsOut();
	else beachOut();
	
}
// stopTimeTurn
function stopTimeTurn() {
	modeStop();
	setTimeTransition(stopTime);
//	document.getElementById('gpMovement').style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + stopTime + 's';
}
// 타임을 설정하는 함수
function setTimeTransition(time) {
	document.getElementById('gpMovement').style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + time + 's';
}

// lungs 상태에서 커질 때
function lungsIn() {
	document.getElementById('gpMovement').style.transform = 'scaleX(1) scaleY(1)';
}
// lungs 상태에서 작아질 때
function lungsOut() {
	document.getElementById('gpMovement').style.transform = 'scaleX(0.1) scaleY(0.1)';
}

// beach 상태에서 커질 때
function beachIn() {
	document.getElementById('gpMovement').style.transform = 'translate(0%, 25%) scaleX(1) scaleY(1.5)';
}
// beach 상태에서 작아질 때
function beachOut() {
	document.getElementById('gpMovement').style.transform = 'translate(0%, 0%) scaleX(1) scaleY(1)';
}

// 타이머 자체를 일시정지하는 함수 (다시 재생 가능)
function stopTimer() {
	// 일단 nextTime에 도달하면 타이머 자체를 멈추도록 해야한다.
	// 
	// 
}

// 시간 다 됨을 판단하는게 따로 필요하다.

// 시간 다 되면 실행하는 함수
function finishTimer() {
	clearInterval(timer);
	clearTime();
}
// 시간 다 됨 척도를 결정하는 함수, 만약 sec가 이 함수가 구한 값에 도달하면 timer가 전체적으로 종료.
function getEndTime(scriptLength) {
	var result = outTime*2;
	
	if (inoutScript) {
		result += ((inTime + outTime + stopTime) * scriptLength);
	}
	else {
		result += (inTime * (scriptLength/2));
		result += ((outTime+stopTime) * (scriptLength/2));
	}
//	console.log(scriptLength, inoutScript, result);
	return result;
}
// 자막 설정은 IN에서만 바뀌도록 하거나 OUT에서만 바뀌게 하거나 IN과 OUT에서 둘 다 바뀌게 한다.
// 이에 따라 자막 표시기간이 달라지기 때문에 전체 시간이 또한 달라지게 된다.
// 먼저 IN 또는 OUT에서만 표시되게 하는 것은 소요시간이 (in+out(+stop)) * 자막 갯수 만큼 걸린다.
// 그리고 IN과 OUT에서 둘다 표시되게 하는 것은 소요시간이 (in)*(자막 갯수/2) + out(+stop)*(자막 갯수/2) 만큼 걸린다.
// 이 시간은 3줄 이상의 스크립트를 들숨날숨 단위로 잘라내기 힘든 경우에 사용하는 것이다.
// 이것을 통해 아주 긴 줄의 스크립트를 반으로 나눠 들숨에 반줄 읽고, 날숨에 나머지를 읽을 수 있다.
// 우선 들숨과 날숨 다른 스크립트를 기본으로 잡아둔다.

function modeIn() {
//	document.getElementById('moden').innerHTML = 'IN';
//	document.getElementById('modek').innerHTML = '들숨';
	textModen('IN');
	textModek('들숨');
}
function modeOut() {
//	document.getElementById('moden').innerHTML = 'OUT';
//	document.getElementById('modek').innerHTML = '날숨';
	textModen('OUT');
	textModek('날숨');
}
function modeStop() {
//	document.getElementById('moden').innerHTML = 'STOP';
//	document.getElementById('modek').innerHTML = '숨참기';
	textModen('STOP');
	textModek('숨참기');
}

function textModen(p) {
	document.getElementById('moden').innerHTML = p;
}
function textModek(p) {
	document.getElementById('modek').innerHTML = p;
}

function textTitle(p) {
	document.getElementById('title').innerHTML = p;
}
function textSubt(p) {
	document.getElementById('subt').innerHTML = p;
}
function textCont(p) {
	document.getElementById('cont').innerHTML = p;
}

function showTitle() {
	document.getElementById('title').style.display = 'block';
}
function hideTitle() {
	document.getElementById('title').style.display = 'none';
}

function showSubt() {
	document.getElementById('subt').style.display = 'block';
}
function hideSubt() {
	document.getElementById('subt').style.display = 'none';
}

function showCont() {
	document.getElementById('cont').style.display = 'block';
}
function hideCont() {
	document.getElementById('cont').style.display = 'none';
}




function textTime() {
	addSecond();
	document.getElementById('time').innerHTML = getTime();
}

// 타이머, 타이머를 표시하기 위한 변수들
var d = 0;	// 일, 365일마다 1년씩 생성(윤년은 366일)
var h = 0;	// 시간, 24시간마다 1일씩 생성
var m = 0;	// 분, 60분마다 1시간씩 생성
var s = 0;	// 초, 60초마다 1분씩 생성

function getTime() {
	return ((h>0)?(addZero(h)+':'):'')+(addZero(m)+':'+addZero(s));
}
function addZero(n) {
	return (((n/10) < 1) ? ('0'+n):n);
}

function addSecond() {
	s++;
	if (s >= 60) {
		s = s-60;
		addMinute();
	}
}
function addMinute() {
	m++;
	if (m >= 60) {
		m = m-60;
		addHour();
	}
}
function addHour() {
	h++;
	if (h >= 24) {
		h = h-24;
		addDay();
	}
}
function addDay() {
	d++;
}

function clearTime() {
	d = 0;
	h = 0;
	m = 0;
	s = 0;
}


