# Portfolio 2023

> 2015 ~ 2023년까지 해왔던 일부 프로젝트를 보여줍니다.

## 데모 이미지

![데모 이미지](images/thumnail/demo01.gif)
![데모 이미지](images/thumnail/demo02.gif)
![데모 이미지](images/thumnail/demo03.gif)

## 개발 기간

23.2.5. ~ 2. 17.

## 사용 언어, 환경

디자인 : <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>

---

퍼블리싱 : <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/jQuery-0769AD?style=flat-square&logo=jQuery&logoColor=white"/>

---

도구 : <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>

## 컨셉

1. 넓은 화면을 활용하여 한 눈에 보기 쉽게 만들었다.
2. 반응형, 패럴렉스 스크롤을 통해 동적인 움직임을 주어 내용에 집중할 수 있도록 하였다.
3. 간결하게 마크업을 했고, `scss` 사용하여 중복되는 스타일을 `mixin`으로 정리했다.

## 특징

> 스크린 샷과 코드 예제를 통해 사용 방법을 자세히 설명합니다.

---

### 1. 패럴랙스 스크롤

```javascript

let parallaxOffsetTop = document.querySelector(".introduce").getBoundingClientRect().top + yOffset;
let parallaxThisTop = yOffset - parallaxOffsetTop;
let parallaxPercent = (parallaxThisTop / parallaxSpeed) * 100;
const parallaxStartValue = 1000;
let parallaxMoveDistance
 = Math.max(parallaxStartValue - parallaxStartValue,
   Math.min(parallaxStartValue,
            parallaxStartValue - parallaxStartValue * (parallaxPercent / 100))
           );

parallaxList[0].style.transform = "translate(0, " + parallaxMoveDistance * -4.7 + "px)";

(.. 생략 ..)

```

`parallaxOffsetTop` : 패럴렉스가 시작될 요소의 상단 위치 값, yOffset은 window.pageYOffset으로 스크롤링 값이다.

`parallaxThisTop` : 패럴렉스가 시작될 위치 값, 스크롤이 도착하면 parallaxThisTop = 0

`parallaxPercent` : 이동할 거리 백분율 값을 담을 변수 선언

`parallaxMoveDistance` : 패럴렉스 요소가 움직일 거리를 담을 변수 선언, 1000 ~ 0까지 움직인다

---

### 2. 무한 이동 애니메이션 효과

```javascript
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

const moving = document.querySelector(".personality");

// personality에 box의 너비값을 넣어 왼쪽으로 이동할 translateX의 값을 넣는다.
moving.style = `--moving : ${document.querySelector(".box").scrollWidth}px`;
```

객체 & 일회용 생성자 함수를 생성한다.

`.container` 요소 생성

`.container`를 `[].slice.call`을 사용해 배열로 바꾸어 `boxes`에 넣고, 그 배열에 `boxes` 세 개를 합친다.

`for`를 이용해 차례대로 `boxes`와 자식노드를 `box`에 넣고, `box` 를 `container` 에 복제한다.

`personality`를 초기화 시킨 후, `box`가 복제된 `container`를 붙여넣는다.

---

### 3. 왼쪽의 문구(`.history`)를 스크롤링 할 때마다 그래프 그리기

#### (1) 스크롤링 값 구하기

```javascript
let scrollHeight = sectionName.offsetHeight;
let sectionOffsetTop = sectionName.getBoundingClientRect().top + yOffset;
let scrollRealHeight = scrollHeight - window.innerHeight;
let sectionScrollTop = yOffset - sectionOffsetTop;
let percent = (sectionScrollTop / scrollRealHeight) * 100;
```

`scrollHeight ` : 그래프가 그려질 `article`의 높이 값

`sectionOffsetTop ` : 패럴렉스가 시작될 요소의 상단 위치 값

`scrollRealHeight ` : 실제 스크롤 되는 높이

`sectionScrollTop ` : 스크롤 백분율 값을 담을 변수

`percent ` : 스크롤 백분율 / 실제 스크롤 높이를 구한 비율

#### (2) 그래프 바깥(`pieSlice`) 그리기

```javascript
for (let i = 0; i < pieSlice.length; i++) {
  const d = pieSlice[i].dataset.degree;
  let n = 0;

  for (let k = 0; k < d; k++) {
    if (n <= d) {
      n++;
      pieSlice[i].style.transform = `rotate(${n}deg)`;
    }
  }

  calcGG(0, 4);
  생략;
}
```

반복문으로 차례대로 `pieSlice`의 `data-degree`의 값을 가져와 `rotate`로 스타일을 그린다.

`calcGG(0, 4)` 은 각각 index=0, end=4 값을 calcGG로 보낸다.

#### (3) `calcGG(index, end)` : `.history` 스크롤링 시 그래프 색 칠하기 부르기

```javascript
const array = [0, 16, 34, 50, 65, 85, 100];

for (let arrIndex = 0; arrIndex < array.length; arrIndex++) {
  let starting = 1;
  starting = starting + arrIndex;
  let i = 5;

  if (percent > array[arrIndex] && percent < array[arrIndex + 1]) {
    graph(index, starting, end);
  }

  starting++;
}
```

`array` : 스크롤이 시작될 `percent`를 넣은 배열

`starting` : 그래프가 그려질 시작점, `arrIndex`만큼 조각이 커진다.

`graph(index, starting, end)` : index, starting, end 값을 보낸다.

#### (4) `graph(index, starting, end)` : 그래프 색 칠하기

```javascript
const color = pie[index].dataset.color;
let rPiece = pie[index].dataset.rotate / end;
let cake = rPiece * starting;

let n = 0;
for (let k = 0; k < pie[index].dataset.rotate; k++) {
  if (n < cake) {
    n++;
    pie[
      index
    ].style.background = `conic-gradient(${color} 0 0%, ${color} 0% 100% )`;
    pie[index].style.transform = `rotate(${n}deg)`;
  }
}
```

`cake ` : 스크롤링 할 때마다 안쪽 그래프의 한 조각(`data-rotate`)을 `starting` 만큼 더한다.

`cake`보다 작을 때까지 0에서 1씩 값이 커지며 안쪽 그래프(`pie`)들에게 스타일을 적용시킨다.

---

## 고집했던 포인트

- 최대한 바닐라 자바스크립트로 만들기 위해 노력했다.
- 외부 소스를 가져다 쓰지 않고 공부하면서 만들었다.

## 이후의 계획

- 중복되는 코드를 간결하게 만들어 볼 예정이다.
- 공부한 내용을 블로그에 기록할 예정이다.
- 사이드 프로젝트 등을 만들어 꾸준히 업데이트를 할 예정이다.

## 정보

[사이트 바로 가기](https://seraphinaciel.github.io/p2023/)
