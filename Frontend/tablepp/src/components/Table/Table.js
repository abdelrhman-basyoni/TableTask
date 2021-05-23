import React, { useEffect, useState } from 'react'
import { get } from '../../utils/apis'
const Table = () => {
    const [Tabledata, setTabledata] = useState([])
    useEffect(() => {
        get('table').then(res => {
            console.log(res.data)
            let table = res.data.data
            let newtable = [];
            table.forEach(element => {
                newtable.push({
                    numbers: element.numbers,
                    input: 0,
                    precent: 0,
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
    // rows
    
    const handlechange = (e) =>{
        e.preventDefault();
        let newdata = Tabledata
        console.log(newdata)
        newdata[e.target.id].input = e.target.value
        newdata[e.target.id].precent = parseInt((e.target.value / newdata[e.target.id].numbers)*100)
        setTabledata(newdata)
        console.log(Tabledata)
        

    }
    const rows = []
    // for (let i=0;i++;i<Tabledata.length){}
     Tabledata.map((element, index) => {

        rows.push(
            <tr>
                <td><input type='numbers' id={`${index}`} onChange={handlechange} value={Tabledata[index].input}></input></td>
                <td>{Tabledata[index].numbers}</td>
                <td>{Tabledata[index].precent}hi</td>
            </tr>
        )

       
    })

    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">input</th>
                        <th scope="col">Number</th>
                        <th scope="col">%</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    rows
                        // Tabledata.map((element, index) => {
                        //     console.log(Tabledata)

                        //     return (
                        //         <tr>
                        //             <td><input type='numbers' id={`${index}`} onChange={handlechange} value={Tabledata.input}></input></td>
                        //             <td>{element.numbers}</td>
                        //             <td>{element.precent}hi</td>
                        //         </tr>

                        //     )
                        // })
                    }


                </tbody>
            </table>
        </div>
    )
}

export default Table
