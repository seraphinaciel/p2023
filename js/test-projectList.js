/**
 * title
 */
const allText = document.querySelectorAll(".title h2");
window.addEventListener("scroll", function () {
  const dis =
    window.pageYOffset /
    ((document.querySelector(".title").offsetHeight - window.innerHeight) / 2);
  const gap = 1;
  allText.forEach(function (arr, index) {
    arr.style = "--progress:" + Math.max(0, dis - index * gap) + "";
  });
});

/**
 * introduce&Pursue
 */
window.onload = function () {
  const scrollBody = document.querySelector(".introduce");

  let scrollHeight;
  let scrollRealHeight; //실제 스크롤 해야 될 높이
  let winScrollTop; //스크롤바 높이
  let percent;

  let sectionOffsetTop;
  let sectionScrollTop; //스크롤 백분율 값을 담을 변수
  let scrollPercent; //스크롤탑 / 스크롤 길이로 구한 비율
  let isMobile;

  let sectionIsMoving = false; // 섹션이 이동중인지 체크하는 변수
  // 다중 패럴렉스 스크롤(section no.3)
  const header = document.querySelector(".header");
  const title = document.querySelector(".title");
  const sec_parallax = document.querySelector(".sec_parallax");
  const parallaxBody = document.querySelector(".personality"); // 패럴렉스가 시작될 엘리먼트
  const parallaxList = document.querySelectorAll(".sec_parallax .img_box"); // 변수에 페럴렉스에 반응할 이미지 리스트를 지정
  const parallaxLine = document.querySelector(".sec_parallax .bg_line"); // 변수에 페럴렉스에 반응할 line 지정
  let parallaxOffsetTop; //패럴렉스가 시작될 요소의 상단 위치 값
  let parallaxThisTop; // 패럴렉스가 시작될 위치 값을 구함
  const parallaxSpeed = 350; // 패럴렉스 요소의 스피드
  let parallaxPercent; // 패럴렉스 백분율 값을 담을 변수 선언
  const parallaxStartValue = 500; // 패럴렉스 요소가 1000 위치에서 시작하도록 설정
  let parallaxMoveDistance; // 패럴렉스 요소가 움직일 거리를 담을 변수 선언

  let sectionOffsetBottom;

  function scrollFunc() {
    // 스크롤 시 실행
    setProperty(); //스크롤 할 때 변할 값을 셋팅

    if (isMobile) {
      contentInMobile(); //mobile
    } else {
      contentInPC(); // 배경 이미지와 텍스트 처리
    }
  }

  function setProperty() {
    //스크롤 시 변할 값을 셋팅하는 함수
    scrollHeight = scrollBody.offsetHeight;
    scrollRealHeight = scrollHeight - window.innerHeight;
    winScrollTop = window.pageYOffset; //스크롤바의 현재 위치 구함

    sectionOffsetTop = scrollBody.getBoundingClientRect().top + winScrollTop; // 패럴렉스가 시작될 요소의 상단 위치 값
    sectionOffsetBottom = sectionOffsetTop + parallaxBody.offsetHeight; // 섹션의 바텀값을 구함

    sectionScrollTop = winScrollTop - sectionOffsetTop;
    scrollPercent = sectionScrollTop / scrollRealHeight;
    percent = scrollPercent * 100;

    isMobile = window.innerWidth <= 1024 ? true : false;

    parallaxOffsetTop = parallaxBody.getBoundingClientRect().top + winScrollTop; // 패럴렉스가 시작될 요소의 상단 위치 값(title+introcude)

    parallaxThisTop = winScrollTop - parallaxOffsetTop; // 패럴렉스가 시작될 위치 값을 구함, parallaxBody에 스크롤이 도착하면 parallaxThisTop = 0
    parallaxPercent = (parallaxThisTop / parallaxSpeed) * 100; // 이동할 거리 백분율 값을 담음, 0 / 1200 * 100
    console.log(parallaxPercent);

    parallaxMoveDistance = Math.max(
      parallaxStartValue - parallaxStartValue,
      Math.min(
        parallaxStartValue,
        parallaxStartValue - parallaxStartValue * (parallaxPercent / 100)
      )
    );
  }

  /**
   * Pursue
   */
  function motionParallax() {
    // 스크롤 시 계속 호출 될 모션 함수 선언
    if (parallaxPercent > -40) {
      document.querySelector(".sec_parallax").classList.add("active");
    } else {
      document.querySelector(".sec_parallax").classList.remove("active");
    }

    // action
    parallaxList[0].style.transform =
      "translate(0px," + parallaxMoveDistance + "px)";
    parallaxList[1].style.transform =
      "translate(0px," + parallaxMoveDistance * 2.1 + "px)";
    parallaxList[2].style.transform =
      "translate(0px," + parallaxMoveDistance * 2.5 + "px)";
    parallaxList[3].style.transform =
      "translate(0px," + parallaxMoveDistance * 3.5 + "px)";
    parallaxList[4].style.transform =
      "translate(0px," + parallaxMoveDistance * 4.2 + "px)";
    parallaxList[5].style.transform =
      "translate(0px," + parallaxMoveDistance * 4.8 + "px)";
    parallaxList[6].style.transform =
      "translate(0px," + parallaxMoveDistance * 5.3 + "px)";
    parallaxList[7].style.transform =
      "translate(0px," + parallaxMoveDistance * 2.7 + "px)";
    parallaxLine.style.transform =
      "translate(0px," + parallaxMoveDistance * 5.7 + "px)";
  }
  function moveSection() {
    //스크롤 시 호출
    setProperty(); //스크롤 시 변해야 할 값의 변수를 선언한 함수
    motionParallax();
    if (
      winScrollTop > parallaxOffsetTop &&
      winScrollTop < sectionOffsetBottom
    ) {
      // 4 메인 섹션에 진입했는지 체크
      console.log("메인 섹션 진입");
      if (!sectionIsMoving) {
        // 애니메이션이 진행중인지 체크(애니메이션 중첩 방지)
        sectionIsMoving = true; // 섹션이 이동중인지 체크
        moveStartRender(); // 섹션 이동을 처리해주는 함수
      }
    }

    /*         if(winScrollTop >= sectionOffsetBottom){ // 새로고침을 할 때 페이지가 아래에서 시작할 경우 액티브 되어야 할 클래스를 처리함
            console.log('bottom to start')
            activeCheck();
        }
 */
  }
  function activeCheck() {
    // 새로고침을 할 때 페이지가 아래에서 시작할 경우 액티브 되야 할 요소를 처리
    // sec_parallax.classList.add('active');
  }
  function moveStartRender() {
    // 5 섹션 이동을 처리하는 함수
    if (!header.classList.contains("active")) {
      // 헤더 클래스가 없을 경우, 아래로 내려오는 상황
      header.classList.add("active");
      sec_parallax.classList.add("active");
    } else {
      // 헤더 클래스가 있을 경우 위로 올라가는 상황
      header.classList.remove("active");
      sec_parallax.classList.remove("active");
    }
  }

  /**
   * introduce
   */
  const deviceImg = document.querySelector(".device_fix .slide_wrap figure"); // 슬라이더 안에 이미지 요소 찾기
  const imgWidth = deviceImg.clientWidth;
  const fix_p = scrollBody.querySelectorAll(".txt");

  function contentInPC() {
    // 섹션 진입 후 처리될 기능 정의

    if (percent >= 9 && percent < 44) {
      imageChange(imgWidth * 0);
      setFixText(0);
    }
    if (percent >= 44 && percent < 76) {
      imageChange(imgWidth * 1);
      setFixText(1);
    }
    if (percent >= 76 && percent < 108) {
      imageChange(imgWidth * 2);
      setFixText(2);
    }
  }

  function contentInMobile() {
    if (percent >= 5 && percent < 25) {
      imageChange(imgWidth * 0);
      setFixText(0);
    }
    if (percent >= 25 && percent < 45) {
      imageChange(imgWidth * 1);
      setFixText(1);
    }
    if ((percent >= 45 && percent < 65) || percent > 65) {
      imageChange(imgWidth * 2);
      setFixText(2);
    }
  }

  function setFixText(index) {
    fix_p.forEach(function (el) {
      el.classList.remove("active");
    });
    fix_p[index].classList.add("active");
  }

  function imageChange(moveX) {
    // 시계 속 이미지 변경을 처리
    const img = scrollBody.querySelector(".slide_wrap .slide");
    img.style.transform = "translateX(" + -moveX + "px)";
  }

  function init() {
    scrollFunc();
    moveSection();
  }

  window.addEventListener(
    "scroll",
    function () {
      scrollFunc();
      moveSection();
    },
    false
  );

  window.addEventListener(
    "resize",
    function () {
      scrollFunc();
      moveSection();
    },
    false
  );

  init();
};

//banner slider
function personality(target) {
  let index = 1;
  let isMoved = true;
  const speed = 1000; // ms
  const personality = document.querySelector(".personality");
  const container = document.createElement("div");
  container.classList.add("container");
  let boxes = [].slice.call(personality.children);
  boxes = [].concat(boxes, boxes, boxes[0]); //박스 배열에 박스, 복사된박스, 첫번째 박스를 합친다.
  const size = boxes.length;

  for (let i = 0; i < size; i++) {
    const box = boxes[i];
    container.appendChild(box.cloneNode(true));
  }
  personality.innerHTML = "";
  personality.appendChild(container);
  return {};
}
const s1 = new personality("#personality");
