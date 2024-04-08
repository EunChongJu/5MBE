
// 여기 안에 system 클래스를 통해 스토리지에서 가져온 타임셋 값(없으면 기본값)으로 설정한다.

// 이 값들은 timeset, home, editor, system 페이지들간 값을 동일하게 공유하기 위함이다.
// 스토리지에 저장될 타임셋 값들의 아이디 값은 다음과 같다.
/*
fm991s01	: IN
fm991s02	: OUT
fm991s03	: STOP (0: false or 1: true)
fm991s15	: cycle (0: none or 1, 2, 3 ...)
*/

// 이거 가능한가 모르겠다
// 메인은 그대로 헤드 안에 스크립트 주소 불러오는거 간단히하면 타 스크립트의 함수 하나만 부르고 할 일 다하면 그 링크를 지우면 될 거 같다.

//// 작동원리::
/*
- 먼저 timeset과 ??을 주요 구성으로 한다.
- editor는 따로 editor 페이지서 사용한다. (통합에 사용되지 않을 것임)
- 그리고 통합 내 간단한 설정 관리와 미리보기를 위한 setting과 jetaime를 사용할 것이다.
- 이후 시작하게 되면 먼저 불러올 것은 jetaime이며, 디스플레이 구성이 완료되면 timer가 될 것이다.
- jetaime는 통합 페이지에서는 100%로 불러내고, 미리보기에서는 자유대로 사용하여 본다.
- 미리보기 창에서는 주로 50%로 사용하며 태블릿 이하에서 작게 보이는 화면에서는 90%로 활용한다.
- 
- 
- 

*/

// 이 타이머는 0.1초마다 한번씩 타임을 세는데, 예를 들어 1초마다 1을 더하는 식으로 반복을 하여 5까지 세는거 5까지 세게 되면 어떤 일을 하도록 하는 방식이다.
// 그 5까지 세는 방식은 간단히 배열에 숫자만 넣어서 배열이 끝까지 세게 될 때까지 배열 내 숫자만큼 숫자가 하나씩 더해가며 세는 것이다.
// 예를 들어 배열 내 처음 숫자가 5이면 5가 될 때까지 1씩 더해가며 반복하여 세서 5 되면 배열의 다음 배열로 가게 되고 그 배열 순서에 따라 그 숫자만큼 세고 계속하여 마지막의 배열의 숫자를 다 세게 되면 그 반복 여부를 체크하여 다시하거나 한다. 아니면 매번 지금이 들이쉬기 타임이면 들이쉬기가 몇초까지 하는지 체크하여 계산하도록 하거나 한다.
// 처음엔 1초단위로 하였으나 0.1초 단위로 1씩 더하는 식으로 반복하여 처리해야 할 것 같다.












//// 아래는 그 움직이게 될 대상이 렁스 버전인가 비치 버전인가에 따라 다른 함수를 호출하게 된다.

function setInLungs(s) {
	var sform = 'scaleX(1) scaleY(1)';
	setMode(s, sform);
}
function setOutLungs(s) {
	var sform = 'scaleX(0.1) scaleY(0.1)';
	setMode(s, sform);
}

function setInBeach(s) {
	var sform = 'translate(0%, 25%) scaleX(1) scaleY(1.5)';
	setMode(s, sform);
}
function setOutBeach(s) {
	var sform = 'translate(0%, 0%) scaleX(1) scaleY(1)';
	setMode(s, sform);
}

function setMode(s, form) {
	var box = getMvBox();
	box.style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + s + 's';
	box.style.transform = form;
//	box.style.transform = 'translate(' +e.clientX + 'px,' + e.clientY + 'px)';
}

function getMvBox() {
	return document.getElementById(jtId+'Movement');
}









