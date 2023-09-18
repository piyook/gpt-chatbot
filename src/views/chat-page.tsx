import React from 'react';
import { Stack } from 'react-bootstrap';
import UserBox from '../components/user-box';
import BotBox from '../components/bot-box';
import IntroBox from '../components/intro-box';

type ChatPageProps = {
	readonly chatItems: Array<{
		question: string | undefined;
		answer: string | undefined;
	}>;
};

function ChatPage({ chatItems }: ChatPageProps): React.JSX.Element {
	return (
		<Stack className="mainContainer mt-5">
			<IntroBox />
			{chatItems.map((item) => {
				if (item.question === undefined || item.answer === undefined) return;

				return (
					<div key={item.answer}>
						<UserBox userQuestion={item.question} />
						<BotBox key={item.answer} botAnswer={item.answer} />
					</div>
				);
			})}
		</Stack>
	);
}

export default ChatPage;
