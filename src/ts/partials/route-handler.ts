import TabHandler from './tab-handler';

function handleRoute(handler: TabHandler){
  let param = /[^/]*$/.exec(location.pathname)[0];

  if(param && param != null) {
    let tabEl = document.getElementById(`${param}-tab`);
    
    if(tabEl) {
      handler.setTab(tabEl);
    } else {
      console.log("The tab does not exist");
    }
  } else {
    // We are at root path
    handler.setTab(document.getElementById("home-tab"));
  }
}

export default handleRoute;
