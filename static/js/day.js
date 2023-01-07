const hamburger = document.querySelector('.hamburger');
const displayer = document.querySelector('.displayer');
const closer = document.querySelector('.closer');

hamburger.addEventListener('click', () => {
    if (displayer.style.display === 'none') {
        displayer.style.display = 'block';
    } else {
        displayer.style.display = 'none';
    }
});

closer.addEventListener('click', () => {
    if (displayer.style.display === 'block') {
        displayer.style.display = 'none';
    } else {
        displayer.style.display = 'block';
    }
});

async function getData() {
    const params = new URLSearchParams(location.search);
    const day = params.get('day');

    const response = await fetch('https://www.pgm.gent/data/gentsefeesten/events.json');
    const data = await response.json();

    const filteredData = data.filter((event) => event.day === day);

    const div = document.querySelector('#information-day');
    div.innerHTML = '';
    filteredData.forEach((event) => {
        div.innerHTML += `<a href=""
        <span class="hour">${event.day_of_week.substring(0, 2)} ${event.day} juli</span>
        <div class="images-events">
        <img src="${event.image ? event.image.full : ""}" alt="">
        </div>
        <div class="hovering">
        <h2 class="title">${event.title}</h2>
        <div class="flexer-start">
        <p class="location">${event.location}</p>
        <span class="start">${event.start}u.</span>
        </div>
        </div></a>`;
    });
}

getData();

const locationButton = document.querySelector('#show-location');
const categoryButton = document.querySelector('#show-category');

locationButton.addEventListener('click', () => {
    const locations = document.querySelectorAll('.location');
    locations.forEach((location) => {
        location.classList.toggle('hidden');
    });
});

categoryButton.addEventListener('click', () => {
    const categories = document.querySelectorAll('.category');
    categories.forEach((category) => {
        category.classList.toggle('hidden');
    });
});




