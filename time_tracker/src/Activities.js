import React, { Component } from "react";
// import Report from './Report'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import ActivityTable from './ActivityTable'

let data = null;
class Activities extends Component {
    state = {
        userDetails: [{
            userName: "",
            password: "",
            activities: [{ date: "", duration: "", activity: "" }]
        }],
        date: "",
        activity: "",
        startingTime: "",
        endingTime: "00:00 AM",
        addActivity:false,
        temp:0
    }


    handleActivity = (e) => {
        this.setState({ activity: e.target.value })
    }
    handleStarting = (e) => {
        this.setState({ startingTime: e.target.value })
    }
    handleEnding = (e) => {

        this.setState({ endingTime: e.target.value })

    }
    handleDate = (date) => {
        this.setState({ date: date })
    }
    handleActivities = () => {

        this.setState({addActivity:true})
      
        console.log(this.state.userDetails)

        if (localStorage.getItem('document') != null) {
            data = JSON.parse(localStorage.getItem('document'))
           console.log(data)
        }

        let flag = 0;
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].password === this.props.password && data[i].userName === this.props.name) {
                    flag = 1;
                    this.setState({temp:i})
                    break;
                }
                else {
                    flag = 0;
                    //temp = data.length
                    this.setState({temp: data.length})
                }
            }
        }
        else {
            flag = 0;
            
        }
        if (flag === 1) {
            let newArray = data;
            const obj = {
                date: this.state.date,
                duration: this.state.endingTime - this.state.startingTime,
                activity: this.state.activity

            }
            newArray[this.state.temp].activities.push(obj);
            this.setState({ userDetails: newArray })
            localStorage.setItem('document', JSON.stringify(newArray))

        }
        else {
            let newArray = data;
            const obj = {
                userName: this.props.name,
                password: this.props.password,
                activities: [{
                    date: this.state.date,
                    duration: this.state.endingTime - this.state.startingTime,
                    activity: this.state.activity
                }]

            }
            newArray.push(obj);
            this.setState({ userDetails: newArray })
            localStorage.setItem('document', JSON.stringify(newArray))

        }
        
    }
    render() {

       let data = JSON.parse(localStorage.getItem('document'))
        return (
            <div>
                <h1>Activities</h1>

     <table>
        <tbody>
        <tr>
          <th>
          Activity:
          </th>
          <td>
          <input type="text" onChange={this.handleActivity}></input> 
          </td>
        </tr>
        <tr>
          <th>
          date:
          </th>
          <td>
          <DatePicker selected={this.state.date} onChange={this.handleDate} />
          </td>
        </tr>
        <tr>
          <th>
          starting time:    
          </th>
          <td>
          <TimePickerComponent id="timepicker" placeholder="Select a Time" width="195" value={this.state.startingTime} onChange={this.handleStarting}/>
          </td>
        </tr>
        <tr>
          <th>
          ending time:
          </th>
          <td>
          <TimePickerComponent id="timepicker" placeholder="Select a Time" width="195" value={this.state.endingTime} onChange={this.handleEnding}/>
          </td>
        </tr>
        
        </tbody>
      </table>
                <button onClick={this.handleActivities}>submit</button><br></br><br></br>


            {this.state.addActivity?<table>
                    <th>activity</th>
                    <th>duration</th>
                    <th>date</th>
                    {
                        data[this.state.temp].activities.map((activity) => {
                            return (<ActivityTable obj={activity}></ActivityTable>)
                        }
                        )
                    }
                </table>:null}



            </div>
        )
    }

}
export default Activities;

