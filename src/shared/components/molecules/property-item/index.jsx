import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { LabelValue } from '@shared-components/molecules/label-value';

import './style.css';


function PropertyItem({ label = 'property item', svgIcon, value = 'N/A', size = 'resizable' }) {

    return (
        <section class="parameter" data-size={size}>
            <SvgIcon svg={svgIcon} />
            <LabelValue label={label} value={value} direction="column" />
        </section>
    );
}

export { PropertyItem };
