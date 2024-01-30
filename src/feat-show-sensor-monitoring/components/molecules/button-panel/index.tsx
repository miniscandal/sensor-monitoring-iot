import { IconButton } from '@shared-components/atoms/icon-button';

import { logs, modeOffOn, terminal } from '@shared-components/atoms/font-icon/variants';

import './style.css';

function ButtonPanel() {

	return (
		<ul class="button_panel">
			<li><IconButton name={terminal} size="small" handleClick={({ mode, setMode }) => { }} /></li>
			<li><IconButton name={modeOffOn} size="small" /></li>
			<li><IconButton name={logs} size="small" /></li>
		</ul>
	);
}

export { ButtonPanel };
