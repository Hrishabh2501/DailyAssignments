import React from "react";
import { slide as Menu } from "react-burger-menu";
import './styles.css'
import { Route, Switch, Link } from 'react-router-dom'
import Board from './Boards'
import Reports from './Reports'

class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <Menu >
                    <Link to="/report">REPORT</Link>
                    <Link to="/board">BOARDS</Link>
                   
                </Menu>
                <label className="HelloUser"><h2>HELLO {this.props.name}</h2></label>

                <button onClick={this.props.onLogout} style={{ backgroundColor: "61dafb", color: "#282c34" }} className="LogoutBtn">LOGOUT
                </button>
                <Switch>
                    <Route path="/board">
                        <Board name={this.props.name} style={{fontSize:'2cm'}} />
                    </Route>
                    <Route path="/report">
                        <Reports username={this.props.name} />
                    </Route>
                </Switch>

            </div>
        );
    }
};
export default Sidebar











// import React from 'react';
// import './App.css';
// import './popup.css'
// import './burger.css';
// import DisplayStages from './DisplaySatges'
// import Popup from './PopUp';
// class DisplayBoard extends React.Component {
//     data;
//     constructor(props) {
//         super(props)
//         this.state = {
//             popup: false
//         }
//         this.handlepop = this.handlepop.bind(this);
//         this.handleadd = this.handleadd.bind(this);
//     }
//     handlepop() {
//         this.setState({ popup: !this.state.popup })
//     }
//     handleadd() {
//         this.setState({ popup: !this.state.popup })
//     }
//     render() {
//         this.data = JSON.parse(localStorage.getItem(this.props.mail))
//         return (
//             <div className='cd'>
//                 <button onClick={this.props.toogle}>Back</button>
//                 <div className="centre">
//                     <h4>Board:{this.data.Board[this.props.hello].boardname}</h4>
//                     <button onClick={this.handleadd}>Add Stages</button>
//                     <div>
//                         <DisplayStages mail={this.props.mail} skey={this.props.hello} />
//                         {this.state.popup ? <Popup mail={this.props.mail} ikey={this.props.hello} pop={this.handlepop} /> : null}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// export default DisplayBoard;