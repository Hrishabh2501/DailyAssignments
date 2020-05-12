import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css'
import { verifyUser } from '../APIs/api';


// import useUser from './useUser';

function Signin(props) {
    const [user, setUser] = useState({ email: '', password: '' })
    const [submit, setSubmit] = useState(false)
    const [reg, setReg] = useState(false)
    // const [data,info]=useUser()
    const [state, setState] = useState()

   

    useEffect(() => {
        console.log('useEffect running')
        console.log(state)
    }, [])

    const handleSubmit = async () => {
        console.log(user.email, user.password)
        let userInfo = {
            mail: user.email,
            pass: user.password
        }

        let res = await verifyUser(userInfo)
       
        if (res.status === 200) {
            if (res.data.success) {
                console.log(res.data.data)
                setState(res.data)
                setSubmit(true)
            }
        }
        else {

            console.log('CANNOT LOGIN', res)

        }
    }
    return (
        <div className="auth-wrapper" style={{ textAlign: 'center' }}>
            <h1> <i>SIGNIN</i> </h1>
            <form>
                <div>
                    EMAIL - ID: &nbsp;&nbsp;<input type='text' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} /><br /><br />
                    PASSWORD:&nbsp; <input type='password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} autoComplete='true' /><br /><br /><br />
                    <input type='button' onClick={handleSubmit} value='LOGIN' />
                    <br /><br />
                    <input type='button' value='SIGNUP' onClick={e => setReg(!reg)} />
                  

                </div>
            </form>


            {submit ?
                <Redirect to={{ pathname: `/profile`, state:{ ...state }}} />
                
                : null}

            {reg ?
                <Redirect to={{ pathname: `/signup` }} />
                : null}


        </div>
    )

}

export default Signin;