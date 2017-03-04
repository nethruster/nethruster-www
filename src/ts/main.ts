import "../scss/styles.scss";
import TabHandler from "./partials/tab-handler";
import TextScramble from "./partials/text-scramble";
import RssReader from "./partials/rss-reader";
import CfHandler from "./partials/cf-handler";
import routeHandler from "./partials/route-handler";
import MdRipple from './partials/md-ripple';
import "./partials/parallax";
declare var Parallax: any;

function init() {
  try {
    if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/))){
      alert("Para obtener una experiencia completa le recomendamos que utilize otro navegador web tal como Google Chrome o Firefox");
    }
  } catch(err) {}

  // Vars
  var cfMessages = {
    '-1': '',
    '0': '\u2714&nbsp;This field is valid.',
    '101': 'So, you don\'t have a name?',
    '102': 'Your name contains ilegal characters.',
    '201': 'Your email should not be empty.',
    '202': 'Your email should contain \'@\' and end with a domain name. (max@somesite.ext)',
    '301': 'The title should not be empty.',
    '302': 'This title contains ilegal characters.',
    '401': 'Your message should not be empty.',
    '402': 'Your message contains invalid characters.',
    '500': 'There was an error sending your message, try again later.',
    '600': 'Invalid recaptcha.'
  };
  var scramblePhrases = ['We design,', 'we code,', 'we create.'];
  // Init
  var tabHandler = new TabHandler("header-tab", "tabs-slider");
  tabHandler.addListeners();
  routeHandler(tabHandler);
  new CfHandler(cfMessages);
  // var rssReader = new RssReader(blogUrl);
  new MdRipple();
  var scrambleContainer = <HTMLElement>document.querySelector('.scramble-text');
  var scramble = new TextScramble(scrambleContainer, 1500, scramblePhrases);
  new Parallax(document.getElementsByClassName('scene')[0]);
  scramble.start();
}

init();

