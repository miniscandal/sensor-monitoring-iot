import { useContext } from 'preact/hooks';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/contexts/environmental-node-provider';

import { StatItem } from '@shared-components/molecules/stat-item';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import {
    NODE_STATE_LOGGED_IN,
    NODE_STATE_IDLE,
    NODE_STATE_STREAMING_SENSORS,
} from '@infrastructure/environmental-nodes/constants/node-state-codes';

import './style.css';


function IdentityInfoPanel() {
    const { nodeProperties } = useContext(EnvironmentalNodeContext);
    const { nodeStateCode, metadata: { nodeId } } = nodeProperties

    const svgIconName = {
        [NODE_STATE_LOGGED_IN]: 'motionSensorActive',
        [NODE_STATE_STREAMING_SENSORS]: 'motionSensorActive',
        [NODE_STATE_IDLE]: 'motionSensorIdle',
    }[nodeStateCode];


    return (
        <section class="identity-info-panel" data-node-state-code={nodeStateCode}>
            <SvgIcon name={svgIconName} size="regular" />
            <div>
                <StatItem label="Node ID:" value={`\u00A0${nodeId}`} />
                <SvgIcon name="qrCode" size="tiny" />
            </div>
        </section>
    );
}

export { IdentityInfoPanel };
