/**
 * Observer triggered upon subscription to the environmental node data topic.
 * Broadcasts a connect command to all environmental nodes, instructing
 * each node to respond with its identification payload to this system.
 */

import { OBSERVER_ENTITY_TOPICS } from '@shared-constants/observer-entities';

import { MQTT_TOPIC_ENV_NODE_STATE_BIRTH } from '@infrastructure/mqtt-client/constants/client-topics-subscription';

import { MQTT_TOPIC_ALL_ENV_NODE_COMMAND } from '@infrastructure/mqtt-client/constants/client-topics-publishes';

import { NODE_CMD_RECONNECT } from '@infrastructure/environmental-nodes/constants/node-command-codes';


function SubscribedEnvironmentalNodeStatusTopicObserver() {

    return {
        entity: OBSERVER_ENTITY_TOPICS,
        instanceId: MQTT_TOPIC_ENV_NODE_STATE_BIRTH,
        listener: ({ actions }) => {
            actions.publish({
                topic: MQTT_TOPIC_ALL_ENV_NODE_COMMAND,
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
