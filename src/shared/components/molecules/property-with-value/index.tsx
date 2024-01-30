import { Paragraph } from '@shared-components/atoms/paragraph';

import './style.css';

type Props = {
	property?: string;
	value?: string | number;
	direction?: string;
}

function PropertyWithValue({ property = 'property', value = 0, direction = 'row' }: Props) {

	return (
		<div data-direction={direction} class="property_with_value">
			<Paragraph text={property} />
			<Paragraph text={value.toString()} />
		</div>
	);
}

export { PropertyWithValue };
