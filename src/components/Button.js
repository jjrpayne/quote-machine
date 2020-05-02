import React from 'react';

const Button = ({buttonDisplayName, clickHandler}) => {
	return(
		<button onClick={clickHandler}>{buttonDisplayName}</button>
	);
};

export default Button;
