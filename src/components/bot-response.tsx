import React, { useState, useEffect, useMemo } from 'react';
import { BsRobot } from 'react-icons/bs';
import { uniquishId } from '../utils/utils';
import BotBox from './bot-box';

function BotResponse({
	botAnswer,
}: {
	readonly botAnswer: string;
}): React.JSX.Element {
	// Split array by new lines and filter out any empty lines
	const BotSentences: string[] = useMemo(
		() => botAnswer.split(/\r?\n/).filter((item) => item !== ''),
		[botAnswer],
	);

	const [botAnswerSentence, setBotAnswerSentence] = useState<string[]>([]);

	// Stagger response panes by 1s each rather than show all at once to give illusion of 'typing' responses
	useEffect(() => {
		for (const [index, sentence] of BotSentences.entries()) {
			setTimeout(() => {
				setBotAnswerSentence((previous) => [...previous, sentence]);
			}, index * 1000);
			continue;
		}
	}, [BotSentences]);

	return (
		<div className="d-flex flex-column justify-content-start align-items-start mb-5">
			<BsRobot className="botIcon chatIcon mb-4 text-white bg-warning" />

			{botAnswerSentence.map((sentence) => (
				<BotBox key={uniquishId()} botAnswer={sentence} />
			))}
		</div>
	);
}

export default BotResponse;
