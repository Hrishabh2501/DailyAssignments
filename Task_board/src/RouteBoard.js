

import React from 'react'
import { render } from 'react-dom';
import { Card, CardHeader, CardBody, CardFooter } from 'react-simple-card';
import './RouteBoard.css'
import'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker'


class BoardRoute extends React.Component {

    constructor(props){
        super(props)
    this.state = {
        userName: this.props.user,
        stage: [],
        stageItem: '',
        toggle: true,
        present: new Date(),
        
    }   

this.handlePresent=this.handlePresent.bind(this)
this.stageEdit=this.stageEdit.bind(this)
this.stageField=this.stageField.bind(this)
this.addStage=this.addStage.bind(this)
this.removeStages=this.removeStages.bind(this)

    }
    handlePresent = (date) => {
        this.setState({ present: date })
    }
    stageEdit = (e) => {
        this.setState({ stageItem: e.target.value })
    }
    stageField = () => {
        this.setState({ toggle: false })
    }
    addStage = () => {
        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        localStorageData.boards[this.props.boardkey].stages.push({


            stageName: this.state.stageItem,
            tasks: [
                {
                    title: '',
                    desc: '',
                    startTime: '',
                    endTime: ''
                }
            ]


        })

        localStorage.setItem(this.state.userName, JSON.stringify(localStorageData))
        this.setState({ toggle: true })

    }

    removeStages(key)  {
        
        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        localStorageData.boards[this.props.boardkey].stages.splice(key,1)
        localStorage.setItem(this.state.userName,JSON.stringify(localStorageData))
        console.log("removeStages"+key)
        this.setState({userName:this.state.userName})
    }

    addTask(key){
        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        localStorageData.boards[this.props.boardkey].stages[key].tasks.push({


           
                    title: '',
                    desc: '',
                    startTime: '',
                    endTime: ''
                
            


        })

        localStorage.setItem(this.state.userName, JSON.stringify(localStorageData))
        this.setState({ toggle: true })

    }



    render() {
        let localStorageData = JSON.parse(localStorage.getItem(this.state.userName))
        console.log(this.props.boardname)
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
                        <CardHeader>{item.stageName}<button onClick={()=>{this.removeStages(key)}}><b>X</b></button></CardHeader>
                        <CardBody>TASK HERE</CardBody>
                        <CardFooter><button onClick={()=>this.addTask(key)}>Add Task</button></CardFooter>
                        </Card>))}
                       

                    {/* {console.log(localStorageData.boards[this.props.boardkey])} */}

                </div>
            </div>)
    }

}

export default BoardRoute