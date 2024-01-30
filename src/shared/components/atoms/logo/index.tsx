import svgLogo from '@assets/images/logo.svg';

import './style.css';

function Logo({ size = 'regular' }) {

	return (
		<div data-size={size} class="logo">
			<img src={svgLogo} />
		</div>
	);
}

export { Logo };
