import { useDataTracking } from '@shared-custom-hooks/use-data-tracking';

import { Paragraph } from '@shared-components/atoms/paragraph';

import './style.css';

function DataTracking() {
	const { messageList } = useDataTracking();

	const elements = messageList.map(message => {
		const text = JSON.stringify(message).replace(/"(\w+)":/g, '$1:');

		return <Paragraph text={text} size="small" />;
	});

	return (
		<section class="data_tracking">
			<div class="data_tracking__div">
				{elements}
				<div class="data_tracking__scroll"></div>
			</div>
		</section>
	);
}

export { DataTracking };
