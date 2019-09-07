
const screenWidth    = 512,
      screenHeight   = 384,
      cupsBaseWidth = 40;

const near_back  = 200,
      near_front = 300;

const rand         = n      => Math.floor(Math.random() * n),
      rand_between = (x, y) => rand(y-x) + x;

let target,
    cups;

const seq = n =>
  new Array(n).fill(false).map( (_, i) => i );  // seq(5) -> [0,1,2,3,4]

const n_times = (n, doWhat) =>
  seq(n).map(_ => doWhat());

const pctToBack = y =>
  (screenHeight - y) / screenHeight;

function PlaceAt(x, y) {

  let realToBack        = (screenHeight - y) / screenHeight,
      scale             = 1 - (realToBack * 1);

  let thisCups         = document.createElement('img');

  thisCups.className   = 'cups';
  thisCups.src         = 'coffeecup.png';
  thisCups.style.top   = `${y}px`;
  thisCups.style.left  = `${x}px`;
  thisCups.style.width = `${cupsBaseWidth * scale}px`;
  thisCups.onclick     = receivecupsClick;

  cups.appendChild(thisCups);
  ++cupsCount;

}

function receiveCupsClick(evt) {
  --cupsCount;
  evt.srcElement.parentElement.removeChild(evt.srcElement);
  document.getElementById('Slurp').play();
  if (cupsCount <= 0) {
    document.getElementById('makingcoffee').play();
    target.className = 'replay';
  }
}

function PlaceOnShop() {
  let x = rand(screenWidth - cupsBaseWidth),
      y = rand_between(near_front, near_back);
  PlaceAt(x, y);
}

function PlaceOnNearShop() {
  let x = rand(screenWidth - cupsBaseWidth),
      y = rand_between(screenHeight - 50, near_front);
  PlaceAt(x, y);
}

function enterGameMode() {
  cupsCount       = 0;
  cups.innerHTML   = 'x';
  target.className = 'game';
  n_times(10, PlaceOnShop);
  n_times(4,  PlaceOnNearShop);
}

function startup() {

  target = document.getElementById('target');
  cups   = document.getElementById('cups');

  target.className = 'menu';

  document.getElementById('begin').onclick = enterGameMode;

}



window.onload = startup;
