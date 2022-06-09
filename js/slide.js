export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
    this.dist = { finalPosition: 0, startX: 0, movement: 0 }
    this.activeClass = 'active'
  }

  transition(active) {
    this.slide.style.transition = active ? 'transform .3s' : ''
  }

  onStart(event) {
    if (event.type === 'mousedown') {
      event.preventDefault()
      this.dist.startX = event.clientX
      this.wrapper.addEventListener('mousemove', this.onMove)
    } else {
      this.dist.startX = event.changedTouches[0].clientX
      this.wrapper.addEventListener('touchmove', this.onMove)
    }
    this.transition(false)
  }

  moveSlide(distX) {
    this.dist.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6
    return this.dist.finalPosition - this.dist.movement
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX
    const finalPosition = this.updatePosition(pointerPosition)
    this.moveSlide(finalPosition)
  }

  onMouseUp(event) {
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove'
    this.wrapper.removeEventListener(moveType, this.onMove)
    this.dist.finalPosition = this.dist.movePosition
    this.transition(true)
    this.changeSlideOnEnd()
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide()
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide()
    } else {
      this.changeSlide(this.index.active)
    }
  }

  addSlideEvent() {
    this.wrapper.addEventListener('mousedown', this.onStart)
    this.wrapper.addEventListener('touchstart', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onMouseUp)
    this.wrapper.addEventListener('touchend', this.onMouseUp)
  }

  // Slides config

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2
    return -(slide.offsetLeft - margin)
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element)
      return { position, element }
    })
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1
    this.index = {
      prev: index ? index - 1 : undefined, 
      active: index,
      next: index === last ? undefined : index + 1
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index]
    this.moveSlide(activeSlide.position)
    this.slideIndexNav(index)
    this.dist.finalPosition = activeSlide.position
    this.changeActiveClass()
  }

  changeActiveClass() {
    this.slideArray.forEach(item => item.element.classList.remove(this.activeClass))
    this.slideArray[this.index.active].element.classList.add(this.activeClass)
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev)
    }
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next)
    }
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfig()
      this.changeSlide(this.index.active)
    }, 300)
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  init() {
    this.bindEvents()
    this.addSlideEvent()
    this.slidesConfig()
    this.transition(true)
    this.addResizeEvent()
    return this
  }
}
