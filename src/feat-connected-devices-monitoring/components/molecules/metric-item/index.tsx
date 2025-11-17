import { SvgIcon } from '@shared-components/atoms/svg-icon';
import { Output } from '@shared-components/atoms/output';

import './style.css';


function MetricItem({ svgIconName, value }) {

    return (
        <div class="metric-item">
            <SvgIcon name={svgIconName} size="small" />
            <Output value={value} ariaLive="polite" ariaLabel="Metric Value" />
        </div>
    );
}

export { MetricItem };
