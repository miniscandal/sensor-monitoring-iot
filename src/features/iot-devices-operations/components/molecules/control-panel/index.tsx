import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { IOT_DEVICE_STATUS_LOGGED_IN } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_IDLE } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA } from '@shared-constants/iot-device-status-codes';

import { DATA_ATTR_IOT_DEVICE_ACTION_TERMINAL } from '@features/iot-devices-operations/constants/iot-device-actions';
import { DATA_ATTR_IOT_DEVICE_ACTION_STREAMING_DATA } from '@features/iot-devices-operations/constants/iot-device-actions';
import { DATA_ATTR_IOT_DEVICE_ACTION_ANALYTICS } from '@features/iot-devices-operations/constants/iot-device-actions';

import './style.css';


function IoTDeviceControlPanel({ iotDeviceStatusCode, selectionStatus }) {
    const svgIconName = {
        [IOT_DEVICE_STATUS_LOGGED_IN]: 'stopCircle',
        [IOT_DEVICE_STATUS_IDLE]: 'playCircle',
        [IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA]: 'stopCircle',
    }[iotDeviceStatusCode];


    return (
        <footer
            class="iot-device-control-panel"
            data-status-code={iotDeviceStatusCode}
            data-selection-status={selectionStatus}
        >
            <ul>
                <li class="item-terminal" data-action={DATA_ATTR_IOT_DEVICE_ACTION_TERMINAL}>
                    <SvgIcon name="terminal" size="small" enableHover={true} />
                </li>
                <li class="item-streaming-sensor-data" data-action={DATA_ATTR_IOT_DEVICE_ACTION_STREAMING_DATA}>
                    <SvgIcon name={svgIconName} size="small" enableHover={true} />
                </li>
                <li class="item-analytics" data-action={DATA_ATTR_IOT_DEVICE_ACTION_ANALYTICS}>
                    <SvgIcon name="analytics" size="small" enableHover={true} />
                </li>
            </ul>
        </footer >
    );
}

export { IoTDeviceControlPanel };
