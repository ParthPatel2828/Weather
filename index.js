const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const errorMessage = document.querySelector('.error');

async function getWeather(cityName) { 
  try {
    const apiKey = '1a00caa9d1959959c18654c1f81d4457';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    
    const response = await fetch(apiUrl);
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log(data);
    document.querySelector('.celcius').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidityP').innerHTML = Math.round(data.main.humidity) + "%";
    document.querySelector('.windS').innerHTML = Math.round(data.wind.speed) + "K/h";
    document.querySelector('.weather-description').innerHTML = data.weather[0].description;

    // Hide the error message
    errorMessage.style.display = 'none';
  } catch (error) {
    console.error('Error:', error);
    
    // Show the error message
    errorMessage.style.display = 'block';
  }
}

searchBtn.addEventListener('click', () => {
  const cityName = searchInput.value.trim(); 
  if (cityName) {
    getWeather(cityName);
  }
});
