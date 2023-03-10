setInterval(showTime, 1000)
        
function showTime() {
    const time = new Date()
    document.getElementById("clock").innerHTML = time.toLocaleTimeString()

    // document.getElementById("clock").innerHTML = time.toLocaleDateString()
    // document.getElementById("clock").innerHTML = time.getFullYear() + " " + time.toLocaleTimeString()
}

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


// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
  'hello stranger,',
  'I am Thales Lindberg',
  'can I help you with something?',
  'feel free to reach me out and...', 
  'we can turn your vision into a digital masterpiece, together!'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1500)
  })
  counter = (counter + 1) % phrases.length
}

next()