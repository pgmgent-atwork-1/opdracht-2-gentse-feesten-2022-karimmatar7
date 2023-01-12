const NEWS_URL = 'https://www.pgm.gent/data/gentsefeesten/events.json';

const $containerin = document.getElementById('containerin');

const fetchIndex = async () => {
    const response = await fetch(NEWS_URL, { method: 'GET', });
    const data = await response.json();

    updateIndex(data);
};

const renderIndex = (data) => {
    return data.slice(0, 8).map((dat) => {
        return `<li><a href="events/detail.html?day=${dat.day}&slug=${dat.slug}"
        <span class="hour">${dat.day_of_week.substring(0, 2)} ${dat.day} juli</span>
        <div class="images-events">
        <img src="${dat.image ? dat.image.full : ""}" alt="">
        </div>
        <div class="hovering">
        <h2 class="title">${dat.title}</h2>
        <div class="flexer-start">
        <p class="location">${dat.location}</p>
        <span class="start">${dat.start}u.</span>
        </div>
        </div></a></li>`
    }).join("");
}

const updateIndex = (data) => {
    $containerin.innerHTML = renderIndex(data);
}

fetchIndex();

const NEWS = 'https://www.pgm.gent/data/gentsefeesten/news.json';

const $newsSlice = document.getElementById('newsSlice');

const fetchNews = async () => {
    const response = await fetch(NEWS, { method: 'GET', });
    const data = await response.json();

    updateNewsList(data);
};

const renderNews = (data) => {
    return data.slice(0, 3).map((dat) => `
    <a class="news-index" href="">${dat.title}</a>`).join("");
}

const updateNewsList = (data) => {
    $newsSlice.innerHTML = renderNews(data);
}

fetchNews();