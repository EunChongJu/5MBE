
//'use strict';

const paraOptionArr = [
	{
		title: "기본",
		inhale: 5,	// inhale time
		exhale: 5,	// exhale time
		disableStop: false,	// disableStop
		stopTime: 0,
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


// OPTION ZONE //

// 현재 옵션 상태
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
};

// 옵션의 데이터를 변환
function changeDataNum(id, data) {
	option[id] = parseInt(data);
}
// 옵션의 체크를 변환
function changeDataChecked(id, data) {
	option[id] = data;
}


// INTRO SETTING ZONE //

// show Intro
function showIntro() {
	hideLId('main');
	showLId('intro');
	closeParaScript();
	setForm(option);
	
	updateAllTime();
}

// Intro의 Form을 초기화
function setForm(opt) {
	setValLId('inhale-time', opt.inhale);
	setValLId('exhale-time', opt.exhale);
	setCheckedLId('stophale', !opt.disableStop);
	if (opt.disableStop) hideLId('stop-option');
	setValLId('stop-time', opt.stopTime);
	setValLId('repeat', opt.timeRepeat);
	setCheckedLId('para-use', opt.paraScript);
	if (!opt.paraScript) hideLId('para-option');
}

// data 설정 모음
function setInhaleTime(val) { setValLId('inhale-time', val); }
function setExhaleTime(val) { setValLId('exhale-time', val); }
function setStopTime(val) {}



// 숨 일시정지 허용을 누름으로써 stophale 시간 설정 표시 또는 숨김
function clickStopTime() {
	if (getCheckedLId('stophale')) {
		showLId('stop-option');
		getLId('paraStop').checked = option.disableStop;
		getLId('paraStop').disabled = false;
		getLId('paraStop').setAttribute('title', '숨 일시정지 시간을 가져야 합니다.');
		option.stopTime = 1;
	}
	else {
		hideLId('stop-option');
		getLId('paraStop').checked = false;
		getLId('paraStop').disabled = true;
		getLId('paraStop').removeAttribute('title');
		option.stopTime = 0;
	}
	updateAllTime();
}

// 사용자 지정문단 사용 체크함으로써 파라스크립터 버튼 표시 또는 숨김
function clickParaScript() {
	option.paraScript = !option.paraScript;
	if (getCheckedLId('para-use')) showLId('para-option');
	else {
		hideLId('para-option');
		changeParaScript(paraOptionArr[0]);
	}
}


// 정지타임에 파라스크립트 자막 표시 여부
function changeDisableStop(check) {
	changeDataChecked('disableStop', !check);
	setTimeRepeat(getTimeRepeat(!check, option.paraRepeat));
	updateAllTime();
}

// 파라스크립트 자막 순환반복 횟수 설정
function changeParaRepeat(num) {
	changeDataNum('paraRepeat', num);
	setTimeRepeat(getTimeRepeat(option.disableStop, num));
	updateAllTime();
}

// 파라스크립트 반복그룹의 배수 = 타임반복
function changeTimeRepeat(num) {
	changeDataNum('timeRepeat', num);
	updateAllTime();
}

// 들이쉬는 타임
function changeInhaleTime(num) {
	changeDataNum('inhale', num);
	updateAllTime();
}

// 내쉬는 타임
function changeExhaleTime(num) {
	changeDataNum('exhale', num);
	updateAllTime();
}

// 스톱타임
function changeStopTime(num) {
	changeDataNum('stopTime', num);
	updateAllTime();
}




// INTRO SCRIPTER ZONE //

// 현재 파라스크립터에 저장된 인풋의 인덱스 배열
var paraIndexArr = [0,1,2];
// 현재 추가될 파라스크립터 인풋 인덱스 번호
var paraIndex = 3;

// 파라스크립터 열기
function openParaScript() {
	showLId('para-overlay');
}

// 파라스크립터 닫기
function closeParaScript() {
	hideLId('para-overlay');
	updateAllTime();
}

// 파라스크립터 모드 선택 <select>
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

// 파라스크립터 모드에 따라 파일 업로더 표시 또는 숨김
function displayLoadOption(m) {
	if (m == 1) showLoadOption();
	else hideLoadOption();
}

// 파라스크립터 내 스크립트 및 설정 변환
function changeParaScript(paras) {
	changeOption(paras);
//	changeParaTitle(paras.title);
	insertParas(paras.scripts);
}

// 현재 파라 인풋에 저장된 데이터를 배열로 반환
function getParas() {
	var paras = [];
	console.log(paraIndexArr);
	if (paraIndexArr.length!=0) {
		for (var i = 0; i < paraIndexArr.length; i++) {
			paras.push(getValLId('para-'+paraIndexArr[i]));
		}
	}
	return paras;
}

// 파라 인풋에 데이터를 저장
function setParas(paras) {
	for (var i = 0; i < paraIndexArr.length; i++) {
		getLId('para-'+paraIndexArr[i]).value = paras[i];
	}
}

// 파라스크립터 인풋 초기화
function resetParas() {
	getLId('paras-list').innerHTML = '';
	paraIndexArr = [];
	paraIndex = 0;
	changeParaScript(paraOptionArr[0]);
	if (option.paraMode > 1) getLId('scriptMode').options[0].selected = true;
	changeParaTitle("파일 선택:");
	
	updateAllTime();
}

// 파라스크립터 내 인풋 인덱스 찾기
function findParaIndex(n) {
	for (var i = 0; i < paraIndexArr.length; i++) {
		if (paraIndexArr[i] == n) return i;
	}
	return -1;
}

// 파라스크립터 인풋 추가
function addPara() {
	var paras = getParas();
	
	var para = getLId('paras-list').innerHTML;
	
	var newPara = '<p id="paras-id-'+paraIndex+'"><input type="text" class="para-input" id="para-'+paraIndex+'"><button class="para-btn" onclick="delPara('+paraIndex+');">&times;</button></p>';
	
	getLId('paras-list').innerHTML = para + newPara;
	
	paraIndexArr.push(paraIndex++);
	paras.push('');
	
	setParas(paras);
	updateAllTime();
}

// 파라스크립터 인풋 삭제
function delPara(id) {
	var index = findParaIndex(id);
	if (findParaIndex(id)!=-1) {
		getLId('paras-id-'+id).remove();
		paraIndexArr.splice(index,1);
	}
	updateAllTime();
}

// 파라스크립터 파일 업로더 표시
function showLoadOption() {
	document.getElementById('load-option').style.display = 'flex';
	fileEventOpen();
}
// 파라스크립터 파일 업로더 숨김
function hideLoadOption() {
	hideLId('load-option');
	fileEventClose();
}

// 파일 업로더 이벤트 실행
function fileEventOpen() { getLId('para-load').addEventListener('change', loadFile); }
// 파일 업로더 이벤트 종료
function fileEventClose() { getLId('para-load').removeEventListener('change', loadFile); }

// 파일 업로더에 파일을 불러오는 함수
function loadFile() {
	var file = new FileReader();
	file.onload = () => {
		var paras = splitParasFile(file.result);
		loadParaInfo(paras);
	}
	file.readAsText(this.files[0]);
}

// 불러온 파일 구문의 구문자 제거 및 새로운 배열 반환
function splitParasFile(paras) { return paras.split('_'); }

// 불러온 파라 파일의 구문 배열을 통해 옵션의 값에 적용
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

// 불러온 파라 파일의 옵션을 Form에 리셋
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
	
	updateAllTime();
}

// 파라스크립터에 파라구문 제목을 변환
function changeParaTitle(title) { getLId('para-title').innerHTML = title; }

// 파라스크립터에 파라 배열의 구문 내용을 인풋에 생성 및 삽입
function insertParas(paras) {
	getLId('paras-list').innerHTML = '';
	paraIndexArr = [];
	paraIndex = 0;
	for (var i = 0; i < paras.length; i++) {
		addPara();
		getLId('para-'+i).value = paras[i];
	}
}

// 파라스크립트 정지타임에도 자막 표시여부와 파라 자막 순환반복 횟수에 따라 타임 순환반복 횟수를 변동 (ds: disableStop, pr: paraRepeat)
function getTimeRepeat(ds, pr) {
	// 스크립트 갯수
	var scriptsLength = option.scripts.length;
	// 스크립트를 반복했을 때 표시될 자막 갯수
	var paraScriptAllLength = scriptsLength * pr;
	// disableStop 여부에 따라 그룹(들이쉬기-숨참기-내쉬기 또는 들이쉬기-내쉬기) 횟수를 결정
	var repeatGroupNum = ((ds)?2:3);
	
	// 몫
	var m = parseInt(paraScriptAllLength / repeatGroupNum);
	// 나머지
	var n = paraScriptAllLength % repeatGroupNum;
	
	console.log(scriptsLength, paraScriptAllLength, repeatGroupNum, m, n, m * repeatGroupNum + n);
	
	updateAllTime();
//	return m * repeatGroupNum + n;
	return (n == 0) ? m : m + 1;
}

// 값을 받아 timeRepeat 값과 최소, 스텝 값 재설정
function setTimeRepeat(tr) {
	var ptr = getValLId('repeat');
	getLId('repeat').setAttribute('step', parseInt(tr));
	getLId('repeat').setAttribute('min', parseInt(tr));
	
	var down = parseInt(ptr / tr) * tr;
	var up = down + 1;
	
	var val = ((tr / 2) < (ptr % tr)) ? up : down;
	
	setValLId('repeat', val);
	option.timeRepeat = parseInt(val);
}






// 어떤 것을 변동할 때마다 전체 예상 시간 업데이트
function updateAllTime() {
	var time = getAllTime();
//	setValLId('all-time', time);
	
	var timeSeconds = time % 60;
	var timeMinutes = parseInt(time / 60) % 60;
	var timeHours = parseInt(parseInt(time / 60) / 60);
	
	getLId('all-time').innerHTML = (((timeHours!=0)?(timeHours+'시간 '):'')+((timeMinutes!=0)?(timeMinutes+'분 '):'')+((timeSeconds!=0)?(timeSeconds+'초'):''));
}

// All Time 값 구함
function getAllTime() {
	var timeArr = getTimeArr();
	var time = 0;
	for (var i = 0; i < timeArr.length; i++) time += timeArr[i];
	return time;
}

// Time Array 반환
function getTimeArr() {
	var ds = option.disableStop;	// disableStop
	var pr = option.paraRepeat;	// paraRepeat
	var scriptsLength = option.scripts.length;	// 스크립트 갯수
	var timeRepeat = option.timeRepeat;	// 반복횟수
	var paraScriptAllLength = scriptsLength * pr * (timeRepeat / pr);	// 스크립트를 반복했을 때 표시될 자막 갯수
	var dsNum = ((ds)?2:3);	// disableStop 여부에 따라 그룹(들이쉬기-숨참기-내쉬기 또는 들이쉬기-내쉬기) 횟수를 결정
	
	var m = parseInt(paraScriptAllLength / dsNum);	// 몫
	var n = paraScriptAllLength % dsNum;	// 나머지
	
	var arrLength = ((n==0)?m:m+1) * dsNum;
	var index = 1;
	
	var inhale = option.inhale;
	var exhale = option.exhale;
	var stop = option.stopTime;
	
	var arr = new Array(arrLength);
	
	for (var i = 0; i < arr.length; i++) {
		if (index == 1) {
			arr[i] = inhale;
			index = (stop!=0)?2:3;
		}
		else if (index == 2) {
			arr[i] = stop;
			index++;
		}
		else if (index == 3) {
			arr[i] = exhale;
			index = 1;
		}
	}
	arr.unshift(exhale);
	arr.push(inhale);
	
	return arr;
}

// StepArray 반환
function getStepArr() {
	var ds = option.disableStop;	// disableStop
	var pr = option.paraRepeat;	// paraRepeat
	var scriptsLength = option.scripts.length;	// 스크립트 갯수
	var timeRepeat = option.timeRepeat;	// 반복횟수
	var paraScriptAllLength = scriptsLength * pr * (timeRepeat / pr);	// 스크립트를 반복했을 때 표시될 자막 갯수
	var dsNum = ((ds)?2:3);	// disableStop 여부에 따라 그룹(들이쉬기-숨참기-내쉬기 또는 들이쉬기-내쉬기) 횟수를 결정
	
	var m = parseInt(paraScriptAllLength / dsNum);	// 몫
	var n = paraScriptAllLength % dsNum;	// 나머지
	
	var arrLength = ((n==0)?m:m+1) * dsNum;
	var index = 1;
	var stop = option.stopTime;
	
	var arr = new Array(arrLength);
	
	for (var i = 0; i < arr.length; i++) {
		if (index == 1) {
			arr[i] = 2;
			index = (stop!=0)?2:3;
		}
		else if (index == 2) {
			arr[i] = 3;
			index++;
		}
		else if (index == 3) {
			arr[i] = 4;
			index = 1;
		}
	}
	arr.unshift(1);
	arr.push(5);
	
	return arr;
}




// 자막 표시를 위한 스크립트 배열을 생성하고 반환
function getCCArr(paras) {
	var ds = option.disableStop;
	var timeRepeat = option.timeRepeat;
	var paraRepeat = option.paraRepeat;
	var scriptsLength = option.scripts.length;
	
	var stop = option.stopTime != 0;	// true면 stop을 사용한다는 소리다. false는 stop을 사용하지 않음.
	
	var paraScriptAllLength = (parseInt(scriptsLength / ((stop)?3:2)) + 1) * ((stop)?3:2);
	var arr = new Array(paraScriptAllLength);
	var arrIndex = 1;
	var paraIndex = 0;
	
	// 고려사항은 ds가 true이고 stopTime을 사용한다면 배열에 stop이 들어가되 자막이 표시되지 않아야 한다.
	// ds가 참/거짓여부에 상관없이 stopTime을 사용하지 않는다면 배열에 stop이 들어가지 않는다.
	for (var i = 0; i < arr.length; i++) {
		if (arrIndex == 1) {	// inhale
			arr[i] = option.scripts[paraIndex++];
			arrIndex = (stop)?2:3;
		}
		else if (arrIndex == 2) {	// stop
//			if (ds) arr[i] = '';
//			else arr[i] = option.scripts[paraIndex++];
			arr[i] = ((ds)?'':option.scripts[paraIndex++]);
			arrIndex++;
		}
		else if (arrIndex == 3) {	// exhale
			arr[i] = option.scripts[paraIndex++];
			arrIndex = 1;
		}
	}
	
	return arr;
}



// MAIN ZONE //

// Intro에 있는 스타트 버튼을 클릭함으로써 호출
function start5MBE() {
	showMain();
}

// show Main
function showMain() {
	hideLId('intro');
	showLId('main');
	
}


// Main의 Lungs 함수 //

// 애니메이션 시간을 적용시키는 함수
function aniTimeSet(t) {
	getLId('lungs').style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + t + 's';
}

// 변화시간을 받아 그 시간 내 Lungs의 원이 작아지도록 하는 함수
function toSmall(t) {
	aniTimeSet(t);
	getLId('lungs').style.transform = 'scaleX(0.1) scaleY(0.1)';
}
// 변화시간을 받아 그 시간 내 Lungs의 원이 커지도록 하는 함수
function toLarge(t) {
	aniTimeSet(t);
	getLId('lungs').style.transform = 'scaleX(1) scaleY(1)';
}

// 자막을 변환
function changeCC(state) {
	getLId('brt-cc').innerHTML = state;
}













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



// 지금 렁스를 클릭해도 유효한가?
var clickFlag = true;

// 렁스의 클릭을 감지
function clickLungs() { if (clickFlag) activeLungs(); }

// 렁스 움직이기 시작
function activeLungs() {
	clickFlag = false;
	hideBtnPlay();
	hideBtnReplay();
	
	var inhaleTime = option.inhale;
	var exhaleTime = option.exhale;
	var disableStop = option.disableStop;
	var stopTime = (disableStop?0:option.stopTime);
	var timeRepeat = option.timeRepeat;
	var paraRepeat = option.paraRepeat;
	
	
	var parasTimeArr = getTimeArr();
	var stepArr = getStepArr();
	
	var timeIndex = 0;
	var remainingTime = 0;
	var timeState = 0;
	
	var ccIndex = 0;
	var ccArr = getCCArr();		// 이 배열은 이미 paraRepeat와 disableStop, timeRepeat가 선반영되어있으므로 반복할 필요 없다.
	
	
	let timer = setInterval(() => {
		if (remainingTime == 0) {
			timeState = stepArr[timeIndex];
			remainingTime = parasTimeArr[timeIndex];
			
			// 여기에 자막을 표시 또는 전환한다.
			// 여기에 초기 상태라면 렁스 변화를 주도록 한다.
			if (timeState == 1) {
				// START = exhale
				toSmall(remainingTime);
				changeCC('호흡법에 관심 기울이기');
			}
			else if (timeState == 2) {
				// INHALE
				toLarge(remainingTime);
//				changeCC('들이쉬기');
				changeCC(ccArr[ccIndex++]);
			}
			else if (timeState == 3) {
				// STOP TIME
//				changeCC('숨참기');
				changeCC(ccArr[ccIndex++]);
			}
			else if (timeState == 4) {
				// EXHALE
				toSmall(remainingTime);
//				changeCC('내쉬기');
				changeCC(ccArr[ccIndex++]);
			}
			else if (timeState == 5) {
				// END = inhale
				toLarge(remainingTime);
				changeCC('마무리');
				setTimeout(()=>{
					clearInterval(timer);
					changeCC('');
					showBtnReplay();
				}, remainingTime*1000);
			}
			
			timeIndex++;
		}
		remainingTime--;
	}, 1000);
}


// 렁스 안의 플레이 버튼 숨김
function hideBtnPlay() {
	hideLId('brt-start');
}
// 렁스 안의 플레이 버튼 표시
function showBtnPlay() {
	showLId('brt-start');
}
// 렁스 안의 리플레이 버튼 숨김
function hideBtnReplay() {
	hideLId('brt-replay');
}
// 렁스 안의 리플레이 버튼 표시
function showBtnReplay() {
	showLId('brt-replay');
}


// Web Storage //
function setData(key, val) {
	
}
function getData(key) {
	
}
function isData(key) {
	
}
function removeData(key) {
	
}

function setDataParas(paras) {
	
}
function getDataParas() {
	
}
function isDataParas() {
	
}
function removeDataParas() {
	
}










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



