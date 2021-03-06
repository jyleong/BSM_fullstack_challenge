import React, {Component} from 'react';

var tdStyle = {
  background: 'yellow'
};

class CustomCell extends Component {
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