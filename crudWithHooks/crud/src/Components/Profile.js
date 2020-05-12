import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";
import '../App.css'
import { Redirect } from 'react-router-dom';
import { deleteUser, editUser, fetchUser } from '../APIs/api';
import Toast from 'light-toast'

const UserProfile = (props) => {

    const [bool, setBool] = useState(false)
    const [logout, setLogout] = useState(false)
    const [data, setData] = useState(props)
    const [update, setUpdate] = useState({ fname: '', lname: '' })
    const [a, setA] = useState(data.location.state.data.firstName)

    useEffect(() => {
        console.log(bool, 'AAAA')
        if (bool) {
            console.log(bool, 'BBBB')
            async function fetchData() {

                let getUser = await fetchUser(data.location.state.data.id)

                console.log('AAApppp')

                // setUpdate({ fname: getUser.data.user.firstName })

                // setUpdate({ lname: getUser.data.user.lastName })

                // Toast.info('RETRIEVE OPERATION ' + update.fname + ' ' + update.lname)
            }
            fetchData()
            console.log(update.fname)
        }


    }, [bool])


    const handleDelete = async () => {
        Toast.info('DELETE OPERATION')
        console.log(data.location.state.data.id)
        let deleteAC = await deleteUser(data.location.state.data.id)
        console.log(deleteAC)
        setLogout(!logout)
    }

    const handleChange = async () => {

        setBool(true)
        if (update.fname !== '') {
            let updateInfo = await editUser(data.location.state.data.id, update.fname)
            setLogout(false)
            setBool(false)
        }
        Toast.info('UPDATE OPERATION ' + update.fname + ' ' + update.lname)
        setA(update.fname)
    }



    return (

        <div style={{ textAlign: 'center' }}>
            <br /><br />
            HELLO:&nbsp; <label>DEAR&nbsp;{a}</label>
            <br /><br />
            <Popup trigger={<button className="btn btn-primary btn-block">LOGOUT</button>} position="bottom left" >
                <div style={{ textAlign: 'center' }}><i>ARE YOU SURE?</i></div>
                <div style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={e => setLogout(!logout)}>Yes</button></div>
            </Popup>
            <br /><br />

            <Popup trigger={<button className="btn btn-primary btn-block">DELETE ACCOUNT</button>} position="bottom left" >
                <div style={{ textAlign: 'center' }}><i>By this your Account will be permanently deleted!!</i></div>
                <div style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={handleDelete}>Yes</button></div>
            </Popup>

            <Popup trigger={<button className="btn btn-primary btn-block">CHANGE DETAILS</button>} position="bottom left" >
                <div style={{ textAlign: 'center' }} ><i>FirstName</i></div>
                <input type='text' style={{ textAlign: 'center' }} id='changeField' placeholder={update.fname} onChange={e => setUpdate({ ...update, fname: e.target.value })} ></input>

                <div style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={handleChange}>Update</button></div>
            </Popup>


            <br /><br />

            {logout ? <Redirect to={{ pathname: `/` }} /> : null}

        </div>




    )
}

export default UserProfile;