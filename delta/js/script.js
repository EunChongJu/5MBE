
function setStopTime(val) {
	if (val != 0) {
		option.disableStop = true;
		option.stopTime = val;
	}
	else {
		option.disableStop = false;
		option.stopTime = 0;
	}
}

function setTitleName(val) {
	paraForm.title = val;
}
function loadScripts(scripts) {
	for (var i = 0; i < scripts.length; i++) {
		addScript(scripts[i]);
	}
}

function addScript(val) {
	paraForm.scripts.push(val);
}

function removeScriptIndex(index) {
	paraForm.scripts[index] = '';
}













// INTRO SETTING BACKGROUND //

// 파일 업로더 이벤트 실행
function bgEventOpen() { getLId('bg-load').addEventListener('change', loadImage); }
// 파일 업로더 이벤트 종료
function bgEventClose() { getLId('bg-load').removeEventListener('change', loadImage); }

// 파일 업로더에 파일을 불러오는 함수
function loadImage() {
//	var file = new FileReader();
//	file.onload = () => {
//		file.result
//	}
//	file.readAsText(this.files[0]);
	
	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = () => {
		document.body.style.backgroundImage = 'url("' + reader.result + '")';
		bgImageMode();
	}
	if (file) {
		reader.readAsDataURL(file);
	}
	else {}
}

////////////////////////////////////////////////////////////////////////

var Program = function() {
	
	var Option = function() {
		
		// breaking time set
		var brts = false;
		
		this.setBrts = function(bool) {
			/*
			if (bool) {
				// true라면 brTime 사용 가능
				
			}
			else {
				// false라면 brTime 사용 불가능
				
			}
			*/
			brts = bool;
		};
		this.getBrts = function() { return brts; };
		
		
		// repetition set
		var rp = 1;	// 1이면 한번만 하고 종료됨
		
		this.setRp = function(num) { rp = ((num>=1)?num:1); };
		this.getRp = function() { return rp; };
		
		
		// time set
		var inTime = 5;	// 숨들이쉬기 시간
		var exTime = 5;	// 숨내쉬기 시간
		var brTime = 3;	// 숨참기 시간
		
		// set time
		this.setInTime = function(time) { inTime = ((time>=1)?time:1); };
		this.setExTime = function(time) { exTime = ((time>=1)?time:1); };
		this.setBrTime = function(time) { brTime = ((time>=1)?time:1); };
		
		// get time
		this.getInTime = function() { return inTime; };
		this.getExTime = function() { return exTime; };
		this.getBrTime = function() { return brTime; };
		
		
		
		
		
		
		this.getOrderArr = function() {
			
			var order = [];
			
			var inTime = this.getInTime();
			var exTime = this.getExTime();
			var brTime = this.getBrTime();
			
			var br = this.getBrts();
			
			var rp = this.getRp();
			
			// 
			/*
			[
				{
					mode: 1,	// 1: 숨들이쉬기, 2: 숨참기, 3: 숨뱉기, 4: 수축한 상태에서 숨참기,
					time: 5,	// 시간
					cycle: 1,	// 몇번째 호흡 사이클
				},
				{ mode: 3, time: 5,...},
				...
			]
			*/
			
			for (var cycle = 0; cycle < rp; cycle++) {
				
				order.push({mode: 1, time: inTime, cycle: cycle});
				
				if (br) {
					// 만약에 숨참는 시간을 가진다면
					order.push({mode: 2, time: brTime, cycle: cycle});
				}
				
				order.push({mode: 3, time: exTime, cycle: cycle});
			}
			
			// 여기에 아마 시작부분과 종료부분에 각각 숨내쉬기와 숨들이쉬기를 추가해야 할 것 같음
			
			return order;
		}
		
		
		
	}
	
	var ParaScripter = function() {
		
		// 
		/*
		arr = [
			{}
		]
		*/
		
		// 근데 거기에 스크립트 설정하면 서로 시간과 연계가 필요한데
		// 예를 들어 스크립트를 15줄 만들고 숨참기 있음을 설정하면 이를 5사이클로 사용할 수 있다.
		
		// 결론은 스크립터와 옵션을 통합할 필요가 있다는 말이다.
		
		
		
		
	}
	
	this.op = null;
	this.sp = null;
	
	// 외부에서 함수를 실행할 수 없는 함수는 function(){}, 외부에서 실행 가능한 함수는 this. = function(){}로 한다.
	
	// 프로그램을 처음 실행하거나 초기화할 때
	function setProgram() {
		this.op = new Option();
		this.sp = new ParaScripter();
	}
	
	this.start = function() {
		
	}
	
	
	// 아마 외부의 html id와 같은 값을 가져와 css 설정을 할 수 있도록 개발해야 할 것이다.
	
	
	this.play = function() {
		
	}
	this.pause = function() {
		
	}
	
	
	
	
	
}




















