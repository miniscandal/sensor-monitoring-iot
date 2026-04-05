import { SvgIcon } from '@shared-components/atoms/svg-icon';

import {
    NODE_STATUS_LOGGED_IN,
    NODE_STATUS_IDLE,
    NODE_STATUS_STREAMING_SENSOR_DATA,
} from '@shared-constants/node-status-codes';
import {
    DATA_ATTR_NODE_ACTION_TERMINAL,
    DATA_ATTR_NODE_ACTION_STREAMING_DATA,
    DATA_ATTR_NODE_ACTION_ANALYTICS,
} from '@features/environmental-nodes/constants/node-actions';

import './style.css';


function IoTDeviceControlPanel({ iotDeviceStatusCode, selectionStatus }) {
    const svgIconName = {
        [NODE_STATUS_LOGGED_IN]: 'stopCircle',
        [NODE_STATUS_IDLE]: 'playCircle',
        [NODE_STATUS_STREAMING_SENSOR_DATA]: 'stopCircle',
    }[iotDeviceStatusCode];


    return (
        <footer
            class="iot-device-control-panel"
            data-status-code={iotDeviceStatusCode}
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

export { IoTDeviceControlPanel };
