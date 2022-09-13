

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
	resetParas();
	resetValues();
	resetOptions();
}

function resetOptions() {

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
	start();
}

function start() {
	showMain();
//	eventOnChangeOff();
}

function backToIntro() {
	showIntro();
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
//	console.log(e.id, e.value);
	var timeId = e.id;
	var timeNum = e.value;
}

function updateRepeatExc() {
	var repeatNum = getLIdVal('repeatExc');

}

function checkUseHoldingTime() {
	var bool = getLIdCheckBox('useHoldingTime');
	if (bool) {
		// 홀딩 타임을 가질 시, 홀딩 타임은 1이 된다.
		setLIdDisplay('useCCL', 'block');
		setLIdDisplay('holdingTimeD', 'block');
	}
	else {
		// 홀딩 타임을 가지지 않을 시, 홀딩 타임을 0으로 설정한다.
		setLIdDisplay('useCCL', 'none');
		setLIdDisplay('holdingTimeD', 'none');
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
		setLIdDisplay('useCCL', 'block');
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
		setLIdDisplay('mergeInExL', 'block');
	}
}

// 파일의 파일 업로드 설정
// 파일 업로드에서 파일 내 시간 설정도 포함되므로 setTime()을 사용하여야 하며, 또한 스크립트 업데이트 함수를 사용하여 바꾸어야 한다.

// 옵션의 이미지 파일 업로드 설정

// 옵션의 배경 설정

// 옵션의 배경 단색 선택 시 색깔 설정





// 상세옵션 - WebStorage Class
var Options = function() {
	var lungsSize = 100;
	var lungsX = 0;
	var lungsY = 0;

	var subtFamily = 'Noto Sans KR';
	var subtSize = 6;
	var subtWeight = 400;

	var subtX = 0;
	var subtY = 0;
	var subtColor = 1;

	this.getLungsSize = function() {
		return lungsSize;
	};
	this.getLungsX = function() {
		return lungsX;
	};
	this.getLungsY = function() {
		return lungsY;
	};
	this.getSubtFamily = function() {
		return subtFamily;
	};
	this.getSubtSize = function() {
		return subtSize;
	};
	this.getSubtWeight = function() {
		return subtWeight;
	};
	this.getSubtX = function() {
		return subtX;
	};
	this.getSubtY = function() {
		return getSubtY;
	};
	this.getSubtColor = function() {
		return subtColor;
	};

	this.setLungsSize = function(size) {
		lungsSize = size;
	};
	this.setLungsX = function(x) {
		lungsX = x;
	};
	this.setLungsY = function(y) {
		lungsY = y;
	};
	this.setSubtFamily = function(f) {
		subtFamily = f;
	};
	this.setSubtSize = function(size) {
		subtSize = size;
	};
	this.setSubtWeight = function(wigth) {
		subtWeight = weight;
	};
	this.setSubtX = function(x) {
		subtX = x;
	};
	this.setSubtY = function(y) {
		getSubtY = y;
	};
	this.setSubtColor = function(color) {
		subtColor = color;
	};

	function getStorageOptions() {
		return 'ls:'+lungsSize+'/lx:'+lungsX+'/ly:'+lungsY+'/sf:'+subtFamily+'/ss:'+subtSize+'/sw:'+subtWeight+'/sx:'+subtX+'/sy:'+subtY+'/sc:'+subtColor+'/';
	}
	this.saveOptions = function() {
		var value = getStorageOptions();
		localStorage.setItem('fmbeOptions', value);
	};
	this.loadOptions = function() {
		// localStorage.setItem('json', JSON.stringify({a:1,b:2}));
		// JSON.parse(localStorage.getItem('json')); -> {a:1, b:2} // array can too.

	}
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
}
