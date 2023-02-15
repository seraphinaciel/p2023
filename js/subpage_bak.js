//subpage → 
const subVisual = document.querySelector(".sub_visual");
const subVisualBg = document.querySelector(".sub_visual span");
const subVisualTitle = document.querySelector(".sub_visual h2");
//const conceptTitle = document.querySelector(".concept h2");
const prevBtn = document.querySelector(".pageIndicator .prev");
const nextBtn = document.querySelector(".pageIndicator .next");

const currentLink = document.location.href;
const localFullName = document.URL.substring(document.URL.lastIndexOf('/') + 1);
const localName = parseInt(localFullName.substring(localFullName.lastIndexOf('.'), 9));

const CURRENT_NUM = localName;
const PAGE_CURRENT = String(localName).padStart(2, "0");
const PREV_NUM = localName - 1; //0
const NEXT_NUM = localName + 1; //0
const PAGE_NUM_PREV = String(PREV_NUM).padStart(2, "0"); //00
const PAGE_NUM_NEXT = String(NEXT_NUM).padStart(2, "0"); //00
const subTitle = [
	'장수군 승마레저파크',
//	'고창군립도서관',
	'전라북도 농업기술원',
	'익산시의회',
	'고창군청',
	'순창군청',
	'전북도청',
	'담양 대나무 축제',
//	'전남지원청',
//	'광주광역시 빅데이터',
//	'전북교육청',
//	'대구고등학교',
//	'익산시 체육시설예약',
	'비짓전주',
	'임실군청',
//	'군산대 학과'
]

function indicatorTxt() {
	subVisualTitle.innerText = subTitle[CURRENT_NUM];
	subVisualBg.style = `background:url(../images/thumnail/img${PAGE_CURRENT}.jpg) center ;background-size:cover;`;

	//	conceptTitle.innerText = subTitle[CURRENT_NUM];

	prevBtn.style = `background:url('../images/thumnail/img${PAGE_NUM_PREV}.jpg') top;background-size:cover;`;
	nextBtn.style = `background:url('../images/thumnail/img${PAGE_NUM_NEXT}.jpg') top;background-size:cover;`;

	prevBtn.innerHTML = `<div><i class="material-icons-round">arrow_back</i><span>이전프로젝트<strong>${subTitle[PREV_NUM]}</strong></span></div>`;
	nextBtn.innerHTML = `<div><span>다음프로젝트<strong>${subTitle[NEXT_NUM]}</strong></span><i class="material-icons-round">arrow_forward</i></div>`;

	//button disabled in first & last page
	if (localName === 0) {
		prevBtn.disabled = true;
		prevBtn.style = `cursor:auto`;
		prevBtn.title = ``;
		prevBtn.innerHTML = `<div><span>이전프로젝트 <strong>없습니다</strong></span></div>`;
	} else if (localName === 8) {
		nextBtn.disabled = true;
		nextBtn.style = `cursor:auto`;
		nextBtn.title = ``;
		nextBtn.innerHTML = `<div><span>다음프로젝트 <strong>없습니다</strong></span></div>`;
	}
}
indicatorTxt();

//indicator : click to prev&next button linked page
function indicatorBox() {
	if (window.location == currentLink) {
		if (this.className == 'prev') {
			window.location.href = 'subpage__' + PAGE_NUM_PREV + '.html';

		} else {
			window.location.href = 'subpage__' + PAGE_NUM_NEXT + '.html';
		}
	}
}
prevBtn.addEventListener("click", indicatorBox);
nextBtn.addEventListener("click", indicatorBox);


//sub navigator + progress bar + article adding id
const nav = document.createElement("nav");
subVisual.appendChild(nav);
const storyCon = document.querySelectorAll(".story");
const p = document.createElement("p");
nav.appendChild(p);
for (var i = 1; i <= storyCon.length; i++) {
	const storyNum = String(i).padStart(2, "0");
	const a = document.createElement("a");
	a.href = `#story${storyNum}`;
	a.innerText = `story${storyNum}`;
	p.appendChild(a);
	storyCon[i-1].id = `story${storyNum}`
}
const progress = document.createElement("div");
progress.classList.add("progress");
progress.innerHTML = `<div class="bar" id="progress-bar"></div>`;
nav.appendChild(progress);

//sub navigator adding class sticky + progress bar %
function myFunction() {
	const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const scrolled = (winScroll / height) * 100;
	const sticky = nav.offsetTop;
	if (window.pageYOffset > sticky) {
		nav.classList.add("sticky")
		document.getElementById("progress-bar").style.width = scrolled + "%";
	} else {
		nav.classList.remove("sticky");
	}
}
window.onscroll = function () {	myFunction()};

//scrolled sub navigator adding active
window.addEventListener('DOMContentLoaded', () => {
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			if (entry.intersectionRatio > 0) {
				document.querySelector(`main nav a[href="#${id}"]`).classList.add('active');
			} else {
				document.querySelector(`main nav a[href="#${id}"]`).classList.remove('active');
			}
			//			console.log(entry.intersectionRatio)
		});
	});

	document.querySelectorAll('article[id]').forEach((section) => {
		observer.observe(section);
	});
});
