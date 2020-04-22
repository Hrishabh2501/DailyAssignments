import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from './signUp';
import SignIn from './signIn';
import App from './App'

class Main extends React.Component{
    render()
    {
        return(
            <div>
                <Switch>
                    <Route exact path='/'>
                        <App/>
                    </Route>
                    <Route exact path='/signup'>
                        <SignUp/>
                    </Route>
                    <Route exact path='/signin'>
                        <SignIn/>
                    </Route>
                </Switch>
            </div>
        )
    }


}

export default Main