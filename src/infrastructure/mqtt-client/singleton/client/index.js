/**
 * Module responsibility
 * 
 */

import mqtt from 'mqtt';

import { mqttClientEventSubject } from '@infrastructure/mqtt-client/subjects/mqtt-client-subject';

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

import { MQTT_BROKER_HOST, MQTT_BROKER_PORT } from '@shared-constants/mqtt-client-config';


class MqttClientSingleton {
    static instance;

    mqttBrokerHost = MQTT_BROKER_HOST;
    mqttBrokerPort = MQTT_BROKER_PORT;

    constructor() {
        this.client = mqtt.connect(`${this.mqttBrokerHost}/${this.mqttBrokerPort}`);
        this.client.on(MQTT_CLIENT_EVENT_CONNECT, this.onConnect.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_OFFLINE, this.onOffline.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_MESSAGE, this.onMessage.bind(this));
        this.client.on(MQTT_CLIENT_EVENT_ERROR, (err) => console.error('MQTT error:', err));
    }

    static getInstance() {
        if (!MqttClientSingleton.instance) {
            MqttClientSingleton.instance = new MqttClientSingleton();
        }

        return MqttClientSingleton.instance;
    }

    onConnect() {
        mqttClientEventSubject.notify({
            entity: OBSERVER_ENTITY_MQTT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_CONNECT,
            actions: {
                getClientProperties: this.getClientProperties.bind(this),
                subscribe: this.subscribe.bind(this),
            },
            data: null,
        });
    };

    onOffline() {
        mqttClientEventSubject.notify({
            entity: OBSERVER_ENTITY_MQTT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_OFFLINE,
            actions: {
                getClientProperties: this.getClientProperties.bind(this),
            },
            data: null,
        });
    };

    onMessage(topic, message) {
        const parseMessage = JSON.parse(message.toString());

        mqttClientEventSubject.notify({
            entity: OBSERVER_ENTITY_MQTT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_MESSAGE,
            actions: null,
            data: {
                message,
                topic,
            },
        });

        mqttClientEventSubject.notify({
            entity: OBSERVER_ENTITY_STATUS_CODES,
            instanceId: parseMessage?.data?.statusCode,
            actions: null,
            data: {
                message,
                topic,
            },
        });
    };

    subscribe(topic) {
        this.client.subscribe(topic, () => {
            const data = { topic };

            mqttClientEventSubject.notify({
                entity: OBSERVER_ENTITY_MQTT_EVENTS,
                instanceId: MQTT_CLIENT_EVENT_SUBSCRIBE,
                actions: {
                    subscribe: this.subscribe.bind(this),
                },
                data,
            });

            mqttClientEventSubject.notify({
                entity: OBSERVER_ENTITY_TOPICS,
                instanceId: topic,
                actions: {
                    publish: this.publish.bind(this),
                },
                data,
            });
        });
    };

    getClientProperties() {
        const { connected, options } = this.client;
        const { clientId, host, port, protocol } = options;


        return {
            clientMqtt: connected ? 'Connected' : null,
            host,
            port,
            protocol,
            clientId,
            connected,
        };
    };

    publish({ topic, data }) {
        this.client.publish(topic, JSON.stringify(data));
    };

    end() {
        this.client.end();
    };
}

export { MqttClientSingleton };
