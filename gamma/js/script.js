

function getLId(id) {
	return document.getElementById(id);
}
function getLIdVal(id) {
	return getLId(id).value;
}
function setLIdVal(id, val) {
	getLId(id).value = val;
}
function getLIdCheckBox(id) {
	return getLId(id).checked;
}
function setLIdCheckBox(id, bool) {
	getLId(id).checked = bool;
}
function getLIdStyle(id) {
	return getLId(id).style;
}
function getLidDisplay(id) {
	return getLIdStyle(id).display;
}
function setLIdDisplay(id, state) {
	getLIdStyle(id).display = state;
}


var ps = new ParaScript();

function changeStartParas() {
	var data = getLId('start-paras').value;
	ps.setstartParas(data);
}

function changeEndParas() {
	var data = getLId('end-paras').value;
	ps.setEndParas(data);
}

// 추가 클릭을 했을 때
function clickAddParas() {
	addParas();
}

function addParas() {
//	var id = ps.add();
//	getLId('paras-list').innerHTML += getParasElement(ps.add());
	
	var id = ps.add();
	var element = getParasElement(id);
	getLId('paras-list').innerHTML += element;
	updateParasListData();
//	var data = ps.get;
//	updateParasList(data);
}

function getParasElement(id) {
	var element = '<div class="paras-g" id="p-'+id+'"><input type="text" class="paras" id="paras-'+id+'" onchange="changeParas('+id+')"><button class="paras-del" onclick="clickDeleteParas('+id+');">&times;</button></div>';
	return element;
}

// 삭제 클릭을 했을 때
function clickDeleteParas(id) {
	
	deleteParas(id);
}

// 삭제 처리
function deleteParas(id) {
	if (ps.findId(id) != -1) {
//		console.log('delete: '+id);
		ps.delete(ps.findId(id));
		getLId('p-'+id).remove();
	}
	else {
		console.log('Cannot delete: '+id);
	}
}

/*
var eventsList = [];

function findAndRemoveEventList(id) {
	for (var i = 0; i < eventsList.length; i++) {
		if (id == eventsList[i]) {
			eventsList.splice(i,1);
			return;
		}
	}
}

function eventOnChangeOn(id) {
////	var parasList = getLId('paras-list');
//	var parasList = document.querySelector("#paras-list");
	eventsList.push(id);
	var paras = getLId(id);
	paras.addEventListener('onchange', onchangeUpdateParas, false);
	console.log('active onchange event: '+id);
}

function eventOnChangeOff(id) {
////	var parasList = getLId('paras-list');
//	var parasList = document.querySelector("#paras-list");
	findAndRemoveEventList(id);
	var paras = getLId(id);
	paras.removeEventListener('onchange', onchangeUpdateParas);
	console.log('shutdown onchange event: '+id);
}

// keyUp 또는 onChange events가 발생했을 때 실행한다. 이벤트 감지기를 설치하거나 직접 1:1 대응을 하거나 둘 중 하나다. 한다.
function onchangeUpdateParas(e) {
	console.log(e);
	if (e.target !== e.currentTarget) {
		var el = e.target.id;
		console.log(el);
	}
}
*/

function changeParas(id) {
	changeSE(getLId('paras-'+id));
}

function changeSE(e) {
//	console.log(e.value);
	if (e.id == 'start-paras') ps.setstartParas(e.value);
	else if (e.id == 'end-paras') ps.setEndParas(e.value);
	else {
		var id = ps.findId(parseInt(e.id.substr(6)));
		ps.change(id, e.value);
	}
	// chatAt()처럼 'paras-'를 건너뛰고 그 다음이 숫자면 바꾸기를 진행하고 문자면 s냐 e냐에 따라 다르게 실행한다.
}

function getParasData(id) {
	return getLId('paras-'+id).value;
}

function setParasData(id, data) {
	getLId('paras-'+id).value = data;
}

// 추가나 삭제 어떤것이든 이 함수를 무조건 거친다.
function updateParasList(data) {
	getLId('paras-list').innerHTML = '';
	for (var i = 0; i < data.length; i++) {
		getLId('paras-list').innerHTML += getParasElement(data[i].id);
		setParasData(i, data[i].paras);
	}
}

function updateParasListData() {
	var el = getLId('paras-list').children;
	
	for (var i = 0; i < el.length; i++) {
		var id = parseInt((el[i].children[0].id).substr(6));
		var data = ps.seek(ps.findId(id));
		getLId('paras-'+id).value = data;
	}
}

function sortParasList() {
	ps.sort();
	var data = ps.get();
	updateParasList(data);
}


function displayExerciseTime(time) {
//	var inhaleTime = 5;
//	var holdTime = 1;
//	var exhaleTime = 5;
//	var subtitleLength = 10;
//	var subtitleCycle = 2;
//	var inexGroup = true;
//	var subtitleOnHold = true;
	
//	var time = getExerciseTime(inhaleTime, holdTime, exhaleTime, subtitleLength, subtitleCycle, inexGroup, subtitleOnHold);
	var seconds = Math.floor(time % 3600 % 60);
	var minutes = Math.floor(time % 3600 / 60);
	var hours = Math.floor(time / 3600);
	alert(hours+'h '+minutes+'m '+seconds+'s');
	
	
}


function clickReset() {
	reset();
}

function reset() {
	ps.reset();
	getLId('paras-list').innerHTML = '';
	addParas();
	getLId('start-paras').value = '';
	getLId('end-paras').value = '';
}

function clickStart() {
	start();
}

function start() {
	showMain();
//	eventOnChangeOff();
}


function showIntro() {
	setLIdDisplay('intro', 'block');
	setLIdDisplay('main', 'none');
	setLIdDisplay('history', 'none');
}
function showMain() {
	setLIdDisplay('intro', 'none');
	setLIdDisplay('main', 'block');
	setLIdDisplay('history', 'none');
}
function showHistory() {
	setLIdDisplay('intro', 'none');
	setLIdDisplay('main', 'none');
	setLIdDisplay('history', 'block');
}

function hideIntroTab() {
	setLIdDisplay('home', 'none');
	setLIdDisplay('timer', 'none');
	setLIdDisplay('scripter', 'none');
	setLIdDisplay('loader', 'none');
	setLIdDisplay('option', 'none');
}
function tab(id) {
	var show = '';
	hideIntroTab();
	
	switch(id) {
		case 0:
			show = 'home';
			break;
		case 1:
			show = 'timer';
			break;
		case 2:
			show = 'scripter';
			break;
		case 3:
			show = 'loader';
			break;
		case 4:
			show = 'option';
			break;
	}
	setLIdDisplay(show, 'block');
}

// 유저 모드
function scriptUserMode() {
	setLIdDisplay('link-loader', 'none');
	setLIdDisplay('link-scripter', 'block');
	getLIdStyle('link-timer').flex = "1";
	getLIdStyle('link-scripter').flex = "2";
	getLIdStyle('link-option').flex = "1";
}
// 파일 모드
function scriptFileMode() {
	setLIdDisplay('link-loader', 'block');
	setLIdDisplay('link-scripter', 'block');
	getLIdStyle('link-timer').flex = "1";
	getLIdStyle('link-scripter').flex = "1";
	getLIdStyle('link-loader').flex = "1";
	getLIdStyle('link-option').flex = "1";
}
// 모드 해제
function scriptModeOut() {
	setLIdDisplay('link-loader', 'none');
	setLIdDisplay('link-scripter', 'none');
	getLIdStyle('link-timer').flex = "2";
	getLIdStyle('link-option').flex = "2";
}

function changeSelectSubtitle() {
	var val = parseInt(getLId('selectScript').value);
	switch(val) {
		case 0:
			scriptUserMode();
			break;
		case 1:
			scriptFileMode();
			break;
		case 2:
			scriptModeOut();
			break;
	}
}


function loadParas() {
	
}


function importData() {
	
}

function exportData() {
	
}










