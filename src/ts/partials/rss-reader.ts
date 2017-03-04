class RssReader {
  private url: string;
  private event;
  public feed;

  constructor(url: string) {
    this.url = url;
    this.event = new Event("dataavailable");
  }

  private connect(callback): void {
    var self = this;
    var client = new XMLHttpRequest();

    client.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           self.proccessXml(this.responseXML, callback);
        }
    };
    client.open("GET", this.url, true);
    client.send();
  }
  private proccessXml(feed, callback) {
    // var parser = new DOMParser();
    // var feed = parser.parseFromString(rawData, "text/xml");
    var feedItems = feed.getElementsByTagName("item");
    var posts = new Array();
    for(var i = 0; i < feedItems.length; i++) {
      posts[i] = new Array();
      for( var n = 0; n < feedItems[i].childNodes.length; n++) {
        if(feedItems[i].childNodes[n].textContent != '' ) {
          posts[i][feedItems[i].childNodes[n].nodeName.toLowerCase()] = feedItems[i].childNodes[n].textContent;
        } else {
          posts[i][feedItems[i].childNodes[n].nodeName.toLowerCase()] = feedItems[i].childNodes[n];
        }
      }
    }
    this.feed = posts;
    callback(posts);
  }
  public getFeedAsync(callback) {
    this.connect(callback);
  }
}

export default RssReader;
