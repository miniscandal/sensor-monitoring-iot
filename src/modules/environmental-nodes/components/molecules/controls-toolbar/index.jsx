import { useContext } from 'preact/hooks';

import { EnvironmentalNodeContext } from '@modules/environmental-nodes/contexts/environmental-node-provider';

import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { classNames } from '@shared-utils/class-names';

import {
    NODE_STATE_LOGGED_IN,
    NODE_STATE_IDLE,
    NODE_STATE_STREAMING_SENSORS,
} from '@infrastructure/environmental-nodes/constants/node-state-codes';

import {
    DATA_ATTR_NODE_CONTROL_TERMINAL,
    DATA_ATTR_NODE_CONTROL_STREAMING_DATA,
    DATA_ATTR_NODE_CONTROL_ANALYTICS,
} from '@modules/environmental-nodes/constants/node-controls';

import './style.css';


function ControlsToolbar() {
    const { nodeStateCode, isSelected } = useContext(EnvironmentalNodeContext);

    const svgIconName = {
        [NODE_STATE_LOGGED_IN]: 'stopCircle',
        [NODE_STATE_STREAMING_SENSORS]: 'stopCircle',
        [NODE_STATE_IDLE]: 'playCircle',
    }[nodeStateCode];


    return (
        <footer
            class={classNames('controls-toolbar', isSelected && 'selected')}
            data-node-state-code={nodeStateCode}
            data-is-selected={isSelected}
        >
            <ul>
                <li class="item-terminal" data-control={DATA_ATTR_NODE_CONTROL_TERMINAL}>
                    <SvgIcon name="terminal" size="small" enableHover={true} />
                </li>
                <li class="item-streaming-sensor-data" data-control={DATA_ATTR_NODE_CONTROL_STREAMING_DATA}>
                    <SvgIcon name={svgIconName} size="small" enableHover={true} />
                </li>
                <li class="item-analytics" data-control={DATA_ATTR_NODE_CONTROL_ANALYTICS}>
                    <SvgIcon name="analytics" size="small" enableHover={true} />
                </li>
            </ul>
        </footer >
    );
}

export { ControlsToolbar };
