(() => {
    const params = new URLSearchParams(window.location.search);
    const day = params.get('day');
    const slug = params.get('slug');

    const detail = 'https://www.pgm.gent/data/gentsefeesten/events.json';


    const fetchDetails = async () => {
        const response = await fetch(detail, { method: 'GET', });
        const data = await response.json();
        return data;
    };

    const renderDetails = async () => {
        const data = await fetchDetails();
        const dat = data.find((ev) => {
            return ev.slug === slug && ev.day === day;
        });
        const $details = document.getElementById('details');
        $details.innerHTML = `<div class="container-details">
    <div class="container-left">
    <a href="day.html?day=${dat.day}">overzicht ${dat.day_of_week} ${dat.day} juli</a>
    <h1>${dat.title}</h1>
    <div class="container-locate"><div class="locate"><img src="../static/img/icons/marker.svg">${dat.location}</div> ${dat.start}u. ${dat.end}u.</div>
    <div class="organise"><p>Organisator:</p> ${dat.organizer}</div>
    <div class="category-cl"><p>Categorieën:</p> ${dat.category}</div>
    </div>
    <div class="container-right-detail">
    <img src="${dat.image ? dat.image.full : ""}">
    <ul class="websites-detail">
                    <li><a href="https://www.twitter.com"><img src="../static/img/icons/twitter.svg"
                                alt=""></a></li>
                                <li><a href="https://www.facebook.com"><img src="../static/img/icons/facebook.svg"
                                alt=""></a></li>
                    <li><a href="https://www.pinterest.com"><img
                                src="../static/img/icons/pinterest.svg" alt=""></a></li>
                </ul>
    </div>
    </div>
    <div class="map-container">
    <div class="map-left">
    <div class="container-locate-map"><div class="locate-map"><img src="../static/img/icons/marker.svg">${dat.location}</div>
    </div>
    <a class="link-google" href="https://goo.gl/maps/9waQKJ9u5bHzaftv9">Open in Google maps</a>
    <a class="download" href="https://www.pgm.gent/atwork1-gentse-feesten-2022/sites/default/files/feestplan.pdf">
    <img src="../static/img/icons/map.svg">DOWNLOAD FEESTPLAN</a>
    </div>
    <div class="map-right">
    <img src="../static/img/images/kaart.png"></div>
    </div>
    <div class="extra-location">
    <h1>Nog Te Beleven Op Deze Locatie
    </h1>
    </div>`;

        const fetchDetailsloc = async () => {
            const response = await fetch(detail, { method: 'GET', });
            const data = await response.json();
            return data;
        };

        const renderLoc = async () => {
            const data = await fetchDetailsloc();
            const dar = data.filter((even) => {
                return even.day === dat.day && even.location === dat.location;
            });
            const $locationDet = document.getElementById('details-location');
            $locationDet.innerHTML = dar.map((da) => {
                return `<li><a href="detail.html?day=${da.day}&slug=${da.slug}"
            <span class="hour-cat">${da.day} juli</span>
            <div class="images-events">
            <img src="${da.image ? da.image.full : ""}" alt="">
            </div>
            <div class="hovering-cat">
            <h2 class="title">${da.title}</h2>
            <div class="flexer-start">
            <p class="location">${da.location}</p>
            <span class="start">${da.start}u.</span>
            </div>
            </div></a></li>
            `;
            }).join("")
        }

        renderLoc();

        const fetchOrg = async () => {
            const response = await fetch(detail, { method: 'GET', });
            const data = await response.json();
            return data;
        };

        const renderOrg = async () => {
            const data = await fetchOrg();
            const dav = data.filter((eve) => {
                return eve.organizer === dat.organizer;
            });
            const $OrgDet = document.getElementById('details-organizer');
            $OrgDet.innerHTML = dav.map((da) => {
                return `<li class="list-list">
            <a href="detail.html?day=${da.day}&slug=${da.slug}" class="link-list">
            <div class="container-date">
            <span class="hour-list">${da.day_of_week.substring(0, 2)} ${da.day} juli</span>
            <span class="start-list">${da.start}u.</span></div>
            <div class="hovering-two-list">
                <h2 class="title-list">${da.title}</h2>
                <div class="flexer-start-list">
                <p class="location-list">${da.location}</p>
                </div>
            </div>
            </a>
        </li>
            `;
            }).join("")
        }
        const $linkDay = document.querySelector(`.link-day[data-type="${day}"]`);
        $linkDay.classList.add("link-day-active");
        renderOrg();
    }

    renderDetails();

})();