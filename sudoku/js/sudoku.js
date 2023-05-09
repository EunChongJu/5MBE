
/*
const hexadecimalMap = [
	[
		'0','0','7','2', 'A','0','D','1', 'B','8','5','6', '4','3','0','9',
		'B','0','4','8', '3','0','6','5', '0','0','7','E', 'A','C','1','2',
		'1','9','6','0', '0','4','8','7', '2','0','A','0', 'D','5','B','E',
		'D','0','0','5', 'B','2','0','E', '4','1','0','0', '7','6','0','8',
		
		'0','B','C','0', '0','8','0','2', '6','0','0','5', 'E','1','A','D',
		'4','8','5','9', 'E','A','1','B', '7','3','2','D', 'G','F','C','6',
		'7','6','0','0', '0','0','0','3', '8','E','0','0', '2','B','9','5',
		'0','2','0','D', '6','0','5','G', '0','B','0','A', '3','7','8','4',
		
		'0','1','0','4', '0','0','0','6', '5','0','0','2', 'F','8','3','B',
		'G','0','8','B', '2','5','A','F', '0','7','6','1', '0','0','4','C',
		'2','7','9','6', '8','B','3','C', 'G','4','0','0', '5','A','E','1',
		'5','D','0','0', '9','1','E','4', '0','0','8','B', '6','G','2','7',
		
		'9','5','B','1', '4','E','0','D', 'A','6','0','0', '0','2','7','F',
		'6','0','2','0', '0','7','0','8', '1','0','0','4', 'B','0','5','3',
		'8','0','3','0', '5','6','B','9', '0','2','G','7', '1','4','0','A',
		'F','4','D','7', '1','3','2','A', '0','5','B','0', '0','E','6','G',
	]
];

const plainMap = [
	[]
];
*/


var Sudoku = function() {
	// A[x][y] = new Cell();
	
	
	// map class
	this.map = null;
	
	// 맵의 베이스 크기: 2면 4칸으로 이루어진 작은 사각형 4그룹이 모여 이루고, 3이면 작은 9칸이 9그룹이서 모여 이룸.
	this.base = 0;
	
	
	this.start = function(base) {
		this.map = new SudokuMap();
		this.base = base;
		this.map.setUp(base);
	}
	
	// import map
	this.import = function(data) {
		this.map.import(data);
	};
	
	// export map
	this.export = function() {
		return this.map.export();
	};
	
	
	
	
	///////////////////////////////////////////////
	// 수도쿠 맵 클래스 시작
	var SudokuMap = function() {
		
		
		var mapArr = [];
		
		
		// 수도쿠 맵을 생성 후 Cell 클래스 생성자를 저장한 배열을 만들어 저장.
		this.setUp = function(base) {
			var arr = [];
			
			// bt
			
			for (var l = 0; l < base; l++) {
				// br
				
				// y축 임시 배열
				var yArr = [];
				// x축 임시 배열
				var xArr = [];
				
				for (var k = 0; k < base; k++) {
					// bd
					// st
					
					for (var j = 0; j < base; j++) {
						// sr
						
						for (var i = 0; i < base; i++) {
							var bid = (l*base+(k+1));
							var sid = (j*base+(i+1));
							var x = k*base+i;
							var y = l*base+j;
							var val = 0;
							
							// sd
							
							var c = new Cell();
							c.new(x,y,bid,sid,val);
							
							xArr.push(c);
						}
						// sr end
					}
					// st end
					// bd end
				}
				// br end
			}
			// bt end
		}
		
		// 셀과 관련된 구문들
		
		///////////////////////////////////////////////////////////////////////////
		// 셀 클래스 시작
		var Cell = function() {
			// 한번 저장되면 변경 불가능
			this.x = 0;	// 현재 셀의 위치 : 좌표 x의 값
			this.y = 0;	// 현재 셀의 위치 : 좌표 y의 값
			this.bid = 0;	// 현재 셀의 위치 : 큰 틀에서의 위치 아이디
			this.sid = 0;	// 현재 셀의 위치 : 작은 틀에서의 위치 아이디
			
			// update()를 통해 변경 가능
			this.val = 0;	// 수도쿠에 표기되는 수
			
			this.pos = [];	// 가능한 수와 불가능한 수를 구분하여 저장하는 배열
			
			
			// 새로 생성할 때 사용하는 최초함수
			this.new = function(x, y, b, s, v) {
				// 한번 저장되면 변하지 않음
				this.x = x;
				this.y = y;
				this.bid = b;
				this.sid = s;
				// update()를 통해 변경 가능
				this.val = v;
				// this.pos는 셀 생성 및 테이블 전체 생성 완료 이후 작동하여 불가능수와 가능수를 선별하여 저장함
			}
			
			this.index = function() {
				return {
					x: this.x,
					y: this.y,
					bid: this.bid,
					sid: this.sid
				};
			};
			
			this.seek = function() {
				return this.val;
			};
			
			this.update = function(val) {
				this.val = val;
			};
			// pos 정보를 업데이트하는 함수
			this.updatePos = function(val) {
				var inf = this.pos.val;
				this.pos.val = !inf;
			};
		};
		// 셀 클래스 종료
		///////////////////////////////////////////////////////////////////////////
		
		// 셀과 관련하여 작업하는 함수들
		
		// x, y 값을 통해 b, s 값을 추출
		this.getId = function(x, y) {
			return {
				bid: this.getBId(x, y),
				sid: this.getSId(x, y)
			};
		};
		
		this.getBId = function(x, y) {
			var bid = 0;
			return bid;
		}
		this.getSId = function(x, y) {
			var sid = 0;
			return sid;
		}
		
		// x, y 값을 통해 배열의 인덱스 번호를 추출
		this.getIndex = function(x, y) {
			var index = 0;
			// x, y에 따라 인덱스 번호가 달라진다.
			// 먼저 큰 틀에서 b의 순서 먼저, b 안에서 s 순서로 계산된다.
			
			return index;
		}
		
		
		this.get = function(x, y) {
			return mapArr[this.getIndex(x,y)].seek();
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		this.import = function(data) {
			
		}
		this.export = function() {
			
		}
	};
	
	// 수도쿠 맵 클래스 종료
	///////////////////////////////////////////////
	
	
	
	
	
	
	
	
	
	
	// 작업
	
	
	// 자신의 작업 위치
	this.index = {
		x: 0,
		y: 0
	};
	
	// 작업 위치 이동
	this.move = function(x, y) {
		this.index.x = x;
		this.index.y = y;
	}
	// 작업 위치 값 설정
	this.set = function(val) {
		this.map.set(this.index.x, this.index.y);	// 먼저 this.map에 작업 위치를 수정하고
		this.map.setVal(val);	// 현재 작업 위치를 가리켜 this.map의 값을 수정한다.
	}
	// 작업 위치 값 추출
	this.get = function() {
		var val = this.map.getVal();
		return val;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
};



