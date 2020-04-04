

import React from 'react'
// import { render } from 'react-dom';
import { Card, CardHeader, CardBody, CardFooter } from 'react-simple-card';
import './RouteBoard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from "reactjs-popup";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment'


class BoardRoute extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: this.props.user,
            stage: [],
            stageItem: '',
            toggle: true,
            taskname: '',
            descr: '',
            present: new Date(),
            startingTime: '',
            endingTime: ''

        }

        this.handlePresent = this.handlePresent.bind(this)
        this.handleStarting = this.handleStarting.bind(this)
        this.handleEnding = this.handleEnding.bind(this)
        this.stageEdit = this.stageEdit.bind(this)
        this.stageField = this.stageField.bind(this)
        this.addStage = this.addStage.bind(this)
        this.removeStages = this.removeStages.bind(this)
        this.addTask = this.addTask.bind(this)
        this.moveTask = this.moveTask.bind(this)
        this.moveStage=this.moveStage.bind(this)

    }
    handleTask = (e) => {
        this.setState({ taskname: e.target.value })
    }
    handleDesc = (e) => {
        this.setState({ descr: e.target.value })
    }
    handlePresent = (date) => {
        this.setState({ present: date })
    }
    handleStarting = (date) => {
        this.setState({ startingTime: date })
    }
    handleEnding = (date) => {
        this.setState({ endingTime: date })
    }
    stageEdit = (e) => {
        this.setState({ stageItem: e.target.value })
    }
    stageField = () => {
        this.setState({ toggle: false })
        this.setState({ stageItem: '' })
    }
    addStage = () => {
        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        if (this.state.stageItem.length > 0) {
            localStorageData.boards[this.props.boardkey].stages.push({


                stageName: this.state.stageItem,
                tasks: [
                ]


            })

            localStorage.setItem(this.state.userName, JSON.stringify(localStorageData))
        } this.setState({ toggle: true })

    }

    removeStages(key) {

        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        localStorageData.boards[this.props.boardkey].stages.splice(key, 1)
        localStorage.setItem(this.state.userName, JSON.stringify(localStorageData))
        console.log("removeStages" + key)
        this.setState({ userName: this.state.userName })
    }

    addTask(key) {
        let currDate = `${this.state.present.getMonth() + 1}/${this.state.present.getDate()}/${this.state.present.getFullYear()}`
        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        localStorageData.boards[this.props.boardkey].stages[key].tasks.push({

            title: this.state.taskname,
            desc: this.state.descr,
            date: currDate,
            startTime: this.state.startingTime,
            endTime: this.state.endingTime


        })

        localStorage.setItem(this.state.userName, JSON.stringify(localStorageData))
        this.setState({ userName: this.state.userName })
        console.log("addTask" + JSON.stringify(localStorageData.boards[this.props.boardkey]))

    }

    moveTask(stageKey, keyTask, key) {

        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        console.log('moveTask' + stageKey)
        console.log('moveTask' + keyTask)
        console.log('moveTask' + key)


        console.log(localStorageData.boards[this.props.boardkey].stages[key].tasks)
        localStorageData.boards[this.props.boardkey].stages[stageKey].tasks.push(
            localStorageData.boards[this.props.boardkey].stages[key].tasks[keyTask]
        )
        localStorageData.boards[this.props.boardkey].stages[key].tasks.splice(keyTask, 1)
        console.log(localStorageData.boards[this.props.boardkey].stages[key].tasks)
        localStorage.setItem(this.state.userName, JSON.stringify(localStorageData))
        this.setState({ userName: this.state.userName })
    }
moveStage(moveKey,key)
{
    // console.log('moveStage' + moveKey)
    // console.log('moveStage' + key)
    let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
    let temp=localStorageData.boards[this.props.boardkey].stages[key]
    localStorageData.boards[this.props.boardkey].stages.splice(moveKey,0, localStorageData.boards[this.props.boardkey].stages.splice(key, 1)?temp:null)

    localStorage.setItem(this.state.userName, JSON.stringify(localStorageData))
    this.setState({ userName: this.state.userName })
}


    render() {
        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        console.log(this.props.boardname)
        let sKey
        return (
            <div>
                <button onClick={this.props.boardlist}>GO BACK</button>
                You are on <b>{this.props.boardname}</b>
                {this.state.toggle ?
                    <button onClick={this.stageField}>Add Stages</button> :
                    <span><input type='text' onChange={this.stageEdit}></input><button onClick={this.addStage}>ADD</button></span>}

                <div className='uprStages'>



                    {localStorageData.boards[this.props.boardkey].stages.map((item, key) =>
                        (
                            <Card className='stages'>
                                <CardHeader><b>{item.stageName}</b><br></br>
                                <div class="verticalLine">
                                    <label for="MoveStage">MOVE STAGE AFTER:</label>
                                    <select id="MoveStage" onChange={(e) => { this.moveStage(e.target.value, key) }}>
                                        <option value="none" selected disabled hidden>
                                            Select the Stage
                                                </option>
                                        {localStorageData.boards[this.props.boardkey].stages.map((moveStage, moveKey) => (

                                            <option value={moveKey} >{moveStage.stageName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div><button onClick={() => { this.removeStages(key) }}><b>X</b></button></div>
                                </CardHeader>
                                <CardBody>

                                    <div> {localStorageData.boards[this.props.boardkey].stages[key].tasks.map((itemTask, keyTask) => (
                                        <div>
                                            <b>Name</b>:{itemTask.title}<br></br>
                                            <b>Created At</b>:{moment(itemTask.date).format('L')}<br></br>
                                            <b>Description</b>:{itemTask.desc}<br></br>
                                            <b>Start Time</b>:{moment(itemTask.startTime).format('L')}<br></br>
                                            <b>End Time</b>:{moment(itemTask.endTime).format('L')} <br></br>

                                            <label for="MoveTask">MOVE TASK TO:</label>
                                            <select id="MoveTask" onChange={(e) => { this.moveTask(e.target.value, keyTask, key) }}>
                                                <option value="none" selected disabled hidden>
                                                    Select the Stage
                                                </option>
                                                {localStorageData.boards[this.props.boardkey].stages.map((stageId, stageKey) => (

                                                    <option value={stageKey} >{stageId.stageName}</option>
                                                ))}

                                            </select>
                                            <div class="hr-line"></div>
                                        </div>



                                    )
                                    )}</div>
                                </CardBody>
                                <CardFooter><Popup trigger={<button>Add Task</button>} position="top center">
                                    <div>
                                        <input type='text' placeholder='enter task' value={this.state.taskname} onChange={this.handleTask}></input>
                                        <DatePicker className="form-control" placeholder="date" onChange={this.handlePresent} selected={this.state.present} value={this.state.present} />
                                        <input type='text' placeholder='enter description' value={this.state.descr} onChange={this.handleDesc}></input>
                                        <DatePicker className="form-control" placeholder="Enter start time" onChange={this.handleStarting} selected={this.state.startingTime} value={this.state.startingTime} />
                                        <DatePicker className="form-control" placeholder="Enter end time" onChange={this.handleEnding} selected={this.state.endingTime} value={this.state.endingTime} />
                                        <button onClick={() => { this.addTask(key) }}>ADD</button>

                                    </div>
                                </Popup></CardFooter>
                            </Card>))}


                    {/* {console.log(localStorageData.boards[this.props.boardkey])} */}

                </div>
            </div>)
    }

}

export default BoardRoute