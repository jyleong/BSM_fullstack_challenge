import React, {Component} from 'react';

var tdStyle = {
  color: 'red'
};

class CustomCell extends Component {
	constructor (props) {
		super(props)
	}
	onCellSelect(event) {
		this.props.onSelectCell(this.props.row, this.props.column, this.props.data);

	}
	render() {
		return (
			<td onClick={this.onCellSelect.bind(this)} style={this.props.isSelected ? tdStyle: {}}>
			{this.props.data}
			</td>
		)
	}
}

export default CustomCell;