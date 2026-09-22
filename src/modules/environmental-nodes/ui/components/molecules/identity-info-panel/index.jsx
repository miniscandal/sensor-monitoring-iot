import { useContext } from 'preact/hooks';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/ui/contexts/environmental-node-provider';

import { StatItem } from '@shared-components/molecules/stat-item';
import { SvgIcon } from '@shared-components/atoms/svg-icon';

import {
    ENV_NODE_STATE_BIRTH,
    ENV_NODE_STATE_IDLE,
    ENV_NODE_STATE_STREAMING_SENSOR_ALL,
} from '@shared-constants/env-node-states-codes';

import './style.css';


function IdentityInfoPanel() {
    const { nodeProperties } = useContext(EnvironmentalNodeContext);
    const { nodeStateCode, metadata: { nodeId } } = nodeProperties;

    const svgIconName = {
        [ENV_NODE_STATE_BIRTH]: 'motionSensorIdle',
        [ENV_NODE_STATE_IDLE]: 'motionSensorIdle',
        [ENV_NODE_STATE_STREAMING_SENSOR_ALL]: 'motionSensorActive',
    }[nodeStateCode] || 'motionSensorIdle';


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
