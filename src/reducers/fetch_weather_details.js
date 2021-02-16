let weatherDetails = {}

const fetchWeatherData = (state = weatherDetails, action) => {
    console.log("this is action")    
    console.log(action)
        if(action.type === "FETCH_WEATHER_DETAILS") {
            state= {...state, weatherDetails: action.payload}
        }
        return state;
};

const extractData = (state) => {
    var dayName= ''
    console.log("state, tempDetails", state, state.FetchWeatherDetailReducer)
    if (!('weatherDetails' in state.FetchWeatherDetailReducer)) return
    var tempDetails = []
    var jsonObj = null
    for (var i = 0; i < state.FetchWeatherDetailReducer.weatherDetails.length; i++) {
        var d = new Date(state.FetchWeatherDetailReducer.weatherDetails[i].dt_txt);
        var tempDayName = d.toString().split(' ')[0];
        if (tempDayName === dayName) continue;
        dayName = tempDayName
        jsonObj = {
            min_temp: (state.FetchWeatherDetailReducer.weatherDetails[i].main.temp_min -273.15).toFixed(2),
            max_temp: (state.FetchWeatherDetailReducer.weatherDetails[i].main.temp_max -273.15).toFixed(2),
            image: state.FetchWeatherDetailReducer.weatherDetails[i].weather[0].icon,
            DayName: dayName,
            status: state.FetchWeatherDetailReducer.weatherDetails[i].weather[0].main,
            clickedClass: ''

        }
        tempDetails.push(jsonObj)
    }
    console.log("temp Details", tempDetails)
    return tempDetails
}

const extraTemperatureData = (state) => {
    console.log(state)
    var day = state.ComponentClickedReducer.selected.dayName
    var jsonobj = null
    var temperature = []
    if(state.FetchWeatherDetailReducer.weatherDetails == null) return
    for (var i = 0; i < state.FetchWeatherDetailReducer.weatherDetails.length; i++) { 
        var d = new Date(state.FetchWeatherDetailReducer.weatherDetails[i].dt_txt);
        var tempDayName = d.toString().split(' ')[0];
        if (tempDayName !== day) continue;
        jsonobj = {
            x: parseInt(state.FetchWeatherDetailReducer.weatherDetails[i].dt_txt.substr(11, 2)),
            y: parseInt((state.FetchWeatherDetailReducer.weatherDetails[i].main.temp -273.15).toFixed(2))
        }
        temperature.push(jsonobj)
    }
    console.log("temperature time array", temperature)
    return temperature
}

const getPressureAndHumidity = (state) => {
    var day = state.ComponentClickedReducer.selected.dayName
    var jsonobj = null
    if(state.FetchWeatherDetailReducer.weatherDetails == null) return
    for (var i = 0; i < state.FetchWeatherDetailReducer.weatherDetails.length; i++) { 
        var d = new Date(state.FetchWeatherDetailReducer.weatherDetails[i].dt_txt);
        var tempDayName = d.toString().split(' ')[0];
        if (tempDayName !== day) continue;
        jsonobj = {
            pressure: state.FetchWeatherDetailReducer.weatherDetails[i].main.pressure,
            humidity: state.FetchWeatherDetailReducer.weatherDetails[i].main.humidity
        }
        break;
    }
    return jsonobj
}

const convert_unixtime_to_normal = (time) => {
    var date = new Date(time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime;
}

const getSunriseSunset = (state) => {
    if (state.FetchCityReducer.cityData[0] == null) return null
    var sunrise = state.FetchCityReducer.cityData[0].sunrise;
    var sunset = state.FetchCityReducer.cityData[0].sunset;
    var sunrise_sunset = {
        x: convert_unixtime_to_normal(sunrise),
        y: convert_unixtime_to_normal(sunset)
    }
    
    return sunrise_sunset
}



export {fetchWeatherData, extractData, extraTemperatureData, getPressureAndHumidity, getSunriseSunset};