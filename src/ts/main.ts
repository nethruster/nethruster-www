import "../scss/styles.scss";
import TabHandler from "./partials/tab-handler";
import TextScramble from "./partials/text-scramble";
import CfHandler from "./partials/cf-handler";
import routeHandler from "./partials/route-handler";
import MdRipple from './partials/md-ripple';
// import BlogFeed from './partials/blog-feed';

function init() {
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
  var blogUrl = 'https://blog.gariasf.com/rss/';

  // Init
  
  var tabHandler = new TabHandler("header-tab", "tabs-slider");
  tabHandler.addListeners();
  routeHandler(tabHandler);
  new CfHandler(cfMessages);
  // new BlogFeed(blogUrl);
  new MdRipple();
  var scrambleContainer = <HTMLElement>document.querySelector('.scramble-text');
  var scramble = new TextScramble(scrambleContainer, 1000, scramblePhrases);
  scramble.start();
}

init();

