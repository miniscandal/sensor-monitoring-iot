import { Title } from '@shared-components/atoms/title';
import { Logo } from '@shared-components/atoms/logo';

import './styles.css';

function Header() {

	return (
		<header class="header">
			<Title text="SENSOR MONITORING IOT" />
			<Logo size="regular" />
		</header>
	);
}

export { Header };
