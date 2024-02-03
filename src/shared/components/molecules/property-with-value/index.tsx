import { Paragraph } from '@shared-components/atoms/paragraph';

import './style.css';

function PropertyWithValue({ property = 'property', value = '0', direction = 'row', }) {

	return (
		<div data-direction={direction} class="property_with_value">
			<Paragraph text={property} />
			<Paragraph text={value} />
		</div>
	);
}

export { PropertyWithValue };
