// OpenWeather API KEY = a692e765a431e199cf9cf42a32db2f9e
const APIKey = "a692e765a431e199cf9cf42a32db2f9e";

// city coordinates API call = https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const coordinatesBaseURL = 'https://api.openweathermap.org/geo/1.0/direct?q=';
const coordinatesLimitPar = '&limit=';
const APIParameter = '&appid=' + APIKey;

// let exampleCoordinatesURL = coordinatesBaseURL + 'Sydney' + coordinatesLimitPar + '1' + APIParameter;

// fetch(exampleCoordinatesURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

// 5 Day forecast API Call = https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const fivedayBaseURL = 'https://api.openweathermap.org/data/2.5/forecast?';
const latPararameter = 'lat=';
const lonPararameter = '&lon=';
const metricParameter = '&units=metric'

let historyArray = [];
const historyKey = "History List";
// let fivedayExampleURL = fivedayBaseURL + latPararameter + '-33.8698439'
//     + lonPararameter + '151.2082848' + APIParameter;


// fetch(fivedayExampleURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });


renderHomepage();
savePrintHistory();



// function - init homepage to sydney
function renderHomepage() {
    let coordinatesURL = coordinatesBaseURL + 'Sydney' + coordinatesLimitPar + '1' + APIParameter;
    coordinatesFetch(coordinatesURL);
}

// function - generate coordinates URL from search
function coordinatesURLfromSearch() {
    let cityInput = $('#search').val();

    // if no input, return
    if (cityInput.length === 0) {
        return;
    }

    let cityQuery = cityInput.replace(/ /g, '+');

    // place city value in URL & fetch
    let coordinatesURL = coordinatesBaseURL + cityQuery + coordinatesLimitPar + '1' + APIParameter;
    coordinatesFetch(coordinatesURL);
}

// function - event listener Fetch city coordinates from search, feed to weather fetch
function coordinatesFetch(coordinatesURL) {
    fetch(coordinatesURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // save long and lat and feed to fetchWeather
            let inputLat = data[0].lat;
            let inputLon = data[0].lon;


            let fivedayURL = fivedayBaseURL + latPararameter + inputLat
                + lonPararameter + inputLon + metricParameter + APIParameter;

            fetchWeather(fivedayURL);
        });
}

$('#submit-btn').on('click', coordinatesURLfromSearch);

$('#search').on('keypress', function (event) {
    // if user presses enter on the page, fetch the coordinates
    // console.log(event.keyCode);
    if (event.keyCode === 13) {
        // console.log(event.keyCode);
        coordinatesURLfromSearch();
    }
});


// function - fetch todays and future 5 days & append

function fetchWeather(fivedayURL) {
    fetch(fivedayURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $('#todays-weather').html("");
            $('#future-container').html("");

            // first create elements for todays weather card
            // put city name date and icon in new div
            let cityTitleEl = $('<div class="title">');
            $('#todays-weather').append(cityTitleEl);

            // recreate todays weather container
            let cityName = data.city.name;

            let nowsDateTime = data.list[0].dt_txt;
            // seperate date & time
            const nowsDateTimeArray = nowsDateTime.split(" ");
            // reformat date given to be day-month-year
            let todaysDate = nowsDateTimeArray[0].split("-");

            let cityNameEl = $('<h1>');
            cityNameEl.text(cityName + ' (' + todaysDate[2] + '/' +
                todaysDate[1] + '/' + todaysDate[0] + ')');

            cityTitleEl.append(cityNameEl);

            let todaysIcon = data.list[0].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + todaysIcon + ".png";

            let iconEl = $('<img class="icon">');
            iconEl.attr('src', iconURL);
            cityTitleEl.append(iconEl);

            // save temp, wind & humidity, & append

            let todaysTemp = data.list[0].main.feels_like;
            let tempEl = $('<p>');
            tempEl.text("Temp: " + todaysTemp + ' °C');
            $('#todays-weather').append(tempEl);

            let todaysWind = data.list[0].wind.speed;
            let windEl = $('<p>');
            windEl.text("Wind: " + todaysWind + ' MPS');
            $('#todays-weather').append(windEl);

            let todaysHumidity = data.list[0].main.humidity;
            let humidityEl = $('<p>');
            humidityEl.text("Humidity: " + todaysHumidity + ' %');
            $('#todays-weather').append(humidityEl);


            // now create elements for 5 day forecast

            // first, find the time of the search
            // to know the offset for the first new day @12pm

            let nowsTime = nowsDateTimeArray[1].split(":");

            console.log(nowsTime[0]);

            // time is in a block of 3 hours. 
            // Find your block, and offset to reach 12am next day
            // 0 - 3 - 6 - 9 - 12 - 15 - 18 - 21
            // index now points to the next day at the same time
            let index = (8 - nowsTime[0] / 3);

            // console.log("Index is");
            // console.log(index);


            let counter = 0;
            // total number of future days to show
            while (counter < 5) {
                let futureDayEl = $('<div class="weather-card">');
                $('#future-container').append(futureDayEl);

                let dateEl = $('<h2>');

                let futureDateTime = data.list[index].dt_txt;
                // seperate date & time
                const futureDateTimeArray = futureDateTime.split(" ");
                // reformat date given to be day-month-year
                let futureDate = futureDateTimeArray[0].split("-");
                dateEl.text(futureDate[2] + '/' + futureDate[1] + '/' + futureDate[0]);

                futureDayEl.append(dateEl);

                let weatherIcon = data.list[index].weather[0].icon;
                let iconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

                let futureiconEl = $('<img class="icon">');
                futureiconEl.attr('src', iconURL);
                futureDayEl.append(futureiconEl);

                // save temp, wind & humidity, & append

                let futureTemp = data.list[index].main.feels_like;
                let futuretempEl = $('<p>');
                futuretempEl.text("Temp: " + futureTemp + ' °C  ');
                futureDayEl.append(futuretempEl);

                let futureWind = data.list[index].wind.speed;
                let futurewindEl = $('<p>');
                futurewindEl.text("Wind: " + futureWind + ' MPS');
                futureDayEl.append(futurewindEl);

                let futureHumidity = data.list[index].main.humidity;
                let futurehumidityEl = $('<p>');
                futurehumidityEl.text("Humidity: " + futureHumidity + ' %');
                futureDayEl.append(futurehumidityEl);


                index += 8;
                counter++;
            }

            $('#search').val("");
        });



}

$('#submit-btn').on('click', savePrintHistory);

$('#search').on('keypress', function (event) {
    // if user presses enter on the page, fetch the coordinates
    // console.log(event.keyCode);
    if (event.keyCode === 13) {
        // console.log(event.keyCode);
        savePrintHistory();
    }
});
// function - event listener save search to local storage & append
function savePrintHistory(event) {
    historyArray = JSON.parse(localStorage.getItem(historyKey)) || [];
    let historyItem = $('#search').val();

    // is item exists in array, dont store it again
    if (historyArray.length != 0) {
        for (let i = 0; i < historyArray.length; i++) {
            if (historyItem.toLowerCase() === historyArray[i].toLowerCase()) {
                return;
            }
        }
    }

    // is input is empty, dont push
    if (historyItem != "") {
        historyArray.push(historyItem);
        localStorage.setItem(historyKey, JSON.stringify(historyArray));
    }


    $('#history-list').html("");

    // print all array elements
    for (let i = 0; i < historyArray.length; i++) {

        let historyEl = $('<button class="history-btn">');
        historyEl.text(historyArray[i]);
        $('#history-list').append(historyEl);
    }

}

// function - event listener for search history buttons
$(document).on('click', '.history-btn', function () {

    let cityName = $(this).text();
    let cityQuery = cityName.replace(/ /g, '+');

    let coordinatesURL = coordinatesBaseURL + cityQuery + coordinatesLimitPar + '1' + APIParameter;
    coordinatesFetch(coordinatesURL);

});

$("#clear-btn").on('click', function (){

    historyArray = [];
    localStorage.setItem(historyKey, JSON.stringify(historyArray));
    savePrintHistory();

});

// XX - GIVEN a weather dashboard with form inputs
// XX - WHEN I search for a city
// XX - THEN I am presented with current and future conditions for that city
// XX - THEN and that city is added to the search history
// XX - WHEN I view current weather conditions for that city
// XX - THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// XX - WHEN I view future weather conditions for that city
// XX - THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// XX - WHEN I click on a city in the search history
// XX - THEN I am again presented with current and future conditions for that city

