import React, { Component } from "react"
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "./SearchBox.css"
import fetchAPIResponse from "../actions/fetch_weather_data"
import { extractData } from "../reducers/fetch_weather_details"
import IndividualCard from "../components/IndividualCard"
import Box from '@material-ui/core/Box'
import axios from "axios";

class SearchBox extends Component {
    
    constructor(props) {
        super(props) 

        this.state = {
            cityName: ''
        }
    }
    
    changeCityName = event => {
        this.setState({ cityName: event.target.value })
    }

    fetchCityData = event => {
        this.props.FetchAPIResponse(this.state.cityName)
    }

    componentDidMount()  {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            var api_key = 'AIzaSyDC8e7_5KwrX7ILEQL6z1ZfEnQK_ir3poE'
            var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${api_key}`
            console.log('Above is url')
            console.log(url)
            axios.get(url).then(res => {
                console.log(res.data)
            })
        });
    }
    
    render() {
        return (
            <Box>
                <Box className="header">
                    <TextField
                        className="inputRounded"
                        id="outlined-search"
                        type="search"
                        variant="outlined"
                        value={this.state.cityName}
                        onChange={this.changeCityName}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton onClick={this.fetchCityData}>
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <LocationOnIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            <Box>
                <div className="displayCard">

                    {
                        this.props.extractedD &&   
                        this.props.extractedD.map((data, index) => (
                            <IndividualCard data={data} key={index} />
                        ))
                    }
                </div> 
                </Box>
                </Box>
        )
    }
}

function mapStateToProps(state) {
    console.log("state search box", state)
        return {
            apiCityDetails: state.FetchCityReducer.cityData,
            apiWeatherDetails: state.FetchWeatherDetailReducer.weatherDetails,
            extractedD: extractData(state)
        }
    }

    function matchDispatchToProps(dispatch){
        return bindActionCreators({FetchAPIResponse:fetchAPIResponse}, dispatch);
    }

export default connect(mapStateToProps,matchDispatchToProps)(SearchBox);