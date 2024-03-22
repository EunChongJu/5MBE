
// 지금 이 editor.js와 sys.js의 fm 클래스는 각각 따로 구분되어 있으나 일부 부분에서 따로 나뉘어 있다.
// 이 부분을 어떻게 중복을 제거하고 병합하여 최선의 코드를 만들어 낼 수 있을까?



// FMBE 클래스
var fm = null;

// 클래스는 일단 아래 다 만들고 나면 하면 됨

// 스토리지에 있는걸 임시로 여기에 저장하게 하여 웹 스토리지 과부하를 줄이기 위함.
var storageArr = [];

// 여기 직관적으로 실행되는 것을 볼 수 있는 곳은 위의 섹션에 배치하고,
// 위 섹션에 배치된 함수 내 실행되는 함수들은 가운데에,
// 위와 가운데서 모두 필수적으로 공통된 부분을 함수로 저장한 곳은 아래 섹션에 저장하도록 한다.

// 현재 작업중인 스크립트 번호 (0부터 시작. 후에 1부터로 변경할 가능성 있음)
var scriptIndex = 0;
// 현재 작업중인 컨텐츠 번호 (컨텐츠는 1부터 시작, 0번은 타이틀로 표시안함)
var contentIndex = 1;
// 현재 작업중인 서브타이틀 위치의 컨텐츠 번호 (얘는 순서대로가 아닌 컨텐츠 번호 체계와 같음)
var subtitleIndex = 1;

// IDEA:: 먼저 스토리지에 scriptIndex번째 스크립트를 (배열 형태로) 불러와 여기서 작업 처리를 한다.
// 그리고 나서 몇번째 컨텐츠를 변경하거나 어디서 추가를 하거나 타이틀을 수정하고 그런거는 불러온 그 배열 안에 처리하는 것이다. (일일이 스토리지를 불러올 필요 없다)
// 그리고 변경 횟수를 정해두면 자동 스토리지 저장을 만들 수 있게 될 것이다. 예를 들면 배열 내 20번 변경(수정/추가/삭제 등)하면 자동 스토리지에 저장된다.
// 또한 중간에 사용자가 직접 저장을 원한다면 따로 저장 버튼을 누를 수 있게 해둔다. 이걸로 직접 스토리지에 저장할 수 있다.
// 스토리지 저장은 여기가 아닌 fm에서 배열을 받아 일일이 직접 처리를 해야 한다. 그렇지만 클래스가 분리되어 혼잡을 피할 수 있을 것이다.
// 스토리지 저장은 이(배열, for)를 통해 일일이 처리하게 될 것이다. 이 관할은 아니다.

// 로드 완료하고나면 첫번째로 실행될 함수
function startEditor() {
	// 5MBE 클래스를 생성하고 저장후 사용준비 완료배치
	fm = new FMBE();
	fm.initStorage();
	// 스크립트 타이틀을 셀렉트에 표시하고 작업위치를 초기화
	setScriptSelect();	// 셀렉트의 코드를 추출하고 탑재 완료.
	selectScript(0);	// 새로 선택하면 처음부터로 초기화(옵션부터 1로 재설정하는 등)
	loadScript(0);	// 처음부터로, 그리고 스크립트를 불러옴
}

// 셀렉트에 있는 스크립트를 고르고 나면 실행될 함수 (onchange에 의해 실행)
function selectScript(n) {
	n = parseInt(n);
	
	document.getElementById('scriptList').selectedIndex = n;
	
	// (('scriptList').selectedIndex == ('scriptList').length-1)하면 됨
	// Add 부분은 맨 끝에 있으므로 selectedIndex 값은 8로 뜬다.
	// 그리고 document.getElementById('scriptList')의 length 값은 9이므로 -1 해서 산출하면 된다.
	
	// select 중 맨 마지막 옵션이 바로 '추가'라는 옵션임
	if (n == 999) {
		n = getLengthOfSelectScript()-1;
		
		var newArr = ['제목@파일네임','내용@서브타이틀'];
		storageArr = newArr;
		// 여기서 값이 들어오지 않음을 확인 = 오류
		// 그리고 새로 추가한걸 스토리지에 저장해야 셀렉트에 새로 갱신할 수 있다.
	}
	
	scriptIndex = n;
	contentIndex = 1;
	subtitleIndex = 1;
	
	// 스토리지 불러와 저장하는거 아직 없음
	storageArr = [scriptIndex]
	
	// 여기 버그 발견했는데, 타이틀 또는 서브타이틀에서 @이 누락된 것은 undefined로 표시된다.
	// 이를 타이틀에선 @이 없는 그대로, 서브타이틀에서는 비워두는 모습으로 처리해야 한다.
	
	setTitle(n);
	setSubtitle(n);
	setFirstContent(n);
	
	movePage(1);
}
// select의 총 갯수를 구해다줌
function getLengthOfSelectScript() {
	return document.getElementById('scriptList').length;
}
// 타이틀 내용을 불러와 표시
function setTitle() {
//	setValue('title', fm.getScriptTitle(n));
	var val = '';
	val = storageArr[0];
	console.log(val);
	setValue('title', val);
}
// 첫번째 컨텐츠 그룹의 서브타이틀을 불러와 표시
function setSubtitle(n) { setValue('subt', fm.getSubtitle(n,1)); }
// 첫번째 페이지 내용을 불러와 표시
function setFirstContent(n) { setValue('cont', fm.getContent(n,1)); }


// 버튼 등 표시 갱신 (추가, 수정, 삭제 등 할 때마다 갱신)
function showBtnUpdate() {
	showPrevBtn();
	showNextBtn();
	updatePageList();
}
// 이전 페이지로 이동 버튼을 표시 (없다면 누르지 못하게 표시) (그리고 없는 버튼을 페이지 추가할 때 다시 표시되도록 해야 함)
function showPrevBtn() {
	document.getElementById('prevContent').disabled = !(contentIndex > 0);
//	document.getElementById('prevContent').style.display = ((contentIndex > 0)?'block':'none');
}
// 다음 페이지로 이동 버튼을 표시 (없다면 누르지 못하게 표시)
function showNextBtn() {
	document.getElementById('nextContent').disabled = !(contentIndex < storageArr.length);
//	document.getElementById('nextContent').style.display = ((contentIndex < storageArr.length)?'block':'none');
}


//// 아래 있는 페이지로 이동 함수 모두 n번째 페이지로 이동 함수로 실행됨

// 이전 페이지로 이동
function movePrev() {
	console.log('prev');
	movePage(contentIndex-1);
}
// 다음 페이지로 이동
function moveNext() {
	console.log('next');
	movePage(contentIndex+1);
}

// n번째 페이지로 이동
function movePage(n) {
	if ((n > 0) || (n < storageArr.length)) {
		contentIndex = n;
		showBtnUpdate();
		setValue('cont', storageArr[n]);
	}
}

// 페이지 목록 표시
function showPageList() {
	
}
function getCodePageList() {
	
}

// 페이지 목록을 갱신
function updatePageList() {
	var code = '<div class="pages">';
	
	for (var i = 0; i < storageArr.length; i++) {
		if (storageArr[i].indexOf('@') != -1) {
			code += '<button class="gf"></button>';
		}
		code += '<button class=""></button>';
	}
	code += '</div>';
	
	setCode('pageMenu', code);
}




//// 여기서부터 가운데 섹션이라 한다.

// 스크립트 목록을 셀렉트에 표시하는 함수
function setScriptSelect() {
	var scriptArr = fm.getScriptNameArr();
	var code = '';
	for (var i = 0; i < scriptArr.length; i++) {
//		code += '<option value="'+i+'"'+((i==0)?' selected>':'>');
		code += '<option value="'+i+'">';
		code += scriptArr[i];
		code += '</option>';
	}
	code += '<option value="999">Add</option>';
	
	setCode('scriptList', code);
}


// 내용에서 타이틀, 서브타이틀을 걸러내 컨텐츠와 파일 네임을 반환
function removeTitle(p) {
	if (isString(p)) {
		var arr = p.split('@');
		return arr[0];
	}
	return '';
}

// 지금 작업중인 위치를 아이디로 반환 (이미 저장되어 있어 파라미터는 필요없음)
function getCurrentId() {
	return fm.getStorageId(scriptIndex, contentIndex);
}




// 웹 스토리지에 저장된 n번째 스크립트를 불러와 storageArr에 저장함
function loadScript(n) {
	fm.setScriptIndex(n);
	
	var idArr = fm.getScriptId();
	console.log(idArr);
	
	storageArr = fm.getStorageArr(idArr);
}
// n번째 스크립트를 수정하고 스토리지에 저장
function saveScript(n) {
	fm.setScriptIndex(n);
	
}

function addPage() {
	storageArr.push();
}





//// 수정될 때마다 실행되는 함수들 (아래)

// title
function saveTitle() {
	var val = getValue('title');
	console.log('save title', val);
	
	if (val.length == 0) {
		// 비어있을 때는 따로 처리해야 한다.
		val = '';
		// 
	}
}

// subtitle
function saveSubt() {
	var val = getValue('subt');
	console.log('save subtitle', val);
	
	if (val.length == 0) {
		// 비어있을 때는 따로 처리해야 한다.
		val = '';
		// 
	}
}

// content
function saveCont() {
	var val = getValue('cont');
	console.log('save content', val);
	
	if (val.length == 0) {
		// 비어있을 때는 따로 처리해야 한다.
		val = '';
		// 
	}
}









//// 아래 섹션이라는 곳임: 중복되는 함수들의 공통점(예를 들어 document.getElementById() 등)을 또 하나의 함수를 만들어서 처리한다.

// id에 code를 배치
function setCode(id, code) {
	document.getElementById(id).innerHTML = code;
}
// 함수들이 에러가 발생함을 방지하기 위함, 반드시 스트링이여야 한다.
function isString(val) {
	return (typeof val === 'string');
}
// 값을 설정
function setValue(id, val) {
	document.getElementById(id).value = val;
}
// 가끔 값을 가져와야 할 때가 있음
function getValue(id) {
	return document.getElementById(id).value;
}
// disabled 값 설정
function setDisabled(id, bool) {
	document.getElementById(id).disabled = bool;
}
// 

