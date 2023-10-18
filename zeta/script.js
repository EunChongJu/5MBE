
function showBlockId(id) {
	document.getElementById(id).style.display = 'block';
}
function showFlexId(id) {
	document.getElementById(id).style.display = 'flex';
}
function hideId(id) {
	document.getElementById(id).style.display = 'none';
}

function setbox(id) {
	hideId('setboxMode');
	hideId('setboxTitle');
	hideId('setboxScript');
	hideId('setboxGraphic');
	hideId('setboxTime');
	hideId('setboxPosition');
	hideId('setboxDetails');
	showBlockId('setbox'+id);
	
	if (id == 'Script') fm.setUpSelect();
}

function clickBtnReset() {
	document.getElementById('inTimeset').value = 5;
	document.getElementById('outTimeset').value = 5;
	document.getElementById('stopTimeset').value = 0;
	document.getElementById('graphicMode').value = 1;
	document.getElementById('repeatNum').value = 1;
}
function clickBtnStart() {
	hideId('setting');
	showFlexId('main');
	loadValues();
}

function startChecking() {
//	setStopTime();
//	dtChange();
//	dmChange();
}
function setStopTime() {
	if (getChecked('stopTimeEn')) {
		showBlockId('stopTimeGroup');
	}
	else {
		hideId('stopTimeGroup');
	}
}
function dtChange() {
	if (getChecked('dtOn')) {
		showBlockId('taGroup');
	}
	else {
		hideId('taGroup');
	}
}
function dmChange() {
	if (getChecked('dmOn')) {
		showBlockId('dmGroup');
		showBlockId('dmLang');
		showBlockId('dmTurn');
	}
	else {
		hideId('dmGroup');
		hideId('dmLang');
		hideId('dmTurn');
	}
}

function getChecked(id) {
	return document.getElementById(id).checked;
}
function getValue(id) {
	return document.getElementById(id).value;
}
function setValue(id, val) {
	document.getElementById(id).value = val;
}

function loadValues() {
	fm.setTime(getValue('inTimeset'), getValue('outTimeset'));
	fm.setStopTime(getValue('stopTimeset'));
	fm.setRepeatCycle('repeatNum')
	fm.setSpaceBefore(getValue('ioBs'));
	fm.setSpaceAfter(getValue('ioAs'));
	
	fm.setColors(getValue('bgc'), getValue('mvc'), getValue('lmc'), getValue('bdc'));
	fm.setUpGraphic();
}

function repeatOff() {
	fm.repeatOff();
	// display hide
}

function changeGraphic(m) {
	var lid = 'gpLimit';
	
	if (m == 0) {
		// Lungs
		setValue('lmw', 50);
		setValue('lmh', 50);
		setValue('lml', 50);
		setValue('lmr', 50);
			document.getElementById(lid).style.transform = 'translate(-50%, -50%)';
	}
	else if (m == 1) {
		// Beach
		setValue('lmw', 100);
		setValue('lmh', 70);
		setValue('lml', 50);
		setValue('lmr', 50);
			document.getElementById(lid).style.transform = 'translate(0%, 0%)';
	}
	
}


function changeScript(i) {
	
}








var fm = null;
fmStart();

function fmStart() {
	fm = new FMB();
	setTimeout(startChecking, 1000);
//	hideId('main');
//	hideId('end');
//	showBlockId('setting');
}






function changeTitle() {
	var title = getTitle();
	
}
function getTitle() {
	return document.getElementById('scEditorTitle').value;
}
function setTitle(p) {
	document.getElementById('scEditorTitle').value = p;
}

var SCEditor = function() {
	var data = [];
	// data 안에 title을 넣을 것인가? 그것이 문제로다.

	this.getData = function() {
		return data;
	};
	
	this.getSubtitleId = function() {
		var sid = 0;
		for (var i = 0; i < data.length; i++) {
			if ((data[i].lastIndexOf('@')) != -1) sid++;
		}
		return sid;
	};
	
	this.getId = function() {
		return data.length;
	};
	
	this.addSubtitle = function() {
		if (data.length != 0) {
			data[data.length-1] += '@';
			// subtitle은 이 해당 라인 바로 아래의 라인에 '@'가 추가되어 여기에 저장된다.
			// 그래서 디스플레이 상에서 서브타이틀 라인 아래 에디터 라인이 없으면 추가한다. 단 디스플레이에서는 표시되지 않는다.
			// 
		}
	};
	this.addEditor = function(p) {
		data.push(p);
	};

	this.writeEditor = function(id) {
		data[id]
	}
}
var scEditor = new SCEditor();

function getSubtitleLineId() {
	var sid = scEditor.getSubtitleId();
	return sid;
}
function getEditorLineId() {
	var lid = scEditor.getId();
	return lid;
}

function addLine(s) {
	document.getElementById('scEditor').innerHTML += s;
}

function addSubtitleLine() {
	var line = '<div class="scSubtitleLine" id="scSubtitleLine-1"><input type="text" id="scSubtitle-1" placeholder="Press to Subtitle..."><button onclick="deleteSubtitleLine(1);">&times;</button></div>';
	
}
function addEditorLine() {
	var line = '<div class="scEditorLine" id="scEditorLine-1"><input type="text" id="scEditor-1" placeholder="Press to Line..."><button onclick="deleteEditorLine(1);">&times;</button></div>';
	
}


// 중간에 라인 하나 이상이 지워지면, 다시 처음부터 아이디를 재정렬하여 배치한다.
function resetLine() {
	var data = scEditor.getData();
	var lines = '';
	var sid = 1;
	var lid = 1;
	
	for (var i = 0; i < data.length; i++) {
		if (isSubtitleOnLine(data[i])) {
			var st = getSubtitleOnLine(data[i]);
			lines += ('<div class="scSubtitleLine" id="scSubtitleLine-'+sid+'"><input type="text" id="scSubtitle-'+sid+' value="'+st+'" " placeholder="Press to Subtitle..."><button onclick="deleteSubtitleLine('+sid+');">&times;</button></div>');
			sid++;
		}
		var el = getEditorOnLine(data[i]);
		lines += '<div class="scEditorLine" id="scEditorLine-'+lid+'"><input type="text" id="scEditor-'+lid+'" value="'+el+'" placeholder="Press to Line..."><button onclick="deleteEditorLine('+lid+');">&times;</button></div>';
		lid++;
	}
	document.getElementById('scEditor').innerHTML = lines;
}
function isSubtitleOnLine(p) {
	return ((p.lastIndexOf('@')) != -1);
}
function getSubtitleOnLine(p) {
	var arr = p.split('@');
	return arr[arr.length-1];
}
function getEditorOnLine(p) {
	var arr = p.split('@');
	return arr[0];
}

function deleteSubtitleLine(id) {
	var elid = 'scSubtitleLine-'+id;
	
}

function deleteEditorLine(id) {
	var elid = 'scEditorLine-'+id;
	
}

