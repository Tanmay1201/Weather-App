let defaultState = {
    cityData:[] 
}
const fetchCityData = (state = defaultState, action) => {
    if (action.type === "FETCH_CITY_DETAILS") {
        return {
            ...state,
            cityData: action.payload
        }
    }
    else {
        return {
            ...state
        }
    }
};
    
export default fetchCityData;