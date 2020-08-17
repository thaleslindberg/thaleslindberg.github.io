const modal = document.createElement('div');
modal.id = 'modal'
document.body.appendChild(modal)

const images = document.querySelectorAll('img');

images.forEach(image => {
  image.addEventListener('click', e => {
    modal.classList.add('active')
    const img = document.createElement('img');
    img.src = image.src

    while (modal.firstChild) {
      modal.removeChild(modal.firstChild)
    }
    modal.appendChild(img)
  })
})

modal.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  modal.classList.remove('active');
})