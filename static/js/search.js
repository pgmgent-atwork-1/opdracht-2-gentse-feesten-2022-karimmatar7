document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const searchInput = document.getElementById('search');
    const countElement = document.getElementById('count');
    let filteredEvents;
    let results;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const query = searchInput.value;
        history.pushState({}, '', `?search=${query}`);
        fetch('https://www.pgm.gent/data/gentsefeesten/events.json?search=' + query)
            .then(response => response.json())
            .then(data => {
                filteredEvents = data.filter(event => event.title.toLowerCase().includes(query.toLowerCase()));
                countElement.style.display = 'block';
                countElement.innerHTML = `<strong>${filteredEvents.length} resultaten</strong> voor "${query}"`;
                results = '<ul class="grid-list">';
                filteredEvents.forEach(event => {
                    results += `
                <li>
                  <a href="events/detail.html?day=${event.day}&slug=${event.slug}">
                    <span class="hour">${event.day_of_week.substring(0, 2)} ${event.day} juli</span>
                    <div class="images-events">
                      <img src="${event.image ? event.image.full : ""}" alt="">
                    </div>
                    <div class="hovering-two">
                      <h2 class="title">${event.title}</h2>
                      <div class="flexer-start">
                        <p class="location">${event.location}</p>
                        <span class="start">${event.start}u.</span>
                      </div>
                    </div>
                  </a>
                </li>
              `;
                });
                results += '</ul>';
                updateResults();
                const rasterDiv = document.querySelector('.raster');
                rasterDiv.classList.add('active');
            });
    });



    document.querySelector('.raster').addEventListener('click', function () {
        this.classList.add('active');
        document.querySelector('.list').classList.remove('active');
        results = '<ul class="grid-list">';
        filteredEvents.forEach(event => {
            results += `
              <li>
                  <a href="events/detail.html?day=${event.day}&slug=${event.slug}">
                  <span class="hour">${event.day_of_week.substring(0, 2)} ${event.day} juli</span>
                  <div class="images-events">
                      <img src="${event.image ? event.image.full : ""}" alt="">
                  </div>
                  <div class="hovering-two">
                      <h2 class="title">${event.title}</h2>
                      <div class="flexer-start">
                      <p class="location">${event.location}</p>
                      <span class="start">${event.start}u.</span>
                      </div>
                  </div>
                  </a>
              </li>
              `;
        });
        results += '</ul>';
        updateResults();
    });

    document.querySelector('.list').addEventListener('click', function () {
        this.classList.add('active');
        document.querySelector('.raster').classList.remove('active');
        results = '<ul class="list-sort">';
        filteredEvents.forEach(event => {
            results += `
                        <li class="list-list">
                            <a href="events/detail.html?day=${event.day}&slug=${event.slug}" class="link-list">
                            <div class="container-date">
                            <span class="hour-list">${event.day_of_week.substring(0, 2)} ${event.day} juli</span>
                            <span class="start-list">${event.start}u.</span></div>
                            <div class="hovering-two-list">
                                <h2 class="title-list">${event.title}</h2>
                                <div class="flexer-start-list">
                                <p class="location-list">${event.location}</p>
                                </div>
                            </div>
                            </a>
                        </li>
                        `;
        });
        results += '</ul>';
        updateResults();
    });

    function updateResults() {
        document.getElementById('results').innerHTML = results;
    }
});