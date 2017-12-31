import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import CustomCell from './CustomCell';
// this is a component when given props from parent, pressents the information
// props are immutable

class Board extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedCell: {
                row: '',
                col: '',
                value: ''
            }
        }
    }
    componentDidMount() {      
    }
    componentWillReceiveProps(nextProps) {
    }
    onSelectCell(row, column, data) {
    	this.setState({
            selectedCell: {
                row: row,
                col: column,
                value: data
    		}

        }, function() {console.log(this.state)});
        this.props.getSelectedCellToRequest(row,column, data);

    }
    render() {
        return (
            <div>
              <h1>Sudoku Board</h1>
              <hr/><br/>
              <Table striped bordered condensed hover>
                <thead>
                </thead>
                <tbody>
                  {
                    this.props.board.map((row, index) => {
                      return (
                        <tr>
                        {
                        	row.map((cell, i) => {
                                return (
                                <CustomCell 
                                  	onSelectCell={this.onSelectCell.bind(this)} 
                                    row={index}
                                    column={i}
                                    data={cell}
                                    isSelected={index === this.state.selectedCell.row 
                                        && 
                                        i === this.state.selectedCell.col}
                                />
                             )
                        	}
                        	)
                        }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
        )
        }
    }

export default Board;