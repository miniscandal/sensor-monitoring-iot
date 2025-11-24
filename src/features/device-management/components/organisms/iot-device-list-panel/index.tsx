/**
 * Module responsibility
 *
 */

import { useState, useContext } from 'preact/hooks';

import { IoTDeviceCard } from '../iot-device-card';

import { useDeviceRegistry } from '@shared-custom-hooks/iot-device/device-onboarding/use-device-registry';
import { useDeviceSensorReadings } from '@shared-custom-hooks/iot-device/device-lifecycle/use-device-sensor-readings';

import { IoTDevicesContext } from '@shared-contexts/iot-device';

import './style.css';


function IoTDeviceListPanel() {
    const { iotDevices } = useContext(IoTDevicesContext);
    const [selectedIoTDeviceId, setSelectedIoTDeviceId] = useState(null);

    useDeviceRegistry();
    useDeviceSensorReadings();

    const deviceElements = Array.from(iotDevices.entries()).map(([key, iotDevice]) => {
        console.log(selectedIoTDeviceId === iotDevice.deviceId);

        return <IoTDeviceCard
            key={key}
            deviceId={key}
            isSelected={selectedIoTDeviceId === iotDevice.deviceId}
            {...iotDevice.sensorReadings}
        />;
    });

    const handleClick = (event) => {
        const button = event.target.closest('li[data-action]');
        console.log(button);

        if (!button) {

            return;
        }

        const iotDevice = button.closest('.iot-device-card');


        console.log(iotDevice.dataset.deviceId);

        setSelectedIoTDeviceId(iotDevice.dataset.deviceId);
    };


    return (
        <ul class="iot-device-list-panel" onClick={handleClick}>
            {deviceElements}
        </ul>
    );
}

export { IoTDeviceListPanel };
