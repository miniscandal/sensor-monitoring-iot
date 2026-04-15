import { OBSERVER_ENTITY_MQTT_EVENTS } from '@shared-constants/observer-entities';

import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';

import {
    MQTT_TOPIC_NODE_OPERATION_RESULT,
    MQTT_TOPIC_NODE_DATA,
    MQTT_TOPIC_NODE_STATUS,
    MQTT_TOPIC_NODE_METADATA,

} from '@shared-constants/mqtt-client-topics';


function OnMqttClientConnectedObserver() {

    return {
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        instanceId: MQTT_CLIENT_EVENT_CONNECT,
        listener: ({ actions }) => {
            const { subscribe } = actions;

            subscribe(MQTT_TOPIC_NODE_OPERATION_RESULT);
            subscribe(MQTT_TOPIC_NODE_DATA);
            subscribe(MQTT_TOPIC_NODE_STATUS);
            subscribe(MQTT_TOPIC_NODE_METADATA);
        },
    };
}

export { OnMqttClientConnectedObserver };
