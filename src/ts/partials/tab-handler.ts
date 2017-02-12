class TabHandler {
  private tabList: Array<HTMLElement>;
  private tabSlider: HTMLElement;

  constructor(className: string, tabSlider: string) {
    var nodeList = document.getElementsByClassName(className);
    this.tabSlider = document.getElementById(tabSlider);
    this.tabList = new Array(nodeList.length - 1);
    for (var i = nodeList.length - 1; i >= 0; i--) {
      this.tabList[i] = <HTMLElement>nodeList[i];
    }
  }

  addListeners(): void {
    this.tabList.forEach(tab => {
      var listener = TabHandler.listener.bind(this);
      tab.addEventListener("click", listener);
    });
  }

  private static listener(e: Event): boolean {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    var that = <any>this;
    let el = e.target as HTMLElement;
    if(el.tagName === "SPAN" || el.tagName === "svg") {
      that.setTab(el.parentElement);
    } else if(el.tagName === "path"){
      that.setTab(el.parentElement.parentElement);
    } else {
      that.setTab(el);
    }
    return false;
  }

  setTab(tab: HTMLElement): void {
    // Remove the active class from the current active element
    this.cleanSelected(document.getElementsByClassName("title-active"), document.getElementsByClassName("section-active"));
    // Add the active class to the selected element 
    this.activeSelecteditems(tab.dataset["tab"]);
    // Change current location
    history.pushState({}, "", tab.dataset["tab"]);
    // Move slider to the correct position
    this.tabSlider.style.left = `${tab.dataset["pos"]}%`;
  }

  private cleanSelected(activeTitleElements: HTMLCollectionOf<Element>, activeContentElements: HTMLCollectionOf<Element>): void {
    if (activeTitleElements[0] && activeContentElements[0]) {
      activeTitleElements[0].classList.toggle('title-active');
      activeContentElements[0].classList.toggle('section-active');
    }
  }

  private activeSelecteditems(tab: string): void {
    document.getElementById(`${tab}-titles`).classList.toggle('title-active');
    document.getElementById(`${tab}`).classList.toggle('section-active');
  }

}

export default TabHandler;
