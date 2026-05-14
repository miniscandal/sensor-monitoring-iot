import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';

import { MQTT_CLIENT_EVENT_CONNECT } from '@infrastructure/mqtt-client/constants/client-events';

import {
    MQTT_TOPIC_NODE_AUTH_LOGIN,
    MQTT_TOPIC_NODE_AUTH_LOGOUT,
    MQTT_TOPIC_NODE_AUTH_SESSION,
    MQTT_TOPIC_NODE_DATA_SENSOR,
    MQTT_TOPIC_NODE_METADATA,
    MQTT_TOPIC_NODE_STATE_CODE,
    MQTT_TOPIC_NODE_OPERATION_RESULT_CODE,
} from '@infrastructure/mqtt-client/constants/client-topics-subscription';


function OnMqttClientConnectedObserver() {

    return {
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_CONNECT,
        listener: ({ actions }) => {
            const { subscribe } = actions;

            subscribe(MQTT_TOPIC_NODE_AUTH_LOGIN);
            subscribe(MQTT_TOPIC_NODE_AUTH_LOGOUT);
            subscribe(MQTT_TOPIC_NODE_AUTH_SESSION);
            subscribe(MQTT_TOPIC_NODE_DATA_SENSOR);
            subscribe(MQTT_TOPIC_NODE_METADATA);
            subscribe(MQTT_TOPIC_NODE_STATE_CODE);
            subscribe(MQTT_TOPIC_NODE_OPERATION_RESULT_CODE);
        },
    };
}

export { OnMqttClientConnectedObserver };
