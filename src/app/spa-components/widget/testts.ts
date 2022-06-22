//type interfacesAdapter<T, C> {  new (arg0: { [key in keyof T]: T[key] }) => C};

var responseData = {
  title: 'kuhgygf',
  description: 'jbkvjcf',
  urlToImage: 'lbvghcfd',
  content: 'jhgfd',
  author: 'lkjhg',
  url: 'pkjhgf'
}

type responseData = {
  title: string,
  description: string,
  urlToImage: string,
  content: string,
  author: string,
  url: string
}

// type News {
//       title: string;
//       description: string;
//       imgUrl: string;
//       article: string;
//       author: string;
//       sourceUrl: string;
// }

var contentAdapter = class news {
    title: string;
    description: string;
    imgUrl: string;
    article: string;
    author: string;
    sourceUrl: string;
    constructor(atrr: responseData ) {
      this.title = atrr.title;
      this.description = atrr.description;
      this.imgUrl = atrr.urlToImage;
      this.article = atrr.content;
      this.author = atrr.author;
      this.sourceUrl = atrr.url;
    }
  }
type data = ReturnType<typeof adaptContent>

function adaptContent<D, C>(resData: D, contAdapter: new (arg0: { [key in keyof D]: D[key] }) => C): C {
  return  new contAdapter(resData);
  
}
let data = adaptContent(responseData, contentAdapter)

console.log(data.sourceUrl)