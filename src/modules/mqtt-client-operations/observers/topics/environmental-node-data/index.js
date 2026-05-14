/**
 * Observer triggered upon subscription to the environmental node data topic.
 * Broadcasts a connect command to all environmental nodes, instructing
 * each node to respond with its identification payload to this system.
 */

import { OBSERVER_ENTITY_TOPICS } from '@shared-constants/observer-entities';

import { MQTT_TOPIC_NODE_AUTH_LOGIN } from '@infrastructure/mqtt-client/constants/client-topics';

import { MQTT_TOPIC_ENVIRONMENTAL_NODE_ALL_COMMAND } from '@modules/mqtt-client-publish-topics/constants/topics-publishes';

import { NODE_CMD_RECONNECT } from '@infrastructure/environmental-nodes/constants/node-command-codes';


function SubscribedEnvironmentalNodeStatusTopicObserver() {

    return {
        entity: OBSERVER_ENTITY_TOPICS,
        instanceId: MQTT_TOPIC_NODE_AUTH_LOGIN,
        listener: ({ actions }) => {
            actions.publish({
                topic: MQTT_TOPIC_ENVIRONMENTAL_NODE_ALL_COMMAND,
                data: {
                    command: {
                        code: NODE_CMD_RECONNECT,
                        exec: null,
                    },
                },
            });
        },
    };
}

export { SubscribedEnvironmentalNodeStatusTopicObserver };
