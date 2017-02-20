/* Adapted from this awesome jQuery implementation: http://webbbr.com/2015/09/22/ripple-effect-svg-icon-buttons/ 
* Licensed under 'Creative Common Attribution 4.0 International License (CC-BY 4.0)'; https://creativecommons.org/licenses/by/4.0/ 
*/

class MdRipple {
  private rippleContainers: NodeList;
  
  constructor() {
    this.rippleContainers = document.getElementsByClassName('ripple-container');

    for(var i = this.rippleContainers.length - 1; i >= 0; i--) {
      this.rippleContainers[i].addEventListener('click', this.manageRipple.bind(this));
    }
  }

  private manageRipple(e): void {
    let el = e.target;
    if(el.tagName === "SPAN" || el.tagName === "svg" || el.tagName === "P") {
       this.appendRipple(el.parentElement, e);
    } else if(el.tagName === "path"){
       this.appendRipple(el.parentElement.parentElement, e);
    } else {
       this.appendRipple(el, e);
    }
  }

  private appendRipple(element: HTMLElement, e: MouseEvent): void {
    let tempRippleEl = document.createElement('span');
    tempRippleEl.classList.add('ripple');
    let children = element.children;
    /* Add a ripple element if container doesn't have one */
    for(let i = children.length - 1; i>=0; i--){
      if(children[i].classList.contains('ripple')) {
        element.removeChild(children[i]);
      } else {
        element.appendChild(tempRippleEl);
      }
    }
    /* If there is a ripple element, start everything */
    for(let i = children.length - 1; i>=0; i--){
      if(children[i].classList.contains('ripple')){
        children[i].classList.remove('animate');
        this.rippleInit(<HTMLElement>children[i], element, e);
      }
    }

    /* Note that there are two fors and they have to be separated, wee need to check if the children have the ripple element, and we need to check if the element exists, and we must go get to the end of the list of children to check each one of them, therefore, we can't execute anything in between
    */
  }

  private rippleInit(rippleEl: HTMLElement, parent: HTMLElement, e: MouseEvent) {
    let d, x, y;
    if(rippleEl.offsetHeight != parent.offsetHeight && rippleEl.offsetWidth != parent.offsetWidth){
      d = Math.max(parent.offsetHeight, parent.offsetWidth);
      rippleEl.style.height = d.toString() + 'px';
      rippleEl.style.width = d.toString() + 'px';
    }

    x = e.pageX - this.getOffsetLeft(parent) - rippleEl.offsetWidth / 2;
	  y = e.pageY - this.getOffsetTop(parent) - rippleEl.offsetHeight / 2;
    rippleEl.style.top = y + 'px';
    rippleEl.style.left = x + 'px';
    rippleEl.classList.add('animate');
  }

  /* Helpers (to get the offset relative to the document and not the nearest relative parent) */
  private getOffsetLeft(elem) {
    var offsetLeft = 0;
    do {
      if (!isNaN(elem.offsetLeft)) {
          offsetLeft += elem.offsetLeft;
      }
    } while(elem = elem.offsetParent);
    return offsetLeft;
  }

  private getOffsetTop(elem) {
    var offsetTop = 0;
    do {
      if ( !isNaN(elem.offsetTop)) {
          offsetTop += elem.offsetTop;
      }
    } while(elem = elem.offsetParent);
    return offsetTop;
  }
}

export default MdRipple;
