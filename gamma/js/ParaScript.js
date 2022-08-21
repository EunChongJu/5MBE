
var ParaScript = function() {
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
};
