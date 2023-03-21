
var option = {
	inhaleTime: 5,
	exhaleTime: 5,
	
	disableStop: true,
	stopTime: 1,
}
var paraForm = {
	title: '',
	scripts: [
		'들이쉬기',
		'숨참기',
		'내쉬기'
	],
	
}


function setStopTime(val) {
	if (val != 0) {
		option.disableStop = true;
		option.stopTime = val;
	}
	else {
		option.disableStop = false;
		option.stopTime = 0;
	}
}

function setTitleName(val) {
	paraForm.title = val;
}
function loadScripts(scripts) {
	for (var i = 0; i < scripts.length; i++) {
		addScript(scripts[i]);
	}
}

function addScript(val) {
	paraForm.scripts.push(val);
}

function removeScriptIndex(index) {
	paraForm.scripts[index] = '';
}














// INTRO SETTING BACKGROUND //

// 파일 업로더 이벤트 실행
function bgEventOpen() { getLId('bg-load').addEventListener('change', loadImage); }
// 파일 업로더 이벤트 종료
function bgEventClose() { getLId('bg-load').removeEventListener('change', loadImage); }

// 파일 업로더에 파일을 불러오는 함수
function loadImage() {
//	var file = new FileReader();
//	file.onload = () => {
//		file.result
//	}
//	file.readAsText(this.files[0]);
	
	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = () => {
		document.body.style.backgroundImage = 'url("' + reader.result + '")';
		bgImageMode();
	}
	if (file) {
		reader.readAsDataURL(file);
	}
	else {}
}

