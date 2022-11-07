// Змінні
let heroImg = document.querySelector('#hero-img');
let imgBlock = document.querySelector('#img-block');
let rightPosition = 0;
let imgBlockPosition = 0;

// Функції
const rightHandler = () => {
  rightPosition += 1;
  imgBlockPosition += 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 288}px`;
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

// Оброблювач подій
let timer = null;
let onTouchStart = e => {
  timer = setInterval(() => {
    rightHandler();
  }, 130);
};
let onTouchEnd = e => {
  clearInterval(timer);
};

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;
