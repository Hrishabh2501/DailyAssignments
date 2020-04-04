import React from 'react';
import Board from './Boards'
import { ToastsContainer, ToastsStore } from 'react-toasts';

// import Sidebar from './sidebar';

class SignUp extends React.Component {
    constructor(props)
    { 
        super(props)
        this.state = {
        uname: '',
        pass: '',
        submit: false,
        toggle: true
    }
    this.handleChange=this.handleChange.bind(this)
    this.handlePassword=this.handlePassword.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
}
  
    handleChange = (e) => {
        this.setState({ uname: e.target.value })
    }
    handlePassword = (e) => {
        this.setState({ pass: e.target.value })
    }
    handleSubmit = () => {

        if (this.state.uname.length > 0) {
            if (localStorage.getItem(this.state.uname)) {
                const localStorageData = JSON.parse(localStorage.getItem(this.state.uname))
                if (localStorageData.password === this.state.pass) {
                    ToastsStore.success("WELCOME "+this.state.uname+".....!!!!")
                    // alert('"WELCOME "+this.state.uname+".....!!!!"')
                    this.setState({ toggle: false, submit: true })
                }
                else {
                    // ToastsStore.error("WRONG PASSWORD....SORRY!!!!!!")
                    alert('WRONG PASSWORD....SORRY!!!!!!')
                }
            }
            else {
                let obj = {
                    password: this.state.pass,
                    boards: []

                }
                localStorage.setItem(this.state.uname, JSON.stringify(obj))


                alert(" WELCOME " + this.state.uname + ".....!!!!")
                // ToastsStore.success("WELCOME "+this.state.uname+".....!!!!")

                this.setState({ toggle: false, submit: true })
            }

        }
        else {
            //  ToastsStore.error("WITHOUT USERNAME....DOOR LOCKED!!!!!!")
            alert("WITHOUT USERNAME....DOOR LOCKED!!!!!!")
        }
    }
    handleLogout = () => {

        this.setState({ submit: false })
        this.setState({ toggle: true })
        alert(" SEE YOU SOON " + this.state.uname + " TATA!!!!!:-)")
        // ToastsStore.success(" SEE YOU SOON"+this.state.uname+"TATA!!!!!:-)")

    }
    render() {
        return (

            <div>
                {this.state.toggle ?
                    <div>

                        <div className="container">
                            <div className="d-flex justify-content-center h-100">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>Sign In</h3>
                                    </div>
                                    <div className="card-body">

                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="username" onChange={this.handleChange} value={this.state.uname} />

                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" className="form-control" placeholder="password" onChange={this.handlePassword} value={this.state.password} />
                                        </div>

                                        <div className="form-group">
                                            <button onClick={this.handleSubmit} className="btn float-right login_btn">signin</button>
                                            <ToastsContainer store={ToastsStore} />
                                        </div>
                                        

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    : null}

                {this.state.submit ? <Board name={this.state.uname} onLogout={this.handleLogout}></Board> : null}

            </div>
        );
    }
}
export default SignUp;