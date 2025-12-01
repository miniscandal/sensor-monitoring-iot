/**
 * Module responsibility
 *
 */

import { useState, useContext } from 'preact/hooks';

import { IoTDeviceCard } from '../iot-device-card';

import { useIoTDeviceConnection } from '@shared-hooks/iot-device/onboarding/use-connection';
import { useIoTDeviceSensorReadings } from '@shared-hooks/iot-device/lifecycle/use-sensor-readings';

import { IoTDevicesContext } from '@shared-contexts/iot-device';

import './style.css';


function IoTDeviceListPanel() {
    const { iotDevices } = useContext(IoTDevicesContext);
    const [selectedIoTDeviceId, setSelectedIoTDeviceId] = useState(null);

    useIoTDeviceConnection();
    useIoTDeviceSensorReadings();

    const deviceElements = Array.from(iotDevices.entries()).map(([key, iotDevice]) => {
        console.log('iot device', iotDevice);


        return (
            <IoTDeviceCard
                key={key}
                deviceId={key}
                isSelected={selectedIoTDeviceId === iotDevice.deviceId}
                sensorReadings={iotDevice.sensorReadings}
                statusCode={iotDevice.statusCode}
            />
        );
    });

    const handleClick = (event) => {
        const { target } = event;

        const closestElement = target.closest('li[data-action], [data-device-id]');

        if (!closestElement) {

            return;
        }

        if (closestElement.matches('[data-device-id]')) {
            setSelectedIoTDeviceId(closestElement.dataset.deviceId);


            return;
        }

        /*
    
        At this point we know that closestElement corresponds to a <li data-action>
        therefore we look up its parent [data-device-id] to associate the action with the device.
    
        */

        const iotDeviceElement = closestElement.closest('[data-device-id]');

        if (!iotDeviceElement.matches('[data-selected="true"]')) {
            setSelectedIoTDeviceId(iotDeviceElement.dataset.deviceId);


            return;
        }

        const iotDeviceId = iotDeviceElement.dataset.deviceId;


        return iotDeviceId;
    };


    return (
        <ul class="iot-device-list-panel" onClick={handleClick}>
            {deviceElements}
        </ul>
    );
}

export { IoTDeviceListPanel };
