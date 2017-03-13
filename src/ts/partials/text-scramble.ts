/*! Based on Text Scramble Effect by Justin Windle (https://codepen.io/soulwire/pen/mErPAK)*/
class TextScramble {
  private element: HTMLElement;
  private readonly chars: string = '!<>-_\\/[]{}—=+*^?#________';
  private refreshTime: number;
  private intervalId: number;
  private phrases: String[];
  private counter: number = 0;
  private queue;
  private frame;
  private frameRequest;
  private resolve;

  constructor(element: HTMLElement, refreshTime: number, phrases: String[]) {
    this.element = element;
    this.refreshTime = refreshTime;
    this.phrases = phrases;
    this.update = this.update.bind(this);
  }

  public start():void {
    this.refresh();
  }

  public stop():void {
    clearTimeout(this.intervalId);
  }

  private static timer() {
    var castedThis = <any>this;
    castedThis.setText(castedThis.phrases[castedThis.counter]).then(castedThis.refresh.bind(castedThis));
    castedThis.counter = (castedThis.counter + 1) % castedThis.phrases.length
  }

  private refresh() {
    this.intervalId = setTimeout(TextScramble.timer.bind(this), this.refreshTime);
  }

  private setText(newText) {
    const oldText = this.element.innerText
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

  private update() {
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

    this.element.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  
  randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

export default TextScramble;
