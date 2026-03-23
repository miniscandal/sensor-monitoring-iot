import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import {
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';

import {
    IOT_DEVICE_STATUS_LOGGED_IN,
    IOT_DEVICE_STATUS_LOGGED_OUT,
} from '@shared-constants/iot-device-status-codes';


function useIoTDeviceSessionCount() {
    const [connectedDeviceIds, setConnectedDeviceIds] = useState([]);


    useMqttClientEvents({
        entity: 'mqttEvents',
        value: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setConnectedDeviceIds([]),
    });

    useMqttClientEvents({
        entity: 'statusCodes',
        value: IOT_DEVICE_STATUS_LOGGED_IN,
        listener: ({ data: { deviceId } }) => {
            setConnectedDeviceIds(prevState => prevState.includes(deviceId)
                ? prevState
                : [...prevState, deviceId]);
        },
    });

    useMqttClientEvents({
        entity: 'statusCodes',
        value: IOT_DEVICE_STATUS_LOGGED_OUT,
        listener: ({ data: { deviceId } }) => {
            setConnectedDeviceIds(prevState => prevState.filter(id => id !== deviceId));
        },
    });


    return connectedDeviceIds.length;
}

export { useIoTDeviceSessionCount };
