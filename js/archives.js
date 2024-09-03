document.addEventListener("DOMContentLoaded", function () {
    // Image Animation
    const items = document.querySelectorAll(".anime-list li");
    items.forEach((el) => {
      gsap.set(".hover-img", { xPercent: -50, yPercent: -50 });
      const image = el.querySelector(".hover-img");
      const innerImage = el.querySelector(".hover-img img");
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouse = {
        x: pos.x
      };
      const speed = 0.1;
      const xSet = gsap.quickSetter(image, "x", "px");
      
      window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
      });
  
      gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        xSet(pos.x);
      });
  
      var direction = "",
        oldx = 0,
        lastCursorX = null,
        lastCursorY = null,
        cursorThreshold = 150;
  
      function mouseMoveMethod(e) {
        if (e.pageX < oldx && e.clientX <= lastCursorX - cursorThreshold) {
          direction = "left";
          lastCursorX = e.clientX;
          innerImage.style.transform = "rotate(-15deg)";
        } else if (
          e.pageX > oldx &&
          e.clientX >= lastCursorX + cursorThreshold
        ) {
          direction = "right";
          lastCursorX = e.clientX;
          innerImage.style.transform = "rotate(15deg)";
        }
        oldx = e.pageX;
      }
  
      function resetImageTransform() {
        innerImage.style.transform = "translateX(0%) rotate(0deg)";
      }
  
      document.addEventListener("mousemove", mouseMoveMethod);
      document.addEventListener("mousemoveend", resetImageTransform);
  
      let timeout;
      document.addEventListener("mousemove", function (event) {
        if (timeout !== undefined) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
          const mouseMoveEndEvent = new Event("mousemoveend");
          event.target.dispatchEvent(mouseMoveEndEvent);
        }, 100);
      });
    });
  
    // Mouse Cursor Animation
    gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    const ball = document.querySelector(".ball");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.08;
  
    const xSet = gsap.quickSetter(ball, "x", "px");
    const ySet = gsap.quickSetter(ball, "y", "px");
  
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
  
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  
    // Text Scrambling Effect
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const list = document.querySelectorAll(".anime-list li");
  
    list.forEach((el) => {
      el.addEventListener("mouseenter", (event) => {
        const target_element = event.target.querySelector("h2");
        let iteration = 0;
        const interval = setInterval(() => {
          target_element.innerText = target_element.innerText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return target_element.dataset.value[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
  
          if (iteration >= target_element.dataset.value.length) {
            clearInterval(interval);
          }
          iteration += 1 / 3;
        }, 20);
      });
    });
  });
  