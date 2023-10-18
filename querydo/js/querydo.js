
var Querydo = function() {
	var m;	// array 17x17, memory
	
	// TEST //
	this.getMemory = function() {
		var result = [];
		
		for (var i = 0; i < m.length; i++) {
			var row = [];
			for (var j = 0; j < m[i].length; j++) {
				var cell = m[i][j];
				row.push(cell);
			}
			result.push(row);
		}
		
		return result;
	};
	
	var r = true;
	
	this.rotate = function(rb) {
		r = rb;
	};
	
	// r 값을 통해 보드 전체(벽과 플레이어 데이터 모두)를 출력할 때 사용
	this.getBoard = function() {
		
		var b = this.getMemory();
		
		// turn = 1 | 2 | 3 | 4 이 값을 통해 계산해낸다.
		if (turn != 1) {
			var result = [];
			for (var t = 1; t < turn; t++) {
				
				for (var i = 0; i < b.length; i++) {
					for (var j = 0; j < b[i].length; j++) {
						
					}
				}
				// 보드가 좌회전 또는 우회전으로 회전한 맵을 result에 저장한다.
				// 그리고 두번 회전하게 되면 b = result 하여 다시 result에 저장하는 반복을 한다.
				
			}
		}
		
	}
	
	this.getPlayerBoard = function() {
		var result = [];
		for (var i = 0; i < m.length; i++) {
			if (i % 2 == 0) {
				var row = [];
				for (var j = 0; j < m[i].length; j++) {
					if (j % 2 == 0) {
						var cell = m[i][j];
						if (cell)
						console.log(cell);
//						row.append(cell);
					}
//					result.append(row);
				}
			}
		}
		return result;
	};
	
	
	// 벽의 한 줄을 배열로 반환 [true/false]
	this.getWallX = function(x) {
		var result = [];
		
		for (var i = 0; i < m[x].length; i++) {
			var cell = m[x][i];
			if ((i%2 == 1) && (x%2 == 1)) {
				if (cell.is() == 'w') {
					result.push(cell.get());
				}
			}
		}
		
		return result;
	}
	
	this.getWallY = function(y) {
		var result = [];
		
		for (var i = 0; i < m.length; i++) {
			var cell = m[i][y];
			if ((i%2 == 1) && (y%2 == 1)) {
				if (cell.is() == 'w') {
					result.push(cell.get());
				}
			}
		}
		
		return result;
	}
	
	var s = false;
	
	this.single = function(sb) {
		s = sb;
	};
	
	// 플레이어 차례 턴, 플레이어 인원수 관리
	var turn = 0;	// 1, 2, 3, 4 (cycle)
	var max = 0;	// players
	
	this.getTurn = function() {
		return turn;
	};
	
	this.nextTurn = function() {
		if (turn == max) turn = 1;
		turn++;
		return turn;
	};
	
	// Player Class
	var Player = function() {
		this.is = function() {
			return 'p';
		};
		
		var id;
		
		this.setId = function(n) {
			id = n;
		};
		
		this.getId = function() {
			return id;
		};
	};
	
	// Wall Class
	var Wall = function() {
		this.is = function() {
			return 'w';
		};
		
		var s = false;
		
		this.set = function() {
			s = true;
		};
		
		this.get = function() {
			return s;
		};
	}
	
	// Connect Class
	var Connect = function() {
		this.is = function() {
			return 'c';
		};
		
		var ax = 0;
		var ay = 0;
		var bx = 0;
		var by = 0;
		
		this.setVal = function(x1, y1, x2, y2) {
			ax = x1;
			ay = y1;
			bx = x2;
			by = y2;
		};
		
		this.getVal = function() {
			return [
				{x: ax, y: ay},
				{x: bx, y: by}
			];
		};
		
		this.direction = function() {
			if (((bx-ax) != 0) && ((by-ay) == 0)) return 'gr';
			if (((bx-ax) == 0) && ((by-ay) != 0)) return 'sr';
		};
	};
	
	// 메모리 초기화
	function newMemory() {
		var result = new Array(17);
		for (var i = 0; i < result.length; i++) {
			result[i] = new Array(17);
			for (var j = 0; j < result[i].length; j++) {
				result[i][j] = null;
				
				if ((i%2 == 0) && (j%2 == 0)) {
					result[i][j] = new Player();
					result[i][j].setId(0);
				}
				if ((i%2 == 1) && (j%2 == 1)) {
					result[i][j] = new Wall();
				}
				if (((i%2 == 0) && (j%2 == 1)) || ((i%2 == 1) && (j%2 == 0))) {
					result[i][j] = new Connect();
				}
			}
		}
		m = result;
	}
	
	// 플레이어 생성 (플레이어 초기화 위치 배치)
	function newPlayers(pn) {
		// set players
		if (pn % 2 == 0) {
			var p1 = new Player();
			p1.setId(1);
			var p2 = new Player();
			p2.setId(2);
			
			set(8, 0, p1);
			set(8, 16, p2)
			max = 2;
			
			if (pn % 4 == 0) {
				var p3 = new Player();
				p3.setId(3);
				var p4 = new Player();
				p4.setId(4);
				
				set(0, 8, p3);
				set(16, 8, p4);
				max = 4;
			}
		}
		else {
			set(8, 8, new Player(0));
			max = 1;
		}
	}
	
	// 메모리에 접근할 수 있는 함수
	// 값을 변경한다.
	function set(x, y, val) {
		m[x][y] = val;
	}
	// 값을 얻는다.
	function get(x, y) {
		return m[x][y];
	}
	
	// test
	this.get = function(x, y) {
		return get(x, y);
	}
	
	function movePlayer(x1, y1, x2, y2) {
		var tempPlayer = get(x1, x2);
		set(x2, y2, tempPlayer);
		set(x1, y1, null);
	}
	
	
	
	
	// game start, 'pn' is number of players
	this.new = function(pn) {
		newMemory();
		newPlayers(pn);
		turn = 1;
	}
	
	this.read = function() {
		
	}
	
	
	
	
	
	
	function findPlayer(n) {
		for (var x = 0; x < m.length; x+=2) {
			for (var y = 0; y < m[x].length; x+=2) {
				var cell = get(x, y);
				if (cell != null) {
					if (cell.getId() == n) return {x: x, y: y};
				}
			}
		}
	}
	
	this.posibleMoveAt = function() {
		var result = [];
		
		return result;
	}
	
	// d: 1: left, 2: up, 3: right, 4: bottom, 5: lt, 6: rt, 7: rb, 8: lb
	function move(pn, d) {
		var fm = findPlayer(pn);
		
		if (d == 1) movePlayer(fm.x, fm.y, fm.x-1, fm.y);
		else if (d == 2) movePlayer(fm.x, fm.y, fm.x, fm.y+1);
		else if (d == 3) movePlayer(fm.x, fm.y, fm.x+1, fm.y);
		else if (d == 4) movePlayer(fm.x, fm.y, fm.x, fm.y-1);
		else if (d == 5) movePlayer(fm.x, fm.y, fm.x-1, fm.y+1);
		else if (d == 6) movePlayer(fm.x, fm.y, fm.x+1, fm.y+1);
		else if (d == 7) movePlayer(fm.x, fm.y, fm.x+1, fm.y-1);
		else if (d == 8) movePlayer(fm.x, fm.y, fm.x-1, fm.y-1);
		
	}
	
	
	// 벽을 세움; 두개의 좌표를 파라미터로 받을 것인가? 한개의 좌표와 방향을 파라미터로 받을 것인가?
	function setUpWall(x, y) {
		
	}
	
	
	
	
	
	
	this.isPlayer = function(x, y) {
//		if ((m[x][y].is() == 'p') && ((x % 2 == 0) && (y % 2 == 0))) return true;
//		return false;
		return ((m[x][y].is() == 'p') && ((x % 2 == 0) && (y % 2 == 0)));
	};
	function isWall(x, y) {
//		if ((m[x][y].is() == 'w') && ((x % 2 == 1) && (y % 2 == 1))) return true;
//		return false;
		return ((m[x][y].is() == 'w') && ((x % 2 == 1) && (y % 2 == 1)));
	}
	function isConnect(x, y) {
//		if ((m[x][y].is() == 'c') && (((x % 2 == 0) && (y % 2 == 1)) || ((x % 2 == 1) && (y & 2 == 0)))) return true;
//		return false;
		return ((m[x][y].is() == 'c') && (((x % 2 == 0) && (y % 2 == 1)) || ((x % 2 == 1) && (y & 2 == 0))));
	}
	// (x, y)의 셀은 어떤 타입인가? player? wall? connect?
	function whatIsCell(x, y) {
		var cell = m[x][y].is();
		if (cell == 'p' || cell == 'w' || cell == 'c') {
			return cell;
		}
		else {
			if (isPlayer(x, y)) return 'p';
			if (isWall(x, y)) return 'w';
			if (isConnect(x, y)) return 'c';
		}
		return '0';
	}
	
	
}


var qrd = new Querydo();

// 최근 마우스가 클릭한 셀 X와 Y 값
var focusX = 0;
var focusY = 0;

function start(n, r, s) {
	// 인원수
	qrd.new(n);
	console.log(n);
	// 출력시 보드 회전 출력 여부
	qrd.rotate(r);
	console.log(r);
	// 싱글 여부 : false시 멀티(AI 자동 도입)
	
	console.log(s);
	
	reload();
}

function reload() {
	// memory
	var memory = qrd.getMemory();
	
	// qrdTable
	var qt = getLId('qrdTable');
	
	var source = '';
	for (var i = 0; i < memory.length; i++) {
		source += '<div class="qdTr">';
		for (var j = 0; j < memory[i].length; j++) {
			var cell = memory[j][i];
			/*
			// 10자리수가 없으면 자동으로 0이라는 스트링을 붙이도록 한다.
			var cellX = i;
			var cellY = j;
			var cellId = 'qc' + cellX + cellY + '';
			*/
			/*
			// 아니면 reload 할 때마다 클래스 붙이고 떼고 하는 것도 좋은 방법이다.
			if (cell.is == 'p') {
				// 근데 이거는 플레이어 클릭때 갈 수 있는 수를 표시하기 위한 것이다.
				// reload를 무한에 가까운 반복 호출에 표시를 하고 말고 하는 것에 컴퓨터에 무리가 있다.
				// 그러므로 플레이어의 경우 플레이어 좌표만을 id="qc"+x+y;로 아이디에 저장한다.
				// 그리고 그 클릭때마다 플레이어가 이동 가능한 경우의 셀들을 반환하는 함수를 호출하여
				// 해당 아이디를 찾아 클래스만 바꿔 가능한 이동 셀을 표기하도록 한다.
			}
			if (cell.is == 'w' || cell.is == 'c') {
				// 벽도 마찬가지로 아이디를 플레이어와 다른 시스템을 가진 아이디를 갖추도록 한다.
				// 예를 들어 id="qwX11a3"이라 한다면
				// 이는 qrd.getWallX(11)에서 반환받은 3번째 원소를 가리킨다.
				// 그리고 커넥터는 간단하게 좌표와 벽 표시 또는 표시안함으로 설정하면 된다.
				// 커넥터에 2개의 좌표가 있는데 이 역할 역시 벽을 배치할 때 표시되는 가능 경우의 수다.
			}
			*/
			source += '<div class="qdTd" id="x'+i+'y'+j+'">';
			
			if (cell.is() == 'p') {
				if (cell.getId() != 0) {
					source += '<div class="qdPlayer" id="p'+cell.getId()+'"></div>';
				}
			}
			else {
				// 만약 나중에 벽과 벽과 연결된 셀이 나오게 되면 이것도 지원해야 한다.
				source += ' ';
			}
			source += '</div>'
		}
		source += '</div>';
	}
	qt.innerHTML = source;
}

// 가능한 이동 경우의 수 셀들을 표시한다.
function showPosibleMoveAt() {
	var result = qrd.posibleMoveAt();
	
	for (var i = 0; i < result.length; i++) {
		var x = result[i].x;
		var y = result[i].y;
		var id = 'x'+x+'y'+y;
		getLId(id).style.backgroundColor = '#FFD';
	}
	
	
}
// 보여줬던것들을 다시 숨긴다.
function hidePosibleMoveAt(x,y) {
	
}

// 배치 가능한 벽들을 표시하는 역할이다.
function showPosibleSetUpW() {
	var result = [];
	
	
	return result;
}
// 배치 가능한 벽들을 커넥터 위에서 표시된다. 배치하려는 벽이 가로 상태인지 세로상태인지 판단해야 한다.
function showPosibleSetUpC(x,y) {
	var result = [];
	
	
	return result;
}

// 벽을 배치하려는 상태일때 가로상태인지 세로상태인지 설정한다. 마우스 우클릭으로 설정한다. false=가로
var wv = false;

function rotateWall() {
	// 마우스 우클릭 감지하는 함수는 따로 있다.
	// 일단 함수가 호출되면 wv 값이 반대로 바뀐다.
	wv = !wv;
	// 배치가능수를 표시하는 값도 바뀌도록 한다.
	// 표시되는 마우스 커서를 바꾸거나 또는 벽 위에서 표시되는 것을 바꾸도록 한다.
}


function startQD() {
	getLId('gs').style.display = 'none';
	var n = getLId('qdPN').value;
	var r = JSON.parse(getLId('qdPR').value);
	var s = JSON.parse(getLId('qdPS').value);
	start(n,r,s);
	// 시작할 때부터 클릭을 감지하는 함수가 호출되도록 한다.
}

function getLId(id) {
	return document.getElementById(id);
}