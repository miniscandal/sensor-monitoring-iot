import { useState } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import {
    OBSERVER_ENTITY_MQTT_EVENTS,
    OBSERVER_ENTITY_STATUS_CODES,
} from '@core-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';

import {
    NODE_STATUS_LOGGED_IN,
    NODE_STATUS_LOGGED_OUT,
} from '@shared-constants/node-status-codes';


function useIoTDeviceSessionCount() {
    const [connectedDeviceIds, setConnectedDeviceIds] = useState([]);


    useMqttClientEvents({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        id: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setConnectedDeviceIds([]),
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        id: NODE_STATUS_LOGGED_IN,
        listener: ({ data: { deviceId } }) => {
            setConnectedDeviceIds(prevState => prevState.includes(deviceId)
                ? prevState
                : [...prevState, deviceId]);
        },
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        id: NODE_STATUS_LOGGED_OUT,
        listener: ({ data: { deviceId } }) => {
            setConnectedDeviceIds(prevState => prevState.filter(id => id !== deviceId));
        },
    });


    return connectedDeviceIds.length;
}

export { useIoTDeviceSessionCount };
