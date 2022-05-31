export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0
    }
  }

  onStart(event) {
    event.preventDefault()
    this.dist.startX = event.clientX
    this.wrapper.addEventListener('mousemove', this.onMove)
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
    const finalPosition = this.updatePosition(event.clientX)
    this.moveSlide(finalPosition)
  }

  onMouseUp(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove)
    this.dist.finalPosition = this.dist.movePosition
  }

  addSlideEvent() {
    this.wrapper.addEventListener('mousedown', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onMouseUp)
    
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  init() {
    this.bindEvents()
    this.addSlideEvent()
    return this
  }
}
