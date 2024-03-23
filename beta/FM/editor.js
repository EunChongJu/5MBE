// 

var fm = null;

// 현재 작업중인 스크립트 위치
var scriptId = 0;

// 현재 작업중인 스크립트의 내용 위치
var contentIndex = 1;
// 현재 표시중인 스크립트 서브타이틀
var subtitleIndex = 1;

// 현재 작업하는데 필요한 배열 변수
// 스토리지를 일일이 불러오고 저장하는 것보다 효율적으로 작업하기 위한 것으로 중간자 매개채 열할을 한다.
var storageArr = [];



// 로드 완료하고 난 후 실행하는 함수
function startEditor() {
	// 클래스를 시작
	fm = new FM();
	// 클래스를 초기화
	fm.initStorage();
	
	// 스크립트 타이틀들을 표시 (select 업데이트)
	updateScriptList();
	
	// 작업하게 될 스크립트는 스토리지에 저장된 첫번째 스크립트인 select의 첫번째로, value 값이 0이므로 위치를 0으로 설정한다.
	scriptId = 0;
	// 이 스크립트로 초기화시켜 서브타이틀과 내용을 각각 subt, cont에 표시하도록 한다.
	contentIndex = 1;
	subtitleIndex = 1;
	
	loadScript();
	
	
	
	// 또한 내용들을 pageList에 표시화하고, 이전/다음 버튼 활성화를 조정하도록 한다.
	updatePageList();
	
	// 
	
}

// 저장된 스크립트들 이름만 뽑아 select 내 option들이 표시되도록 코드로 추출
// 스크립트가 새로 갱신될 때마다 제목들이 새로고침 된다. (ex: 스크립트 추가 또는 삭제 등)
function updateScriptList() {
	var code = '';
	var scriptArr = fm.getScriptNameArr();	// fm에서 스크립트 네임 목록을 불러와 저장한다.
	
	for (var i = 0; i < scriptArr.length; i++) {
		code += '<option value="'+i+'">';
		code += scriptArr[i];
		code += '</option>';
	}
	
	// 마지막에 스크립트 추가하기 Add를 추가한다.
	code += '<option value="999">추가하기</option>';
	
	// 코드를 완료하면 select에 업데이트한다.
	document.getElementById('scriptList').innerHTML = code;
}


// select 내 onchange에 의해 option 선택이 바뀔 때마다 실행하는 함수
function setScript() {
	var val = parseInt(document.getElementById('scriptList').value);	// 이건 값이고 변경이 불가
	var select = document.getElementById('scriptList').selectedIndex;	// 이건 선택 인덱스고 변경 가능
	var len = document.getElementById('scriptList').length	// 이건 선택지 갯수를 알려줌. 변경 불가
	
	// 여기서 옵션들 중 Add만이 진정한 스크립트 추가의 기능을 수행한다.
	if ((val == 999) && (select == (len-1))) {
		val = len-1;
		fm.addScript(val);	// 스크립트를 새로 만들게 되므로 아이디 값을 새로 발급함
		updateScriptList();	// 추가된 스크립트 목록을 업데이트함.
		document.getElementById('scriptList').selectedIndex = val;
	}
	
	// 먼저 스크립트 아이디를 현재 작업 아이디에 저장한다.
	scriptId = val;
	
	// 그 외에는 단순하게 스크립트를 불러와 표시해내는 기능만 한다.
	loadScript();
	
	// 그 다음 페이지 리스트를 불러온 스크립트를 기반으로 업데이트 한다.
	updatePageList();
	
	// 버그 : 새로운 스크립트를 불러오고 나서 페이지 리스트 업데이트하는데 현재 위치가 틀림(contentIndex 같은 얘 갱신안해서 그럼)
}

// 초기화된 작업할 스크립트를 subt와 cont에 표시한다. (즉 이 스크립트의 0번째와 1번째 라인만 표시한다)

// 스크립트를 로드하고 인풋에 값을 배치하고 표시하는 함수 (onload 완료할 때와 select의 onchange할 때마다 실행함)
function loadScript() {
	// 작업하게 될 스크립트를 작업하기 위한 중간 매개체 역할 위치에 스크립트를 불러와 저장.
	storageArr = fm.getScriptStorageArr(scriptId);
	
	// contentIndex 값은 위치 값이 초기화하는 동시에 첫 페이지로 로드하여 표시한다.
	movePage(0);
}

// p값을 타이틀 인풋에 배치
function setTextTitle(p) {
	if (checkAt(p)) p = getSplitAt(p)[1];
	setValue('title', p);
}
// p값을 subt 인풋에 배치
function setTextSubt(p) {
	if (checkAt(p)) p = getSplitAt(p)[1];	// 근데 문제는 subt가 아예없는 스크립트에 내용이 subt에 표시된다는 것이다.
	setValue('subt', p);
}
// p값을 cont 인풋에 배치
function setTextCont(p) {
	if (checkAt(p)) p = getSplitAt(p)[0];	// 그것은 이 함수들이 문제가 아닌 함수 사용에 있어 무언가가 문제가 존재한다.
	setValue('cont', p);
}

//// 페이지 위치를 바꿀 때마다 실행하는 함수들, 이전/다음 버튼을 누르거나 페이지리스트 버튼을 누를 때 실행됨

// contentIndex 위치가 1부터 len까지 그 안에 있으면 유효한것이나 이 범위를 벗어나면 오류가 된다.

// 이전 (현 위치에서)
function movePrev() {
	movePage((contentIndex-1)-1);
}

// 다음 (현 위치에서)
function moveNext() {
	movePage((contentIndex-1)+1);
}

// 페이지 위치, n으로 이동 (이놈은 pageList와 관련이 없다)
function movePage(n) {
	// 0 <= n < storageArr.length-1 (len-1 한거는 타이틀 자리 하나 뺀거라 그럼)
	if (!((n >= 0) && (n < storageArr.length-1))) return -1;
	// n부터 유효성 검사를 실시하여 통과하면 아래 코드들을 실행하도록 한다.
	
	console.log('movePage Index: ', n);
	
	// n의 값은 0부터 len-1 값까지 (pageList의 인덱스 값임, 그 버튼의 번호 입력에 최적화됨)
	// contentIndex의 값은 1부터 len 값까지 (storageArr의 인덱스 값임, storageArr 저장에 최적화됨)
	
	// 페이지 이동하면 당연히 contentIndex 위치 값이 변경되어야 한다.
	contentIndex = (n+1);
	
	// 먼저 값 표시된거 갱신부터 먼저한다.
	
	var titleVal = storageArr[0];
	setTextTitle(titleVal);
	
	var subtVal = storageArr[subtitleIndex];	// 근데 어디서 subtitleIndex 값을 수정할 기회를 포착하고 수정해야 할까?
	setTextSubt(subtVal);
	
	var contVal = storageArr[contentIndex];
	setTextCont(contVal);
	
	// 마무리로 페이지 현 위치를 갱신한다.
	updateNowPage(n);
	
	return n;
}


// 초기화된 작업할 스크립트의 내용 갯수 등을 표시할 pageList를 생성한다.
// 스크립트 내 내용이 추가되거나 삭제될 때 실행된다. 그리고 현위치 표시는 다른 함수가 한다.
function updatePageList() {
	var code = '<div class="pages">';
	// 인덱스 0은 스크립트의 네임과 타이틀만 저장하는 위치이므로 1부터 시작한다.
	for (var i = 1; i < storageArr.length; i++) {
		code += '<button';
		if (checkAt(storageArr[i])) {
			code += ' class="gf"';
		}
		code +=  '></button>';
	}
	code += '</div>';
	
	document.getElementById('pageList').innerHTML = code;
	updateNowPage(contentIndex-1);
}

// 페이지 리스트에서 현재 위치를 표시함 (n의 값은 pageList의 인덱스 값임)
function updateNowPage(n) {
	
	// n의 값은 0부터 len-1 값까지 (pageList의 인덱스 값임, 그 버튼의 번호 입력에 최적화됨)
	// contentIndex의 값은 1부터 len 값까지 (storageArr의 인덱스 값임, storageArr 저장에 최적화됨)
	
	// 그 긴 줄의 코드를 생략
	var pageList = document.getElementById('pageList').childNodes[0];
	
	if ((n >= 0) && (n < pageList.childNodes.length)) {
		// 먼저 기존의 on 위치를 해제하고, 현재 on 위치를 설정한다. (만약 값이 같으면 그건 위치가 같으므로 생략)
		var nowIndex = findNowPage();
		if (nowIndex != -1) {
			pageList.childNodes[nowIndex].classList.remove('on');
		}
		pageList.childNodes[n].classList.add('on');
	}
}

// 페이지 리스트 안에서 on을 찾아 위치 반환
function findNowPage() {
	var pageList = document.getElementById('pageList').childNodes[0];
	
	for (var i = 0; i < pageList.childNodes.length; i++) {
		if (pageList.childNodes[i].classList.contains('on')) return i;
	}
	
	return -1;
}

// 이전/다음 버튼 활성화를 조정한다.
function setImpossibleClickPrev() {
	setDisable('prevContent', true);
}
function setPossibleClickPrev() {
	setDisable('prevContent', false);
}
function setImpossibleClickNext() {
	setDisable('nextContent', true);
}
function setPossibleClickNext() {
	setDisable('nextContent', false);
}







//// storageArr[0]은 제목 또는 스크립트 네임이기 때문에 아래 함수에서 0은 받지 않는다.

// 이전 subt 위치 반환 (없으면 -1)
function findPrevSubt(n) {
	var result = -1;
	if ((n <= 0)||(n >= storageArr.length)) return result;
	
	for (var i = (n-1); i >= 0; i--) {
		if (checkAt(storageArr[i])) return i;
	}
	
	return result;
}
// 다음 subt 위치 반환 (없으면 -1)
function findNextSubt(n) {
	var result = -1;
	if ((n <= 0)||(n >= storageArr.length)) return result;
	
	for (var i = (n+1); i < storageArr.length; i++) {
		if (checkAt(storageArr[i])) return i;
	}
	
	return result;
}


// 이 함수는 소환된 위치의 prevSubt 값이 기존 위치의 nextSubt 값보다 크거나 일치하면, 소환된 prevSubt 값을 subtitleIndex에 저장한다. (n의 값은 소환된 위치다)
// 위의 설명을 위해 이 함수는 단순히 소환된 위치의 prevSubt와 기존의 nextSubt의 값을 비교하여 true/false 값을 반환한다.
// 이 함수는 n의 값이 기존 위치 값보다 커야 한다는 전제가 있다.
function a1(n) {
	return (findPrevSubt(n) >= findNextSubt(subtitleIndex));
}
// 이 함수는 소환된 위치의 nextSubt 값이 기존의 prevSubt 값보다 작거나 일치하면, 소환된 위치의 nextSubt 값을 subtitleIndex에 저장한다. (n의 값은 소환된 위치다)
// 위의 설명을 위해 이 함수는 단순히 소환된 위치의 nextSubt와 기존의 prevSubt의 값을 비교하여 true/false 값을 반환한다.
// 이 함수는 n의 값이 기존 위치 값보다 작아야 한다는 전제가 있음.
function a2(n) {
	return (findNextSubt(n) <= findPrevSubt(subtitleIndex));
}










//// 새로 값이 바뀔 때마다 실행되는 함수들

// 타이틀 값 갱신 저장
function saveTitle() {
	var val = getValue('title');
	console.log('edit and save the title!');
}

// subt 값 갱신 저장
function saveSubt() {
	var val = getValue('subt');
	console.log('edit and save the subtitle!');
}

// cont 값 갱신 저장
function saveCont() {
	var val = getValue('cont');
	console.log('edit and save the content!');
}

// 타이틀은 타이틀 인풋 값을 그대로 가져오는게 아니라 타이틀에 스크립트 이름까지 합쳐 스크립트에서 첫번째 라인에 저장된다.
// 특히 subt, cont은 저장할 때마다 (subt + '@' + cont) 값으로 갱신되어 저장된다.

// 언제 스크립트 중간체가 스토리지에 전체 저장되는지는 따로 지정하여 저장하면 된다.














// @의 앞부분 추출 (스크립트 이름이나 컨텐츠 되는 내용을 반환)
function getBeforeAt(p) {
	if (isString(p)) return getSplitAt(p)[1];
	return '';
}

// @의 뒷부분 추출 (서브타이틀 및 타이틀을 반환)
function getAfterAt(p) {
	if (isString(p)) return getSplitAt(p)[0];
	return '';
}

// 내용에서 타이틀, 서브타이틀을 분리후 배열로 반환 ('@' 기준으로 없으면 그냥 [~]로 반환됨)
function getSplitAt(p) {
	if (isString(p)) {
		if (checkAt(p)) {
			return p.split('@');
		}
		return p;
	}
	return '';
}

// @ 여부 확인 (있으면 true 반환)
function checkAt(p) {
	if (isString(p)) {
		return ((p.lastIndexOf('@')) != -1);
	}
	else {
		return false;
	}
}

// 함수들이 값에 대해 스트링이 아니란 이유로 에러가 발생함을 방지하기 위함
function isString(val) {
	return (typeof val === 'string');
}






// 해당 아이디 값에 관한 모든것

function getValue(id) {
	return document.getElementById(id).value;
}
function setValue(id, val) {
	document.getElementById(id).value = val;
}
function getLength(id) {
	return document.getElementById(id).length;
}

// id의 disabled 값 조정
function setDisable(id, bool) {
	document.getElementById(id).disabled = bool;
}

