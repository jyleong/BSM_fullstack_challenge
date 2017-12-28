var React = require('react');

var buttonStyle = {
  margin: '10px 10px 10px 0'
};

const Button = (props) => (

	<button
	className="btn btn-default"
	style={buttonStyle}
	onClick={props.onClick}>Refresh puzzle</button>
)

export default Button;