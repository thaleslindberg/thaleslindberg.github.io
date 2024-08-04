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

// Select all elements with the class 'item' inside 'accordion'
const items = document.querySelectorAll('.accordion .item');

// Define an array of background images for each item
const backgroundImages = [
    "/img/project-1.png", // Background image for the first item
    "/img/project-2.png", // Background image for the second item
    "/img/project-3.MP4", // Background image for the third item
    "/img/project-4.png", // Background image for the fourth item
    "/img/project-5.png", // Background image for the fifth item
    "/img/project-6.png" // Background image for the sixth item
];

// Define an array of URLs for each item
const urls = [
    '/pages/corporate.html', // URL for the first item
    '/pages/global.html', // URL for the second item
    '/pages/power_skills.html', // URL for the third item
    '/pages/le_septieme.html', // URL for the fourth item
    '/pages/ux_case.html', // URL for the fifth item
    '/pages/nouvelle.html'  // URL for the sixth item
];

// Function to add event listeners to each item
items.forEach((item, index) => {
    // Add hover event listeners
    item.addEventListener('mouseover', () => {
        if (backgroundImages[index]) {
            item.style.backgroundImage = `url('${backgroundImages[index]}')`;
            item.style.backgroundRepeat = 'no-repeat';
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center center';
            item.style.transition = 'all 1s ease-out';
        }
    });

    item.addEventListener('mouseout', () => {
        item.style.backgroundImage = '';
    });

    // Add click event listener to navigate to the URL
    item.addEventListener('click', () => {
        // window.location.href = urls[index];
        window.open(urls[index], '_blank');
    });
});
