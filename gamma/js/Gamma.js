
function get(id) {
    return document.getElementById(id);
}
function getVal(id) {
    return get(id).value;
}
function setVal(id, val) {
    get(id).value = val;
}
function getChecked(id) {
    return get(id).checked;
}
function setChecked(id, val) {
    get(id).checked = val;
}
function reverseChecked(id) {
    setChecked(id, getChecked(id));
}

//
var operator = null;
var writer = null;
var trainer = null;
function init() {
    //
    operator = new Options();
    writer = new ParaScript();
    trainer = new Exercise();

    //
    intro();
    tab(0);
    scriptUserMode();
}

// Display
function setDisplay(id, val) { get(id).style.display = val; }
function showAndHide(intro, main, history) {
	setDisplay('intro', intro);
	setDisplay('main', main);
	setDisplay('history', history);
}
function intro() { showAndHide('block', 'none', 'none'); }
function main() { showAndHide('none', 'block', 'none'); }
function history() { showAndHide('none', 'none', 'block'); }

// 탭 전환하기
function tab(id) {
	var show = '';
	hideIntroTabs();

	switch(id) {
		case 0:
			show = 'home';
			break;
		case 1:
			show = 'timer';
			break;
		case 2:
			show = 'scripter';
			break;
		case 3:
			show = 'loader';
			break;
		case 4:
			show = 'option';
			break;
	}
	setDisplay(show, 'block');
}

function hideIntroTabs() {
	setDisplay('home', 'none');
	setDisplay('timer', 'none');
	setDisplay('scripter', 'none');
	setDisplay('loader', 'none');
	setDisplay('option', 'none');
}

// HOME TAB

// 유저 모드 탭 전환
function scriptUserMode() {
	setDisplay('link-loader', 'none');
	setDisplay('link-scripter', 'block');
	get('link-timer').style.flex = "1";
	get('link-scripter').style.flex = "2";
	get('link-option').style.flex = "1";
}
// 파일 모드 탭 전환
function scriptFileMode() {
	setDisplay('link-loader', 'block');
	setDisplay('link-scripter', 'block');
	get('link-timer').style.flex = "1";
	get('link-scripter').style.flex = "1";
	get('link-loader').style.flex = "1";
	get('link-option').style.flex = "1";
}
// 모드 해제
function scriptModeOut() {
	setDisplay('link-loader', 'none');
	setDisplay('link-scripter', 'none');
	get('link-timer').style.flex = "2";
	get('link-option').style.flex = "2";
}
// 홈의 모드 선택에 따라 탭의 메뉴가 표시되고 사라진다.
function changeSelectSubtitle() {
	var val = parseInt(getVal('selectScript'));
	switch(val) {
		case 0:
			scriptUserMode();
			break;
		case 1:
			scriptFileMode();
			break;
		case 2:
			scriptModeOut();
			break;
	}
}

// TIMER TAB
function updateSetTime(e) {

}

// SCRIPTER


// FILE TAB


// OPTION TAB


// GLOBAL TAB





// Web Storage
// 시간, 스크립트, 상세옵션 등을 웹스토리지에 저장하고 불러옴
var Options = function() {
    this.values = {
        inhaleTime: 5,
        exhaleTime: 5,
        holdingTime: 1,
        subtitle: false,
        mergeInEx: false,
    };

    this.get = function(id) {
        return this.value[id];
    };

    this.set = function(id, val) {
        this.values[id] = val;
    };

    this.setHolding = function(bool) {
        /*
        if (bool) {
            this.values.holdingTime = 1;
        }
        else {
            this.values.holdingTime = 0;
        }
        */
        this.values.holdingTime = ((bool) ? 1 : 0);
    };

    this.setSubtitle = function(bool) {
        this.values.subtitle = bool;
    };

    this.setMergeInEx = function(bool) {
        this.values.mergeInEx = bool;
    };

    this.export = function() {
        return JSON.stringify(this.values);
    };

    this.import = function(data) {
        this.values = JSON.parse(data);
    };
}



// Scripts
// 스크립트를 쓰고 읽고 관리함. 웹 스토리지에 데이터를 저장하고 로드함.
var ParaScript = function() {
    const templates = [
        {
            title: "기본",
            start: '호흡에 관심 기울이기',
            end: '마무리',
            list: [
                '들이쉬기',
                '숨참기',
                '내쉬기',
            ],
        },
        {
            title: "393 호흡기도문",
            start: '호흡에 관심 기울이기',
            end: '마무리',
            list: [
                "주는 그리스도시요 살아계신/하나님의 아들이시니이다",
				"지금 내 안에 하나님의/영으로 충만하게 하옵소서",
				"말씀의 능력이 모든 현장 속에/전달되게 하옵소서",
				"지금 나에게 그리스도의/영으로 충만하게 하옵소서",
				"3 저주를 해결하는 능력이/모든 현장 속에 전달되게 하옵소서",
				"지금 나에게 보혜사 성령으로/충만하게 하옵소서",
				"성령의 능력이 모든 현장 속에/전달되게 하옵소서",
				"보좌의 축복, 시공간 초월,/237의 빛의 능력이 내게 임하게 하옵소서",
				"3 초월의 능력이 모든 현장 속에/전달되게 하옵소서",
				"하나님의 형상, 생령,/에덴의 축복이 내게 임하게 하옵소서",
				"3 생명의 능력이 모든 현장 속에/전달되게 하옵소서",
				"나, 교회, 현장 속에 전무후무한/축복이 임하게 하옵소서",
				"3전무후무한 역사와 응답이/모든 현장 속에 전달되게 하옵소서",
				"전문화, 세계화, 제자화의 응답과/축복이 내게 임하게 하옵소서",
				"3시대의 축복 통해 목회자, 중직자,/부교역자와 렘넌트가 살아나게 하옵소서",
            ],
        },
    ]
    this.paras = {
        title: '',
        start: '',
        end: '',
        list: [],
    };

    // 원소 추가
    this.add = function(script) {
        this.paras.list.push(script);
    }
    // 특정 원소 삭제
    this.delete = function(i) {
        this.paras.list.splice(i,1);
    }
    // Title
    this.getTitle = function() { return this.paras.title; }
    this.setTitle = function(title) { this.paras.title; }
    // Start and End
    this.getStart = function() { return this.paras.start; }
    this.getEnd = function() { return this.paras.end; }
    this.setStart = function(script) { this.paras.start = script; }
    this.setEnd = function(script) { this.paras.end = script; }

    // 파일 또는 스토리지에 저장하기 위함
    this.export = function() {
        return JSON.stringify(this.paras);
    }
    // 파일 또는 스토리지로부터 불러옴
    this.import = function(data) {
        this.paras = JSON.parse(data);
    }
}



// Exercise
// 운동을 함
var Exercise = function() {

}
