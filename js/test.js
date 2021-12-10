


// https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Animations/Using_CSS_animations
// https://blogpack.tistory.com/886
// https://blogpack.tistory.com/882?category=804108
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/animationiteration_event

// https://www.w3schools.com/jsref/prop_style_animationiterationcount.asp

function myFunc(time, cycle, type) {
    document.getElementById('lungs').style.animationName = ((type)?'hale':'grow');
    document.getElementById('lungs').style.animationIterationCount = cycle;
    document.getElementById('lungs').style.animationDuration = time+"s";
}

//// DOM 로딩 완료 후 이벤트 처리
//document.addEventListener('DOMContentLoaded', function(){
//    const heartbeat = document.querySelector('.box');
//    const msg = document.querySelector('.counter');
//    let beater = 0;
//    //이벤트 메시지 출력 함수들
//    const iterate = () => {
//      beater++;
//      msg.innerText = `하트 ${beater} 번 뜀!`;
//    }
//    const start = () => {
//        msg.innerText = `애니메이션 시작!`;
//      }
//    const end = () => {
//        msg.innerText = `애니메이션 종료!`;
//    }
//    // 애니메이션 이벤트 리스너 등록
//    heartbeat.addEventListener('animationstart', start);
//    heartbeat.addEventListener('animationend', end);
//    heartbeat.addEventListener('animationiteration', iterate);
//});


// https://ko.javascript.info/settimeout-setinterval

function timer() {
    
}
function cc() {
    
}

//let timeId = setInterval(() => alert('째깍'), 1000);
//
//setTimeout(() => { clearInterval(timeId); alert('정지'); }, 5000);

let breathingTime = setInterval(() => {
    console.log('Inhale');
    document.getElementById('brt-mode').innerHTML = "Inhale";
    setTimeout(() => {
        console.log('Exhale');
        document.getElementById('brt-mode').innerHTML = "Exhale";
    }, 5500);
}, 11000);

setTimeout(() => clearInterval(breathingTime), 60000);









