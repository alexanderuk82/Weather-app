const formulario = document.querySelector('.weather__search');
const city = document.querySelector('.weather__search--input');
const leftSide = document.querySelector('.weather__temperature');
let newCountry;
let newCity;

start();

function start() {
  formulario.addEventListener('submit', citySearch);
}

// function to search cities

function citySearch(e) {
  e.preventDefault();
  if (city.value === '') {
    printMessage('Error, the field search is required.');
  } else {
    newCity = city.value;
    weatherApi();
    formulario.reset();
  }
}

//function read API response

function weatherApi() {
  const keyID = 'bf5d406b7fbe90761dc05f9369e465d0';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${keyID}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => weatherDataAPI(data));
}

// Data Waether fromAPI

function weatherDataAPI(content) {
  cleanHtml();

  // general Data
  const { name, cod, timezone, dt } = content;

  //Data from MAIN information
  const { temp } = content.main;

  const celcius = parseInt(temp - 273.15);

  //DAta to get country and sunset
  const { country, sunrise, sunset } = content.sys;

  const myDate = new Date();

  const optionDay = {
    weekday: 'long',
    day: 'numeric',
  };
  const optionYear = { year: 'numeric' };
  const finalDay = new Intl.DateTimeFormat('en-UK', optionDay).format(myDate);
  const finalYear = new Intl.DateTimeFormat('en-UK', optionYear).format(myDate);

  newCountry = country;
  //   newsApi();

  //Data to get the winds details
  const { speed } = content.wind;

  //Data to get main weather condition icon
  const { main, description } = content.weather[0];

  //Layout and structure fields

  const location = document.createElement('div');

  location.innerHTML = `

       <div class="weather__temperature__location">
           <img src="img/pin.svg" alt="location" />
           <p>${newCity}, ${country} </p>
       </div>      
      
      `;

  const result = document.createElement('div');

  result.innerHTML = `
        
         <div class="weather__temperature__result">
              <img src="img/cloudly-icon.svg" alt="" />
              <h1 class="h1">${celcius} <sup>&#8728;c</sup></h1>
              <p>
               ${finalDay},

                <span> ${finalYear} </span>
              </p>
        </div>

  `;

  //   Appenchild for data

  leftSide.appendChild(location);
  leftSide.appendChild(result);
}

//function read API from news

function newsApi() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fa8acf2c65mshb42938ea644383bp1216f8jsn5311ae779480',
      'X-RapidAPI-Host': 'google-news1.p.rapidapi.com',
    },
  };

  fetch(
    `https://google-news1.p.rapidapi.com/search?q=${city.value}&country=${newCountry}&lang=en-US&when=30d&limit=3`,
    options
  )
    .then((response) => response.json())
    .then((data) => printNews(data));
}

//Funcion to print the news from API

function printNews(data) {
  console.log(data);

  const articles = data.articles;
  const cardContainer = document.querySelector('.slide-container');

  //   articles.forEach((item) => {
  //     const { title } = item;
  //     const card = document.createElement('div');

  //     card.innerHTML = `
  //       <div class="swiper-slide card">
  //             <div class="card__top">
  //                       <div class="card__top__resource">
  //                         <p>BBC news</p>
  //                       </div>

  //                       <div class="card__top__date">
  //                         <img src="img/calendar.svg" alt="cdate-news" />
  //                         <span>25/08/2022</span>
  //                       </div>
  //              </div>

  //              <div class="card__content">
  //              <div class="card__content--text">
  //                <h5 class="h5">
  //                 ${title}
  //                </h5>

  //                <p>
  //                  As The Tokyo Olympics Get Underway And Rich Countries
  //                  Drop Restrictions Lorem ipsum dolor sit amet.
  //                </p>
  //              </div>

  //              <div class="card__content--img">
  //                <img src="img/img.svg" alt="news-image" />
  //              </div>
  //            </div>

  //              <div class="card__link">
  //                       <a href="https://www.google.co.uk" target="_blank"
  //                         >read more</a
  //                       >
  //              </div>

  //         </div>
  //  `;
  //     cardContainer.appendChild(card);
  //   });
}

//Clean HTML function for weather the

function cleanHtml() {
  while (leftSide.firstChild) {
    leftSide.removeChild(leftSide.firstChild);
  }
}

//Erro fucntion message
function printMessage(error) {
  const weatherContainer = document.querySelector('.weather__container');

  const errorAlerta = document.querySelector('.errorField');
  if (!errorAlerta) {
    const message = document.createElement('p');
    message.classList.add('error', 'errorField');
    message.textContent = error;

    weatherContainer.insertBefore(message, formulario);

    setTimeout(() => {
      weatherContainer.removeChild(message);
    }, 2700);
  }
}
