(() => {
  const contentBody = document.querySelectorAll("#content > article");

  let yOffset = 0;
  let currentScene = 0;

  let scrollHeight;
  let scrollRealHeight;
  let sectionOffsetTop;
  let sectionScrollTop;
  let percent;

  function setLayout() {
    yOffset = window.pageYOffset; // 스크롤

    let totalScrollHeight = 0;
    for (let i = 0; i < contentBody.length; i++) {
      totalScrollHeight += contentBody[i].scrollHeight;

      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute("id", `sub-${currentScene}`);

    scrollFunc();
  }

  function scrollFunc() {
    sVisual();
    sSlide_v();
    sSlide_h();
    sCode();
  }

  function setProperty(sectionName) {
    scrollHeight = sectionName.offsetHeight; // 높이
    sectionOffsetTop = sectionName.getBoundingClientRect().top + yOffset; // 0
    scrollRealHeight = scrollHeight - window.innerHeight; // 9443, 3628
    sectionScrollTop = yOffset - sectionOffsetTop; // scrolling
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
   * header
   */
  function sVisual() {
    const sub_visual = document.querySelector(".sub_visual");

    const titleMove =
      yOffset / ((sub_visual.offsetHeight - window.innerHeight) / 2);

    const gap = 1;
    if (currentScene === 0) {
      document
        .querySelectorAll(".sub_visual > div")
        .forEach(function (arr, index) {
          arr.style = "--progress:" + Math.max(0, titleMove - index * gap) + "";
        });
    }
  }

  /**
   * slider
   */
  function sSlide_v() {
    if (currentScene === 1) {
      imgName = document.querySelectorAll(".txt");
      const slide_v = document.querySelector(".slide_v");
      setProperty(slide_v);

      const deviceImg = document.querySelector(".slide_v figure"); // 슬라이더 안에 이미지 요소 찾기
      const imgF = document.querySelectorAll(".slide_v figure"); // 슬라이더 안에 이미지 요소 찾기
      const imgWidth = deviceImg.clientWidth;

      contentIn(imgWidth, imgF); // 배경 이미지와 텍스트 처리
    }
  }

  function sSlide_h() {
    if (currentScene === 2) {
      imgName = document.querySelectorAll("figcaption");
      const slide_h = document.querySelector(".slide_h");
      setProperty(slide_h);

      const deviceImg = document.querySelector(".slide_h figure"); // 슬라이더 안에 이미지 요소 찾기
      const imgF = document.querySelectorAll(".slide_h figure"); // 슬라이더 안에 이미지 요소 찾기
      const imgWidth = deviceImg.clientWidth;

      contentIn(imgWidth, imgF); // 배경 이미지와 텍스트 처리
    }
  }

  function contentIn(imgWidth, imgF) {
    let co = 9;
    let num = 32;
    if (isMobile === true) {
      co = 5;
      co = 20;
    }
    let coco = co;
    for (let i = 0; i < imgF.length; i++) {
      coco = co + num;
      if (percent >= co && percent < co + num) {
        imageChange(imgWidth * i);
        setFixText(i);
      }
      co = coco;
    }
  }

  function setFixText(index) {
    let imgName;
    if (currentScene === 1) {
      imgName = document.querySelectorAll(".text>div");
    }
    if (currentScene === 2) {
      imgName = document.querySelectorAll("figcaption");
    }
    imgName.forEach(function (el) {
      el.classList.remove("active");
    });
    imgName[index].classList.add("active");
  }

  function imageChange(moveX) {
    let imgBox;
    if (currentScene === 1) {
      imgBox = document.querySelector(".slide_v .slide");
    }
    if (currentScene === 2) {
      imgBox = document.querySelector(".slide_h .figureWrap");
    }
    imgBox.style.transform = "translateX(" + -moveX + "px)";
  }

  /**
   * slider
   */
  function sCode() {
    const sub_detail = document.querySelector(".sub_detail");
    setProperty(sub_detail);
    console.log(percent);
    scrollLocation(sub_detail, percent, -300);
  }
  const subVisual = document.querySelector(".sub_visual");

  //sub navigator + progress bar + article adding id
  const nav = document.querySelector("nav");
  const storyCon = document.querySelectorAll(".story");

  function navA() {
    const p = document.createElement("p");
    nav.appendChild(p);
    for (let i = 1; i <= storyCon.length; i++) {
      const storyNum = String(i).padStart(2, "0");
      const a = document.createElement("a");
      a.href = `#story${storyNum}`;
      a.innerText = `story${storyNum}`;
      p.appendChild(a);
      storyCon[i - 1].id = `story${storyNum}`;
    }
    const progress = document.createElement("p");
    progress.classList.add("progress");
    progress.innerHTML = `<p class="bar" id="progress-bar"></p>`;
    nav.appendChild(progress);

    //scrolled sub navigator adding active
    const observer = new IntersectionObserver((entries) => {
      // http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.intersectionRatio > 0) {
          document
            .querySelector(`main nav a[href="#${id}"]`)
            .classList.add("active");
        } else {
          document
            .querySelector(`main nav a[href="#${id}"]`)
            .classList.remove("active");
        }
      });
    });

    document.querySelectorAll("article[id]").forEach((article) => {
      observer.observe(article);
    });
  }

  function navCreate() {
    //sub navigator adding class sticky + progress bar %
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const sticky = nav.offsetTop;

    console.log(percent);
    if (currentScene >= 1) {
      nav.classList.add("sticky");
      document.getElementById("progress-bar").style.width = scrolled + "%";
    } else {
      nav.classList.remove("sticky");
    }
  }
  // navA();
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
          // navCreate();
        },
        false
      );

      window.addEventListener(
        "resize",
        () => {
          setLayout();
          // navCreate();
        },
        false
      );

      init();
    });
})();
