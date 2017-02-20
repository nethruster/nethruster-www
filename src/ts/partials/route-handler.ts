import TabHandler from './tab-handler';

function routeHandler(handler: TabHandler){
  let param = /[^/]*$/.exec(location.pathname)[0]; /* Remove the slahes */

  if(param && param != null) {
    let tabEl = document.getElementById(`${param}-tab`); /* Select tab section */
    
    if(tabEl) {
      handler.setTab(tabEl);
    } else {
      /* TODO use a not found tab/element */
    }
  } else {
    /* In case no tab is specified, go home */
    handler.setTab(document.getElementById("home-tab"));
  }
}

export default routeHandler;
