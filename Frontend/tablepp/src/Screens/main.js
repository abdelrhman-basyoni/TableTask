
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

    return (
        <div>
            <Table tableData={Tabledata} />
        </div>
    )
}

export default Main
