


function checkParaScripter() {
	if (getLId('para-use').checked)
		showParaScripter();
	else
		hideParaScripter();
}

function showParaScripter() {
	getLId('para-import').style.display = 'block';
	getLId('para-script').style.display = 'block';
	getLId('para-option').style.display = 'block';
}

function hideParaScripter() {
	getLId('para-import').style.display = 'none';
	getLId('para-script').style.display = 'none';
	getLId('para-option').style.display = 'none';
}

// 추가


// 이 스크립트의 구조는 다음과 같다.

// 현재 인덱스 배열 - 문단

// 현재 인덱스 배열은 문단의 아이디의 현황을 기억하는 역할이다.
// 여기서 문단의 어떤 인풋이 삭제되면 그 아이디가 제거되므로 현재 인덱스 배열에서도 아이디가 삭제된다.
// 그러나 삭제된 인덱스 아이디는 영원히 찾을 수 없다.
// 즉, 문단에서 추가된다 하더라도 삭제되어 공백이 생기는 인덱스를 무시하고 번호 값만을 증가시킨다.
// 


// 스크립트 문단을 위한 파일

var indexArr = [0,1];
var indexPara = 0;



function inPara() {
    indexArr.push(++indexPara);
}

function exPara(n) {
	indexPara--;
	for (var i = 0; i < indexArr.length; i++) {
		if (indexArr[i] == n) {
			indexArr.splice(i,1);
			return i;
		}
	}
}

function lenPara() {
	return indexArr.length;
}

function getParas() {
	var arr = [];
	for (var i = 0; i < indexArr.length; i++) {
		var paradata = getLId('para-'+indexArr[i]).value;
		arr.push(paradata);
	}
	return arr;
}

const paraOptionArr = [
	{
		title: "393 호흡기도문",
		disableStop: true,	// 정지 기간에는 스크립트가 들어가지 않는다.
		inhale:5,
		stop:0,
		exhale:5,
		scripts: [
			"",
			"주는 그리스도시요 살아계신 하나님의 아들이시니이다",
			"지금 내 안에 하나님의 영으로 충만하게 하옵소서",
			"말씀의 능력이 모든 현장 속에 전달되게 하옵소서",
			"지금 나에게 그리스도의 영으로 충만하게 하옵소서",
			"3 저주를 해결하는 능력이 모든 현장 속에 전달되게 하옵소서",
			"지금 나에게 보혜사 성령으로 충만하게 하옵소서",
			"성령의 능력이 모든 현장 속에 전달되게 하옵소서",
			"보좌의 축복, 시공간 초월, 237의 빛의 능력이 내게 임하게 하옵소서",
			"3 초월의 능력이 모든 현장 속에 전달되게 하옵소서",
			"하나님의 형상, 생령, 에덴의 축복이 내게 임하게 하옵소서",
			"3 생명의 능력이 모든 현장 속에 전달되게 하옵소서",
			"나, 교회, 현장 속에 전무후무한 축복이 임하게 하옵소서",
			"3전무후무한 역사와 응답이 모든 현장 속에 전달되게 하옵소서",
			"전문화, 세계화, 제자화의 응답과 축복이 내게 임하게 하옵소서",
			"3시대의 축복 통해 목회자, 중직자, 부교역자와 렘넌트가 살아나게 하옵소서",
		],
		
	},
	{
		title: "",
		disableStop: false,
		scripts: ["", "", "",],
	}
];

function setParaScript(id) {
	// id: 0 - 기본, 들이쉬기 내쉬기만 뜸
	// id: 1 - 사용자 지정, 이 상태로 있으면 스크립트를 웹 브라우저가 기억한다.
	// id: 2 - 2번부터 기본 지원 옵션에 해당한다.
	// 
	
	var paraScriptData = paraOptionArr[id-2];
	
	
	if (paraScriptData.disableStop) {
		// true라면 정지 시간에 스크립트가 도입되지 않는다.
		
	}
}

function paraOption(n) {
	
}

function importParas(n) {
	return paraOptionArr[n];
}


function addPara() {
	var index = 3;
	var newPara = '<p id="paras-id-'+index+'"><input type="text" class="para-input"><button class="para-btn" id="para-id-'+index+'" onclick="delPara('+index+');">&times;</button></p>';
	
	console.log('addPara active');
}

function delPara(n) {
	var para = getLId('paras-id-'+n);
	para.remove();
	return (exPara(n) === n);
}





function fileEventOpen() {
	document.getElementById('para-load').addEventListener('change', loadParaScriptFile);
}

function fileEventClose() {
	document.getElementById('para-load').removeEventListener('change', loadParaScriptFile);
}

function loadParaScriptFile() {
	var file = new FileReader();
	file.onload = () => {
		setUpParaScriptFromFile(file.result);
	}
	file.readAsText(this.files[0]);
}

function setUpParaScriptFromFile(paras) {
	console.log(paras);
	var paraArr = paras.split('_');
	console.log(paraArr);
	
}

function setUpParaScriptFromOption(paras) {
	
}

function setUpOption(optArr) {
	var disableStop = (optArr[1]==1);
	var inhaleTime = optArr[2];
	var stopTime = optArr[3];
	var exhaleTime = optArr[4];
}
function setUpParaScript(paraArr) {
	var paraTitle = paraArr[0];
	var disableStop = (paraArr[1]==1);
	var inhaleTime = paraArr[2];
	var stopTime = paraArr[3];
	var exhaleTime = paraArr[4];
	var scripts = paraArr.slice(5);
	
	var paras = [' ']
	for (var i = 1; i <= scripts.length; i++) {
		// 1, 2, 3 중에서 2와 2+3n만 골라내는 방법은?
		paras.push(scripts[i-1]);
	}
}


// 규격을 정해야 한다.
// 
// '_'(언더스코프)라는 단위로 문장을 구분한다. 다만 띄어쓰기는 지원되도록 한다.
// 처음에는 텍스트 파일에서 ""라는 큰따옴표가 저장되어 있지 않으나 문자열 형식으로 변환하면서 큰 혼란을 우려하니 되도록이면 따옴표를 쓰지 않는다.
// (title)_(disableStop:1 is true)_(inhale)_(stop)_(exhale)_(scripts...)
// 393 기도문_1_5_0_5_ _주는 그리스도시요 살아계신 하나님의 아들이시니이다_지금 내 안에 하나님의 영으로 충만하게 하옵소서_말씀의 능력이 모든 현장 속에 전달되게 하옵소서_지금 나에게 그리스도의 영으로 충만하게 하옵소서_3 저주를 해결하는 능력이 모든 현장 속에 전달되게 하옵소서_지금 나에게 보혜사 성령으로 충만하게 하옵소서_성령의 능력이 모든 현장 속에 전달되게 하옵소서_...
// 
// 이것만 지키면 맨 앞의 값을 제하고 나머지 값은 disableStop의 유무에 따라 stopTime때 스크립트 표시가 달라진다.
// 그리고 스크립트 표시 뿐만 아니라 앞으로의 과제는 다음과 같다.
// inhale, exhale, stop의 타임, disableStop과 함께 반복에 따라 자막 표시 순서가 달라진다.
// 자막 표시 순서는 반복이 1이라는 기준으로 계산한다.
// 자막 표시 순서에 0은 인트로 값이고, 1(inhale), 2(stop), 3(exhale)으로 나뉘며, 3배 단위로 스크립트가 끝날 때까지 반복한다. (x+3n)
// 바로 윗줄의 내용에서 (x+3n)을 도는 동안 inhale, stop, exhale에 설정한 시간동안 작동한다.
// 반복은 위에서 계산한대로 반복을 한다.
// 반복 단위는 [inhale - stop - exhale]이다. 그러나 맨 처음에는 exhale부터 하므로, exhale는 intro라 가정한다.
// 마찬가지로 맨 마지막에는 inhale를 사용하며 마무리한다. 이는 exit라 한다.
// intro와 exit의 시간 값은 각각 본래의 특성과 같다. ex) exit=inhale
// 이 때문에 intro와 exit는 분리되어야 한다. 이 사이에 반복단위가 몇번 반복되기 때문이다.
// 그러므로 지속기간 설정은 삭제되어야 한다. ***이에 따라 새로운 페이지를 만들기로 결정했다.***
// AllTime(예상 소요시간) = intro + exit + repeat * (inhale + stop + exhale)
// 그리고 disableStop가 true일 경우, stop의 값은 아무도 없이 패스된다.
// 그러나 false일 경우, inhale, stop, exhale 모두 들어간다. 그런데 inhale나 stop에 일찍 끝나는 경우, 빈 공백으로 채우고 exit의 값으로 마무리한다.






