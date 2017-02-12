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
    e.preventDefault();
    var that = <any>this;
    that.setTab(<HTMLElement>e.target);
    return false;
  }
  setTab(tab: HTMLElement): void {
    // Remove the active class from the current active element
    this.cleanSelected(document.getElementsByClassName("active"), document.getElementsByClassName("title-active"), document.getElementsByClassName("section-active"));
    // Add the active class to the selected element 
    this.activeSelecteditems(tab.dataset["tab"]);
    // Change current location
    history.pushState({}, "", tab.dataset["tab"]);
    // Move slider to the correct position
    this.tabSlider.style.left = `${tab.dataset["pos"]}%`;
  }
  private cleanSelected(activeTabElements: HTMLCollectionOf<Element>, activeTitleElements: HTMLCollectionOf<Element>, activeContentElements: HTMLCollectionOf<Element>): void {
    if (activeTabElements[0] && activeTitleElements[0] && activeContentElements[0]) {
      activeTabElements[0].classList.toggle('active');
      activeTitleElements[0].classList.toggle('title-active');
      activeContentElements[0].classList.toggle('section-active');
    }
  }
  private activeSelecteditems(tab: string): void {
    document.getElementById(`${tab}-tab`).classList.toggle('active');
    document.getElementById(`${tab}-titles`).classList.toggle('title-active');
    document.getElementById(`${tab}`).classList.toggle('section-active');
  }

}

export default TabHandler;
