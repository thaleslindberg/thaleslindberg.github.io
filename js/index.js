// Debounce scroll event handler
let scrollTimeout;
function onScroll() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(init, 10);
}

function init() {
  // Initialization logic, e.g., lazy loading images, animations, etc.
  console.log('Initialized on scroll or load');
}

function updateScroll() {
  // Update scroll logic, e.g., adjust layout on resize
  console.log('Updated on resize');
}

window.addEventListener('load', () => {
  init();
  window.addEventListener('scroll', onScroll, false);
  window.addEventListener('resize', updateScroll, false);
});



