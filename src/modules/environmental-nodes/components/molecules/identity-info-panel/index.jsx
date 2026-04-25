import { StatItem } from '@shared-components/molecules/stat-item';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IdentityInfoPanel({ nodeId, nodeStateCode, svgIconName }) {

    return (
        <section class="identity-info-panel" data-node-state-code={nodeStateCode}>
            <SvgIcon name={svgIconName} size="regular" />
            <div>
                <StatItem label="Node ID:" value={`\u00A0 ${nodeId}`} />
                <SvgIcon name="qrCode" size="tiny" />
            </div>
        </section>
    );
}

export { IdentityInfoPanel };
