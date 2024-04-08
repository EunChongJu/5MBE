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

/*
	에디터에서 분명 무언가의 목적을 위한 기호가 사용될 것이다.
	그 기호들은 에디터에서 그대로 표시되며 스토리지에 그대로 저장될 것이다.
	그것은 jetaime가 아래의 기호를 사용한 코드를 실제로 표시하는데 사용될 코드로 변환할 것이다.
	그 변환된 코드들은 전부 timer가 시간에 따라 표시할 것이다.
	
	
	굵게
		*굵게*
	이탤릭체(기울임)
		/이탤릭체/
	굵은 이탤릭체 (굵게+이탤릭체)
		**굵은 이탤릭체**
	위첨자
		^^위첨자^^
	아래첨자
		,,아래첨자,,
	밑줄
		__밑줄__
	취소선
		--취소선--
	
	루비문자
		^:글자(아래):루비(위):^
	네온문자
		':네온문자:'
	
	
	띄어쓰기
	
	
	// 아래는 디스플레이의 스타일링 형태가 아닌 디스플레이의 특수한 목적을 위한 것이다.
	
	서브타이틀
		내용@서브타이틀
	
	??
		내용#??
	
	???
		내용\\\???
	
	
*/


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
	var val = parseInt(getValue('scriptList'));	// 이건 값이고 변경이 불가
	var select = getSeletedIndex('scriptList');	// 이건 선택 인덱스고 변경 가능
	var len = getLength('scriptList');	// 이건 선택지 갯수를 알려줌. 변경 불가
	
	// 여기서 옵션들 중 Add만이 진정한 스크립트 추가의 기능을 수행한다.
	if ((val == 999) && (select == (len-1))) {
		val = len-1;
		fm.addScript(val);	// 스크립트를 새로 만들게 되므로 아이디 값을 새로 발급함
		updateScriptList();	// 추가된 스크립트 목록을 업데이트함.
		document.getElementById('scriptList').selectedIndex = val;
	}
	
	// 먼저 스크립트 아이디를 현재 작업 아이디에 저장.
	scriptId = val;
	// 그 외에는 단순하게 스크립트를 불러와 표시해내는 기능만 한다.
	loadScript();
	
	// 그 다음 페이지 리스트를 불러온 스크립트를 기반으로 업데이트 한다.
	updatePageList();
}

// 초기화된 작업할 스크립트를 subt와 cont에 표시한다. (즉 이 스크립트의 0번째와 1번째 라인만 표시한다)

// 스크립트를 로드하고 인풋에 값을 배치하고 표시하는 함수 (onload 완료할 때와 select의 onchange할 때마다 실행함)
function loadScript() {
	// 작업하게 될 스크립트를 작업하기 위한 중간 매개체 역할 위치에 스크립트를 불러와 저장.
	storageArr = fm.getScriptStorageArr(scriptId);
	
	// 타이틀 표시를 한다.
	saveTitle();
	
	// contentIndex 값은 위치 값이 초기화하는 동시에 첫 페이지로 로드하여 표시한다.
	movePage(0);
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
	// n의 값은 0부터 len-1 값까지 (pageList의 인덱스 값 기준으로 pageList 버튼 입력에 최적화됨)
	// contentIndex의 값은 1부터 len 값까지 (storageArr의 인덱스 값 기준으로 storageArr 저장에 최적화됨)
	
	// 버튼 클릭 가능 유무 업데이트
	updatePageButtons(n);
	
	// 페이지 이동으로 contentIndex 위치 값 변경
	contentIndex = (n+1);
	
	// 먼저 페이지에 표시된거 갱신부터 먼저한다.
	
	// subtitle
	updateSubtitle();
	
	var contVal = storageArr[contentIndex];
	setTextCont(contVal);
	
	
	// 마무리로 페이지 리스트에서 현 위치를 갱신한다.
	updateNowPage(n);
	
	return n;
}

// 페이지의 버튼 누르는 것에 대해 업데이트 한다.
function updatePageButtons(n) {
	// [0 <= n < storageArr.length-1] (len-1 값은 스크립트 내 cont. 총 갯수에서 타이틀 하나 뺀거)
	if (!((n >= 0) && (n < storageArr.length-1))) {
		setDisable('prevContent', true);
		setDisable('nextContent', true);
		return -1;
	}
	else {
		setDisable('prevContent', false);
		setDisable('nextContent', false);
	}
	// prev/next 버튼의 활성화 유무를 판별하여 설정한다. (false 클릭 가능, true: 클릭 불가)
	if (n <= 0) setDisable('prevContent', true);
	if ((n+1) >= storageArr.length-1) setDisable('nextContent', true);
	
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
		code += ' onclick="movePage('+(i-1)+')">';
		code +=  '</button>';
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





// 페이지가 이동거나 변경되면 이걸 실행하여 subt 값이 바뀐것을 보여주도록 하고, subt 위치를 변경한다.
function updateSubtitle() {
	var subtId = findSubtitleIndex(contentIndex);//////////////////////////////////////////////////////////////////////////////////////////////////////
	console.log('subtId:', subtId);
	
	if (subtId != -1) {
		setTextSubt(storageArr[subtId]);
		subtitleIndex = subtId;
		return;
	}
	
	// 거기서 subt가 없는 페이지에 도착하면 어떻게 해야 하나?
	// 먼저 subtitleIndex 위치부터가 문제다.
	
	setTextSubt('');
	subtitleIndex = 0;
	
	// subt 비우면 placeholder 나타나는거 어떻게 해야 할까?
}

// p값을 subt 인풋에 배치
function setTextSubt(p) {
	console.log('p:', p);
	console.log('checkAt:', checkAt(p));
	
	if (checkAt(p)) {
		console.log(getSplitAt(p));
		
		p = getSplitAt(p)[1];	// 근데 문제는 subt가 아예없는 스크립트에 내용이 subt에 표시된다는 것이다.
	}
	// 일단 p에 어쩌구하는거 문제는 없다. 결론은 subtitleIndex가 문제다.
	
	if (subtitleIndex == 0) {
		console.log('subtId:0');
		p = '';
	}
	console.log('subt:', p);
	setValue('subt', p);
}

// n의 위치에서 적정한 서브타이틀 위치를 알려준다. ((스토리지 기준)n의 위치에서 cont와 함께 표시될 subt의 위치, 없으면 -1)
function findSubtitleIndex(n) {
//	console.log(subtitleIndex, n);
	// 그놈시키가 문제는 loadScript에서 subtitleIndex 값을 0으로 설정하고 보니
	// 0부터 페이지를 로드하기 때문에 일단 subt부터 없다 가정하고 시작하니
	// 처음 페이지에서도 subt가 존재하는데 표시안되는 이상한 일이 있다.
	
	// 그냥 movePage에서 맨 처음 페이지에 해당되는거면 이게 서브타이틀 유무를 체크해 인덱스를 결정하고 표시하는게 좋을 것 같다.
	
//	if ((n==1) && !(checkAt(storageArr[1]))) return 0;
	
	// n의 위치 유효성 검사 (스토리지 기준이나 타이틀은 subt가 되지 못하므로 뺌)
	if ((n < 0)||(n >= storageArr.length)) return -1;
	
	// 만약 기존 subt 위치가 n과 같다면 그 위치를 반환한다.
	if (n == subtitleIndex) return subtitleIndex;
	
	for (var i = n; i > 0; i--) {
		if (checkAt(storageArr[i])) return i;
	}
	return -1;
}






//// 새로 값이 바뀔 때마다 실행되는 함수들

// p값을 타이틀 인풋에 배치
function setTextTitle(p) {
	if (checkAt(p)) p = getSplitAt(p)[1];
	setValue('title', p);
}

// 타이틀 값 갱신 저장
function saveTitle() {
	var val = getValue('title');
	console.log('edit and save the title!');
	
	var titleVal = storageArr[0];
	setTextTitle(titleVal);
	
	console.log(getSplitAt(storageArr[0]));
	// 그 타이틀을 비우면 설정에 따라 다음과 같이 두가지로 나뉜다.
	// 그거 만약에 비우면 말 그대로 비워졌다는 기호를 따로 배치시키고 끝낸다. (0)
	// 또는 비우면 다시 채우는데, 그 타이틀 이름은 스크립트 이름으로 불러온다. (1)
	
	// if 실행하기 전에 우선 비어있는 값인지 확인한다. 비어있으면 ''로 val 값으로 넘기고 아래로 간다.
	if (fm.getData(94, 20) == 1) console.log('비어있는거 이름으로 채우고 끝냄');
	
	
	
	
	// 마무리되면 아래와 같이 저장 처리하고 끝낸다.
	getBeforeAt(storageArr[0]) + '@' + val;
}

// subt 값 갱신 저장
function saveSubt() {
	var val = getValue('subt');
	console.log('edit and save the subtitle!');
	
	// 만약 수정한 위치가 subtitleIndex 위치라면 storageArr[subtitleIndex] 값을 수정하도록 한다.
	// 그러나 subtitleIndex 위치가 아닌 다른 위치에 있다면 그 즉시 그 위치에 새로운 subt를 만든다. (그리고 subtitleIndex 값을 바꾼다)
	// 만약 subt가 없는 (subt를 표시할게 없는) 그런 위치에 있다면 또한 그 위치에 새로운 subt를 만들고 한다.
	
	if (contentIndex == subtitleIndex) {
		storageArr[contentIndex] = (getBeforeAt(storageArr[contentIndex]) + '@' + val);
	}
	// 그거 @ 부분 경계로 내용이 바뀌는거 주의해야 한다.
	
	// 그런데 위에 적은 내용이 또한 편집설정에서 두가지 선택이 있는데 다음과 같다.
	// 중간에 subt.내용을 추가하면 그 중간부터 다음 subt 이전까지 그 내용으로 저장한다. (기본, 단순히 새로 subt를 추가하면 됨)
	// 중간에 subt.내용을 추가해도 이 부분만 다르게 표시하고 그 다음 subt 내용은 이전 내용과 같게 저장한다. (새로 추가하고 이전 내용을 가져와 다음 내용에도 추가한다)
	
	// 그리고 그 subt.내용을 전부 지우게 되면 어떻게 할 것인가 (내용을 아예 비우는 것이다. 스페이스바 입력하면 그냥 그 내용 인정함)
	// subt 자리나 그 중간에 내용을 지우면 그대로 빈 내용만 나타나도록 한다. (@ 붙이고, 없음을 나타내는 또 다른 기호를 붙인다)
	// subt 내용을 지우면 바로 이전의 subt 내용에 병합된다. (기본, 단순히 @ 없애기만 하면 됨)
	
}

// cont 값 갱신 저장
function saveCont() {
	var val = getValue('cont');
	console.log('edit and save the content!');
	
	storageArr[contentIndex] = (val + '@' + getAfterAt(storageArr[contentIndex]));
}

// 타이틀은 타이틀 인풋 값을 그대로 가져오는게 아니라 타이틀에 스크립트 이름까지 합쳐 스크립트에서 첫번째 라인에 저장된다.
// 특히 subt, cont은 저장할 때마다 (subt + '@' + cont) 값으로 갱신되어 저장된다.

// 언제 스크립트 중간체가 스토리지에 전체 저장되는지는 따로 지정하여 저장하면 된다.

// p값을 cont 인풋에 배치
function setTextCont(p) {
	if (checkAt(p)) p = getSplitAt(p)[0];	// 그것은 이 함수들이 문제가 아닌 함수 사용에 있어 무언가가 문제가 존재한다.
	setValue('cont', p);
}




// 근데 언제 그 storageArr에 있는 값들이 전부 WebStorage에 저장될 것인가?

// 일단 content나 script가 새로 추가 되었을 때
// 스크립트의 content가 삭제 되었을 때 (내용이 지워지는 것이 아닌 라인 제거를 의미함)
// 스크립트 수가 바뀌거나 스크립트 내 content 수가 바뀌는 일이 발생했을 때
// content나 subtitle의 onchange 발동 횟수가 10번 단위로 넘을 때마다 (자동저장횟수를 설정에서 변경가능함)

// 저장 버튼을 눌렀을 때 (이 버튼을 제외하고 모든 일에 저장되는 작업은 자동저장이라 한다)













// @의 앞부분 추출 (스크립트 이름이나 컨텐츠 되는 내용을 반환)
function getBeforeAt(p) {
	if (isString(p)) return getSplitAt(p)[0];
	return '';
}

// @의 뒷부분 추출 (서브타이틀 및 타이틀을 반환)
function getAfterAt(p) {
	if (isString(p)) return getSplitAt(p)[1];
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
function getSeletedIndex(id) {
	return document.getElementById(id).selectedIndex;
}

// id의 disabled 값 조정
function setDisable(id, bool) {
	document.getElementById(id).disabled = bool;
}

