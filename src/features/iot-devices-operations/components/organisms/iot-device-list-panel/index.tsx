/**
 * Module responsibility
 *
 */

import { useState, useContext } from 'preact/hooks';

import { IoTDeviceCard } from '../iot-device-card';

import { useIoTDevicesStatusLifecycle } from '@shared-hooks/iot-devices/lifecycle/use-status-codes';
import { useIoTDevicesTelemetry } from '@shared-hooks/iot-devices/lifecycle/use-telemetry';

import { IoTDevicesContext } from '@shared-contexts/iot-devices-provider';

import { DATA_ATTR_ACTION_SELECTOR } from '@features/iot-devices-operations/constants/selectors';
import { DATA_ATTR_DEVICE_ID_SELECTOR } from '@features/iot-devices-operations/constants/selectors';

import './style.css';


function IoTDeviceListPanel() {
    const { deviceStatusMap } = useContext(IoTDevicesContext);
    const [selectedIoTDeviceId, setSelectedIoTDeviceId] = useState(null);

    useIoTDevicesStatusLifecycle();
    useIoTDevicesTelemetry();

    const deviceElements = Array.from(deviceStatusMap.entries()).map(([key, iotDevice]) => (
        <IoTDeviceCard
            key={key}
            iotDeviceId={iotDevice.deviceId}
            sensorReadings={iotDevice.sensorReadings}
            selectionStatus={selectedIoTDeviceId === iotDevice.deviceId}
            statusCode={iotDevice.statusCode}
        />
    ));

    const handleClick = (event) => {
        const { target } = event;

        const closestElement = target.closest(`${DATA_ATTR_ACTION_SELECTOR}, ${DATA_ATTR_DEVICE_ID_SELECTOR}`);

        if (!closestElement) {

            return;
        }

        if (closestElement.matches(DATA_ATTR_DEVICE_ID_SELECTOR)) {
            if (closestElement.dataset.deviceId === selectedIoTDeviceId) {
                setSelectedIoTDeviceId();
            } else {
                setSelectedIoTDeviceId(closestElement.dataset.deviceId);
            }


            return;
        }

        /*
    
        At this point we know that closestElement corresponds to a <li data-action>
        therefore we look up its parent [data-device-id] to associate the action with the device.
    
        */

        const iotDeviceElement = closestElement.closest(DATA_ATTR_DEVICE_ID_SELECTOR);

        if (iotDeviceElement.dataset.deviceId !== selectedIoTDeviceId) {
            setSelectedIoTDeviceId(iotDeviceElement.dataset.deviceId);


            return;
        }

        const action = closestElement.dataset.action;

        console.log('action', action);
    };


    return (
        <ul class="iot-device-list-panel" onClick={handleClick}>
            {deviceElements}
        </ul>
    );
}

export { IoTDeviceListPanel };
