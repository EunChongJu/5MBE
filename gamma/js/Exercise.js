



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

// 이 클래스는 운동할 때만 실행
var Exercise = function() {
	
}


var service;

function activeService() {
	service = new Exercise();
}





function init() {
	showIntro();
}



// 추가 클릭을 했을 때
function clickAddParas() {
	
}

function loadParas() {
	
}

function getParasGroupForLoad(id) {
	var element = '<div class="paras-g" id="p-'+id+'"><input type="text" class="paras" id="paras-'+id+'"><button class="paras-del" onclick="clickDeleteParas('+id+');">&times;</button></div>';
	
}
// 삭제 클릭을 했을 때
function clickDeleteParas(id) {
	
}
// 삭제 처리
function deleteParas() {
	
}

// 추가나 삭제 어떤것이든 이 함수를 무조건 거친다.
function updateParasList() {
	var list = getLId('paras-list').innerHTML;
	
	getLId('paras-list').innerHTML = list;
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

