import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import 'bootswatch/dist/solar/bootstrap.min.css';
import LoadSpinner from './components/load-spinner';
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
	const [isLoading, setIsLoading] = useState(false);
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

		const userQuestion = inputData.current.value;
		setIsLoading(true);

		const parameters: OpenAI.Chat.ChatCompletionCreateParams = {
			messages: [{ role: 'user', content: inputData.current.value }],
			model: 'gpt-3.5-turbo',
		};

		inputData.current.value = '';

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

		setIsLoading(false);

		// Add new question and answers to array in state
		setChatItems((current) => {
			return [
				...current,
				{
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
				className="userInput text-dark fw-bold footer"
				type="text"
				placeholder=">"
				onKeyUp={submitHandler}
			/>
		</>
	);
}

export default App;
