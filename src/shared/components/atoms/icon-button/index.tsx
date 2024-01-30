import { useState } from 'preact/hooks';

import { FontIcon } from '@shared-components/atoms/font-icon';

import './style.css';

function IconButton({ name = 'default', size = 'regular', handleClick = ({ mode, setMode }) => { } }) {
	const [mode, setMode] = useState(false);

	const onClick = () => {
		handleClick({ mode, setMode });
		setMode(!mode);
	};
	const dataMode = mode ? 'activated' : 'deactivated';

	return (
		<button class="icon_button" onClick={onClick} data-size={size} data-mode={dataMode}>
			<FontIcon name={name} size="current-size" color="current-color" />
		</button>
	);
}

export { IconButton };
