import React, { useState, useRef } from 'react';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './App.css';
import ChatPage from './views/chat-page';
import LandingPage from './views/landing-page';

type ChatState = Array<{
	question: string | undefined;
	answer: string | undefined;
}>;

function Root(): React.JSX.Element {
	const [chatItems, setChatItems] = useState<ChatState>([]);

	const inputData = useRef<HTMLInputElement>(null);

	const submitHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') return;

		setChatItems((current) => {
			return [
				...current,
				{
					question: inputData?.current?.value,
					answer: `A: ${inputData?.current?.value}`,
				},
			];
		});
	};

	return (
		<>
			<LandingPage />
			<ChatPage chatItems={chatItems} />
			<input
				ref={inputData}
				className="userInput text-dark fw-bold footer"
				type="text"
				placeholder=">"
				onKeyUp={submitHandler}
			/>
		</>
	);
}

export default Root;
