/*--------------------
Vars
--------------------*/
const menu = document.querySelector('.menu');
const items = document.querySelectorAll('.menu--item');
const images = document.querySelectorAll('.menu--item img');
let menuWidth = menu.clientWidth;
let itemWidth = items[0].clientWidth;
let wrapWidth = items.length * itemWidth;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;

/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t;
};

/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
  items.forEach((item, i) => {
    let x = i * itemWidth + scroll;
    x = ((x + wrapWidth) % wrapWidth) - itemWidth; // wrapping logic
    item.style.transform = `translateX(${x}px)`;
  });
};
dispose(0);

/*--------------------
Wheel
--------------------*/
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY * 0.9;
};

/*--------------------
Touch
--------------------*/
let touchStart = 0;
let touchX = 0;
let isDragging = false;

const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
  menu.classList.add('is-dragging');
};

const handleTouchMove = (e) => {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};

const handleTouchEnd = () => {
  isDragging = false;
  menu.classList.remove('is-dragging');
};

/*--------------------
Listeners
--------------------*/
menu.addEventListener('wheel', handleMouseWheel);

menu.addEventListener('touchstart', handleTouchStart);
menu.addEventListener('touchmove', handleTouchMove);
menu.addEventListener('touchend', handleTouchEnd);

menu.addEventListener('mousedown', handleTouchStart);
menu.addEventListener('mousemove', handleTouchMove);
menu.addEventListener('mouseleave', handleTouchEnd);
menu.addEventListener('mouseup', handleTouchEnd);

menu.addEventListener('selectstart', (e) => e.preventDefault());

/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
  menuWidth = menu.clientWidth;
  itemWidth = items[0].clientWidth;
  wrapWidth = items.length * itemWidth;
});

/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, 0.1);
  dispose(y);

  scrollSpeed = y - oldScrollY;
  oldScrollY = y;

  items.forEach((item) => {
    const skewX = -scrollSpeed * 0.2;
    const rotate = scrollSpeed * 0.01;
    const scale = 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003;
    item.style.transform += ` skewX(${skewX}deg) rotate(${rotate}deg) scale(${scale})`;
  });
};
render();


document.querySelectorAll('.menu--item').forEach(item => {
  item.addEventListener('click', function() {
    const url = this.getAttribute('data-url');
    if (url) {
      window.location.href = url;
    }
  });
});
