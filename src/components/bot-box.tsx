import React, { useState, useEffect, useRef } from 'react';
import { BsRobot } from 'react-icons/bs';

function BotBox({
	botAnswer,
}: {
	readonly botAnswer: string;
}): React.JSX.Element {
	const [botAnswerChars, setBotAnswerChars] = useState('');

	const botAnswerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		for (const [index, char] of botAnswer.split('').entries()) {
			if (botAnswer === null) continue;
			setTimeout(() => {
				setBotAnswerChars((previous) => previous + char);
			}, index * 100);
			continue;
		}

		if (botAnswerRef.current) {
			botAnswerRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [botAnswer]);

	return (
		<div
			ref={botAnswerRef}
			className="d-flex flex-column justify-content-start align-items-start mb-5"
		>
			<BsRobot className="botIcon chatIcon mb-4 text-white bg-warning" />
			<p className="botOutput bg-light">{botAnswerChars}</p>
		</div>
	);
}

export default BotBox;
