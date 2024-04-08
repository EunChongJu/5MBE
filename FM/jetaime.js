

// 이 스크립트가 할 일: 설정한 그대로 코딩을 하여 호흡(?) 페이지를 생성하는 것


// 이 시스템은 단지 프레임 내 호흡 페이지 화면을 표시하고 스타일링을 하는 것 뿐이다.
// 그러므로 화면 내 시간에 따른 변화 같은 역할은 이 시스템이 아닌 timer가 한다.

// 이 시스템을 사용하는 목적은 다음과 같다.
// 호흡 페이지 전체 표시를 위함 (프레임을 전체화면으로 채움)
// setting에서 표시를 미리 보기 위함 (프레임을 제한 범위내 적용)

// 이 시스템의 절차는 다음과 같다.

// 먼저 html 코딩을 한다.
// 이때 오브젝트는 fm 클래스의 영향을 받지 않으므로 그대로 추가한다.
// 그리고 아래 글이 표시되는 자리는 fm 클래스 내 설정값의 표시여부에 따라 추가한다.
// 코딩을 완료하면 전체를 합하여 지정 아이디에 코딩한 코드를 삽입(innerHTML)하여 저장한다.

// 그다음 스타일링을 한다. 스타일링에서 추상적 단위와 세부적 단위로 나뉜다.
// 추상적 단위는 이미 css에 정의되어 있는 것이고, 세부적 단위는 객체의 style을 정하는 것이다.
// 여기서 fm 클래스의 설정값에 따라 오브젝트들의 상세 위치를 조정하고 스타일링을 한다.
// 그다음으로 설정값에 따라 시간표시나 자막 등 자막 박스들의 위치를 조정하고 스타일링을 한다.

// 그다음 표시될 자막들을 (있으면) 미리 코딩한다.	(없으면 그것은 setting의 sample임)
// webStorage 내 저장되어 있는 자막들을 표시에 최적화되도록 코딩한다.
// 예를 들어 이탤릭체로 표시하게 한 자리는 이탤릭체로 표시할 수 있는 태그로, 굵게 표시는 굵게 표시할 수 있는 태그로 바꾼다.
// 그것처럼 fm 설정값에 따라 마저 스타일링을 한다.
// 그렇게 코딩된 자막들은 스토리지가 아닌 새로운 배열 변수에 저장한다.
// 저장된 배열 변수는 timer에게 넘어간다. timer가 자막을 바꿀 때마다 사용할 것이다.


// 클래스
var fm = null;


// jt에서 쓰이는 아이디
// getElementById() 찾을 때 이 아이디로 찾게 된다. 또한 이것의 서브들도 아이디들의 접두사로 활용하게 된다.
var jtId = 'gp';

// terudy?

function start() {
	fm = new FM();
	coding();
}

function coding() {
	var code = a();
	document.getElementById('jt').innerHTML = code;
}


//// html 코딩을 함

// jt 내 표시될 코드를 반환
function a() {
	var result = '';
	result += aStart();
	result += ac();
	result += af();
	
	
	result += aEnd();
	return result;
}

// 맨 처음 부분 코드
function aStart() {
	var result = '<div class="jt" id="'+jtId+'">';
//	var result = '<div class="jt" id="'+jtId+'" onclick="startTimer();"><div>';
	return result;
}
// 맨 끝 부분 코드
function aEnd() {
	var result = '</div>';
	return result;
}

// 설정값 상관없이 변동 없이 반환하는 함수
function ac() {
	var result = '';
	result += '<div class="jtin">';
	result += '<div id="'+jtId+'Background" class="jtbg">';
	result += '<div id="'+jtId+'Limit" class="jtlm">';
	result += '<div id="'+jtId+'Movement" class="jtmv">';
	result += '<div id="'+jtId+'Boundary" class="jtbd">';
	result += '</div></div></div></div></div>';
	return result;
}

// fm 클래스의 설정값에 의해 더하고 빼게 되는 코딩 함수
function af() {
	var result = '';
	result += '<div class="jtsub">';
	result += '<div id="ccer">';
	result += '<p id="subt">서브타이틀</p>';
	result += '<p id="cont">컨텐츠는 곧 내용이라.</p>';	// 그거 내용은 timer가 바꾸게 될 것이다. 그러므로 jtId는 적용 안함
	result += '</div>';
	result += '';
	/*
	if (checkUseJt(98, 15)) {	// 분명 설정값 어딘가에 타이머 표시 여부 값이 있다.*/
		result += '<div id="timer">';
		result += '<p id="time">00:00</p>';
		result += '</div>';/*
	}
	if (checkUseJt(98, 16)) {	// 그 값은 true/false만 있을 것이므로 일단 1인지 확인한다.*/
		result += '<div id="titler">';
		result += '<p id="title">타이틀[제목]</p>';	// 여기는 내용을 바꾸기 위한 것 뿐, 표시되고 사라지는건 상위가 할 일.
		result += '</div>';/*
	}
	if (checkUseJt(98, 17)) {*/
		result += '<div id="moder">';
		/*if (checkUseJt(98, 18))*/ result += '<p id="moden">OUT</p>';
		/*if (checkUseJt(98, 19))*/ result += '<p id="modek">날숨</p>';
		result += '</div>';/*
	}
	*/
	result += '</div>';
	return result;
}

// 이 함수는 설정창의 미리보기에 띄우는 것이면 false, 그것이 아니면 fm의 설정값을 확인하여 반환한다.
function checkUseJt(tid, sid) {
	return ((tid > 90)?(fm.getData(getDataId(tid, sid)) == 1):false);
}



//// 오브젝트나 자막 박스 같은 얘들을 조정한다.

// 먼저 오브젝트 모드 행태가 어떤 타입인지 확인하여 처리한다. (Lungs/Beach) (나중에 새로운 모드가 추가되면 그 역시 반영될 예정)
function isMode() {
	var mode = fm.getData(98,10);
	if (mode == 1) {
		// Lungs
		setModeLungs();
	}
	else if (mode == 2) {
		// Beach
		setModeBeach();
	}
	else {
		// 이거 그냥 대충 하는 의미로 사각형 전체화면에 중앙 배치한 형태로 중앙 확대/축소 형태로 하는걸로
	}
}

// Lungs Mode(렁스 모드)로 설정한다.
function setModeLungs() {
	// 클래스를 추가한다.
	addClassName(jtId+'Background','lsbg');
	addClassName(jtId+'Limit','lslm');
	addClassName(jtId+'Movement','lsmv');
	addClassName(jtId+'Boundary','lsbd');
	// 기존의 클래스를 삭제한다.
	removeClassName(jtId+'Background','bcbg');
	removeClassName(jtId+'Limit','bclm');
	removeClassName(jtId+'Movement','bcmv');
	removeClassName(jtId+'Boundary','bcbd');
}
// Beach Mode(해변 모드)로 설정한다.
function setModeBeach() {
	// 클래스를 추가한다.
	addClassName(jtId+'Background','bcbg');
	addClassName(jtId+'Limit','bclm');
	addClassName(jtId+'Movement','bcmv');
	addClassName(jtId+'Boundary','bcbd');
	// 기존의 클래스를 삭제한다.
	removeClassName(jtId+'Background','lsbg');
	removeClassName(jtId+'Limit','lslm');
	removeClassName(jtId+'Movement','lsmv');
	removeClassName(jtId+'Boundary','lsbd');
}

// 이 아이디에 이 클래스 이름을 추가한다.
function addClassName(id, name) {
	document.getElementById(id).classList.add(name);
}
// 이 아이디에 이 클래스 이름을 삭제한다.
function removeClassName(id, name) {
	document.getElementById(id).classList.remove(name);
}



// 그리고 오브젝트 타입에 따라 크게 추상적으로 스타일을 바꾼다.
// 예를 들어 Lungs면 Limit을 둥글게 하고 화면 중앙에 배치하고, Beach면 width를 100% 채우고 height만 절반 크기로 채우고 배치한다.


// 이후 설정 값에 따라 세부적으로 스타일링을 한다.
// 예를 들어 Lungs에서 Limit의 화면 중앙 배치에서 top이 50%가 아닌 45%로 배치하거나 자막 박스를 바꾸거나 한다.


// 여기서 의외로 자막 박스 같은 얘는 저 아래 자막 계열 범위가 아닌 여기서 한다.

// 자막 박스 위치 조정

function setCCBox(id, top, left) {
	document.getElementById(id).style.top = top+'%';
	document.getElementById(id).style.left = left+'%';
	// transform:translate(-50%, -50%); 같은 얘는 추상적 단위에서 이미 스타일링했으므로 필요없음
}

// 자막 박스 배경 조정 (색상이나 투명도를 조정함, 박스 사용 안하면 배경 투명도 100%)

// 자막 박스 테두리 조정







//// 자막을 코딩하고 스타일링을 한 다음 timer에 넘긴다.

// 먼저 자막이 있는지 확인한다. (없으면 아래 함수는 사용할 일이 없음)


// 그리고 각 자막들을 하나한 해석하여 스타일링 적용할 기호를 발견하면 그에 맞게 코드로 변환한다.
// 변환된 코드는 timer에 넘기게 될 새로운 배열 변수에 추가하여 저장한다.
// 저장을 완료하면 timer에 넘긴다.
// (넘기는 방법을 생각해봤는데 역시 fm.Temp가 좋을 것 같다)
// (그 변수를 넘기려면 jetaime, timer 둘다 소환해야 하므로 fm.Temp를 사용해 넘겨받아 처리한다)


// 굵게 (스타일링은 클래스가 다 함, css:: font-weight:bold;)
function getBold(p) {
	return '<b>'+p+'</b>';
}

// 이탤릭체 (스타일링은 클래스가 다 함)
function getItalic(p) {
	return '<i>'+p+'</i>';
}

// 밑줄
function getIns(p) {
	return '<ins>'+p+'</ins>';
}

// 취소선
function getDel(p) {
	return '<del>'+p+'</del>';
}

// 윗첨자 (css:: vertical-align:; / vertical-align:25%;)
function getSup(p) {
	return '<sup>'+p+'</sup>';
}

// 아래첨자 (css:: vertical-align:sub; / vertical-align:-25%;)
function getSub(p) {
	return '<sub>'+p+'</sub>';
}

// 형광펜 같이 그은 모습
function getMark(p) {
	return '<mark>'+p+'</mark>';
}

// 후리가나 같은 걸로 적용할 글자를 만듬
function getRuby(p,t) {
	return ('<ruby>'+p+'<rp>(</rp><rt>'+t+'</rt><rp>)</rp></ruby>');
}


// 네온문자로 만들 글자
function getNeon(p) {
	return '';
}

// 설정값에 따라 표시될 네온문자 스타일링한다.






