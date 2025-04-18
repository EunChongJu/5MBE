


/*
 * 이 사이트 기반으로 텍스트 파일이나 사이트 연계 찬송가 번호 조회로 띄우게 할 수 있을거라 생각된다.
 * http://www.holybible.or.kr/NHYMN/cgi/hymnftxt.php?VR=NHYMN&DN=125&QR=%b3%eb%bf%a4
 */


// id: ras1
async function upload(file) {
	let text = await file.text();
	
	//showArr('output1', text);
	showText('output1', text);
}


// upload() or process()

// id: ras2
function process(file) {
	var reader = new FileReader();
	
	reader.onload = function() {
		//showArr('output2', reader.result);
		showText('output2', reader.result);
	};
	
	reader.readAsText(file, "utf-8");
}




function showArr(id, arr) {
	let result = '';
	
	for (var i = 0; i < arr.length; i++) {
		result += '<p>'+arr[i]+'</p>';
	}
	
	document.getElementById(id).innerHTML = result;
}

function showText(id, text) {
	let result = '';
	
	let arr = text.split(/\r\n|\r|\n/);
	
	for (var i = 0; i < arr.length; i++) {
		result += '<p>'+arr[i]+'</p>';
	}
	//console.log(arr);
	
	document.getElementById(id).innerHTML = result;
}









