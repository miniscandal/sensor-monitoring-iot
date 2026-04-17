import { useState } from 'preact/hooks';

import { useSubscribeObserverMqttClient } from '@infrastructure/mqtt-client/hooks/use-subscribe-observer';

import {
    OBSERVER_ENTITY_MQTT_EVENTS,
    OBSERVER_ENTITY_NODE_STATE,
} from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';

import {
    OP_RESULT_LOGGED_IN,
    OP_RESULT_LOGGED_OUT,
} from '@shared-constants/node-status-codes';


function useConnectedNodesCount({ nodeIds }) {
    const [connectedNodeIds, setConnectedNodeIds] = useState(new Set(nodeIds));


    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setConnectedNodeIds(new Set()),
    });

    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_NODE_STATE,
        instanceId: OP_RESULT_LOGGED_IN,
        listener: ({ data: { topic } }) => {
            const nodeId = topic.split('/').at(-2);

            setConnectedNodeIds(prevState => {
                const newState = new Set(prevState);

                newState.add(nodeId);


                return newState;
            });
        },
    });

    useSubscribeObserverMqttClient({
        entity: OBSERVER_ENTITY_NODE_STATE,
        instanceId: OP_RESULT_LOGGED_OUT,
        listener: ({ data: { topic } }) => {
            const nodeId = topic.split('/').at(-2);

            setConnectedNodeIds(prevState => {
                const newState = new Set(prevState);

                newState.delete(nodeId);


                return newState;
            });
        },
    });


    return connectedNodeIds.size;
}

export { useConnectedNodesCount };
