
function getLId(id) {
	return document.getElementById(id);
}
function showLId(id) {
	getLId(id).style.display = 'block';
}
function hideLId(id) {
	getLId(id).style.display = 'none';
}

function getValLId(id) {
	return getLId(id).innerHTML;
}
function setValLId(id, val) {
	getLId(id).innerHTML = val;
}

function getCheckboxLId(id) {
	return getLId(id).checked;
}
function setCheckboxLId(id, bool) {
	getLId(id).checked = bool;
}

function getDisabledLId(id) {
	return getLId(id).disabled;
}
function setDisabledLId(id, bool) {
	getLId(id).disabled = bool;
}

function setBGColorLId(id, color) {
	getLId(id).style.backgroundColor = color;
}
function unsetBGColorLId(id) {
	getLId(id).style.backgroundColor = '';
}

function setFontColorLId(id, color) {
	getLId(id).style.color = color;
}








// BEP
var service;


function setUp() {
	service = new BEP();
	service.init();
	openForm(1);
}




function allHideForm() {
	hideLId('timer');
	hideLId('scripter');
	hideLId('option');
	unselectedLinks();
}
function openForm(n) {
	allHideForm();
	switch(n) {
		case 1:
			showLId('timer');
			selectedLink('link-timer');
			break;
		case 2:
			showLId('scripter');
			selectedLink('link-scripter');
			break;
		case 3:
			showLId('option');
			selectedLink('link-option');
			break;
	}
}
function unselectedLinks() {
	setBGColorLId('link-timer', '#DDD');
	setBGColorLId('link-scripter', '#CCC');
	setBGColorLId('link-option', '#BBB');
}
function selectedLink(id) {
	unsetBGColorLId(id);
}




// Timeset-Inhale
function getInhaleTime() {
	return parseInt(getValLId('time-inhale'));
}
function setInhaleTime(val) {
	setValLId('time-inhale', val);
}
function inhaleTimeUp() {
	setInhaleTime(getInhaleTime()+1);
}
function inhaleTimeDown() {
	var time = getInhaleTime();
	setInhaleTime(((time-1)>1)?time-1:1);
}

// Timeset-Exhale
function getExhaleTime() {
	return parseInt(getValLId('time-exhale'));
}
function setExhaleTime(val) {
	setValLId('time-exhale', val);
}
function exhaleTimeUp() {
	setExhaleTime(getExhaleTime()+1);
}
function exhaleTimeDown() {
	var time = getExhaleTime();
	setExhaleTime(((time-1)>0)?time-1:1);
}

// Timeset-Hold
function getHoldTime() {
	return parseInt(getValLId('time-hold'));
}
function setHoldTime(val) {
	setValLId('time-hold', val);
}
function holdTimeUp() {
	if (getCheckHold()) setHoldTime(getHoldTime()+1);
}
function holdTimeDown() {
	var time = getHoldTime();
	if (getCheckHold()) setHoldTime(((time-1)>1)?time-1:1);
}

// Checkbox-Hold
function getCheckHold() {
	return getCheckboxLId('check-hold');
}
function setDisabledHold(bool) {
	setDisabledLId('hold-up', bool);
	setDisabledLId('hold-down', bool);
}
function checkHold() {
	var bool = getCheckHold();
	
	// 여기에 무언가를 작동해야 함
	setDisabledHold(!bool);
	////////////////// disabled가 작동되지 않음. 우회적으로 holdTime의 Up과 Down 함수가 동작되지 않도록 한다. /////////////
	setHoldTime((getCheckHold()?1:0));
	
	return bool;
}








// Numberset-Repeat
function getRepeatNum() {
	return parseInt(getValLId('num-repeat'));
}
function setRepeatNum(val) {
	setValLId('num-repeat', val);
}
function repeatNumUp() {
	setRepeatNum(getRepeatNum()+1);
}
function repeatNumDown() {
	var time = getRepeatNum();
	setRepeatNum(((time-1)>1)?time-1:1);
}




// Paras-Writer
function add() {
	var id = service.addPara();
	
}
function del(id) {
	service.removeParaId(id);
	
}
// 파라스크립트에서 아이디 목록을 불러옴
function getParasIdList() {
	
}

// 파라스크립트에서 파라 구문 하나 생성
function addPara(id) {
	var para = '<p id="para-'+id+'"><i>들숨</i><input type="text"><button>&times;</button></p>';
}

// 파라스크립트에서 구문 갱신을 위한 모든 구문의 value와 id를 수집
function getParasL() {
	var e = getLId('paras-writer');
	console.log(e);
	
	// 할 일:
	// paras-writer 아래 para들의 id와 para 내 input의 value 값을 리스트화한다.
}
// 하나하나 호출
function getParaL() {
	
}
function getParaId() {
	
}
function getParaValue(id) {
	var e = getLId('para-'+id).childNodes;
	// [text, i, text, input, text, button, comment, text]
//	for (var i = 0; i < c.length; i++) console.log(c[i], c[i].value);
	return e[3].value;
}

// 파라스크립트 갱신 완료 후 엘리먼트들을 생성
function setParasL() {
	
}
// 파라 엘리먼트의 구문들을 하나 하나 호출하는 함수
function setParaL() {
	
}



// 들숨-날숨 통합모드로 할 것인가, 따로 할 것인가에 따라 달라진다.
function checkMergeIx_Ex() {
	if (getCheckboxLId('in-ex-merge')) mergeIn_Ex_hale();
	else divideIn_Ex_hale();
}
function mergeIn_Ex_hale() {
	// 파라스크립터 내 모든 파라들의 i들을 하나의 싸이클 번호로 부여한다.
	
}

function divideIn_Ex_hale() {
	// 파라스크립터 내 모든 파라들의 i들을 하나의 싸이클 번호와 들숨/날숨을 부여한다.
	
}










// Option


// 배경 타입 설정
function changeBgType(e) {
	var type = e.value;
}
// 배경 이미지 업로드

// 배경 컬러 설정(배경 뿐만 아니라 이 색깔과 동일시하는 엘리먼트의 색깔까지 바꿔야 한다)
function changeBgColor(e) {
	var color = e.value;
	setBGColorLId('intro', color);
	setBGColorLId('main', color);
//	document.body.style.backgroundColor = color;
}
function selectCustomBgColor() {
	
}
function showCustomBgColor() {
	showLId('customBgColor');
}
function hideCustomBgColor() {
	hideLId('customBgColor');
}



// 폰트 선택 설정
function selectFont(e) {
	var fontName = e.value;
	changeFontFamily(fontName);
}
// 폰트 변환
function changeFontFamily(font) {
	document.body.style.fontFamily = font;
}

// 렁스 자막의 폰트 사이즈 조절
function resizeFont(px) {
	
}
// 렁스 자막의 굵기 조절
function resizeWeight(h) {
	
}

// 폰트 위치 X 조절
function resizePosX(x) {
	
}
// 폰트 위치 Y 조절
function resizePosY(y) {
	
}

// 렁스 자막 색깔 설정
function selectColor(e) {
	var n = parseInt(e.value);
	changeColor((n==1)?'#FFFFFF':'#000000');
}
// 색깔 변환
function changeColor(val) {
	
	document.body.style.color = val;
	setFontColorLId('',val);
}



// All-Time
function updateAllTime() {
	var inhaleTime = getInhaleTime();
	var exhaleTime = getExhaleTime();
	var holdTime = ((getCheckHold())?getHoldTime():0);
	var repeatNum = getRepeatNum();
}





// Form-Reset


// Start
function startMain() {
	showLId('main');
	hideLId('intro');
	
}








function startLungs() {
	service.activeStart(start, inhale, hold, exhale, end);
}

function start(cc, time) {
	changeCC(cc);
	toSmall(time);
}

function inhale(cc, time) {
	changeCC(cc);
	toLarge(time);
}

function hold(cc, time) {
	changeCC(cc);
}

function exhale(cc, time) {
	changeCC(cc);
	toSmall(time);
}

function end(cc, time) {
	changeCC(cc);
	toLarge(time);
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
	getLId('brt-cc').innerHTML = br(state);
}

// 자막에서 줄 띄우기를 해주는 함수
function br(cc) {
	return cc.replaceAll('/', '<br>');
}








// 렁스 운동 끝나고 시도할 수 있는 것

function repeatLungs() {
	
}

function endLungs() {
	
}

function returnIntro() {
	showLId('intro')
	hideLId('main');
}






