import { useOnMessages } from '@shared-custom-hooks/useOnMessages';

import { Paragraph } from '@shared-components/atoms/paragraph';

import './style.css';

function DataLogList() {
	const [messageList] = useOnMessages();

	const elements = messageList.map(message => {
		const text = JSON.stringify(message).replace(/"(\w+)":/g, '$1:');

		return <Paragraph text={text} size="small" />
	});

	return (
		<section class="data_log_list">
			<div class="data_log_list__data">
				{elements}
				<div class="data_log_list__scroll"></div>
			</div>
		</section>
	);
}

export { DataLogList };
