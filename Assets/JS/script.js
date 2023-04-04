// OpenWeather API KEY = a692e765a431e199cf9cf42a32db2f9e
const APIKey = "a692e765a431e199cf9cf42a32db2f9e";

// city coordinates API call = https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const coordinatesBaseURL = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const coordinatesLimitPar = '&limit=';
const APIParameter = '&appid=' + APIKey;

let exampleCoordinatesURL = coordinatesBaseURL + 'Sydney' + coordinatesLimitPar + '1' + APIParameter;

fetch(exampleCoordinatesURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

// 5 Day forecast API Call = https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const fivedayBaseURL = 'https://api.openweathermap.org/data/2.5/forecast?';
const latPararameter = 'lat=';
const lonPararameter = '&lon=';

let fivedayExampleURL = fivedayBaseURL + latPararameter + '-33.8698439'
    + lonPararameter + '151.2082848' + APIParameter;


fetch(fivedayExampleURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });



// function - event listener Fetch city coordinates from search, feed to other fetches

// function - fetch todays and future 5 days & append

// function - event listener save search to local storage & append

// function - event listener for search history buttons

// optional - init homepage to sydney?

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

