// class BlogFeed {
//   private blogUrl: string;
//   constructor(blogUrl: string) {
//     this.blogUrl = blogUrl;

//     this.start();
//   }

//   private start(): void {
//     var blogOb = <any>this;
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//            blogOb.populateHTMLFromFeed(this.responseXML);
//         }
//     };
//     xhttp.open("GET", this.blogUrl, true);
//     xhttp.send();
//   }

//   private populateHTMLFromFeed(data): void {
//     let postTitle, postAuthor, html = '';
//     var posts = data.getElementsByTagName('item');
//     var dataContainer = document.getElementById('blogfeed-container');
//     for(let i = posts.length - 1; i>=0; i--) {
//       postTitle = posts[i].children.find((pos) => pos == 'title');
//       postAuthor = posts[i].children.title;
//       html += postTitle;
      
//     }
//     console.log(postTitle);
//     dataContainer.innerHTML = html;
//   }
// }

// export default BlogFeed;

/*
  GHOST RSS SUCKS!
*/
