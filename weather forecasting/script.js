const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = '37fdb4d116997fd970b247686bbf6031';
  const city = document.querySelector('.search-box input').value;
  if (city == "") return;
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      if (json.cod == '404') {
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }
      const image = weatherBox.querySelector('img');
      const temperature = weatherBox.querySelector('.temperature');
      const description = weatherBox.querySelector('.description');
      const humidity = weatherDetails.querySelector('.humidity span');
      const wind = weatherDetails.querySelector('.wind span');
      
      switch(json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Cloud':
            image.src = 'images/cloudy.png';
            break;
        case 'Snow':
          image.src = 'images/cloudy.png';
          break;
        case 'Thunder Strom':
          image.src = 'images/mist.png';
          break;
        case 'Drizzle':
          image.src = 'images/mist.png';
          break;
        default:
          image.src = 'images/cloudy.png';
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
    })
    .catch(error => {
      console.error('Error:', error);
      error404.classList.add('active');
    });
});

