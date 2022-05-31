export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
  }

  onStart(event) {
    event.preventDefault()
    this.wrapper.addEventListener('mousemove', this.onMove)
  }

  onMove(event) {
  }

  onMouseUp(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove)
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
