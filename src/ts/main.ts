import "../scss/styles.scss";
import TabHandler from "./partials/tab-handler";
import TextScramble from "./partials/text-scramble";
import handleRoute from "./partials/route-handler";

function init() {
  var handler = new TabHandler("header-tab", "tabs-slider");
  handleRoute(handler);
  handler.addListeners();
  var screableContainer = <HTMLElement>document.querySelector('.scramble-text');
  var scramblePhrases = ['We design,', 'we code,', 'we create.'];
  var scramble = new TextScramble(screableContainer, 1000, scramblePhrases);
  scramble.start();
}

init();


