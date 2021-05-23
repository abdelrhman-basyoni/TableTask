
import React, { useMemo, useState, useEffect } from 'react'
import Table from './Table'

const SummaryTable = (props) => {
    const [tabledata, setdata] = useState()
    useEffect(() => {
        setdata(props.data)
    }, [])
    // this component is the Summary table controller, in which we define the table Props

    // the score Element  used to style evry score cell depending on the score value
    // Score > 80 = success , 80 > Score > 50 = Warning, Score < 50 = Danger
    const Input = (props) => {
        // Loop through the array and create a badge-like component instead of a comma-separated string

        return (<input >


        </input>

        )


    };
    const Precent = (props) => {
        // Loop through the array and create a badge-like component instead of a comma-separated string
        console.log(props.tableData)
        let index = props.row.index
        let newdata = props.tableData
        let precent = (props.row.original.input / props.row.original.numbers) * 100
        newdata = newdata[index].precent = precent
        setdata(newdata)
        return (<td>

        </td>
        )


    };

    // the columns list in which we specify :
    //  Main Header of the table
    //  The Columns and for each Column we specify the Header and the accessor (accessor is where thevalue will be in the Data list EX: Data.Number)
    //  in why could use the (Cell) and we give it the style of the cell we need (EX : Score $ Idle) 
    // And it must be Memorized 
    const updateMyData = (row, value, tabledata) => {
        // console.log(row)
        // console.log(value)
        // console.log(tabledata)
        let newdata = tabledata

        // console.log(newdata)
        newdata[row].precent = value
        setdata(newdata)

    }
    const columns = useMemo(
        () => [
            {
                Header: `${'Summary_Table'}`,
                columns: [
                    {
                        Header: 'input',
                        accessor: 'input',

                        Cell: (
                            //     { cell: { cellvalue } ,
                            //     row: { index },
                            //     column: { id },
                            //     tableInfo,
                            //     // updateMyData
                            // }
                            tableInfo) => {
                            const [value, setValue] = useState(tableInfo.cellvalue)
                            // console.log(tableInfo)
                            const onChange = e => {
                                // console.log(e.target.value)
                                setValue(e.target.value)
                                updateMyData(tableInfo.row.index, e.target.value, tableInfo.data)
                            }

                            return <input value={value} onChange={onChange} />
                        }
                    },
                    {
                        Header: 'Numbers',
                        accessor: 'numbers',
                    },
                    {
                        Header: 'percentage',
                        accessor: 'precent',
                        Cell: (tableInfo) => <Precent row={tableInfo.row} tableData={tableInfo.data} />
                        // {
                        //     console.log(original)
                        //     let precent = (original.input / original.numbers)*100


                        //     return(
                        //         <td>
                        //             {precent}
                        //         </td>
                        //     )
                        // }
                    },



                ],

            },
        ], []

    )





    return (
        <div>
            <div className="m-portlet m-portlet--mobile">
                <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
                            <h3 className="m-portlet__head-text">
                                {'Fleet_Summary'}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="m-portlet__body">
                    <Table
                        columns={columns}
                        data={tabledata || props.tableData}


                    />


                </div>
            </div>
        </div>


    )
}

export default SummaryTable;
