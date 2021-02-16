import {combineReducers} from "redux";

import FetchCityDetail from "./fetch_city_details";
import {fetchWeatherData} from "./fetch_weather_details";
import component_clicked from "./component_clicked";

const reducers= combineReducers({
    FetchCityReducer : FetchCityDetail,
    FetchWeatherDetailReducer: fetchWeatherData,
    ComponentClickedReducer: component_clicked
});

console.log("reducers", reducers)

export default reducers;