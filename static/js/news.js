(() => {
    const NEWS_URL = 'https://www.pgm.gent/data/gentsefeesten/news.json';

    const $container = document.getElementById('container');

    const fetchNews = async () => {
        const response = await fetch(NEWS_URL, { method: 'GET', });
        const data = await response.json();

        updateNewsList(data);
    };

    const renderNews = (data) => {
        return data.map((dat) => `
    <ul class="container-news">
    <li><a href=""><h1 class="title-black">${dat.title}</h1>
    <div class="images-news"><img src="https://www.pgm.gent/data/gentsefeesten/${dat.picture.medium}" alt=""></div></a></li>
    </ul>`).join("");
    }

    const updateNewsList = (data) => {
        $container.innerHTML = renderNews(data);
    }

    fetchNews();
})();