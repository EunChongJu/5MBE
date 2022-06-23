

// 이 json을 저장해야 한다.
var storageOpt = {
	inhale: 5, exhale: 5, stop: 2,
	repeat: 3,	// 이제 걸리는 시간을 자동으로 구해야 함
	script: 2,	// 0: 기본, 1: 사용자지정, 2~:지원하는 스크립트
	paras: [
		"237 나라 살릴 70인 제자가 되게 하옵소서",
		"1 3 8의 성령충만을 주옵소서",
		"24 25 영원의 축복을 주옵소서"
	],
	repeatpara: 3,	// 이 para 구문들을 3번 반복
	color: 'green',
	
}

//// 데이터 수집
// 인풋 데이터 수집
// 체크 확인 수집
// 

// 모든 옵션 데이터 수집
function collectOptData() {
	storageOpt.inhale;
	storageOpt.exhale;
	storageOpt.stop;
	storageOpt.repeat;
	storageOpt.script;
	storageOpt.paras = collectParas();
	storageOpt.repeatpara;
	storageOpt.color;
	
}


// 파라스 구문 데이터 수집
function collectParas() {
	
}


// 스토리지에 저장되는 키 목록
var keyArr = []

// 옵션들을 스토리지에 직접 저장
function saveStorage() {
	// 세이브 옵션에서 inhale, exhale, stop, repeat 등을 모두 저장한다. 이때 파일을 불러온 것도 스크립트 모두까지 저장대상이다. 다만 기본의 경우 스크립트 저장은 생략한다.
	
	/*
	// set
	localStorage.setItem('itemName', itemValue);
	// get
	var data = localStorage.getItem('itemName');
	*/
	
	// 
}

// 옵션들을 스토리지에서 직접 불러오기
function loadStorage(key) {
	return ((checkStorage(key)) ? getStorage(key) : null);
}

// 
function setStorage(key, value) {
	localStorage.setItem(key, value);
}
function getStorage(key) {
	return localStorage.getItem(key);
}
function checkStorage(key) {
	return localStorage.hasOwnProperty(key);
}

