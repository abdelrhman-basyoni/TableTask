
import React, {useEffect,useState}from 'react'
import {get} from '../utils/apis'
const Main = () => {

    useEffect(() => {
        get('table').then( res =>{
            console.log(res.data)
        }).catch( err =>{
            console.log(err)
            console.log(err.request)
            console.log(err.response)
            console.log(err.message)
        })
    }, [])

    return (
        <div>
            mainpage
        </div>
    )
}

export default Main
