import { MQTT_CLIENT_EVENT_CONNECT } from '@shared-constants/mqtt-client-events';


function OnMqttClientConnectedObserver() {

    return {
        events: [MQTT_CLIENT_EVENT_CONNECT],
        listener: ({ data }) => {
            const { actions: { subscribe } } = data;

            subscribe(import.meta.env.VITE_MQTT_TOPIC_MONITOR_ALL);
        },
    };
}

export { OnMqttClientConnectedObserver };
