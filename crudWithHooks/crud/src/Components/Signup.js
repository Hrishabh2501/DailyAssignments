import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css'
import {  createUser } from '../APIs/api';
import Toast from 'light-toast'
export const UserContext = React.createContext()



function Signup() {

    const [user, setUser] = useState({ firstname: '', lastname: '', email: '', password: '' })
    const [submit, setSubmit] = useState(false)
    const [sign, setSign] = useState(false)
    const [message,setMessage]=useState('')

    useEffect(() => {
        console.log('useEffect running')

    }, [])

    const handleSubmit = async () => {
        let userDetails = {
            fname: user.firstname,
            lname: user.lastname,
            mail: user.email,
            pass: user.password

        }

        let res = await createUser(userDetails)
        if (res.status === 200) {
            if (res.data.success) {
                
                document.getElementById("myForm").reset();
                setSubmit(true)
                setMessage(res.data.message)
                Toast.info('CREATE OPERATION')
                // console.log(res.data.message)
            }
        }
        else
        {
            console.log(res)
        }

    }



    return (
        <div className="auth-wrapper" style={{ textAlign: 'center' }}>
            <h1> <i>SIGNUP</i> </h1>
            <form id="myForm">
                
                    FIRSTNAME:&nbsp;&nbsp;<input type='text'  onChange={e => setUser({ ...user, firstname: e.target.value })} /><br /><br />
                    LASTNAME:&nbsp;&nbsp;<input type='text'  onChange={e => setUser({ ...user, lastname: e.target.value })} /><br /><br />
                    EMAIL - ID :&nbsp;&nbsp;<input type='text' onChange={e => setUser({ ...user, email: e.target.value })} /><br /><br />
                    PASSWORD:&nbsp; <input type='password' onChange={e => setUser({ ...user, password: e.target.value })}  /><br /><br /><br />
                    <input type='button' onClick={handleSubmit} value='REGISTER' />
                    <br />
                    <br />
                    <input type='button' value='SIGNIN' onClick={e => setSign(!sign)} />

                
            </form>

            {submit ?
                console.log(message)
                : null}

            {sign ?
                <Redirect to={{ pathname: `/` }} />
                : null
            }

        </div>
    )

}

export default Signup;



