
import React, { useEffect, useState } from 'react'
import { get } from '../utils/apis'
import Tablecontroller from '../components/Table/Tablecontroller';
import Table from '../components/Table/Table'
const Main = () => {
    const [Tabledata, setTabledata] = useState([])

    useEffect(() => {
        get('table').then(res => {
            console.log(res.data)
            let table = res.data.data
            let newtable = [];
            table.forEach(element => {
                newtable.push({
                    numbers:element.numbers,
                    input : 0,
                    precent : 0,
                })




            });
            console.log(newtable)
            setTabledata(newtable)
            console.log(res)
        }).catch(err => {
            console.log(err)
            console.log(err.request)
            console.log(err.response)
            console.log(err.message)
        })
    }, [])
    const handlechange = (e) =>{
        // e.preventDefault();
        let newdata = Tabledata
        console.log(newdata)
        newdata[e.target.id].input = e.target.value
        newdata[e.target.id].precent = parseInt((e.target.value / newdata[e.target.id].numbers)*100)
        setTabledata(newdata)
        // console.log(Tabledata)
        

    }

    return (
        <div>
            <Table tableData={Tabledata} handlechange={handlechange}  />
        </div>
    )
}

export default Main
