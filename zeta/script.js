
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
