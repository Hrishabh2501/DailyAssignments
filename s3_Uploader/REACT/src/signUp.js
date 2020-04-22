import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./signIn";
import axios from 'axios'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';


export default class SignUp extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            mail: '',
            pass: '',
            submit: false
        }
        this.onFirstName = this.onFirstName.bind(this)
        this.onLastName = this.onLastName.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    onFirstName = (e) => {
        this.setState({ firstname: e.target.value })
    }

    onLastName = (e) => {
        this.setState({ lastname: e.target.value })
    }

    onEmail = (e) => {
        this.setState({ mail: e.target.value })
    }

    onPassword = (e) => {
        this.setState({ pass: e.target.value })
    }

    handleSubmit = () => {

        if (this.state.firstname.length && this.state.lastname.length && this.state.mail.length > 0 && this.state.pass.length >= 6) {
            let self = this

            axios.post('http://localhost:8000/signup',
                {
                    firstName: this.state.firstname,
                    lastName: this.state.lastname,
                    email: this.state.mail,
                    password: this.state.pass,
                    isLoggedIn: false
                })
                .then(res => {
                    if (res.data.message === 'SUCCESSFULLY SIGN-UP') {


                        ToastsStore.success(res.data.message)
                        self.setState({ submit: true })
                        console.log(self.state.submit)
                        self.setState({ firstname: '', lastname: '', mail: '', pass: '' })

                    }
                    else {

                        ToastsStore.error(res.data.message)
                        self.setState({ submit: false })
                        // self.path = '/signup'
                        console.log(self.state.submit)

                    }

                })
                .catch(function (error) {
                    console.log(error);



                })

        }
        else if (this.state.firstname.length === 0) {
            ToastsStore.warning('ALL FIELDS ARE MANDATORY')
            document.getElementById("fname").focus()
        }
        else if (this.state.lastname.length === 0) {

            ToastsStore.warning('ALL FIELDS ARE MANDATORY')
            document.getElementById("lname").focus()
        }
        else if (this.state.mail.length === 0) {

            ToastsStore.warning('ALL FIELDS ARE MANDATORY')
            document.getElementById('mail').focus()
        }
        else {
            ToastsStore.warning('PASSWORD MUST BE GREATER THAN 6 CHARACTERS')
        }
        // this.setState({ mail: this.state.mail })
    }




    render() {
        return (
            <div>
            <form >
                <div>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" id='fname' className="form-control" placeholder="First name" onChange={this.onFirstName} value={this.state.firstname} pattern='[A-Za-z]' title="Must be Alphabet" minLength='6' required />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" id='lname' className="form-control" placeholder="Last name" onChange={this.onLastName} value={this.state.lastname} pattern='[A-Za-z]' title="Must be Alphabet" minLength='6' required />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" id='mail' className="form-control" placeholder="Enter email" onChange={this.onEmail} value={this.state.mail} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.onPassword} value={this.state.pass} />
                    </div>


                    <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>



                    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />



                    {/* <Link to={this.path} >
                        <button type='submit' className="btn btn-primary btn-block"
                            onClick={this.handleSubmit}>Sign Up</button>
                    </Link>
                    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} /> */}


                    <p className="forgot-password text-right">

                        Already registered <Link className="nav-link" to={"/signin"}>Login</Link>
                       
                    </p>
                </div>

            </form>
             {console.log(this.state.submit)}
             {this.state.submit ? <Redirect to={`/signin`} /> : null}
             </div>
        );
    }
}