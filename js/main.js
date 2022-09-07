const formulario = document.querySelector('.weather__search');
const city = document.querySelector('.weather__search--input');

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
    readApi();
  }
}

//function read API response

function readApi() {
  const keyID = 'bf5d406b7fbe90761dc05f9369e465d0';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${keyID}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => dataAPI(data));
}

// Data fromAPI

function dataAPI(content) {
  console.log(content);
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
