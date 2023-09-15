import React from 'react';
import { Stack } from 'react-bootstrap';
import { BsRobot } from 'react-icons/bs';

function LandingPage(): React.JSX.Element {
	return (
		<Stack className="d-flex flex-column justify-content-center align-items-center bg-dark vh-100 pt-4 bg-opacity-25">
			<h1 className="display-4 text-light">Hello, I&apos;m Chat GPT Bot</h1>
			<BsRobot className="landingIcon text-dark" />
			<h1 className="display-6 text-primary">How Can I Help You?</h1>
			<input
				className="landingInput text-dark fw-bold"
				type="text"
				placeholder="Start Here"
			/>
		</Stack>
	);
}

export default LandingPage;
