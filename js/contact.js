document.addEventListener("DOMContentLoaded", function () {
    const totalFrames = 14;
    const stepWidth = 100 / (totalFrames - 1);
    const speedFactor = 50; 
  
    var spriteAnimation = TweenMax.to(".eggman figure", 1, {
      backgroundPosition: `-${(totalFrames - 1) * stepWidth}% 0`,
      ease: SteppedEase.config(totalFrames - 1),
      repeat: -1
    });
  
    window.addEventListener("scroll", function () {
      var scrollY = window.scrollY;
      var frameIndex = (scrollY / speedFactor) % totalFrames;
      spriteAnimation.progress(frameIndex / totalFrames);
    });
  });