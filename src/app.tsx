import React, { useState, useRef } from 'react';
import OpenAI from 'openai';
import 'bootswatch/dist/solar/bootstrap.min.css';
import LoadSpinner from './components/load-spinner';
import './App.css';
import { uniquishId } from './utils/utils';
import ChatPage from './views/chat-page';

type ChatData = Array<{
	id: string | undefined;
	question: string | undefined;
	answer: string | undefined;
}>;

/* Set OAI config object
NOTE THIS IS FOR DEMO PROJECT PURPOSES ONLY NEVER USE API KEY IN FRONTEND CLIENT IN 
A REAL PRODUCTION APP - INSTEAD CREATE A BACKEND API TO HANDLE THIS FOR THE APP */
const openai = new OpenAI({
	apiKey:
		(import.meta.env.VITE_OPENAI_API_KEY as string) ?? 'please_provide_key',
	dangerouslyAllowBrowser: true,
});

function App(): React.JSX.Element {
	const [chatItems, setChatItems] = useState<ChatData>([]);
	const [isLoading, setIsLoading] = useState(false);
	const inputData = useRef<HTMLInputElement>(null);

	const submitHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		// Screen out empty values or any key press that is not 'enter'
		if (
			event.key !== 'Enter' ||
			inputData.current === null ||
			inputData.current.value === ''
		)
			return;

		// Set up return data and set loading spinner until OAI response is obtained
		const userQuestion = inputData.current.value;

		setIsLoading(true);

		// Prepare prompt
		const parameters: OpenAI.Chat.ChatCompletionCreateParams = {
			messages: [{ role: 'user', content: inputData.current.value }],
			model: 'gpt-3.5-turbo',
		};

		// Reset input to empty
		inputData.current.value = '';

		// Get OAI response with user supplied prompt and await response
		const completion: OpenAI.Chat.ChatCompletion | undefined =
			await openai.chat.completions.create(parameters).catch((error) => {
				if (error instanceof OpenAI.APIError) {
					console.log(error.status);
					console.log(error.message);
					return undefined;
				}

				throw new Error('Sorry - there was an error. Please Try again later.');
			});

		// Set OAI response and unset loading spinner
		const OaiAnswer: string | undefined =
			completion?.choices[0].message.content ?? 'error';

		setIsLoading(false);

		// Add new question and answers to array in state to trigger re-render
		setChatItems((current) => {
			return [
				...current,
				{
					id: uniquishId(),
					question: userQuestion,
					answer: `${OaiAnswer}`,
				},
			];
		});
	};

	return (
		<>
			{isLoading && <LoadSpinner />}
			<ChatPage chatItems={chatItems} />
			<input
				ref={inputData}
				className="UserInput text-dark fw-bold"
				type="text"
				placeholder=">"
				onKeyUp={submitHandler}
			/>
		</>
	);
}

export default App;
