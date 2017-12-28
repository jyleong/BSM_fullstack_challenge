import React, {Component} from 'react';
import { Table } from 'react-bootstrap';

// this is a component when given props from parent, pressents the information
// props are immutable

class Board extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount() {
	    //this.clearForm();
	}
	componentWillReceiveProps(nextProps) {
	    if (this.props.formType !== nextProps.formType) {
    		//this.clearForm();
	    }
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
			        this.props.board.map((row) => {
			          return (
			            <tr>
			              <td>{row[0]}</td>
			              <td>{row[1]}</td>
			              <td>{row[2]}</td>
			              <td>{row[3]}</td>
			              <td>{row[4]}</td>
			              <td>{row[5]}</td>
			              <td>{row[6]}</td>
			              <td>{row[7]}</td>
			              <td>{row[8]}</td>
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