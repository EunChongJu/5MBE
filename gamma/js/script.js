

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
function getLIdDisplay(id) {
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
	if (e.id == 'start-paras') ps.setStartParas(e.value);
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


function displayExerciseTime() {
	var time = brt.allTime();
	var seconds = Math.floor(time % 3600 % 60);
	var minutes = Math.floor(time % 3600 / 60);
	var hours = Math.floor(time / 3600);

	console.log(hours+'h '+minutes+'m '+seconds+'s');


}


function clickReset() {
	resetParas();
	resetValues();
	resetTimer();
	resetOptions();
}

function resetTimer() {
	setLIdVal('inhaleTime', 5);
	setLIdVal('exhaleTime', 5);
	setLIdVal('holdingTime', 1);
	setLIdVal('repeatExc', 1);
	setLIdCheckBox('useHoldingTime', true);
	checkUseHoldingTime();
	setLIdCheckBox('mergeInEx', false);
	setLIdCheckBox('useCC', false);
	checkUseCC();
}

function resetOptions() {
	setLIdVal('LungsSize', 100);
	setLIdVal('LungsX', 0);
	setLIdVal('LungsY', 0);
	setLIdVal('SubtSize', 6);
	setLIdVal('SubtWeight', 400);
	setLIdVal('SubtX', 0);
	setLIdVal('SubtY', 0);
}

function resetValues() {
	getLId('holdingTime').value = 1;
	getLId('repeatExc').value = 1;
	setLIdCheckBox('mergeInEx',false);
	setLIdCheckBox('useCC',false);
	setLIdCheckBox('useHoldingTime',true);
	getLId('inhaleTime').value = 5;
	getLId('exhaleTime').value = 5;
}

function resetParas() {
	ps.reset();
	getLId('paras-list').innerHTML = '';
	addParas();
	getLId('start-paras').value = '';
	getLId('end-paras').value = '';
}

function clickStart() {
	// 스크립트 처리
	var paras = ps.getAll();
	brt.setParas(paras);
	start();
}

function start() {
	showMain();
//	eventOnChangeOff();
}



// (intro, main, history)
function showAndHide(intro, main, history) {
	setLIdDisplay('intro', intro);
	setLIdDisplay('main', main);
	setLIdDisplay('history', history);
}

function showIntro() {
	showAndHide('block', 'none', 'none');
}
function showMain() {
	showAndHide('none', 'block', 'none');
}
function showHistory() {
	showAndHide('none', 'none', 'block');
}

// 탭 전환하기
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

function hideIntroTab() {
	setLIdDisplay('home', 'none');
	setLIdDisplay('timer', 'none');
	setLIdDisplay('scripter', 'none');
	setLIdDisplay('loader', 'none');
	setLIdDisplay('option', 'none');
}

// 유저 모드 탭 전환
function scriptUserMode() {
	setLIdDisplay('link-loader', 'none');
	setLIdDisplay('link-scripter', 'block');
	getLIdStyle('link-timer').flex = "1";
	getLIdStyle('link-scripter').flex = "2";
	getLIdStyle('link-option').flex = "1";
}
// 파일 모드 탭 전환
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
// 홈의 모드 선택에 따라 탭의 메뉴가 표시되고 사라진다.
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

// 타이머 설정

// 타이머 초기화
function initTimerSet() {

}

// 타임들을 불러오거나 세팅함
function getInhaleTime() {
	return getLIdVal('inhaleTime');
}
function setInhaleTime(time) {
	setLIdVal('inhaleTime', time);
}
function getExhaleTime() {
	return getLIdVal('exhaleTime');
}
function setExhaleTime(time) {
	setLIdVal('exhaleTime', time);
}
function getHoldingTime() {
	return getLIdVal('holdingTime');
}
function setHoldingTime(time) {
	setLIdVal('holdingTime', time);
}

// 변경된 타임 값을 불러와 해당 변수에 저장해두었다가 나중에 Exercise로 넘어간다. 그리고 모든 시간을 불러와 시간총계를 계산해 업데이트하도록 한다.
function updateSetTime(e) {
	brt.setTime(e.id, e.value);

}

function updateRepeatExc(value) {
	// var repeatNum = getLIdVal('repeatExc');
	var repeat = value;
	console.log(value);
	brt.setRepeat(value);
}

function checkUseHoldingTime() {
	var bool = getLIdCheckBox('useHoldingTime');
	if (bool) {
		// 홀딩 타임을 가질 시, 홀딩 타임은 1이 된다.
		setLIdDisplay('useCCL', 'inline-block');
		setLIdDisplay('holdingTimeD', 'block');
		setLIdDisplay('mergeInExL', 'none');
	}
	else {
		// 홀딩 타임을 가지지 않을 시, 홀딩 타임을 0으로 설정한다.
		setLIdDisplay('useCCL', 'none');
		setLIdDisplay('holdingTimeD', 'none');
		setLIdDisplay('mergeInExL', 'inline-block');
	}
}
function checkMergeInEx() {
	var bool = getLIdCheckBox('mergeInEx');
	if (bool) {
		// 합병 허용 시, inhale의 자막과 exhale 자막이 동일시 된다.
		setLIdDisplay('useCCL', 'none');
	}
	else {
		// 합병 불허 시, inhale 자막과 exhale 자막은 분리된다.
		// setLIdDisplay('useCCL', 'inline-block');
	}
}
function checkUseCC() {
	var bool = getLIdCheckBox('useCC');
	if (bool) {
		// 홀딩 타임 때 자막을 표시할 경우, 합병이 불가능해진다.
		setLIdDisplay('mergeInExL', 'none');
	}
	else {
		// 홀딩 타임에 자막을 표시하지 않을 시, 합병이 가능하다.
		// setLIdDisplay('mergeInExL', 'inline-block');
	}
}






// 파일의 파일 업로드 설정
// 파일 업로드에서 파일 내 시간 설정도 포함되므로 setTime()을 사용하여야 하며, 또한 스크립트 업데이트 함수를 사용하여 바꾸어야 한다.
function loadFile() {
	var file = new FileReader();
	file.onload = () => {
		var paras = splitParasFile(file.result);
		loadParaInfo(paras);
	};
	file.readAsText(this.files[0]);
}

// 아직까지는 파일 업로드를 통한 스크립트 로딩은 지원하지 않을 것
function loadParaInfo(paraArr) {
	var fileOption = {
		title: paraArr[0],
		paraScript: paraArr[1],
	};
}

// 옵션의 배경 설정
function changeSelectBgType() {
	var type = getLId('selectBgType').value;
	if (type == 0) {
		setLIdDisplay('bg-color', 'none');
		setLIdDisplay('bg-imgfile', 'none');
		changeSelectBgColor({value: '#4CAF50', checked: true});
	}
	else if (type == 1) {
		setLIdDisplay('bg-color', 'block');
		setLIdDisplay('bg-imgfile', 'none');
	}
	else if (type == 2) {
		setLIdDisplay('bg-color', 'none');
		setLIdDisplay('bg-imgfile', 'block');
	}
}

// 옵션의 배경 단색 선택 시 색깔 설정
function changeSelectBgColor(e) {
	var color = e.value;
	if (e.checked) {
		document.body.style.backgroundColor = color;
		getLId('lungs-play-path').style.fill = color;
		getLId('lungs-replay-path').style.fill = color;
	}
}

// 옵션의 이미지 파일 업로드 설정
function changeBgImage(e) {
	var file = e.files[0];
	var reader = new FileReader();
	reader.onload = () => {
		document.body.style.backgroundImage = 'url("' + reader.result + '")';
	}
	if (file) {
		reader.readAsDataURL(file);
		changeSelectBgColor({value: '#4CAF50', checked: true});
	}
	else {}
}



// 상세옵션 - WebStorage Class
var Options = function() {
	var opt = {
		LungSize: 100,
		LungsX: 0,
		LungsY: 0,
		SubtFamily: 'Noto Sans KR',
		SubtSize: 6,
		SubtWeight: 400,
		SubtX: 0,
		SubtY: 0,
		SubtColor: '#FFFFFF',
	};

	// After Version, will be
	var LungsSmaller = 0.1;
	var LungsBigger = 1;

	// set Time and Option for Save on WebStorage
	var InhaleTime = 5;
	var ExhaleTime = 5;
	var UseHoldingTime = true;
	var MergeInEx = false;
	var UseCC = false;
	var HoldingTime = 1;

	this.get = function(id) {
		return opt[id];
	}
	this.set = function(id, value) {
		opt[id] = value;
	}

	this.getLungsSize = function() { return opt.LungsSize; };
	this.getLungsX = function() { return opt.LungsX; };
	this.getLungsY = function() { return opt.LungsY; };
	this.getSubtFamily = function() { return opt.SubtFamily; };
	this.getSubtSize = function() { return opt.SubtSize; };
	this.getSubtWeight = function() { return opt.SubtWeight; };
	this.getSubtX = function() { return opt.SubtX; };
	this.getSubtY = function() { return opt.SubtY; };
	this.getSubtColor = function() { return opt.SubtColor; };

	this.setLungsSize = function(size) { opt.LungsSize = size; };
	this.setLungsX = function(x) { opt.LungsX = x; };
	this.setLungsY = function(y) { opt.LungsY = y; };
	this.setSubtFamily = function(f) { opt.SubtFamily = f; };
	this.setSubtSize = function(size) { opt.SubtSize = size; };
	this.setSubtWeight = function(wigth) { opt.SubtWeight = weight; };
	this.setSubtX = function(x) { opt.SubtX = x; };
	this.setSubtY = function(y) { opt.SubtY = y; };
	this.setSubtColor = function(color) { opt.SubtColor = color; };

	this.getInhaleTime = function() { return InhaleTime; };
	this.getExhaleTime = function() { return ExhaleTime; };
	this.getHoldingTime = function() { return HoldingTime; };
	this.setInhaleTime = function(t) { InhaleTime = t; };
	this.setExhaleTime = function(t) { ExhaleTime = t; };
	this.setHoldingTime = function(t) { HoldingTime = t; };


	function getStorageOptions() {
		return opt;
	}

	function setStorageOptions(data) {
		opt = data;
	}

	this.saveOptions = function() {
		var value = getStorageOptions();
		localStorage.setItem('fmbeOptions', JSON.stringify(value));
	};

	this.loadOptions = function() {
		var value = JSON.parse(localStorage.getItem('fmbeOptions'));
		setStorageOptions(value);
	};

	this.removeOptions = function() {
		localStorage.removeItem('fmbeOption');
		// localStorage.clear();
	}
	this.checkOption = function() {
		if (('localStorage' in window) && window['localStorage'] !== null) {
			console.info('This browser can use WebStorage!');
			return true;
		}
		else {
			console.error('This browswe CAN`T use WebStorage!');
			return false;
		}
	};

};

var options = new Options();

function slideChangeValue(e) {
	var id = e.id;
	var value = e.value;
	options.set(id, value);
	// console.log(options.get(id));
}
function selectSubtFont(e) {
	var value = e.value;
	options.setSubtFamily(value);
	document.body.style.fontFamily = value;
}
function selectSubtColor(e) {
	var value = e.value;
	options.setSubtColor(value);
}
