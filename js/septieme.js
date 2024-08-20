const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;

const lerp = (start, end, t) => start * (1 - t) + end * t;

function updateScroll() {
  startY = lerp(startY, endY, easing);
  track.style.transform = `translateY(-${startY}px)`;
  activateParallax();
  raf = requestAnimationFrame(updateScroll);
  if (Math.abs(startY - window.scrollY) < 0.1) cancelAnimationFrame(raf);
}

function startScroll() {
  endY = window.scrollY; 
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(updateScroll);
}

function parallax(card) {
  const wrapper = card.querySelector('.card-image-wrapper');
  const diff = card.offsetHeight - wrapper.offsetHeight;
  const { top } = card.getBoundingClientRect();
  const progress = top / window.innerHeight;
  const yPos = diff * progress;
  wrapper.style.transform = `translateY(${yPos}px)`;
}

const activateParallax = () => cards.forEach(parallax);

function init() {
  gallery.style.height = `${track.clientHeight}px`; // Set once on init
  startScroll();
}

// Debounce scroll event handler
let scrollTimeout;
function onScroll() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(init, 10);
}

window.addEventListener('load', () => {
  init();
  window.addEventListener('scroll', onScroll, false);
  window.addEventListener('resize', updateScroll, false);
});


document.getElementById('previousButton').addEventListener('click', function() {
  window.location.href = '/pages/power_skills.html';
});

document.getElementById('nextButton').addEventListener('click', function() {
  window.location.href = '/pages/ux_case.html';
});
