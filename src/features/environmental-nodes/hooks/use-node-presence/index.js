/**
 * Module responsibility
 * 
 * ✰ Update session map on login and logout events
 * ✰ Clear all sessions when client goes offline
 *
 */

import { useContext } from 'preact/hooks';

import { useMqttClientEvents } from '@shared-hooks/mqtt-client/use-events';

import { EnvironmentalNodesContext } from '@shared-contexts/environmental-nodes-provider';

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


function useNodePresence() {
    const { setDeviceStatusMap } = useContext(EnvironmentalNodesContext);

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        id: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setDeviceStatusMap(new Map()),
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        id: NODE_STATUS_LOGGED_IN,
        listener: ({ data }) => {
            const { deviceId, message } = data;

            setDeviceStatusMap(prevState => {
                if (prevState.has(deviceId)) {

                    return prevState;
                };

                const nextState = new Map(prevState);

                nextState.set(deviceId, { ...message, deviceId });


                return nextState;
            });
        },
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        id: NODE_STATUS_LOGGED_OUT,
        listener: ({ data }) => {
            const { deviceId } = data;

            setDeviceStatusMap(prevState => {
                const nextState = new Map(prevState);

                nextState.delete(deviceId);


                return nextState;
            });
        },
    });
}

export { useNodePresence };
