import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';

import { MQTT_CLIENT_EVENT_CONNECT } from '@infrastructure/mqtt-client/constants/client-events';

import {
    MQTT_TOPIC_ENV_NODE_STATE_BIRTH,
    MQTT_TOPIC_ENV_NODE_STATE_DEATH,
    MQTT_TOPIC_ENV_NODE_DATA_SENSOR_ALL,
    MQTT_TOPIC_ENV_NODE_METADATA,
    MQTT_TOPIC_ENV_NODE_STATE_CODE,
    MQTT_TOPIC_ENV_NODE_OP_RESULT_CODE,
} from '@infrastructure/mqtt-client/constants/client-topics-subscription';


function OnMqttClientConnectedObserver() {

    return {
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_CONNECT,
        listener: ({ actions }) => {
            const { subscribe } = actions;

            subscribe(MQTT_TOPIC_ENV_NODE_STATE_BIRTH);
            subscribe(MQTT_TOPIC_ENV_NODE_STATE_DEATH);
            subscribe(MQTT_TOPIC_ENV_NODE_DATA_SENSOR_ALL);
            subscribe(MQTT_TOPIC_ENV_NODE_METADATA);
            subscribe(MQTT_TOPIC_ENV_NODE_STATE_CODE);
            subscribe(MQTT_TOPIC_ENV_NODE_OP_RESULT_CODE);
        },
    };
}

export { OnMqttClientConnectedObserver };
