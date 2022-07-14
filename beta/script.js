

// BEP
var service;


function setUp() {
	service = new BEP();
	service.init();
	openForm(1);
}

function getLId(id) {
	return document.getElementById(id);
}
function showLId(id) {
	getLId(id).style.display = 'block';
}
function hideLId(id) {
	getLId(id).style.display = 'none';
}

function allHideForm() {
	hideLId('timer');
	hideLId('scripter');
	hideLId('option');
}
function openForm(n) {
	allHideForm();
	switch(n) {
		case 1:
			showLId('timer');
			break;
		case 2:
			showLId('scripter');
			break;
		case 3:
			showLId('option');
			break;
	}
}











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









