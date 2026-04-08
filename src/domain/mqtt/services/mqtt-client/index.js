import {
    OBSERVER_ENTITY_MQTT_EVENTS,
    OBSERVER_ENTITY_STATUS_CODES,
    OBSERVER_ENTITY_TOPICS,
} from '@core-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_ERROR,
} from '@shared-constants/mqtt-client-events';


export class MqttClientService {
    constructor(clientAdapter, eventSubject) {
        this.client = clientAdapter;
        this.eventSubject = eventSubject;

        this.client.on(MQTT_CLIENT_EVENT_CONNECT, this.onConnect.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_OFFLINE, this.onOffline.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_MESSAGE, this.onMessage.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_ERROR, (err) => console.error('MQTT error:', err));
    }

    onConnect() {
        this.eventSubject.notify({
            entity: OBSERVER_ENTITY_MQTT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_CONNECT,
            actions: {
                getClientProperties: this.client.getClientProperties.bind(this.client),
                subscribe: this.subscribe.bind(this),
            },
            data: null,
        });
    }

    onOffline() {
        this.eventSubject.notify({
            entity: OBSERVER_ENTITY_MQTT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_OFFLINE,
            actions: {
                getClientProperties: this.client.getClientProperties.bind(this.client),
            },
            data: null,
        });
    }

    onMessage(topic, message) {
        const parsed = JSON.parse(message.toString());

        this.eventSubject.notify({
            entity: OBSERVER_ENTITY_MQTT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_MESSAGE,
            actions: null,
            data: { topic, message },
        });

        this.eventSubject.notify({
            entity: OBSERVER_ENTITY_STATUS_CODES,
            instanceId: parsed?.data?.statusCode,
            actions: null,
            data: { topic, message },
        });
    }

    subscribe(topic) {
        this.client.subscribe(topic, () => {
            const data = { topic };

            this.eventSubject.notify({
                entity: OBSERVER_ENTITY_MQTT_EVENTS,
                instanceId: MQTT_CLIENT_EVENT_SUBSCRIBE,
                actions: { subscribe: this.subscribe.bind(this) },
                data,
            });

            this.eventSubject.notify({
                entity: OBSERVER_ENTITY_TOPICS,
                instanceId: topic,
                actions: { publish: this.publish.bind(this) },
                data,
            });
        });
    }

    publish({ topic, data }) {
        this.client.publish(topic, data);
    }

    end() {
        this.client.end();
    }
}
