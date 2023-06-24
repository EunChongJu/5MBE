




// var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;


var p1 = [
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
];
var p2 = [
	0,2,0, 0,0,0, 0,0,3,
	6,0,0, 0,3,1, 0,0,0,
	5,0,0, 0,0,0, 0,8,4,
	
	3,7,0, 0,0,0, 5,0,1,
	0,0,0, 0,6,0, 0,0,9,
	0,0,0, 4,0,0, 0,0,0,
	
	0,0,0, 0,0,7, 8,0,0,
	2,0,0, 0,9,0, 0,4,0,
	0,5,0, 2,0,0, 1,0,0
];




/*
//// 샘플 작동 테스트를 위한 구문

// 맵을 생성
var map = new MapClass();

// 맵을 16x16칸으로 구성된 정사각형 스도쿠 맵을 생성
map.newMap(4);

// 맵에 값을 대입
var arr = [
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
];
map.importArrMap(arr);
var t = map.exportArrMap();
console.log(t);

*/


/*
//// 샘플 작동 테스트를 위한 구문
var sudoku1 = new Sudoku();
sudoku1.base = 4;
sudoku1.insertMapArr(p1);

var sudoku2 = new Sudoku();
sudoku2.base = 3;
sudoku2.insertMapArr(p2);
*/
function getLId(id) {
	return document.getElementById(id);
}

function test() {
	var code = makeUpCodeSudokuTable(3);
//	console.log(code);
	getLId('sudoku').innerHTML = code;
}




function makeUpCodeSudokuTable(base) {
	var code = '<div class="bt">';
	for (var l = 0; l < base; l++) {
		code += '<div class="br">';
		for (var k = 0; k < base; k++) {
			code += '<div class="bd">';
			code += '<div class="st">';
			for (var j = 0; j < base; j++) {
				code += '<div class="sr">';
				for (var i = 0; i < base; i++) {
					var bid = (l*base+(k+1));
					var sid = (j*base+(i+1));
					var x = k*base+i;
					var y = l*base+j;
					var val = 'A';
					code += '<div class="sd" id="b' + bid + 's' + sid + '">';
					/*
					code += '<span>bid:'+bid+'-sid:'+sid+'</span>';
					code += '<span>i:'+i+'-j:'+j+'</span>';
					*/
					code += '<span>k:'+k+'-l:'+l+'</span>';
					code += '<span>x:'+x+'-y:'+y+'</span>';
					/*
					code += '<input type="text" value="'+val+'">';
					*/
					code += '</div>';
				}
				code += '</div>';
			}
			code += '</div></div>';
		}
		code += '</div>';
	}
	code += '</div>';
	return code;
}

// x, y의 셀 값을 조회 (테이블에 표시될 수가 무엇인지 확인할 때, 0이 반환되면 테이블의 칸에 아무것도 표시되지 않는다)
function seekVal(x, y) {
	sdk.move(x, y);
	var val = sdk.seek();
	return val;
}



var sdk = new Sudoku();

function startSDK() {
	sdk.start(3);
}



// 이후 이 스도쿠 프로그램에서 키보드로 이동하면서 숫자를 입력할 수 있는 시스템과 맵을 코드로 export 하거나 import 할 수 있는 시스템을 개발할 것이다.

// 마우스 클릭 입력 감지를 통해 해당 셀의 아이디 코드를 분석하여 해당 셀 이동 또는 숫자(또는 진수에 따라 다른 문자)입력을 한다.
function clickMouseCell(code) {
	// code는 마우스를 통해 클릭한 셀의 아이디이며 그 아이디를 통해 분류된다.
	
	// 셀 이동 입력
	
	// 그 외 숫자나 그 이상의 진수 표기 입력
	
}

// 키보드 입력 감지 (arrows l/r/u/d, numbers(asdf/NumLock), +A/B/C/D/E/F/G, +H/J/K/L/M/N/O/P/Q)
function clickKeyBoard(code) {
	// code는 입력된 번호고 그 코드에 따라 분류된다.
	
	// 화살표 이동 입력
	
	// 그 외 숫자나 그 이상의 진수를 표기하는 입력 (base 값에 따라 입력감지 범위가 달라진다)
	
}




var inputer = {
	x: 1, y: 1
};

function inputerMove() {
	// 먼저 이동한 후 위치 수정하고
	inputer.x = 5;
	inputer.y = 5;
	// 이후 이동된 위치를 디스플레이에 표시
	// 방법은 디스플레이에 있는 모든 표시를 끄고 그 다음 아이디 값을 통해 해당좌표를 찾아 그 부분만 표시한다.
	var id = '';
	var inputerDisplay = getLId(id);
}
function moveToLeft() {
	if (inputer.x != 1) inpuer.x--;
}
function moveToRight() {
	if (inputer.x != 9) inputer.x++;	// 나중에 base^2 값으로 바꾸어야 한다.
}
function moveToUp() {
	if (inputer.y != 1) inputer.y--;
}
function moveToDown() {
	if (inputer.y != 9) inputer.y++;	// 나중에 base 값을 제곱한 수로 바꾸어야 한다.
}

// 그리고 위의 4개의 함수들에 공통적으로 디스플레이가 바뀐 모습을 보여야 할 것이다.



function displayShowInsert(x, y) {
	var id = changeXYtoBS(x, y);
	var bid = id.b;
	var sid = id.s;
	// 위의 변수를 통해 해당 셀에 값이 전환되었음을 값으로 표시한다.
	// 아까 그 값에서 0이 나오면 아무도 표시하지 않는다.
}

function displayShowMove(x, y) {
	var id = changeXYtoBS(x, y);
	var bid = id.b;
	var sid = id.s;
	// 위의 변수를 통해 디스플레이서 해당 셀만 스타일(boder:3px solid 등)을 변환한다.
}

// 아마 디스플레이에 나타나는 아이디들이 bnsn값을 가지므로 이를 xnyn으로 바꾸거나 x, y를 b, s 값으로 치환하는 함수를 따로 만들어야 할 것이다.


function changeXYtoBS(x, y) {
	var b = 0;
	var s = 0;
	return {
		b: b,
		s: s
	};
}
function changeBStoXY(b, s) {
	var x = 0;
	var y = 0;
	return {
		x: x,
		y: y
	};
}



// inputer에 값이 입력됨
function inputerInsert(n) {	// n이라는 값이 입력됨.
	sdk.move(inputer.x, inputer.y);
	sdk.add(n);
}

function inputerRemove() {
	sdk.move(inputer.x, inputer.y);
	sdk.remove();
}









