import React, { useState, useRef } from 'react';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './App.css';
import ChatPage from './views/chat-page';

type ChatData = Array<{
	question: string | undefined;
	answer: string | undefined;
}>;

function App(): React.JSX.Element {
	const [chatItems, setChatItems] = useState<ChatData>([]);

	const inputData = useRef<HTMLInputElement>(null);

	const submitHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') return;

		// Add new question and answers to array in state
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

export default App;
