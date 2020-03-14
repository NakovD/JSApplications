function attachEvents() {
    let url = `https://judgetests.firebaseio.com/locations.json`;
    let $inputField = document.querySelector("#location");
    let $getWeatherBttn = document.querySelector("#submit");
    let getWeatherFunc = async function (e) {
        if ($inputField.value !== '') {
            try {
                let responseWithLocations = await fetch(url);
                if (responseWithLocations.status < 400) {
                    let data = await responseWithLocations.json();
                    let wantedLocation = data.find(el => el.name.toLowerCase() === $inputField.value.toLowerCase());
                    if (wantedLocation) {
                        let currentConditions = await currentConditionsFunc(wantedLocation.code);
                        let threeDayForecast = await threeDayForecastFunc(wantedLocation.code);
                        let $divToDisplay = document.querySelector("#forecast");
                        $divToDisplay.style.display = 'block';
                        let $currentConditionsDiv = document.querySelector("#current");
                        let $threeDayForecastDiv = document.querySelector("#upcoming");
                        let $oneDayForecast = createCurrentWeatherDiv(currentConditions);
                        $currentConditionsDiv.appendChild($oneDayForecast);
                        let $threeDayForecast = create3DayForecast(threeDayForecast);
                        $threeDayForecastDiv.appendChild($threeDayForecast);
                        $inputField.value = '';
                    }else {
                        throw('Not Found Location');
                    }
                } else {
                    throw (responseWithLocations);
                }
            } catch (error) {
                $inputField.value = '';
                if (document.querySelector("#current").contains(document.querySelector("#current > div.forecasts"))) {
                    document.querySelector("#current").removeChild(document.querySelector("#current > div.forecasts"));
                }
                if (document.querySelector("#upcoming").contains(document.querySelector("#upcoming > div.forecast-info"))) {
                    document.querySelector("#upcoming").removeChild(document.querySelector("#upcoming > div.forecast-info"));
                }
                alert('Error! Invalid info.');                
                document.querySelector("#forecast").style.display = 'none';
            }
        }
        return;
    }

    let currentConditionsFunc = async function(_code) {
        let code = _code;
        try {
            let responseCurrentConditions = await fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json `);
            if (responseCurrentConditions.status < 400) {
                let dataCurrentConditions = await responseCurrentConditions.json();
                return dataCurrentConditions;
            }else {
                throw(responseCurrentConditions);
            }
        } catch (error) {
            
        }
    }
    let threeDayForecastFunc = async function(_code) {
        let code = _code;
        try {
            let threeDayForecastResponse = await fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`);
            if (threeDayForecastResponse.status <  400) {
                let threeDayForecastData = await threeDayForecastResponse.json();
                return threeDayForecastData;
            }else {
                throw(threeDayForecastResponse);
            }
        } catch (error) {
            
        }
    }
    let createCurrentWeatherDiv = function(currentWeatherObj) {
        if (document.querySelector("#current").contains(document.querySelector("#current > div.forecasts"))) {
            document.querySelector("#current").removeChild(document.querySelector("#current > div.forecasts"));
        }
        let differentWeathers = {
            'Sunny': '&#x2600;',
            'Partly sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;',
    }
        let $divForecasts = document.createElement('div');
        $divForecasts.className = 'forecasts';
        let $spanCondSymb = document.createElement('span');
        $spanCondSymb.className = 'condition symbol';
        $spanCondSymb.innerHTML = `${differentWeathers[currentWeatherObj.forecast.condition]}`;
        let $spanCondition = document.createElement('span');
        $spanCondition.className = 'condition';
        let $spanWithNameTown = document.createElement('span');
        $spanWithNameTown.className = 'forecast-data';
        $spanWithNameTown.textContent = `${currentWeatherObj.name}`;
        let $spanDegrees = $spanWithNameTown.cloneNode();
        $spanDegrees.innerHTML = `${currentWeatherObj.forecast.low}&#176;/${currentWeatherObj.forecast.high}&#176;`;
        let $spanConditionText = $spanWithNameTown.cloneNode();
        $spanConditionText.textContent = `${currentWeatherObj.forecast.condition}`;
        let allSpansCondition = [$spanWithNameTown,$spanDegrees,$spanConditionText];
        allSpansCondition.forEach(el => $spanCondition.appendChild(el));
        $divForecasts.appendChild($spanCondSymb);
        $divForecasts.appendChild($spanCondition);
        return $divForecasts;
    }
    let create3DayForecast = function(_threeDayForecast) {
        let threeDayForecast = _threeDayForecast;
        if (document.querySelector("#upcoming").contains(document.querySelector("#upcoming > div.forecast-info"))) {
            document.querySelector("#upcoming").removeChild(document.querySelector("#upcoming > div.forecast-info"));
        }
        let differentWeathers = {
            'Sunny': '&#x2600;',
            'Partly sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;',
    }
        let $forecastInfoDiv = document.createElement('div');
        $forecastInfoDiv.className = 'forecast-info';
        threeDayForecast.forecast.forEach((day,i) => {
        let $spanDay = document.createElement('span');
        $spanDay.className = 'upcoming';
        let $spanWithSymbol = document.createElement('span');
        $spanWithSymbol.className = 'symbol';
        $spanWithSymbol.innerHTML = differentWeathers[threeDayForecast.forecast[i].condition];
        let $spanDegrees = $spanWithSymbol.cloneNode();
        $spanDegrees.className = 'forecast-data';
        $spanDegrees.innerHTML = `${threeDayForecast.forecast[i].low}&#176;/${threeDayForecast.forecast[i].high}&#176;`;
        let $spanConditionText = $spanDegrees.cloneNode();
        $spanConditionText.textContent = threeDayForecast.forecast[i].condition;
        $spanDay.appendChild($spanWithSymbol);
        $spanDay.appendChild($spanDegrees);
        $spanDay.appendChild($spanConditionText);
        $forecastInfoDiv.appendChild($spanDay);
    })
        return $forecastInfoDiv;
    }
    $getWeatherBttn.addEventListener('click', getWeatherFunc);
}


// ⦁	Sunny			&#x2600; // ☀
// ⦁	Partly sunny	             &#x26C5; // ⛅
// ⦁	Overcast		&#x2601; // ☁
// ⦁	Rain			&#x2614; // ☂
attachEvents();