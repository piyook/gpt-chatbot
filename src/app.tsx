/* eslint-disable  no-warning-comments */
import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './App.css';
import ChatPage from './views/chat-page';

type ChatData = Array<{
	question: string | undefined;
	answer: string | undefined;
}>;

const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
	dangerouslyAllowBrowser: true,
});

function App(): React.JSX.Element {
	const [chatItems, setChatItems] = useState<ChatData>([]);

	const inputData = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputData.current === null) return;
		inputData.current.value = '';
	}, [chatItems]);

	const submitHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			event.key !== 'Enter' ||
			inputData.current === null ||
			inputData.current.value === ''
		)
			return;

		const parameters: OpenAI.Chat.ChatCompletionCreateParams = {
			messages: [{ role: 'user', content: inputData.current.value }],
			model: 'gpt-3.5-turbo',
		};

		const completion: OpenAI.Chat.ChatCompletion | undefined =
			await openai.chat.completions.create(parameters).catch((error) => {
				if (error instanceof OpenAI.APIError) {
					console.log(error.status);
					console.log(error.message);
					return undefined;
				}

				throw new Error('error');
			});
		const OaiAnswer: string | undefined =
			completion?.choices[0].message.content ?? 'error';

		console.log(completion?.choices);

		// TODO - need to 1. clear input 2. show loading spinner until answer is ready then 3. display answer.

		// Add new question and answers to array in state
		setChatItems((current) => {
			return [
				...current,
				{
					question: inputData?.current?.value,
					answer: `${OaiAnswer}`,
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
