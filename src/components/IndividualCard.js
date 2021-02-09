import React, {Component} from "react"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { component_clicked_action } from "../actions/component_clicked_action"
import { bindActionCreators } from 'redux';
import "./IndividualCard.css"
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
            isSelected: true
        }
        this.props.componentAction(data);
        this.setState({isClicked: true})
    }
    render() {
        let inputStyle;

        if (this.state.isClicked) {
             inputStyle = {
                border: '1px solid #00bfff',
                backgroundColor: '#f5f5f0'
            }
        }

        
        return (
            
            <Card>
                <Card className="Card" onClick={this.setStoreValue} style={inputStyle}>
                    <CardContent>
                        <Typography className="Typo1" gutterBottom >
                            <b>{this.props.data.DayName}</b> 
                        </Typography>
                        <Typography className="Typo2">
                            <b>{this.props.data.min_temp }&#176;</b>  {this.props.data.max_temp}&#176;
                        </Typography>
                        <img src={`http://openweathermap.org/img/w/${this.props.data.image}.png`}></img>
                        <Typography className="Typo3">
                            {this.props.data.status}
                        </Typography>
                    </CardContent>
                </Card>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {}   
}

function matchDispatchToProps(dispatch) {
         return bindActionCreators({componentAction:component_clicked_action}, dispatch);

}
    
export default connect(mapStateToProps,matchDispatchToProps)(IndividualCard);