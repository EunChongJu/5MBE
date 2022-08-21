


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


function CCMaker(parascript, inhaleTime, exhaleTime, holdingTime, repeat, merge, holdCC) {
	var startParas = parascript.getStartParas();
	var endParas = parascript.getEndParas();
	var parasList = parascript.get();
	
	var parasLength = (merge) ? parasList.length : parasList.length * 2;
	
	var ccArr = [];
	
	ccArr.push(startParas);
	
	for (var i = 0; i < parasList.length; i++) {
		// 홀드 타임 표시 허용 시 inhale, exhale 사이에 자막이 들어간다.
		// 그리고 표시 불허 시 inhale, exhale 사이에 자막이 들어가지 않아 비어있는 문자열이 들어간다.
		// 그러나 홀드 타임 표시 불허에서 merge가 true라면 inhale와 exhale는 하나의 자막으로 표시되므로 다음으로 넘어간다.
		// 그리고 repeat가 나오면 방금까지 한 것을 반복해서 표시해야 한다.
		// 아 코딩하기 귀찮
	}
	
	ccArr.push(endParas);
	
	return ccArr;
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






