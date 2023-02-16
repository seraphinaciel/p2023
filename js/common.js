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
