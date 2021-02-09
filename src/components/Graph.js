import React, { Component } from "react"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { extractData } from "../reducers/fetch_weather_details"
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import "./Graph.css"

const format = () => tick => tick;

class Graph extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sampleData: [
                {
                    day:1,
                    temp:12
                },
                {
                    day:2,
                    temp:13
                },
                {
                    day:3,
                    temp:19
                },
                {
                    day:4,
                    temp:24
                }
            ]
        }
    }

    render() {
        console.log(this.props.isComponentSelected.isSelected)
        if (this.props.isComponentSelected.isSelected) {
            return (
            <Card className="ReportCard">
                    <CardContent>
                            <Typography className="Header">
                            <span><b>{this.props.isComponentSelected.max_temp}&#176;C</b></span>
                            <img  width="60px" height="80px" src={`http://openweathermap.org/img/w/${this.props.isComponentSelected.icon}.png`}></img>
                        </Typography>
                        
                        <Chart data={this.state.sampleData}>
                            {/* <ArgumentAxis tickFormat={format} /> */}
                            <LineSeries
                                name="TV news"
                                valueField="temp"
                                argumentField="day"
                            />
                        </Chart>
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
        extractedD: extractData(state),
        isComponentSelected: state.ComponentClickedReducer.selected
    }   
}

    
export default connect(mapStateToProps)(Graph);