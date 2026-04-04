/**
 * Module responsibility
 *
 */

import { useState, useContext } from 'preact/hooks';

import { IoTDeviceCard } from '../iot-device-card';

import { useDeviceHubPresence } from '@features/environmental-nodes/hooks/use-session-lifecycle';
import { useIoTDeviceStreamingSensorData } from '@shared-hooks/iot-devices/lifecycle/use-streaming-sensor-data';

import { EnvironmentalNodesContext } from '@shared-contexts/environmental-nodes-provider';

import {
    DATA_ATTR_ACTION_SELECTOR,
    DATA_ATTR_DEVICE_ID_SELECTOR,
} from '@features/environmental-nodes/constants/selectors';

import './style.css';


function NodesMonitor() {
    const { deviceStatusMap } = useContext(EnvironmentalNodesContext);
    const [selectedIoTDeviceId, setSelectedIoTDeviceId] = useState(null);

    useDeviceHubPresence();
    useIoTDeviceStreamingSensorData();

    const iotDeviceCardComponents = Array.from(deviceStatusMap.entries()).map(([key, iotDevice]) => (
        <IoTDeviceCard
            key={`${iotDevice.deviceId}-${key}`}
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
        <ul class="nodes-monitor" onClick={handleClick}>
            {iotDeviceCardComponents}
        </ul>
    );
}

export { NodesMonitor };
