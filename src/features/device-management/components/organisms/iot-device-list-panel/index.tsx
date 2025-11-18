/**
 * Module responsibility
 *
 */

import { useContext } from 'preact/hooks';

import { IoTDeviceCard } from '../iot-device-card';

import { useDeviceRegistry } from '@shared-custom-hooks/iot-device/device-onboarding/use-device-registry';
import { useDeviceSensorReadings } from '@shared-custom-hooks/iot-device/device-lifecycle/use-device-sensor-readings';

import { IoTDevicesContext } from '@shared-contexts/iot-device';

import './style.css';


function IoTDeviceListPanel() {
    const { iotDevices } = useContext(IoTDevicesContext);

    useDeviceRegistry();
    useDeviceSensorReadings();

    const deviceElements = Array.from(iotDevices.entries()).map(([key, iotDevice]) => (
        <IoTDeviceCard key={key} deviceId={key} {...iotDevice.sensorReadings} />
    ));

    const handleClick = (event) => {
        const button = event.target.closest('li[data-action]');
        if (!button) {

            return;
        }

        const iotDevice = button.closest('.iot-device-card');
    };


    return (
        <ul class="iot-device-list-panel" onClick={handleClick}>
            {deviceElements}
        </ul>
    );
}

export { IoTDeviceListPanel };
