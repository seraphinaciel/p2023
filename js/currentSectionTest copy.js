(() => {
  const contentBody = document.querySelectorAll("#content > article");

  const introduce = document.querySelector(".introduce");
  const personality = document.querySelector(".personality"); // 패럴렉스가 시작될 엘리먼트

  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let currentScene = 0; //현재 활성화된 씬(scroll-section)

  let scrollHeight;
  let scrollRealHeight; //실제 스크롤 해야 될 높이
  let sectionOffsetTop;
  let sectionOffsetBottom;
  let sectionScrollTop; //스크롤 백분율 값을 담을 변수
  let scrollPercent; //스크롤탑 / 스크롤 실제 길이로 구한 비율
  let percent; //scrollPercent * 100;
  let sectionIsMoving = false; // 섹션이 이동중인지 체크하는 변수

  let isMobile;

  function setLayout() {
    yOffset = window.pageYOffset; // real time scorlling

    let totalScrollHeight = 0;
    for (let i = 0; i < contentBody.length; i++) {
      totalScrollHeight += contentBody[i].scrollHeight;

      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    console.log(currentScene);
    // console.log("yOffset : " + yOffset);
    // console.log("totalScrollHeight : " + totalScrollHeight);

    // 스크롤시 현재 섹션 id 바디에 붙임
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    scrollFunc();
  }

  function scrollFunc() {
    // 스크롤 시 실행
    setProperty(); //스크롤 할 때 변할 값을 셋팅

    titleScroll();
    if (isMobile) {
      contentInMobile(); //mobile
    } else {
      contentInPC(); // 배경 이미지와 텍스트 처리
    }
    motionParallax();

    switch (currentScene) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        project();
      case 5:
      // graph();
    }
  }

  function setProperty() {
    //스크롤 시 변할 값을 셋팅하는 함수

    scrollHeight = introduce.offsetHeight;
    scrollRealHeight = scrollHeight - window.innerHeight;
    sectionScrollTop = yOffset - sectionOffsetTop;
    sectionOffsetTop = introduce.getBoundingClientRect().top + yOffset; // 패럴렉스가 시작될 요소의 상단 위치 값
    sectionOffsetBottom = sectionOffsetTop + personality.offsetHeight; // 섹션의 바텀값을 구함
    scrollPercent = sectionScrollTop / scrollRealHeight;
    percent = scrollPercent * 100;

    isMobile = window.innerWidth <= 1024 ? true : false;
  }

  /**
   * title
   */
  function titleScroll() {
    const titleMove =
      yOffset /
      ((document.querySelector(".title").offsetHeight - window.innerHeight) /
        2);
    const gap = 1;
    document.querySelectorAll(".title h2").forEach(function (arr, index) {
      arr.style = "--progress:" + Math.max(0, titleMove - index * gap) + "";
    });
  }

  /**
   * introduce
   */
  const deviceImg = document.querySelector(".device_fix .slide_wrap figure"); // 슬라이더 안에 이미지 요소 찾기
  const imgWidth = deviceImg.clientWidth;

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

  function contentInPC() {
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

  function setFixText(index) {
    const fix_p = introduce.querySelectorAll(".txt");
    fix_p.forEach(function (el) {
      el.classList.remove("active");
    });
    fix_p[index].classList.add("active");
  }

  function imageChange(moveX) {
    // 시계 속 이미지 변경을 처리
    const img = introduce.querySelector(".slide_wrap .slide");
    img.style.transform = "translateX(" + -moveX + "px)";
  }

  /**
   * banner slider
   */
  const s1 = new personalityBox("#personality");
  function personalityBox() {
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

  /**
   * interest
   */
  function motionParallax() {
    // 스크롤 시 계속 호출 될 모션 함수 선언
    const parallaxList = document.querySelectorAll(".interest li > *"); // 변수에 페럴렉스에 반응할 이미지 리스트를 지정
    const parallaxTxtList = document.querySelectorAll(
      ".interest li figcaption"
    );
    let parallaxOffsetTop; //패럴렉스가 시작될 요소의 상단 위치 값
    let parallaxThisTop; // 패럴렉스가 시작될 위치 값을 구함
    let parallaxPercent; // 패럴렉스 백분율 값을 담을 변수 선언
    let parallaxMoveDistance; // 패럴렉스 요소가 움직일 거리를 담을 변수 선언
    const parallaxSpeed = 3000; // 패럴렉스 요소의 스피드
    const parallaxStartValue = 1000; // 패럴렉스 요소가 1000 위치에서 시작하도록 설정

    parallaxOffsetTop = introduce.getBoundingClientRect().top + yOffset; // 패럴렉스가 시작될 요소의 상단 위치 값
    parallaxThisTop = yOffset - parallaxOffsetTop; // 패럴렉스가 시작될 위치 값을 구함, personality에 스크롤이 도착하면 parallaxThisTop = 0
    parallaxPercent = (parallaxThisTop / parallaxSpeed) * 100; // 이동할 거리 백분율 값을 담음, 0 / 1200 * 100
    parallaxMoveDistance = Math.max(
      parallaxStartValue - parallaxStartValue,
      Math.min(
        parallaxStartValue,
        parallaxStartValue - parallaxStartValue * (parallaxPercent / 100)
      )
    );

    if (currentScene === 3 || scrollPercent > 1.2) {
      document.querySelector(".interest").classList.add("active");
    } else {
      document.querySelector(".interest").classList.remove("active");
    }

    // action
    parallaxList[0].style.transform =
      "translate(0, " + parallaxMoveDistance * -2.7 + "px)";
    parallaxList[1].style.transform =
      "translate(" + parallaxMoveDistance * -1.7 + "px, 0px)";
    parallaxList[2].style.transform =
      "translate(" + parallaxMoveDistance * -2.1 + "px";
    parallaxList[3].style.transform =
      "translate(" + parallaxMoveDistance * -3 + "px";
    parallaxList[4].style.transform =
      "translate(" + parallaxMoveDistance * 3 + "px";
    parallaxList[5].style.transform =
      "translate(0px," + parallaxMoveDistance * 1.2 + "px)";
    parallaxList[6].style.transform =
      "translate(0px," + parallaxMoveDistance * 1 + "px)";
    parallaxTxtList[0].style.transform =
      "translate(" + parallaxMoveDistance * -1.7 + "px)";
    parallaxTxtList[1].style.transform =
      "translate(0px," + parallaxMoveDistance * 2.7 + "px)";
    parallaxTxtList[2].style.transform =
      "translate(0px," + parallaxMoveDistance * 3 + "px)";
    parallaxTxtList[3].style.transform =
      "translate(0px," + parallaxMoveDistance * 2.7 + "px)";
  }

  /**
   * project
   *  */
  function project() {
    if (currentScene === 4 || percent >= 230) {
      document.querySelector(".project").classList.add("active");
    } else {
      document.querySelector(".project").classList.remove("active");
    }
    // if (percent >= 76 && percent < 108) {
    //   imageChange(imgWidth * 2);
    //   setFixText(2);
    // }
    const parallaxStartValue = 1000;

    // parallaxMoveDistance = Math.max(
    //   parallaxStartValue - parallaxStartValue,
    //   Math.min(
    //     parallaxStartValue,
    //     parallaxStartValue - parallaxStartValue * (parallaxPercent / 100)
    //   )
    // );
    // console.log("percent => " + percent);
    // console.log("parallaxPercent => " + parallaxPercent);
    // console.log("scrollPercent => " + scrollPercent);

    if (currentScene === 4) {
      const proList = document.querySelectorAll(".project li");
      console.log(proList.length);

      for (let i = 0; i < proList.length; i++) {
        let proSize = proList[i].scrollHeight;
        proList[i].style.background = "red";
        // console.log(parallaxMoveDistance);
        // proList[i].style.transform = `translate(#{parallaxMoveDistance}px)`;
        proList[i].style.transform = "translateX(" + proSize + "px)";
      }
    }
  }
  /**
   * graph
   */
  function graph() {
    const pieSlice = document.querySelectorAll(".pieSlice");
    const pie = document.querySelectorAll(".pie");
    const item = document.querySelectorAll(".pieName li");

    pieSlice.forEach((g, k) => {
      const dataDgree = g.dataset.degree;
      let graphNum = 0;

      const graphAnimation = setInterval(() => {
        g.dataset.degree = graphNum;
        g.style.transform = `rotate(${graphNum}deg)`;
        graphNum++ >= dataDgree && clearInterval(graphAnimation);
      }, 10);
    });

    for (let i = 0; i < item.length; i++) {
      let piePercent = pie[i].dataset.percent;
      item[i].dataset.percent = piePercent;
    }

    pie.forEach((g, k) => {
      const dataColor = g.dataset.color;
      const dataRotate = g.dataset.rotate;

      let ratateNum = 0;

      const graphAniRotate = setInterval(() => {
        g.dataset.rotate = ratateNum;
        g.style.background = `conic-gradient(${dataColor} 0 0%, ${dataColor} 0% 100% )`;
        g.style.transform = `rotate(${ratateNum}deg)`;
        ratateNum++ >= dataRotate && clearInterval(graphAniRotate);
      }, 100);
    });
  }

  window,
    addEventListener("load", () => {
      /**
       * init
       */
      function init() {
        setLayout();
      }

      window.addEventListener(
        "scroll",
        () => {
          setLayout();
        },
        false
      );

      window.addEventListener(
        "resize",
        () => {
          yOffset = window.pageYOffset; // 현재 스크롤 위치
          setLayout();
        },
        false
      );

      init();
    });
})();
