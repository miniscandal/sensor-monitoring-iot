/**
 * Observer triggered upon subscription to the environmental node data topic.
 * Broadcasts a connect command to all environmental nodes, instructing
 * each node to respond with its identification payload to this system.
 */

import { OBSERVER_ENTITY_TOPICS } from '@shared-constants/observer-entities';

import { MQTT_TOPIC_NODE_DATA } from '@shared-constants/mqtt-client-topics';
import { MQTT_TOPIC_NODE_OPERATION_ALL } from '@features/mqtt-client-publishes/constants/topics-publishes';
import { NODE_OPERATION_CONNECT } from '@shared-constants/operations-code';


function SubscribedEnvironmentalNodeStatusTopicObserver() {

    return {
        entity: OBSERVER_ENTITY_TOPICS,
        instanceId: MQTT_TOPIC_NODE_DATA,
        listener: ({ actions }) => {
            actions.publish({
                topic: MQTT_TOPIC_NODE_OPERATION_ALL,
                data: {
                    command: {
                        code: NODE_OPERATION_CONNECT,
                        exec: null,
                    },
                },
            });
        },
    };
}

export { SubscribedEnvironmentalNodeStatusTopicObserver };
