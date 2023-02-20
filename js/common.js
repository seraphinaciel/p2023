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
    sVisual();
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

// const currentLink = document.location.href;
// const localFullName = document.URL.substring(document.URL.lastIndexOf("/") + 1);
// //subpage__06.html => subpage
// const localName = parseInt(
//   localFullName.substring(localFullName.lastIndexOf("."), 9)
// ); //subpage__06.html => 6

// const CURRENT_NUM = localName;
// const PREV_NUM = localName - 1;
// const NEXT_NUM = localName + 1;
// const PAGE_CURRENT = String(localName).padStart(2, "0"); //subpage__06.html => 06
// const PAGE_NUM_PREV = String(PREV_NUM).padStart(2, "0"); //subpage__06.html => 05
// const PAGE_NUM_NEXT = String(NEXT_NUM).padStart(2, "0"); //subpage__06.html => 07
// console.log(PAGE_NUM_PREV);

// //indicator button
// const aside = document.querySelector("aside");
// aside.appendChild(document.createElement("a")).classList.add("prev");
// aside.appendChild(document.createElement("a")).classList.add("list");
// aside.appendChild(document.createElement("a")).classList.add("next");

// const prevBtn = document.querySelector("aside .prev");
// const nextBtn = document.querySelector("aside .next");
// const listBtn = document.querySelector("aside .list");
// prevBtn.href = "subpage__" + PAGE_NUM_PREV + ".html";
// prevBtn.style = `background:url('images/thumnail/img${PAGE_NUM_PREV}.jpg') top;background-size:cover;`;
// prevBtn.innerHTML = `<div><i class="material-icons-round">arrow_back</i><span>이전프로젝트<strong>${subTitle[PREV_NUM]}</strong></span></div>`;
// nextBtn.href = "subpage__" + PAGE_NUM_NEXT + ".html";
// nextBtn.style = `background:url('images/thumnail/img${PAGE_NUM_NEXT}.jpg') top;background-size:cover;`;
// nextBtn.innerHTML = `<div><span>다음프로젝트<strong>${subTitle[NEXT_NUM]}</strong></span><i class="material-icons-round">arrow_forward</i></div>`;
// listBtn.href = "index.html";
// listBtn.innerText = `list`;

// //button disabled in first & last page
// console.log(localName);
// if (localName === 0) {
//   prevBtn.classList.add("disabled");
//   prevBtn.innerHTML = `<div><span>이전프로젝트 <strong>없습니다</strong></span></div>`;
//   prevBtn.href = "javascript:void(0);";
// } else if (localName === 6) {
//   nextBtn.classList.add("disabled");
//   nextBtn.innerHTML = `<div><span>다음프로젝트 <strong>없습니다</strong></span></div>`;
//   nextBtn.href = "javascript:void(0);";
// }
//indicator : click to prev&next button linked page
/*
const indicatorBtn = document.querySelectorAll("aside a")
indicatorBtn.forEach((currntBtn, index) => {
	currntBtn.addEventListener("click", (e) => {
		if (index == 0) {
			window.location.href = 'subpage__' + PAGE_NUM_PREV + '.html';
		} else if (index == 2) {
			window.location.href = 'subpage__' + PAGE_NUM_NEXT + '.html';
		} else {
			window.location.href ='index.html';
		}
		e.preventDefault();
	});
});
*/
