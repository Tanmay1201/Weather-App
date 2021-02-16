import React, { Component } from "react"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import Box from '@material-ui/core/Box';
import { getPressureAndHumidity } from "../reducers/fetch_weather_details"
import CanvasJSReact from "../canvasjs.react"
import { extraTemperatureData, getSunriseSunset} from "../reducers/fetch_weather_details"
import "./Graph.css"

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        console.log(this.state.sampleData)
        console.log(this.props)
        console.log('Above is state of extract temp')

        const options = {

            animationEnabled: true,
			data: [{
                type: "spline",
				dataPoints: this.props.TemperatureData
		    }]
        }
        var  options1 = null
        if (this.props.sunrise_sunset !== null) {
            options1 = {
                animationEnabled: true,
                data: [{
                    type: "stackedArea100",
                    dataPoints: [
                        { x: 2, y: 5 },
                        {x : 18, y: 9}
                    ]
                }]
            }
        }
        if (this.props.isComponentSelected.isSelected) {
            return (
            <Card className="ReportCard">
                    <CardContent>
                            <div className="Header">
                            <span><b>{this.props.isComponentSelected.max_temp}&#176;C</b></span>
                            <img  src={`http://openweathermap.org/img/w/${this.props.isComponentSelected.icon}.png`}></img>
                        </div>
                        
                        <CanvasJSChart options = {options} />
                    </CardContent>
                    <CardContent>
                        <Box className="pressurehumidity">
                            <Box className="pressure">
                                <span><b>Pressure</b></span><br />
                                <span id="prehum">{this.props.pressure_humidity.pressure} hpa </span>
                            </Box>
                            <Box className="humidity">
                                <span><b>Humidity</b></span><br />
                                <span id="prehum">{this.props.pressure_humidity.humidity} %</span>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Box className="sunrisesunset">
                            <Box className="sunrise">
                                <span><b>Sunrise</b></span><br />
                                <span id="temp">{ this.props.sunrise_sunset.x} AM</span>
                            </Box>
                            <Box className="sunset">
                                <span><b>Sunset</b></span><br></br>
                                <span id="temp">{ this.props.sunrise_sunset.y} PM</span>
                            </Box>
                        </Box>
                    </CardContent>

            </Card>
        )   
        }
        return null;
    }
}

function mapStateToProps(state) {
    console.log("state search box graph", state)
    return {
        sunrise_sunset: getSunriseSunset(state),
        pressure_humidity: getPressureAndHumidity(state),
        isComponentSelected: state.ComponentClickedReducer.selected,
        TemperatureData: extraTemperatureData(state)
    }   
}

    
export default connect(mapStateToProps)(Graph);