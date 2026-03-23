import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';


function OnMqttClientConnectedObserver() {

    return {
        entity: 'mqttEvents',
        value: MQTT_CLIENT_EVENT_CONNECT,
        listener: ({ actions }) => {
            const { subscribe } = actions;

            subscribe(import.meta.env.VITE_TOPIC_HUB_DATA);
            subscribe(import.meta.env.VITE_TOPIC_HUB_STATUS);
            subscribe(import.meta.env.VITE_TOPIC_HUB_METADATA);
        },
    };
}

export { OnMqttClientConnectedObserver };
