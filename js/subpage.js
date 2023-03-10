(() => {
  const localFullName = document.URL.substring(
    document.URL.lastIndexOf("/") + 1
  );

  switch (localFullName) {
    case "product_page.html":
      console.log(1);
      product_page();
      break;
    case "subpage__06.html":
      console.log(2);
      subPage();
      break;
  }
})();

function subPage() {
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

    console.log(yOffset);
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

  window,
    addEventListener("load", () => {
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
          setLayout();
        },
        false
      );

      init();
    });
}

function product_page() {
  const [dialog, btnOpen, img, btnClose, dialogTitle] = [
    document.querySelector("dialog#myDialog"),
    document.querySelectorAll(".btnOpen"),
    document.querySelector("#img"),
    document.querySelector("#btnClose"),
    document.querySelector(".dialogTitle"),
  ];

  btnOpen.forEach((e, k) => {
    e.addEventListener("click", function () {
      dialog.showModal();
      let em = this.querySelector("em");
      let h2 = this.querySelector("h2");
      let imgSrc = this.querySelector("img");
      dialogTitle.innerHTML = `<em>${em.innerText}</em><h2>${h2.innerText}</h2>`;
      img.innerHTML = `<img src="${imgSrc.src}">`;
      document.querySelector("body").style.overflow = "hidden";
    });
  });

  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  });

  dialog.addEventListener("close", (e) => {
    switch (dialog.returnValue) {
      case "cancel":
        return false;
    }
    e.preventDefault();
    document.querySelector("body").style.overflow = "scroll";
  });
}
