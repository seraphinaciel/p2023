<<<<<<< HEAD
//go to top
// $(document).ready(function ($) {
//   let offset = 300,
//     scroll_top_duration = 700,
//     $back_to_top = $(".btnTop");

//   $(window).scroll(function () {
//     $(this).scrollTop() > offset ? $back_to_top.addClass("btnVisible") : $back_to_top.removeClass("btnVisible");
//   });

//   //smooth scroll to top
//   $back_to_top.on("click", function (event) {
//     event.preventDefault();
//     $("body,html").animate(
//       {
//         scrollTop: 0,
//       },
//       scroll_top_duration
//     );
//   });
// });

/* document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    alert('마우스 오른쪽 클릭은 사용할 수 없습니다.');
});
 */

(() => {
  function backToTop() {
    let yOffset = 0;
    let offset = 300;
    let scroll_top_duration = 700;
    const bTbutton = document.querySelector(".btnTop");
    yOffset = window.pageYOffset;

    yOffset > offset
      ? bTbutton.classList.add("btnVisible")
      : bTbutton.classList.remove("btnVisible");

    //smooth scroll to top
    bTbutton.addEventListener("click", function (event) {
      event.preventDefault();
      // 바닐라로 만들다 말았음
    });
  }

  window,
    addEventListener("load", () => {
      /**
       * init
       */
      function init() {
        backToTop();
      }

      window.addEventListener(
        "scroll",
        () => {
          backToTop();
        },
        false
      );

      window.addEventListener(
        "resize",
        () => {
          yOffset = window.pageYOffset; // 현재 스크롤 위치
          backToTop();
        },
        false
      );

      init();
    });
})();
=======
//go to top
// $(document).ready(function ($) {
//   let offset = 300,
//     scroll_top_duration = 700,
//     $back_to_top = $(".btnTop");

//   $(window).scroll(function () {
//     $(this).scrollTop() > offset ? $back_to_top.addClass("btnVisible") : $back_to_top.removeClass("btnVisible");
//   });

//   //smooth scroll to top
//   $back_to_top.on("click", function (event) {
//     event.preventDefault();
//     $("body,html").animate(
//       {
//         scrollTop: 0,
//       },
//       scroll_top_duration
//     );
//   });
// });

/* document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    alert('마우스 오른쪽 클릭은 사용할 수 없습니다.');
});
 */

(() => {
  function backToTop() {
    let yOffset = 0;
    let offset = 300;
    let scroll_top_duration = 700;
    const bTbutton = document.querySelector(".btnTop");
    yOffset = window.pageYOffset;

    yOffset > offset
      ? bTbutton.classList.add("btnVisible")
      : bTbutton.classList.remove("btnVisible");

    //smooth scroll to top
    bTbutton.addEventListener("click", function (event) {
      event.preventDefault();
      // 바닐라로 만들다 말았음
    });
  }

  window,
    addEventListener("load", () => {
      /**
       * init
       */
      function init() {
        backToTop();
      }

      window.addEventListener(
        "scroll",
        () => {
          backToTop();
        },
        false
      );

      window.addEventListener(
        "resize",
        () => {
          yOffset = window.pageYOffset; // 현재 스크롤 위치
          backToTop();
        },
        false
      );

      init();
    });
})();
>>>>>>> cfd9af2c84a206875ba7ba0a0839c1cdec6a7a94
