
var Querydo = function() {
	var m;	// array 17x17, memory
	
	// TEST //
	this.getMemory = function() {
		return m;
	};
	
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
	
	
	
	
	
	
	function isPlayer(x, y) {
//		if ((m[x][y].is() == 'p') && ((x % 2 == 0) && (y % 2 == 0))) return true;
//		return false;
		return ((m[x][y].is() == 'p') && ((x % 2 == 0) && (y % 2 == 0)));
	}
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

function start(n) {
	qrd.new(n);
	
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
			source += '<div class="qdTd">';
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







function startQD() {
	getLId('gs').style.display = 'none';
	var n = getLId('qdPN').value;
	start(n);
}

function getLId(id) {
	return document.getElementById(id);
}