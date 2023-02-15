window.addEventListener('load', function() {
	var allElements = document.getElementsByTagName('*');
	Array.prototype.forEach.call(allElements, function(el) {
		var includePath = el.dataset.includePath;
		if (includePath) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					el.outerHTML = this.responseText;
				}
			};
			xhttp.open('GET', includePath, true);
			xhttp.send();
		}
	});
});

/*
출처:https://kyung-a.tistory.com/18

위 자바스크립트를 해석해보자면 getElementsByTagName 모든 엘리먼트들 중
include-html 이름의 속성 값을 찾습니다
그 후 include-html 속성 값을 파일 이름으로 사용하여 HTTP 요청을 합니다
elmnt.innerHTML = this.responseText 서버에 요청하여 응답으로 받은 데이터를 문자열로 html에 그립니다
그리고 include-html 속성을 removeAttribute 제거하고 다시 호출하는 재귀함수 사용!
(실은 더 디테일하게 해석하고 싶지만... 잘 모르겠습니다  elmnt = z[1]; 이 부분이 왜 필요한걸까요?ㅠㅠ)
매우 성공적으로 html 안에 html이 불러와집니다!
💥 그러나 제 사수님께서 괜찮은 방법이었으나 코드 정리가 필요할 것 같다고 해서  (특히 재귀함수의 위험성)
사수님께서 직접 수정을 해주신 최종 결과물!
html문서가 로드되는 시점에 실행되는 함수입니다
모든 엘리먼트들을 불러옵니다
Array.prototype.forEach.call을 쓴 이유는 el이 유사배열이기에..? 쓴건가 봅니다..!
(사실 완벽한 해석이 불가능합니다😭 어림짐작 검색해보며 해석중...)
그리고 그 el 엘리먼트들 중에서 data-include-path 속성이 붙은 값을 찾습니다
outerHTML을 쓴 이유는 각각 html에서 태그들을 무엇을 쓸지 모르기에 자기 자신을 포함하기 위해서인 것 같습니다!
예를 들어 <header></header> 으로 쓸수도 <div id="header"></div> 로 쓸수도 있으니까 그런것 같습니다
*/