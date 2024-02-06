import { FontIcon } from '@shared-components/atoms/font-icon';
import { Paragraph } from '@shared-components/atoms/paragraph';
import { button } from '@shared-components/atoms/font-icon/variants';

import './style.css';

function IconWithValue({ icon = button, color = 'prefers-scheme', value = 'value' }: {
	icon?: string;
	color?: string;
	value?: string;
}) {

	return (
		<div class="icon_with_value">
			<FontIcon name={icon} size="regular" color={color} />
			<div class="icon_with_value__text">
				<Paragraph text={value} />
			</div>
		</div>
	);
}

export { IconWithValue };
