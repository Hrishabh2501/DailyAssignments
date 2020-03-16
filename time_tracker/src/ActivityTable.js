import React, { Component } from "react";
 import moment from 'moment'
class ActivityTable extends Component {
    render() {
        return (
            <tr>
                <td> { (this.props.obj.activity)}</td>
                <td> {Math.abs((this.props.obj.duration)/60000)} minutes</td>
        <td>{moment(this.props.obj.date).format('YYYY-MM-DD')}</td>
            </tr>
        )
    }
}
export default ActivityTable;


