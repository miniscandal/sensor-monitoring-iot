import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';


function OnMqttClientConnectedObserver() {

    return {
        events: [MQTT_CLIENT_EVENT_CONNECT],
        listener: ({ data }) => {
            const { actions: { subscribe } } = data;

            subscribe(import.meta.env.VITE_TOPIC_HUB_DATA);
            subscribe(import.meta.env.VITE_TOPIC_HUB_STATUS);
            subscribe(import.meta.env.VITE_TOPIC_HUB_METADATA);
        },
    };
}

export { OnMqttClientConnectedObserver };
