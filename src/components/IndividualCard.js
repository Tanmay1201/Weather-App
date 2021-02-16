import React, {Component} from "react"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { withStyles  } from '@material-ui/core/styles';
import { component_clicked_action } from "../actions/component_clicked_action"
import { bindActionCreators } from 'redux';
import "./IndividualCard.css"

const useStyles = theme => ({
        root: {
        backgroundColor: "Blue",
            color: "red"
        },
  });


class IndividualCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isClicked: false
        }
    }

    setStoreValue = event => {
        var data = {
            max_temp: this.props.data.max_temp,
            icon: this.props.data.image,
            isSelected: !this.props.data.isSelected,
            dayName: this.props.data.DayName,
            humidity: this.props.data.humidity,
            pressure: this.props.data.pressure,
            clickedIndex: this.props.index
        }
        this.props.componentAction(data);
    }
    render() {
        const classes = this.props;
        let inputStyle = null;
        
        console.log(this.props.indexValue)
        if (this.props.indexValue === this.props.index) {
            inputStyle = {
                border: '1px solid #00bfff',
                backgroundColor: '#ffffb3',
                
            }
        }
        console.log(this.props)
        console.log('Above is extractd props')
        return (
            
                <div className="Card" onClick={this.setStoreValue} style={inputStyle}>
                    <CardContent>
                        <Typography className="Typo1" gutterBottom >
                            <b>{this.props.data.DayName}</b> 
                        </Typography>
                        <Typography className="Typo2">
                            <b>{this.props.data.max_temp}&#176;</b>  {this.props.data.min_temp }&#176;
                        </Typography>
                        <img src={`http://openweathermap.org/img/w/${this.props.data.image}.png`}></img>
                        <Typography className="Typo3">
                            {this.props.data.status}
                        </Typography>
                    </CardContent>
                </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        indexValue: state.ComponentClickedReducer.selected.clickedIndex
    }   
}

function matchDispatchToProps(dispatch) {
         return bindActionCreators({componentAction:component_clicked_action}, dispatch);

}
    
export default connect(mapStateToProps,matchDispatchToProps)(withStyles(useStyles)(IndividualCard));