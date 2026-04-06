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


function useConnectedNodesCount() {
    const [connectedNodeIds, setConnectedNodeIds] = useState([]);


    useMqttClientEvents({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        id: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setConnectedNodeIds([]),
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        id: NODE_STATUS_LOGGED_IN,
        listener: ({ data: { nodeId } }) => {
            setConnectedNodeIds(prevState => prevState.includes(nodeId)
                ? prevState
                : [...prevState, nodeId]);
        },
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        id: NODE_STATUS_LOGGED_OUT,
        listener: ({ data: { nodeId } }) => {
            setConnectedNodeIds(prevState => prevState.filter(id => id !== nodeId));
        },
    });


    return connectedNodeIds.length;
}

export { useConnectedNodesCount };
