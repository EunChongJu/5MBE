


// * No Test Zone, Needs Test Zone for this script

//// Second version

// 
// <button onclick="openTextFile()">Open</button>
// <div id="output">...</div>
// 
// 

function openTextFile() {
	var input = document.createElement("input");
	
	input.type = "file";
	input.accept = "text/plain";	// 확장자가 .text, .txt 일때, ".text, .txt"
	
	input.onchange = function(event) {
		processFile(event.target.files[0]);
	};
	
	input.click();
}

function processFile(file) {
	var reader = new FileReader();
	
	reader.onload = function() {
		output.innnerText = reader.result;
	};
	
	reader.readAsText(file, "utf-8");	// optional ("euc-kr", ...)
}










//// Prime version


// blob.test()
// - UTF-8로 해석되는 blob의 내용을 포함하는 문자열로 확인되는 약속을 전달, 로컬 파일 읽는데 사용

// <input type="file" onchange="loadFile(this.files[0])">
// <pre id="output"></pre>
// <script>
async function loadFile(file) {
	let text = await file.text();
	document.getElementById('output').textContent = text;
}
// </script>


// 또는 FileReader 인터페이스 사용
// 컴퓨터에 저장된 파일(또는 원시적 데이터 버퍼) 내용을 비동기적으로 읽을 수 있음

// <input type="file" name="inputFile" id="inputFile">
// <pre id="output"></pre>
// <script>
document.getElementById('inputFile').addEventListener('change', function() {
	var file = new FileReader();
	file.onload = () => {
		document.getElementById('output').textContent = file.result;
	};
	file.readAsText(this.files[0]);
});
// </script>







/*
 * 이 사이트 기반으로 텍스트 파일이나 사이트 연계 찬송가 번호 조회로 띄우게 할 수 있을거라 생각된다.
 * http://www.holybible.or.kr/NHYMN/cgi/hymnftxt.php?VR=NHYMN&DN=125&QR=%b3%eb%bf%a4
 */





