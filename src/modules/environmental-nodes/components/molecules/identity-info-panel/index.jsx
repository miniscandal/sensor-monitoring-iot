import { StatItem } from '@shared-components/molecules/stat-item';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import './style.css';


function IdentityInfoPanel({ nodeId, nodeStatusCode, svgIconName }) {

    return (
        <section class="identity-info-panel" data-status-code={nodeStatusCode}>
            <SvgIcon name={svgIconName} size="regular" />
            <div>
                <StatItem label="Node ID:" value={`\u00A0 ${nodeId}`} />
                <SvgIcon name="qrCode" size="tiny" />
            </div>
        </section>
    );
}

export { IdentityInfoPanel };
