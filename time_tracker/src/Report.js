import React, { Component } from "react";
import moment from 'moment'
class Report extends Component {
    render() {
    if(moment(this.props.obj.date).diff(moment(new Date()))<7)    
        return (
    
      
            <tr>
                <td> { (this.props.obj.activity)}</td>


                <td> {this.props.obj.duration}</td>
        <td>{this.props.obj.date}</td>
            </tr>
        )
        else
        {
            return null
        }
    }
}
export default Report;