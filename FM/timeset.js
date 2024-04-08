



// 여기 안에 system 클래스를 통해 스토리지에서 가져온 타임셋 값(없으면 기본값)으로 설정한다.

// 이 값들은 timeset, home, editor, system 페이지들간 값을 동일하게 공유하기 위함이다.
// 스토리지에 저장될 타임셋 값들의 아이디 값은 다음과 같다.
/*
fm991s01	: IN
fm991s02	: OUT
fm991s03	: STOP (0: false or 1: true)
fm991s15	: cycle (0: none or 1, 2, 3 ...)
*/

// 타임셋에서 사용되는 값들은 위와 같이 저장되고 불러와 사용된다.
// 여기에 setting page에서 사용되어 저장되고 불러와 사용될 값들이 포함되어 있다.














// select 내 onchange에 의해 option 선택이 바뀔 때마다 실행하는 함수
function setScript() {
	var val = parseInt(document.getElementById('scriptList').value);	// 이건 값이고 변경이 불가
	var select = document.getElementById('scriptList').selectedIndex;	// 이건 선택 인덱스고 변경 가능
	var len = document.getElementById('scriptList').length	// 이건 선택지 갯수를 알려줌. 변경 불가
	
	// 여기서 옵션들 중 이것만 아무도 선택도 안된것으로 스크립트 선택을 하지 않은 것이므로 수행을 못한다.
	if ((val == 990) && (select == (len-1))) {
		val = len-1;
		// 아무 기능을 수행하는 것을 금한다. 대신 말 그대로 아무것도 못함.
		document.getElementById('scriptList').selectedIndex = val;
	}
	
	// 먼저 스크립트 아이디를 현재 작업 아이디에 저장.
	scriptId = val;
	// 그 외에는 단순하게 스크립트를 불러와 표시해내는 기능만 한다.
	loadScript();
	
	// 그 다음 페이지 리스트를 불러온 스크립트를 기반으로 업데이트 한다.
	updatePageList();
}

