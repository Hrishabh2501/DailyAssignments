import React from 'react';
import Board from './Boards'
import Sidebar from './sidebar';

class SignUp extends React.Component {
    state = {
        uname: '',
        password: '',
        submit: false,
        toggle: true
    }

    handleChange = (e) => {
        this.setState({ uname: e.target.value })
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    handleSubmit = () => {

        if (localStorage.getItem(this.state.uname)) {
            const localStorageData = JSON.parse(localStorage.getItem(this.state.uname))
            if (localStorageData.password === this.state.password) {
                alert('SUCCESSFUL')
                this.setState({ toggle: false, submit: true })

            }
            else {
                alert('WRONG PASSWORD')

            }
        }
        else {
            let obj = {
                password: this.state.password,
                boards: [
                    {
                        boardName: '',
                        stages: [
                            {
                                stageName: '',
                                tasks: [
                                    {
                                        title: '',
                                        desc: '',
                                        startTime: '',
                                        endTime: ''
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }

            localStorage.setItem(this.state.uname, JSON.stringify(obj))
            alert('SUCCESSFUL')
            this.setState({ toggle: false, submit: true })

        }


    }
    handleLogout = () => {

        this.setState({ submit: false })
        this.setState({ toggle: true })
        alert(this.state.uname + " logged out successfully")

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