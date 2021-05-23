
import React, { useEffect } from 'react'
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
// import { } from '../../utils/;


// imports for Exporting Data
// import { useExportData } from "react-table-plugins";
// import Papa from "papaparse";
// import XLSX from "xlsx";
// import JsPDF from "jspdf";
// import "jspdf-autotable";

// import '../../styles/fonts/times-normal'; // here we import the arabic font and it will be used automatically


export default function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        setGlobalFilter,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        exportData, //the Export function
        state: { pageIndex, pageSize, globalFilter },
    } = useTable(
        {
            columns, // the Columns we created in the Table Controller
            data, // the data to be shown in the Table Sent for mthe controlller
            initialState: { pageIndex: 0 }, // Pass our hoisted table state
            autoResetPage: false,
            autoResetSortBy: false,
            // getExportFileBlob, // to prepare the data according to the file type
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        // useExportData
    )



    // handling the Export Function
    // function getExportFileBlob({ columns, data, fileType, fileName }) {
    //     if (fileType === "csv") {
    //         // CSV example
    //         const headerNames = columns.map((col) => col.exportValue);
    //         const csvString = Papa.unparse({ fields: headerNames, data });
    //         return new Blob([csvString], { type: "text/csv" });
    //     } else if (fileType === "xlsx") {
    //         // XLSX example

    //         const header = columns.map((c) => c.exportValue);
    //         const compatibleData = data.map((row) => {
    //             const obj = {};
    //             header.forEach((col, index) => {
    //                 obj[col] = row[index];
    //             });
    //             return obj;
    //         });

    //         let wb = XLSX.utils.book_new();
    //         let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
    //             header,
    //         });
    //         XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    //         XLSX.writeFile(wb, `${fileName}.xlsx`);

    //         // Returning false as downloading of file is already taken care of
    //         return false;
    //     }
    //     //PDF example
    //     if (fileType === "pdf") {
    //         const headerNames = columns.map((column) => column.exportValue);
    //         const doc = new JsPDF();

    //         doc.autoTable({
    //             head: [headerNames],
    //             body: data,
    //             margin: { top: 20 },
    //             theme: 'grid',
    //             tableWidth: 'auto',
    //             cellWidth: 'wrap',
    //             columnStyles: {
    //                 0: {
    //                     cellWidth: 25
    //                 },
    //                 1: {
    //                     cellWidth: 15
    //                 },
    //                 2: {
    //                     cellWidth: 20
    //                 },
    //                 3: {
    //                     cellWidth: 15
    //                 },
    //                 4: {
    //                     cellWidth: 15
    //                 },
    //                 5: {
    //                     cellWidth: 25
    //                 },
    //                 6: {
    //                     cellWidth: 25
    //                 },
    //                 7: {
    //                     cellWidth: 15
    //                 },
    //                 8: {
    //                     cellWidth: 15
    //                 },
    //                 9: {
    //                     cellWidth: 15
    //                 },
    //                 10: {
    //                     cellWidth: 15
    //                 }
    //             },
    //             styles: {
    //                 halign: "center",
    //                 valign: "middle",
    //                 cellWidth: 'wrap',
    //                 font: 'times',
    //                 fontSize: 11,
    //                 overflow: 'linebreak',
    //                 overflowColumns: 'linebreak'
    //             },
    //             tableWidth: 'wrap'
    //         });
    //         doc.save(`${fileName}.pdf`);

    //         return false;
    //     }

    //     // Other formats goes here
    //     return false;
    // }










    useEffect(() => {
        //this use Effect to check if the page count changed (meaning the user made a search on the table )
        // and  if so take the user to latest page 
        // this was to handle a bug EX:if the user was on page 5 and he searched on a a name which shrinks the number of pages to 2
        // the user will see no data and he has to manually push on the the last page number
        console.log(`page count ${pageCount} index ${pageIndex}`)
        if (pageIndex > pageCount - 1) {
            gotoPage(pageCount - 1)
        }

    }, [pageCount])


    // create the Pagination elements  
    const pages = []
    for (let page = 1; page <= pageCount; page++) {
        if (page === pageIndex + 1) {
            pages.push(<li key={page} className='paginate_button page-item active'>

                <span onClick={() => { gotoPage(page - 1) }} aria-controls="m_table_1" className="page-link">{page}</span>
            </li>)
        } else {
            pages.push(<li key={page} className='paginate_button page-item '>
                <span onClick={() => { gotoPage(page - 1) }} aria-controls="m_table_1" className="page-link">{page}</span>

            </li>)
        }
    }


    // Render the UI for your table
    return (
        <>
            {/* Top section */}
            <div className="row">
                {/* the globalFilter */}
                <div className="col-sm-6 text-left">

                    <div className="dataTables_filter">
                        <label >
                            {'Search'}:
                    <input className="form-control form-control-sm"
                                type="search"
                                aria-controls="m_table_1"
                                value={globalFilter || ""}
                                onChange={e => setGlobalFilter(e.target.value)}
                            />

                        </label>


                    </div>
                </div>

                {/* Exporting buttons */}
                {/* <div className="col-sm-6 text-right">
                    <div style={{ float: 'right' }} className="dt-buttons btn-group">

                        <button className="btn btn-secondary buttons-copy buttons-html5"
                            onClick={() => {
                                exportData("csv", false);
                            }}
                        >
                            <span>{Export_as_CSV}</span>

                        </button>

                        <button className="btn btn-secondary buttons-copy buttons-html5"
                            onClick={() => {
                                exportData("xlsx", false);
                            }}
                        >
                            <span>{Export_as_XLSX}</span>

                        </button>

                        <button className="btn btn-secondary buttons-copy buttons-html5"
                            onClick={() => {
                                exportData("pdf", false);
                            }}
                        >
                            <span>{Export_as_PDF}</span>
                        </button>
                    </div>
                </div> */}

            </div>





            {/* The Table body  */}
            <table {...getTableProps()} className="table table-striped- table-bordered table-hover table-checkable" id="m_table_1">

                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>



                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {

                                    return (<td  {...cell.getCellProps()}>{cell.render('Cell')}</td>)
                                })}
                            </tr>
                        )
                    })}
                    <tr>
                        {
                            <td colSpan="10000">
                                {'Showing'} {page.length} {'of'} {data.length}{' '}
                                {'results'}
                            </td>
                        }
                    </tr>
                </tbody>
            </table>






            {/* Pagination  */}
            <div className="row">
                {/* number of element per page */}
                <div className="col-sm-6 text-left" >
                    <div className="col-sm-12 col-md-7 dataTables_pager">
                        <div className="dataTables_length" id="m_table_1_length">
                            <label>
                                <select name="m_table_1_length" aria-controls="m_table_1" className="custom-select custom-select-sm form-control form-control-sm"
                                    value={pageSize}
                                    onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[10, 20, 30, 40, 50].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            {'show'} {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </label>



                        </div>

                    </div>
                </div>

                {/* page and selection buttons */}
                <div className="col-sm-6 text-right">
                    <div style={{ float: 'right' }} className="dataTables_paginate paging_simple_numbers" >
                        <div className="col-sm-6 text-right">
                            <ul className="pagination">
                                <li style={{ padding: '2' }} >
                                    <button onClick={() => previousPage()} disabled={!canPreviousPage} aria-controls="m_table_1" className="page-link">
                                        <i className="la la-angle-left"></i>
                                    </button>
                                </li>

                                {/* render the pagination */}

                                {pages}


                                <li >
                                    <button onClick={() => nextPage()} disabled={!canNextPage} aria-controls="m_table_1" className="page-link"  >
                                        <i className="la la-angle-right"></i>
                                    </button>



                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

