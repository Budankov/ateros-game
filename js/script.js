// Змінні
let rightPosition = 0;
let imgBlockPosition = 0;
let direction = 'right';
let jump = false;
let hit = false;
let timer = null;
let x = 0;
let halfWidht = window.screen.width / 2;

let canvas = document.querySelector('#canvas');
let fsBtn = document.querySelector('#fsBtn');
let heroImg = document.querySelector('#hero-img');
let imgBlock = document.querySelector('#img-block');
let jumpBlock = document.querySelector('#jump-block');
let hitBlock = document.querySelector('#hit-block');

jumpBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`;
hitBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`;

heroImg.onclick = e => {
  e.preventDefult();
};

fsBtn.onclick = () => {
  if (window.document.fullscreen) {
    fsBtn.src = './images/fullscreen.png';
    window.document.exitFullscreen();
  } else {
    fsBtn.src = './images/cancel.png';
    canvas.requestFullscreen();
  }
};

jumpBlock.onclick = () => {
  jump = true;
};

hitBlock.onclick = () => {
  hit = true;
};

// Функції
const rightHandler = () => {
  heroImg.style.transform = 'scale(-1,1)';
  rightPosition += 1;
  imgBlockPosition += 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 96}px`;
  heroImg.style.top = '-192px';
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const leftHandler = () => {
  heroImg.style.transform = 'scale(1, 1)';
  rightPosition += 1;
  imgBlockPosition -= 1;
  if (rightPosition > 5) {
    rightPosition = 0;
  }
  heroImg.style.left = `-${rightPosition * 96}px`;
  heroImg.style.top = '-192px';
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
  heroImg.style.left = `-${rightPosition * 96}px`;
  heroImg.style.top = '0px';
};

const hitHandler = () => {
  switch (direction) {
    case 'right': {
      heroImg.style.transform = 'scale(-1,1)';
      if (rightPosition > 4) {
        rightPosition = 0;
        hit = false;
      }
      break;
    }
    case 'left': {
      heroImg.style.transform = 'scale(1,1)';
      if (rightPosition > 3) {
        rightPosition = 0;
        hit = false;
      }
      break;
    }
    default:
      break;
  }

  rightPosition += 1;
  heroImg.style.left = `-${rightPosition * 96}px`;
  heroImg.style.top = '-288px';
};

const jumpHandler = () => {
  switch (direction) {
    case 'right': {
      heroImg.style.transform = 'scale(-1,1)';
      if (rightPosition > 4) {
        rightPosition = 0;
        jump = false;
      }
      break;
    }
    case 'left': {
      heroImg.style.transform = 'scale(1,1)';
      if (rightPosition > 3) {
        rightPosition = 0;
        jump = false;
      }
      break;
    }
    default:
      break;
  }

  rightPosition += 1;
  heroImg.style.left = `-${rightPosition * 96}px`;
  heroImg.style.top = '-96px';
};

// Оброблювач подій
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

// Рух персонажа на клавіатурі
const listeningToPressingWalk = () => {
  document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowLeft') {
      leftHandler();
    } else if (e.key == 'ArrowRight') {
      rightHandler();
    } else if (e.key == 'ArrowUp' || e.key == ' ') {
      jumpHandler();
    } else {
      standHandler();
    }
  });
};

const lifeCycle = () => {
  timer = setInterval(() => {
    if (hit) {
      hitHandler();
    } else if (jump) {
      jumpHandler();
    } else {
      standHandler();
    }
  }, 150);
};

const createTiles = (x, y = 1) => {
  let tile = document.createElement('img');
  tile.src = './images/assets/1 Tiles/Tile_02.png';
  tile.style.position = 'absolute';
  tile.style.left = `${x * 32}px`;
  tile.style.bottom = `${y * 32}px`;
  canvas.appendChild(tile);
};

const createTilesPlatform = (startX, startY, length) => {
  for (let index = 0; index < length; index++) {
    createTiles(startX + index, startY);
  }
};

const addTiles = index => {
  createTiles(index);
  let tileBlack = document.createElement('img');
  tileBlack.src = './images/assets/1 Tiles/Tile_04.png';
  tileBlack.style.position = 'absolute';
  tileBlack.style.left = `${index * 32}px`;
  tileBlack.style.bottom = '0px';
  canvas.appendChild(tileBlack);
};

const start = () => {
  lifeCycle();
  listeningToPressingWalk();
  for (let index = 0; index < window.screen.width / 32; index++) {
    addTiles(index);
  }
  createTilesPlatform(10, 10, 10);
  createTilesPlatform(15, 5, 10);
};
start();
