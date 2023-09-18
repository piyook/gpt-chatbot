import React from 'react';
import 'bootswatch/dist/solar/bootstrap.min.css';
import { BiUser } from 'react-icons/bi';
import '../App.css';

type UserBoxProps = {
	readonly userQuestion: string;
};

function UserBox({ userQuestion }: UserBoxProps): React.JSX.Element {
	return (
		<div className="d-flex flex-column justify-content-end align-items-end">
			<BiUser className="botIcon chatIcon mb-4 bg-info text-white" />
			<p className="userOutput bg-light">{userQuestion}</p>
		</div>
	);
}

export default UserBox;
