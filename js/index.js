setInterval(showTime, 1000)
        
function showTime() {
    const time = new Date()
    document.getElementById("clock").innerHTML = time.toLocaleTimeString()

    // document.getElementById("clock").innerHTML = time.toLocaleDateString()
    // document.getElementById("clock").innerHTML = time.getFullYear() + " " + time.toLocaleTimeString()
}

// ——————————————————————————————————————————————————
// MouseoverEffect
// ——————————————————————————————————————————————————

let menuItems = document.querySelectorAll(".menu-hover-image .menu-item");
let cursor = document.querySelector(".menu-hover-image .cursor");

let getXY = (e) => {
    const { clientX: x, clientY: y } = e;
    return [x, y];
  };

menuItems.forEach(menuItem => {
  // use mouseenter and mouseleave to toggle cursor since they won't bubble!
  menuItem.addEventListener("mouseenter", e => {
    let [x, y] = getXY(e);
    cursor.animate(
      [
        {
          opacity: 0,
          transform: `translate(${x}px, ${y}px) scale(0)`
        },
        {
          opacity: 1,
          transform: `translate(${x}px, ${y}px) scale(1)`
        }
      ],
      { duration: 300, fill: "forwards" }
    );
    menuItem.addEventListener("mouseleave", e => {
      let [x, y] = getXY(e);
      cursor.animate(
        [
          {
            opacity: 1,
            transform: `translate(${x}px, ${y}px) scale(1)`
          },
          {
            opacity: 0,
            transform: `translate(${x}px, ${y}px) scale(0)`
          }
        ],
        { duration: 300, fill: "forwards" }
      );
    });
  });
  // move the cursor when mouse moves.
  menuItem.addEventListener("mousemove", e => {
    let [x, y] = getXY(e);
    cursor.animate(
      [
        {
          transform: `translate(${x}px, ${y}px)`
        },
         {
          transform: `translate(${x}px, ${y}px)`
        }
      ],
      { duration: 500, delay: 50, fill: "forwards" }
    );
  });
});


(function() {
  var SliceSlider = {
    /**
     * Settings Object
     */
    settings: {
      delta:              0,
      currentSlideIndex:  0,
      scrollThreshold:    40,
      slides:             document.querySelectorAll('.slide'),
      numSlides:          document.querySelectorAll('.slide').length,
      navPrev:            document.querySelector('.js-prev'),
      navNext:            document.querySelector('.js-next'),
    },
    
    /**
     * Init
     */
    init: function() {
      var s = this.settings;
      this.bindEvents();
    },
    
    /**
     * Bind our click, scroll, key events
     */
    bindEvents: function(){
      var s = this.settings;
      
      // Scrollwheel & trackpad
      s.slides.forEach(function(slide) {
        slide.addEventListener('wheel', SliceSlider.handleScroll);
      });
      // On click prev
      s.navPrev.addEventListener('click', SliceSlider.prevSlide);
      // On click next
      s.navNext.addEventListener('click', SliceSlider.nextSlide);
      // On Arrow keys
      document.addEventListener('keyup', function(e) {
        // Left or back arrows
        if ((e.which === 37) ||  (e.which === 38)){
          SliceSlider.prevSlide();
        }
        // Down or right
        if ((e.which === 39) ||  (e.which === 40)) {
          SliceSlider.nextSlide();
        }
      });
    },
    
    /** 
     * Interept scroll direction
     */
    handleScroll: function(e){
      var s = SliceSlider.settings;

      // Scrolling up
      if (e.deltaY < 0) { 
        s.delta--;
     
        if ( Math.abs(s.delta) >= s.scrollThreshold) {
          SliceSlider.prevSlide();
        }
      }
      // Scrolling Down
      else {
        s.delta++;
 
        if (s.delta >= s.scrollThreshold) {
          SliceSlider.nextSlide();
        }
      }
 
      // Prevent page from scrolling
      e.preventDefault();
    },

    /**
     * Show Slide
     */
    showSlide: function(){ 
      var s = this.settings;
      // reset
      s.delta = 0;
      // Bail if we're already sliding
      if (document.body.classList.contains('is-sliding')){
        return;
      }
      // Loop through our slides
      s.slides.forEach(function(slide, i) {

        // Toggle the is-active class to show slide
        slide.classList.toggle('is-active', (i === s.currentSlideIndex)); 
        slide.classList.toggle('is-prev', (i === s.currentSlideIndex - 1)); 
        slide.classList.toggle('is-next', (i === s.currentSlideIndex + 1)); 
        
        // Add and remove is-sliding class
        document.body.classList.add('is-sliding');

        setTimeout(function(){
            document.body.classList.remove('is-sliding');
        }, 1000);
      });
    },

    /**
     * Previous Slide
     */
    prevSlide: function(){
      var s = SliceSlider.settings;
      // If on first slide, loop to last
      if (s.currentSlideIndex <= 0) {
        s.currentSlideIndex = s.numSlides;
      }
      s.currentSlideIndex--;
      
      SliceSlider.showSlide();
    },

    /**
     * Next Slide
     */
    nextSlide: function(){
      var s = SliceSlider.settings;
      s.currentSlideIndex++;
   
      // If on last slide, loop to first
      if (s.currentSlideIndex >= s.numSlides) { 
        s.currentSlideIndex = 0;
      }
 
      SliceSlider.showSlide();
    },
  };
  SliceSlider.init();
})();
