(() => {
  const contentBody = document.querySelectorAll("#content > article");

  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let currentScene = 0; //현재 활성화된 씬(scroll-section)

  let scrollHeight;
  let scrollRealHeight; //실제 스크롤 해야 될 높이
  let sectionOffsetTop;
  let sectionScrollTop; //스크롤 백분율 값을 담을 변수
  let percent; //스크롤탑 / 스크롤 실제 길이로 구한 비율

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

    // 스크롤시 현재 섹션 id 바디에 붙임
    document.body.setAttribute("id", `show-scene-${currentScene}`);

    scrollFunc();
  }

  function scrollFunc() {
    sTitle();
    sintroduce();
    sInterest();
    sProject();
    sGraph();
  }

  function setProperty(sectionName) {
    //스크롤 시 변할 값을 셋팅하는 함수
    scrollHeight = sectionName.offsetHeight;
    sectionOffsetTop = sectionName.getBoundingClientRect().top + yOffset; // 패럴렉스가 시작될 요소의 상단 위치 값
    scrollRealHeight = scrollHeight - window.innerHeight;
    sectionScrollTop = yOffset - sectionOffsetTop;
    // sectionOffsetBottom = sectionOffsetTop + personality.offsetHeight; // 섹션의 바텀값을 구함
    percent = (sectionScrollTop / scrollRealHeight) * 100;

    isMobile = window.innerWidth <= 768 ? true : false;
  }

  function scrollLocation(sectionName, percent, pointNum) {
    if (percent > pointNum) {
      sectionName.classList.add("active");
    } else {
      sectionName.classList.remove("active");
    }
  }

  /**
   * title & header
   */
  function sTitle() {
    const title = document.querySelector(".title");
    const titleMove = yOffset / ((title.offsetHeight - window.innerHeight) / 2);

    const gap = 1;
    if (currentScene === 0) {
      document.querySelectorAll(".title h2").forEach(function (arr, index) {
        arr.style = "--progress:" + Math.max(0, titleMove - index * gap) + "";
      });
    }
  }

  /**
   * introduce
   */
  function sintroduce() {
    const introduce = document.querySelector(".introduce");
    setProperty(introduce);

    const deviceImg = document.querySelector(".device_fix .slide_wrap figure"); // 슬라이더 안에 이미지 요소 찾기
    const imgWidth = deviceImg.clientWidth;

    if (isMobile) {
      contentInMobile(imgWidth); //mobile
    } else {
      contentInPC(imgWidth); // 배경 이미지와 텍스트 처리
    }
  }

  function contentInMobile(imgWidth) {
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

  function contentInPC(imgWidth) {
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
    const fix_p = document.querySelectorAll(".txt");
    fix_p.forEach(function (el) {
      el.classList.remove("active");
    });
    fix_p[index].classList.add("active");
  }

  function imageChange(moveX) {
    // 시계 속 이미지 변경을 처리
    const img = document.querySelector(".slide_wrap .slide");
    img.style.transform = "translateX(" + -moveX + "px)";
  }

  /**
   * banner slider
   */
  function personalityMoving() {
    const moving = document.querySelector(".personality");
    moving.style = `--moving : ${document.querySelector(".box").scrollWidth}px`;
  }

  // 객체 & 일회용 생성자 함수
  const banner = new (function () {
    const container = document.createElement("div");
    container.classList.add("container");
    let boxes = [].slice.call(personality.children);
    boxes = [].concat(boxes, boxes, boxes);

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      container.appendChild(box.cloneNode(true));
    }
    personality.innerHTML = "";
    personality.appendChild(container);
    return;
  })();

  /**
   * interest
   */
  function sInterest() {
    const interest = document.querySelector(".interest");
    setProperty(interest);
    scrollLocation(interest, percent, -200);

    let parallaxSpeed = 0; // 패럴렉스 요소의 스피드

    if (isMobile) {
      parallaxSpeed = 2600;
      parallaxScroll(parallaxSpeed);
    } else {
      parallaxSpeed = 2900;
      parallaxScroll(parallaxSpeed);
    }
  }

  function parallaxScroll(parallaxSpeed) {
    // 스크롤 시 계속 호출 될 모션 함수 선언
    const parallaxList = document.querySelectorAll(".interest li > *"); // 변수에 페럴렉스에 반응할 이미지 리스트를 지정
    const parallaxTxtList = document.querySelectorAll(
      ".interest li figcaption"
    );
    let parallaxOffsetTop; //패럴렉스가 시작될 요소의 상단 위치 값
    let parallaxThisTop; // 패럴렉스가 시작될 위치 값을 구함
    let parallaxPercent; // 패럴렉스 백분율 값을 담을 변수 선언
    let parallaxMoveDistance; // 패럴렉스 요소가 움직일 거리를 담을 변수 선언
    const parallaxStartValue = 1000; // 패럴렉스 요소가 1000 위치에서 시작하도록 설정
    parallaxOffsetTop =
      document.querySelector(".introduce").getBoundingClientRect().top +
      yOffset; // 패럴렉스가 시작될 요소의 상단 위치 값
    parallaxThisTop = yOffset - parallaxOffsetTop; // 패럴렉스가 시작될 위치 값을 구함, personality에 스크롤이 도착하면 parallaxThisTop = 0
    parallaxPercent = (parallaxThisTop / parallaxSpeed) * 100; // 이동할 거리 백분율 값을 담음, 0 / 1200 * 100
    parallaxMoveDistance = Math.max(
      parallaxStartValue - parallaxStartValue,
      Math.min(
        parallaxStartValue,
        parallaxStartValue - parallaxStartValue * (parallaxPercent / 100)
      )
    );

    // action
    parallaxList[0].style.transform =
      "translate(0, " + parallaxMoveDistance * -4.7 + "px)";
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
  function sProject() {
    const proBody = document.querySelector(".project");
    const proUl = proBody.querySelector("ul");
    const proList = proBody.querySelectorAll("li");
    setProperty(proBody);
    scrollLocation(proUl, percent, -20);

    let proSize,
      totalSize = 0;
    let projectOffsetTop;
    let projectThisTop;
    let projectPercent;
    let projectMoveDistance;
    let projectStartValue;
    const projectSpeed = 600;

    projectOffsetTop = proBody.getBoundingClientRect().top + yOffset;
    projectThisTop = yOffset - projectOffsetTop;
    projectPercent = (projectThisTop / projectSpeed) * 100;

    for (let i = 0; i < proList.length; i++) {
      proSize = proList[i].offsetHeight;
      totalSize += proSize;
      projectStartValue = totalSize;

      projectMoveDistance = Math.max(
        projectStartValue - projectStartValue,
        Math.min(
          projectStartValue,
          projectStartValue - projectStartValue * (projectPercent / 100)
        )
      );

      proList[i].style.transform = "translateY(" + -projectMoveDistance + "px)";
    }

    document.querySelectorAll(".project li a").forEach((project, index) => {
      let aa = project.querySelector("span");

      project.style = `--moving : ${aa.scrollWidth}px; --time: ${
        aa.innerText.length / 5
      }s`;
    });
  }

  const proList = document.querySelector(".project ul");
  const loadMoreButton = document.querySelector(".project button");
  let currentPage = 1;

  function projectListBox(pageIndex) {
    class projectContent {
      constructor(title, type, date, role, link) {
        this.title = title;
        this.type = type;
        this.date = date;
        this.role = role;
        this.link = link;
      }
    }

    const visit = new projectContent(
      "비짓전주",
      "신규 사업",
      "20.11.2. ~ 22.5.9.",
      "메인 디자인, 퍼블리싱, 기여도 100%",
      "./subpage__06.html"
    );
    const bamboo = new projectContent(
      "담양 대나무 축제",
      "20.1.23. ~ 3.26.",
      "신규 사업",
      "디자인&amp;퍼블리싱 기여도 40%",
      "http://www.bamboofestival.co.kr/index.do"
    );
    const jeonbuk = new projectContent(
      "전북도청",
      "19.6.12. ~ 1.5.",
      "design&amp;publishing, 기여도 100%",
      "5개 통합사업&유지보수(3년)",
      "https://www.jeonbuk.go.kr/index.jeonbuk"
    );
    const jeonbukgovernor = new projectContent(
      "전북도청 도지사실",
      "19.9.3. ~ 20.1.5.",
      "design&amp;publishing, 기여도 100%",
      "5개 통합사업&유지보수(3년)",
      "https://www.jeonbuk.go.kr/governor/index.jeonbuk"
    );
    const kunsan = new projectContent(
      "군산대학교 학과",
      "21.8.2. ~ 10.15.",
      "design&amp;publishing, 기여도 100%",
      "55개 개편 사업",
      "https://www.kunsan.ac.kr/knuenglish/"
    );
    const imsilmayor = new projectContent(
      "임실군 군수실",
      "21.3.1.",
      "design, 기여도 100%",
      "7개 통합사업",
      "https://www.imsil.go.kr/mayor/index.imsil"
    );
    const imsilbogun = new projectContent(
      "임실군 보건의료원",
      "21.3.2.",
      "design, 기여도 100%",
      "7개 통합사업",
      "https://www.imsil.go.kr/bogun/index.imsil"
    );
    const jbe = new projectContent(
      "전라북도 교육청 외국어",
      "20.9.1. ~ 10.15.",
      "design&amp;publishing, 기여도 100%",
      "16개 통합 개편 사업",
      "https://www.jbe.go.kr/eng/index.jbe"
    );
    const gwangjuBigdata = new projectContent(
      "광주광역시 빅데이터",
      "20.6.8. ~ 10.12.",
      "design&amp;publishing, 기여도 100%",
      "빅데이터 신규 사업",
      "https://seraphinaciel.github.io/gwangjuBigdata_2020/"
    );
    const jne = new projectContent(
      "전라남도 지원청",
      "20.2.21. ~ 4.3.",
      "design&amp;publishing, 기여도 100%",
      "템플릿 사업 지원",
      "https://hped.jne.go.kr/index.jne"
    );

    const buanmayor = new projectContent(
      "부안군 군수실",
      "19.5.2. ~ 5.10.",
      "design&amp;publishing, 기여도 100%",
      "템플릿 사업&유지보수",
      "https://www.buan.go.kr/mayor/index.buan"
    );
    const sunchangblueberry = new projectContent(
      "순창군 블루베리 분양",
      "19.7.25. ~ 11.12.",
      "design&amp;publishing, 기여도 60%",
      "5개 통합사업",
      "http://www.sunchang.go.kr/blueberry/index.sunchang"
    );
    const sunchangfarm = new projectContent(
      "순창군 농업기술센터",
      "19.6.24. ~ 11.12.",
      "design&amp;publishing, 기여도 60%",
      "5개 통합사업",
      "http://www.sunchang.go.kr/farm/index.sunchang"
    );
    const gochangcouncil = new projectContent(
      "고창군의회 의원",
      "19.7.17. ~ 9.30.",
      "디자인&amp;퍼블리싱 기여도 40%",
      "개편 사업",
      "https://www.gochang.go.kr/council/index.gochang?menuCd=DOM_000000607001003000"
    );
    const gochanggcbr = new projectContent(
      "고창군청 생물권보전지역",
      "19.3.4. ~ 3.19.",
      "디자인&amp;퍼블리싱 기여도 40%",
      "신규 사업",
      "https://www.gochang.go.kr/gcbr/index.gochang"
    );
    const gochangart = new projectContent(
      "고창군청 문화의 전당",
      "19.7.3. ~ 8.5.",
      "디자인&amp;퍼블리싱 기여도 40%",
      "개편 사업",
      "https://www.gochang.go.kr/art/index.gochang"
    );
    const gochanggcdolmen = new projectContent(
      "고창군청 고인돌 박물관",
      "19.7.8. ~ 7.23.",
      "디자인&amp;퍼블리싱 기여도 40%",
      "개편 사업",
      "https://www.gochang.go.kr/gcdolmen/index.gochang"
    );
    const gochangchildcare = new projectContent(
      "고창군청 육아종합지원센터",
      "19.7.15. ~ 8.8.",
      "디자인&amp;퍼블리싱 기여도 40%",
      "개편 사업&유지보수",
      "https://www.gochang.go.kr/childcare/index.gochang"
    );
    const jpn = new projectContent(
      "익산시의회 외국어",
      "19.3.4. ~ 4.5.",
      "content design&amp;publishing, 기여도 100%",
      "개편 사업",
      "https://council.iksan.go.kr/jpn/index.iksan"
    );
    const child = new projectContent(
      "익산시 어린이 청소년 의회",
      "19.2.12. ~ 3.27.",
      "content design&amp;publishing, 기여도 100%",
      "개편 사업",
      "https://council.iksan.go.kr/child/index.iksan"
    );
    const jbares = new projectContent(
      "전라북도 농업기술원",
      "18.6.1. ~ 19.1.3.",
      "design&amp;publishing, 기여도 100%",
      "개편 사업&유지보수",
      "https://www.jbares.go.kr/index.jbares"
    );
    const horseleisure = new projectContent(
      "장수군 승마레저파크",
      "18.1.12. ~ 19.4.30.",
      "design&amp;publishing, 기여도 100%",
      "개편 사업&유지보수",
      "http://www.horseleisure.co.kr/"
    );
    const namwonlove = new projectContent(
      "남원 사이버 장터",
      "17.2.21. ~ 3.2.",
      "design&amp;publishing, 기여도 100%",
      "신규 사업&유지보수",
      "http://www.namwonlove.co.kr/"
    );
    const dbbooth = new projectContent(
      "DB방음부스",
      "17.1.23. ~ 2.13.",
      "design&amp;publishing, 기여도 100%",
      "신규 사업",
      "http://www.dbbooth.co.kr/"
    );
    const mamashu = new projectContent(
      "마마슈",
      "16.12.19. ~ 17.6.4.",
      "design&amp;publishing, 기여도 100%",
      "신규 사업",
      "http://www.mamashu.co.kr/"
    );
    const tng = new projectContent(
      "주식회사 T&G",
      "16.11.21. ~ 11.30.",
      "design, 기여도 100%",
      "신규 사업",
      "https://tng.co.kr/"
    );
    const jbgochu = new projectContent(
      "임실 고추앤 농산물 가공 판매(주)",
      "16.10.5. ~ 17.4.30.",
      "design&amp;publishing, 기여도 100%",
      "신규 사업&유지보수",
      "http://www.jbgochu.com/"
    );
    const gomsomall = new projectContent(
      "곰소젓갈",
      "16.12.7. ~ 17.2.6.",
      "design&amp;publishing, 기여도 100%",
      "상세페이지 등 유지보수",
      "http://www.gomsomall.co.kr/"
    );
    const danpoongmall = new projectContent(
      "정읍시 단풍미인 쇼핑몰",
      "16.08.01. ~ 17.06.13.",
      "design&amp;publishing, 기여도 100%",
      "상세페이지 등 유지보수",
      "https://www.danpoongmall.kr/"
    );
    const htfood = new projectContent(
      "김정숙 황토식품",
      "16.8.16. ~ 10.21.",
      "design&amp;publishing, 기여도 100%",
      "신규 사업&유지보수",
      "http://www.htfood.co.kr/"
    );
    const jjworkingmom = new projectContent(
      "전주시 직장맘 고충 상담소",
      "15.12.1. ~ 15.12.7.",
      "design&amp;publishing, 기여도 100%",
      "신규 사업",
      "http://www.jjworkingmom.org/main"
    );
    const projectName = [
      visit,
      bamboo,
      jeonbuk,
      jeonbukgovernor,
      kunsan,
      imsilmayor,
      imsilbogun,
      jbe,
      gwangjuBigdata,
      jne,
      buanmayor,
      sunchangblueberry,
      sunchangfarm,
      gochangcouncil,
      gochanggcbr,
      gochangart,
      gochanggcdolmen,
      gochangchildcare,
      jpn,
      child,
      jbares,
      horseleisure,
      namwonlove,
      dbbooth,
      mamashu,
      tng,
      jbgochu,
      gomsomall,
      danpoongmall,
      htfood,
      jjworkingmom,
    ];

    const cardLimit = projectName.length;
    const cardIncrease = 8;
    const pageCount = Math.ceil(cardLimit / cardIncrease);

    currentPage = pageIndex;

    if (pageCount === currentPage) {
      loadMoreButton.classList.add("disabled");
      loadMoreButton.setAttribute("disabled", true);
    }

    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange =
      pageIndex * cardIncrease > cardLimit
        ? cardLimit
        : pageIndex * cardIncrease;

    for (let i = startRange; i < endRange; i++) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="${projectName[i].link}" target="_blank" title="새창 열림"><strong>${projectName[i].title}</strong> <span>${projectName[i].date} / ${projectName[i].role} / ${projectName[i].type}</span></a>`;

      if (projectName[i].link.indexOf("subpage") === 2) {
        listItem.innerHTML = `<a href="${projectName[i].link}" class="no"><strong>${projectName[i].title}</strong> <span>${projectName[i].date} / ${projectName[i].role} / ${projectName[i].type}</span></a>`;
      }
      proList.appendChild(listItem);
    }
  }

  /**
   * graph
   */
  function sGraph() {
    const storyGraph = document.querySelector(".storyGraph");
    setProperty(storyGraph);
    scrollLocation(storyGraph, percent, -12);

    // 그래프 바깥 그리기
    const pieSlice = document.querySelectorAll(".pieSlice");
    for (let i = 0; i < pieSlice.length; i++) {
      const d = pieSlice[i].dataset.degree;
      let n = 0;

      for (let k = 0; k < d; k++) {
        if (n <= d) {
          n++;
          pieSlice[i].style.transform = `rotate(${n}deg)`;
        }
      }
    }

    // history 스크롤링 시 그래프 색 칠하기 부르기
    if (isMobile) {
      graph(0, 6, 6);
      graph(1, 6, 6);
      graph(2, 6, 6);
      graph(3, 6, 6);
      graph(4, 6, 6);
    } else {
      calcGG(0, 4);
      calcGG(1, 5);
      calcGG(2, 6);
      calcGG(3, 2);
      calcGG(4, 2);
    }
  }

  //history 스크롤링 시 그래프 색 칠하기
  function calcGG(index, end) {
    const array = [0, 16, 34, 50, 65, 85, 100];

    for (let arrIndex = 0; arrIndex < array.length; arrIndex++) {
      let starting = 1;

      starting = starting + arrIndex;

      let i = 5;
      if (percent < 4) {
        graph(index, 0, 0);
      } else if (percent > array[arrIndex] && percent < array[arrIndex + 1]) {
        if (index < 3) graph(index, starting, end);

        if (index >= 3 && starting < 5) graph(index, 0, end);

        if (index >= 3 && starting >= 5) graph(index, starting - i, end);
      } else if (percent >= array[array.length - 1]) {
        if (index >= 3 && starting >= 5) graph(index, starting - i, end);
      }

      starting++;
    }
  }

  // 그래프 색 칠하기
  function graph(index, start, end) {
    const pie = document.querySelectorAll(".pie");
    const item = document.querySelectorAll(".pieName li");

    let piePercent = pie[index].dataset.percent;
    const color = pie[index].dataset.color;
    const rotate = pie[index].dataset.rotate;
    let piece = 0;
    let piece2 = 0;
    let cake = 0;
    let cake2 = 0;

    piece = rotate / end;
    piece2 = piePercent / end;
    cake = piece * start;
    cake2 = piece2 * start;

    // txt
    let ratateNum = 0;
    const graphAnimation = setInterval(() => {
      if (end === 0) clearInterval(graphAnimation);
      item[index].dataset.percent = ratateNum;
      ratateNum++ >= cake2 && clearInterval(graphAnimation);
    }, 10);

    // txt indicator color
    let colorPalette = [];
    colorPalette[index] = color;
    item[index].style = "--bgColor:" + colorPalette[index];

    // graph
    let n = 0;
    for (let k = 0; k < rotate; k++) {
      if (start === 0) pie[index].style.transform = `rotate(0deg)`;

      if (n < cake) {
        n++;
        pie[
          index
        ].style.background = `conic-gradient(${color} 0 0%, ${color} 0% 100% )`;
        pie[index].style.transform = `rotate(${n}deg)`;
      }
    }
  }

  window,
    addEventListener("load", () => {
      /**
       * init
       */
      function init() {
        setLayout();
        personalityMoving();
        projectListBox(currentPage);
      }
      loadMoreButton.addEventListener("click", (e) => {
        e.preventDefault();
        projectListBox(currentPage + 1);
      });

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
          personalityMoving();
        },
        false
      );

      init();
    });
})();
