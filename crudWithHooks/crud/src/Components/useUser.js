import {useState} from 'react'

function useUser() {
    const [data,setData]=useState('')
    
    console.log(data)

    const info =data=>{
        setData(data)
    }
    const getInfo =()=>{
        return data
    }

    return [data,getInfo,info]


}

export default useUser
