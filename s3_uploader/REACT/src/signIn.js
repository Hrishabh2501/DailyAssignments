import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import SignUp from "./signUp";
import Profile from "./Profile"
import axios from 'axios'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Toast from 'light-toast';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mail: '',
            pass: '',
            submit: false,
            firstname:'',
            lastname:'',
            dList:[]
        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmail = (e) => {
        this.setState({ mail: e.target.value })
    }


    handlePassword = (e) => {
        this.setState({ pass: e.target.value })
    }


    handleSubmit = async () => {

        let self = this

        let res = await axios.post('http://localhost:8000/signin',
            {

                email: this.state.mail,
                password: this.state.pass
            })
            console.log(res)
        if (res.data.success) {

            // console.log(res.data.firstName,res.data.lastName)

            Toast.success(res.data.message, 3000);
            // ToastsStore.success(res.data.message)
             self.setState({ submit: true,firstname:res.data.data.firstName,lastname:res.data.data.lastName })
            console.log(self.state.submit)
            self.setState({ mail: '', pass: '' })
            

        }
        else {
            // console.log(res.data.data.firstName,res.data.data.lastName)
            ToastsStore.error(res.data.message)
             self.setState({ submit: false })
            console.log(self.state.submit)

        }

        axios({
            method: "get",
            url: "http://localhost:8000/getData",
            params: { email: self.state.mail },
  
          }).then(function (response) {
            console.log(response.data);
            self.setState({ dList: response.data.data })   
            // console.log(self.state.dList)     
  
          })
            .catch(function (response) {
              console.log(response);
            });
        

    }

    render() {
        return (
            <div>
               
                <form >
                    <div>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={this.state.mail} onChange={this.handleEmail} autoComplete='on' />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.pass} onChange={this.handlePassword} autoComplete='off' />
                        </div>


                        <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>



                        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
                        <p className="forgot-password text-right">
                            Not Registered?  <Link className="nav-link" to="/signup">SignUp</Link>

                        </p>

                    </div>

                    {/* <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p> */}
                </form>
                
                {this.state.submit ? <Redirect to={{pathname:`/profile`,state:{firstName:this.state.firstname,lastName:this.state.lastname,email:this.state.mail,datalist:this.state.dList}}} /> : null}
            </div>
        );
    }
}