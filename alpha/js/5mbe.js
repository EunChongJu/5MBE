
//'use strict';

function getLId(id) {
	return document.getElementById(id);
}
function hideLId(id) {
	getLId(id).style.display = 'none';
}
function showLId(id) {
	getLId(id).style.display = 'block';
}
function setValLId(id, val) {
	getLId(id).value = val;
}
function getValLId(id) {
	return getLId(id).value;
}
function setCheckedLId(id, bool) {
	getLId(id).checked = bool;
}
function getCheckedLId(id) {
	return getLId(id).checked;
}


var option = {
	title: "기본",
	inhale: 5,	// inhale time
	exhale: 5,	// exhale time
	disableStop: false,	// disableStop
	stopTime: 1,
	timeRepeat: 1,
	paraScript: true,
	paraMode: 0,
	paraRepeat: 1,
	scripts:[
		'들이쉬기',
		'숨참기',
		'내쉬기',
	],
}

function showIntro() {
	hideLId('main');
	showLId('intro');
	closeParaScript();
	setForm(option);
}

function showMain() {
	hideLId('intro');
	showLId('main');
	
}


function clickStopTime() {
	if (getCheckedLId('stophale')) {
		showLId('stop-option');
		getLId('paraStop').disabled = true;
		getLId('paraStop').setAttribute('title', '숨 일시정지 시간을 가져야 합니다.');
	}
	else {
		hideLId('stop-option');
		getLId('paraStop').disabled = false;
		getLId('paraStop').removeAttribute('title');
	}
}
function clickParaScript() {
	if (getCheckedLId('para-use')) showLId('para-option');
	else hideLId('para-option');
}


function setForm(opt) {
	// inhale-time
	setValLId('inhale-time', opt.inhale);
	
	// exhale-time
	setValLId('exhale-time', opt.exhale);
	
	// stophale
	setCheckedLId('stophale', opt.disableStop);
	if (!opt.disableStop) hideLId('stop-option');
	
	// stop-time
	setValLId('stop-time', opt.stopTime);
	
	// repeat
	setValLId('repeat', opt.timeRepeat);
	
	// paraScript
	setCheckedLId('para-use', opt.paraScript);
	if (!opt.paraScript) hideLId('para-option');
}

function getForm() {
	var inhale = getValLId('inhale-time');
	var exhale = getValLId('exhale-time');
	var disableStop = getCheckedLId('stophale');
	var stopTime = (disableStop)?getValLId('stop-time'):0;
	var repeat = getValLId('repeat');
	
	return {
		inhale: inhale,
		exhale: exhale,
		disableStop: disableStop,
		stopTime: stopTime,
		repeat: repeat,
	};
}

// 모든 총합을 초 단위로 반환
function getAllTime() {
	// 이것을 다음과 같이 수정하는 것을 제안한다.
	/*
	// 디저블 스톱 - 정지상태에서 스크립트 표시 유무
	var disableStop = option.disableStop;	// true면 불허임
	var paraRepeat = option.paraRepeat;
	var timeRepeat = option.timeRepeat;
	var stopTime = option.stopTime;	// 0이면 정지타임이 없다!
	var ccNum;
	if (disableStop) {	// 불허 - 2
		var m = parseInt((paras.length * paraRepeat) / 2);
		var n = paras.length % 2;
		ccNum = m * 2 + n;
	}
	else {	// 허용 - 3
		var m = parseInt((paras.length * paraRepeat) / 3);
		var n = paras.length % 3;
		ccNum = m * 3 + n;
	}
	var cc = new Array(ccNum);
	for (var i = 0; i < cc.length; i++) {
		if (paras[i]!==undefined) cc[i] = paras[i];
		else cc[i] = " ";
	}
	cc.unshift("호흡법에 관심 기울이기");
	cc.push("마무리");
	*/
//	return inhale + exhale + repeat * (inhale + stop + exhale);	// 문제 있음.
	if (option.disableStop) {
		var m = parseInt((paras.length * paraRepeat) / 2);
		var n = paras.length % 2;
		
	}
	else {
		var m = parseInt((paras.length * paraRepeat) / 3);
		var n = paras.length % 3;
		
	}
}

function updateAllTime() {
	var inhale = getValLId('inhale-time');
	var exhale = getValLId('exhale-time');
	var stop = getValLId('stop-time');
	var disableStop = getCheckedLId('stophale');
	var repeat = getValLId('repeat');
	
	var time = getAllTime();
	setValLId('all-time', time);
	var timeSeconds = time % 60;
	var timeMinutes = parseInt(time / 60) % 60;
	var timeHours = parseInt(parseInt(time / 60) / 60);
	
	getLId('all-time').innerHTML = (((timeHours!=0)?(timeHours+'시간 '):'')+((timeMinutes!=0)?(timeMinutes+'분 '):'')+((timeSeconds!=0)?(timeSeconds+'초'):''));
}




function selectMode(e) {
	var paraMode = parseInt(e.value);
	option.paraMode = paraMode;
	
	displayLoadOption(paraMode)
	if (paraMode >= 2) {
		var paras = paraOptionArr[paraMode-1];
		changeParaScript(paras);
	}
	else if (paraMode == 0) {
		changeParaScript(paraOptionArr[0]);
	}
//	alert(this.options[this.selectedIndex].text);
}

function displayLoadOption(m) {
	if (m == 1) showLoadOption();
	else hideLoadOption();
}

function changeParaScript(paras) {
	changeOption(paras);
//	changeParaTitle(paras.title);
	insertParas(paras.scripts);
}



function openParaScript() {
	showLId('para-overlay');
}

function closeParaScript() {
	hideLId('para-overlay');
}


////---- paragraph scripter zone ----////



const paraOptionArr = [
	{
		title: "기본",
		inhale: 5,	// inhale time
		exhale: 5,	// exhale time
		disableStop: false,	// disableStop
		stopTime: 1,
		timeRepeat: 1,
		paraScript: true,
		paraMode: 0,
		paraRepeat: 1,
		scripts:[
			'들이쉬기',
			'숨참기',
			'내쉬기',
		],
	},
	{
		title: "393 호흡기도문",
		inhale: 5,
		exhale: 5,
		disableStop: true,	// 정지 기간에는 스크립트가 들어가지 않는다.
		stopTime: 0,
		timeRepeat: 1,
		paraScript: true,
		paraMode: 2,
		paraRepeat: 1,
		scripts: [
			"",
			"주는 그리스도시요 살아계신 하나님의 아들이시니이다",
			"지금 내 안에 하나님의 영으로 충만하게 하옵소서",
			"말씀의 능력이 모든 현장 속에 전달되게 하옵소서",
			"지금 나에게 그리스도의 영으로 충만하게 하옵소서",
			"3 저주를 해결하는 능력이 모든 현장 속에 전달되게 하옵소서",
			"지금 나에게 보혜사 성령으로 충만하게 하옵소서",
			"성령의 능력이 모든 현장 속에 전달되게 하옵소서",
			"보좌의 축복, 시공간 초월, 237의 빛의 능력이 내게 임하게 하옵소서",
			"3 초월의 능력이 모든 현장 속에 전달되게 하옵소서",
			"하나님의 형상, 생령, 에덴의 축복이 내게 임하게 하옵소서",
			"3 생명의 능력이 모든 현장 속에 전달되게 하옵소서",
			"나, 교회, 현장 속에 전무후무한 축복이 임하게 하옵소서",
			"3전무후무한 역사와 응답이 모든 현장 속에 전달되게 하옵소서",
			"전문화, 세계화, 제자화의 응답과 축복이 내게 임하게 하옵소서",
			"3시대의 축복 통해 목회자, 중직자, 부교역자와 렘넌트가 살아나게 하옵소서",
		],
		
	},
//	{
//		title: "",
//		disableStop: false,
//		scripts: ["", "", "",],
//	}
];

var paraIndexArr = [0,1,2];
var paraIndex = 3;

function resetParas() {
	getLId('paras-list').innerHTML = '';
	paraIndexArr = [];
	paraIndex = 0;
	addPara();
	addPara();
	changeParaTitle("파일 선택:");
}

function findParaIndex(n) {
	for (var i = 0; i < paraIndexArr.length; i++) {
		if (paraIndexArr[i] == n) return i;
	}
	return -1;
}

function delPara(id) {
	var index = findParaIndex(id);
	if (findParaIndex(id)!=-1) {
		getLId('paras-id-'+id).remove();
		paraIndexArr.splice(index,1);
	}
}

function addPara() {
	var paras = getParas();
	
	var para = getLId('paras-list').innerHTML;
	
	var newPara = '<p id="paras-id-'+paraIndex+'"><input type="text" class="para-input" id="para-'+paraIndex+'"><button class="para-btn" onclick="delPara('+paraIndex+');">&times;</button></p>';
	
	getLId('paras-list').innerHTML = para + newPara;
	
	paraIndexArr.push(paraIndex++);
	paras.push('');
	
	setParas(paras);
}

function getParas() {
	var paras = [];
	if (paraIndexArr.length!=0) {
		for (var i = 0; i < paraIndexArr.length; i++) {
			paras.push(getLId('para-'+paraIndexArr[i]).value);
		}
	}
	return paras;
}

function setParas(paras) {
	for (var i = 0; i < paraIndexArr.length; i++) {
		getLId('para-'+paraIndexArr[i]).value = paras[i];
	}
}








function showLoadOption() {
	document.getElementById('load-option').style.display = 'flex';
	fileEventOpen();
}
function hideLoadOption() {
	hideLId('load-option');
	fileEventClose();
}

function fileEventOpen() { getLId('para-load').addEventListener('change', loadFile); }

function fileEventClose() { getLId('para-load').removeEventListener('change', loadFile); }

function loadFile() {
	var file = new FileReader();
	file.onload = () => {
		var paras = splitParasFile(file.result);
		loadParaInfo(paras);
	}
	file.readAsText(this.files[0]);
}

function splitParasFile(paras) {
	return paras.split('_');
}

/*
	{
		title: "393 호흡기도문",
		inhale: 5,
		exhale: 5,
		disableStop: true,	// 정지 기간에는 스크립트가 들어가지 않는다.
		stopTime: 0,
		timeRepeat: 1,
		paraScript: true,
		paraMode: 2,
		paraRepeat: 1,
		scripts: [
			"",
*/

function loadParaInfo(paraArr) {
	var fileOption = {
		title: paraArr[0],
		disableStop: paraArr[1],
		inhale: paraArr[2],
		stopTime: paraArr[3],
		exhale: paraArr[4],
		paraScript: paraArr[5],
		paraMode: paraArr[6],
		paraRepeat: paraArr[7],
		scripts: paraArr.slice(8)
	};
	
	changeParaTitle(fileOption.title);
	insertParas(fileOption.scripts);
	
	changeOption(fileOption);
}

function changeParaTitle(title) {
	getLId('para-title').innerHTML = title;
}
function insertParas(paras) {
	getLId('paras-list').innerHTML = '';
	paraIndexArr = [];
	paraIndex = 0;
	for (var i = 0; i < paras.length; i++) {
		addPara();
		getLId('para-'+i).value = paras[i];
	}
}

function changeOption(opt) {
	option = opt;
	setCheckedLId('paraStop', opt.disableStop);
	setCheckedLId('stophale', opt.stopTime==0);
	setValLId('inhale-time', opt.inhale);
	setValLId('exhale-time', opt.exhale);
	setValLId('stop-time', opt.stopTime);
	setValLId('repeat', opt.timeRepeat);
	setValLId('para-use', opt.paraScript);
	setValLId('para-repeat', opt.paraRepeat);
}





// 정지상태서 표시가 허용되면 하나의 반복에 3개가 들어간다.
// 그리고 이를 전체 스크립트 갯수를 3으로 나눈다.
// 정지상태서 표시가 불허되면 반복에는 2개가 된다.
// 그러나 스톱 타임을 가지므로 스톱 칸은 비운다.
// 그래서 전체 스크립트 갯수에서 2를 나눈다.

// 이 함수는 paras를 넣기만 하면 자동으로 자막을 위한 배열을 출력한다.
function ccFactory(paras) {
	var index = 0;
	
	// 디저블 스톱 - 정지상태에서 스크립트 표시 유무
	var disableStop = option.disableStop;	// true면 불허임
	var paraRepeat = option.paraRepeat;
	
	var timeRepeat = option.timeRepeat;
	var stopTime = option.stopTime;	// 0이면 정지타임이 없다!
	
	var ccNum;
	if (disableStop) {	// 불허 - 2
		var m = parseInt((paras.length * paraRepeat) / 2);
		var n = paras.length % 2;
		
		ccNum = m * 2 + n;
	}
	else {	// 허용 - 3
		var m = parseInt((paras.length * paraRepeat) / 3);
		var n = paras.length % 3;
		
		ccNum = m * 3 + n;
	}
	
	var cc = new Array(ccNum);
	for (var i = 0; i < cc.length; i++) {
		if (paras[i]!==undefined) cc[i] = paras[i];
		else cc[i] = " ";
	}
	
	// 비어있는 갯수만큼 cc.push()하기
	
	cc.unshift("호흡법에 관심 기울이기");
	cc.push("마무리");
	return cc;
}





function start5MBE() {
	showMain();
}

function showMain() {
	hideLId('intro');
	showLId('main');
}


/*

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


// 숨쉬기 운동 시작
function start5MBE() {
    saveInputData();
	saveStorage();
    showMain();
}
*/

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
	hideLId('brt-start');
}
function showBtnPlay() {
	showLId('brt-start');
}
function hideBtnReplay() {
	hideLId('brt-replay');
}
function showBtnReplay() {
	showLId('brt-replay');
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






