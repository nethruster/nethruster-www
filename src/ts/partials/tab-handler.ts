class TabHandler {
  private tabList: Array<HTMLElement>;
  private tabSlider: any;

  constructor(className: string, tabSlider: string) {
    var nodeList = document.getElementsByClassName(className);
    this.tabSlider = document.getElementById(tabSlider);
    this.tabList = new Array(nodeList.length - 1);
    for (let i = nodeList.length - 1; i >= 0; i--) {
      this.tabList[i] = <HTMLElement>nodeList[i];
    }
  }

  addListeners(): void {
    this.tabList.forEach(tab => {
      var listener = TabHandler.listener.bind(this);
      tab.addEventListener("click", listener);
    });
    
    document.getElementById('header-contact-button').addEventListener("click", TabHandler.listener.bind(this));
    document.getElementById('not-found-contact').addEventListener("click", TabHandler.listener.bind(this));
  }

  private static listener(e: Event): boolean {
    let el = <HTMLElement>e.currentTarget;
    (<any>this).setTab(el);
    return false;
  }

  setTab(tab): void {
    if(tab == undefined || !tab || tab === null) {
      // Not found 
      this.cleanSelected(document.getElementsByClassName("title-active"), document.getElementsByClassName("section-active"));
      this.activeSelecteditems('not-found');
      this.tabSlider.style.left = `-200%`;
      return;
    }

    if (tab.dataset["tab"] === document.getElementsByClassName("section-active")[0].id) {
      // We don't need to change tabs if we are already in place
      return;
    }

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
    if(!activeTitleElements[0]) {
      activeContentElements[0].classList.toggle('section-active');
      return;
    }
    if (activeTitleElements[0] && activeContentElements[0]) {
      activeTitleElements[0].classList.toggle('title-active');
      activeContentElements[0].classList.toggle('section-active');
    }
  }

  private activeSelecteditems(tab: string): void {
    let title = document.getElementById(`${tab}-titles`);
    let tabEl = document.getElementById(`${tab}`);
    if(title) {
      title.classList.toggle('title-active');
    }
    tabEl.classList.toggle('section-active');
  }
}

export default TabHandler;
