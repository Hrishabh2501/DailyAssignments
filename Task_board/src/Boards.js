import React from 'react'
import {  Link, Route, Switch } from 'react-router-dom'
import BoardRoute from './RouteBoard'
import './Board.css'

// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

class Board extends React.Component {
    state = {
        username: this.props.name,
        board: [],
        boardItem: '',
        toggle: false,
        submit: true,
        change:true

    }
    addBoard = () => {

        this.setState({ submit: false, toggle: true })
    }
    nameBoard = (e) => {
        this.setState({ boardItem: e.target.value })
    }
    addBoardItem = () => {

        if (this.state.boardItem.length > 0 && this.state.boardItem) {
            let localStorageData = JSON.parse(localStorage.getItem(this.state.username))
            localStorageData.boards.push({
                boardName: this.state.boardItem,
                stages: [
                    {
                        stageName: 'NEW',
                        tasks: [
                            
                        ]
                    },
                    {
                        stageName: 'DONE',
                        tasks: [
                            
                        ]
                    }

                    
                ]
            })
        
            localStorage.setItem(this.state.username, JSON.stringify(localStorageData))
        }
        
       
        this.setState({ submit: true, toggle: false })
       


    }
    changeBoard=()=>{
        this.setState({change:false})
        console.log('changeBoard '+this.state.change)
    }
    boardList = ()=>
{
    this.setState({change:true})
    console.log('boardList'+this.state.change)
}


    render() {
        let localStorageData = JSON.parse(localStorage.getItem(this.state.username))
        console.log(localStorageData.boards.length)
        return (
            <div>
                <label className="HelloUser"><h2>hey <b><i>{this.props.name}</i></b></h2></label>
             
                 
                <button onClick={this.props.onLogout} style={{ backgroundColor: "61dafb", color: "#282c34" }} className="LogoutBtn">LOGOUT
                </button>
              
                {this.state.change?
                    <div>
                    BOARD:


                    <div>

                        {this.state.toggle ? <div><input type='text' onChange={this.nameBoard}></input>
                            <button onClick={this.addBoardItem}>ADD</button></div> : this.state.submit ?

                                <p>{localStorageData.boards.map((item, index) => (<Link to={"/" + item.boardName}><li style={{ listStyle: 'none' }} onClick={this.changeBoard}>{item.boardName}</li></Link>))}</p>

                                : null}

                        <button onClick={this.addBoard}>ADD NEW BOARD</button>
                    </div>


                </div>:
                
                                localStorageData.boards.map((item, key) => 
                                   (
                                   
                                        <Switch>
                                            <Route path={"/" + item.boardName}>
                                                    <BoardRoute boardkey={key}user={this.state.username} boardname={localStorageData.boards[key].boardName} boardlist={this.boardList}/>
                                            </Route>
                                        </Switch>
                                    ))
    }

            </div>
        )
    }
}

export default Board;