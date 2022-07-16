
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
	
}
function del(id) {
	
}

















// Option





// All-Time
function updateAllTime() {
	var inhaleTime = getInhaleTime();
	var exhaleTime = getExhaleTime();
	var holdTime = ((getCheckHold())?getHoldTime():0);
	var repeatNum = getRepeatNum();
}





// Form-Reset


// Start








function clickLungs() {
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









