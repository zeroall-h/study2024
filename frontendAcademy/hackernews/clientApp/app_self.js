const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@id.json`;
const store = {
  currentPage: 1,
  feeds: [],
}

function getData(url){
  ajax.open('GET',url,false);
  ajax.send();
  return JSON.parse(ajax.response)
}

function makeFeeds(feeds){
  for(let i=0;i<feeds.length;i++){
    feeds[i].read = false;
  }
  return feeds;
}


function newsFeed(){
  let newsFeed = store.feeds;
  const newsList = [];
  let template = `
  <div>
    <div class="flex justify-between item-center p-6">
      <header>
        <h1 class="font-extrabold">Hacker News</h1>
      </header>
      <nav class="flex justify-end">
        <a href="#/page/{{__prev_page__}}" class="text-gray-500">Previous</a>
        <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">Next</a>
      </nav>
    </div>

    <main class="bg-gray-600">
      <div class="p-4 text-2xl text-gray-700">
        {{__news_feed__}}
      </div>
    </main>
  </div>
  `
  if(newsFeed.length === 0){
    newsFeed = store.feeds = makeFeeds(getData(NEWS_URL));
  }
  for(let i=(store.currentPage-1)*10;i<store.currentPage*10;i++){
    newsList.push(`
    <div class="${newsFeed[i].read ? 'bg-red-500' : 'bg-white'} p-6 mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
      <div class="flex justify-between">
        <a href="#/show/${newsFeed[i].id}" class="block">${newsFeed[i].title}</a>
        <p class="inline-flex align-center justify-center flex-none text-sm w-10 text-white bg-green-300 rounded-lg px-0 py-2 h-9 ml-4">${newsFeed[i].comments_count}</p>
      </div>
      <ul class="mt-3 flex gap-x-10 text-sm text-gray-500">
        <li><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</li>
        <li><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</li>
        <li><i class="fas fa-clock mr-1"></i>${newsFeed[i].time_ago}</li>
      </ul>
    </div>
    `);
  }
  template = template.replace('{{__news_feed__}}',newsList.join(''))
  template = template.replace('{{__prev_page__}}',store.currentPage > 1 ? store.currentPage - 1 : 1)
  template = template.replace('{{__next_page__}}',store.currentPage > newsFeed.length/10 - 1 ? newsFeed.length/10 : store.currentPage + 1)

  container.innerHTML = template;
}

function newsDetail() {
  const id = location.hash.substring(7);
  const newsContent = getData(CONTENT_URL.replace('@id',id));
  let template = `
    <div class="bg-gray-600 pb-3 overflow-hidden break-words"> 
      <div class="flex justify-between item-center p-6 bg-white">
        <header>
          <h1 class="font-extrabold">Hacker News</h1>
        </header>
        <nav class="flex justify-end">
          <a href="#/page/${store.currentPage}">목록으로</a>
        </nav>
      </div>
      
      <div class="h-full border rounded-xl bg-white m-6 p-4">
        <h2>${newsContent.title}</h2>
        <p class="text-gray-400 h-20">${newsContent.content}</p>
        {{__comments__}}
      </div>
    </div>

  `
  for(let i=0;i<store.feeds.length;i++){
    if(store.feeds[i].id === Number(id)){
      store.feeds[i].read = true;
      break;
    }
  }
  function makeComment(comments, called=0){
    const commentString = [];

    for(let i=0;i<comments.length;i++){
      commentString.push(`
        <div class="mt-4" style="padding-left:${called*40}px">
          <i class="fa fa-sort-up mr2 "></i>
          <strong>${comments[i].user}</strong>
          <em class="text-gray-700">${comments[i].time_ago}</em>
          <p class="text-gray-700">${comments[i].content}</p>
        </div>
        `)
      if(comments[i].comments.length > 0){
        commentString.push(makeComment(comments[i].comments, called + 1));
      }
    }
    return commentString.join('')
  }

  container.innerHTML = template.replace('{{__comments__}}',makeComment(newsContent.comments))
}

function router(){
  const routePath = location.hash;
  if(routePath == ''){
    newsFeed()
  }else if(routePath.indexOf('#/page/') >= 0){
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  }else{
    newsDetail();
  }
}

window.addEventListener('hashchange', router)

router();