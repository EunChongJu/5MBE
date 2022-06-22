


// I:Inhale, S:Stop, E:Exhale
function sumISO(i,s,e) {
	return i+s+e;
}

/*
function sayHi() {
	alert('Hi');
}
setTimeout(sayHi, 1000);
이것은 1초 뒤 Hi라는 소리를 듣게 됩니다.
------------------------------------
function sayHi(who, phrase) {
	alert(who+'님, '+phrase);
}
setTimeout(sayHi, 1000, "홍길동", "안녕하세요.");
이것은 1초 뒤 홍길동씨, 안녕하세요.라는 소리를 듣게 된다.
-------------------------------
이렇게 써도 된다.
setTimeout(() => alert('Hi'), 1000);
----------------------------------------
let timerId = setTimeout(() => alert("아무런 일도 일어나지 않습니다."), 1000);
alert(timerId);	// 타이머 식별자

clearTimeout(timerId);
alert(timerId);	// 위 타이머 식별자와 동일함 (취소 후에도 식별자의 값은 null이 되지 않습니다.)
-----------------------------------
// 2초 간격으로 메시지를 보여줌
let timerId = setInterval(() => alert('째깍'), 2000);

// 5초 후에 정지
setTimeout(() => { clearInterval(timerId); alert('정지'); }, 5000);
------------------------------------

*/

// I:Inhale Time, S:Stop Time, E:Exhale Time, D:During Time
function start(i,s,e,d) {
	var all = sumISO(i,s,e);
	var time = {i: i, s: s, e: e, d: d, a: all};
//	A(time);
	timer(time);
}

/*
function A(time) {
	let during = setInterval(B, time.a, time);
	setTimeout(() => {
		clearInterval(during);
		console.log('Time Over');
	}, time.d);
}
function B(time) {
//	setTimeout(inhaleTime, time.i);
//	if (time.s != 0) setTimeout(stopTime, time.s);
//	setTimeout(exhaleTime, time.e);
	console.log('B Time End');
}
function inhaleTime() {
	console.log('Inhale Time End');
}
function stopTime() {
	console.log('Stop Time End');
}
function exhaleTime() {
	console.log('Exhale Time End');
}
*/

/*
----------------------------------A-------------------------------------
-------------------------setInterval(B,d(i+s+o))------------------------
-----------B------------/-----------B----------/-----------B------------
--setTimeout(inhale,i)--/--setTimeout(stop,s)--/--setTimeout(exhale,o)--
*/


function timer(time) {
	var count = 0;
	
	var flag = 1;	// 0 is Stop Time, 1 is Inhale Time, -1 is Exhale Time, -2 is Over Time
	
	var end = time.d % time.a;
	var over = time.d - end;
	
	var dur = { I: 0, S: 0, E:0, over: 0 };
	var max = { I: time.i, S: time.s, E: time.e };
	
	
	
	let seconder = setInterval(() => {
		console.warn((++count) + '초');
		
		switch (flag) {
			case -2:
				durOverTime();
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
		}
		
		if (dur.I == max.I) {
			flag = ((max.S != 0) ? startStopTime() : startExhaleTime());
		}
		if (dur.E == max.E) {
			flag = ((count == over) ? startOverTime() : startInhaleTime());
		}
		if (max.S != 0 && dur.S == max.S) {
			flag = startExhaleTime();
		}
		
	}, 1000);
	
	setTimeout(() => { clearInterval(seconder); }, time.d*1000);
	return true;
	
	// Inhale Time
	function startInhaleTime() {		// 지금 inhale 파트 시작 -> exhale 파트 종료
		console.log("Inhale Time Start");
		dur.E = 0;
		return 1;
	}
	function durInhaleTime() {
		dur.I++;
		console.log("Inhale Time " + dur.I + "초");
	}
	
	// Stop Time
	function startStopTime() {		// 지금 stop 파트 시작 -> inhale 파트 종료
		console.log("Stop Time Start");
		dur.I = 0;
		return 0;
	}
	function durStopTime() {
		dur.S++;
		console.log("Stop Time " + dur.S + "초");
	}
	
	// Exhale Time
	function startExhaleTime() {		// 지금 exhale 파트 시작 -> stop 파트 종료
		console.log("Exhale Time Start");
		dur.S = 0;
		return -1;
	}
	function durExhaleTime() {
		dur.E++;
		console.log("Exhale Time " + dur.E + "초");
	}
	
	// Over Time
	function startOverTime() {		// 지금 over 파트 시작 -> exhale 파트 종료하고 over 단계 실행
		console.log("Over Time Start");
		dur.I = 0;
		dur.S = 0;
		dur.E = 0;
		return -2;
	}
	function durOverTime() {
		dur.over++;
		console.log("Over Time " + dur.over + "초");
	}
}
/*
I:5, S:1, E:5, A:11 
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 -----
I I I I I S E E E E  E  I  I  I  I  I  S  E  E  E  E  E  -----
----------A1-----------/-------------A2-----------------/-----
*/

function inhaleTime() {
	
}
function stopTime() {
	
}
function exhaleTime() {
	
}











