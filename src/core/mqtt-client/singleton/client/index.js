import mqtt from 'mqtt';

import { mqttClientSubject } from '@core/mqtt-client/subjects/mqtt-client-subject';

import {
    ENTITY_MQTT_CLIENT_EVENTS,
    ENTITY_ENV_NODE_STATE_CODE,
    ENTITY_MQTT_CLIENT_TOPICS,
} from '@shared-constants/observer-entities';

import {
    MQTT_CLIENT_EVENT_CONNECT,
    MQTT_CLIENT_EVENT_OFFLINE,
    MQTT_CLIENT_EVENT_SUBSCRIBE,
    MQTT_CLIENT_EVENT_MESSAGE,
    MQTT_CLIENT_EVENT_ERROR,
} from '@core/mqtt-client/constants/client-events';

import { MQTT_BROKER_HOST, MQTT_BROKER_PORT } from '@core/mqtt-client/constants/client-config';


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
        mqttClientSubject.notifyObservers({
            entity: ENTITY_MQTT_CLIENT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_CONNECT,
            actions: {
                getClientProperties: this.getClientProperties.bind(this),
                subscribe: this.subscribe.bind(this),
            },
            data: null,
        });
    };

    onOffline() {
        mqttClientSubject.notifyObservers({
            entity: ENTITY_ENV_NODE_STATE_CODE,
            instanceId: MQTT_CLIENT_EVENT_OFFLINE,
            actions: {
                getClientProperties: this.getClientProperties.bind(this),
            },
            data: null,
        });
    };

    onMessage(topic, message) {
        const parseMessage = JSON.parse(message.toString());

        mqttClientSubject.notifyObservers({
            entity: ENTITY_MQTT_CLIENT_EVENTS,
            instanceId: MQTT_CLIENT_EVENT_MESSAGE,
            actions: null,
            data: {
                message,
                topic,
            },
        });

        mqttClientSubject.notifyObservers({
            entity: ENTITY_ENV_NODE_STATE_CODE,
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

            mqttClientSubject.notifyObservers({
                entity: ENTITY_MQTT_CLIENT_EVENTS,
                instanceId: MQTT_CLIENT_EVENT_SUBSCRIBE,
                actions: {
                    subscribe: this.subscribe.bind(this),
                },
                data,
            });

            mqttClientSubject.notifyObservers({
                entity: ENTITY_MQTT_CLIENT_TOPICS,
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
