import { deepCamel } from '@shared-utils/deep-camel';

import {
    OBSERVER_ENTITY_MQTT_EVENTS,
    OBSERVER_ENTITY_NODE_STATE_CODE,
    OBSERVER_ENTITY_OPERATION_RESULT,
    OBSERVER_ENTITY_TOPICS,
} from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_ERROR,
} from '@infrastructure/mqtt-client/constants/client-events';


class MqttClientEventDispatcher {
    constructor(clientAdapter, mqttClientSubject) {
        this.client = clientAdapter;
        this.mqttClientSubject = mqttClientSubject;

        this.client.on(MQTT_CLIENT_EVENT_CONNECT, this.onConnect.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_OFFLINE, this.onOffline.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_MESSAGE, this.onMessage.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_ERROR, (err) => console.error('MQTT error:', err));
    }

    onConnect() {
        this.mqttClientSubject.notifyObservers({
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
        this.mqttClientSubject.notifyObservers({
            entity: OBSERVER_ENTITY_MQTT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_OFFLINE,
            actions: {
                getClientProperties: this.client.getClientProperties.bind(this.client),
            },
            data: null,
        });
    }

    onMessage(topic, message) {
        const parsed = deepCamel(JSON.parse(message.toString()));

        this.mqttClientSubject.notifyObservers({
            entity: OBSERVER_ENTITY_MQTT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_MESSAGE,
            actions: null,
            data: { topic, message },
        });

        this.mqttClientSubject.notifyObservers({
            entity: OBSERVER_ENTITY_NODE_STATE_CODE,
            instanceId: parsed?.nodeStateCode,
            actions: null,
            data: { topic, message: parsed },
        });

        this.mqttClientSubject.notifyObservers({
            entity: OBSERVER_ENTITY_OPERATION_RESULT,
            instanceId: parsed?.operationResult,
            actions: null,
            data: { topic, message: parsed },
        });
    }

    subscribe(topic) {
        this.client.subscribe(topic, () => {
            const data = { topic };

            this.mqttClientSubject.notifyObservers({
                entity: OBSERVER_ENTITY_MQTT_EVENTS,
                instanceId: MQTT_CLIENT_EVENT_SUBSCRIBE,
                actions: { subscribe: this.subscribe.bind(this) },
                data,
            });

            this.mqttClientSubject.notifyObservers({
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

export { MqttClientEventDispatcher };
