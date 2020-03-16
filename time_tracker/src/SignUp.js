import React from 'react';
import './SignUp.css';
import Activities from './Activities';

class SignUp extends React.Component {
    
    state = {
        
        uname:"",
        password:"",
        submit:false
    }
    handleChange=(e)=>
    {
       this.setState({uname: e.target.value})
    }
    handlePassword=(e)=>
    {
      this.setState({password: e.target.value})
    }
    handleSubmit=()=>
    {
        if(this.state.uname && this.state.password !== '')
        {
        this.setState({submit:true})
        localStorage.setItem('documet',JSON.stringify(this.state))
        }
        else{
            alert('ENTER CREDENTIALS')
        }
    }

render()
{
    

    return (
        <div className="SignUp">
            <header className="AboveHeader">TIME-TRACKER</header>
            <header className="SignUp-header">
            <h1>SIGN UP</h1>
            UserName:  <input type="text" onChange={this.handleChange}></input><br></br>
            Password:<input type="password" onChange={this.handlePassword}></input><br></br>
            <button onClick={this.handleSubmit}>signup</button><br></br>
            {this.state.submit?<Activities name={this.state.uname} password={this.state.password}></Activities>:null}
            </header>

        </div>
    );
}
}

export default SignUp;