import { Paragraph } from '@shared-components/atoms/paragraph';

import './style.css';


function LabelValue({ label = 'label value', value = '0', direction = 'row' }) {

    return (
        <div data-direction={direction} class="property_with_value">
            <Paragraph text={label} />
            <Paragraph text={value} />
        </div>
    );
}

export { LabelValue };
