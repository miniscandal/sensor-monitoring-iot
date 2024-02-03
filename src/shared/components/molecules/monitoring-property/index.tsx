import { FontIcon } from '@shared-components/atoms/font-icon';
import { button } from '@shared-components/atoms/font-icon/variants';
import { PropertyWithValue } from '@shared-components/molecules/property-with-value';

import { MonitoringPropertyType } from './type';

import './style.css';

function MonitoringProperty({
	text = 'property',
	fontIcon = button,
	value = '0',
	size = "resizable",
}: MonitoringPropertyType) {
	return (
		<section class="monitoring_property" data-size={size}>
			<FontIcon name={fontIcon} size="large" color="symbol" />
			<PropertyWithValue property={text} value={value} direction="column" />
		</section>
	);
}

export { MonitoringProperty };
