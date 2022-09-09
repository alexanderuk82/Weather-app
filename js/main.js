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
  const keyID = 'D76WGUH5XLAGDRWGZDRV46A6L';
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${newCity}?key=${keyID}`;
  
  fetch(URL)
  .then((response) => response.json())
  .then((data) => weatherDataAPI(data));
}

// Data Waether fromAPI

function weatherDataAPI(content) {
  cleanHtml();
  // newsApi();
  console.log(content);
  const { address, timezone, description, resolvedAddress } = content;

  newCity = resolvedAddress;

  const { datetime, temp, icon, conditions } = content.currentConditions;

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

  // newCountry = country;
  //   newsApi();

  //Layout and structure fields

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

  `;

  const weatherApprox = document.querySelector('.weather__approx');

  const condition1 = document.createElement('div');
  condition1.classList.add('weather__approx__condition');
  condition1.innerHTML = `
  
  <img src="img/icon-weather/${icon}.svg" alt="cloudly" />
  <p>${icon}</p>
  
  `;
  const condition2 = document.createElement('div');
  condition2.classList.add('weather__approx__condition');
  condition2.innerHTML = `

            <img src="img/icon-weather/${icon}.svg" alt="conditions" />
            <p>Conditions: <span>${conditions}</span></p>
  
  `;

  weatherApprox.appendChild(condition1);
  weatherApprox.appendChild(condition2);

  const maxMin = document.querySelector('.weather__maxMin');

  const maxTemp = document.createElement('div');
  maxTemp.classList.add('weather__maxMin--value');

  maxTemp.innerHTML = `
    
          <p> temperature max:

           <img src="img/bx-up-arrow-circle.svg" alt="" />
          </p>

        <span> ${max} <img src="img/celsius.svg" alt="celcius" /> </span>
    
    
    `;
  const minTemp = document.createElement('div');
  minTemp.classList.add('weather__maxMin--value');

  minTemp.innerHTML = `
    
          <p> temperature min:

           <img src="img/bx-up-arrow-circle-2.svg" alt="" />
          </p>

        <span> ${min} <img src="img/celsius.svg" alt="celcius" /> </span>
    
    
    `;

  maxMin.appendChild(maxTemp);
  maxMin.appendChild(minTemp);

  //   Appenchild for data

  leftSide.appendChild(location);
  leftSide.appendChild(result);
  leftSide.appendChild(weatherApprox);
  leftSide.appendChild(maxMin);
}

//function read API from news

function newsApi() {
  setTimeout(() => {
    const URLnews = `https://api.newscatcherapi.com/v2/search?q='${newCity}&page_size=3`;

    fetch(URLnews, {
      headers: {
        'x-api-key': 'BLjlJqvhhcEoo-mahUkdydo-eY2309ZV7xVA6sE3BhY',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, 2000);
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

//Function to convert F to celcius and

function celcius(celcius) {
  return parseInt(((celcius - 32) * 5) / 9);
}
