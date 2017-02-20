import "../scss/styles.scss";
import TabHandler from "./partials/tab-handler";
import TextScramble from "./partials/text-scramble";
import CfHandler from "./partials/cf-handler";
import routeHandler from "./partials/route-handler";
import MdRipple from './partials/md-ripple';

function init() {
  var tabHandler = new TabHandler("header-tab", "tabs-slider");
  var rippleInit = new MdRipple();
  var cfHandler = new CfHandler();
  var screableContainer = <HTMLElement>document.querySelector('.scramble-text');
  var scramblePhrases = ['We design,', 'we code,', 'we create.'];
  var scramble = new TextScramble(screableContainer, 1000, scramblePhrases);
  tabHandler.addListeners();
  routeHandler(tabHandler);
  scramble.start();
}

init();


