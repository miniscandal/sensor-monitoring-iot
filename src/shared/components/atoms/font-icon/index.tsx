import './style.css';

import { button } from './variants';

function FontIcon({ name = button, size = 'regular', color = 'prefers-scheme' }) {

	// return <span>'✰'</span>;

	return (
		<span
			class="font_icon material-symbols-outlined"
			data-size={size}
			data-color={color}
		>
			{name}
		</span>
	);
}

export { FontIcon };
