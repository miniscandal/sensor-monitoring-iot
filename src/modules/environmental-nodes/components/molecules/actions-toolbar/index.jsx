import { SvgIcon } from '@shared-components/atoms/svg-icon';

import {
    OP_RESULT_LOGGED_IN,
    NODE_STATE_IDLE,
    OP_RESULT_STREAMING_SENSOR_DATA,
} from '@shared-constants/node-status-codes';
import {
    DATA_ATTR_NODE_ACTION_TERMINAL,
    DATA_ATTR_NODE_ACTION_STREAMING_DATA,
    DATA_ATTR_NODE_ACTION_ANALYTICS,
} from '@modules/environmental-nodes/constants/node-actions';

import './style.css';


function ActionsToolbar({ nodeStatusCode, selectionStatus }) {
    const svgIconName = {
        [OP_RESULT_LOGGED_IN]: 'stopCircle',
        [NODE_STATE_IDLE]: 'playCircle',
        [OP_RESULT_STREAMING_SENSOR_DATA]: 'stopCircle',
    }[nodeStatusCode];


    return (
        <footer
            class="actions-toolbar"
            data-status-code={nodeStatusCode}
            data-selection-status={selectionStatus}
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
