const formulario = document.querySelector('.weather__search');
const city = document.querySelector('.weather__search--input');
const leftSide = document.querySelector('.weather__temperature');
const weatherContainer = document.querySelector('.weather__container');
const slider = document.querySelector('#news');
const highlight = document.querySelector('.details__highlights');

const lottiesContainer = document.querySelectorAll('.lotties');

let newCountry;
let newCity;

weatherContainer.classList.add('heightFull');
start();

function start() {
  formulario.addEventListener('submit', citySearch);
  lotties();
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
    weatherContainer.classList.remove('heightFull');

    lottiesContainer.forEach((lotties) => {
      lotties.classList.add('hidden');
    });
  }
}

//function read API response

function weatherApi() {
  const keyID = 'D76WGUH5XLAGDRWGZDRV46A6L';
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${newCity}?key=${keyID}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => weatherDataAPI(data))
    .catch((error) =>
      printMessage('😒 Not result with your searching. Please try again.')
    );
}

// Data Waether fromAPI

function weatherDataAPI(content) {
  cleanHtml(leftSide);
  console.log(content);
  const { address, timezone, description, resolvedAddress } = content;

  newCity = resolvedAddress;
  newsApi();

  const {
    datetime,
    temp,
    icon,
    conditions,
    humidity,
    feelslike,
    pressure,
    sunrise,
    sunset,
    windspeed,
  } = content.currentConditions;

  const newPressure = parseInt(pressure);

  const { tempmax, tempmin } = content.days[0];

  const max = celcius(tempmax);
  const min = celcius(tempmin);

  const tempCelcius = celcius(temp);

  const myDate = new Date();

  const optionDay = {
    weekday: 'long',
    day: 'numeric',
    timeZone: timezone,
  };
  const newDay = new Intl.DateTimeFormat('en-UK', optionDay).format(myDate);
  const optionTime = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: timezone,
  };
  const newTime = new Intl.DateTimeFormat('en-UK', optionTime).format(myDate);

  //Layout and structure fields left side

  const location = document.createElement('div');

  location.innerHTML = `

       <div class="weather__temperature__location">
           <img src="img/pin.svg" alt="location" />
           <p>${resolvedAddress} </p>
       </div>      
      
      `;

  const result = document.createElement('div');

  result.innerHTML = `
        
         <div class="weather__temperature__result">
              <img src="img/icon-weather/${icon}.svg" alt="" />
              <h1 class="h1">${tempCelcius} <sup>&#8728;c</sup></h1>
              <p>
               ${newDay},

                <span> ${newTime} </span>
              </p>
        </div>

        <div class="weather__approx">

            <div class="weather__approx__condition">
            <img src="img/icon-weather/${icon}.svg" alt="cloudly" />
            <p>${icon}</p>
          </div>
          <div class="weather__approx__condition">
          <img src="img/icon-weather/${icon}.svg" alt="conditions" />
          <p>Conditions: <span>${conditions}</span></p>
          </div> 

        </div>

        <div class="weather__maxMin">
            <div class="weather__maxMin--value">
            <p> temperature max:

            <img src="img/bx-up-arrow-circle.svg" alt="" />
           </p>
 
         <span> ${max} <img src="img/celsius.svg" alt="celcius" /> </span>
            </div>
            <div class="weather__maxMin--value">
            <p> temperature min:

            <img src="img/bx-up-arrow-circle-2.svg" alt="" />
           </p>
 
         <span> ${min} <img src="img/celsius.svg" alt="celcius" /> </span>
            </div>
          </div>

  `;

  leftSide.appendChild(location);
  leftSide.appendChild(result);

  higlights(humidity, feelslike, newPressure, sunrise, sunset, windspeed);
}

// Function Highlight weather

function higlights(humidity, feelslike, pressure, sunrise, sunset, windspeed) {
  cleanHtml(highlight);
  const theFeelsLike = celcius(feelslike);

  const highlightContainer = document.createElement('div');

  highlightContainer.classList.add('details__highlights__container');

  highlightContainer.innerHTML = `
  
  <!-- Wind speed -->
  <div class="details__highlights--item">
    <p>wind speed</p>
    <h2 class="h2">${windspeed} <sup>km/h</sup></h2>

    <img src="img/wind-speed-icon.svg" alt="wind" />
  </div>
  <!-- Suunrise /sunset -->
  <div class="details__highlights--item">
    <p>sunrise / sunset</p>
    <div class="time">
      <div class="time--times">
        <img src="img/sunrise-icon.svg" alt="sunrise" />
        <p>${sunrise}</p>
      </div>
      <div class="time--times">
        <img src="img/sunset-icon.svg" alt="sunrise" />
        <p>${sunset}</p>
      </div>
    </div>
  </div>

  <!-- Humidity -->

  <div class="details__highlights--item">
    <p>humidity</p>
    <h2 class="h2">${humidity} %</h2>

    <img src="img/humidity-icon.svg" alt="humidity" />
  </div>

  <!-- feel like -->

  <div class="details__highlights--item">
    <p>Feels Like</p>
    <h2 class="h2">
      ${theFeelsLike}
      <sup>
        <img src="img/celcius-black-icon.svg" width="38" alt="" />
      </sup>
    </h2>
  </div>

  <!-- pressure -->
  <div class="details__highlights--item">
    <p>Pressure</p>
    <h2 class="h2">${pressure} <sup>hpa</sup></h2>

    <img src="img/thermometer.svg" alt="wind" />
  </div> 
  
  
  `;
  highlight.appendChild(highlightContainer);
}

//function read API from news

function newsApi() {
  cleanHtml(slider);
  const URLnews = `https://api.newscatcherapi.com/v2/search?q='${newCity}&page_size=3`;

  fetch(URLnews, {
    headers: {
      'x-api-key': 'BLjlJqvhhcEoo-mahUkdydo-eY2309ZV7xVA6sE3BhY',
    },
  })
    .then((response) => response.json())
    .then((data) => printNews(data));
}

//Funcion to print the news from API

function printNews(data) {
  console.log(data);

  const articles = data.articles;

  articles.forEach((item) => {
    const { link, title, summary, published_date, topic, media } = item;
    const news = document.createElement('div');
    news.classList.add('swiper-slide', 'card');
    news.innerHTML = `
        
    <div class="card__top">
    <div class="card__top__resource">
      <p>${topic}</p>
    </div>

    <div class="card__top__date">
      <img src="img/calendar.svg" alt="cdate-news" />
      <span>${published_date}</span>
    </div>
  </div>

  <div class="card__content">
    <div class="card__content--text">
      <h5 class="h5">
        ${title}
      </h5>

      <p>
        ${summary}
      </p>
    </div>

    <div class="card__content--img">
      <img src="${media}" alt="image-not-found" />
    </div>
  </div>

  <div class="card__link">
    <a href="${link}" target="_blank"
      >read more</a
    >
  </div>



   `;
    slider.appendChild(news);
  });
}

//Clean HTML function for weather the

function cleanHtml(side) {
  while (side.firstChild) {
    side.removeChild(side.firstChild);
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

//Function lottiesContainer

function lotties() {
  lottiesContainer.forEach((lotties) => {
    const lottie = bodymovin.loadAnimation({
      container: lotties,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets10.lottiefiles.com/private_files/lf30_fn9xcfqg.json',
    });
  });
}

//Function to convert F to celcius and

function celcius(celcius) {
  return parseInt(((celcius - 32) * 5) / 9);
}
