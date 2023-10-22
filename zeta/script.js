
function showBlockId(id) {
	document.getElementById(id).style.display = 'block';
}
function showFlexId(id) {
	document.getElementById(id).style.display = 'flex';
}
function hideId(id) {
	document.getElementById(id).style.display = 'none';
}

function setbox(id) {
	hideId('setboxMode');
	hideId('setboxTitle');
	hideId('setboxScript');
	hideId('setboxGraphic');
	hideId('setboxTime');
	hideId('setboxPosition');
	hideId('setboxDetails');
	showBlockId('setbox'+id);
	
	if (id == 'Script') newEditor();
}

function clickBtnReset() {
	document.getElementById('inTimeset').value = 5;
	document.getElementById('outTimeset').value = 5;
	document.getElementById('stopTimeset').value = 0;
	document.getElementById('graphicMode').value = 1;
	document.getElementById('repeatNum').value = 1;
}
function clickBtnStart() {
	hideId('setting');
	showFlexId('main');
	loadValues();
}

function startChecking() {
//	setStopTime();
//	dtChange();
//	dmChange();
}
function setStopTime() {
	if (getChecked('stopTimeEn')) {
		showBlockId('stopTimeGroup');
	}
	else {
		hideId('stopTimeGroup');
	}
}
function dtChange() {
	if (getChecked('dtOn')) {
		showBlockId('taGroup');
	}
	else {
		hideId('taGroup');
	}
}
function dmChange() {
	if (getChecked('dmOn')) {
		showBlockId('dmGroup');
		showBlockId('dmLang');
		showBlockId('dmTurn');
	}
	else {
		hideId('dmGroup');
		hideId('dmLang');
		hideId('dmTurn');
	}
}

function getChecked(id) {
	return document.getElementById(id).checked;
}
function getValue(id) {
	return document.getElementById(id).value;
}
function setValue(id, val) {
	document.getElementById(id).value = val;
}

function loadValues() {
	fm.setTime(getValue('inTimeset'), getValue('outTimeset'));
	fm.setStopTime(getValue('stopTimeset'));
	fm.setRepeatCycle('repeatNum')
	fm.setSpaceBefore(getValue('ioBs'));
	fm.setSpaceAfter(getValue('ioAs'));
	
	fm.setColors(getValue('bgc'), getValue('mvc'), getValue('lmc'), getValue('bdc'));
	fm.setUpGraphic();
}

function repeatOff() {
	fm.repeatOff();
	// display hide
}

function changeGraphic(m) {
	var lid = 'gpLimit';
	
	if (m == 0) {
		// Lungs
		setValue('lmw', 50);
		setValue('lmh', 50);
		setValue('lml', 50);
		setValue('lmr', 50);
			document.getElementById(lid).style.transform = 'translate(-50%, -50%)';
	}
	else if (m == 1) {
		// Beach
		setValue('lmw', 100);
		setValue('lmh', 70);
		setValue('lml', 50);
		setValue('lmr', 50);
			document.getElementById(lid).style.transform = 'translate(0%, 0%)';
	}
	
}


function changeScript(i) {
	
}








var fm = null;
fmStart();

function fmStart() {
	fm = new FMB();
	setTimeout(startChecking, 1000);
//	hideId('main');
//	hideId('end');
//	showBlockId('setting');
}

////////////////////////////////////////


function hideEditor() {
	document.getElementById('scripter').style.display = 'none';
}
function showEditor() {
	document.getElementById('scripter').style.display = 'block';
}

var SC = null;

function newEditor() {
	if (SC === null) {
		SC = new scEditor();
		document.getElementById('basicScripts').innerHTML = newBasicScriptsSelect(SC.getScriptsList());
//		console.log('에디터 생성 및 스크립트 고르기 구성 완료!');
	}
}

// 에디터 창 띄울때 실행되는 함수
function openEditor() {
	resetEditor();
	// 띄우기 이전에 모든 스크립트를 불러와 보여주도록 한다.
	showEditor();
	
}

function newBasicScriptsSelect(list) {
//	var code = '<option value="" selected disabled></option>';
	var code = '';
	for (var i = 0; i < list.length; i++) {
		code += '<option value="'+i+'" '+((i==0)?' selected':'')+'>'+list[i]+'</option>';
	}
	return code;
}

function selectScript() {
	var ss = document.getElementById('basicScripts');
	var index = ss.options[ss.selectedIndex].value;
	var text = ss.options[ss.selectedIndex].text;
	console.log(index, text);
	SC.loadScripts(index);
	// 나중에 불러올때 없는 번호를 부르거나 특정번호를 부른다면, 사용자 본인의 캐시를 불러오는걸로 한다.
}

// 스크립트에서 "#"은 비어있다는 뜻이다. 정확히 말해 디스플레이 상에서 표시되지 않은 라인을 나타낸다.

var scEditor = function() {
	var scriptsArr = [	// 무조건 인덱스 0은 제목이고 나머지가 스크립트임. @로 서브타이틀을 구분
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
	
	var scripts = ['타이틀', '라인1@서브타이틀1', '라인2', '라인3@서브타이틀2', '라인4'];
	
	// 차후에 사용자 브라우저의 세션에 스크립트를 저장하거나 저장된 스크립트를 불러와 편집할 수 있도록 할 계획이다.
	//
	//
	
	// 기본적으로 내장된 스크립트들의 제목을 추출하여 select에 배치시키기 위한 함수
	this.getScriptsList = function() {
		var list = [];
		for (var i = 0; i < scriptsArr.length; i++) {
			list.push(scriptsArr[i][0]);
		}
		return list;
	};
	
	// 선택한 스크립트를 에디터로 불러옴.
	this.loadScripts = function(index) {
		scripts = scriptsArr[index];
	};
	
	// 편집된 스크립트를 추출. -> FMB의 함수에 불러와 서브타이틀 등의 자막 표시에 사용됨.
	this.exportScripts = function() {
		return scripts;
	};
	
	// 스크립트 해당 인덱스 번호의 라인을 읽어옴 (서브타이틀 포함)
	this.readScript = function(index) {
		return scripts[index];
//		if (index != 0) {
//			return scripts[index];
//		}
//		else {
//			
//		}
	};
	this.getLine = function(index) {
		if (index != 0) {
			return scripts[index];
		}
//		else {
//			
//		}
	};
	
	
	this.getLength = function() {
		return scripts.length;
	};
	
	
	this.getTitle = function() {
		return scripts[0];
	};
	this.setTitle = function(p) {
		scripts[0] = p;
	};
	
	
	// 새로 라인을 추가하게 되어 새로운 번호(순서)를 발급
	this.newSubtitleLineId = function() {
		var num = 1;
		for (var i = 0; i < scripts.length; i++) {
			if (isSubtitleOnLine(scripts[i])) {
				num++;
			}
		}
		return num;
	};
	this.newScriptLineId = function() {
		// 서브스크립트가 전에 추가한 적이 있다면 (확인 방법은 '#' 유무로 판단) 마지막 아이디만 반환하고, 없다면 증산하여 반환한다.
		if (scripts.length > 0) return scripts.length;
		else return 1;
	};
	
	// 새로 서브타이틀을 추가
	this.newSubtitleLine = function() {
		// 서브타이틀 다음으로 오는 라인의 아이디가 몇번째인지 확인한 후 해당 아이디에 뒤에 서브타이틀 식별기호를 추가하기만 하면 된다.
		scripts.push('#@');
	};
	
	// 새로 라인을 추가
	this.newScriptLine = function() {
		// 추가하기 이전에 서브타이틀 추가한 적이 있는가 확인한 후, 추가한 전적이 있다면 #을 없앤다.
		if (isSubtitleOnLine(scripts[scripts.length-1])) {
			// 서브타이틀을 추가한 전적이 있다면
			scripts[scripts.length-1] = '@';
		}
		else {
			// 추가한 적 없다면 라인 추가
			scripts.push('');
		}
	};
	
	// 기존에 있는 서브타이틀 내용을 해당 인덱스에 병합
	function addSubtitle(index, p) {
		scripts[index] += (((isSubtitleOnLine(scripts[index])) ? '':'@') + p);
	}
	
	// 라인을 삭제하면서 기존에 있던 인덱스를 교체해야 한다. 다시 말해 재구성한다는 것이다.
	
	// 서브타이틀을 삭제 (이거 라인은 인덱스 유지하되 서브타이틀만 바꾼다)
	this.deleteSubtitleLine = function(index) {
		scripts[index] = getScriptOnLine(scripts[index]);
	}
	
	// 라인을 삭제
	this.deleteScriptLine = function(index) {
		
		// if문 써서 서브타이틀이 내장되있는지 확인
		if (isSubtitleOnLine(scripts[index])) {
			// 서브타이틀이 있으면 그걸 임시로 저장.
			var temp = getSubtitleOnLine(scripts[index]);
			if (isSubtitleOnLine(scripts[index+1])) {
				// 라인 바로 아래가 서브타이틀임.
				console.log('subtitle');
			}
			else {
				// 라인 바로 아래가 또 다른 라인임. 그러므로 그냥 라인을 삭제 처리함.
				
			}
		}
		else {
			// 서브타이틀이 없음 -> 바로 라인 삭제
		}
	}
	
	// 서브타이틀 바로 아래 라인을 삭제할 때 그 라인에 있는 서브타이틀을 읽고 그 다음(바로 아래) 라인에 저장하는 작업을 한다.
	// 서브타이틀 아래 라인에서 그 바로 아래 라인으로 저장한다는 것은 우선 라인 유무부터 따져야 할 것이다.
	// 그리고 서브타이틀 아래 라인 바로 아래 라인이 또 다른 서브타이틀일 경우, 자동으로 그 사이에 새로운 라인으로 끼우는걸로 처리한다.
	function moveSubtitleToLineBelow() {
		
	}
	
	
	function isSubtitleOnLine(p) {
		return ((p.lastIndexOf('@')) != -1);
	}
	function getSubtitleOnLine(p) {
		var arr = p.split('@');
		return arr[arr.length-1];
	}
	function getScriptOnLine(p) {
		var arr = p.split('@');
		return arr[0];
	}
	
};

function getTitle() {
	return document.getElementById('scEditorTitle').value;
}
function setTitle(p) {
	document.getElementById('scEditorTitle').value = p;
}
function resetTitle() {
	document.getElementById('scEditorTitle').value = SC.getTitle();
}

function addSubtitleLine() {
	var num = SC.newSubtitleLineId();
	
	var line = '<div class="scSubtitleLine" id="scSubtitleLine-'+num+'"><input type="text" id="scSubtitle-'+num+'" placeholder="Press to Subtitle..."><button onclick="deleteSubtitleLine('+num+');">&times;</button></div>';
	
	console.log(line);
	addLine(line);
	
	SC.newSubtitleLine();
}
function addScriptLine() {
	var num = SC.newScriptLineId();
	
	var line = '<div class="scScriptLine" id="scScriptLine-'+num+'"><input type="text" id="scScript-'+num+'" placeholder="Press to Line..."><button onclick="deleteScriptLine('+num+');">&times;</button></div>';
	
	console.log(line);
	addLine(line);
	// 이전에 서브타이틀을 추가한 전적이 있는지 확인한 후 라인을 추가
	
}

function addLine(code) {
	document.getElementById('scEditor').innerHTML += code;
}


function resetEditor() {
	var code = '';
	var stIndex = 1;
	var len = SC.getLength();
	console.dir(SC.exportScripts());
	
	for (var i = 0; i < len; i++) {
		var line = SC.readScript(i);
		if (i != 0) {
			if (((line.lastIndexOf('@')) != -1)) {
				// 서브타이틀이 있으면
				var subtitle = ((line.split('@'))[1]);
				line = ((line.split('@'))[0]);
				code += '<div class="scSubtitleLine" id="scSubtitleLine-'+stIndex+'"><input type="text" id="scSubtitle-'+stIndex+'" placeholder="Press to Subtitle..." value="'+subtitle+'"><button onclick="deleteSubtitleLine('+stIndex+');">&times;</button></div>';
				stIndex++;
			}
			code += '<div class="scScriptLine" id="scScriptLine-'+i+'"><input type="text" id="scScript-'+i+'" placeholder="Press to Line..." value="'+line+'"><button onclick="deleteScriptLine('+i+');">&times;</button></div>';
		}
		else {
			// 타이틀 처리
			setTitle(line);
		}
	}
	document.getElementById('scEditor').innerHTML = code;
}



// 완료 버튼 누르면 실행되는 함수
function completeEditor() {
//	console.log('Completed!');
	// 완료되고 숨겨지기 전에 모든 값들을 다 불러와 다른 곳으로 저장하도록 한다.
	hideEditor();
}


/*
// 이건 심심해서
function getAnglesClock(h, m, s) {
	var ha = getAngleHours(h, m, s);
	var ma = getAngleMinutes(m, s);
	var sa = getAngleSeconds(s);
	console.log(h+':'+m+':'+s);
	console.log('hour: '+ha+'º');
	console.log('minute: '+ma+'º');
	console.log('second: '+sa+'º');
}
function getAngleHours(h, m, s) {
	if (h > 12) {
		h-=12;
	}
	return 360/12*h + 30/60*m + 1/120*s;
}
function getAngleMinutes(m, s) {
	return (m*6) + (6/60*s);	// 이거 정확히 작동함.
	// 30분에 30초면 180도와 186도 사이 각(183도)이 나와야 됨 이론상.
}
function getAngleSeconds(s) {
	return ((s == 60) ? s * 6 : 0);
}
*/
