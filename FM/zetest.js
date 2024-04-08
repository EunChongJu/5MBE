





// js 특정 파일 불러오기
function includeJS(id) {
	var sc = document.createElement('script');
	sc.src = id+'.js';
//	sc.type = "text/javascript";
	sc.id = id;
	
	document.getElementsByTagName('head')[0].appendChild(sc);
}

// js 특정 파일 삭제하기
function removeJS(id) {
	var sc = document.getElementById(id);
	sc.parentNode.removeChild(sc);
}




// 통합에서 표시되는 페이지를 전환하기 위함
function changeDisplay(n) {
	// display page id arr
	var displayArr = [
		'',
		'',
		'',
		'',
	];
	for (var i = 0; i < displayArr.length; i++) {
		document.getElementById(displayArr[i]).style.display = 'none';
	}
	
	document.getElementById(displayArr[n]).style.display = 'block';	// or flex
}



