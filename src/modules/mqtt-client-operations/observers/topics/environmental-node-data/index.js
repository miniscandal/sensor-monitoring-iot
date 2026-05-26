import { ENTITY_MQTT_CLIENT_TOPICS } from '@shared-constants/observer-entities';

import { MQTT_TOPIC_ENV_NODE_STATE_BIRTH } from '@infrastructure/mqtt-client/constants/client-topics-subscription';

import { MQTT_TOPIC_ALL_ENV_NODE_COMMAND } from '@infrastructure/mqtt-client/constants/client-topics-publishes';

import { ENV_NODE_CMD_RECONNECT } from '@modules/mqtt-client-operations/constants/env-node-commands-codes';


function SubscribedEnvironmentalNodeStatusTopicObserver() {

    return {
        entity: ENTITY_MQTT_CLIENT_TOPICS,
        instanceId: MQTT_TOPIC_ENV_NODE_STATE_BIRTH,
        listener: ({ actions }) => {
            actions.publish({
                topic: MQTT_TOPIC_ALL_ENV_NODE_COMMAND,
                data: {
                    command: {
                        code: ENV_NODE_CMD_RECONNECT,
                        exec: null,
                    },
                },
            });
        },
    };
}

export { SubscribedEnvironmentalNodeStatusTopicObserver };
