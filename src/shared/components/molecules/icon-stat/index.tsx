import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { StatItem } from '@shared-components/molecules/stat-item';

import './style.css';


function IconStat({ label, value, svgIconName }) {

    return (
        <section class="icon-stat">
            <SvgIcon name={svgIconName} size="medium" />
            <StatItem label={label} value={value} direction="column" />
        </section>
    );
}

export { IconStat };
