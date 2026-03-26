import { OBSERVER_ENTITY_MQTT_EVENTS } from '@core-constants/observer-entities';

import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';


function OnMqttClientConnectedObserver() {

    return {
        entity: OBSERVER_ENTITY_MQTT_EVENTS,
        id: MQTT_CLIENT_EVENT_CONNECT,
        listener: ({ actions }) => {
            const { subscribe } = actions;

            subscribe(import.meta.env.VITE_TOPIC_HUB_DATA);
            subscribe(import.meta.env.VITE_TOPIC_HUB_STATUS);
            subscribe(import.meta.env.VITE_TOPIC_HUB_METADATA);
        },
    };
}

export { OnMqttClientConnectedObserver };
