


// 이 클래스는 운동할 때만 실행
// 들숨시간(=endTime), 숨참시간, 날숨시간(=startTime), 자막의 갯수, 자막의 반복횟수, 들-날 그룹여부, 숨참시 자막표시 여부, 
var Exercise = function(inhaleTime, holdTime, exhaleTime, subtitleLength, subtitleCycle, inexGroup, subtitleOnHold) {
	var startTime = exhaleTime;
	var endTime = inhaleTime;
	
	// 숨참시 자막표시 여부는 숨참시간이 0이면 값은 무효가 됨
	// 들-날 그룹여부가 true면 들-날이 통합되어 들+날은 하나로 간주하게 된다.
	// 들-날 그룹여부가 false면 들-날이 분리되어 두개로 간주한다. 
	// 
	
	
	
}


var service;

function activeService() {
	var inhaleTime = 5;
	var holdTime = 1;
	var exhaleTime = 5;
	var subtitleLength = 10;
	var subtitleCycle = 2;
	var inexGroup = true;
	var subtitleOnHold = true;
	
	service = new Exercise(inhaleTime, holdTime, exhaleTime, subtitleLength, subtitleCycle, inexGroup, subtitleOnHold);
	
}

function clickLungs() {
	ps.get();
}



function init() {
	showIntro();
	addParas();
	tab(2);
	changeSelectSubtitle();
//	eventOnChangeOn('start-paras');
//	eventOnChangeOn('end-paras');
}


function getExerciseTime(inhaleTime, holdTime, exhaleTime, subtitleLength, subtitleCycle, inexGroup, subtitleOnHold) {
	var time = inhaleTime + exhaleTime;
	
	
	return time;
}










function backToIntro() {
	// 만약에 운동중이라면 운동을 멈추고 인트로로 화면전환을 실행해야 할 것이다.
	showIntro();
}






