import { FontIcon } from '@shared-components/atoms/font-icon';
import { button } from '@shared-components/atoms/font-icon/variants';
import { PropertyWithValue } from '@shared-components/molecules/property-with-value';

import './style.css';

type Props = {
	text?: string;
	fontIcon?: string;
	value?: string | number | boolean;
	size?: string;
}

function MonitoringProperty({ text = 'property', fontIcon = button, value = 0, size = "resizable" }: Props) {

	return (
		<section class="monitoring_property" data-size={size}>
			<FontIcon name={fontIcon} size="large" color="symbol" />
			<PropertyWithValue property={text} value={value.toString()} direction="column" />
		</section>
	);
}

export { MonitoringProperty };
