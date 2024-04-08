

var tabId = 1;

// 이 함수는 설정의 모든 값을 종합해 샘플로 만든 후 표시하는 함수다. (tab의 기준을 안정해서 함수는 임시명으로 때움)
function updateTab() {
	// 샘플로 표시될 코드 : 결과값
	var result = '';
	
	//// 여기에 모든 설정들을 불러모은다.
	
	// 디스플레이에 표시될 배경 컨셉값
	var mode;
	
	
	//// 그리고 설정값들을 하나둘씩 모아 종합하며 코드를 만들기 시작한다.
	
	// 컨셉값에 따라 바뀐다. (그런데 여기서 상세한 값들은 이미 저 아래 함수가 각각의 값들을 수정했으니 염려할 필요없을듯 함)
	if (mode == 0) result += '';
	
	
	// 이 결과값이라는 코드를 해당 위치에 배치시킨다.
	document.getElementById('tBox').innerHTML = result;
}

// 이 함수는 설정 탭의 맨위에 표시되는 메뉴를 클릭할 때마다 탭이 바뀌도록 한다. (n은 1부터)
function setTab(n) {
	console.log(tabId, n);
	// 기존들은 모두 off 한 후 n의 값에 해당하는 모든것을 on 한다.
	
	// 그다음 탭에서 번호에 해당하는 탭을 표시하도록 한다.
	document.getElementById('tm'+tabId).disabled = false;
	document.getElementById('tm'+n).disabled = true;
	document.getElementById('ts'+tabId).style.display = 'none';
	document.getElementById('ts'+n).style.display = 'block';
	
	// 마무리로 n이 tabId에 저장되도록 한다.
	tabId = n;
}


//// 그 아래의 모든 함수들은 모두 설정탭에서 수정되거나 변경된 값에 대한 적용과 설정값의 저장을 위한 것과, 탭에 표시될 설정값들을 불러오기 위한 함수들이다.









// 배경에 대한 컨셉값에 따라 설정의 해당하는 모든 설정값을 수정하도록 한다.
function setModeValues(n) {
	// Lungs
	if (n == 0) {
		
	}
	// Beach
	else if (n == 1) {
		
	}
	else {
		
	}
}

