import { Paragraph } from '@shared-components/atoms/paragraph';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IconWithValue({ svgIconName, value = 'N/A' }) {

    return (
        <div class="icon_with_value">
            <SvgIcon name={svgIconName} size="small" />
            <div class="icon_with_value__text">
                <Paragraph text={value} />
            </div>
        </div>
    );
}

export { IconWithValue };
