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
} from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_OFFLINE,
} from '@shared-constants/mqtt-client-events';

import {
    NODE_STATUS_LOGGED_IN,
    NODE_STATUS_LOGGED_OUT,
} from '@shared-constants/node-status-codes';


function useNodePresence() {
    const { setNodes } = useContext(EnvironmentalNodesContext);

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_OFFLINE,
        listener: () => setNodes(new Map()),
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        instanceId: NODE_STATUS_LOGGED_IN,
        listener: ({ data }) => {
            const { nodeId, message } = data;

            setNode(prevState => {
                if (prevState.has(nodeId)) {

                    return prevState;
                };

                const nextState = new Map(prevState);

                nextState.set(nodeId, { ...message, nodeId });


                return nextState;
            });
        },
    });

    useMqttClientEvents({
        entity: OBSERVER_ENTITY_STATUS_CODES,
        instanceId: NODE_STATUS_LOGGED_OUT,
        listener: ({ data }) => {
            const { nodeId } = data;

            setNode(prevState => {
                const nextState = new Map(prevState);

                nextState.delete(nodeId);


                return nextState;
            });
        },
    });
}

export { useNodePresence };
