import "../scss/styles.scss";
import TabHandler from "./partials/tab-handler";
import TextScramble from "./partials/text-scramble";

function init() {
  var handler = new TabHandler("header-tab", "tabs-slider");
  handler.addListeners();
  var screableContainer = <HTMLElement>document.querySelector('.scramble-text');
  var screamblePhrases = ['We design,', 'we code,', 'we create.'];
  var screamble = new TextScramble(screableContainer, 1000, screamblePhrases);
  screamble.start();
}

window.addEventListener("load", init);


