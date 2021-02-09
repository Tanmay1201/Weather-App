import axios from "axios"

const fetchAPIResponse = city => {
    let arr = []
    let arr1 = []
    return function (dispatch) {
        var appid = 'd9995871c75d62a489e9e8ad89d43ef0'
        var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appid}`
        axios.get(url)
            .then(response => {
                console.log(response.data.city)
                console.log(response.data.list)
                console.log('thisisresponse')
                arr.push(response.data.city);
                for (var key in response.data.list) {
                    arr1.push(response.data.list[key]);
                }
                console.log(arr1)
                console.log('Above is arr1')
                dispatch({ type: "FETCH_CITY_DETAILS", payload: arr });
                dispatch({type: "FETCH_WEATHER_DETAILS", payload: arr1 })
        }).catch(err=>{
            console.log(err)
        });     
   }            
}

export default fetchAPIResponse;