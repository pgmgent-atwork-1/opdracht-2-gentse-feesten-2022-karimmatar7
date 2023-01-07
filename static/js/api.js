
const newsUrl = 'https://www.pgm.gent/data/gentsefeesten/news.json';

const fetchNewsApi = async () => {
    const response = await fetch(newsUrl, { method: 'GET', });
    const data = await response.json();
    return data;
};