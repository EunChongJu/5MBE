



// 인트로 화면과 메인 화면 구성
// 인트로 화면으로 전환
function showIntro() {
	displayHideId('main-5mbe');
	displayShowId('intro');
}

// 메인 화면으로 전환
function showMain() {
	displayHideId('intro');
	displayShowId('main-5mbe');
}

// 디스플레이 활성
function displayShowId(id) {
	document.getElementById(id).style.display = 'block';
}
// 디스플레이 숨김
function displayHideId(id) {
	document.getElementById(id).style.display = 'none';
}


// input들을 관리 - input에 들어가는 아이디를 통해 전체적으로 관리함

// input 추가


// input 삭제


// input들의 여러개의 데이터를 읽어옴
function readInputData() {
    var list = [];
    for (var i = 0; i < 10; i++) {
        var data = document.getElementById('input-'+i);
        list.push(data);
    }
    return list;
}

// input들의 데이터를 저장
var memory = new ccMemory();
memory.set(list);

// 타이머 설정을 읽어옴

// 타이머 설정을 저장


// 숨쉬기 운동 시작
function start5MBE() {
    showMain();
}


// 타이머 제어




// 들숨 차례
function inhale() {
	modeStateChanger('들이쉬기');
	toCircle();
}

// 숨참기 차례
function hold() {
	modeStateChanger('숨참기');
}

// 날숨 차례
function exhale() {
	modeStateChanger('내쉬기');
	toEllipse();
}


// 타원이 원형으로 변함
function toCircle() {
	
}

// 원형이 타원으로 변함
function toEllipse() {
	
}

// 숨쉬기 모드 상태 알림
function modeStateChanger(state) {
	document.getElementById('brt-mode').innerHTML = state;
}



// 자막 표기
// 자막 input들의 값을 불러옴


// input들의 값을 자막 내용에 저장


// 자막 내용을 불러옴


// 자막 표시에 대한 결정을 계산






// 자막 내용을 표시
function ccDisplay(cc) {
	document.getElementById('brt-cc').innerHTML = cc;
}


// 자막 내용을 숨김


































