import axios from 'axios'


export const createUser = async (user) => {
    try {
        console.log(user)
        let res = await axios.post('http://localhost:8000/signup', {
            firstName: user.fname,
            lastName: user.lname,
            email: user.mail,
            password: user.pass
        })
        console.log(res)
        return res
    }
    catch (err) {
        console.log('err', err)
        return err
    }
}

export const verifyUser = async (user) => {
    console.log(user)
    try {
        let res = await axios.post('http://localhost:8000/signin', {
            email: user.mail,
            password: user.pass
        })
        return res
    }
    catch (err) {
        console.log('err', err.response.data)
        return err.response.data
    }
}

export const fetchUser = async(uid) => {
    console.log(uid)
    try{
        let res = await axios.get('http://localhost:8000/getData/' + uid)
        return res
    }
    catch (err){
        console.log('err',err.response.data)
        return err.response.data
    }
}

export const deleteUser = async (uid) => {
    console.log(uid)
    try{
        let res = await axios.delete('http://localhost:8000/delete/' + uid)
        return res
    }
    catch(err){
        console.log('err', err.response.data)
        return err.response.data
    }
}

export const editUser = async (uid,fname,lname) => {
    console.log(fname)
    try{
        let res = await axios.put('http://localhost:8000/update/' +uid,{
            changeFName:fname
        })
        return res
    }
    catch(err){
        console.log('err',err.response.data)
        return err.response.data
    }
}