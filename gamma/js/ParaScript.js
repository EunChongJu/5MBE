
var ParaScript = function() {
	const templates = [
		{
			title: "기본",
			inhaleTime: 5,	// inhale time
			exhaleTime: 5,	// exhale time
			useHoldingTime: false,
			holdingTime: 0,
			repeat: 1,
			mergeInEx: false,
			useCC: true,
			scripts:[
				'들이쉬기',
				'숨참기',
				'내쉬기',
			],
			startScript: '호흡에 관심 기울이기',
			endScript: '마무리',
		},
		{
			title: "393 호흡기도문",
			inhaleTime: 5,
			exhaleTime: 5,
			useHoldingTime: false,
			holdingTime: 0,
			repeat: 1,
			mergeInEx: true,
			useCC: false,
			scripts: [
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
			startScript: '호흡에 관심 기울이기',
			endScript: '마무리',
		},
	];

	var parasList = [];
	var parasId = 1;

	var startParas = '';
	var endParas = '';

	this.getStartParas = function() {
		return startParas;
	};
	this.setStartParas = function(data) {
		startParas = data;
	};
	this.getEndParas = function() {
		return endParas;
	};
	this.setEndParas = function(data) {
		endParas = data;
	};

	this.add = function() {
		var el = {
			id: parasId, paras: ''
		};
		parasList.push(el);
		return parasId++;
	};

	this.delete = function(i) {
		parasList.splice(i,1);
	};

	this.change = function(i, paras) {
		parasList[i].paras = paras;
	};

	this.seek = function(i) {
		return parasList[i].paras;
	};

	this.findId = function(id) {
		for (var i = 0; i < parasList.length; i++) {
			if (parasList[i].id == id) return i;
		}
		return -1;
	};

	this.sort = function() {
		var newParasList = [];
		for (var i = 0; i < parasList.length; i++) newParasList.push({id: i, paras: parasList[i].paras});
		parasList = newParasList;
	};

	this.reset = function() {
		parasList = [];
		parasId = 1;
	};

	this.id = function() {
		return parasId;
	};

	// startParas, endParas를 제외한 파라스크립트 출력
	this.get = function() {
		return parasList;
	};

	// startParas, endParas를 제외한 파라스크립트 입력
	this.set = function(data) {
		this.reset();
		parasList = data;
		this.sort();
	};

	this.getAll = function() {
		var result = {
			start: startParas,
			end: endParas,
			list: parasList,
		};
		return result;
	}

	// 파라스크립트 데이터들을 export 또는 import한다.
	// 후에 추출한 파라스크립트 데이터는 Exercise의 값과 합쳐 하나의 파일로 저장할 수 있다.
	// 반대로 Exercise에 필요한 데이터를 분리하면 파라스크립트 데이터만 남는다. 이걸로 임포트하면 된다.

	// 임포트
	this.import = function(data) {
		var parasArr = [];

		// 데이터의 분리 및 처리는 생략

		var newParasList = [];
		for (var i = 0; i < parasArr.length; i++) {
			newParasList.push({id: i, paras: parasArr[i]});
		}
		parasList = newParasList;
	}

	// 익스포트
	this.export = function() {
		var data = '';

		for (var i = 0; i < parasList.length; i++) {
			data += ('/' + parasList[i].paras);
		}
		data += '//' + startParas + '///' + endParas + '/';

		return data;
	}

	this.selectScript = function(n) {
		return templates[n-1];
	}

	this.saveStorage = function() {
		var value = this.getAll();
		localStorage.setItem('fmbeParas', JSON.stringify(value));
	};

	this.loadStorage = function() {
		var value = JSON.parse(localStorage.getItem('fmbeParas'));
		// load paras
	};

	this.removeStorage = function() {
		localStorage.removeItem('fmbeParas');
		// localStorage.clear();
	}
	this.checkStorage = function() {
		if (('localStorage' in window) && window['localStorage'] !== null) {
			console.info('This browser can use WebStorage!');
			return true;
		}
		else {
			console.error('This browswe CAN`T use WebStorage!');
			return false;
		}
	};
};
