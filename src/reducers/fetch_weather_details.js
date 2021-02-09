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
            status: state.FetchWeatherDetailReducer.weatherDetails[i].weather[0].main
        }
        tempDetails.push(jsonObj)
    }
    console.log("temp Details", tempDetails)
    return tempDetails
}

export {fetchWeatherData, extractData};