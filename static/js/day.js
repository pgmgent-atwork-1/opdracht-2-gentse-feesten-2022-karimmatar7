(() => {

    const $list = document.getElementById("information-day");
    const params = new URLSearchParams(location.search);
    const day = params.has('day') ? params.get('day') : '15';

    const fetchCat = async () => {
        let response = await fetch(
            "https://www.pgm.gent/data/gentsefeesten/categories.json"
        );
        return await response.json();
    };

    const fetchEvents = async () => {
        let response = await fetch(
            "https://www.pgm.gent/data/gentsefeesten/events_500.json"
        );
        return await response.json();
    };

    const fetchData = async () => {
        try {
            const categories = await fetchCat();
            const events = await fetchEvents();

            renderEvents(categories, events);
        } catch (error) {
        }
    };

    fetchData();

    const renderEvents = (categories, events) => {
        const $category = document.getElementById('category');
        $category.innerHTML = categories.map((rab) => {
            return `<li class="cat-list"><a href="#${rab}"><img src="../static/img/icons/category.svg" alt="">
        ${rab}</a></li>`
        }).join("")
        const html = categories
            .map((category) => {
                const filteredEvents = events.filter((event) => {
                    return event.day === day && event.category.includes(category);
                });

                return `
        <h2 class="title-cat" id="${category}">${category}</h2><a href="#category"><div class="relate-arrow-spot"></div>
        </a>
        <ul class="filtered">
          ${filteredEvents
                        .map((event) => {
                            return `
                <li><a href="detail.html?day=${event.day}&slug=${event.slug}"
                <span class="hour-cat">${event.day} juli</span>
                <div class="images-events">
                <img src="${event.image ? event.image.full : ""}" alt="">
                </div>
                <div class="hovering-cat">
                <h2 class="title">${event.title}</h2>
                <div class="flexer-start">
                <p class="location">${event.location}</p>
                <span class="start">${event.start}u.</span>
                </div>
                </div></a></li>
              `;
                        })
                        .join("")}
        </ul>
      `;
            })
            .join("");

        $list.innerHTML = html;
        const $linkDay = document.querySelector(`.link-day[data-type="${day}"]`);
        $linkDay.classList.add("link-day-active");
    };
})();