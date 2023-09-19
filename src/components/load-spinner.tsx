import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadSpinner(): React.JSX.Element {
	return (
		<div className="spinnerContainer">
			<div className="spinnerOverlay">
				<Spinner animation="border" role="status" className="text-white lspinner">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
				<h1 className="display-4 text-white">thinking</h1>
			</div>
		</div>
	);
}

export default LoadSpinner;
