//go to top
$(document).ready(function ($) {
  let offset = 300,
    scroll_top_duration = 700,
    $back_to_top = $(".btnTop");

  $(window).scroll(function () {
    $(this).scrollTop() > offset
      ? $back_to_top.addClass("btnVisible")
      : $back_to_top.removeClass("btnVisible");
  });

  //smooth scroll to top
  $back_to_top.on("click", function (event) {
    event.preventDefault();
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      scroll_top_duration
    );
  });
});

/* document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    alert('마우스 오른쪽 클릭은 사용할 수 없습니다.');
});
 */

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
    sHeader();
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
  function sHeader() {
    const sub_visual = document.querySelector("#content");
    const header = document.querySelector("header");

    setProperty(sub_visual);
    scrollLocation(header, percent, 10);
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
          yOffset = window.pageYOffset;
          setLayout();
        },
        false
      );

      init();
    });
})();
