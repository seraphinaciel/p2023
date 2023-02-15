window.addEventListener("load", function () {
  const allElements = document.querySelectorAll("#include");

  Array.prototype.forEach.call(allElements, function (el) {
    const includePath = el.dataset.includePath;

    if (includePath) {
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.outerHTML = this.responseText; //서버에 요청하여 응답으로 받은 데이터를 문자열로 html에 그림
        }
      };

      xhttp.open("GET", includePath, true);
      xhttp.send();
    }
  });
});

// 출처:https://kyung-a.tistory.com/18
