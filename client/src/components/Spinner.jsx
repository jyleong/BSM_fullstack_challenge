import React from 'react'

var Loader = require('halogen/GridLoader');

const Spinner = (props) => {
	return (
		<Loader color="#26A65B" size="16px" margin="4px"/>
	)
}

export default Spinner;