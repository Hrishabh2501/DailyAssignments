import React from 'react';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import './App.css'
import {Switch, Route, Link } from "react-router-dom";
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>CRUD WITH HOOKS</h1>
      <div className="auth-wrapper">
        <div className="auth-inner">
        <Switch>
        <Route exact path='/' component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
        </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
