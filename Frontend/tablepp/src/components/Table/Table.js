
import { get } from '../../utils/apis'



import React, { Component } from 'react';

class Table extends Component {
    constructor() {
        super();
        this.state = {
            Tabledata: []
        };
      }
      componentDidMount(){
        get('table').then(res => {
                        
                        let table = res.data.data
                        let newtable = [];
                        table.forEach(element => {
                            newtable.push({
                                numbers: element.numbers,
                                input: undefined,
                                precent: 0,
                            })
                        });
                        
                        this.setState({Tabledata:newtable});
                        
                    }).catch(err => {
                        console.log(err)
                    })

      }

       handlechange = (e) =>{
                e.preventDefault();
                let newdata = this.state.Tabledata
                
                newdata[e.target.id].input = e.target.value
                newdata[e.target.id].precent = ((e.target.value / newdata[e.target.id].numbers)*100)
                this.setState({Tabledata:newdata});
                
                
        
            }
    render() {
       return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">input</th>
                        <th scope="col">Number</th>
                        <th scope="col">%</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    // rows
                        this.state.Tabledata.map((element, index) => {
                            

                            return (
                                
                                
                                <tr key={`${index}`}>
                                    <td ><input type="number" id={`${index}`} onChange={this.handlechange} value={element.input}/></td>
                                    <td >{element.numbers}</td>
                                    <td >{element.precent}</td>
                                </tr>
                               

                            )
                        })
                    }


                </tbody>
            </table>
        </div>
    )
    }
}

export default Table;