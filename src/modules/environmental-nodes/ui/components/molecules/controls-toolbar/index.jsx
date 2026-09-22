import { useContext } from 'preact/hooks';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/ui/contexts/environmental-node-provider';

import { SvgIcon } from '@shared-components/atoms/svg-icon';

import {
    DATA_ATTR_NODE_CONTROL_TERMINAL,
    DATA_ATTR_NODE_CONTROL_POWER,
    DATA_ATTR_NODE_CONTROL_MONITOR,
} from '@modules/environmental-nodes/constants/node-controls';

import {
    ENV_NODE_STATE_BIRTH,
    ENV_NODE_STATE_IDLE,
    ENV_NODE_STATE_STREAMING_SENSOR_ALL,
} from '@shared-constants/env-node-states-codes';

import './style.css';


function ControlsToolbar() {
    const { nodeProperties } = useContext(EnvironmentalNodeContext);
    const { nodeStateCode } = nodeProperties;

    const svgIconName = {
        [ENV_NODE_STATE_BIRTH]: 'modeOffOn',
        [ENV_NODE_STATE_IDLE]: 'modeOffOn',
        [ENV_NODE_STATE_STREAMING_SENSOR_ALL]: 'modeOffOn',
    }[nodeStateCode] || 'modeOffOn';


    return (
        <footer
            class="controls-toolbar"
            data-node-state-code={nodeStateCode}
        >
            <ul>
                <li class="item-terminal" data-control={DATA_ATTR_NODE_CONTROL_TERMINAL}>
                    <SvgIcon name="terminal" size="small" enableHover={true} />
                </li>
                <li class="item-power" data-control={DATA_ATTR_NODE_CONTROL_POWER}>
                    <SvgIcon name={svgIconName} size="small" enableHover={true} />
                </li>
                <li class="item-monitor" data-control={DATA_ATTR_NODE_CONTROL_MONITOR}>
                    <SvgIcon name="monitoring" size="small" enableHover={true} />
                </li>
            </ul>
        </footer >
    );
}

export { ControlsToolbar };
