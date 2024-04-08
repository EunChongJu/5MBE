

// 여기 안에 system 클래스를 통해 스토리지에서 가져온 타임셋 값(없으면 기본값)으로 설정한다.

// 이 값들은 timeset, home, editor, system 페이지들간 값을 동일하게 공유하기 위함이다.
// 스토리지에 저장될 타임셋 값들의 아이디 값은 다음과 같다.
/*
// 타임 관련 (홈에 표시되는데 필요한 모든 값)
fm991s01	: IN
fm991s02	: OUT
fm991s03	: STOP
fm991s15	: cycle num (how many do cycle: 0이면 반복없고 1이면 한번만 더 하고, 2면 두번만 더)
fm991s21	: before (time)
fm991s23	: after (time)

// 에디터 설정 관련
fm994s00	: 1
fm994s01	: 1
fm994s02	: 1
fm994s03	: 1
fm994s04	: 1
fm994s05	: 1
fm994s06	: 1
fm994s07	: 1
fm994s08	: 1
fm994s09	: 1

fm994s20	: 타이틀 비울시 (그대로 비운채로 끝남: 0, 스크립트 이름으로 채움: 1)
fm994s21	: 1
fm994s22	: 1
fm994s23	: 1
fm994s24	: 1
fm994s25	: 1
fm994s26	: 1
fm994s27	: 1
fm994s28	: 1
fm994s29	: 1

fm994s30	: 1
fm994s31	: 1
fm994s32	: 1
fm994s33	: 1
fm994s34	: 1
fm994s35	: 1
fm994s36	: 1
fm994s37	: 1
fm994s38	: 1
fm994s39	: 1

// 디스플레이 표시 관련 (자막 위치나 색상, 크기와 같은 표시나 디스플레이에 표시될 컨셉화면 설정 등)
// 분명 subt.와 cont. 이 둘의 자막 박스는 다른 스타일링을 적용할 것이다.
fm997s10	: 1
fm997s11	: 1
fm997s12	: (IN/OUT에 따른) 자막 표시 (IN-OUT: 1(기본), IN(-STOP): 2, (STOP-)OUT: 3) (타임에 따라 언제 표시할지 설정)
fm997s13	: 1
fm997s14	: 1
fm997s15	: 1
fm997s16	: 1
fm997s17	: 그 디스플레이 배치 사용 (Lungs 배치를 가운데가 아닌 왼쪽 또는 오른쪽으로 배치하게 만들면 자막은 무조건 종서로 사용한다) (아무 상관 없으면 횡서 또는 종서로 사용할 수 있다)
fm997s18	: 자막 정렬 (횡서: 0, 종서: 1)
fm997s19	: 1

fm997s20	: 자막 위치 (위: 1, 아래: 2)
fm997s21	: 자막 텍스트 정렬 (왼쪽: 1, 가운데: 2, 오른쪽: 3)
fm997s22	: 자막 폰트 글꼴 (font-family 같은거, 글꼴을 선택한 후 selectIndex에 의해 숫자로 저장됨)
fm997s23	: 자막 폰트 사이즈 (rem)
fm997s24	: 자막 폰트 굵기 (font-weight)
fm997s25	: 자막 색상 ('#2196F3' 같은 헥스 코드 또는 CSS 색상명)
fm997s26	: 자막 글자 폭 지정 (font-stretch)
fm997s27	: 1
fm997s28	: 1
fm997s29	: 1

fm997s30	: 자막 텍스트 자간 (px)
fm997s31	: 자막 줄바꿈 기준 (글자 단위: 1, 라틴 문자 단어 단위: 2, 모든 문자 단어 단위: 3) (word-break: break-all/normal/keep-all)
fm997s32	: 자막 글자 사이 여백 (letter-spacing)
fm997s33	: 자막 단어 사이 여백 (word-spacing)
fm997s34	: 자막 줄과 줄 사이 여백 (line-height)
fm997s35	: 자막 들여쓰기 (또는 내어쓰기/지원안함)(text-indent)
fm997s36	: 자막 줄바꿈 규칙 설정 (white-space)
fm997s37	: 1
fm997s38	: 1
fm997s39	: 1

fm997s40	: 루비문자(일본어 후리가나) 사용(true: 1, false: 0)
fm997s41	: 루비문자 색상 (헥사 코드 또는 CSS 코드)
fm997s42	: 네온문자(사실상 그림자) 사용(true: 1, false: 0)
fm997s43	: 네온문자 가로 움직임 (px, 0이 기본)
fm997s44	: 네온문자 세로 움직임 (px, 0이 기본)
fm997s45	: 네온문자 번짐 정도 (px)
fm997s46	: 네온문자 색상 (헥사코드 또는 CSS 코드)
fm997s47	: 텍스트 외곽선 효과
fm997s48	: 텍스트 외곽선 효과
fm997s49	: 텍스트 외곽선 효과

fm997s50	: 1
fm997s51	: 1
fm997s52	: 1
fm997s53	: 1
fm997s54	: 1
fm997s55	: 1
fm997s56	: 1
fm997s57	: 1
fm997s58	: 1
fm997s59	: 1

fm997s60	: 1
fm997s61	: 1
fm997s62	: 1
fm997s63	: 1
fm997s64	: 1
fm997s65	: 1
fm997s66	: 1
fm997s67	: 1
fm997s68	: 1
fm997s69	: 1

fm997s70	: 자막 박스 정렬 (왼쪽: 1, 가운데: 2, 오른쪽: 3)
fm997s71	: 자막 박스 (width)크기 (%)
fm997s72	: 자막 박스 배경 색상
fm997s73	: 자막 박스 양쪽(left/right) Padding (rem)
fm997s74	: 자막 박스 top/bottom Padding (rem)
fm997s75	: 자막 박스 사이즈 (내용에 따라 크기가 변동되거나 아니면 박스 크기에 따라 내용이 띄어지거나)
fm997s76	: 1
fm997s77	: 1
fm997s78	: 1
fm997s79	: 자막 박스 둥근 모서리 (%, 0~50)

fm997s80	: 자막 박스 테두리 굵기 (px)(0이면 없음, 1부터)
fm997s81	: 자막 박스 테두리 색상 (헥스 또는 CSS 색상)
fm997s82	: 자막 박스 테두리 
fm997s83	: 자막 박스 테두리 
fm997s84	: 자막 박스 테두리 
fm997s85	: 1
fm997s86	: 1
fm997s87	: 1
fm997s88	: 1
fm997s89	: 1

fm997s90	: 자막 박스 그라데이션 처음 색상 (헥스 또는 CSS 색상)
fm997s91	: 자막 박스 그라데이션 끝 색상 (헥스 또는 CSS 색상)
fm997s92	: 자막 박스 그라데이션 각도 (deg)
fm997s93	: 자막 박스 그라데이션 중간 색상 (헥스코드로만, /로 구분)
fm997s94	: 1
fm997s95	: 1
fm997s96	: 1
fm997s97	: 1
fm997s98	: 1
fm997s99	: 1

// 오브젝트 상세 설정
fm998s10	: 오브젝트 모드 번호 (Lungs: 1, Beach: 2)
fm998s11	: 1
fm998s12	: 1
fm998s13	: 1
fm998s14	: 1
fm998s15	: timer 사용 유무
fm998s16	: 타이틀 사용 유무
fm998s17	: moder
fm998s18	: 표시(en)
fm998s19	: 표시(ko)

fm998s20	: 1
fm998s21	: 1
fm998s22	: 1
fm998s23	: 1
fm998s24	: 1
fm998s25	: 1
fm998s26	: 1
fm998s27	: 1
fm998s28	: 1
fm998s29	: 1

fm998s30	: 1
fm998s31	: 1
fm998s32	: 1
fm998s33	: 1
fm998s34	: 1
fm998s35	: 1
fm998s36	: 1
fm998s37	: 1
fm998s38	: 1
fm998s39	: 1

fm998s40	: 처음과 끝의 transform 설정 (skew, translate, scale, rotate) (이것들의 각 X, Y만으로 설정함, 3D 지원 안함)
fm998s41	: 1
fm998s42	: 1
fm998s43	: 1
fm998s44	: 1
fm998s45	: 1
fm998s46	: 1
fm998s47	: 1
fm998s48	: 1
fm998s49	: 1

fm998s50	: 1
fm998s51	: 1
fm998s52	: 1
fm998s53	: 1
fm998s54	: 1
fm998s55	: 1
fm998s56	: 1
fm998s57	: 1
fm998s58	: 1
fm998s59	: 1

*/

// 타임셋에서 사용되는 값들은 위와 같이 저장되고 불러와 사용된다.
// 여기에 setting page에서 사용되어 저장되고 불러와 사용될 값들이 포함되어 있다.

// FM 클래스
var FM = function() {
	
	// 처음 실행하는데서 설정값을 전부 초기화한다.
	function initData() {
//		setData(getDataId(tid, sid), value);
		
		setData(getDataId(91,1), 5);	// time IN
		setData(getDataId(91,2), 1);	// time STOP
		setData(getDataId(91,3), 5);	// time OUT
		setData(getDataId(91,15), 1);	// time +cycle
		setData(getDataId(91,21), 5);	// time before
		setData(getDataId(91,23), 5);	// time after
		
		setData(getDataId(94,20), 1);
	}
	
	// 처음 시작하면 실행하는 함수. 최초 스토리지에 아무도 없다면 scriptsArr로 초기화. 있으면 그대로 사용한다.
	// 그리고 설정값 또한 처음 시작시 초기화되도록 한다. (만약 스토리지가 있으면, 그 설정값들 아이디 전부 체크한다. 없는 아이디가 있으면 그것만 초기화된다)
	this.initStorage = function() {
		if (!checkSavedKeyStorage()) {
			console.log('아무도 없어 스토리지를 초기화함!');
			initStorageArr();
			
		}
		else {
			console.log('이미 스토리지에 저장되어 있음!');
			
		}
		// console.log(getKeysArr());	// 이건 스토리지에 저장된 키들 목록
		// console.log(getListArr());	// 이건 스토리지에 저장된 값들 목록
		
	}
	
	// 스토리지에 저장된 키들이 이미 우리가 저장한 키들인지 판단. (우리가 기본값으로 사용하여 저장한 아이디가 맞다면 true 반환)
	function checkSavedKeyStorage() {
		for (var key in localStorage) {
			if (localStorage.hasOwnProperty(key)) {	// 임시로 const key를 var key로 저장함
				var keyFirstId = key.charAt(0)+key.charAt(1);
				if (keyFirstId==firstId) return true;
			}
		}
		return false;
	}
	
	// 웹 스토리지 지원여부 검사
	function isPossibleWebStorage() {
		return (('localStorage' in window) && window['localStorage'] !== null);
	}
	
	// 스크립트 내 타이틀 1개와 컨텐츠 n개로 한 스크립트를 구성한다.
	// 그 중 컨텐츠 자리에 있는 '@'은 내용과 서브타이틀을 나눈다. 만약 '@'이 없다면 그것은 내용만을 의미한다.
	// 그리고 타이틀에 위치한 '@'은 스크립트 이름과 타이틀을 나눈다!
	// @이 없으면 이름과 타이틀이 같은 것으로 간주하나 @이 있다면 @ 왼쪽은 스크립트 이름, 오른쪽은 타이틀이라 한다.
	
	// @의 앞부분 추출 (스크립트 이름이나 컨텐츠 되는 내용을 반환)
	function getBeforeAt(p) {
		if (isString(p)) {
			return ((checkAt(p))?getSplitAt(p)[0]:p);
		}
		return '';
	}
	// @의 뒷부분 추출 (서브타이틀 및 타이틀을 반환)
	function getAfterAt(p) {
		if (isString(p)) {
			return ((checkAt(p))?getSplitAt(p)[1]:p);
		}
		return '';
	}
	// 내용에서 타이틀, 서브타이틀을 분리후 배열로 반환 ('@' 기준으로 없으면 그냥 [~]로 반환됨)
	function getSplitAt(p) {
		if (isString(p)) {
			return ((checkAt(p))?p.split('@'):p);
		}
		return '';
	}
	// @ 여부 확인 (있으면 true 반환)
	function checkAt(p) {
		return ((isString(p))?((p.lastIndexOf('@')) != -1):false);
		/*
		if (isString(p)) {
			return ((p.lastIndexOf('@')) != -1);
		}
		else {
			return false;
		}*/
	}
	
	// 함수들이 값에 대해 스트링이 아니란 이유로 에러가 발생함을 방지하기 위함
	function isString(val) {
		return (typeof val === 'string');
	}
	
	// 초기화시 이걸로 하시오.
	var scriptsArr = [
		// 7망대
		[
			'7망대@7망대 남은 자',
			'성부 하나님, 생명의 말씀으로 내게 임하여 주옵소서.@1. 성삼위 하나님',
			'성자 하나님, 생명의 구원으로 내게 임하여 주옵소서.',
			'성령 하나님, 생명의 능력으로 내게 임하여 주옵소서.',
			'하나님의 나라와 일이 이루어지는 보좌의 축복을 주옵소서.@2. 9가지 보좌의 축복',
			'이 응답이 시간과 공간을 초월하여 역사하게 하시고, ',
			'237의 빛이 되어 모든 문을 여는 증거 허락하옵소서.',
			'내 생명 속에 하나님의 형상이 임하고, ',
			'내 영혼 속에 하나님의 생기를 불어넣어 주시며, ',
			'내 삶 속에 에덴의 생명력을 회복하게 하옵소서.',
			'그리하여 나에게 전무후무한 오직의 응답을, ',
			'교회에 전무후무한 유일성의 응답을, ',
			'나의 업(현장)에 전무후무한 응답을 허락해 주옵소서.',
			'나의 과거는 세계복음화의 발판이요, @3. 3시대',
			'나의 미래는 전도자의 상급이 보장되어 있기에, ',
			'나의 오늘은 하나님의 시간표임을 깨닫게 하옵소서.',
			'저주와 재앙의 공중권세 잡은 자를 결박하고, @4. 공중 권세 잡은 자를 꺽는 능력',
			'사탄의 견고한 진을 무너뜨리는 능력을 허락하여 주옵소서.',
			'요엘이 예언하고, 베드로가 선포하며, @5. 오력',
			'엘리사가 구한 갑절의 영력을 허락하여 주옵소서.',
			'요셉과 다니엘이 누렸던, ',
			'왕 앞에 서서 세계를 살릴 수 있는 지력을 허락하여 주옵소서.',
			'엘리야와 삼손이 지닌 체력을 주옵시고, ',
			'내 몸에 알지 못하는 질병까지 치유하여 주옵소서.',
			'브리스가 부부와 야손, 가이오가 누렸던 ',
			'세계복음화의 경제력을 허락하여 주옵소서.',
			'아나니아, 바울, 디모데의 인력과 같은 전도자와 ',
			'제자의 만남을 허락하여 주옵소서.',
			'정확한 언약에 24 집중함으로 내 삶의 리듬을 회복하게 하시고, @6. 씨브이디아이피',
			'시대의 저주와 재앙을 보며 25의 참된 비젼을 보게 하옵소서.',
			'영원의 배경 속에서 하나님의 꿈을 실제로 그리는 가운데, ',
			'말씀 흐름의 기도 속에서 하나님 이미지로 정복의 능력을 체험하게 하옵소서.',
			'237나라와 5천 종족을 살릴 이방인의 뜰을 허락하여 주옵소서.@7. 세 가지 뜰',
			'묵상운동과 치유가 회복되는 기도의 뜰을 허락하여 주옵소서.',
			'후대들을 서밋으로 키우는 아이들의 뜰을 허락하여 주옵소서.'
		],
		// 7여정
		[
			'7여정@7여정 순례자',
			'영적 세계의 배경을 가진 존재로서 영적 신분과 권세를 누리며, @1. 성삼위 하나님',
			'성삼위 하나님의 여정을 가게 하옵소서.',
			'사건과 환경에 속지 않고, 언제 어디서든지 말씀 안에서 살아남는 @2. 10가지 비밀',
			'영적 독립의 비밀을 누리는 가운데, 현실과 사실, 진실을 넘어 ',
			'영적 사실을 보게 하옵소서.',
			'아무도 빼앗지 못하는 반대편(역발상)에 있는 하나님의 것에 집중하고,',
			'많은 사람을 살리는(시너지)쪽으로 방향 잡게 하옵소서.',
			'위기(기회)속에서도 보좌의 배경이 이 땅에 이루어지는 가운데',
			'싸우지 않고(무경쟁)승리하는 참된 능력을 누리게 하옵소서.',
			'아무도 막을 수 없는 오직, 유일성, 재창조의 응답을 받고, 가장 낮은 ',
			'곳에서 최고(서밋자리)로 도전하는 지도자 공부를 하게 하옵소서.',
			'모든 지역과 분야의 죽은 곳(광야, 사막, 황무지)을 살려내는 능력을 ',
			'누리고, 모든 사건과 일에 하나님의 절대 이유를 붙잡게 하옵소서.',
			'하나님은 영세 전부터 영원토록 시대와 역사를 주관(절대주권)하시며,@3. 10가지 발판',
			'그 방법은 오직 예수 그리스도를 통해 성취되고 그 능력은 지금도',
			'역사하시는 성령의 능력임을 믿습니다.',
			'확실한 보증서가 되는 하나님의 말씀(성경)을 붙잡고, 구원받은 나는 ',
			'하나님의 성전(성도)으로서 가장 가치 있는 존재임을 깨닫게 하옵소서.',
			'내가 있는 모든 현장은 파송하는 선교지(계획)이며, ',
			'나의 모든 생사화복(통치)을 주관하시고 그 걸음을 인도하실 줄 믿습니다. ',
			'반드시 한번은 죽는 시한부(섭리)인생이지만, ',
			'심판(내세) 후 보장된 천국의 축복 가운데, ',
			'전도자의 상급이 예비되어 있음을 믿고 누리게 하옵소서.',
			'그리스도를 믿는 자마다 구원을 주심으로 하나님 자녀 삼으시고, @4. 5가지 확신',
			'그리스도 이름으로 기도할 때 반드시 응답하심을 확신합니다.',
			'그리스도 십자가의 은혜로 죄와 사망의 법에서 영원히 해방(사죄)되었기에,',
			'그리스도의 권세로 자신과 세상과 사탄과 싸워 반드시 승리하며, ',
			'성령께서 끝까지 책임지시고 인도하심을 확신합니다. ',
			'전도자의 21가지 삶(갈보리산, 감람산, 마가다락방/ 천명, 소명, 사명@6. 62가지 전도자의 삶',
			'당연, 필연, 절대/ 일심, 전심, 지속/ 오직, 유일성, 재창조/ 24, 25, 영원',
			'각인, 뿌리, 체질)이 나의 본질이 되게 하옵소서.',
			'(구원의 감사, 말씀의 흐름, 집중의 능력, 치유의 답, 미래의 균형)가 @5가지 기도',
			'개인화 되게 하시고, ',
			'7가지 달란트',
			'(복음의 말씀, 렘넌트 7명, 138정체성, 예배, 오직, 유일성, 재창조)',
			'를 찾게 하옵소서.',
			'9가지 흐름(넓이, 깊이, 높이/ 위, 아래, 옆/ 과거, 현재, 미래)으로 싸우지 않고',
			'승리하게 하시고, ',
			'20가지 전도전략(다락방, 팀사역, 미션홈, 전문교회, 지교회/ 1차합숙, 팀합숙, ',
			'70인1차, 전문별, 전도합숙/ 전도학교, 전도신학원, 선교사 훈련원, 알티에스, ',
			'알유/ 엘리트, 산업선교, 문화, 치유, 렘넌트)으로 ',
			'성경적인 전도운동을 체험하게 하옵소서.',
			'모든 것이 교회의 강단 말씀과 연결되는 가운데, @7. 캠프(교회, 예배)',
			'놀라운 인생 캠프를 체험하게 하옵소서.'
		],
		// 7이정표
		[
			'7이정표@7이정표 정복자',
			'그리스도께서 십자가에서 다 이루신 그곳(안되는 나)에서 @1. 갈보리산(요19:30)',
			'모든 것을 시작하게 하옵소서.',
			'하나님 나라(보좌)와 그의 일(미션)이 나를 통해 이 땅에 이뤄지게 하옵소서.@2. 감람산(행1:3)',
			'마가다락방(행2장)에 나타났던@3. 마가다락방(행2:1-47)',
			'5가지 시간표(1: 오순절 날, 5: 그때에, 8: 그때에, 41: 이날에, 46:날마다)와',
			'5가지 힘(2:바람, 불, 6:각각방언, 11:큰일, 41:3천제자, 44-45:경제)과',
			'5가지 문(1:다락방, 9-11:15나라, 41:현장, 42:예배, 46-47:성전, 가정)의 ',
			'역사가 내게 임하게 하옵소서.',
			'환난과 흩어짐 앞에 분명한 이유를 깨닫고 @4. 안디옥교회(행11:19)',
			'세계복음화의 축복을 찾아 누리게 하옵소서.',
			'확실한 응답부터 받고 모든 것(사람, 장소, 일)을 진행하게 하시되, @5. 아시아(행13:1-4)',
			'세밀한 성령의 인도를 받게 하옵소서.',
			'문이 막혔을 때에 하나님의 더 큰 계획을 보며, 인생의 전환점 가운데 @6. 마게도냐(행16:6-10)',
			'제자를 찾게 하옵소서.',
			'237나라, 5천 종족을 향해 로마를 보며 가이사 앞에 서는 @7. 로마(행19:1-21)',
			'증거를 허락하여 주옵소서.'
		],
		// 21성구
		[
			'21성구@복음의 눈으로 모든 것을 보라',
			'그들이 이렇게 말함은 고발할 조건을 얻고자 하여 @요한복음 8:6-7',
			'예수를 시험함이러라 예수께서 몸을 굽히사 손가락으로 땅에 쓰시니,',
			'그들이 묻기를 마지 아니하는지라 이에 일어나 이르시되 너희 중에',
			'죄 없는 자가 먼저 돌로 치라 하시고',
			'이같이 율법이 우리를 그리스도께로 인도하는 @갈라디아서 3:24',
			'초등교사가 되어 우리로 하여금 믿음으로 말미암아 의롭다 함을 ',
			'얻게 하려 함이라',
			'시몬 베드로가 대답하여 이르되 주는 그리스도시요 @마태복음 16:16',
			'살아계신 하나님의 아들이시니이다',
			'그러므로 한 사람으로 말미암아 죄가 세상에 들어오고 죄로 말미암아@로마서 5:12',
			'사망이 들어왔나니 이와 같이 모든 사람이 죄를 지었으므로 사망이',
			'모든 사람에게 이르렀느니라',
			'인자가 온것은 섬김을 받으려 함이 아니라 도리어 @마가복음10:45',
			'섬기려 하고 자기 목숨을 많은 사람의 대속물로 주려 함이라',
			'하나님께 감사하리로다 너희가 본래 죄의 종이더니@로마서 6:17-18',
			'너희에게 전하여 준 바 교훈의 본을 마음으로 순종하여, 죄로부터',
			'해방되어 의에게 종이 되었느니라',
			'내가 진실로 진실로 너희에게 이르노니 내 말을 듣고@요한복음 5:24',
			'또 나 보내신 이를 믿는 자는 영생을 얻었고 심판에 이르지 아니하나니',
			'사망에서 생명으로 옮겼느니라',
			'하나님이 나사렛 예수에게 성령과 능력을 기름 붓듯 @사도행전 10:38',
			'하셨으매 그가 두루 다니시며 선한 일을 행하시고 마귀에게 눌린 모든',
			'사람을 고치셨으니 이는 하나님이 함께 하셨음이라',
			'주께서 이르시되 가라 이 사람은 내 이름을 이방인과 @사도행전 9:15',
			'임금들과 이스라엘 자손들에게 전하기 위하여 택한 나의 그릇이라'
		],
		// 138기도
		[
			'138기도',
			'예수께서 신 포도주를 받으신 후에 이르시되 다 이루었다 하시고 머리를 숙이니 영혼이 떠나가시니라(요19:30).',
			'십자가에서 우리의 모든 죄와 저주, 재앙을 해결하신 예수님을 오직 그리스도로 믿는 믿음을 주옵소서.',
			'그가 고난 받으신 후에 또한 그들에게 확실한 많은 증거로 친히 살아 계심을 나타내사 사십 일 동안 그들에게 보이시며 하나님 나라의 일을 말씀하시니라(행1:3).',
			'하나님의 통치하심이 가는 모든 곳에 임하며, 천사가 동원되고 흑암이 무너지는 오직 하나님 나라의 비밀 누리게 하옵소서.',
			'오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러/내 증인이 되리라 하시니라(행1:8).',
			'보좌에서 내리는 오직 성령의 충만함으로 영적인 힘을 얻고, 가는 모든 곳이 살아나는 증인으로 살아가게 하옵소서.',
			'그리스도, 하나님 나라, 오직 성령 언약 붙잡고 기도함으로 나와 모든 만남이 살아나는 전도자의 축복 누리게 하옵소서.',
			'지금도 나와 함께하시고 모든 걸음 인도하시는 우리 주 예수 그리스도 이름으로 기도합니다. 아멘.'
		],
		// 777기도
		[
			'777기도',
			'성삼위 하나님의 능력이 내 생각, 마음, 영혼, 몸 모든 것을 사로잡아 주옵소서.@7망대',
			'보좌의 능력, 시공간 초월과 237의 능력이 내 속에 임하게 하옵소서.',
			'내 생명 속에, 내 영혼 속에, 내 삶 속에 이 능력이 임하게 하옵소서.',
			'전무후무한 답이 나에게, 내 학업에, 내 현장에, 교회에 주시옵소서.',
			'하나님이 나의 과거, 현재, 미래 속에 능력으로 역사해 주옵소서.',
			'이 시간에 하나님 나에게 영력, 지력, 체력, 경제력, 인력을 주시옵소서.',
			'나에게 시공간 초월하는 공중권세 잡은 자 이기는 능력을 주옵소서.',
			'나에게 미리보는 씨브이디아이피 축복을 지금 나에게 허락해 주옵소서.',
			'세 가지 뜰 움직일 수 있는 능력을 지금 내 속에 부어주옵소서.',
			'하나님, 나에게 내 속에 임하셔서 성삼위 하나님이 인도하시는 길로 가게 하옵소서.@7여정',
			'어려움 통해서 하나님이 준비해 놓은 그 길 찾기 위해 10가지 비밀 누리게 하옵소서.',
			'듣는대로, 생각대로, 추측대로, 더해서 말하지 않고, 나에게 10가지 발판이 놓이게 하옵소서.',
			'어떤 어려움도 복음 이길 수 없으니, 5가지 확신 내게 응답으로 역사해 주옵소서.',
			'하나님의 능력으로 싸우지 않고, 세상 바꾸는 9가지 흐름 누리게 해주옵소서.',
			'평생에 누릴 답을 나에게 허락해 주옵소서.',
			'오늘 모든 가는 곳에 보좌의 캠프가 일어나게 해주옵소서.',
			'나의 모든 재앙, 저주, 실패, 흑암 다 무너지도록 갈보리산 언약이 내게 임하게 해주옵소서.@7이정표',
			'오늘 가는 곳에 감람산에서 주셨던 언약이 하나님 나라의 일이 이루어지게 하옵소서.',
			'마가다락방에서 임했던 역사 내게 임하게 하옵소서.',
			'안디옥에서 나타났던 하나님의 시간표 내게 주옵소서.',
			'바울의 첫번째 선교지, 모든 답을 찾아낸 아시아에 있었던 그 일을 내게 주옵소서.',
			'바울팀이 얻어냈던 인생 전환점, 찾아내게 하옵소서.',
			'로마도 보게 해주옵소서.',
			'7망대가 내 속에, 7여정이 내 앞에, 7이정표가 내 배경 속에 있게 하옵소서.@777기도',
			'내 앞에 있는 흑암에 도전하도록 언약 붙잡게 하옵소서.',
			'지금부터 기도하다가 영적 시스템을 갖추며, 세계 정복하는 집중력을 허락해 주옵소서.',
			'금토일 시대를 열어 교회 살리고, 현장 살리는 증인으로 서게 해주옵소서.',
			'예수 그리스도 이름으로 기도합니다. 아멘.'
		],
		// 그리스도 누림 기도
		[
			'그리스도 누림 기도',
			'시몬 베드로가 대답하여 이르되 주는 그리스도시요 살아 계신 하나님의 아들이시니이다(마16:16).',
			'예수님은 그리스도시요 살아 계신 하나님의 아들이심을 믿습니다.',
			'이는 그리스도 예수 안에 있는 생명의 성령의 법이 죄와 사망의 법에서 너를 해방하였음이라(롬8:2).',
			'예수님은 죄와 사망에서 해방하시고, 저주와 재앙에서 건지신 참 제사장 그리스도이심을 믿습니다. ',
			'죄를 짓는 자는 마귀에게 속하나니 마귀는 처음부터 범죄함이라 하나님의 아들이 나타나신 것은 마귀의 일을 멸하려 하심이라(요일3:8).',
			'예수님은 사탄의 머리를 깨트리시고, 마귀의 일을 멸하신 참된 왕 그리스도이심을 믿습니다. ',
			'예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라(요14:6).',
			'예수님은 하나님 만나는 길이 되시고 진리요 생명 되신 참 선지자 그리스도이심을 믿습니다. ',
			'그리스도께서 나의 모든 문제의 주인 되시고, 길이 되셔서 다스리시며 인도하여 주옵소서.',
			'나의 문제에 메이지 않고 하나님이 주시는 참 평안으로 자유하게 하시며 믿음으로 승리하게 하옵소서.',
			'하나님 자녀의 기도를 받드시 응답하시며 성령으로 역사하실 줄 믿습니다. ',
			'예수 그리스도 이름으로 기도합니다. 아멘.'
		],
		// 신년, 원단
		[
			'신년, 원단',
			'신년 : 그 황무한 땅을 기업으로 상속하리라(사49:8)',
			'후대 - 영원, 치유 - 영원, 237선교 - 영원',
			'그리스도로 맺어진 새 구원의 언약으로 은혜를 덧입고 @1. 회복의 약속(영원의 축복)',
			'빛 가운데 거하게 하옵소서.',
			'세상 끝 날까지 우리와 함께하시고 보호하시며 인도하시는 ',
			'형통함을 누리게 하옵소서.',
			'불가능을 가능케 하시는 하나님의 역사로 모든 것이 회복되는 ',
			'작품의 한 해 되게 하옵소서.',
			'후대 - 영원(사49:15) : 본격적으로 금(기도, 건강), 토(렘넌트 중심), @2. 왜 이런 축복을 주시는가? - 기업이 상속되게 하기 위해',
			'일(예배 중심)시대를 열어 렘넌트들이 달란트를 발견하게 하옵소서.',
			'치유 - 영원(사49:19) : 우리 속에 있는 잘못된 망대부터 무너뜨리고, ',
			'올바른 집중(묵상) 가운데 치유시스템을 세우게 하옵소서.',
			'237선교 - 영원(사49:6/18,20,22) : 세계화와 복음화를 위한 세 가지 ',
			'뜰을 세우고 우리 자신과 교회가 세계복음화 속에 있게 하옵소서.',
			'원단 : 제 1,2,3 알유티씨 응답의 영원',
			'1강. 영원한 기업 - 기다려라(행1:1-8)',
			'영원한 언약(138), 영원한 내용(777), ',
			'약속하신 것(237, 5천, 세 뜰, 금토일시대)을 기다리게 하옵소서.',
			'2강. 영원한 작품 - 집중하라(행1:14, 2:1-47)',
			'흐름(창3:15, 출3:18, 사7:14, 마16:16), ',
			'내용(세 절기, 세 뜰, 금토일시대), ',
			'결과(앉은뱅이, 스데반, 사마리아, 에디오피아 내시)에 집중하게 하옵소서.',
			'3강. 영원한 유산 - 도전하라(행11:19)',
			'받은 유산(하나님의 나라, 부름의 상, 천국 시민권, 세세무궁 언약), ',
			'사용한 유산(성령 인도, 치유, 기적)',
			'전달할 유산(그리스도 당위성, 예배, 기도, 참 응답)에 도전하게 하옵소서.'
		],
	];
	
	// 키를 발급받으면 값을 저장할 수 있는 체계적 구조를 띈다.
	
	// 스토리지에 저장
	function save(id, val) {
		localStorage.setItem(id, val);
	}
	// 스토리지에서 가져옴
	function load(id) {
		return localStorage.getItem(id);
	}
	// 그 아이디가 스토리지에 저장되어 있는지 확인
	function is(id) {
		
	}
	
	// 테스트를 위함: 클리어
	this.clearStorage = function() {
		localStorage.clear();
	};
	
	
	// 원래 의도대로라면 초기화할 때 이걸로 스토리지에 저장한 다음 이 배열은 다음 초기화 때까지 사용되지 않아야 한다.
	// 그리고 only 스토리지에서만 불러와 사용되어야 한다.
	
	// 스토리지에 저장된 스크립트의 네임 전부 가져온다.
	this.getScriptNameArr = function() {
		var result = [];
		var keys = getKeysArr();
		
		for (var i = 0; i < keys.length; i++) {
			if (getContentIndex(keys[i]) === 0) {
				var val = load(keys[i]);
				result.push(getBeforeAt(val));
			}
		}
		
		return result;
	};
	
	// 스토리지에 저장된 타이틀 전부를 가져온다.
	this.getScriptTitleArr = function() {
		var result = [];
		var keys = getKeysArr();
		
		for (var i = 0; i < keys.length; i++) {
			if (getContentIndex(keys[i]) === 0) {
				result.push(getAfterAt(load(keys[i])));
			}
		}
		return result;
	};
	
	// 키 목록을 전부 가져온다. (저장된 스토리지 키 모두, 순서대로 정렬 후 반환)
	function getKeysArr() {
		var result = [];
		for (var key in localStorage) {	// 임시로 const key를 var key로 저장함
			if (localStorage.hasOwnProperty(key)) {
				var keyFirstId = key.charAt(0)+key.charAt(1);
				if (keyFirstId==firstId) {
					result.push(key);
				}
			}
		}
		return result.sort();
	}
	
	// 스토리지 스크립트 내용을 전부 가져온다. (저장된 스토리지 키 순서대로)
	function getListArr() {
		var result = [];
		var keys = getKeysArr();
		for (var i = 0; i < keys.length; i++) {
			result.push(load(keys[i]));
		}
		return result;
	}
	
	// 만약에 스토리지에 아무도 없다면 scriptsArr을 가져와 저장 (즉 초기화한다)
	function initStorageArr() {
		for (var i = 0; i < scriptsArr.length; i++) {
			for (var j = 0; j < scriptsArr[i].length; j++) {
				var id = getStorageId(i, j);
				save(id, scriptsArr[i][j]);
			}
		}
	}
	
	// 스크립트-콘텐츠 번호만으로 아이디를 생성(또는 추출) 즉, 키를 발급 받는다.
	function getStorageId(scriptIndex, contentIndex) {
		return (firstId + addZero(scriptIndex) + centerId + addZero(contentIndex));
	}
	
	// 숫자 값이 한 자리수면 앞에 0을 붙여 반환함
	function addZero(n) {
		return (((n/10) < 1) ? ('0'+n):n);
	}
	
	// 아이디 값에서 스크립트 인덱스를 추출함
	function getScriptIndex(id) {
		return parseInt(id.split(centerId)[0].substr(firstId.length));
	}
	// 아이디 값에서 컨텐츠 인덱스를 추출함
	function getContentIndex(id) {
		return parseInt(id.split(centerId)[1]);
	}
	
	// 아래는 아이디에서 이 시스템만이 사용하는 식별기호와 같은 것이다.
	// 이것은 스크립트 식별자라고 할 수 있다.
	var firstId = 'fm';
	// 이것은 스크립트 키 내 번호와 컨텐츠 번호의 구분자라 할 수 있다.
	var centerId = 's';
	// 이것은 웬만해선 안바꾸는 것을 추천한다.
	// 왜냐하면 이 아이디들은 이 프로그램에서 사용자가 바뀌었을 때 아이디들도 바뀌어 새로 발급되기 때문이다.
	
	this.setFirstId = function(id) {
		firstId = id;
	};
	this.getFirstId = function() {
		return firstId;
	};
	this.setCenterId = function(id) {
		centerId = id;
	};
	this.getCenterId = function() {
		return centerId;
	};
	
	
	// 저장된 스크립트에 번호를 통해 스크립트를 배열로 추출해 반환 (문자열 형태로, @ 포함된 채로 반환함)
	this.getScriptStorageArr = function(scriptIndex) {
		var arr = getScriptIndexIdArr(scriptIndex);
		var result = [];
		
		for (var i = 0; i < arr.length; i++) {
			result.push(load(arr[i]));
		}
//		console.log(result);
		return result;
	}
	
	// 해당 번호를 가진 스크립트 인덱스를 배열로 모두 반환 (아이디 값 형태로 반환함)
	function getScriptIndexIdArr(scriptIndex) {
		var keys = getKeysArr();
		var result = [];
		
		for (var i = 0; i < keys.length; i++) {
			if (getScriptIndex(keys[i]) === scriptIndex) {
				result.push(keys[i]);
			}
		}
//		console.log(result);
		return result;
	}
	
	// 스토리지에 새로 스크립트를 추가함
	this.addScript = function(addScriptId) {
		save(getStorageId(addScriptId, 0), '새로운 스크립트');
		save(getStorageId(addScriptId, 1), '');
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//// Setting
	
	this.initSetting = function() {
		initData();
	}
	
	// 근데 설정값이란게 스크립트라고 할 수 없으므로 스크립트 수에서 제외되도록 해야 한다.
	// 그래서 제일 먼저 한 일은 설정값의 스토리지 아이디라는 것을 두자리 단위가 아닌 세자리, 그것도 백자리 수는 9로 끝난다. (ex: fm991s68, fm999s01 ...)
	
	// 그거 get, set라 하지 말고 함수 앞의 이름을 다르게 하는 것이다
	// 그것은 data라 하여 setting이란 이름을 대체하여 함수 이름을 정하는 것이다
	// 그리고 파라미터에서 받는 값은 두자리수로, 아이디에서는 자동으로 9가 붙어 저장된다
	
	// 특정 설정값을 설정한다.
	this.setData = function(tid, sid, val) {
		var dataId = getDataId(tid, sid);
		
		// 저장을 하기 전에 val의 값을 스토리지 저장에 최적화된 형태의 데이터로 전환하는 절차를 밟도록 한다.
		
		save(dataId, val);
//		setData(dataId, val);
	}
	
	// 특정 설정값을 불러온다.
	this.getData = function(tid, sid) {
		var dataId = getDataId(tid, sid);
		
		return load(dataId);
//		load(dataId);
//		getData(dataId);
		
		// 로드한 데이터를 리턴하기 전에 알 수 있는 형태로 해석하는 절차를 거친 후 리턴한다.
		
	}
	
	// setting을 위한 data 아이디를 발급한다.
	function getDataId(tid, sid) {
//		'fm' + tid + 's' + sid;
		// 여기선 앞부분(tid)만 두자리수를 받기 때문에 addZero가 필요없다.
		return (firstId + '9' + tid + centerId + addZero(sid));
	}
	
	// 특정 설정값 저장 (단, id는 이미 발급받은것)
	function setData(id, val) {
		save(id, val);
	}
	// 특정 설정값 불러오기 (단, id는 이미 발급받은것)
	function getData(id) {
		load(id);
	}
	
	// 그 값이 모두 잘 있는지 확인하는게 필요할 것이다. (아이디 탐색범위: [fm(980~999)s(00~99)]*)
	// 그 값이 만약에 비어있다면 그 값만 초기화하도록 해야 한다.
	function checkData() {
		var result = [];
		
		// 탐색범위: (80 ~ 99)
		for (var i = 80; i < 100; i++) {
			// 탐색범위: 00 ~ 99
			for (var j = 0; j < 100; j++) {
				var dataId = getDataId(i, j);
				// 그것은 getData나 load가 아닌 단순히 체크만 하는 함수를 사용해야 한다.
				if (is(dataId)) result.push(dataId);
				// 근데 그걸 아이디 안에 값이 비어있을 때만 실행하는 것이다.
				// 그리고 문제는 중간 비어있을 설정값 또한 존재할건데 이걸 어떻게 처리할것인가다.
			}
		}
		
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
}


