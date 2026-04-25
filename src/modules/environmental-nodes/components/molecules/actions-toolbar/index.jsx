import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { classNames } from '@shared-utils/class-names';

import {
    NODE_STATE_LOGGED_IN,
    NODE_STATE_IDLE,
    NODE_STATE_STREAMING_SENSORS,
} from '@infrastructure/environmental-nodes/constants/node-state-codes';

import {
    DATA_ATTR_NODE_ACTION_TERMINAL,
    DATA_ATTR_NODE_ACTION_STREAMING_DATA,
    DATA_ATTR_NODE_ACTION_ANALYTICS,
} from '@modules/environmental-nodes/constants/node-actions';

import './style.css';


function ActionsToolbar({ nodeStateCode, isSelected }) {
    const svgIconName = {
        [NODE_STATE_LOGGED_IN]: 'stopCircle',
        [NODE_STATE_STREAMING_SENSORS]: 'stopCircle',
        [NODE_STATE_IDLE]: 'playCircle',
    }[nodeStateCode];


    return (
        <footer
            class={classNames('actions-toolbar', isSelected && 'selected')}
            data-node-state-code={nodeStateCode}
            data-is-selected={isSelected}
        >
            <ul>
                <li class="item-terminal" data-action={DATA_ATTR_NODE_ACTION_TERMINAL}>
                    <SvgIcon name="terminal" size="small" enableHover={true} />
                </li>
                <li class="item-streaming-sensor-data" data-action={DATA_ATTR_NODE_ACTION_STREAMING_DATA}>
                    <SvgIcon name={svgIconName} size="small" enableHover={true} />
                </li>
                <li class="item-analytics" data-action={DATA_ATTR_NODE_ACTION_ANALYTICS}>
                    <SvgIcon name="analytics" size="small" enableHover={true} />
                </li>
            </ul>
        </footer >
    );
}

export { ActionsToolbar };
