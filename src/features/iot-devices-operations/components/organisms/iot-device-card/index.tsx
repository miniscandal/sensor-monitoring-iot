import { IoTDeviceControlPanel } from '../../molecules/control-panel';
import { IoTDeviceDetails } from '../../molecules/details';
import { IoTDeviceSensorReadings } from '../../molecules/sensor-readings';

import { SvgIcon } from '@shared-components/atoms/svg-icon';

import { safeRound } from '@shared-utils/safe-round';

import { IOT_DEVICE_STATUS_LOGGED_IN } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_IDLE } from '@shared-constants/iot-device-status-codes';
import { IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA } from '@shared-constants/iot-device-status-codes';

import './style.css';


function IoTDeviceCard({
    iotDeviceId = 'N/A',
    sensorReadings = {},
    selectionStatus = false,
    statusCode = 205,
}) {
    const humidity = safeRound(sensorReadings.humidity?.value);
    const temperature = safeRound(sensorReadings.temperature?.value);

    /*
        IOT_DEVICE_STATUS_IDLE: 
        The device has completed its full initialization process. Concurrently, 
        the Web IoT control panel has successfully retrieved and loaded all 
        necessary data from the database. The device is now in an 'Idle' state, 
        ready for action or command reception.
    */

    const dataTransmissionIcon = {
        [IOT_DEVICE_STATUS_LOGGED_IN]: 'sensorsOff',
        [IOT_DEVICE_STATUS_IDLE]: 'sensorsOff',
        [IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA]: 'sensors',
    }[statusCode];

    const svgIconName = {
        [IOT_DEVICE_STATUS_LOGGED_IN]: 'motionSensorActive',
        [IOT_DEVICE_STATUS_IDLE]: 'motionSensorIdle',
        [IOT_DEVICE_STATUS_STREAMING_SENSOR_DATA]: 'motionSensorActive',
    }[statusCode];


    return (
        <li
            class="iot-device-card"
            data-device-id={iotDeviceId}
            data-selection-status={selectionStatus}
            data-status-code={statusCode}
        >
            <header>
                <SvgIcon name={dataTransmissionIcon} size="tiny" />
            </header>
            <IoTDeviceDetails
                iotDeviceId={iotDeviceId} iotDeviceStatusCode={statusCode} svgIconName={svgIconName}
            />
            <IoTDeviceSensorReadings
                humidityValue={humidity} temperatureValue={temperature} iotDeviceStatusCode={statusCode}
            />
            <IoTDeviceControlPanel iotDeviceStatusCode={statusCode} selectionStatus={selectionStatus} />
        </li>
    );
}

export { IoTDeviceCard };
