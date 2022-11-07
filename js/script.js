// Змінні
let canvas = document.querySelector('#canvas');
let fsBtn = document.querySelector('#fsBtn');
fsBtn.onclick = () => {
  if (window.document.fullscreen) {
    fsBtn.src = './images/fullscreen.png';
    window.document.exitFullscreen();
  } else {
    fsBtn.src = './images/cancel.png';
    canvas.requestFullscreen();
  }
};
let heroImg = document.querySelector('#hero-img');
heroImg.onclick = e => {
  e.preventDefult();
};
let imgBlock = document.querySelector('#img-block');
let rightPosition = 0;
let imgBlockPosition = 0;
let direction = 'right';

// Функції
const rightHandler = () => {
  heroImg.style.transform = 'scale(-1,1)';
  rightPosition += 1;
  imgBlockPosition += 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 288}px`;
  heroImg.style.top = '-576px';
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const leftHandler = () => {
  heroImg.style.transform = 'scale(1, 1)';
  rightPosition += 1;
  imgBlockPosition -= 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 288}px`;
  heroImg.style.top = '-576px';
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const standHandler = () => {
  switch (direction) {
    case 'right': {
      heroImg.style.transform = 'scale(-1,1)';
      if (rightPosition > 4) {
        rightPosition = 0;
      }
      break;
    }
    case 'left': {
      heroImg.style.transform = 'scale(1,1)';
      if (rightPosition > 3) {
        rightPosition = 0;
      }
      break;
    }
    default:
      break;
  }

  rightPosition += 1;
  heroImg.style.left = `-${rightPosition * 288}px`;
  heroImg.style.top = '0px';
};

// Оброблювач подій
let timer = null;
const lifeCycle = () => {
  timer = setInterval(() => {
    standHandler();
  }, 150);
};
let x = 0;
let halfWidht = window.screen.width / 2;

let onTouchStart = e => {
  clearInterval(timer);

  if (e.type === 'mousedown') {
    x = e.screenX;
  } else {
    x = e.touches[0].screenX;
  }

  timer = setInterval(() => {
    if (x > halfWidht) {
      direction = 'right';
      rightHandler();
    } else {
      direction = 'left';
      leftHandler();
    }
  }, 130);
};

let onTouchEnd = e => {
  clearInterval(timer);
  lifeCycle();
};

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;

const start = () => {
  lifeCycle();
};
start();
