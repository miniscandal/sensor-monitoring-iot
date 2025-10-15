/**
 * Module responsibility
 * 
 */

import { useState, useEffect } from 'preact/hooks';

import { MqttClientSingleton } from '@core-services/mqtt-client';

import { ObserverType } from '@core-services/mqtt-client/types/observer';
import { ObserverDataType } from '@core-services/mqtt-client/types/observer-data';
import { ReceivedMessageByDeviceType } from '@core-services/mqtt-client/types/received-message-by-device';

import { OBS_ID_CONNECTED_DEVICE } from './constants/observer-id';

function observerCallback(
    observerId: string, data: ObserverDataType, setConnectedDevice,
) {
    if (observerId !== OBS_ID_CONNECTED_DEVICE) {

        return;
    }

    const { device_id } = data as ReceivedMessageByDeviceType;

    setConnectedDevice((prevState: ReceivedMessageByDeviceType[]) => {
        const isNewDevice = prevState.some(device => device.device_id === device_id);

        return isNewDevice ? prevState : [...prevState, data];
    });
}

function useConnectedDevices() {
    const [connectedDevice, setConnectedDevice] = useState([]);
    const countDevice = connectedDevice.length;

    useEffect(() => {
        const client = MqttClientSingleton.getInstance();

        const observer: ObserverType = (observerId, data) => {
            observerCallback(observerId, data, setConnectedDevice);
        };

        client.addObserver(observer);
    }, []);

    return { devices: connectedDevice, countDevice };
}

export { useConnectedDevices };
