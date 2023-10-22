
// sys.js는 임시명이다. script.js는 지금 index.html과 관련있으나 일단 보류한다.

// 방식은 과거의 5MBE Project와 동일하다.
// 그러나 이것은 결국 기존의 틀에 벗어나지 못하였지만
// 틀 내 속이 많이 바뀐 버전이라고 볼 수 있다.
// 들숨-날숨을 In-Out이라 칭한다. 그리고 이를 묶어 사이클이라 한다.
// 그리고 센터에 있는 그래픽이 그 사이클에 따라 달라지는 것으로 보면 된다.
// 그래픽은 원형 또는 바다(유튜브 영상의 배경)가 있으며 이를 설정에서 선택할 수 있다.
// 그래픽의 색깔 또한 설정할 수 있으며, 그래픽의 
// 설정에서 설정한 값들은 쿠키와 비슷한 형태의 시스템을 이용해 저장할 수 있다. 그러나 쿠키 삭제와 같이 실행하면 초기화된다.
// 스크립트에 관련해서는 스크립트 파일로 넘어간다.
// 

// https://www.youtube.com/watch?v=qgPYKNd2DGM
// 위의 영상에서 0분부터 5분 39초까지 그 동안의 스크립트를 기본으로 설정한다.
// 아니면 설정 창에 다른 스크립트(예를 들어 기존의 이전 스크립트들)를 선택할 수 있도록 한다.
// 그것도 아니면 자기가 직접 작성해서 표시할 수 있도록 한다.

// https://eunchongju.github.io/5MBE/alpha/
// 기존의 5MBE 프로젝트 링크
// 이것도 참고, 원형 허파는 그대로(아님 변형되어) 사용될 가능성 높음.

// 허파 (#4CAF50)
// 모래사장 (#FFCC98, #FFE6B6, #FFF7D9; #53CCEC, #1974D3, #000181;)

var FMB = function() {
	
	
	
	// 기본적으로 내장된 모든 시나리오
	var scriptsArr = [	// 무조건 인덱스 0은 제목이고 나머지가 스크립트임.
		[
			'7대 망대 묵상',
			'성부하나님, 생명의 말씀으로 내게 임하여 주옵소서@성삼위',
			'성자하나님, 생명의 구원으로 내게 임하여 주옵소서',
			'성령하나님, 생명의 능력으로 내게 임하여 주옵소서',
			'하나님의 나라와 일이 이루어지는 보좌의 축복을 주옵소서@보좌의 축복 9가지',
			'이 응답이 시간과 공간을 초월하여 역사하게 하옵소서',
			'237의 빛이 되어 모든 문을 여는 증거를 허락 하옵소서',
			'내 생명 속에  하나님의 형상이 임하게 하옵소서.',
			'내 영혼 속에 하나님의 생기를 불어넣어 주옵소서',
			'내 삶 속에 에덴의 생명력을 회복하게 하옵소서',
			'나에게 전무후무한 오직의 응답을 허락해 주옵소서',
			'교회에 전무후무한 유일성의 응답을 허락해 주옵소서',
			'나의 업(현장)에 전무후무한 재창조의 응답을 허락해 주옵소서',
			'나의 과거가 세계복음화의 발판이 되게 하옵소서@3시대',
			'나의 오늘이 하나님의 시간표가 되게 하옵소서',
			'나의 미래에 전도자의 상급이 보장되게 하옵소서',
			'다가올 유니버스 시대를 살릴 우주의 능력을 허락하여 주옵소서@우주',
			'요엘이 예언하고, 베드로가 선포하며, 엘리사가 구한 갑절의 영력을 허락하여 주옵소서@5력',
			'요셉과 다니엘이 누렸던, 왕 앞에 서며 세계를 살릴 수 있는 지력을 허락하여 주옵소서',
			'엘리야과 삼손이 지닌 체력을 주옵시고, 내 몸에 알지 못하는 질병까지 치유하여 주옵소서',
			'브리스가부부와 야손, 가이오가 누렸던 세계복음화의 경제력을 허락하여 주옵소서',
			'아나니아, 바울, 디모데의 인력과 같은 전도자와 제자의 만남을 허락하여 주옵소서',
			'정확한 언약에 24 집중함으로 내 삶의 리듬을 회복하게 하옵소서@CVDIP',
			'시대의 저주와 재앙을 보며 25의 참된 비전을 보게 하옵소서',
			'영원의 배경 속에서 하나님의 꿈을 실제로 그리게 하옵소서',
			'공중권세를 장악한 흑암세력 이길 능력을 허락하여 주옵소서',
			'보좌의 축복으로 빛의 경제를 이루는 작품을 남기게 하옵소서',
			'237나라와 5천종족을 살릴 이방인의 뜰을 허락하여 주옵소서@세가지 뜰',
			'묵상운동과 치유가 회복되는 기도의 뜰을 허락하여 주옵소서',
			'후대들을 서밋으로 키우는 아이들의 뜰을 허락하여 주옵소서'
		],
		[
			'7대 여정 묵상',
			'눈에 보이지 않는 "영적세계의 배경"을 가진 존재로서 영적 "신분과 권세"를 누리게 하옵소서.@성삼위 하나님 (나는 누구인가?)',
			'영적독립 - 사건과 환경에 속지 않고, 언제 어디서든지 말씀 안에서 살아남게 하옵소서.@10가지 비밀 (나는 어디에 있는가?)',
			'영적사실 - 사탄에게 속지 않고  현실과 사실, 진실을 넘어 영적사실을 보게 하옵소서.',
			'역발상 - 아무도 빼앗지 못하는 반대편에 있는 하나님의 것에 집중하게 하홉소서.',
			'시너지 효과 - 많은 사람을 살리는 쪽으로 방향 잡고 모든 것을 살려내게 하옵소서.',
			'위기는 기회 - 보좌 배경이 이 땅에 이루어지는 하나님 나라의 일이 보게 하옵소서.',
			'무경쟁 - 싸우지 않고도 승리할 수 밖에 없는  참된 능력을 누리게 하옵소서.',
			'재창조 - 아무도 막을 수 없는 오직, 유일성, 재창조의 응답을 받게 하옵소서.',
			'서밋 자리 - 가장 낮은 곳에서 최고로 도전하는 지도자 공부를 하게 하옵소서.',
			'광야, 사막, 황무지 - 모든 지역과 분야의 죽은 곳을 살려내는 능력을 허락 하옵소서.',
			'절대 이유 - 모든 사건과 일에 하나님의 절대 이유를 항상 질문하게 하옵소서.',
			'하나님의 주권  - 하나님은 영세 전부터 영원토록 시대와 역사를 주관하심을 믿습니다.@10가지 신앙발판 (무엇을 붙잡아야 하는가?)',
			'하나님의 방법 - 하나님의 역사는 오직 예수 그리스도를 통해 성취됨을 믿습니다.',
			'하나님의 능력 - 지금도 역사하시는 성령은 바로 하나님의 능력임을 믿습니다.',
			'하나님의 말씀 - 성경은 살아계신 하나님의 말씀이자 확실한 보증서임을 믿습니다.',
			'하나님의 성전 - 구원 받은 나는 하나님의 성전으로서 가장 가치 있는 존재임을 믿습니다.',
			'하나님의 계획 - 내가 있는 모든 자리, 장소, 있는 곳은 파송하신 선교지임을 믿습니다.',
			'하나님의 통치 - 나의 모든 생사화복을 주관하시고 그 걸음을 인도하심을 읻습니다.',
			'하나님의 섭리 - 모든 사람은 반드시 한번은 죽는 시한부 인생임을 믿습니다.',
			'하나님의 심판 - 죽음 이후에는 심판 후 내세(천국과 지옥)로 가게됨을 믿습니다.',
			'하나님의 상급 - 전도자의 삶을 사는 자에게 반드시 하늘의 상급이 있음을 믿습니다.',
			'구원의 확신 - 그리스도를 믿는 자마다 하나님 자녀 삼으시고 구원 주심을 확신합니다.@5가지 확신 (어떻게 해야 하는가?)',
			'응답의 확신- 하나님 자녀가 그리스도 이름으로 기도할 때 반드시 응답하심을 확신합니다.',
			'사죄의 확신 - 그리스도 십자가의 은혜로 죄와 사망의 법에서 영원히 해방된 것을 확신합니다.',
			'승리의 확신 - 그리스도의 권세로 자신과 세상과 사탄과 싸워 이기는 승리를 확신합니다.',
			'인도의 확신 - 하나님 자녀된 나를 성령께서 끝까지 책임지시고 인도하심을 확신합니다.',
			'높이, 깊이, 넓이 - 전문성(정보)에 대한 소통@9가지 흐름 (왜 해야 하는가?)#편견을 가지고 단편적으로 보는 것이 아니라 넓이와 높이와 깊이를 보게 하옵소서.',
			'위, 아래, 옆 - 인간관계에 대한 소통#상, 하, 좌우에 있는 따라갈 사람, 끌어갈 사람, 함께 걸어갈 사람들을 배려하게 하옵소서.',
			'과거, 현재, 미래 - 시간표에 대한 소통#과거와 현재와 미래를 연결하여 복음으로 세상을 살리는 영적 소통을 하게 하옵소서.',
			'21가지 본질 (Covenant / 미리보기(길) / 절대주권)을 회복하게 하옵소서.@62가지 삶 (미리 응답)',
			'5가지 기도 (Vison / 미리갖기(힘) / 절대계획)를 개인화하게 하옵소서.',
			'7가지 달란트 (Dream / 미리누림(여정) / 절대언약)를 찾게 하옵소서.',
			'9가지 흐름 (Image / 미리정복(방향) / 절대여정)을 바꾸게 하옵소서.',
			'20가지 전략 (Practice / 미리성취(영원) / 절대목표)을 성취하게 하옵소서.',
			'모든 것이 교회의 강단 말씀과 연결되는 놀라운 인생 변화를 체험하게 하옵소서.@교회 (예배 / 성전)',
		],
	];
	
	// 그 아이디와 인덱스를 파라미터로 받는 함수를 이용해 스크립터 에디터에 로드할 수 있도록 함
	this.loadScripterEditor = function(index, id) {
		var data = scriptsArr[index];
		document.getElementById(id)
	};
	
	// 페이지 자체의 타이틀을 바꿈
	function changePageTitle(p) {
		document.title = p;
	}
	// 페이지내 해당 아이디 내용을 바꿈
	function changeInner(id, value) {
		document.getElementById(id).innerHTML = value;
	}
	// 페이지내 해당 아이디 스타일의 특정부분을 바꿈
	function changeStyle(id, property, value) {
		document.getElementById(id).style[property] = value;
	}
	
	// 스크립트와 제목 모두 추출
	function getScript(i) {
		return scriptsArr[i];
	}
	// 스크립트의 제목 추출
	function getScriptTitle(i) {
		return getScript(i)[0];
	}
	// 스크립트 내용 모두 배열로 반환
	function getScripts(i) {
		var arr = [];
		var sc = getScript(i);
		for (var a = 1; a < sc.length; a++) {
			arr.push(sc[a]);
		}
		return arr;
	}
	// 스크립트 갯수 (제목은 뺀거임)
	function getScriptLength(i) {
		return scriptsArr[i].length - 1;
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	// 모든 설정 값을 관리	
	var setting = {
		inTime: 5,
		outTime: 5,
		
		stopTime: 0,
		
		spaceBefore: true,
		spaceAfter: true,
		
		repeatCycle: 1,	// repeat num
		
		spaceCycle: false,
		
		// 들숨-날숨 상태 표시 설정
		modeAlign: -1,
		modeValign: 1,	// -1: left/bottom, 0: center/middle, +1: right/top
		modeEn: true,	// 상태의 영어 표시여부
		modeLang: true,	// 상태의 개별 표시여부
		modeLangIn: '들숨',	// 상태의 개별 표시에 대한 설정
		modeLangOut: '날숨',
		modeLangType: -2,	// 상태의 개별언어 표시 위치 설정 (-2는 기본값:한줄 앞으로, -1: 같은 줄의 앞, +1: 같은 줄의 뒤, +2: 한줄 뒤로)
		
		// 타이틀(제목) 설정
		title: '7대 망대 묵상',
		titleAhead: true,	// 표시 순서 차례 (spaceBefore의 앞 또는 뒤에 표시, true는 SB보다 먼저 표시된 후 공백 가지고 시작)
		titleCycle: false,// 표시 방법 반복 (사이클마다 or 사이클들 맨 앞, false는 맨 앞에 한번 표시하고 끝)
		titleShow: false,	// 표시 방법 차례 (들숨때부터 or 날숨때부터 표시, true는 들숨때부터)
		titleColor: '#FFF',	// 폰트 색깔
		titleBg: false,	// 제목의 배경 설정
		titleBgOpacity: 0,	// 배경 불투명도 (0-100 '%')
		titleBgColor: '#333',	// 배경 색깔
		titleAlign: 0,	// 제목 좌우 정렬
		
		// 스크립트(자막) 설정
		scriptColor: '#FFF',	// 색깔
		scriptBR: false,	// 띄어쓰기 (띄어쓰기 사용시 '#'을 기준으로 줄이 나뉘어 표시됨)
		scriptBg: false,	// 배경
		scriptBgOpacity: 0,	// 배경의 불투명도 (0-100 '%')
		scriptBgColor: '#333',	// 배경의 색깔
		scriptAlign: -1,	// 스크립트의 좌우 정렬(전체에서 위치, -1=왼쪽, +1=오른쪽, 0=센터)
		
		// 서브타이틀 설정 (BR 같은건 적용 안함. 스크립트만의 설정임)
		subtitleColor: '#FFF',	// 색깔
		subtitleBg: false,	// 배경
		subtitleBgOpacity: 0,	// 배경 불투명도 (0-100 '%')
		subtitleBgColor: '#333',	// 배경색
		subtitleAlign: -1,	// 좌우 정렬
		
		// 그 타이틀과 서브타이틀, 스크립트, 그래픽 표시 아이디에 대한 설정 (표시할 아이디를 관리하고 불러내고 저장)
		modeId: 'ovMode',
		titleId: 'ovTitle',
		scriptId: 'ovCC',
		subtitleId: 'ovSubTitle',
		graphicId: 'gp',
		
		// 그래픽 설정
		bgc: '#FFE6B6',	// 모래사장; Background
		mvc: '#1974D3',	// 바다; Movement
		lmc: '#FFCC98',	// 바다가 최대로 나이갈 수 있는 영역; Limit
		bdc: '#53CCEC',	// 파도의 하얀 부분; Boundary
		
		// 그래픽 세부설정 (인일때와 아웃일때 몇%만큼 설정하거나 위치상 배경대비 몇%만큼 배치하거나 어떻게 변하는지까지 세부적으로 설정한다. 그래픽 모드 설정은 따로)
		// IN할때와 OUT할때 크기 설정, 변화방법, 위치 등을 저장한다.
		
		bgWidth: 100,
		bgHeight: 100,
		bgPositionTop: 50,
		bgPositionLeft: 50,
		bgTransform: 'translate(-50%, -50%)',
		bgTransformTop: -50,
		bgTransformLeft: -50,
		
		lmWidth: 100,
		lmHeight: 70,
		lmPositionTop: 50,
		lmPositionLeft: 50,
		lmTransform: 'translate(0%, 0%)',
		lmTransformTop: 0,
		lmTransformLeft: 0,
		
		mvWidth: 100,
		mvHeight: 100,
		mvTop: 50,
		mvLeft: 50,
		mvTransform: 'translate(-50%, -50%)',
		
		bdWidth: 100,
		bdHeight: 100,
		
		mvinWidth: 100,
		mvinHeight: 100,
		mvinTop: 50,
		mvinLeft: 50,
		mvinTransform: 'translate(0%, 25%) scaleX(1) scaleY(1.5)',	// 1.5 - 1 = 0.5, 0.5 * 50 = translateY(%)
		mvinScaleX: 1,
		mvinScaleY: 1.5,	// 이것은 Beach이고, Lungs는 x: 0.1, y: 0.1로 설정된다.
		
		mvoutWidth: 100,
		mvoutHeight: 100,
		mvoutTop: 50,
		mvoutLeft: 50,
		mvoutTransform: 'translate(0%, 0%) scaleX(1) scaleY(1)',
		mvoutScaleX: 1,
		mvoutScaleY: 1,	// 이것은 Beach이고, Lungs는 x: 1, y: 1로 설정된다.
		
		
		
	};
	
	function changeGraphicLungs() {
		setting.bgc = '#FFE6B6';	// 배경; Background
		setting.mvc = '#1974D3';	// 허파; Movement
		setting.lmc = '#FFCC98';	// 갈비; Limit
		setting.bdc = '#53CCEC';	// 허파막; Boundary
		
//		setting.lmWidth: 50;
//		setting.lmHeight: 50;
//		setting.lmTop: 50;
//		setting.lmLeft: 50;
//		setting.lmTransform: 'translate(-50%, -50%)';
	}
	
	function changeGraphicBeach() {
		setting.bgc = '#FFE6B6';	// 모래사장; Background
		setting.mvc = '#1974D3';	// 바다; Movement
		setting.lmc = '#FFCC98';	// 바다가 최대로 나이갈 수 있는 영역; Limit
		setting.bdc = '#53CCEC';	// 파도의 하얀 부분; Boundary
		
//		setting.lmWidth: 100;
//		setting.lmHeight: 70;
//		setting.lmTop: 50;
//		setting.lmLeft: 50;
//		setting.lmTransform: 'translate(0%, 0%)';
	}
	
	
	// 시간 설정
	this.setTime = function(i, o) {
		setting.inTime = i;
		setting.outTime = o;
	};
	this.setInTime = function(t) { setting.inTime = t; };
	this.setOutTime = function(t) { setting.outTime = t; };
	this.getInTime = function() { return setting.inTime; };
	this.getOutTime = function() { return setting.outTime; };
	
	// 숨참기 시간 설정 (0이면 없는 것으로 간주)
	this.setStopTime = function(t) { setting.stopTime = t; };
	this.onStop = function() { setting.stopTime = 1; };
	this.offStop = function() { setting.stopTime = 0; };
	this.getStopTime = function() { return setting.stopTime; };
	
	// [인-아웃]들의 맨 처음과 맨 뒤에 각자 공백을 둘 것인지 설정. (공백에 주어진 시간은 인앤아웃 타임과 동일)
	this.setSpaceBefore = function(bool) { setting.spaceBefore = bool; };
	this.setSpaceAfter = function(bool) { setting.spaceAfter = bool; };
	this.getSpaceBefore = function() { return setting.spaceBefore; };
	this.getSpaceAfter = function() { return setting.spaceAfter; };
	
	// [인-아웃]들 반복 설정 ({[][][]...} <- 이 중괄호는 cycle이며 이 반복횟수를 설정한다. 그리고 {}{} 사이 공백도 설정 가능하다)
	this.setRepeatCycle = function(n) { setting.repeatCycle = n; };
	this.getRepeatCycle = function() { return setting.repeatCycle; }
	this.repeatOff = function() { setting.repeatCycle = 1; };	// 1이 [][]들을 묶은 사이클 표시를 한번 한다는것, 반복 없다는 것이며 절대 한번 더가 아니다.
	
	// [인-아웃]들이 반복하면 반복단위 사이에 공백을 설정. (true면 []들의 반복단위 사이 공백을 설정, false면 반복단위 사이 쉼없이 이어서 함. 단 제목은 제외)
	this.setSpaceCycle = function(bool) { setting.spaceCycle = bool; };
	this.getSpaceCycle = function() { setting.spaceCycle; };
	
	// 들숨-날숨 상태 표시
	this.setModeAlign = function(a) { setting.modeAlign = a; };
	this.getModeAlign = function() { return setting.modeAlign; };
	this.setModeValign = function(v) { setting.modeValign = v; };
	this.getModeValign = function() { return setting.modeValign; };
	this.setModeEn = function(bool) { setting.modeEn; };	// true면 영어(기본값) 표시함
	this.getModeEn = function() { return setting.modeEn; };
	this.setModeLang = function(bool) { setting.modeLang = bool; };	// true면 다른 언어(아래 설정 가능) 표시함
	this.getModeLang = function() { return setting.modeLang; };
	this.setModeLangIn = function(p) { setting.modeLangIn = p; };
	this.getModeLangIn = function() { return setting.modeLangIn; };
	this.setModeLangOut = function(p) { setting.modeLangOut = p; };
	this.getModeLangOut = function() { return setting.modeLangOut; };
	this.setModeLangType = function(v) { setting.modeLangType = v; };	// 첫줄: -2, 같은줄 앞: -1, 같은줄 뒤: +1, 마지막줄: +2
	this.getModeLangType = function() { return setting.modeLangType; };
	
	// 그 맨처음 나타날 타이틀(제목)에 대한 설정 (제목을 []들의 반복단위마다 나타낼 것인가, []들의 맨 처음에 나타날 것인가, 그러면 맨앞공백보다 먼저 나타날 것인가 설정)
	this.setTitle = function(p) { setting.title = p; };
	this.setTitleAhead = function(bool) { setting.titleAhead = bool; };
	this.setTitleCycle = function(bool) { setting.titleCycle = bool; };
	this.setTitleShow = function(bool) { setting.titleShow = bool; };
	this.setTitleColor = function(c) { setting.titleColor = c; };
	this.setTitleBg = function(bool) { setting.titleBg = bool; };
	this.setTitleBgOpacity = function(n) { setting.titleBgOpacity = n; };
	this.setTitleBgColor = function(c) { setting.titleBgColor = c; };
	this.setTitleAlign = function(a) { setting.titleAlign = a; };
	this.getTitle = function() { return setting.title; };
	this.getTitleAhead = function() { return setting.titleAhead; };
	this.getTitleCycle = function() { return setting.titleCycle; };
	this.getTitleShow = function() { return setting.titleShow; };
	this.getTitleColor = function() { return setting.titleColor; };
	this.getTitleBg = function() { return setting.titleBg; };
	this.getTitleBgOpacity = function() { return setting.titleBgOpacity; };
	this.getTitleBgColor = function() { return setting.titleBgColor; };
	this.getTitleAlign = function() { return setting.titleAlign; };
	
	// 자막(스크립트) 표시 설정
	this.setScriptColor = function(c) { setting.scriptColor = c; };	// '#FFFFEE'
	this.setScriptAlign = function(a) { setting.scriptAlign = a; };	// -1: left, 0: center, +1: right
	
	// 자막(스크립트)의 서브 타이틀 표시 설정 (단순히 좌우센터 설정과 글자와 배경의 색깔 등을 설정)
	this.setSubtitleColor = function(c) { setting.subtitleColor = c; };
	this.setSubtitleAlign = function(a) { setting.subtitleAlign = a; };
	
	/*
	scriptColor: '#FFF',	// 색깔
		scriptBR: false,	// 띄어쓰기 (띄어쓰기 사용시 '#'을 기준으로 줄이 나뉘어 표시됨)
		scriptBg: false,	// 배경
		scriptBgOpacity: 0,	// 배경의 불투명도 (0-100 '%')
		scriptBgColor: '#333',	// 배경의 색깔
		scriptAlign: -1,	// 스크립트의 좌우 정렬(전체에서 위치, -1=왼쪽, +1=오른쪽, 0=센터)
		
		// 서브타이틀 설정 (BR 같은건 적용 안함. 스크립트만의 설정임)
		subtitleColor: '#FFF',	// 색깔
		subtitleBg: false,	// 배경
		subtitleBgOpacity: 0,	// 배경 불투명도 (0-100 '%')
		subtitleBgColor: '#333',	// 배경색
		subtitleAlign: -1,	
	*/
	
	
	// 아이디들을 불러오고 저장함
	this.saveIds = function(m, t, c, s, g) {
		setting.modeId = m;
		setting.titleId = t;
		setting.scriptId = c;
		setting.subtitleId = s;
		setting.graphicId = g;
	};
	this.loadIds = function() {
		return {
			mode: setting.modeId,
			title: setting.titleId,
			script: setting.scriptId,
			subtitle: setting.subtitleId,
			graphic: setting.graphicId,
		};
	};
	function getIdBGC() { return setting.graphicId + 'Background'; }
	function getIdMVC() { return setting.graphicId + 'Movement'; }
	function getIdLMC() { return setting.graphicId + 'Limit'; }
	function getIdBDC() { return setting.graphicId + 'Boundary'; }
	
	// 그래픽의 색깔을 설정 (bg: 배경, mv: 허파, lm: 갈비, bd: 허파막)
	this.setColors = function(bg, mv, lm, bd) {
		setting.bgc = bg;
		setting.mvc = mv;
		setting.lmc = lm;
		setting.bdc = bd;
	};
	this.setBackgroundColor = function(c) { setting.bgc = c; };
	this.setMovementColor = function(c) { setting.mvc = c; };
	this.setLimitColor = function(c) { setting.lvc = c; };
	this.setBoundaryColor = function(c) { setting.bdc = c; };
	this.getBackgroundColor = function() { return setting.bgc; };
	this.getMovementColor = function() { return setting.mvc; };
	this.getLimitColor = function() { return setting.lmc; };
	this.getBoundaryColor = function() { return setting.bdc; };
	
	
	
	
	
	
	
	
	/////////////////////////////////////////////////////////////////////////
	
	
	
	// color(rgb) + opacity => result
	function rgba(r, g, b, a) {
		var result = 'rgba('+r+','+g+','+b+','+a+'%)';
		return result;
	}
	
	
	/////////////////////////////////////////////////////////////////////////
	
	/*
	var scriptIndex = 0;
	
	function nextScript() {
		var s = scriptsArr[scriptIndex];
		
		if (checkHaveSubTitle(s)) {
			var subtitle = getSubtitleOnScript(s);
			
			changeSentence(subTitleId, subtitle);
			
			s = filterScript(s);
		}
		changeSentence(scriptId, s);
		
		scriptIndex++;
		
		// 만약 스크립트 전체를 다 읽었다면(사이클이 끝났다면) false를 반환, 아니면 true 반환.
		if (scriptIndex == scriptsArr.length) return false;
		return true;
	}
	
	// 스크립트에서 서브타이틀 유무 확인, 없으면 false 반환
	function checkHaveSubTitle(p) {
		return ((p.lastIndexOf('@')) != -1);
	}
	// 스크립트에서 서브타이틀 추출
	function getSubtitleOnScript(p) {
		var arr = p.split('@');
		return arr[arr.length-1];
	}
	// 서브타이틀이 있는 스크립트를 필터링하여 서브타이틀을 제거
	function filterScript(p) {
		var arr = p.split('@');
		return arr[0];
	}
	
	// 매번 바뀜
	function changeSentence(id, p) {
		document.getElementById(id).innerHTML = p;
	}
	*/
	
	/*
	// 기본 스크립트 선택을 위한 메뉴 구성 -> 다른 select에 사용할거임.
	this.setUpSelect = function() {
//		<select id="scriptMode">
//			<option value="0" onclick="" selected>7대 망대</option>
//			<option value="1" onclick="">7대 여정</option>
//		</select>
		var id = 'scriptMode';
		var p = '<select id="'+id+'">';
		
		for (var i = 0; i < scriptsArr.length; i++) {
			p += ('<option value="'+i+'" onclick="changeGraphic('+i+')"'+((i == 0)?' selected':'')+'>'+scriptsArr[i][0]+'</option>');
		}
		p += '</select>';
//		console.log(p);
		document.getElementById(id).innerHTML = p;
	}
	*/
	
	this.setUpGraphic = function() {
		var s = '<div id="'+getIdBGC()+'"><div id="'+getIdLMC()+'"><div id="'+getIdMVC()+'"><div id="'+getIdBDC()+'"></div></div></div></div>';
		document.getElementById(setting.graphicId).innerHTML = s;
		coloringGraphic();
	};
	
	function coloringGraphic() {
		document.getElementById(getIdBGC()).style.background = setting.bgc;
		document.getElementById(getIdLMC()).style.background = setting.lmc;
		document.getElementById(getIdMVC()).style.background = setting.mvc;
		document.getElementById(getIdBDC()).style.background = setting.bdc;
	}
	
	function setUpMode() {
		var id = setting.modeId;
		var s = '';
		
		if (setting.modeLang) s += '<p id="'+id+'Lang"></p>';
		if (setting.modeEn) s += '<p id="'+id+'En"></p>';
		
		document.getElementById(id).innerHTML = s;
		modeIn();
	}
	
	// 모드 상태를 알려주는 자막 변환
	function modeIn() {
		document.getElementById(setting.modeId+'Lang').innerHTML = setting.modeLangIn;
		document.getElementById(setting.modeId+'En').innerHTML = 'Breathe in';
	}
	function modeOut() {
		document.getElementById(setting.modeId+'Lang').innerHTML = setting.modeLangOut;
		document.getElementById(setting.modeId+'En').innerHTML = 'Breathe out';
	}
	
	
	
	
	
	
	// 그래픽 모드를 설정 (0: 5MBE; 1: beach;), 1을 기본값으로 하며 이 값은 배경을 숨쉬는 허파와 같은 원형 또는 파도 치는 해변 모래사장이다.
	var graphicMode = 1;
	
	this.setGraphicMode = function(mode) {
		graphicMode = mode;
	};
	this.getGraphicMode = function() {
		return graphicMode;
	};
	
	
	
	
	/*
	// 그래픽에서 각종 값을 설정 (위의 모드처럼 파도를 재현하거나 허파를 재현하는게 필요한 값, 기본값은 Beach 기준)
	var scWidth = '100%';
	var scHeight = '50%';
	var scPositionTop = '0%';
	var scPositionLeft = '50%';
	var scTransformLeft = '0%';
	var scTransformTop = '-50%';
	var scTransformMode = 'scaleX(), scaleY()';
	
	this.changeSC = function(m) {
		if (m == 0) {
			scWidth = '50%';
			scHeight = '50%';
			scPositionTop = '50%';
			scPositionLeft = '50%';
			scTransformLeft = '-50%';
			scTransformTop = '-50%';
		}
		else if (m == 1) {
			scWidth = '100%';
			scHeight = '50%';
			scPositionTop = '0%';
			scPositionLeft = '50%';
			scTransformLeft = '0%';
			scTransformTop = '-50%';
		}
	}
	
	this.getSCSize = function() {
		var w = scWidth;
		var h = scHeight;
		return { width: w, height: h };
	};
	this.getSCPosition = function() {
		var top = scPositionTop;
		var left = scPositionLeft;
		return { top: top, left: left };
	};
	this.getSCTransform = function() {
		var top = scTransformTop;
		var left = scTransformLeft;
		return { top: top, left: left };
	};
	
	// 
	
	*/
	
	var graphicMovementInScaleX = 1;
	var graphicMovementInScaleY = 1.5;	// 그놈이 문제인게 1이 60%일때 1.5는 90%이다. 반대로 100%까지 설정하면 이걸 어떻게 계산해 Y값에 넣을 것인가?
	var graphicMovementOutScaleX = 1;
	var graphicMovementOutScaleY = 1;
	// mode:0, Lungs 모드일 때 In(X:0.1, Y:0.1), Out(X:1,X:1)으로 설정된다.
	
	
	
	
	// 들숨일때 실행
	function setInhale() {
		var s = '<p id="ovModeKo">'+setting.modeLangIn+'</p><p id="ovModeEn">Breathe in</p>';
		document.getElementById(setting.modeId).innerHTML = s;
		// 1.5 - 1 = 0.5, 0.5 * 50 = translateY(%)
		document.getElementById(getGraphicMovementId()).style.transform = 'translate(0, 25%) scaleX('+graphicMovementInScaleX+') scaleY('+graphicMovementInScaleY+')';
	}
	// 날숨일때 실행
	function setOuthale() {
		var s = '<p id="ovModeKo">'+setting.modeLangOut+'</p><p id="ovModeEn">Breathe out</p>';
		document.getElementById(setting.modeId).innerHTML = s;
		document.getElementById(getGraphicMovementId()).style.transform = 'translate(0, 0%) scaleX('+graphicMovementOutScaleX+') scaleY('+graphicMovementOutScaleY+')';
	}
	
	// 위의 두 함수는 매번 반복되는 일이다. 그러나 이 함수에 크기 조정 등의 기능을 겸하게 될 것이다.
	
	
	
	// 그 아래는 스크립트와 그래픽 등 모든 것을 관여하여 표시하는 것들이다.
	// 즉 시간을 사용하는 지대라고 할 수 있다.
	
	
	function timewraps() {
		var arr = [];
		
		if (setting.spaceBefore) {
			
		}
		
		
		
		if (setting.spaceAfter) {
			arr.push({t: setting.inTime, });
			arr.push({t: setting.outTime, });
		}
		
		return arr;
	}
	
	function setTransitionTime(t) {
		 document.getElementById(getIdMVC()).style.transition = 'cubic-bezier(0.425,0.250,0.595,0.785) ' + t + 's';
		 document.getElementById(getIdMVC()).style.transform = 'scaleX(0.1) scaleY(0.1)';
		
	}
	
	
	// 맨 처음 표시하는 타이틀은 다른 함수가 이미 처리
	
	
	// 현재 사이클 순서, 1부터 시작하여 사용자 임의대로 작성한 스크립트의 값에 따라 종료된다.
	var cycle = 1;
	
	// 현재 반복 순서, 1부터 시작하여 사용자 설정 반복횟수 값대로 종료된다.
	var repeat = 1;
	
	this.setRepeat = function(n) {
		if (n > 0) repeat = n;
		else repeat = 1;
	};
	
	this.startTime = function() {
		startTimer();
		console.log('start timer');
	};
	
	function startTimer() {
		// 이게 몇 초간 진행되었는지 확인. 이걸로 넘어가게 될 시간을 판단
		var changeTime = 0;
			
		// 지금이 어떤 모드인지 판단하기 위함.
		var modeSet = 1;
		
		let timer = setInterval(() => {
			
			console.log(changeTime);
			
			// 아래는 테스트 결과 정확함. 그리고 여기에는 모드 대신 flag 비슷한 형태를 활용한다.
			// 예를 들어 타이틀 한번 보여주고 안뜨게 만들거나 spaceAfter/Before에 대해 사용할 수 있다.
			// 그리고 IN-OUT 이 시간이 제각각 시간이 다를 수 있고 자막 설정 역시 다르기 때문에 IN-OUT 그 함수에 넣는다.
			// 자막 부분은 IN인가 OUT인가, IN만 자막 뜨게 했는가 아니면 IN-OUT 묶어서 띄우게 했는가를 아웃소싱(?)으로 확인할 수 있도록 한다.
			
			// 일단 시간은 테스트를 위해 임시로 IN: 3초, OUT: 3초로 설정했다.
			if ((changeTime % 3 == 0) && (changeTime % 6 != 0)) {	// 들숨
				setInhale();
				
			}
			if (changeTime % 6 == 0) {	// 날숨
				setOuthale();
				
			}
			
			// 시간 더함
			changeTime++;
			
			// 시간이 지남
			if (changeTime == 60) {
				setTimeout(()=>{
					clearInterval(timer);
				}, 3 * 1000);	// 5는 설정한 값이고, 1000은 초(s)단위를 밀리초(ms)단위로 환산하기 위함.
			}
			
		}, 1000);
	}
	
	
	
}
