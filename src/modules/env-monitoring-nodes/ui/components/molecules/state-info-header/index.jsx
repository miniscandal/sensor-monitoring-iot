import { useContext } from 'preact/hooks';

import { EnvMonitoringNodeContext } from '@modules/env-monitoring-nodes/ui/contexts/env-monitoring-node-provider';

import { SvgIcon } from '@shared-components/atoms/svg-icon';

import {
    ENV_NODE_STATE_BIRTH,
    ENV_NODE_STATE_IDLE,
    ENV_NODE_STATE_STREAMING_SENSOR_ALL,
} from '@shared-constants/env-node-states-codes';

import './style.css';


function StateInfoHeader() {
    const { nodeProperties: { nodeStateCode } } = useContext(EnvMonitoringNodeContext);

    const svgIconProps = {
        [ENV_NODE_STATE_BIRTH]: 'sensorsOff',
        [ENV_NODE_STATE_IDLE]: 'sensorsOff',
        [ENV_NODE_STATE_STREAMING_SENSOR_ALL]: 'sensors',
    }[nodeStateCode] || 'sensorsOff';

    return (
        <header class="state-info-header">
            <SvgIcon name="health" size="tiny" />
            <SvgIcon name={svgIconProps} size="tiny" />
        </header>
    );
}

export { StateInfoHeader };
