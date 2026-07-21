import { useContext } from 'preact/hooks';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/contexts/environmental-node-provider';

import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { classNames } from '@shared-utils/class-names';

import {
    DATA_ATTR_NODE_CONTROL_TERMINAL,
    DATA_ATTR_NODE_CONTROL_STREAMING_DATA,
    DATA_ATTR_NODE_CONTROL_ANALYTICS,
} from '@modules/environmental-nodes/constants/node-controls';

import {
    ENV_NODE_STATE_BIRTH,
    ENV_NODE_STATE_IDLE,
    ENV_NODE_STATE_STREAMING_SENSOR_ALL,
} from '@shared-constants/env-node-states-codes';

import './style.css';


function ControlsToolbar() {
    const { isSelected, nodeProperties } = useContext(EnvironmentalNodeContext);
    const { nodeStateCode } = nodeProperties;

    const svgIconName = {
        [ENV_NODE_STATE_BIRTH]: 'stopCircle',
        [ENV_NODE_STATE_STREAMING_SENSOR_ALL]: 'stopCircle',
        [ENV_NODE_STATE_IDLE]: 'playCircle',
    }[nodeStateCode] || 'stopCircle';


    return (
        <footer
            class={classNames('controls-toolbar', isSelected && 'selected')}
            data-node-state-code={nodeStateCode}
            data-is-selected={isSelected}
        >
            <ul>
                <li class="item-command-terminal" data-control={DATA_ATTR_NODE_CONTROL_TERMINAL}>
                    <SvgIcon name="terminal" size="small" enableHover={true} />
                </li>
                <li class="item-power" data-control={DATA_ATTR_NODE_CONTROL_STREAMING_DATA}>
                    <SvgIcon name={svgIconName} size="small" enableHover={true} />
                </li>
                <li class="item-monitoring" data-control={DATA_ATTR_NODE_CONTROL_ANALYTICS}>
                    <SvgIcon name="analytics" size="small" enableHover={true} />
                </li>
            </ul>
        </footer >
    );
}

export { ControlsToolbar };
