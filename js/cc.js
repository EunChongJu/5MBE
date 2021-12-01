
/*

데이터란 자막으로 표시하게 될 input의 데이터를 불러와 저장한다.
또한 데이터를 저장하고 이를 5분 내에 몇 번 반복을 할 것인지 계산한다.

1. 5분은 300초다.
2. 기본으로 설정된 타임의 값은 (5.5, 0, 5.5)다.
3. 그러므로 5.5초 동안의 한 자막은 5분동안 54번 반복된다.
4. 그리고 자막이 될 데이터의 갯수를 계산한다.
5. 데이터의 갯수가 27개라면 54/27=2이므로 27을 한 그룹으로 2번 반복한다.
5.1 데이터의 갯수가 3개면 54/3=18이므로 3개를 한 그룹으로 18번 반복된다.
5.2 데이터 갯수가 5개면 54/5=10.8이므로 5개를 한 그룹으로 묶어 11번 반복한다. (2.5초 추가됨)
5.3 데이터 갯수가 9개면 6번 반복된다.
5.4 데이터 갯수가 12개면 4.5다. 그러므로 29.7초동안 반복되므로 나머지 3초는 마무리로 아멘이 표시된다.
6. 
7. 
8. 
9. 


*/

var ccMemory = function() {
	var data = [];
	
    this.lenSet = function(len) {
        data = new Array(len);
    }
	this.set = function(arr) {
		if (!Array.isArray(arr)) {
			for (var i = 0; i < arr.length; i++) {
				data.push(arr[i]);
			}
		}
	}
	this.get = function() {
		return data;
	}
    
    this.push = function(str) {
        data.push(str);
    };
    this.shift = function() {
        return data.shift();
    };
    this.unshift = function(str) {
        data.unshift(str);
    }
    
}






