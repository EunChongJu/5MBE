
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
	
	///////////////////////////////////////////////
	// 수도쿠 맵 클래스 시작
	var SudokuMap = function() {
		
		// 작동방식 설명
		/*
		
		배열에는 포인트 개념으로 배열 안에 저장된다.
		
		어떤 배열 안에 포인트 개념으로 다른 배열의 인덱스만 저장된다.
		다른 배열 인덱스가 저장된 배열은 x, y 위치에 따라 저장된다.
		메인 배열은 1차원 배열 형태로 저장되며, 실제 x, y, b, s, val 등의 값이 저장되어 있다.
		관리는 메인 배열에 쓰이게 된다.
		그 메인 배열의 인덱스는 다른 배열에 저장된다.
		실제 메인 인덱스를 알아내기 위해서는 그 배열을 조회하여야 한다.
		그 배열은 2차원 배열 형태로 저장되어 메인 배열의 인덱스가 저장되어 있다.
		이는 메인 배열의 x, y 값에 따라, 저장된 순서에 따라 달라진다.
		값이 새로 갱신되면, 메인 배열의 맨 뒤에 추가된다. 이는 히스토리라 한다.
		히스토리 시스템은 맨 뒤의 그 값이 최근 기록이라 간주한다. 최근 기록만 인덱스 배열에 값만 바뀐다.
		히스토리 역사를 알고 싶다면, x, y가 같은 값만 골라내어 히스토리를 살펴볼 수 있다.
		
		이제 이 셀 안에서 들어갈 수 있는 수와 불가능한 수를 알아내고 싶을 것이다.
		이를 통해 수도쿠를 풀어주는 프로그램 자체를 개발하는 것이 가능하다.
		이 방법은 pos라는 것을 통해 구현할 수 있다.
		pos는 배열로 셀 안에 저장되지 않는다. 대신 인덱스배열에 연결되어 pos를 관리할 수 있다.
		
		예를 들어 해당 셀의 pos에 연결된 배열에는 true나 false 둘 중 하나만 저장되며,
		base=3이면 인덱스에 1부터 9까지 있으며 (0은 사용되지 않는다)
		만약 이 셀에 1이 가능한지 확인하고 싶다면 pos배열에 인덱스 1의 값을 조회한다.
		true/false 둘 중 하나만 나오며, true면 그 자리에 1이라는 수가 들어갈 수 있다는 뜻이다.
		pos를 확인하는 것은 그 자리에서 가로축, 세로축, 그리고 같은 bid의 셀에 같은 값을 가진 수가 있는지 확인하는 작업을 거쳐 pos의 해당 값 인덱스에 저장하여야 할 것이다.
		만약 가로/세로축, 같은 bid의 아이템에서 같은 val을 가진 아이템이 존재한다면, pos의 해당 값과 같은 인덱스에 false라 저장한다. 아니라면 true를 저장한다.
		
		*/
		
		var Cell = function() {
			this.x = 0;
			this.y = 0;
			this.bid = 0;
			this.sid = 0;
			this.val = 0;
		}
		
		var idxArr = [[]];	// x, y에 따라 바뀌므로 x나 y가 0인 배열의 원소는 아무도 저장되지 않는다.
		
		var mainArr = [];
		
		var pos = [];
		var Position = function() {
			this.posArr = [];
			this.setUp = function(base) {
				this.posArr = new Array(base+1);
				for (var i = 1; i < base+1; i++) {
					this.posArr[i] = true;
				}
			}
		}
		
		// 수도쿠 맵을 초기화할 때
		this.setUp = function(base) {
			// set up idxArray
			idxArr = new Array(base+1);
			for (var i = 0; i < idxArr.length; i++) {
				idxArr[i] = new Array(base+1);
			}
			// set up mainArray
			mainArr = [];
		}
		
		// 셀을 생성하고 저장한다.
		this.new = function(x, y, bid, sid, val) {
			// 새로운 셀을 생성한다.
			var nc = new Cell();
			// 생성된 셀에 정보를 저장한다.
			nc.x = x;
			nc.y = y;
			nc.bid = bid;
			nc.sid = sid;
			nc.val = val;
			// nc에 대한 정보를 push()에 넘긴다.
			this.push(nc);
		};
		
		// 셀에 바뀐 부분, 수정사항에 대하여 저장한다. (만약 기존 아이템이 없다면 새로 생성하는 함수로 넘어간다)
		this.update = function(x, y, val) {
			var index = idxArr[x][y];
			var c = mainArr[index];	// 아예 없는 셀이라고 한다면 else로 넘어가야 한다.
			
			if (c.x == x && c.y == y) {
				var bid = c.bid;
				var sid = c.sid;
				this.new(x, y, bid, sid, val);
			}
			else {
				// 이거는 기존에 아이템이 없다는 뜻이므로 x, y에 적절한 bid, sid를 구하여 새로 생성한다.
				var nBid = getBId(x, y);
				var nSid = getSId(x, y);
				this.new(x, y, nBid, nSid, val);
			}
		}
		
		// 셀의 값을 삭제한다. 즉, val의 값을 0으로 저장한다.
		this.remove = function(x, y) {
			this.update(x, y, 0);
		};
		
		this.push = function(c) {
			var index = mainArr.length;
			mainArr.push(c);
			
			var x = c.x;
			var y = c.y;
			idxArr[x][y] = index;
		};
		
		// get bid
		function getBId(x, y) {
			var bid = 0;
			
			return bid;
		}
		// get sid
		function getSId(x, y) {
			var sid = 0;
			
			return sid;
		}
		
		
		// x, y의 값을 조회한다.
		this.seek = function(x, y) {
			return mainArr[(idxArr[x][y])].val;
		};
		
		// x, y의 최근 값을 조회한다. (0을 반환하면 없다는 뜻임)
		this.getVal = function(x, y) {
			for (var i = mainArr.length; i > 1; i++) {
				// this cell
				var tc = mainArr[i];
				if (tc.x == x && tc.y == y) return tc.val;
			}
			return 0;
		};
		
		// x, y의 최초 값을 조회한다. (0을 반환하면 없다는 뜻임)
		this.getFirstVal = function(x, y) {
			for (var i = 0; i < mainArr.length; i++) {
				// this cell
				var tc = mainArr[i];
				if (tc.x == x && tc.y == y) return tc.val;
			}
			return 0;
		};
		
		// x, y의 히스토리를 조회한다. (히스토리를 배열로 반환)
		this.history = function(x, y) {
			var historyArr = [];
			for (var i = 0; i < mainArr.length; i++) {
				// this cell
				var tc = mainArr[i];
				if (tc.x == x && tc.y == y) {
					var val = tc.val;
					historyArr.push(val);
				}
			}
			return historyArr;
		};
		
		// x, y의 히스토리 횟수가 몇개인지 조회한다. (처음 생성이후 한건도 업데이트가 없으면 0, 생성한적이 없으면 -1임)
		this.lengthHistory = function(x, y) {
			var len = -1;
			for (var i = 0; i < mainArr.length; i++) {
				if (mainArr[i].x == x && mainArr[i].y == y) len++;
			}
			return len;
		};
		
		
		
		
		// 특정 X축을 추출한다.
		this.getAxisX = function(x) {
			var axisArr = [];
			
			// 여기서 idxArr의 배열에서 인덱스가 0으로 시작하는 경우는 없으며, 1부터 끝까지 존재한다.
			// (base=3이면 1부터 9까지 존재하며, 0이란 그것은 사용되지 않는다)
			for (var dy = 1; dy < idxArr[x].length; dy++) {
				// this cell
				var tc = mainArr[x][dy];
				if (tc.x == x && tc.y == dy) {
					var val = tc.val;
					axisArr.push(val);
				}
			}
			
			return axisArr;	// 단 이 배열이 X축의 길이 전체가 확실하여야 한다.
		};
		
		// 특정 Y축을 추출한다.
		this.getAxisY = function(y) {
			var axisArr = [];
			
			// 여기서 idxArr의 배열에서 인덱스가 0으로 시작하는 경우는 없으며, 1부터 끝까지 존재한다.
			// (base=3이면 1부터 9까지 존재하며, 0이란 그것은 사용되지 않는다)
			for (var dx = 1; dx < idxArr[y].length; dx++) {
				// this cell
				var tc = mainArr[dx][y];
				if (tc.x == dx && tc.y == y) {
					var val = tc.val;
					axisArr.push(val);
				}
			}
			
			return axisArr;
		};
		
		// 위처럼 같은 bid를 가진 특정 값을 추출한다. (sid 순서대로 저장됨)
		this.getSameBId = function(bid) {
			// sid 순서대로 반환하므로 먼저 같은 bid를 가진 인덱스 배열의 x와 y의 값들을 뽑아낸다.
			
			// 아니면 모든 같은 bid의 최근 값을 추출하여 셀 배열에 저장한후 sid 기준 정렬하여 반환한다.
		}
		
		// 같은 sid 값을 가진 특정 값을 추출한다.
		this.getSameSId = function(sid) {
			
		}
		
		
		
		
		
		
		// 이것은 수도쿠 맵 메인 배열의 용량이 너무 크다 판단될 때 사용하기 유용한 함수로 정리함수라 한다.
		// 그러나 이 함수는 최근 값만 남기고 모두 삭제하므로 히스토리가 정리된다.
		this.clear = function() {
			// 새로 정리되어 저장될 새로운 배열
			var newArr = [];
			
			// 메인 배열의 처음부터 끝까지 탐색하여 새로운 배열에 저장한다. 이때 인덱스 배열이 수정되어 새로운 배열을 기준으로 인덱스가 저장된다.
			// 방법은 인덱스 배열 전체를 탐색하면 된다.
			
			
			// 이제 작업이 마무리되면 새로운 배열을 메인 배열에 저장한다.
			mainArr = newArr;
		}
		
		
		
		
		// 수도쿠를 푼다.
		this.answer = function() {
			// 푸는 방법은 여러가지가 있는데, 그중 한 방법은 간단무식하게 풀릴 때까지 반복하는 방법으로 컴퓨터 메모리 과부하를 가져올 수 있다.
			// 그 방법이란 pos의 true/false를 활용하여 모든 pos배열에 true를 가진 값이 유일해질 때까지 푸는 것으로
			// x, y를 처음부터 끝까지 맵의 모든 셀을 훑어내는 것이다.
			// 맵을 모두 훑어내면서 하는 작업은 true를 가진 아이템이 하나인 pos배열을 찾아낸다.
			// 만약 true를 가진 아이템이 하나인 pos배열을 발견한다면 그 pos배열의 true가 위치한 인덱스 번호를 추출한다.
			// 이 인덱스 번호는 그 자리의 답이 되는 값으로 그 값을 저장한다.
			// 정답이 되는 값을 이 아이템 자리에 저장하게 되면, 이 아이템이 위치한 가로축이나 세로축, 또는 같은 bid를 가진 아이템을 수정한다.
			// 이 가로축 || 세로축 || 같은 bid 가진 아이템들의 pos배열의 인덱스 해당 번호에 true에서 false로 바꾼다.
			// 위의 방법을 반복하여 맵을 전체적으로 훑어낸다.
			// 맵을 훑어내는데 있어 모두 true를 가진 아이템이 단 하나인 pos배열이 된다면 이 방법을 실행하는 프로그램은 종료된다.
			// 
			// 만약 이보다 더 효율적인 방법이 있다면 이 방법으로 대체한다.
			
			
			
			
			
			
			
			
			
			
			
		}
		
		// this.answer()에 필요한 함수 모음
		
		// 현재 작업위치를 확인
		function checkThisCell(x, y) {
			var index = idxArr[x][y];
			var c = mainArr[index];
			if (c.val == 0) {
				// 그 해당 셀의 posArr을 확인한다.
				
				// 만약 posArr 중 하나 false가 발견되면 posArr이 이미 작성되었다는 뜻이므로 posArr 생성을 건너뛴다.
				
				// 만약 posArr 안에 원소들 중 하나가 true라면 true 값을 가진 원소 값이 답이므로 그 함수로 그 원소의 값을 넘어가 실행한다.
				
				// 만약 posArr 자체가 없거나 그 자체로 else가 된다면 posArr 생성으로 넘어간다.
				setUpPosArr(x, y);
				
			}
			
		}
		
		
		// 그 posArr의 원소 중 하나라도 false라면 true를 반환, 즉 전체 중 false 한개 이상이면 true 반환(전체가 true면 false 반환)
		
		
		// 그 posArr의 원소 전체가 true를 발견하면 true를 반환, 즉 전체가 true여야만 true를 반환하므로 &&의 역할과 같다.
		
		
		// 그 posArr의 원소 전체 중 true가 한개라도 발견되면 true를 유일하게 가지고 있는 원소 인덱스 번호를 반환한다. 없으면 -1 반환.
		
		
		// posArr 생성. posArr이 없어야 한다는 조건 부합시 실행된다.
		function setUpPosArr(x, y) {
			var index = idxArr[x][y];
			var c = mainArr[index];
			
			// posArr이 될 배열을 생성하고 모든 값이 true인 원소를 배열에 저장하고 그 자리의 posArr에 저장한다.
			var newPosArr = [];
		}
		
		// 이제 그 자리에서 검증을 한다.
		function checkThisPos(x, y) {
			var xArr = checkThisXAxis(x);
			var yArr = checkThisYAxis(y);
			var bArr = checkThisBId(x, y);
			
			if (xArr.length != 0) {
				for (var i = 0; i < xArr.length; i++) {
					posArr[xArr[i]] = false;
				}
			}
			if (yArr.length != 0) {
				for (var j = 0; j < yArr.length; j++) {
					posArr[yArr[j]] = false;
				}
			}
			if (bArr.length !== 0) {
				for (var k = 0; k < bArr.length; k++) {
					posArr[bArr[k] = false];
				}
			}
		}
		
		// 그 자리에서 해당되는 X축의 값을 모두 반환한다.
		function checkThisXAxis(x) {
			var arr = this.getAxisX(x);
			return arr;
		}
		
		// 그 자리에서 해당되는 Y축의 값을 모두 반환한다.
		function checkThisYAxis(y) {
			var arr = this.getAxisY(y);
			return arr;
		}
		
		// 그 자리에서 소속된 b그룹의(같은 bid를 가진)셀을 찾아 있는 수를 배열로 반환한다. (없으면 없는 배열을 반환)
		function checkThisBId(x, y) {
			var bid = getBId(x, y);
			var arr = this.getSameBId(bid);
			
			for (var i = 0; i < arr.length; i++) {
				var dx = arr[i].x;
				var dy = arr[i].y;
				
				var val = mainArr[idxArr[dx][dy]].val;
				if (val != 0) {
					posArr[val] = false;
				}
			}
		}
		
		// 검증 이후 posArr 안에 true가 한개인지 체크
		function checkPosArrTrueIsOne() {
			var tLen = 0;
			for (var i = 0; i < posArr.length; i++) {
				if (posArr[i] == true) tLen++;
			}
			return (tLen == 1);
		}
		
		// 만약 한개면 그 자리에서 같은 bid를 가졌거나 가로축, 세로축의 모든 각 셀에 posArr 안에 그 정답의 번호에 false로 저장한다.
		// 즉 예를 들어 그 정답이 9라면 같은 bid나 가로세로축의 모든 셀의 각 셀에 있는 posArr 안에 있는 9번째 원소의 값을 false로 저장한다.
		
		// 같은 bid에 있는 그 원소의 posArr를 처리
		
		
		// 같은 x축에 있는 그 원소의 posArr를 처리
		
		
		// 같은 y축에 있는 그 원소의 posArr를 처리
		
		
		// x, y의 그 셀의 그 번호를 false로 저장하게 한다.
		function changePosArrNumToFalse(x, y, n) {
			var index = idxArr[x][y];
			var c = mainArr[index];
			// 해당 셀의 그 posArr임
			posArr[n] = false;	// 그 posArr의 n번째 원소의 값을 false로 저장한다. true든 false든 false로 저장함.
		}
		
		// 모두 각 posArr의 정답번호인 인덱스 값을 가진 원소를 false로 저장 완료하면 그 다음 단계로 지금 작업 위치의 칸 값을 정답번호로 저장한다. (0 -> n)
		// (아마 c.val = n으로 저장하는 것보다 update()를 통해 값이 수정될 것이다. 히스토리에 남기는 것이 아니면 그냥 c.val = n으로 저장한다)
		
		// 그 다음 이 위치에 있는 작업을 모두 처리 완료하면 다음 작업위치를 찾아 이를 반복한다.
		function findNextCell(x, y) {
			// 여기에 x, y가 필요한 이유는 이미 작업 완료한 위치 다음을 찾기 위해서다.
			// 즉 다음 셀을 찾는데 (x+1, y), (x+2, y), ... (x, y+1), ... 이런 식으로 반복해 저장된 값이(c.val) 0인 셀을 찾아나간다.
			// 여기서 0인 셀을 찾으면 이 자리의 x, y 값을 반환한다.
			// 만약에 끝까지 찾아나가면(x==9, y==9) 1라운드를 클리어한 것으로 간주하고 종료한다.
			// 그리고 2라운드로 넘어가게 되며 처음부터(x==1, y==1) 탐색한다. 여기서 또 끝까지(중간 작업이 없이) 찾지 못하면 완전히 종료된 것으로 간주하고 종료한다.
			
		}
		
		// 라운드라는 것과 다음 셀 탐색, 모든 셀 탐색 종료 후 다음 라운드 시작이라는 것에 대해 구현할 것이다.
		
		
	};
	
	// 수도쿠 맵 클래스 종료
	///////////////////////////////////////////////
	
	// A[x][y] = new Cell();
	
	
	// map
	this.map = null;
	
	// 맵의 베이스 크기: 2면 4칸으로 이루어진 작은 사각형 4그룹이 모여 이루고, 3이면 작은 9칸이 9그룹이서 모여 이룸.
	this.base = 0;
	
	
	this.start = function(base) {
		this.map = new SudokuMap();
		this.base = base;
		this.map.setUp(base);
	}
	
	
	
	
	
	
	// 수도쿠 맵 클래스 생성자를 관리하는 함수들
	
	/*
	
	이것은 수도쿠 맵을 쉽게 다루어주는 함수라 생각하면 된다.
	
	작업에서 현재 작업위치라는 개념이 존재하여 그 자리에서 다른 곳의 값을 갱신하거나 추가하고 싶다면 반드시 현재 작업위치를 바꿔줘야 한다.
	현재 작업위치를 수정한 후 그 자리에서 값을 바꿔주거나 삭제 등 여러가지를 할 수 있다.
	
	*/
	
	// 자신의 현재 작업위치
	var lx = 0;
	var ly = 0;
	
	// 현재 작업위치 조회
	this.location = function() {
		return {
			x: lx,
			y: ly
		};
	};
	
	// 현재 작업위치를 수정
	this.move = function(x, y) {
		lx = x;
		ly = y;
	};
	
	// 현재 작업위치서 값을 갱신
	this.update = function(val) {
		this.map.update(lx, ly, val);
	};
	
	// 값을 추가
	this.add = function(val) {
		var bid = 0;
		var sid = 0;
		// 이건 x, y, b, s, v를 다 적고 실행해야 한다.
		this.map.new(lx, ly, bid, sid, val);
	}
	
	// 값을 삭제
	this.remove = function() {
		// 단지 그 자리에 값만 0으로 바꿔주면 된다.
		this.map.remove(lx, ly);
	};
	
	// 값을 조회 (0이면 없다는 뜻임)
	this.seek = function() {
		return this.map.seek(lx, ly);
	};
	
	
	
	
	// 수도쿠를 푸는 프로그램을 실행한다. 이것은 이 클래스가 하는 것이 아닌 수도쿠 맵 클래스 내 푼다.
	
	
	
	
	
	
	
	
	
	// 이 함수는 x, y 모두 1부터 base^2까지 전체적으로 실행하는 함수다.
	
	// import map
	this.import = function(data) {
		this.map.import(data);
	};
	
	// export map
	this.export = function() {
		return this.map.export();
	};
	
};



