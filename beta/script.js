

var fm = null;

function startHome() {
	fm = new FMBE();
	fm.initStorage();
	
	setForm('script');
	setScriptMenu();
}

// 시작하자마자 스토리지에 저장된 설정 값을 설정
function setSettingValues() {
	
}



function setValue(id, val) {
	document.getElementById(id).value = val;
}
function getValue(id) {
	return document.getElementById(id).value;
}
function setChecked(id, val) {
	document.getElementById(id).checked = val;
}
function getChecked(id) {
	return document.getElementById(id).checked;
}

function getId(id) {
	return document.getElementById(id);
}
function setIdStyle(id, prop, val) {
	getId(id).style[prop] = val;
}
function setHide(id) {
	setIdStyle(id, 'display', 'none');
}
function setBlock(id) {
	setIdStyle(id, 'display', 'block');
}

// 탭메뉴에 있는 아이디로 디스플레이 (탭)전환
function setForm(id) {
	var arr = getHideFormArr(id);
	for (var i = 0; i < arr.length; i++) {
		setHide(arr[i]);
	}
	setBlock(id);
	document.getElementById(id).style.display = 'block';
}
// 탭 전환을 위한 것임
function getHideFormArr(id) {
	var result = [];
	var parentNode = document.getElementById('formbox');
	var siblingNode = parentNode.firstChild;
	
	while (siblingNode) {
		if (siblingNode.nodeType === 1 && siblingNode.id !== id) {
			result.push(siblingNode.id);
		}
		siblingNode = siblingNode.nextElementSibling;
	}
	return result;
}

// 스크립트 선택에서 스토리지에 저장된 타이틀들을 불러와 select에 배치시킴
function setScriptMenu() {
	// 여기에 스크립트 목록들 인덱스 순서대로 된 상태로 타이틀만 불러옴
	var arr = fm.getScriptNameArr();
	// 코드
	var result = '';
	// 선택되어 있을 얘 위치 (그건 따로 sys.js에서 불러오게 될거임)
	var selectedId = 0;
	
	for (var i = 0; i < arr.length; i++) {
		result += ('<option value="'+i+((selectedId==i)?'" selected':'"')+'>');
		result += (arr[i]+'</option>');
	}
	
	document.getElementById('selectScriptMenu').innerHTML = result;
}
// select에 선택을 바꿀 때마다 호출되는 함수
function selectScript(e) {
	var val = parseInt(e.value);
	
	
}

// 설정 완료하고 시작하자마자 실행하는 함수들 (설정화면이 사라지고 다른 화면이 나옴)
function startDisplay() {
	var inTime = parseInt(getValue('inTime'));
	var outTime = parseInt(getValue('outTime'));
	var stopTime = getChecked('useStop') ? parseInt(getValue('stopTime')):0;
	
	var bgMode = getBgMode();
	setBackgroundStyle(bgMode);
	document.getElementById('setting').style.display = 'none';
	document.getElementById('gp').style.display = 'block';
}

function getBgMode() {
	return (getChecked('bgModeLungs')?'lungs':(getChecked('bgModeBeach')?'beach':''));
}
function setBackgroundLungs() { setBackgroungStyle('lungs'); }
function setBackgroundBeach() { setBackgroungStyle('beach'); }
// 백그라운드 배경 지정
function setBackgroundStyle(id) {
	if (document.getElementsByTagName("head") != null) {
		document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", '<link href="css/'+id+'.css" rel="stylesheet" id="gpcss">');
		document.getElementById('gpcss').href = ("css/"+id+".css");
	}
}
function changeBackgroundStyle(id) {
	document.getElementById('gpcss').href = ("css/"+id+".css");
}


// 설정 완료 후 숨을 쉴 준비 완료하고 시작할 때 실행하는 함수
function startTimer() {
	// 주로 스페이스 바를 눌러 시작하거나 한다.
	// 아니면 마우스 커서로 서브타이틀 또는 타이틀을 누름으로 시작한다.
}

//// 시간 제어를 위한 함수들


// 그 렁스 되는 gp가 움직이기 시작. IN (stop) OUT 움직임이 나타난다.
function activeGP() {
	
}



//// 자막 표시를 위한 함수들


function showSubtitleCC(p) {
	document.getElementById('subt').innerHTML = p;
}
function showContentCC(p) {
	document.getElementById('cont').innerHTML = p;
}

// 현재 상태 표시 영어
function den(p) {
	document.getElementById('moden').innerHTML = p;
}
// 현재 상태 표시 한국어
function dko(p) {
	document.getElementById('modek').innerHTML = p;
}


// 아마도 콘텐츠 순서 기억하기 위함
var contentIndex = 1;




// 이거는 지막인데 자막 위치를 설정하는 함수들임







